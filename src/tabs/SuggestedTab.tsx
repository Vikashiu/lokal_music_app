// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
// import { usePlayerStore } from '../store/usePlayerStore';
// import { useNavigation } from '@react-navigation/native';

// // Simplified Data Interface
// interface PreviewItem {
//   id: string;
//   title: string;
//   subtitle?: string;
//   image: string;
//   type: 'song' | 'album' | 'artist';
//   fullData?: any; 
// }

// interface SuggestedTabProps {
//   onSwitchTab: (tabName: string) => void;
// }

// export default function SuggestedTab({ onSwitchTab }: SuggestedTabProps) {
//   const playSong = usePlayerStore((state) => state.playSong);
//   const navigation = useNavigation<any>(); 
  
//   const [loading, setLoading] = useState(true);
//   const [songs, setSongs] = useState<PreviewItem[]>([]);
//   const [albums, setAlbums] = useState<PreviewItem[]>([]);
//   const [artists, setArtists] = useState<PreviewItem[]>([]);

//   // 1. Helper to safely extract high-quality images
//   const getHighQualityImage = (images: any[]) => {
//     if (!images) return 'https://via.placeholder.com/150';
//     return images.find((i: any) => i.quality === "500x500")?.url || images[0]?.url;
//   };

//   const getHighQualityAudio = (urls: any[]) => {
//     if (!urls) return null;
//     return urls.find((d: any) => d.quality === "320kbps")?.url || urls[urls.length - 1]?.url;
//   };

//   // 2. Fetch Data
//   const fetchData = async (endpoint: string, query: string, type: 'song' | 'album' | 'artist') => {
//     try {
//       const res = await fetch(`https://saavn.sumit.co/api/search/${endpoint}?query=${query}&limit=5`);
//       const json = await res.json();
      
//       if (json.success && json.data?.results) {
//         return json.data.results.map((item: any) => ({
//           id: item.id,
//           title: item.name || item.title,
//           subtitle: type === 'song' ? (item.primaryArtists || item.artist) : undefined,
//           image: getHighQualityImage(item.image),
//           type: type,
//           fullData: item 
//         }));
//       }
//       return [];
//     } catch (e) {
//       console.error(`Error fetching ${type}:`, e);
//       return [];
//     }
//   };

//   useEffect(() => {
//     const loadAll = async () => {
//       setLoading(true);
//       const [fetchedSongs, fetchedAlbums, fetchedArtists] = await Promise.all([
//         fetchData('songs', 'trending', 'song'),
//         fetchData('albums', 'song', 'album'),
//         fetchData('artists', 'singer', 'artist'),
//       ]);
//       setSongs(fetchedSongs);
//       setAlbums(fetchedAlbums);
//       setArtists(fetchedArtists);
//       setLoading(false);
//     };

//     loadAll();
//   }, []);

//   // 3. INTERACTION HANDLERS (FIXED NAMES HERE)
//   const handleItemClick = (item: PreviewItem) => {
    
//     // A. If it's a SONG -> Play it
//     if (item.type === 'song' && item.fullData) {
//       const audioUrl = getHighQualityAudio(item.fullData.downloadUrl);
      
//       if (!audioUrl) {
//         Alert.alert("Error", "No audio URL found for this song.");
//         return;
//       }

//       const playerSong = {
//         id: item.fullData.id,
//         title: item.fullData.name,
//         artist: item.fullData.primaryArtists || "Unknown",
//         coverUrl: item.image,
//         audioUrl: audioUrl, 
//         duration: item.fullData.duration
//       };

//       playSong(playerSong, [playerSong]); 
//     } 
    
//     // B. If it's an ARTIST -> Navigate with 'artist' object (FIXES CRASH)
//     else if (item.type === 'artist') {
//         navigation.navigate('ArtistDetails', { 
//             // 1. Pass as 'artist' object (Likely what your screen expects)
//             artist: {
//                 ...item.fullData,
//                 name: item.title,
//                 image: item.image // Use the processed high-quality image
//             },
//             // 2. Also pass individual IDs (Backup)
//             id: item.id,
//             name: item.title,
//             image: item.image
//         });
//     }

//     // C. If it's an ALBUM -> Navigate with 'album' object
//     else if (item.type === 'album') {
//         navigation.navigate('AlbumDetails', { 
//             album: {
//                 ...item.fullData,
//                 name: item.title,
//                 image: item.image
//             }
//         });
//     }
//   };

//   const Section = ({ title, data, targetTab }: { title: string, data: PreviewItem[], targetTab: string }) => {
//     if (!data.length) return null;
//     return (
//       <View style={styles.sectionContainer}>
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>{title}</Text>
//           <TouchableOpacity onPress={() => onSwitchTab(targetTab)}>
//             <Text style={styles.seeAll}>See All</Text>
//           </TouchableOpacity>
//         </View>

//         <FlatList
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           data={data}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <TouchableOpacity 
//                 style={item.type === 'artist' ? styles.artistCard : styles.card}
//                 onPress={() => handleItemClick(item)}
//             >
//               <Image source={{ uri: item.image }} style={item.type === 'artist' ? styles.artistImage : styles.cardImage} />
//               <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
//               {item.subtitle && <Text style={styles.cardSubtitle} numberOfLines={1}>{item.subtitle}</Text>}
//             </TouchableOpacity>
//           )}
//         />
//       </View>
//     );
//   };

//   if (loading) return <ActivityIndicator size="large" color="#FF6B00" style={{marginTop: 50}} />;

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
//       <Section title="Trending Songs" data={songs} targetTab="Songs" />
//       <Section title="Top Artists" data={artists} targetTab="Artists" />
//       <Section title="New Albums" data={albums} targetTab="Albums" />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff', paddingLeft: 20, paddingTop: 10 },
//   sectionContainer: { marginBottom: 24 },
//   sectionHeader: { 
//     flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
//     paddingRight: 20, marginBottom: 12 
//   },
//   sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
//   seeAll: { fontSize: 14, color: '#FF6B00', fontWeight: '600' },
//   card: { marginRight: 16, width: 120 },
//   cardImage: { width: 120, height: 120, borderRadius: 12, marginBottom: 8, backgroundColor: '#f0f0f0' },
//   cardTitle: { fontSize: 14, fontWeight: 'bold', color: '#000' },
//   cardSubtitle: { fontSize: 12, color: 'gray' },
//   artistCard: { marginRight: 16, width: 100, alignItems: 'center' },
//   artistImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 8, backgroundColor: '#f0f0f0' },
// });
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { usePlayerStore } from '../store/usePlayerStore';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore, Colors } from '../store/useThemeStore'; // <--- Import Theme Store

// Simplified Data Interface
interface PreviewItem {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  type: 'song' | 'album' | 'artist';
  fullData?: any; 
}

interface SuggestedTabProps {
  onSwitchTab: (tabName: string) => void;
}

export default function SuggestedTab({ onSwitchTab }: SuggestedTabProps) {
  const playSong = usePlayerStore((state) => state.playSong);
  const navigation = useNavigation<any>(); 
  
  // 1. Access the current theme
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const theme = isDarkMode ? Colors.dark : Colors.light;
  
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState<PreviewItem[]>([]);
  const [albums, setAlbums] = useState<PreviewItem[]>([]);
  const [artists, setArtists] = useState<PreviewItem[]>([]);

  const getHighQualityImage = (images: any[]) => {
    if (!images) return 'https://via.placeholder.com/150';
    return images.find((i: any) => i.quality === "500x500")?.url || images[0]?.url;
  };

  const getHighQualityAudio = (urls: any[]) => {
    if (!urls) return null;
    return urls.find((d: any) => d.quality === "320kbps")?.url || urls[urls.length - 1]?.url;
  };

  const fetchData = async (endpoint: string, query: string, type: 'song' | 'album' | 'artist') => {
    try {
      const res = await fetch(`https://saavn.sumit.co/api/search/${endpoint}?query=${query}&limit=5`);
      const json = await res.json();
      
      if (json.success && json.data?.results) {
        return json.data.results.map((item: any) => ({
          id: item.id,
          title: item.name || item.title,
          subtitle: type === 'song' ? (item.primaryArtists || item.artist) : undefined,
          image: getHighQualityImage(item.image),
          type: type,
          fullData: item 
        }));
      }
      return [];
    } catch (e) {
      console.error(`Error fetching ${type}:`, e);
      return [];
    }
  };

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      const [fetchedSongs, fetchedAlbums, fetchedArtists] = await Promise.all([
        fetchData('songs', 'trending', 'song'),
        fetchData('albums', 'song', 'album'),
        fetchData('artists', 'singer', 'artist'),
      ]);
      setSongs(fetchedSongs);
      setAlbums(fetchedAlbums);
      setArtists(fetchedArtists);
      setLoading(false);
    };

    loadAll();
  }, []);

  const handleItemClick = (item: PreviewItem) => {
    if (item.type === 'song' && item.fullData) {
      const audioUrl = getHighQualityAudio(item.fullData.downloadUrl);
      if (!audioUrl) {
        Alert.alert("Error", "No audio URL found for this song.");
        return;
      }
      const playerSong = {
        id: item.fullData.id,
        title: item.fullData.name,
        artist: item.fullData.primaryArtists || "Unknown",
        coverUrl: item.image,
        audioUrl: audioUrl, 
        duration: item.fullData.duration
      };
      playSong(playerSong, [playerSong]); 
    } 
    else if (item.type === 'artist') {
        navigation.navigate('ArtistDetails', { 
            artist: { ...item.fullData, name: item.title, image: item.image },
            id: item.id, name: item.title, image: item.image
        });
    }
    else if (item.type === 'album') {
        navigation.navigate('AlbumDetails', { 
            album: { ...item.fullData, name: item.title, image: item.image }
        });
    }
  };

  const Section = ({ title, data, targetTab }: { title: string, data: PreviewItem[], targetTab: string }) => {
    if (!data.length) return null;
    return (
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          {/* Dynamic Header Text */}
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{title}</Text>
          <TouchableOpacity onPress={() => onSwitchTab(targetTab)}>
            <Text style={[styles.seeAll, { color: theme.primary }]}>See All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
                style={item.type === 'artist' ? styles.artistCard : styles.card}
                onPress={() => handleItemClick(item)}
            >
              {/* Images with themed placeholder background */}
              <Image 
                source={{ uri: item.image }} 
                style={[
                  item.type === 'artist' ? styles.artistImage : styles.cardImage,
                  { backgroundColor: theme.card }
                ]} 
              />
              <Text style={[styles.cardTitle, { color: theme.text }]} numberOfLines={1}>{item.title}</Text>
              {item.subtitle && (
                <Text style={[styles.cardSubtitle, { color: theme.subText }]} numberOfLines={1}>
                  {item.subtitle}
                </Text>
              )}
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  if (loading) return <ActivityIndicator size="large" color={theme.primary} style={{marginTop: 50}} />;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={{ paddingBottom: 100 }}>
      <Section title="Trending Songs" data={songs} targetTab="Songs" />
      <Section title="Top Artists" data={artists} targetTab="Artists" />
      <Section title="New Albums" data={albums} targetTab="Albums" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingLeft: 20, paddingTop: 10 },
  sectionContainer: { marginBottom: 24 },
  sectionHeader: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
    paddingRight: 20, marginBottom: 12 
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  seeAll: { fontSize: 14, fontWeight: '600' },
  card: { marginRight: 16, width: 120 },
  cardImage: { width: 120, height: 120, borderRadius: 12, marginBottom: 8 },
  cardTitle: { fontSize: 14, fontWeight: 'bold' },
  cardSubtitle: { fontSize: 12 },
  artistCard: { marginRight: 16, width: 100, alignItems: 'center' },
  artistImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 8 },
});