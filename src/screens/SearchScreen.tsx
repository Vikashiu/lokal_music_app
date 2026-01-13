// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// // Import all list items
// import SongListItem, { Song } from '../components/SongListItem';
// import ArtistListItem, { Artist } from '../components/ArtistListItem';
// import AlbumListItem, { Album } from '../components/AlbumListItem';

// import { usePlayerStore } from '../store/usePlayerStore';

// const cleanText = (text: string) => text ? text.replace(/&quot;/g, '"').replace(/&amp;/g, '&') : "Unknown";

// export default function SearchScreen() {
//   const navigation = useNavigation();
//   const playSong = usePlayerStore((state) => state.playSong);

//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState<any[]>([]); // Can be Song[], Artist[], or Album[]
//   const [loading, setLoading] = useState(false);
  
//   const [recentSearches, setRecentSearches] = useState(['Ariana Grande', 'The Weeknd', 'Taylor Swift']);
  
//   const resultTabs = ['Songs', 'Artists', 'Albums', 'Folders'];
//   const [activeTab, setActiveTab] = useState('Songs');

//   // 1. Re-run search when Tab changes (if there is a query)
//   useEffect(() => {
//     if (query.length >= 2) {
//       performSearch(query);
//     }
//   }, [activeTab]);

//   // 2. Handle Text Input
//   const handleTextChange = (text: string) => {
//     setQuery(text);
//     if (text.length >= 2) {
//       performSearch(text);
//     }
//   };

//   // 3. Main Search Logic
//   const performSearch = async (text: string) => {
//     setLoading(true);
//     setResults([]); // Clear previous results to avoid mismatched lists

//     try {
//       let endpoint = '';
      
//       // Select API based on Tab
//       switch (activeTab) {
//         case 'Artists':
//           endpoint = `https://saavn.sumit.co/api/search/artists?query=${text}&page=1&limit=20`;
//           break;
//         case 'Albums':
//           endpoint = `https://saavn.sumit.co/api/search/albums?query=${text}&page=1&limit=20`;
//           break;
//         case 'Songs':
//         default:
//           endpoint = `https://saavn.sumit.co/api/search/songs?query=${text}&page=1&limit=20`;
//           break;
//       }

//       const response = await fetch(endpoint);
//       const json = await response.json();

//       if (json.success && json.data && json.data.results) {
//         let mappedResults: any[] = [];

//         // Map Data based on Type
//         if (activeTab === 'Songs') {
//           mappedResults = json.data.results.map((item: any) => {
//              const imgObj = item.image?.find((i: any) => i.quality === "500x500") || item.image?.[0];
//              const audioObj = item.downloadUrl?.find((d: any) => d.quality === "320kbps") || item.downloadUrl?.[0];
//              return {
//                id: item.id,
//                title: cleanText(item.name),
//                artist: item.artists?.primary?.map((a: any) => a.name).join(', ') || item.primaryArtists,
//                duration: "00:00",
//                coverUrl: imgObj?.url || imgObj?.link,
//                audioUrl: audioObj?.url || audioObj?.link
//              };
//           });
//         } 
//         else if (activeTab === 'Artists') {
//           mappedResults = json.data.results.map((item: any) => {
//             const imgObj = item.image?.find((i: any) => i.quality === "500x500") || item.image?.[0];
//             return {
//               id: item.id,
//               name: item.name,
//               image: imgObj?.url || imgObj?.link,
//               role: item.role || 'Artist'
//             };
//           });
//         }
//         else if (activeTab === 'Albums') {
//           mappedResults = json.data.results.map((item: any) => {
//             const imgObj = item.image?.find((i: any) => i.quality === "500x500") || item.image?.[0];
//             return {
//               id: item.id,
//               name: cleanText(item.name),
//               artist: item.artists?.primary?.[0]?.name || item.primaryArtists || "Unknown",
//               year: item.year || "2024",
//               songCount: item.songCount || "?",
//               image: imgObj?.url || imgObj?.link
//             };
//           });
//         }

//         setResults(mappedResults);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearSearch = () => {
//     setQuery('');
//     setResults([]);
//   };

//   // 4. Render correct component based on Tab
//   const renderResultItem = ({ item }: { item: any }) => {
//     if (activeTab === 'Songs') {
//       return (
//         <SongListItem 
//           song={item} 
//           onPlay={() => playSong(item)}
//         />
//       );
//     } 
//     else if (activeTab === 'Artists') {
//       return (
//         <ArtistListItem 
//           artist={item} 
//           onOptionPress={() => {}} // Store handles this automatically if implemented
//         />
//       );
//     } 
//     else if (activeTab === 'Albums') {
//       return (
//         <AlbumListItem album={item} />
//       );
//     }
//     return null;
//   };

//   return (
//     <SafeAreaView style={styles.container}>
      
//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
        
//         <View style={styles.inputContainer}>
//            <Ionicons name="search" size={20} color="gray" style={{ marginRight: 8 }} />
//            <TextInput
//              style={styles.input}
//              placeholder={`Search ${activeTab.toLowerCase()}...`} // Dynamic placeholder
//              value={query}
//              onChangeText={handleTextChange}
//              autoFocus
//            />
//            {query.length > 0 && (
//              <TouchableOpacity onPress={clearSearch}>
//                <Ionicons name="close-circle" size={20} color="gray" />
//              </TouchableOpacity>
//            )}
//         </View>
//       </View>

//       {/* RECENT SEARCHES */}
//       {query.length === 0 ? (
//         <View style={styles.recentContainer}>
//           <View style={styles.recentHeader}>
//             <Text style={styles.recentTitle}>Recent Searches</Text>
//             <TouchableOpacity onPress={() => setRecentSearches([])}>
//               <Text style={styles.clearAll}>Clear All</Text>
//             </TouchableOpacity>
//           </View>
          
//           <ScrollView>
//             {recentSearches.map((item, index) => (
//               <TouchableOpacity key={index} style={styles.historyItem} onPress={() => handleTextChange(item)}>
//                 <Text style={styles.historyText}>{item}</Text>
//                 <Ionicons name="close" size={20} color="#ccc" />
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>
//       ) : (
//         /* RESULTS AREA */
//         <View style={{ flex: 1 }}>
          
//           {/* TABS */}
//           <View style={styles.tabContainer}>
//             <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//               {resultTabs.map(tab => (
//                 <TouchableOpacity 
//                   key={tab} 
//                   style={[styles.tabItem, activeTab === tab && styles.activeTab]}
//                   onPress={() => setActiveTab(tab)}
//                 >
//                   <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </View>

//           {/* LOADING & LIST */}
//           {loading ? (
//              <ActivityIndicator size="large" color="#FF6B00" style={{ marginTop: 20 }} />
//           ) : (
//              <FlatList
//                data={results}
//                keyExtractor={(item) => item.id}
//                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
               
//                // Switch columns for Albums (Grid) vs Songs/Artists (List)
//                key={activeTab} // Force re-render when switching types (Important for NumColumns)
//                numColumns={activeTab === 'Albums' ? 2 : 1}
               
//                renderItem={renderResultItem}
               
//                ListEmptyComponent={
//                  <View style={styles.emptyContainer}>
//                     <Ionicons name="sad-outline" size={80} color="#FF6B00" />
//                     <Text style={styles.notFoundTitle}>Not Found</Text>
//                     <Text style={styles.notFoundText}>No {activeTab.toLowerCase()} found for "{query}".</Text>
//                  </View>
//                }
//              />
//           )}
//         </View>
//       )}

//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 10, marginBottom: 10 },
//   inputContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, marginLeft: 15 },
//   input: { flex: 1, fontSize: 16, color: '#000' },
//   recentContainer: { paddingHorizontal: 20, marginTop: 10 },
//   recentHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
//   recentTitle: { fontSize: 18, fontWeight: 'bold' },
//   clearAll: { color: '#FF6B00', fontWeight: '600' },
//   historyItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
//   historyText: { fontSize: 16, color: 'gray' },
//   tabContainer: { paddingHorizontal: 20, marginBottom: 10 },
//   tabItem: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20, borderWidth: 1, borderColor: '#FF6B00', marginRight: 10, backgroundColor: '#fff' },
//   activeTab: { backgroundColor: '#FF6B00' },
//   tabText: { color: '#FF6B00', fontWeight: '600' },
//   activeTabText: { color: '#fff' },
//   emptyContainer: { alignItems: 'center', marginTop: 50 },
//   notFoundTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 10, marginBottom: 8 },
//   notFoundText: { textAlign: 'center', color: 'gray', paddingHorizontal: 40 },
// });
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  FlatList, 
  ActivityIndicator 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore, Colors } from '../store/useThemeStore'; // <--- Import Theme Store

import SongListItem, { Song } from '../components/SongListItem';
import ArtistListItem, { Artist } from '../components/ArtistListItem';
import AlbumListItem, { Album } from '../components/AlbumListItem';
import { usePlayerStore } from '../store/usePlayerStore';

const cleanText = (text: string) => text ? text.replace(/&quot;/g, '"').replace(/&amp;/g, '&') : "Unknown";

export default function SearchScreen() {
  const navigation = useNavigation();
  const playSong = usePlayerStore((state) => state.playSong);

  // 1. Access the current theme
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]); 
  const [loading, setLoading] = useState(false);
  
  const [recentSearches, setRecentSearches] = useState(['Ariana Grande', 'The Weeknd', 'Taylor Swift']);
  
  const resultTabs = ['Songs', 'Artists', 'Albums', 'Folders'];
  const [activeTab, setActiveTab] = useState('Songs');

  useEffect(() => {
    if (query.length >= 2) {
      performSearch(query);
    }
  }, [activeTab]);

  const handleTextChange = (text: string) => {
    setQuery(text);
    if (text.length >= 2) {
      performSearch(text);
    }
  };

  const performSearch = async (text: string) => {
    setLoading(true);
    setResults([]); 

    try {
      let endpoint = '';
      switch (activeTab) {
        case 'Artists':
          endpoint = `https://saavn.sumit.co/api/search/artists?query=${text}&page=1&limit=20`;
          break;
        case 'Albums':
          endpoint = `https://saavn.sumit.co/api/search/albums?query=${text}&page=1&limit=20`;
          break;
        case 'Songs':
        default:
          endpoint = `https://saavn.sumit.co/api/search/songs?query=${text}&page=1&limit=20`;
          break;
      }

      const response = await fetch(endpoint);
      const json = await response.json();

      if (json.success && json.data && json.data.results) {
        let mappedResults: any[] = [];

        if (activeTab === 'Songs') {
          mappedResults = json.data.results.map((item: any) => {
             const imgObj = item.image?.find((i: any) => i.quality === "500x500") || item.image?.[0];
             const audioObj = item.downloadUrl?.find((d: any) => d.quality === "320kbps") || item.downloadUrl?.[0];
             return {
               id: item.id,
               title: cleanText(item.name),
               artist: item.artists?.primary?.map((a: any) => a.name).join(', ') || item.primaryArtists,
               duration: item.duration, // Use raw number for themed SongListItem
               coverUrl: imgObj?.url || imgObj?.link,
               audioUrl: audioObj?.url || audioObj?.link
             };
          });
        } 
        else if (activeTab === 'Artists') {
          mappedResults = json.data.results.map((item: any) => {
            const imgObj = item.image?.find((i: any) => i.quality === "500x500") || item.image?.[0];
            return {
              id: item.id,
              name: item.name,
              image: imgObj?.url || imgObj?.link,
              role: item.role || 'Artist'
            };
          });
        }
        else if (activeTab === 'Albums') {
          mappedResults = json.data.results.map((item: any) => {
            const imgObj = item.image?.find((i: any) => i.quality === "500x500") || item.image?.[0];
            return {
              id: item.id,
              name: cleanText(item.name),
              artist: item.artists?.primary?.[0]?.name || item.primaryArtists || "Unknown",
              year: item.year || "2024",
              songCount: item.songCount || "?",
              image: imgObj?.url || imgObj?.link
            };
          });
        }
        setResults(mappedResults);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  const renderResultItem = ({ item }: { item: any }) => {
    if (activeTab === 'Songs') return <SongListItem song={item} onPlay={() => playSong(item, results)} />;
    if (activeTab === 'Artists') return <ArtistListItem artist={item} onOptionPress={() => {}} />;
    if (activeTab === 'Albums') return <AlbumListItem album={item} />;
    return null;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      
      {/* HEADER: Search Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        
        <View style={[styles.inputContainer, { backgroundColor: Colors.dark.surface }]}>
           <Ionicons name="search" size={20} color={theme.subText} style={{ marginRight: 8 }} />
           <TextInput
             style={[styles.input, { color: theme.text }]}
             placeholder={`Search ${activeTab.toLowerCase()}...`}
             placeholderTextColor={theme.subText}
             value={query}
             onChangeText={handleTextChange}
             autoFocus
           />
           {query.length > 0 && (
             <TouchableOpacity onPress={clearSearch}>
               <Ionicons name="close-circle" size={20} color={theme.subText} />
             </TouchableOpacity>
           )}
        </View>
      </View>

      {/* RECENT SEARCHES */}
      {query.length === 0 ? (
        <View style={styles.recentContainer}>
          <View style={styles.recentHeader}>
            <Text style={[styles.recentTitle, { color: theme.text }]}>Recent Searches</Text>
            <TouchableOpacity onPress={() => setRecentSearches([])}>
              <Text style={[styles.clearAll, { color: theme.primary }]}>Clear All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView>
            {recentSearches.map((item, index) => (
              <TouchableOpacity key={index} style={[styles.historyItem, { borderBottomColor: theme.border }]} onPress={() => handleTextChange(item)}>
                <Text style={[styles.historyText, { color: theme.subText }]}>{item}</Text>
                <Ionicons name="close" size={20} color={theme.border} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : (
        /* RESULTS AREA */
        <View style={{ flex: 1 }}>
          
          {/* TABS */}
          <View style={styles.tabContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {resultTabs.map(tab => (
                <TouchableOpacity 
                  key={tab} 
                  style={[
                    styles.tabItem, 
                    { borderColor: theme.primary },
                    activeTab === tab && { backgroundColor: theme.primary }
                  ]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text style={[
                    styles.tabText, 
                    { color: activeTab === tab ? '#fff' : theme.primary }
                  ]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* LOADING & LIST */}
          {loading ? (
             <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 20 }} />
          ) : (
             <FlatList
               data={results}
               keyExtractor={(item) => item.id}
               contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
               key={activeTab} 
               numColumns={activeTab === 'Albums' ? 2 : 1}
               renderItem={renderResultItem}
               ListEmptyComponent={
                 <View style={styles.emptyContainer}>
                    <Ionicons name="sad-outline" size={80} color={theme.primary} />
                    <Text style={[styles.notFoundTitle, { color: theme.text }]}>Not Found</Text>
                    <Text style={[styles.notFoundText, { color: theme.subText }]}>No {activeTab.toLowerCase()} found for "{query}".</Text>
                 </View>
               }
             />
          )}
        </View>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 10, marginBottom: 10 },
  inputContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, marginLeft: 15 },
  input: { flex: 1, fontSize: 16 },
  recentContainer: { paddingHorizontal: 20, marginTop: 10 },
  recentHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  recentTitle: { fontSize: 18, fontWeight: 'bold' },
  clearAll: { fontWeight: '600' },
  historyItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1 },
  historyText: { fontSize: 16 },
  tabContainer: { paddingHorizontal: 20, marginBottom: 10 },
  tabItem: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20, borderWidth: 1, marginRight: 10 },
  tabText: { fontWeight: '600' },
  emptyContainer: { alignItems: 'center', marginTop: 50 },
  notFoundTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 10, marginBottom: 8 },
  notFoundText: { textAlign: 'center', paddingHorizontal: 40 },
});