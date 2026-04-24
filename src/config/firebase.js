import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Helper functions to get instances (React Native Firebase pattern)
const getAuth = () => auth();
const getFirestore = () => firestore();

export { getAuth, getFirestore, auth, firestore };

export default {
  getAuth,
  getFirestore,
  auth,
  firestore,
};
