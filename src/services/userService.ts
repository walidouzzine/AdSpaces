import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { User } from '../types';

export const getUserRole = async (uid: string): Promise<User['role']> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data().role;
    }
    return 'client'; // Default role for new users
  } catch (error) {
    console.error('Error getting user role:', error);
    return 'client';
  }
};

export const createUserProfile = async (userData: Omit<User, 'createdAt'> & { role: User['role'] }) => {
  try {
    const user: User = {
      ...userData,
      createdAt: new Date()
    };

    await setDoc(doc(db, 'users', user.id), user);
    return user;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};