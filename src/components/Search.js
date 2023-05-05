import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Context from '../context/Context';

export default function Search(){
    const [isChecked, setIsChecked] = useState(false);
    const [localSearchType, setLocalSearchType] = useState('');
    const [localSearchValue, setLocalSearchValue] = useState();
    const {
        setSearchValue,
        setSearchType,
      } = useContext(Context);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    
    const handleChange = () => {
        let eleSearchInput = document.getElementById('search-input');
        setLocalSearchValue(eleSearchInput.value);
        let allEle = document.getElementsByName('search-option');
        allEle.forEach((ele) => {
            if(ele.checked){
                setIsChecked(true);
                setLocalSearchType(ele.id);
            };
        });
    };
    
    const handleSearch = (event) => {
        event.preventDefault();
        if (pathname.includes('/meals') && pathname !== '/meals') {
            navigate('/meals');
        } else if (pathname.includes('/drinks') && pathname !== '/drinks'){
            navigate('/drinks');
        };
        switch (localSearchType) {
            case 'name':
                setSearchType('search.php?s=');
                setSearchValue(localSearchValue);
                break;
            case 'ingredient':
                setSearchType('filter.php?i=');
                setSearchValue(localSearchValue);
                break;
            case 'first-letter':
                if (localSearchValue.length !== 1) {
                    global.alert('Your search must have only 1 (one) character');
                    return;
                }
                setSearchType('search.php?f=');
                setSearchValue(localSearchValue);
                break;
            default:
                setSearchType('search.php?s=');
                setSearchValue('');
                break;
        };
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
                    disabled={ (localSearchType && isChecked) ? null : 'disabled'}
                    value="Submit"
                >
                    Search
                </button>
            </form>
        </div>
    );
};