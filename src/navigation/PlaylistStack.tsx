// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import PlaylistsScreen from '../screens/PlaylistsScreen';
// import PlaylistDetailsScreen from '../screens/PlaylistDetailScreen';

// const PStack = createNativeStackNavigator();

// // This stack handles everything inside the "Playlists" tab
// export default function PlaylistStack() {
//   return (
//     <PStack.Navigator screenOptions={{ headerShown: false }}>
//       <PStack.Screen name="PlaylistsMain" component={PlaylistsScreen} />
//       {/* This is the missing link that was causing your error! */}
//       <PStack.Screen name="PlaylistDetails" component={PlaylistDetailsScreen} />
//     </PStack.Navigator>
//   );
// }
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useThemeStore, Colors } from '../store/useThemeStore'; // <--- Import Theme Store
import PlaylistsScreen from '../screens/PlaylistsScreen';
import PlaylistDetailsScreen from '../screens/PlaylistDetailScreen';

const PStack = createNativeStackNavigator();

// This stack handles everything inside the "Playlists" tab
export default function PlaylistStack() {
  // 1. Access the current theme
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  return (
    <PStack.Navigator 
      screenOptions={{ 
        headerShown: false,
        // 2. Apply the theme background to the entire stack
        contentStyle: { backgroundColor: theme.background } 
      }}
    >
      <PStack.Screen name="PlaylistsMain" component={PlaylistsScreen} />
      
      {/* 3. PlaylistDetails now loads on top of the dark theme background */}
      <PStack.Screen name="PlaylistDetails" component={PlaylistDetailsScreen} />
    </PStack.Navigator>
  );
}