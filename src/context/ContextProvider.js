import React, { useState, useMemo } from 'react';
import Context from './Context';

export default function ContextProvider({ children }) {
  const [email,setEmail] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const memo = useMemo(() => ({
    email: email,
    setEmail,
    showSearch: showSearch,
    setShowSearch,
  }), [email,showSearch]);

  return (
    <Context.Provider value={memo}>
        { children }
    </Context.Provider>
  );
}