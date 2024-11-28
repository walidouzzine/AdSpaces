import { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuthStore } from '../store/authStore';
import { User } from '../types';
import { getUserRole, createUserProfile } from '../services/userService';

export function useAuth() {
  const { setUser, setError, setLoading } = useAuthStore();
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      setLoading(true);
      if (user) {
        try {
          const role = await getUserRole(user.uid);
          const userData: User = {
            id: user.uid,
            email: user.email!,
            name: user.displayName || user.email!.split('@')[0],
            role,
            createdAt: new Date(user.metadata.creationTime!)
          };
          setUser(userData);
        } catch (error) {
          console.error('Error getting user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, role: User['role'] = 'client') => {
    try {
      setLoading(true);
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      
      const userData: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        name: firebaseUser.displayName || email.split('@')[0],
        role,
        createdAt: new Date()
      };

      await createUserProfile(userData);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
      throw error;
    }
  };

  return {
    user: firebaseUser,
    login,
    register,
    logout
  };
}