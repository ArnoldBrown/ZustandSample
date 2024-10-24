import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthStore = create(
  persist(
    (set) => ({
      items: [],
      loading: false,
      error: null,
      isAuthenticated: false,
      user: null,
      initializeAuth: async () => {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          set({ isAuthenticated: true, user: JSON.parse(user) });
        }
      },
      login: async (username, password) => {
        set({ loading: true });
        const response = await mockApiLogin(username, password);
        if (response.success) {
          await AsyncStorage.setItem('user', JSON.stringify(response.user));
          set({ isAuthenticated: true, user: response.user, error: null, loading: false });
        } else {
          set({ error: 'Login failed', isAuthenticated: false, loading: false });
        }
      },
      logout: async () => {
        await AsyncStorage.removeItem('user');
        set({ isAuthenticated: false, user: null });
      },
      fetchItems: async () => {
        set({ loading: true });
        try {
          const response = await fetch('https://fakestoreapi.com/products/');
          const data = await response.json();
          set({ items: data, loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },
    }),
    {
      name: 'auth-storage', // key to store in AsyncStorage
      getStorage: () => AsyncStorage, // specify AsyncStorage
    }
  )
);

// Mock API login function
const mockApiLogin = (username, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (username === 'admin' && password === 'password') {
        resolve({ success: true, user: { username: 'admin', role: 'admin' } });
      } else {
        resolve({ success: false });
      }
    }, 1000);
  });
};

export default useAuthStore;
