import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './constants';

// Save data to AsyncStorage
export const saveData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    return false;
  }
};

// Get data from AsyncStorage
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};

// Remove data from AsyncStorage
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing data:', error);
    return false;
  }
};

// Clear all data
export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
};

// Save user token
export const saveUserToken = async (token) => {
  return await saveData(STORAGE_KEYS.USER_TOKEN, token);
};

// Get user token
export const getUserToken = async () => {
  return await getData(STORAGE_KEYS.USER_TOKEN);
};

// Save user data
export const saveUserData = async (userData) => {
  return await saveData(STORAGE_KEYS.USER_DATA, userData);
};

// Get user data
export const getUserData = async () => {
  return await getData(STORAGE_KEYS.USER_DATA);
};

// Save language preference
export const saveLanguage = async (language) => {
  return await saveData(STORAGE_KEYS.LANGUAGE, language);
};

// Get language preference
export const getLanguage = async () => {
  const lang = await getData(STORAGE_KEYS.LANGUAGE);
  return lang || 'ur'; // Default to Urdu
};

// Save disease detection history
export const saveDiseaseHistory = async (detection) => {
  try {
    const history = await getData(STORAGE_KEYS.DISEASE_HISTORY) || [];
    history.unshift(detection); // Add to beginning
    if (history.length > 50) history.pop(); // Keep last 50 only
    return await saveData(STORAGE_KEYS.DISEASE_HISTORY, history);
  } catch (error) {
    console.error('Error saving disease history:', error);
    return false;
  }
};

// Get disease detection history
export const getDiseaseHistory = async () => {
  return await getData(STORAGE_KEYS.DISEASE_HISTORY) || [];
};

// Save yield prediction history
export const saveYieldHistory = async (prediction) => {
  try {
    const history = await getData(STORAGE_KEYS.YIELD_HISTORY) || [];
    history.unshift(prediction);
    if (history.length > 50) history.pop();
    return await saveData(STORAGE_KEYS.YIELD_HISTORY, history);
  } catch (error) {
    console.error('Error saving yield history:', error);
    return false;
  }
};

// Get yield prediction history
export const getYieldHistory = async () => {
  return await getData(STORAGE_KEYS.YIELD_HISTORY) || [];
};

// Save pending API request (for offline mode)
export const savePendingRequest = async (request) => {
  try {
    const pending = await getData(STORAGE_KEYS.PENDING_REQUESTS) || [];
    pending.push(request);
    return await saveData(STORAGE_KEYS.PENDING_REQUESTS, pending);
  } catch (error) {
    console.error('Error saving pending request:', error);
    return false;
  }
};

// Get pending requests
export const getPendingRequests = async () => {
  return await getData(STORAGE_KEYS.PENDING_REQUESTS) || [];
};

// Clear pending requests
export const clearPendingRequests = async () => {
  return await removeData(STORAGE_KEYS.PENDING_REQUESTS);
};

// Check if first time user
export const isFirstTime = async () => {
  const firstTime = await getData(STORAGE_KEYS.IS_FIRST_TIME);
  return firstTime === null;
};

// Mark as not first time
export const markNotFirstTime = async () => {
  return await saveData(STORAGE_KEYS.IS_FIRST_TIME, false);
};

