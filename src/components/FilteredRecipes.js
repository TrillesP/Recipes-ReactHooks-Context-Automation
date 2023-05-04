import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Context from '../context/Context';
import ButtonFilter from './ButtonFilter';
import { APIDrinks, APIMeals } from '../API/FetchAPI';

function FilteredRecipes() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    isLoading,
    API,
    buttonFilter,
    setAPI,
    setIsLoading,
    searchValue,
    searchType,
  } = useContext(Context);

  useEffect(() => {
    const getMeals = async () => {
      const response = await APIMeals(searchType, searchValue);
      setAPI(response);
      setIsLoading(false);
    };
    const getDrinks = async () => {
      const response = await APIDrinks(searchType, searchValue);
      setAPI(response);
      setIsLoading(false);
    };
    const getFilteredMeals = async () => {
      const response = await APIMeals('filter.php?c=', buttonFilter);
      setAPI(response);
      setIsLoading(false);
    };
    const getFilteredDrinks = async () => {
      const response = await APIDrinks('filter.php?c=', buttonFilter);
      setAPI(response);
      setIsLoading(false);
    };
    if (pathname.includes('/meals') && buttonFilter === '') {
      getMeals();
    } else if (pathname.includes('/drinks') && buttonFilter === '') {
      getDrinks();
    } else if (pathname.includes('/meals') && buttonFilter !== '') {
      getFilteredMeals();
    } else if (pathname.includes('/drinks') && buttonFilter !== '') {
      getFilteredDrinks();
    };
  }, [buttonFilter, pathname, setAPI, setIsLoading, searchType, searchValue]);

  const handleClick = (id) => {
    const type = pathname.includes('/meals') ? 'meals' : 'drinks';
    navigate(`/${type}/${id}`);
  };

  const mealCard = (
    <div>
      <ButtonFilter />
      {API
        .slice(0, 12)
        .map(({ strMeal, idMeal, strMealThumb }, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
            aria-hidden="true"
            onClick={ () => handleClick(idMeal) }
          >
            <h3 data-testid={ `${index}-card-name` }>{strMeal}</h3>
            <img
              alt={ strMeal }
              src={ strMealThumb }
              data-testid={ `${index}-card-img` }
              style={ { maxWidth: '80px' } }
            />
          </div>
        ))}
    </div>
  );

  const drinkCard = (
    <div>
      <ButtonFilter />
      {API
        .slice(0, 12)
        .map(({ strDrink, idDrink, strDrinkThumb }, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
            aria-hidden="true"
            onClick={ () => handleClick(idDrink) }
          >
            <h3 data-testid={ `${index}-card-name` }>{strDrink}</h3>
            <img
              alt={ strDrink }
              src={ strDrinkThumb }
              data-testid={ `${index}-card-img` }
              style={ { maxWidth: '80px' } }
            />
          </div>
        ))}
    </div>
  );

  const mealsShowing = (<div>{ !isLoading ? mealCard : <p>Loading...</p> }</div>);
  const drinksShowing = (<div>{ !isLoading ? drinkCard : <p>Loading...</p> }</div>);

  return (
    <div>{pathname.includes('/meals') ? mealsShowing : drinksShowing}</div>
  );
}

export default FilteredRecipes;