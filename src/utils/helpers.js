import { Dimensions, Platform } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

// Format date for display
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-GB');
};

// Format number with commas
export const formatNumber = (num) => {
  if (!num) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Convert image to base64
export const convertImageToBase64 = async (uri) => {
  try {
    const RNFS = require('react-native-fs');
    const base64 = await RNFS.readFile(uri, 'base64');
    return base64;
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return null;
  }
};

// Generate unique ID
export const generateId = () => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Validate phone number (Pakistan format)
export const validatePhoneNumber = (phone) => {
  const regex = /^((\+92)|(0092)|(92)|(0))(3)([0-9]{9})$/;
  return regex.test(phone.replace(/\s/g, ''));
};

// Get health status color
export const getHealthStatusColor = (status) => {
  switch (status) {
    case 'healthy':
      return '#4CAF50';
    case 'warning':
      return '#FFC107';
    case 'diseased':
      return '#F44336';
    default:
      return '#757575';
  }
};

// Calculate confidence level
export const getConfidenceLevel = (confidence) => {
  if (confidence >= 0.9) return 'high';
  if (confidence >= 0.7) return 'medium';
  return 'low';
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Delay function
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Check if network is available
export const checkNetworkStatus = async () => {
  try {
    const NetInfo = require('@react-native-community/netinfo');
    const state = await NetInfo.fetch();
    return state.isConnected;
  } catch (error) {
    console.error('Error checking network status:', error);
    return false;
  }
};

