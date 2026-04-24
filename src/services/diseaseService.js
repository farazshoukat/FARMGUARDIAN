import api from '../utils/api';
import { API_ENDPOINTS } from '../utils/constants';
import { generateId } from '../utils/helpers';
import { saveDiseaseHistory } from '../utils/storage';

// Mock API responses
const MOCK_MODE = true;

const MOCK_DISEASES = {
  maize: [
    { name: 'Common Rust', nameUr: 'عام زنگ', severity: 'warning' },
    { name: 'Northern Leaf Blight', nameUr: 'شمالی پتی کا دھبہ', severity: 'diseased' },
    { name: 'Gray Leaf Spot', nameUr: 'سرمئی پتی کا دھبہ', severity: 'diseased' },
  ],
  wheat: [
    { name: 'Leaf Rust', nameUr: 'پتی کا زنگ', severity: 'warning' },
    { name: 'Yellow Rust', nameUr: 'پیلا زنگ', severity: 'diseased' },
    { name: 'Septoria Leaf Blotch', nameUr: 'سیپٹوریا دھبہ', severity: 'warning' },
  ],
  rice: [
    { name: 'Blast', nameUr: 'بلاسٹ', severity: 'diseased' },
    { name: 'Brown Spot', nameUr: 'بھورا دھبہ', severity: 'warning' },
    { name: 'Bacterial Leaf Blight', nameUr: 'بیکٹیریل پتی کا جھلساؤ', severity: 'diseased' },
  ],
  potato: [
    { name: 'Late Blight', nameUr: 'دیر سے آنے والا جھلساؤ', severity: 'diseased' },
    { name: 'Early Blight', nameUr: 'جلد آنے والا جھلساؤ', severity: 'warning' },
    { name: 'Potato Virus Y', nameUr: 'آلو وائرس Y', severity: 'diseased' },
  ],
  tomato: [
    { name: 'Late Blight', nameUr: 'دیر سے آنے والا جھلساؤ', severity: 'diseased' },
    { name: 'Early Blight', nameUr: 'جلد آنے والا جھلساؤ', severity: 'warning' },
    { name: 'Leaf Curl', nameUr: 'پتی کا مڑنا', severity: 'diseased' },
    { name: 'Bacterial Wilt', nameUr: 'بیکٹیریل مرجھاؤ', severity: 'diseased' },
  ],
};

const MOCK_RECOMMENDATIONS = {
  healthy: [
    'Continue regular monitoring of your crops',
    'Maintain proper irrigation schedule',
    'Apply preventive fungicide spray',
    'Remove any infected leaves immediately',
  ],
  warning: [
    'Monitor the affected area closely',
    'Apply recommended fungicide treatment',
    'Improve air circulation between plants',
    'Avoid overhead watering',
    'Remove infected leaves carefully',
  ],
  diseased: [
    'Isolate affected plants immediately',
    'Apply targeted fungicide or pesticide',
    'Remove and destroy severely infected plants',
    'Consult agricultural expert if spreading',
    'Do not use infected material for composting',
    'Disinfect tools after use',
  ],
};

// Detect disease from image
export const detectDisease = async (imageBase64, cropType, userId) => {
  try {
    if (MOCK_MODE) {
      // Mock detection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const random = Math.random();
      let status, disease, recommendations;
      
      if (random < 0.3) {
        // Healthy
        status = 'healthy';
        disease = { name: 'No disease detected', nameUr: 'کوئی بیماری نہیں ملی' };
        recommendations = MOCK_RECOMMENDATIONS.healthy;
      } else if (random < 0.6) {
        // Warning
        status = 'warning';
        const diseases = MOCK_DISEASES[cropType] || MOCK_DISEASES.wheat;
        const warningDiseases = diseases.filter(d => d.severity === 'warning');
        disease = warningDiseases[Math.floor(Math.random() * warningDiseases.length)] || diseases[0];
        recommendations = MOCK_RECOMMENDATIONS.warning;
      } else {
        // Diseased
        status = 'diseased';
        const diseases = MOCK_DISEASES[cropType] || MOCK_DISEASES.wheat;
        const diseasedList = diseases.filter(d => d.severity === 'diseased');
        disease = diseasedList[Math.floor(Math.random() * diseasedList.length)] || diseases[0];
        recommendations = MOCK_RECOMMENDATIONS.diseased;
      }
      
      const result = {
        id: generateId(),
        userId,
        cropType,
        imageUri: `data:image/jpeg;base64,${imageBase64.substring(0, 100)}...`,
        detectionDate: new Date().toISOString(),
        result: {
          status,
          diseaseName: disease.name,
          diseaseNameUrdu: disease.nameUr,
          confidence: 0.85 + Math.random() * 0.14, // 85-99%
          recommendations,
        }
      };
      
      // Save to history
      await saveDiseaseHistory(result);
      
      return result;
    }
    
    const response = await api.post(API_ENDPOINTS.DISEASE.DETECT, {
      image: imageBase64,
      cropType,
      userId,
    });
    
    // Save to history
    await saveDiseaseHistory(response.data);
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get disease detection history
export const getDiseaseHistory = async (userId) => {
  try {
    if (MOCK_MODE) {
      const { getDiseaseHistory } = require('../utils/storage');
      return await getDiseaseHistory();
    }
    
    const response = await api.get(`${API_ENDPOINTS.DISEASE.HISTORY}/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

