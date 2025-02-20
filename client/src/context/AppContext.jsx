import React, { useState, useEffect, createContext } from 'react';
import { dummyCourses } from '../assets/assets';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [allCourses, setAllCourses] = useState([]);

  // Load courses when the component mounts
  useEffect(() => {
    setAllCourses(dummyCourses);
  }, []); // ✅ Directly setting the courses

  return (
    <AppContext.Provider value={{ currency, allCourses }}>
      {children}
    </AppContext.Provider>
  );
};
