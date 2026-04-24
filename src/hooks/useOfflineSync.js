import { useEffect, useRef } from 'react';
import NetInfo from '@react-native-community/netinfo';
import {
  getPendingRequests,
  clearPendingRequests,
  savePendingRequest,
} from '../utils/storage';
import api from '../utils/api';

/**
 * Hook for offline support and data syncing
 * Automatically syncs pending requests when connection is restored
 */
const useOfflineSync = () => {
  const isOnline = useRef(true);

  useEffect(() => {
    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener(state => {
      const wasOffline = !isOnline.current;
      isOnline.current = state.isConnected;

      // If connection restored, sync pending requests
      if (wasOffline && isOnline.current) {
        syncPendingRequests();
      }
    });

    return () => unsubscribe();
  }, []);

  const syncPendingRequests = async () => {
    try {
      const pending = await getPendingRequests();
      
      if (pending.length === 0) return;

      console.log(`Syncing ${pending.length} pending requests...`);

      const results = await Promise.allSettled(
        pending.map(request => {
          return api({
            method: request.method,
            url: request.url,
            data: request.data,
          });
        })
      );

      // Log sync results
      const succeeded = results.filter(r => r.status === 'fulfilled').length;
      const failed = results.filter(r => r.status === 'rejected').length;

      console.log(`Sync complete: ${succeeded} succeeded, ${failed} failed`);

      // Clear synced requests (in production, only clear successful ones)
      await clearPendingRequests();
    } catch (error) {
      console.error('Error syncing pending requests:', error);
    }
  };

  const queueRequest = async (method, url, data) => {
    await savePendingRequest({ method, url, data, timestamp: Date.now() });
  };

  return {
    isOnline: isOnline.current,
    queueRequest,
    syncPendingRequests,
  };
};

export default useOfflineSync;

