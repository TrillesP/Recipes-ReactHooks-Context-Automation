import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import recipeTested from '../images/checkbox-checked.png';

export default function TestedBody() {
  const { buttonFilter } = useContext(Context);
  const navigate = useNavigate();
  const testedRecipes = JSON.parse(localStorage.getItem('testedRecipes'));

  const mealOrDrink = (type, nationality, category, alcoholicOrNot) => {
    if (type === 'meal') {
      return `${nationality} - ${category}`;
    }
    if (type === 'drink') {
      return `${alcoholicOrNot}`;
    }
  };

  const removeTested = (name) => {
    document.getElementById(name).src='';
    const prevTested = JSON.parse(localStorage.getItem('testedRecipes'));
    const newTested = prevTested.filter((item) => item.name !== name);
    localStorage.setItem('testedRecipes', JSON.stringify(newTested));
  };

  const filter = () => {
    if (buttonFilter === 'Drink') {
      return testedRecipes.filter((item) => item.type === 'drink');
    }
    if (buttonFilter === 'Meal') {
      return testedRecipes.filter((item) => item.type === 'meal');
    }
    return testedRecipes;
  };

  return (
    <div>
      { filter()
        .map(
          (
            {
                id,
                name,
                type,
                nationality,
                category,
                alcoholicOrNot,
                image
            },
            index,
          ) => (
            <div key={ index }>
              <div
                key={ index }
                aria-hidden="true"
                data-testid={ `${index}-horizontal-card` }
                onClick={ () => navigate(`/${type}s/${id}`) }
              >
                <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
                <img
                  alt={ name }
                  src={ image }
                  data-testid={ `${index}-horizontal-image` }
                  style={ { maxWidth: '100px' } }
                />
              </div>
              <h4 data-testid={ `${index}-horizontal-top-text` }>{category}</h4>
              <h5
                data-testid={ `${index}-horizontal-top-text` }
              >
                {mealOrDrink(type, nationality, category, alcoholicOrNot)}
              </h5>
              { mealOrDrink() }
              <img
                src={ recipeTested }
                id={ name }
                alt=""
                aria-hidden="true"
                data-testid={ `${index}-horizontal-tested-btn` }
                onClick={ () => removeTested(name) }
              />
            </div>),
        ) }
    </div>
  );
};