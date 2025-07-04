import { collection, addDoc, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const submitGrievance = async (grievanceData) => {
  try {
    console.log('=== STARTING GRIEVANCE SUBMISSION ===');
    console.log('Grievance data to submit:', JSON.stringify(grievanceData, null, 2));
    console.log('userId to be saved:', grievanceData.userId);
    
    console.log('Creating document reference...');
    const grievanceCollection = collection(db, 'grievances');
    console.log('Collection reference created:', grievanceCollection);
    
    const dataToSubmit = {
      ...grievanceData,
      status: 'pending',
      createdAt: Timestamp.now()
    };
    
    console.log('Final data to submit:', JSON.stringify(dataToSubmit, null, 2));
    console.log('Calling addDoc...');
    
    const docRef = await addDoc(grievanceCollection, dataToSubmit);
    
    console.log('=== SUBMISSION SUCCESSFUL ===');
    console.log('Document ID:', docRef.id);
    console.log('Document path:', docRef.path);
    
    return docRef.id;
  } catch (error) {
    console.log('=== SUBMISSION FAILED ===');
    console.error('Full error object:', error);
    console.error('Error name:', error?.name);
    console.error('Error code:', error?.code);
    console.error('Error message:', error?.message);
    console.error('Error stack:', error?.stack);
    
    // Log specific Firebase errors
    if (error?.code) {
      console.error('Firebase error code:', error.code);
      switch (error.code) {
        case 'permission-denied':
          console.error('Permission denied - check Firestore security rules');
          break;
        case 'unavailable':
          console.error('Firestore is unavailable - check network connection');
          break;
        case 'unauthenticated':
          console.error('User is not authenticated');
          break;
        default:
          console.error('Unknown Firebase error');
      }
    }
    
    throw error;
  }
};

export const getUserGrievances = async (userId) => {
  try {
    console.log('[getUserGrievances] called with userId:', userId);
    const q = query(
      collection(db, 'grievances'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const results = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log('[getUserGrievances] fetched grievances:', results);
    return results;
  } catch (error) {
    console.error('Error fetching user grievances:', error);
    throw error;
  }
};

export const getAllGrievances = async () => {
  try {
    const q = query(
      collection(db, 'grievances'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching all grievances:', error);
    throw error;
  }
};
