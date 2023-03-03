import React from 'react';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import { Route, Switch } from 'react-router-dom';
import './style.css';

function App (){
  return (
    <Switch>
      <Route exact path='/' component={ Login }/>
      <Route exact path='/' component={ Recipes }/>
    </Switch>
  );
};

export default App;