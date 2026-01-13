// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import SongListItem, { Song } from '../components/SongListItem';
// import { usePlayerStore } from '../store/usePlayerStore';
// // ❌ REMOVED: import SongOptionsModal ...

// // API Endpoint
// const ARTIST_DETAILS_API = (id: string) => `https://saavn.sumit.co/api/artists/${id}`;

// export default function ArtistDetailsScreen() {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { artist } = route.params as { artist: any }; 
//   const playSong = usePlayerStore((state) => state.playSong);

//   const [songs, setSongs] = useState<Song[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({ albumCount: 0, songCount: 0 });

//   // ❌ REMOVED: Modal State (optionsVisible, etc.)

//   useEffect(() => {
//     fetchArtistDetails();
//   }, []);

//   // ❌ REMOVED: handleOpenOptions function

//   const fetchArtistDetails = async () => {
//     try {
//       const response = await fetch(ARTIST_DETAILS_API(artist.id));
//       const json = await response.json();

//       if (json.success && json.data) {
//          const data = json.data;
//          setStats({
//              albumCount: data.topAlbums ? data.topAlbums.length : 0,
//              songCount: data.topSongs ? data.topSongs.length : 0
//          });

//          if (data.topSongs) {
//              const mappedSongs: Song[] = data.topSongs.map((item: any) => {
//                 const imgObj = item.image?.find((i: any) => i.quality === "500x500") || item.image?.[item.image.length - 1];
//                 const audioObj = item.downloadUrl?.find((d: any) => d.quality === "320kbps") || item.downloadUrl?.[item.downloadUrl.length - 1];
//                 const artistNames = item.artists?.primary?.map((a: any) => a.name).join(', ') || item.primaryArtists || artist.name;

//                 return {
//                     id: item.id,
//                     title: item.name.replace(/&quot;/g, '"').replace(/&amp;/g, '&'),
//                     artist: artistNames,
//                     duration: formatDuration(item.duration),
//                     coverUrl: imgObj?.url || imgObj?.link,
//                     audioUrl: audioObj?.url || audioObj?.link
//                 };
//              });
//              setSongs(mappedSongs);
//          }
//       }
//     } catch (error) {
//       console.error("Error fetching artist details:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDuration = (seconds: number) => {
//     const min = Math.floor(seconds / 60);
//     const sec = Math.floor(seconds % 60);
//     return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec} mins`;
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        
//         {/* Top Bar */}
//         <View style={styles.topBar}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="arrow-back" size={24} color="#000" />
//           </TouchableOpacity>
//           <View style={styles.topIcons}>
//             <TouchableOpacity style={{ marginRight: 15 }}>
//                <Ionicons name="search" size={24} color="#000" />
//             </TouchableOpacity>
//             <TouchableOpacity>
//                <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Hero Section */}
//         <View style={styles.heroContainer}>
//           <Image source={{ uri: artist.image }} style={styles.heroImage} />
//           <Text style={styles.artistName}>{artist.name}</Text>
//           <Text style={styles.stats}>
//              {stats.albumCount} Albums  |  {stats.songCount} Songs 
//           </Text>

//           <View style={styles.buttonRow}>
//             <TouchableOpacity style={styles.shuffleButton}>
//                <Ionicons name="shuffle" size={20} color="#fff" style={{ marginRight: 8 }} />
//                <Text style={styles.shuffleText}>Shuffle</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.playAllButton}>
//                <Ionicons name="play-circle" size={20} color="#FF6B00" style={{ marginRight: 8 }} />
//                <Text style={styles.playAllText}>Play</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Songs List */}
//         <View style={styles.listHeader}>
//           <Text style={styles.sectionTitle}>Songs</Text>
//           <TouchableOpacity>
//              <Text style={styles.seeAll}>See All</Text>
//           </TouchableOpacity>
//         </View>

//         {loading ? (
//             <ActivityIndicator size="large" color="#FF6B00" style={{ marginTop: 20 }} />
//         ) : (
//             <View style={{ paddingHorizontal: 20 }}>
//                 {songs.map((song, index) => (
//                     <SongListItem 
//                         key={index} 
//                         song={song} 
//                         onPlay={() => playSong(song)} 
//                         // ❌ REMOVED: onOptionPress
//                     />
//                 ))}
//             </View>
//         )}

//       </ScrollView>

//       {/* ❌ REMOVED: <SongOptionsModal ... /> */}

//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   topBar: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10, marginBottom: 20 },
//   topIcons: { flexDirection: 'row' },
//   heroContainer: { alignItems: 'center', marginBottom: 30 },
//   heroImage: { width: 200, height: 200, borderRadius: 20, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, elevation: 10 },
//   artistName: { fontSize: 24, fontWeight: 'bold', color: '#000', marginBottom: 6 },
//   stats: { fontSize: 13, color: 'gray', marginBottom: 20 },
//   buttonRow: { flexDirection: 'row', gap: 15 },
//   shuffleButton: { backgroundColor: '#FF6B00', flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 30, shadowColor: '#FF6B00', shadowOpacity: 0.4, shadowRadius: 8, elevation: 5 },
//   shuffleText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
//   playAllButton: { backgroundColor: '#FFF0E0', flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 30 },
//   playAllText: { color: '#FF6B00', fontWeight: 'bold', fontSize: 16 },
//   listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 15 },
//   sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },
//   seeAll: { color: '#FF6B00', fontWeight: '600' }
// });
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import SongListItem, { Song } from '../components/SongListItem';
import { usePlayerStore } from '../store/usePlayerStore';
import { useThemeStore, Colors } from '../store/useThemeStore'; // <--- Import Theme Store

const ARTIST_DETAILS_API = (id: string) => `https://saavn.sumit.co/api/artists/${id}`;

export default function ArtistDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { artist } = route.params as { artist: any }; 
  const playSong = usePlayerStore((state) => state.playSong);

  // 1. Access the current theme
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ albumCount: 0, songCount: 0 });

  useEffect(() => {
    fetchArtistDetails();
  }, []);

  const fetchArtistDetails = async () => {
    try {
      const response = await fetch(ARTIST_DETAILS_API(artist.id));
      const json = await response.json();

      if (json.success && json.data) {
         const data = json.data;
         setStats({
             albumCount: data.topAlbums ? data.topAlbums.length : 0,
             songCount: data.topSongs ? data.topSongs.length : 0
         });

         if (data.topSongs) {
             const mappedSongs: Song[] = data.topSongs.map((item: any) => {
                const imgObj = item.image?.find((i: any) => i.quality === "500x500") || item.image?.[item.image.length - 1];
                const audioObj = item.downloadUrl?.find((d: any) => d.quality === "320kbps") || item.downloadUrl?.[item.downloadUrl.length - 1];
                const artistNames = item.artists?.primary?.map((a: any) => a.name).join(', ') || item.primaryArtists || artist.name;

                return {
                    id: item.id,
                    title: item.name.replace(/&quot;/g, '"').replace(/&amp;/g, '&'),
                    artist: artistNames,
                    duration: item.duration, // Keep as raw number for our updated SongListItem
                    coverUrl: imgObj?.url || imgObj?.link,
                    audioUrl: audioObj?.url || audioObj?.link
                };
             });
             setSongs(mappedSongs);
         }
      }
    } catch (error) {
      console.error("Error fetching artist details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Top Bar with themed icons */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <View style={styles.topIcons}>
            <TouchableOpacity style={{ marginRight: 15 }}>
               <Ionicons name="search" size={24} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity>
               <Ionicons name="ellipsis-horizontal" size={24} color={theme.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Section matches Starboy artist profile style */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: artist.image }} style={styles.heroImage} />
          <Text style={[styles.artistName, { color: theme.text }]}>{artist.name}</Text>
          <Text style={[styles.stats, { color: theme.subText }]}>
             {stats.albumCount} Albums  |  {stats.songCount} Songs 
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.shuffleButton, { backgroundColor: theme.primary }]}>
               <Ionicons name="shuffle" size={20} color="#fff" style={{ marginRight: 8 }} />
               <Text style={styles.shuffleText}>Shuffle</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.playAllButton, { backgroundColor: isDarkMode ? 'rgba(255, 107, 0, 0.15)' : '#FFF0E0' }]}
              onPress={() => songs.length > 0 && playSong(songs[0], songs)}
            >
               <Ionicons name="play-circle" size={20} color={theme.primary} style={{ marginRight: 8 }} />
               <Text style={[styles.playAllText, { color: theme.primary }]}>Play</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* List Header */}
        <View style={styles.listHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Songs</Text>
          <TouchableOpacity>
             <Text style={[styles.seeAll, { color: theme.primary }]}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Songs List */}
        {loading ? (
            <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 20 }} />
        ) : (
            <View style={{ paddingHorizontal: 20 }}>
                {songs.map((song, index) => (
                    <SongListItem 
                        key={index} 
                        song={song} 
                        onPlay={() => playSong(song, songs)} 
                    />
                ))}
            </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10, marginBottom: 20 },
  topIcons: { flexDirection: 'row' },
  heroContainer: { alignItems: 'center', marginBottom: 30 },
  heroImage: { width: 200, height: 200, borderRadius: 100, marginBottom: 16 }, // Circular for Artists
  artistName: { fontSize: 24, fontWeight: 'bold', marginBottom: 6 },
  stats: { fontSize: 13, marginBottom: 20 },
  buttonRow: { flexDirection: 'row', gap: 15 },
  shuffleButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 30 },
  shuffleText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  playAllButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 30 },
  playAllText: { fontWeight: 'bold', fontSize: 16 },
  listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 15 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold' },
  seeAll: { fontWeight: '600' }
});