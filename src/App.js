import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './context/ThemeContext';
import AppNavigator from './navigation/AppNavigator';
import Loader from './components/Loader';
import { COLORS } from './utils/constants';
import './locales/i18n';

const AppContent = () => {
  const { loading } = useAuth();
  const { isDarkMode } = useTheme();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#121212' : COLORS.primary}
      />
      <AppNavigator />
    </>
  );
};

const App = () => {
  return (
    <PaperProvider>
      <ThemeProvider>
        <AuthProvider>
          <LanguageProvider>
            <NavigationContainer>
              <AppContent />
            </NavigationContainer>
          </LanguageProvider>
        </AuthProvider>
      </ThemeProvider>
    </PaperProvider>
  );
};

export default App;

