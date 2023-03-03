import React, { useContext } from 'react';
import profile_icon from '../images/profile_icon.png';
import search_icon from '../images/search_icon.png';
import { useNavigate, useLocation } from 'react-router-dom';
import Search from './Search';
import Context from '../context/Context';

export default function Header(){
    const { showSearch, setShowSearch } = useContext(Context)
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (event) => {
        event.preventDefault();
        navigate('/profile');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowSearch(true)
    };

    let pageName = '';
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
          console.log(`Sorry, we don't have this this page.`);
      };

    return (
        <div id="header_buttons">
            <button 
                type="submit"
                name="/profile"
                onClick={handleClick}
            >
                <img src={ profile_icon } alt="Profile Icon" data-testid="profile_btn" border="0" width="75" height="60"/>
            </button>
            <h2 data-testid="page_title">{ pageName }</h2>
            <form onSubmit={handleSubmit}>
                { showSearch === true && <Search/> }
                <button 
                    type="submit"
                    data-testid="search-btn"
                    value="Submit"
                >
                    <img src={ search_icon } alt="Search Icon" data-testid="search_btn_img" border="0" width="50" height="50"/>
                </button> 
            </form>
        </div>
    );
};
