// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import AlbumListItem, { Album } from '../components/AlbumListItem';

// const ALBUMS_API = `https://saavn.sumit.co/api/search/albums?query=hits&limit=20`;

// export default function AlbumsTab() {
//   const [albums, setAlbums] = useState<Album[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAlbums();
//   }, []);

//   const fetchAlbums = async () => {
//     try {
//       const response = await fetch(ALBUMS_API);
//       const json = await response.json();

//       if (json.success && json.data && json.data.results) {
//         const mappedAlbums: Album[] = json.data.results.map((item: any) => {
//           const imgObj = item.image?.find((i: any) => i.quality === "500x500") || item.image?.[0];
          
//           let artistName = "Unknown";
//           if (item.artists?.primary) artistName = item.artists.primary[0]?.name;
//           else if (item.primaryArtists) artistName = item.primaryArtists;

//           return {
//             id: item.id,
//             name: item.name.replace(/&quot;/g, '"'),
//             artist: artistName,
//             year: item.year || "2024",
//             songCount: item.songCount || "?", // API sometimes has this
//             image: imgObj?.url || imgObj?.link
//           };
//         });
//         setAlbums(mappedAlbums);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.countText}>{albums.length} albums</Text>
//         <TouchableOpacity style={styles.sortButton}>
//           <Text style={styles.sortText}>Date Modified</Text>
//           <Ionicons name="swap-vertical" size={16} color="#FF6B00" />
//         </TouchableOpacity>
//       </View>

//       {/* Grid List */}
//       {loading ? (
//         <ActivityIndicator size="large" color="#FF6B00" style={{ marginTop: 50 }} />
//       ) : (
//         <FlatList
//           data={albums}
//           keyExtractor={(item) => item.id}
//           numColumns={2} // <--- Makes it a GRID
//           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
//           renderItem={({ item }) => <AlbumListItem album={item} />}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     marginTop: 20,
//     marginBottom: 15
//   },
//   countText: { fontSize: 18, fontWeight: 'bold' },
//   sortButton: { flexDirection: 'row', alignItems: 'center', gap: 5 },
//   sortText: { color: '#FF6B00', fontWeight: '600' }
// });

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AlbumListItem, { Album } from '../components/AlbumListItem';
import { useThemeStore, Colors } from '../store/useThemeStore'; // <--- Import Theme Store

const ALBUMS_API = `https://saavn.sumit.co/api/search/albums?query=hits&limit=20`;

export default function AlbumsTab() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Access the current theme
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await fetch(ALBUMS_API);
      const json = await response.json();

      if (json.success && json.data && json.data.results) {
        const mappedAlbums: Album[] = json.data.results.map((item: any) => {
          const imgObj = item.image?.find((i: any) => i.quality === "500x500") || item.image?.[0];
          
          let artistName = "Unknown";
          if (item.artists?.primary) artistName = item.artists.primary[0]?.name;
          else if (item.primaryArtists) artistName = item.primaryArtists;

          return {
            id: item.id,
            name: item.name.replace(/&quot;/g, '"'),
            artist: artistName,
            year: item.year || "2024",
            songCount: item.songCount || "?", 
            image: imgObj?.url || imgObj?.link
          };
        });
        setAlbums(mappedAlbums);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* 2. Header with themed text */}
      <View style={styles.header}>
        <Text style={[styles.countText, { color: theme.text }]}>{albums.length} albums</Text>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={[styles.sortText, { color: theme.primary }]}>Date Modified</Text>
          <Ionicons name="swap-vertical" size={16} color={theme.primary} />
        </TouchableOpacity>
      </View>

      {/* Grid List */}
      {loading ? (
        <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={albums}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
          renderItem={({ item }) => <AlbumListItem album={item} />}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 40, color: theme.subText }}>
              No albums found.
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 15
  },
  countText: { fontSize: 18, fontWeight: 'bold' },
  sortButton: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  sortText: { fontWeight: '600' }
});