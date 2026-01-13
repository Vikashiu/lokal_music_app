// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import SongsTab from '../tabs/SongTab';    // <--- Import New Component
// import ArtistsTab from '../tabs/ArtistTab'; // <--- Import Artists
// import { useNavigation } from '@react-navigation/native';
// import AlbumsTab from '../tabs/AlbumsTab';
// import SuggestedTab from '../tabs/SuggestedTab';


// export default function HomeScreen() {
//   const [activeTab, setActiveTab] = useState('Songs');
//   const tabs = ['Suggested', 'Songs', 'Artists', 'Albums', 'Folders'];
// const navigation = useNavigation<any>();
//   // Render content based on active tab
//   const renderContent = () => {
//     switch (activeTab) {
//       case 'Songs':
//         return <SongsTab />;
//       case 'Artists':
//         return <ArtistsTab />;
//       case 'Albums':
//         return <AlbumsTab />;
//       case 'Suggested':
//         return <SuggestedTab onSwitchTab={(tabName) => setActiveTab(tabName)} />;
//       default:
//         // Placeholder for other tabs
//         return (
//           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <Text style={{ color: 'gray' }}>{activeTab} coming soon...</Text>
//           </View>
//         );
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* 1. Main Header */}
//       <View style={[styles.header, { paddingHorizontal: 20 }]}>
//         <View style={styles.logoContainer}>
//           <Ionicons name="musical-notes" size={28} color="#FF6B00" />
//           <Text style={styles.logoText}>Mume</Text>
//         </View>
//         <TouchableOpacity onPress={() => navigation.navigate('Search')}>
//           <Ionicons name="search" size={24} color="#000" />
//         </TouchableOpacity>
//       </View>

//       {/* 2. Scrollable Tab Bar */}
//       <View style={styles.tabContainer}>
//         <ScrollView 
//           horizontal 
//           showsHorizontalScrollIndicator={false} 
//           contentContainerStyle={{ paddingHorizontal: 20 }}
//         >
//           {tabs.map((tab) => (
//             <TouchableOpacity 
//               key={tab} 
//               onPress={() => setActiveTab(tab)} 
//               style={[
//                 styles.tabItem, 
//                 activeTab === tab && styles.activeTabItem
//               ]}
//             >
//               <Text style={[
//                 styles.tabText, 
//                 activeTab === tab && styles.activeTabText
//               ]}>
//                 {tab}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>

//       {/* 3. Content Area (SongsTab or ArtistsTab) */}
//       <View style={{ flex: 1 }}>
//         {renderContent()}
//       </View>

//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 10,
//     marginBottom: 24,
//   },
//   logoContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
//   logoText: { fontSize: 24, fontWeight: 'bold', color: '#000' },
//   tabContainer: { borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
//   tabItem: { marginRight: 28, paddingBottom: 10 },
//   activeTabItem: { borderBottomWidth: 3, borderBottomColor: '#FF6B00' },
//   tabText: { fontSize: 16, color: 'gray', fontWeight: '500' },
//   activeTabText: { color: '#FF6B00', fontWeight: 'bold' },
// });
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore, Colors } from '../store/useThemeStore'; // <--- Import Theme Store

import SongsTab from '../tabs/SongTab';
import ArtistsTab from '../tabs/ArtistTab';
import AlbumsTab from '../tabs/AlbumsTab';
import SuggestedTab from '../tabs/SuggestedTab';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('Songs');
  const tabs = ['Suggested', 'Songs', 'Artists', 'Albums', 'Folders'];
  const navigation = useNavigation<any>();

  // 1. Access the current theme
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  const renderContent = () => {
    switch (activeTab) {
      case 'Songs':
        return <SongsTab />;
      case 'Artists':
        return <ArtistsTab />;
      case 'Albums':
        return <AlbumsTab />;
      case 'Suggested':
        return <SuggestedTab onSwitchTab={(tabName) => setActiveTab(tabName)} />;
      default:
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: theme.subText }}>{activeTab} coming soon...</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* 1. Main Header with dynamic colors */}
      <View style={[styles.header, { paddingHorizontal: 20 }]}>
        <View style={styles.logoContainer}>
          {/* Logo uses primary orange */}
          <Ionicons name="musical-notes" size={28} color={theme.primary} />
          <Text style={[styles.logoText, { color: theme.text }]}>Mume</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* 2. Scrollable Tab Bar with dynamic indicators */}
      <View style={[styles.tabContainer, { borderBottomColor: theme.border }]}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {tabs.map((tab) => (
            <TouchableOpacity 
              key={tab} 
              onPress={() => setActiveTab(tab)} 
              style={[
                styles.tabItem, 
                activeTab === tab && { borderBottomColor: theme.primary, borderBottomWidth: 3 }
              ]}
            >
              <Text style={[
                styles.tabText, 
                { color: activeTab === tab ? theme.primary : theme.subText },
                activeTab === tab && { fontWeight: 'bold' }
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 3. Content Area */}
      <View style={{ flex: 1 }}>
        {renderContent()}
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 24,
  },
  logoContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoText: { fontSize: 24, fontWeight: 'bold' },
  tabContainer: { borderBottomWidth: 1 },
  tabItem: { marginRight: 28, paddingBottom: 10 },
  tabText: { fontSize: 16, fontWeight: '500' },
});