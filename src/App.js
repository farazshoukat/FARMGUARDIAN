import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import AppNavigator from './navigation/AppNavigator';
import Loader from './components/Loader';
import { COLORS } from './utils/constants';
import './locales/i18n';

const AppContent = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <AppNavigator />
    </>
  );
};

const App = () => {
  return (
    <PaperProvider>
      <AuthProvider>
        <LanguageProvider>
          <NavigationContainer>
            <AppContent />
          </NavigationContainer>
        </LanguageProvider>
      </AuthProvider>
    </PaperProvider>
  );
};

export default App;

