import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileBody() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <h3 data-testid="profile-email">{ user.email }</h3>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => navigate('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-tested-btn"
        onClick={ () => navigate('/tested-recipes') }
      >
        Tested Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => {
          localStorage.clear();
          navigate('/');
        } }
      >
        Logout
      </button>
    </div>
  );
};