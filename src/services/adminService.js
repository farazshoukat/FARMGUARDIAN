import api from '../utils/api';
import { API_ENDPOINTS } from '../utils/constants';

const MOCK_MODE = true;

// Get registered farmers (admin only)
export const getFarmers = async () => {
  try {
    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return [
        {
          id: '1',
          name: 'Muhammad Ali',
          phoneNumber: '03001234567',
          district: 'Faisalabad',
          village: 'Chak 123',
          farmSize: 10,
          cropsGrown: ['wheat', 'maize'],
          joinedDate: '2024-01-15',
        },
        {
          id: '2',
          name: 'Ahmed Khan',
          phoneNumber: '03111234567',
          district: 'Multan',
          village: 'Village A',
          farmSize: 15,
          cropsGrown: ['rice', 'wheat'],
          joinedDate: '2024-01-20',
        },
        {
          id: '3',
          name: 'Hassan Raza',
          phoneNumber: '03221234567',
          district: 'Lahore',
          village: 'Village B',
          farmSize: 8,
          cropsGrown: ['potato', 'tomato'],
          joinedDate: '2024-02-01',
        },
      ];
    }
    
    const response = await api.get(API_ENDPOINTS.ADMIN.GET_FARMERS);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get admin statistics
export const getAdminStats = async () => {
  try {
    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        totalFarmers: 156,
        totalDetections: 1247,
        totalPredictions: 892,
        activeUsers: 89,
        diseasesByType: {
          healthy: 523,
          warning: 412,
          diseased: 312,
        },
        cropDistribution: {
          wheat: 45,
          maize: 30,
          rice: 15,
          potato: 7,
          tomato: 3,
        },
      };
    }
    
    const response = await api.get(API_ENDPOINTS.ADMIN.GET_STATS);
    return response.data;
  } catch (error) {
    throw error;
  }
};

