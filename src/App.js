import React from 'react';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './style.css';
import ContextProvider from './context/ContextProvider';

export default function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={ <Login/> }/>
          <Route exact path='/meals' element={ <Recipes/> }/>
          <Route exact path='/drinks' element={ <Recipes/> }/>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
};
