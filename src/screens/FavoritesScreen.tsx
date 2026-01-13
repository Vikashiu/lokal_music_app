// import React from 'react';
// import { View, Text, StyleSheet, FlatList } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import { usePlayerStore } from '../store/usePlayerStore';
// import { useFavoritesStore } from '../store/useFavoritesStore';
// import SongListItem from '../components/SongListItem';

// export default function FavoritesScreen() {
//   const { playSong, currentSong, isPlaying } = usePlayerStore();
//   const { favorites } = useFavoritesStore();

//   const handlePlay = (song: any, index: number) => {
//     // We pass the full favorites list as the queue
//     playSong(song, favorites); 
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Favorites</Text>
//         <Text style={styles.subTitle}>{favorites.length} Songs</Text>
//       </View>
      
//       {favorites.length === 0 ? (
//         <View style={styles.emptyState}>
//           <Ionicons name="heart-dislike-outline" size={80} color="#ddd" />
//           <Text style={styles.emptyText}>No favorites yet</Text>
//           <Text style={styles.emptySubText}>Go explore and like some music!</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={favorites}
//           keyExtractor={(item) => item.id}
//           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
//           renderItem={({ item, index }) => {
//             const isActive = currentSong?.id === item.id;
//             return (
//               <SongListItem 
//                 song={item}
//                 index={index} 
//                 onPlay={() => handlePlay(item, index)}
//                 isPlaying={isActive && isPlaying} 
//               />
//             );
//           }}
//         />
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   header: { padding: 20 },
//   headerTitle: { fontSize: 32, fontWeight: 'bold', color: '#000' },
//   subTitle: { fontSize: 14, color: 'gray', marginTop: 5 },
//   emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
//   emptyText: { fontSize: 18, fontWeight: 'bold', color: 'gray', marginTop: 20 },
//   emptySubText: { fontSize: 14, color: '#ccc', marginTop: 5 },
// });
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { usePlayerStore } from '../store/usePlayerStore';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { useThemeStore, Colors } from '../store/useThemeStore'; // <--- Import Theme Store
import SongListItem from '../components/SongListItem';

export default function FavoritesScreen() {
  const { playSong, currentSong, isPlaying } = usePlayerStore();
  const { favorites } = useFavoritesStore();

  // 1. Access the current theme
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  const handlePlay = (song: any) => {
    // We pass the full favorites list as the queue
    playSong(song, favorites); 
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* 2. Header with dynamic text colors */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Favorites</Text>
        <Text style={[styles.subTitle, { color: theme.subText }]}>{favorites.length} Songs</Text>
      </View>
      
      {favorites.length === 0 ? (
        <View style={styles.emptyState}>
          {/* Icons and text adjust to dark theme palette */}
          <Ionicons name="heart-dislike-outline" size={80} color={theme.border} />
          <Text style={[styles.emptyText, { color: theme.subText }]}>No favorites yet</Text>
          <Text style={[styles.emptySubText, { color: theme.border }]}>Go explore and like some music!</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
          renderItem={({ item, index }) => {
            const isActive = currentSong?.id === item.id;
            return (
              <SongListItem 
                song={item}
                index={index} 
                onPlay={() => handlePlay(item)}
                isPlaying={isActive && isPlaying} 
              />
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20 },
  headerTitle: { fontSize: 32, fontWeight: 'bold' },
  subTitle: { fontSize: 14, marginTop: 5 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  emptySubText: { fontSize: 14, marginTop: 5 },
});