
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomTabs from './src/navigation/BottomTabs';
import MiniPlayer from './src/components/MiniPlayer';
import { usePlayerStore } from './src/store/usePlayerStore';
import { useEffect } from 'react';
import GlobalOptionsHandler from './src/components/GlobalOptionsHandler';

export default function App() {
  const setupAudioMode = usePlayerStore((state) => state.setupAudioMode);

  useEffect(() => {
    // Enable background audio when app starts
    setupAudioMode();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <BottomTabs />
        <GlobalOptionsHandler />
        {/* This stays visible on top of all screens */}
        <MiniPlayer /> 
        
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
