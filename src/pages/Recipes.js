import React from 'react';
import Header from '../components/Header';
import FilteredRecipes from '../components/FilteredRecipes';

export default function Recipes(){
    return (
        <div>
            <Header/>
            <FilteredRecipes/>
        </div>
    );
};