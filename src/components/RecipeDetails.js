import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../context/Context';
import { APIDrinks, APIMeals } from '../API/FetchAPI';
import starUnselected from '../images/star-unselected.png';
import starSelected from '../images/star-selected.png';

export default function RecipeDetails() {
  const { pathname } = useLocation();
  const [details, setDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [ingredToRender, setIngredToRender] = useState([]);
  const [starImg, setStar] = useState(starUnselected);
  const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [favoritesState, setFavoritesState] = useState(() => {
    if (favorite !== null) {
      return [...favorite];
    }
    return [];
  });

  const {
    isLoading,
    setIsLoading,
    itemId,
    API,
  } = useContext(Context);

  useEffect(() => {
    const getMealsFilter = async () => {
      const response = await APIMeals('lookup.php?i=', itemId);
      setDetails(response[0]);
      setIsLoading(false);
    };
    const getDrinksFilter = async () => {
      const response = await APIDrinks('lookup.php?i=', itemId);
      setDetails(response[0]);
      setIsLoading(false);
    };
    if (pathname.includes('/meals')) {
        getMealsFilter();
      } else if (pathname.includes('/drinks')) {
        getDrinksFilter();
    };
    if (favoritesState.some((fav) => fav.id === itemId)) {
      setStar(starSelected);
    };
  }, []);

  function filterIngred(objToReduce, str) {
    const newObject = Object.keys(objToReduce)
      .filter((key) => key.includes(str))
      .reduce((cur, key) => Object.assign(cur, { [key]: objToReduce[key] }), {});
    const filteredObj = Object
      .fromEntries(Object.entries(newObject).filter(([key, value]) => (
        value !== null && value !== key && value !== ' ' && value !== '')));
    return Object.values(filteredObj);
  };

  useEffect(() => {
    setIngredients(filterIngred(details, 'Ingredient'));
    setQuantities(filterIngred(details, 'strMeasure'));
  }, [details]);

  useEffect(() => {
    const recipe = () => {
      const items = quantities.map((item, index) => `${item} ${ingredients[index]}`);
      setIngredToRender(items);
    };
    recipe();
  }, [ingredients, quantities]);

  const favoriteRecipe = (obj) => {
    if (favoritesState.some((fav) => fav.name === obj.name)) {
      const rmvFav = favoritesState.filter((e) => Object.values(e)[0] !== obj.id);
      setFavoritesState(rmvFav);
      setStar(starUnselected);
    } else {
      setFavoritesState([...favoritesState, obj]);
      setStar(starSelected);
    }
  };

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesState));
  }, [favoritesState]);

  const item = pathname.includes('/meals') ? details.strMeal : details.strDrink;
  const itemImg = pathname.includes('/meals') ? details.strMealThumb : details.strDrinkThumb;
  const itemCategOrAlc = pathname.includes('/meals') ? details.strCategory : details.strAlcoholic;
  const itemArea = pathname.includes('/meals') ? details.strArea : '';
  const itemAlc = pathname.includes('/meals') ? '' : details.strAlcoholic;

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <h2 data-testid="recipe-title">{ item }</h2>
      <img
        src={ itemImg }
        alt={ item }
        data-testid="recipe-photo"
        style={ { maxWidth: 200 } }
      />
      <h3
        data-testid="recipe-category"
      >
        { itemCategOrAlc }
      </h3>
      <img
        src={ starImg }
        aria-hidden="true"
        alt="favorite"
        data-testid="favorite-btn"
        onClick={ () => {
          const favoriteFood = {
            itemId,
            name: item,
            type: pathname.includes('/meals') ? 'meal' : 'drink',
            nationality: itemArea,
            category: details.strCategory,
            alcoholicOrNot: itemAlc,
            image: itemImg,
          };
          favoriteRecipe(favoriteFood);
        } }
      />
      {ingredToRender.map((item, index) => (
        <div key={ index }>
          <p data-testid={ `${index}-ingredient-name-and-measure` }>
            { item }
          </p>
        </div>
      ))}
      <p data-testid="instructions">{ details.strInstructions }</p>
      { !details.strYoutube ? '' : (
        <iframe
          data-testid="video"
          title="video"
          width="450"
          height="315"
          src={ details.strYoutube.replace('watch?v=', 'embed/') }
        />
      )}
      <div>
        {API.slice(0, 6).map((items, index) => (
          <div key={ index } data-testid={ `${index}-recommendation-card` }>
            <p data-testid={ `${index}-recommendation-title` }>
              { items.strMeal || items.strDrink }
            </p>
            <img
              src={ items.strMealThumb || items.strDrinkThumb }
              alt={ items.strMeal || items.strDrink }
              style={ { maxWidth: 200 } }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
