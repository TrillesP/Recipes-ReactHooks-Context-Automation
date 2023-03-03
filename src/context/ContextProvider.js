import React, { useState, useMemo } from 'react';
import Context from './Context';

export default function ContextProvider({ children }) {
  const [email,setEmail] = useState('');

  const memo = useMemo(() => ({
    email: email,
    setEmail,
  }), [email]);

  return (
    <Context.Provider value={memo}>
        { children }
    </Context.Provider>
  );
}