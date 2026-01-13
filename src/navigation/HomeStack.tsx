// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from '../screens/HomeScreen';
// import ArtistDetailsScreen from '../screens/ArtistDetailsScreen';
// import SearchScreen from '../screens/SearchScreen'; // <--- Import
// import AlbumDetailsScreen from '../screens/AlbumDetailsScreen';
// import QueueScreen from '../screens/QueueScreen';
// // 1. Import it



// const Stack = createNativeStackNavigator();

// export default function HomeStack() {
//     return (
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//             {/* The main list */}
//             <Stack.Screen name="HomeScreen" component={HomeScreen} />
            
            

//             {/* The detail page (Tabs will stay visible here!) */}
//             <Stack.Screen name="ArtistDetails" component={ArtistDetailsScreen} />

//             <Stack.Screen name="Search" component={SearchScreen} />
//             <Stack.Screen name="AlbumDetails" component={AlbumDetailsScreen} />
//             <Stack.Screen
//                 name="Queue"
//                 component={QueueScreen}
//                 options={{ title: 'Queue', headerBackTitle: 'Back' }}
//             />
            
//         </Stack.Navigator>
//     );
// }
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useThemeStore, Colors } from '../store/useThemeStore'; // <--- Import Theme Store

import HomeScreen from '../screens/HomeScreen';
import ArtistDetailsScreen from '../screens/ArtistDetailsScreen';
import SearchScreen from '../screens/SearchScreen';
import AlbumDetailsScreen from '../screens/AlbumDetailsScreen';
import QueueScreen from '../screens/QueueScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
    // 1. Access the current theme
    const isDarkMode = useThemeStore((state) => state.isDarkMode);
    const theme = isDarkMode ? Colors.dark : Colors.light;

    return (
        <Stack.Navigator 
            screenOptions={{ 
                headerShown: false,
                // 2. Set the content style background to avoid white flashes during transitions
                contentStyle: { backgroundColor: theme.background } 
            }}
        >
            {/* The main list */}
            <Stack.Screen name="HomeScreen" component={HomeScreen} />

            {/* The detail page (Tabs will stay visible here!) */}
            <Stack.Screen name="ArtistDetails" component={ArtistDetailsScreen} />

            <Stack.Screen name="Search" component={SearchScreen} />
            
            <Stack.Screen name="AlbumDetails" component={AlbumDetailsScreen} />
            
            <Stack.Screen
                name="Queue"
                component={QueueScreen}
                options={{ 
                    headerShown: true, // Show header for Queue specifically if desired
                    title: 'Queue', 
                    headerStyle: { backgroundColor: theme.background },
                    headerTintColor: theme.text,
                    headerShadowVisible: false,
                    headerBackTitle: 'Back' 
                }}
            />
        </Stack.Navigator>
    );
}