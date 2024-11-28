import React, { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { auth } from '../services/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { getUserRole } from '../services/userService';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  isAdmin: boolean;
  isSpaceOwner: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, setUser, setError, setLoading, isLoading } = useAuthStore();

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const role = await getUserRole(userCredential.user.uid);
      const userData: User = {
        id: userCredential.user.uid,
        email: userCredential.user.email!,
        name: userCredential.user.displayName || userCredential.user.email!.split('@')[0],
        role,
        createdAt: new Date(userCredential.user.metadata.creationTime!)
      };
      setUser(userData);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      try {
        if (firebaseUser) {
          const role = await getUserRole(firebaseUser.uid);
          const userData: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email!,
            name: firebaseUser.displayName || firebaseUser.email!.split('@')[0],
            role,
            createdAt: new Date(firebaseUser.metadata.creationTime!)
          };
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [setUser, setError, setLoading]);

  const isAdmin = user?.role === 'admin';
  const isSpaceOwner = user?.role === 'owner';

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading: isLoading, 
      error: null, 
      login,
      isAdmin,
      isSpaceOwner
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}