import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import starSelected from '../images/star-selected.png';

export default function FavoritesBody() {
  const { buttonFilter } = useContext(Context);
  const navigate = useNavigate();
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const variableDataTestID = (type, nationality, category, alcoholicOrNot) => {
    if (type === 'meal') {
      return `${nationality} - ${category}`;
    }
    if (type === 'drink') {
      return `${alcoholicOrNot}`;
    }
  };

  const removeFavorite = (name) => {
    const prevFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = prevFavorites.filter((item) => item.name !== name);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  };

  const filter = () => {
    if (buttonFilter === 'Drink') {
      return favoriteRecipes.filter((item) => item.type === 'drink');
    }
    if (buttonFilter === 'Meal') {
      return favoriteRecipes.filter((item) => item.type === 'meal');
    }
    return favoriteRecipes;
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
                {variableDataTestID(type, nationality, category, alcoholicOrNot)}
              </h5>
              { variableDataTestID() }
              <img
                src={ starSelected }
                alt="favorite"
                aria-hidden="true"
                data-testid={ `${index}-horizontal-favorite-btn` }
                onClick={ () => removeFavorite(name) }
              />
            </div>),
        ) }
    </div>
  );
};