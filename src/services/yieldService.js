import api from '../utils/api';
import { API_ENDPOINTS } from '../utils/constants';
import { generateId } from '../utils/helpers';
import { saveYieldHistory } from '../utils/storage';

// Mock API responses
const MOCK_MODE = true;

const YIELD_DATA = {
  maize: { min: 25, max: 45, unit: 'maunds' }, // per acre
  wheat: { min: 35, max: 55, unit: 'maunds' },
  rice: { min: 30, max: 50, unit: 'maunds' },
  potato: { min: 150, max: 250, unit: 'maunds' },
  tomato: { min: 200, max: 350, unit: 'maunds' },
};

// Predict crop yield
export const predictYield = async (predictionData) => {
  try {
    const { cropType, farmSize, location, soilColor, previousCrop, fertilizerUsed, userId } = predictionData;
    
    if (MOCK_MODE) {
      // Mock prediction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const cropData = YIELD_DATA[cropType] || YIELD_DATA.wheat;
      
      // Calculate base yield
      let baseYield = cropData.min + Math.random() * (cropData.max - cropData.min);
      
      // Adjust based on factors
      if (soilColor === 'dark_brown' || soilColor === 'black') {
        baseYield *= 1.1; // 10% increase for fertile soil
      }
      
      if (fertilizerUsed && fertilizerUsed !== 'none') {
        baseYield *= 1.15; // 15% increase for fertilizer
      }
      
      // Round to 1 decimal
      const yieldPerAcre = Math.round(baseYield * 10) / 10;
      const totalYield = Math.round(yieldPerAcre * farmSize * 10) / 10;
      
      // Regional average (slightly lower than predicted)
      const regionalAverage = Math.round((baseYield * 0.85) * 10) / 10;
      
      const result = {
        id: generateId(),
        userId,
        cropType,
        farmSize,
        location,
        soilColor,
        previousCrop,
        fertilizerUsed,
        predictedYield: yieldPerAcre,
        totalYield,
        regionalAverage,
        unit: cropData.unit,
        confidence: 0.80 + Math.random() * 0.15, // 80-95%
        predictionDate: new Date().toISOString(),
        recommendationsEn: [
          'Use recommended seed variety for better yield',
          'Apply fertilizer in split doses',
          'Maintain proper irrigation schedule',
          'Control weeds regularly',
          'Monitor for pests and diseases',
        ],
        recommendationsUr: [
          'بہتر پیداوار کے لیے تجویز کردہ بیج کی قسم استعمال کریں',
          'کھاد کو تقسیم شدہ مقدار میں ڈالیں',
          'مناسب آبپاشی کا شیڈول برقرار رکھیں',
          'جڑی بوٹیوں کو باقاعدگی سے کنٹرول کریں',
          'کیڑوں اور بیماریوں کی نگرانی کریں',
        ],
      };
      
      // Save to history
      await saveYieldHistory(result);
      
      return result;
    }
    
    const response = await api.post(API_ENDPOINTS.YIELD.PREDICT, predictionData);
    
    // Save to history
    await saveYieldHistory(response.data);
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get yield prediction history
export const getYieldHistory = async (userId) => {
  try {
    if (MOCK_MODE) {
      const { getYieldHistory } = require('../utils/storage');
      return await getYieldHistory();
    }
    
    const response = await api.get(`${API_ENDPOINTS.YIELD.HISTORY}/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

