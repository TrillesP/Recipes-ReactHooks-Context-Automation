import React, { useState, useEffect } from 'react';

export default function Search(){

    const [searchValue, setSearchValue] = useState();
    const [isChecked, setIsChecked] = useState(false);
    
    const handleChange = () => {
        let eleSearchInput = document.getElementById('search-input');
        setSearchValue(eleSearchInput.value);
        let allEle = document.getElementsByName('search-option');
        allEle.forEach((ele) => {
            if(ele.checked){
                setIsChecked(true);
            };
        });
    };
    
    const handleSearch = () => {
        
    };

    return (
        <div>
            <div id="search-bar-elements">
                <input type="radio" id="name" name="search-option" value="Name" data-testid="name-search-radio" onChange={handleChange}></input>
                <label htmlFor="name">Name</label>
                <input type="radio" id="ingredient" name="search-option" value="Ingredient" data-testid="ingredient-search-radio" onChange={handleChange}></input>
                <label htmlFor="ingredient">Ingredient</label>
                <input type="radio" id="first-letter" name="search-option" value="First Letter" data-testid="first-letter-search-radio" onChange={handleChange}></input>
                <label htmlFor="first-letter">First Letter</label>
            </div>
            <form onSubmit={handleSearch}>
                <input
                    name="search-input"
                    id="search-input"
                    type="text"
                    data-testid="search-input"
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    data-testid="search-exec-btn"
                    disabled={ (searchValue && isChecked) ? null : 'disabled'}
                    value="Submit"
                >
                    Search
                </button>
            </form>
        </div>
    );
};