import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Context from './Context';
import { APIDrinks, APIMeals } from '../API/FetchAPI';

export default function ContextProvider({ children }) {
  // const { pathname } = useLocation();
  const [email, setEmail] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [searchType, setSearchType] = useState('search.php?s=');
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [buttonFilter, setButtonFilter] = useState('');
  const [itemId, setItemId] = useState();
  const [API, setAPI] = useState([]);
  const [APICategory, setAPICategory] = useState([]);

  // useEffect(() => {
  //   const getMealsFilter = async () => {
  //     const response = await APIMeals('filter.php?c=', buttonFilter);
  //     setAPI(response);
  //     setIsLoading(false);
  //   };
  //   const getDrinksFilter = async () => {
  //     const response = await APIDrinks('filter.php?c=', buttonFilter);
  //     setAPI(response);
  //     setIsLoading(false);
  //   };
  //   if (pathname.includes('/meals') && buttonFilter !== '') {
  //     getMealsFilter();
  //   } if ((pathname.includes('/drinks') && buttonFilter !== '')) {
  //     getDrinksFilter();
  //   }
  // }, [buttonFilter, pathname]);

  const memo = useMemo(() => ({
    email,
    setEmail,
    showSearch,
    setShowSearch,
    searchType,
    setSearchType,
    searchValue,
    setSearchValue,
    isLoading,
    setIsLoading,
    buttonFilter,
    setButtonFilter,
    itemId,
    setItemId,
    API,
    setAPI,
    APICategory,
    setAPICategory,
  }), [email, showSearch, searchType, searchValue, isLoading, buttonFilter, itemId, API, APICategory]);

  return (
    <Context.Provider value={memo}>
        { children }
    </Context.Provider>
  );
}