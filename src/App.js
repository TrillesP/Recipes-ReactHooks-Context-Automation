import React from 'react';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import RecipeInfo from './pages/RecipeInfo';
import Profile from './pages/Profile';
import TestedRecipes from './pages/TestedRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContextProvider from './context/ContextProvider';

export default function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={ <Login/> }/>
          <Route exact path='/meals' element={ <Recipes/> }/>
          <Route exact path='/drinks' element={ <Recipes/> }/>
          <Route exact path='/meals/:id' element={ <RecipeInfo/> }/>
          <Route exact path='/drinks/:id' element={ <RecipeInfo/> }/>
          <Route exact path='/profile' element={ <Profile/> }/>
          <Route exact path='/tested-recipes' element={ <TestedRecipes/> }/>
          <Route exact path='/favorite-recipes' element={ <FavoriteRecipes/> }/>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
};
