import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../utils/useLocalStorage.js";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches? 'dark' : 'light'
  }

  const [theme, setTheme] = useLocalStorage('theme', getSystemTheme())

  const toggleTheme = () => {
    setTheme(prev => prev === 'light'? 'dark' : 'light')
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e) => {
      const savedTheme = localStorage.getItem('theme')
      if (!savedTheme) {
        setTheme(e.matches? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [setTheme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);