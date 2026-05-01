import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DARK_COLORS = {
  primary: '#4CAF50',
  secondary: '#FFA726',
  healthy: '#4CAF50',
  warning: '#FFC107',
  diseased: '#EF5350',
  background: '#121212',
  surface: '#1E1E1E',
  card: '#2C2C2C',
  text: '#F5F5F5',
  textSecondary: '#AAAAAA',
  border: '#333333',
  disabled: '#555555',
};

const LIGHT_COLORS = {
  primary: '#2E7D32',
  secondary: '#FF6F00',
  healthy: '#4CAF50',
  warning: '#FFC107',
  diseased: '#F44336',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  text: '#212121',
  textSecondary: '#757575',
  border: '#E0E0E0',
  disabled: '#BDBDBD',
};

const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
  colors: LIGHT_COLORS,
});

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('darkMode').then((val) => {
      if (val === 'true') setIsDarkMode(true);
    });
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      AsyncStorage.setItem('darkMode', String(next));
      return next;
    });
  };

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, toggleTheme, colors: isDarkMode ? DARK_COLORS : LIGHT_COLORS }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
