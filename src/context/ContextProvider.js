import React, { useState, useMemo } from 'react';
import Context from './Context';

export default function ContextProvider({ children }) {
  const [email, setEmail] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [searchType, setSearchType] = useState('search.php?s=');
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [buttonFilter, setButtonFilter] = useState('');
  const [itemId, setItemId] = useState();
  const [API, setAPI] = useState([]);
  const [APICategory, setAPICategory] = useState([]);

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