import React, { useContext } from 'react';
import profile_icon from '../images/profile_icon.png';
import search_icon from '../images/search_icon.png';
import { useNavigate, useLocation } from 'react-router-dom';
import Search from './Search';
import Context from '../context/Context';

export default function Header(){
    const { showSearch, setShowSearch } = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (event) => {
        event.preventDefault();
        if (event.target.name === "profile-btn"){
            navigate('/profile');
        }
        else if (event.target.name === "search-btn"){
            showSearch === true ? setShowSearch(false) : setShowSearch(true);
        };
    };

    let pageName = 'Meals';
    switch (location.pathname) {
        case '/profile':
            pageName = 'Profile';
            break;
        case '/meals':
            pageName = 'Meals';
            break;
        case '/drinks':
            pageName = 'Drinks';
            break;
        case '/tested-recipes':
            pageName = 'Tested Recipes';
            break;
        case '/favorite-recipes':
            pageName = 'Favorite Recipes';
            break;
        default:
            break;
    };

    return (
        <div id="header-buttons">
            <button 
                type="submit"
                name="profile-btn"
                onClick={handleClick}
            >
                <img
                    src={ profile_icon }
                    name="profile-btn"
                    alt="Profile Icon"
                    data-testid="profile-btn"
                    aria-hidden="true"
                    border="0"
                    width="50"
                    height="35"
                />
            </button>
            <h2 data-testid="page-title">{ pageName }</h2>
            { showSearch === true && <Search/> }
            <button 
                type="submit"
                name="search-btn"
                data-testid="search-btn"
                onClick={handleClick}
            >
                <img
                    src={ search_icon }
                    name="search-btn"
                    alt="Search Icon"
                    data-testid="search-btn-img"
                    border="0"
                    width="25"
                    height="25"
                />
            </button> 
        </div>
    );
};
