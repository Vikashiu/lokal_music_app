

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import SongListItem, { Song } from '../components/SongListItem';
// import { usePlayerStore } from '../store/usePlayerStore';

// const BASE_URL = `https://saavn.sumit.co/api/search/songs?query=arijit`;

// export default function SongsTab() {
//   const playSong = usePlayerStore((state) => state.playSong);

//   const [songs, setSongs] = useState<Song[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const formatDuration = (seconds: number) => {
//     const min = Math.floor(seconds / 60);
//     const sec = Math.floor(seconds % 60);
//     return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec} mins`;
//   };

//   useEffect(() => {
//     fetchSongs(1);
//   }, []);

//   const fetchSongs = async (pageNumber: number) => {
//     if (loading) return;
//     setLoading(true);

//     try {
//       const response = await fetch(`${BASE_URL}&page=${pageNumber}&limit=10`);
//       const json = await response.json();

//       if (json.success && json.data && json.data.results) {
//         const mappedSongs: Song[] = json.data.results.map((item: any) => {
//           const imageObj = item.image?.find((img: any) => img.quality === "500x500") || item.image?.[item.image.length - 1];
//           const audioObj = item.downloadUrl?.find((d: any) => d.quality === "320kbps") || item.downloadUrl?.[item.downloadUrl.length - 1];
//           const cleanTitle = item.name ? item.name.replace(/&quot;/g, '"').replace(/&amp;/g, '&') : "Unknown";
          
//           let artistNames = "Unknown";
//           if (item.artists?.primary) artistNames = item.artists.primary.map((a: any) => a.name).join(', ');
//           else if (item.primaryArtists) artistNames = item.primaryArtists;

//           return {
//             id: item.id,
//             title: cleanTitle,
//             artist: artistNames,
//             duration: formatDuration(item.duration),
//             coverUrl: imageObj?.url,
//             audioUrl: audioObj?.url
//           };
//         });

//         if (mappedSongs.length === 0) setHasMore(false);
//         else {
//           if (pageNumber === 1) setSongs(mappedSongs);
//           else setSongs(prev => [...prev, ...mappedSongs]);
//         }
//       } else {
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error("Error fetching songs:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLoadMore = () => {
//     if (!loading && hasMore) {
//       const nextPage = page + 1;
//       setPage(nextPage);
//       fetchSongs(nextPage);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {/* List Header */}
//       <View style={styles.listHeader}>
//         <Text style={styles.songCount}>{songs.length} songs</Text>
//         <TouchableOpacity style={styles.sortButton}>
//           <Text style={styles.sortText}>Ascending</Text>
//           <Ionicons name="swap-vertical" size={16} color="#FF6B00" />
//         </TouchableOpacity>
//       </View>

//       {/* List */}
//       <FlatList
//         data={songs}
//         keyExtractor={(item, index) => item.id + index}
//         contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
//         initialNumToRender={10}
//         maxToRenderPerBatch={10}
//         windowSize={5}
//         getItemLayout={(data, index) => ({ length: 80, offset: 80 * index, index })}
//         onEndReached={handleLoadMore}
//         onEndReachedThreshold={0.5}
//         ListFooterComponent={loading && page > 1 ? <ActivityIndicator size="small" color="#FF6B00" style={{ marginVertical: 20 }} /> : null}
//         ListEmptyComponent={loading && page === 1 ? <ActivityIndicator size="large" color="#FF6B00" style={{ marginTop: 50 }} /> : null}
        
//         // ------------- CHANGED SECTION STARTS HERE -------------
//         renderItem={({ item }) => (
//           <SongListItem
//             song={item}
//             // We now pass 'item' (the song to play) AND 'songs' (the whole queue)
//             onPlay={() => playSong(item, songs)} 
//           />
//         )}
//         // ------------- CHANGED SECTION ENDS HERE -------------
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   listHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     marginTop: 20,
//     marginBottom: 16,
//   },
//   songCount: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   sortButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   sortText: {
//     color: '#FF6B00',
//     fontWeight: '600',
//   }
// });

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SongListItem, { Song } from '../components/SongListItem';
import { usePlayerStore } from '../store/usePlayerStore';
import { useThemeStore, Colors } from '../store/useThemeStore'; // <--- Import Theme Store

const BASE_URL = `https://saavn.sumit.co/api/search/songs?query=arijit`;

export default function SongsTab() {
  const playSong = usePlayerStore((state) => state.playSong);

  // 1. Access the current theme
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Note: We changed duration to return the raw number (seconds) 
  // because our updated SongListItem now handles the formatting.
  useEffect(() => {
    fetchSongs(1);
  }, []);

  const fetchSongs = async (pageNumber: number) => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}&page=${pageNumber}&limit=10`);
      const json = await response.json();

      if (json.success && json.data && json.data.results) {
        const mappedSongs: Song[] = json.data.results.map((item: any) => {
          const imageObj = item.image?.find((img: any) => img.quality === "500x500") || item.image?.[item.image.length - 1];
          const audioObj = item.downloadUrl?.find((d: any) => d.quality === "320kbps") || item.downloadUrl?.[item.downloadUrl.length - 1];
          const cleanTitle = item.name ? item.name.replace(/&quot;/g, '"').replace(/&amp;/g, '&') : "Unknown";
          
          let artistNames = "Unknown";
          if (item.artists?.primary) artistNames = item.artists.primary.map((a: any) => a.name).join(', ');
          else if (item.primaryArtists) artistNames = item.primaryArtists;

          return {
            id: item.id,
            title: cleanTitle,
            artist: artistNames,
            duration: item.duration, // Keep as number for our new SongListItem logic
            coverUrl: imageObj?.url,
            audioUrl: audioObj?.url
          };
        });

        if (mappedSongs.length === 0) setHasMore(false);
        else {
          if (pageNumber === 1) setSongs(mappedSongs);
          else setSongs(prev => [...prev, ...mappedSongs]);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching songs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchSongs(nextPage);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* 2. List Header with themed text */}
      <View style={styles.listHeader}>
        <Text style={[styles.songCount, { color: theme.text }]}>{songs.length} songs</Text>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={[styles.sortText, { color: theme.primary }]}>Ascending</Text>
          <Ionicons name="swap-vertical" size={16} color={theme.primary} />
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={songs}
        keyExtractor={(item, index) => item.id + index}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        getItemLayout={(data, index) => ({ length: 80, offset: 80 * index, index })}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && page > 1 ? <ActivityIndicator size="small" color={theme.primary} style={{ marginVertical: 20 }} /> : null}
        ListEmptyComponent={loading && page === 1 ? <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 50 }} /> : null}
        renderItem={({ item }) => (
          <SongListItem
            song={item}
            onPlay={() => playSong(item, songs)} 
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
  },
  songCount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sortText: {
    fontWeight: '600',
  }
});