// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import { usePlaylistStore } from '../store/usePlaylistStore';
// import { usePlayerStore } from '../store/usePlayerStore';
// import SongListItem from '../components/SongListItem';

// export default function PlaylistDetailsScreen() {
//   const route = useRoute<any>();
//   const navigation = useNavigation();
//   const { playlistId } = route.params; // We pass ID, not the whole object (updates better)
  
//   const { playlists, removeSongFromPlaylist, deletePlaylist } = usePlaylistStore();
//   const playSong = usePlayerStore((state) => state.playSong);

//   // Find the playlist dynamically so it updates if we delete a song
//   const playlist = playlists.find((p) => p.id === playlistId);

//   if (!playlist) {
//     return (
//       <View style={styles.container}>
//         <Text style={{textAlign: 'center', marginTop: 50}}>Playlist not found.</Text>
//       </View>
//     );
//   }

//   const handlePlay = (index: number) => {
//     // Play this song and queue the rest of the playlist
//     const queue = playlist.songs.slice(index);
//     playSong(playlist.songs[index], playlist.songs); 
//   };

//   const handleRemoveSong = (songId: string) => {
//     Alert.alert(
//         "Remove Song",
//         "Remove this song from the playlist?",
//         [
//             { text: "Cancel", style: "cancel" },
//             { text: "Remove", style: 'destructive', onPress: () => removeSongFromPlaylist(playlistId, songId) }
//         ]
//     );
//   };

//   const handleDeletePlaylist = () => {
//       Alert.alert(
//         "Delete Playlist",
//         "Are you sure you want to delete this entire playlist?",
//         [
//           { text: "Cancel", style: "cancel" },
//           { text: "Delete", style: "destructive", onPress: () => {
//               deletePlaylist(playlistId);
//               navigation.goBack();
//           }}
//         ]
//       );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: 5}}>
//           <Ionicons name="chevron-back" size={28} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>{playlist.name}</Text>
//         <TouchableOpacity onPress={handleDeletePlaylist}>
//             <Ionicons name="trash-outline" size={24} color="red" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.subHeader}>
//          <Text style={styles.songCount}>{playlist.songs.length} Songs</Text>
//          {playlist.songs.length > 0 && (
//              <TouchableOpacity style={styles.playAllButton} onPress={() => handlePlay(0)}>
//                  <Ionicons name="play" size={16} color="#fff" />
//                  <Text style={styles.playAllText}>Play All</Text>
//              </TouchableOpacity>
//          )}
//       </View>

//       {/* Song List */}
//       {playlist.songs.length === 0 ? (
//         <View style={styles.emptyContainer}>
//             <Ionicons name="musical-notes-outline" size={60} color="#ddd" />
//             <Text style={styles.emptyText}>This playlist is empty.</Text>
//             <Text style={styles.emptySubText}>Add songs from the Player options menu.</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={playlist.songs}
//           keyExtractor={(item) => item.id}
//           contentContainerStyle={{ padding: 20 }}
//           renderItem={({ item, index }) => (
//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//                 <View style={{flex: 1}}>
//                     <SongListItem 
//                         song={item} 
//                         index={index} 
//                         onPlay={() => handlePlay(index)} 
//                     />
//                 </View>
//                 {/* Quick Remove Button */}
//                 <TouchableOpacity onPress={() => handleRemoveSong(item.id)} style={{padding: 10}}>
//                     <Ionicons name="remove-circle-outline" size={24} color="red" />
//                 </TouchableOpacity>
//             </View>
//           )}
//         />
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10 },
//   headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#000' },
//   subHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 10, marginBottom: 10 },
//   songCount: { color: 'gray', fontSize: 14 },
  
//   playAllButton: { flexDirection: 'row', backgroundColor: '#FF6B00', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, alignItems: 'center' },
//   playAllText: { color: '#fff', fontWeight: 'bold', marginLeft: 5 },

//   emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
//   emptyText: { fontSize: 18, fontWeight: 'bold', color: 'gray', marginTop: 20 },
//   emptySubText: { fontSize: 14, color: '#ccc', marginTop: 5, textAlign: 'center', paddingHorizontal: 40 },
// });

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { usePlaylistStore } from '../store/usePlaylistStore';
import { usePlayerStore } from '../store/usePlayerStore';
import { useThemeStore, Colors } from '../store/useThemeStore'; // <--- Import Theme Store
import SongListItem from '../components/SongListItem';

export default function PlaylistDetailsScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { playlistId } = route.params; 
  
  const { playlists, removeSongFromPlaylist, deletePlaylist } = usePlaylistStore();
  const playSong = usePlayerStore((state) => state.playSong);

  // 1. Access the current theme
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  const playlist = playlists.find((p) => p.id === playlistId);

  if (!playlist) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={{textAlign: 'center', marginTop: 50, color: theme.text}}>Playlist not found.</Text>
      </View>
    );
  }

  const handlePlay = (index: number) => {
    playSong(playlist.songs[index], playlist.songs); 
  };

  const handleRemoveSong = (songId: string) => {
    Alert.alert(
        "Remove Song",
        "Remove this song from the playlist?",
        [
            { text: "Cancel", style: "cancel" },
            { text: "Remove", style: 'destructive', onPress: () => removeSongFromPlaylist(playlistId, songId) }
        ]
    );
  };

  const handleDeletePlaylist = () => {
      Alert.alert(
        "Delete Playlist",
        "Are you sure you want to delete this entire playlist?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Delete", style: "destructive", onPress: () => {
              deletePlaylist(playlistId);
              navigation.goBack();
          }}
        ]
      );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* 2. Header with dynamic colors */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: 5}}>
          <Ionicons name="chevron-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>{playlist.name}</Text>
        <TouchableOpacity onPress={handleDeletePlaylist}>
            <Ionicons name="trash-outline" size={24} color="#ff4d4d" />
        </TouchableOpacity>
      </View>

      <View style={styles.subHeader}>
         <Text style={[styles.songCount, { color: theme.subText }]}>{playlist.songs.length} Songs</Text>
         {playlist.songs.length > 0 && (
             <TouchableOpacity 
                style={[styles.playAllButton, { backgroundColor: theme.primary }]} 
                onPress={() => handlePlay(0)}
             >
                 <Ionicons name="play" size={16} color="#fff" />
                 <Text style={styles.playAllText}>Play All</Text>
             </TouchableOpacity>
         )}
      </View>

      {/* 3. Empty state themed icons and text */}
      {playlist.songs.length === 0 ? (
        <View style={styles.emptyContainer}>
            <Ionicons name="musical-notes-outline" size={60} color={theme.border} />
            <Text style={[styles.emptyText, { color: theme.subText }]}>This playlist is empty.</Text>
            <Text style={[styles.emptySubText, { color: theme.border }]}>Add songs from the Player options menu.</Text>
        </View>
      ) : (
        <FlatList
          data={playlist.songs}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20 }}
          renderItem={({ item, index }) => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1}}>
                    <SongListItem 
                        song={item} 
                        index={index} 
                        onPlay={() => handlePlay(index)} 
                    />
                </View>
                {/* Delete button uses a themed red for dark mode */}
                <TouchableOpacity onPress={() => handleRemoveSong(item.id)} style={{padding: 10}}>
                    <Ionicons name="remove-circle-outline" size={24} color="#ff4d4d" />
                </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10 },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  subHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 10, marginBottom: 10 },
  songCount: { fontSize: 14 },
  playAllButton: { flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, alignItems: 'center' },
  playAllText: { color: '#fff', fontWeight: 'bold', marginLeft: 5 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  emptyText: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  emptySubText: { fontSize: 14, textAlign: 'center', paddingHorizontal: 40, marginTop: 5 },
});