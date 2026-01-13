// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from '@expo/vector-icons';
// // 1. Import the hook
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import PlaylistStack from './PlaylistStack';
// import HomeScreen from '../screens/HomeScreen';
// import FavoritesScreen from '../screens/FavoritesScreen';
// import PlaylistsScreen from '../screens/PlaylistsScreen';
// import SettingsScreen from '../screens/SettingsScreen';
// import HomeStack from './HomeStack';
// const Tab = createBottomTabNavigator();
// const BRAND_COLOR = '#FF6B00';

// export default function BottomTabs() {
//   // 2. Get the safe area values (this tells us how tall the bottom bar is)
//   const insets = useSafeAreaInsets();

//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarActiveTintColor: BRAND_COLOR,
//         tabBarInactiveTintColor: 'gray',
//         tabBarStyle: {
//           // 3. dynamically add the bottom notch height
//           height: 60 + insets.bottom, 
//           paddingBottom: insets.bottom, 
//           paddingTop: 8,
//           borderTopWidth: 0,
//           elevation: 0,
//           backgroundColor: '#fff',
//         },
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName: keyof typeof Ionicons.glyphMap = 'alert';
//           if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
//           else if (route.name === 'Favorites') iconName = focused ? 'heart' : 'heart-outline';
//           else if (route.name === 'Playlists') iconName = focused ? 'document-text' : 'document-text-outline';
//           else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
//           return <Ionicons name={iconName} size={24} color={color} />;
//         },
//       })}
//     >
//       <Tab.Screen 
//   name="Home" 
//   component={HomeStack} // <--- CHANGE THIS (It was previously HomeScreen)
//   options={{
//     tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
//     headerShown: false // Important: Hide the default tab header
//   }} 
// />
//       <Tab.Screen name="Favorites" component={FavoritesScreen} />
//       <Tab.Screen name="Playlists" component={PlaylistStack} />
      
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//     </Tab.Navigator>
//   );
// }
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeStore, Colors } from '../store/useThemeStore'; // <--- Import Theme Store

import HomeStack from './HomeStack';
import FavoritesScreen from '../screens/FavoritesScreen';
import PlaylistStack from './PlaylistStack';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const insets = useSafeAreaInsets();
  
  // 1. Access the current theme
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        // 2. Dynamic active and inactive colors from theme
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.subText,
        tabBarStyle: {
          height: 60 + insets.bottom, 
          paddingBottom: insets.bottom, 
          paddingTop: 8,
          borderTopWidth: 0,
          elevation: 0,
          // 3. Dynamic background color matching the "Mume" UI
          backgroundColor: theme.tabBar, 
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'alert';
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Favorites') iconName = focused ? 'heart' : 'heart-outline';
          else if (route.name === 'Playlists') iconName = focused ? 'document-text' : 'document-text-outline';
          else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack} 
        options={{
          headerShown: false 
        }} 
      />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Playlists" component={PlaylistStack} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}