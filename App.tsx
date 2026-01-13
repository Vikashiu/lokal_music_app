import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomTabs from './src/navigation/BottomTabs';
import MiniPlayer from './src/components/MiniPlayer';
import { usePlayerStore } from './src/store/usePlayerStore';
import { useThemeStore, Colors } from './src/store/useThemeStore'; // <--- Import Theme Store
import { useEffect } from 'react';
import GlobalOptionsHandler from './src/components/GlobalOptionsHandler';

export default function App() {
  const setupAudioMode = usePlayerStore((state) => state.setupAudioMode);
  
  // 1. Get the current theme state
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  useEffect(() => {
    setupAudioMode();
  }, []);

  // 2. Define a custom dark theme to match "Mume" UI
  const MumeDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: Colors.dark.background,
      card: Colors.dark.tabBar,
      text: Colors.dark.text,
      border: Colors.dark.border,
      primary: Colors.dark.primary,
    },
  };

  return (
    <SafeAreaProvider>
      {/* 3. Pass the theme to NavigationContainer */}
      <NavigationContainer theme={isDarkMode ? MumeDarkTheme : DefaultTheme}>
        
        {/* 4. Update StatusBar based on theme */}
        <StatusBar style={isDarkMode ? "light" : "dark"} />
        
        <BottomTabs />
        <GlobalOptionsHandler />
        <MiniPlayer /> 
        
      </NavigationContainer>
    </SafeAreaProvider>
  );
}