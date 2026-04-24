import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  getUserToken, 
  getUserData, 
  saveUserToken, 
  saveUserData, 
  removeData 
} from '../utils/storage';
import { STORAGE_KEYS } from '../utils/constants';
import { onAuthStateChanged, signOut as supabaseSignOut } from '../services/authService';
import { supabase } from '../config/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  // Load user data on mount and listen to auth changes
  useEffect(() => {
    loadUserData();
    
    // Listen to Supabase auth state changes
    const unsubscribe = onAuthStateChanged(async (supaUser, session) => {
      if (supaUser && session && !isGuest) {
        try {
          // Fetch latest profile from Supabase
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', supaUser.id)
            .single();

          const userData = profile
            ? {
                uid: supaUser.id,
                email: supaUser.email,
                displayName: profile.name || supaUser.user_metadata?.full_name || null,
                photoURL: profile.photo_url || supaUser.user_metadata?.avatar_url || null,
                ...profile,
              }
            : {
                uid: supaUser.id,
                email: supaUser.email,
                displayName: supaUser.user_metadata?.full_name || null,
                photoURL: supaUser.user_metadata?.avatar_url || null,
              };

          const token = session.access_token;
          await saveUserToken(token);
          await saveUserData(userData);
          setToken(token);
          setUser(userData);
          setIsProfileComplete(profile?.is_profile_complete || false);
        } catch (error) {
          console.error('Error syncing user data:', error);
        }
      } else if (!isGuest) {
        setToken(null);
        setUser(null);
        setIsProfileComplete(false);
      }
    });
    
    return () => unsubscribe();
  }, [isGuest]);

  const loadUserData = async () => {
    try {
      const savedToken = await getUserToken();
      const savedUser = await getUserData();
      
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(savedUser);
        setIsProfileComplete(savedUser?.is_profile_complete || false);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData, authToken) => {
    try {
      await saveUserToken(authToken);
      await saveUserData(userData);
      setToken(authToken);
      setUser(userData);
      setIsGuest(false);
      return true;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const register = async (userData, authToken) => {
    try {
      await saveUserToken(authToken);
      await saveUserData(userData);
      setToken(authToken);
      setUser(userData);
      setIsProfileComplete(userData?.isProfileComplete || userData?.is_profile_complete || false);
      setIsGuest(false);
      return true;
    } catch (error) {
      console.error('Error during registration:', error);
      return false;
    }
  };

  const loginAsGuest = () => {
    setIsGuest(true);
    setUser({ name: 'Guest', isGuest: true });
    return true;
  };

  const logout = async () => {
    try {
      // Sign out from Supabase
      await supabaseSignOut();
      
      // Clear local storage
      await removeData(STORAGE_KEYS.USER_TOKEN);
      await removeData(STORAGE_KEYS.USER_DATA);
      
      setToken(null);
      setUser(null);
      setIsGuest(false);
      setIsProfileComplete(false);
      return true;
    } catch (error) {
      console.error('Error during logout:', error);
      return false;
    }
  };

  const updateUser = async (updatedData) => {
    try {
      const newUserData = { ...user, ...updatedData };
      await saveUserData(newUserData);
      setUser(newUserData);
      return true;
    } catch (error) {
      console.error('Error updating user:', error);
      return false;
    }
  };

  const isAuthenticated = () => {
    return !!token || isGuest;
  };

  const value = {
    user,
    token,
    loading,
    isGuest,
    isProfileComplete,
    login,
    register,
    loginAsGuest,
    logout,
    updateUser,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

