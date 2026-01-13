import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define our colors for both modes
export const Colors = {
  light: {
    background: '#FFFFFF',
    text: '#000000',
    
    subText: 'gray',
    card: '#f8f8f8',
    border: '#eeeeee',
    primary: '#FF6B00', // Your orange color
    tabBar: '#ffffff',
  },
  dark: {
    background: '#121212',
    text: '#FFFFFF',
    surface: '#1A1C22',
    subText: '#aaaaaa',
    card: '#1e1e1e',
    border: '#333333',
    primary: '#FF6B00',
    tabBar: '#121212',
  },
};


interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false, // Default to light mode
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);