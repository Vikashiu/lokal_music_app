
// import React, { useState, useEffect } from 'react';
// import { FlatList, ActivityIndicator, Text, View } from 'react-native';
// import ArtistListItem, { Artist } from '../components/ArtistListItem';
// import ArtistOptionsModal from '../components/ArtistOptionModal';``

// const ARTIST_API_URL = `https://saavn.sumit.co/api/search/artists?query=singer&limit=20`;

// export default function ArtistsTab() {
//   const [artists, setArtists] = useState<Artist[]>([]);
//   const [loading, setLoading] = useState(true);

//   // --- MODAL STATE ---
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

//   const handleOpenOptions = (artist: Artist) => {
//     setSelectedArtist(artist);
//     setModalVisible(true);
//   };

//   useEffect(() => {
//     fetchArtists();
//   }, []);

//   const fetchArtists = async () => {
//     try {
//       const response = await fetch(ARTIST_API_URL);
//       const json = await response.json();

//       if (json.success && json.data && json.data.results) {
//         const mappedArtists: Artist[] = json.data.results.map((item: any) => {
//           const imgObj = item.image?.find((i: any) => i.quality === "500x500") || item.image?.[0];
//           return {
//             id: item.id,
//             name: item.name,
//             image: imgObj?.url || imgObj?.link,
//             role: item.role === 'singer' ? 'Artist' : item.role || '1 Album | 10 Songs'
//           };
//         });
//         setArtists(mappedArtists);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#FF6B00" style={{ marginTop: 50 }} />;
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <FlatList
//         data={artists}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
//         renderItem={({ item }) => (
//           <ArtistListItem 
//             artist={item} 
//             onOptionPress={() => handleOpenOptions(item)} // <--- 2. Open Modal
//           />
//         )}
//         ListEmptyComponent={
//           <Text style={{ textAlign: 'center', marginTop: 20, color: 'gray' }}>No artists found.</Text>
//         }
//       />

//       {/* 3. Render Modal */}
//       <ArtistOptionsModal 
//         visible={modalVisible} 
//         artist={selectedArtist} 
//         onClose={() => setModalVisible(false)} 
//       />
//     </View>
//   );
// }
import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import ArtistListItem, { Artist } from '../components/ArtistListItem';
import ArtistOptionsModal from '../components/ArtistOptionModal';
import { useThemeStore, Colors } from '../store/useThemeStore'; // <--- Import Theme Store

const ARTIST_API_URL = `https://saavn.sumit.co/api/search/artists?query=singer&limit=20`;

export default function ArtistsTab() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Access the current theme
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  // --- MODAL STATE ---
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  const handleOpenOptions = (artist: Artist) => {
    setSelectedArtist(artist);
    setModalVisible(true);
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await fetch(ARTIST_API_URL);
      const json = await response.json();

      if (json.success && json.data && json.data.results) {
        const mappedArtists: Artist[] = json.data.results.map((item: any) => {
          const imgObj = item.image?.find((i: any) => i.quality === "500x500") || item.image?.[0];
          return {
            id: item.id,
            name: item.name,
            image: imgObj?.url || imgObj?.link,
            role: item.role === 'singer' ? 'Artist' : item.role || '1 Album | 10 Songs'
          };
        });
        setArtists(mappedArtists);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    // 2. Loading spinner uses primary orange on dark background
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <FlatList
        data={artists}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100, paddingTop: 20 }}
        renderItem={({ item }) => (
          <ArtistListItem 
            artist={item} 
            onOptionPress={() => handleOpenOptions(item)} 
          />
        )}
        ListEmptyComponent={
          // 3. Muted text for empty states
          <Text style={[styles.emptyText, { color: theme.subText }]}>No artists found.</Text>
        }
      />

      <ArtistOptionsModal 
        visible={modalVisible} 
        artist={selectedArtist} 
        onClose={() => setModalVisible(false)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  }
});