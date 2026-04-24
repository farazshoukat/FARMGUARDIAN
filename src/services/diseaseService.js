import { generateId } from '../utils/helpers';
import { saveDiseaseHistory } from '../utils/storage';
import { classifyImage } from './tfliteService';
import { normalizeImageUri, validateImageUri } from '../utils/imagePreprocessor';

// Detect disease from image
export const detectDisease = async (imageUri, cropType, userId) => {
  try {
    // Validate URI
    const { valid, reason } = validateImageUri(imageUri);
    if (!valid) {
      throw new Error(reason || 'Invalid image');
    }

    const normalizedUri = normalizeImageUri(imageUri);

    // Run on-device TFLite inference
    const inference = await classifyImage(normalizedUri, cropType);

    const record = {
      id: generateId(),
      userId,
      cropType,
      imageUri: normalizedUri,
      detectionDate: new Date().toISOString(),
      result: {
        status: inference.status,
        diseaseName: inference.diseaseLabel,
        diseaseNameUrdu: inference.diseaseLabelUr,
        confidence: inference.confidence,
        recommendations: inference.recommendations,
      },
    };

    await saveDiseaseHistory(record);
    return record;
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

