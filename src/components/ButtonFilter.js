import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../context/Context';

function ButtonFilter() {
  const { pathname } = useLocation();
  const {
    setButtonFilter,
    buttonFilter,
    isLoading,
    setIsLoading,
  } = useContext(Context);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const meals = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const drink = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const url = (pathname.includes('meals')) ? meals : drink;
    if (!isLoading) {
      const fetchData = async () => {
        const response = await fetch(url);
        const data = await response.json();
        const results = url.includes('meal') ? data.meals : data.drinks;
        setCategories(results);
      };
      fetchData();
    }
  }, [isLoading, pathname]);

  return (
    <div>
      {categories.slice(0, 6).map(({ strCategory }) => (
        <button
          key={ strCategory }
          value={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ (e) => {
            if (e.target.value === buttonFilter) {
              setButtonFilter('');
              setIsLoading(true);
            }
            if (e.target.value !== buttonFilter) {
              setButtonFilter(e.target.value);
              setIsLoading(false);
            }
          } }
        >
          {strCategory}
        </button>))}
      <button
        data-testid="All-category-filter"
        value="All"
        onClick={ () => {
          setButtonFilter('');
          setIsLoading(true);
        } }
      >
        All
      </button>
    </div>
  );
}

export default ButtonFilter;