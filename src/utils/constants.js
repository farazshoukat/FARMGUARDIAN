// Crop types constants
export const CROPS = {
  MAIZE: 'maize',
  WHEAT: 'wheat',
  RICE: 'rice',
  POTATO: 'potato',
  TOMATO: 'tomato',
};

export const CROP_LIST = [
  { id: CROPS.MAIZE, nameEn: 'Maize', nameUr: 'مکئی', icon: '🌽' },
  { id: CROPS.WHEAT, nameEn: 'Wheat', nameUr: 'گندم', icon: '🌾' },
  { id: CROPS.RICE, nameEn: 'Rice', nameUr: 'چاول', icon: '🍚' },
  { id: CROPS.POTATO, nameEn: 'Potato', nameUr: 'آلو', icon: '🥔' },
  { id: CROPS.TOMATO, nameEn: 'Tomato', nameUr: 'ٹماٹر', icon: '🍅' },
];

// Health status
export const HEALTH_STATUS = {
  HEALTHY: 'healthy',
  WARNING: 'warning',
  DISEASED: 'diseased',
};

// Soil colors
export const SOIL_COLORS = [
  { id: 'dark_brown', nameEn: 'Dark Brown', nameUr: 'گہرا بھورا', color: '#654321' },
  { id: 'light_brown', nameEn: 'Light Brown', nameUr: 'ہلکا بھورا', color: '#A0826D' },
  { id: 'red', nameEn: 'Red', nameUr: 'سرخ', color: '#8B4513' },
  { id: 'black', nameEn: 'Black', nameUr: 'کالی', color: '#2C1810' },
  { id: 'gray', nameEn: 'Gray', nameUr: 'سرمئی', color: '#808080' },
];

// Fertilizer types
export const FERTILIZER_TYPES = [
  { id: 'urea', nameEn: 'Urea', nameUr: 'یوریا' },
  { id: 'dap', nameEn: 'DAP', nameUr: 'ڈی اے پی' },
  { id: 'npk', nameEn: 'NPK', nameUr: 'این پی کے' },
  { id: 'organic', nameEn: 'Organic/Compost', nameUr: 'نامیاتی کھاد' },
  { id: 'none', nameEn: 'None', nameUr: 'کوئی نہیں' },
];

// Districts in Punjab
export const DISTRICTS = [
  { id: 'lahore', nameEn: 'Lahore', nameUr: 'لاہور' },
  { id: 'faisalabad', nameEn: 'Faisalabad', nameUr: 'فیصل آباد' },
  { id: 'multan', nameEn: 'Multan', nameUr: 'ملتان' },
  { id: 'rawalpindi', nameEn: 'Rawalpindi', nameUr: 'راولپنڈی' },
  { id: 'gujranwala', nameEn: 'Gujranwala', nameUr: 'گوجرانوالہ' },
  { id: 'sialkot', nameEn: 'Sialkot', nameUr: 'سیالکوٹ' },
  { id: 'bahawalpur', nameEn: 'Bahawalpur', nameUr: 'بہاولپور' },
  { id: 'sargodha', nameEn: 'Sargodha', nameUr: 'سرگودھا' },
  { id: 'sheikupura', nameEn: 'Sheikhupura', nameUr: 'شیخوپورہ' },
  { id: 'jhang', nameEn: 'Jhang', nameUr: 'جھنگ' },
  { id: 'rahim_yar_khan', nameEn: 'Rahim Yar Khan', nameUr: 'رحیم یار خان' },
  { id: 'sahiwal', nameEn: 'Sahiwal', nameUr: 'ساہیوال' },
];

// Crop stages
export const CROP_STAGES = [
  { id: 'sowing', nameEn: 'Sowing/Planting', nameUr: 'بوائی' },
  { id: 'germination', nameEn: 'Germination', nameUr: 'اگاؤ' },
  { id: 'vegetative', nameEn: 'Vegetative Growth', nameUr: 'نشوونما' },
  { id: 'flowering', nameEn: 'Flowering', nameUr: 'پھول آنا' },
  { id: 'fruiting', nameEn: 'Fruiting/Grain Fill', nameUr: 'پھل لگنا' },
  { id: 'maturity', nameEn: 'Maturity', nameUr: 'پختگی' },
  { id: 'harvest', nameEn: 'Harvest', nameUr: 'کٹائی' },
];

// Colors
export const COLORS = {
  primary: '#2E7D32', // Green
  secondary: '#FF6F00', // Orange
  healthy: '#4CAF50', // Green
  warning: '#FFC107', // Yellow
  diseased: '#F44336', // Red
  background: '#F5F5F5',
  surface: '#FFFFFF',
  text: '#212121',
  textSecondary: '#757575',
  border: '#E0E0E0',
  disabled: '#BDBDBD',
};

// API endpoints (mock for now)
export const API_BASE_URL = 'https://api.farmguardian.pk'; // Change to actual URL

export const API_ENDPOINTS = {
  AUTH: {
    SEND_OTP: '/api/auth/send-otp',
    VERIFY_OTP: '/api/auth/verify-otp',
    REGISTER: '/api/auth/register',
  },
  DISEASE: {
    DETECT: '/api/disease/detect',
    HISTORY: '/api/disease/history',
  },
  YIELD: {
    PREDICT: '/api/yield/predict',
    HISTORY: '/api/yield/history',
  },
  ADVISORY: {
    GET_RECOMMENDATIONS: '/api/advisory/recommendations',
  },
  ADMIN: {
    LOGIN: '/api/admin/login',
    GET_FARMERS: '/api/admin/farmers',
    GET_STATS: '/api/admin/stats',
  },
};

// AsyncStorage keys
export const STORAGE_KEYS = {
  USER_TOKEN: '@user_token',
  USER_DATA: '@user_data',
  LANGUAGE: '@language',
  DISEASE_HISTORY: '@disease_history',
  YIELD_HISTORY: '@yield_history',
  PENDING_REQUESTS: '@pending_requests',
  IS_FIRST_TIME: '@is_first_time',
};

// Permissions
export const REQUIRED_PERMISSIONS = {
  CAMERA: 'camera',
  LOCATION: 'location',
  STORAGE: 'storage',
};

