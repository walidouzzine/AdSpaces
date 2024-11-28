import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      error: null,
      setUser: (user) => set({ user }),
      setError: (error) => set({ error }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: async () => {
        try {
          await signOut(auth);
          set({ user: null, error: null });
        } catch (error) {
          set({ error: (error as Error).message });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }), // Only persist user data
    }
  )
);