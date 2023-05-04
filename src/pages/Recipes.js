import React from 'react';
import Header from '../components/Header';
import FilteredRecipes from '../components/FilteredRecipes';
import Footer from '../components/Footer';

export default function Recipes(){
    return (
        <div>
            <Header/>
            <FilteredRecipes/>
            <Footer/>
        </div>
    );
};