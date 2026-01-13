
// import React from 'react';
// import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback, Share, Alert } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native'; // <--- Import Navigation
// import { Song } from './SongListItem';
// import { usePlayerStore } from '../store/usePlayerStore';
// import { useFavoritesStore } from '../store/useFavoritesStore';

// interface Props {
//   visible: boolean;
//   song: Song | null;
//   onClose: () => void;
// }

// export default function SongOptionsModal({ visible, song, onClose }: Props) {
//   const navigation = useNavigation<any>(); // <--- Hook for navigation
//   const addToQueue = usePlayerStore((state) => state.addToQueue);
//   const queue = usePlayerStore((state) => state.queue);
//   const currentIndex = usePlayerStore((state) => state.currentIndex);
//   const reorderQueue = usePlayerStore((state) => state.reorderQueue);
//   const { isFavorite, toggleFavorite } = useFavoritesStore();
  
//   const liked = song ? isFavorite(song.id) : false;

//   if (!song) return null;

//   // --- ACTIONS ---

//   const handlePlayNext = () => {
//     const newQueue = [...queue];
//     const insertIndex = currentIndex + 1;
//     newQueue.splice(insertIndex, 0, song);
//     reorderQueue(newQueue);
//     onClose();
//   };

//   const handleAddToQueue = () => {
//     addToQueue(song); 
//     onClose();
//   };

//   const handleShare = async () => {
//     try {
//       await Share.share({
//         message: `Check out this song: ${song.title} by ${song.artist} \n${song.audioUrl}`,
//       });
//       onClose();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleDetails = () => {
//     Alert.alert(
//       "Song Details",
//       `Title: ${song.title}\nArtist: ${song.artist}\nDuration: ${song.duration}s\nID: ${song.id}`,
//       [{ text: "OK", onPress: onClose }]
//     );
//   };

//   const handleGoToArtist = () => {
//     onClose();
//     if (song.artistId) {
//       navigation.navigate('ArtistDetailsScreen', { id: song.artistId, name: song.artist });
//     } else {
//       // Fallback if we don't have an ID (search by name or show alert)
//       // For now, let's just search
//       navigation.navigate('Search', { query: song.artist });
//     }
//   };

//   const handleGoToAlbum = () => {
//     onClose();
//     if (song.albumId) {
//       navigation.navigate('AlbumDetailsScreen', { album: { id: song.albumId, name: song.album, image: song.coverUrl } });
//     } else {
//        Alert.alert("Unavailable", "Album details are not available for this song.");
//     }
//   };

//   const options = [
//     { icon: 'arrow-forward-circle-outline', label: 'Play Next', action: handlePlayNext },
//     { icon: 'list-circle-outline', label: 'Add to Playing Queue', action: handleAddToQueue },
//     { icon: 'add-circle-outline', label: 'Add to Playlist', action: () => Alert.alert("Coming Soon", "Playlist feature is next!") },
    
//     // Navigation Options
//     { icon: 'disc-outline', label: 'Go to Album', action: handleGoToAlbum },
//     { icon: 'person-outline', label: 'Go to Artist', action: handleGoToArtist },
    
//     { icon: 'information-circle-outline', label: 'Details', action: handleDetails },
//     { icon: 'share-social-outline', label: 'Share', action: handleShare },
    
//     { icon: 'call-outline', label: 'Set as Ringtone', action: () => Alert.alert("Coming Soon") },
//     { icon: 'trash-outline', label: 'Delete from Device', color: 'red', action: () => Alert.alert("Cannot Delete", "This is a streamed song.") },
//   ];

//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={visible}
//       onRequestClose={onClose}
//     >
//       <TouchableWithoutFeedback onPress={onClose}>
//         <View style={styles.overlay} />
//       </TouchableWithoutFeedback>

//       <View style={styles.sheetContainer}>
//         <View style={styles.handleContainer}>
//            <View style={styles.handle} />
//         </View>

//         <View style={styles.header}>
//           <Image source={{ uri: song.coverUrl }} style={styles.art} />
//           <View style={styles.info}>
//             <Text style={styles.title} numberOfLines={1}>{song.title}</Text>
//             <Text style={styles.artist} numberOfLines={1}>
//                 {song.artist}  |  {typeof song.duration === 'number' ? Math.floor(song.duration / 60) + ':' + (song.duration % 60).toString().padStart(2, '0') : song.duration}
//             </Text>
//           </View>
          
//           <TouchableOpacity onPress={() => toggleFavorite(song)}>
//              <Ionicons 
//                 name={liked ? "heart" : "heart-outline"} 
//                 size={28} 
//                 color={liked ? "#FF6B00" : "gray"} 
//              />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.divider} />

//         <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
//           {options.map((opt, index) => (
//             <TouchableOpacity 
//               key={index} 
//               style={styles.optionRow} 
//               onPress={opt.action ? opt.action : onClose}
//             >
//               <Ionicons 
//                 name={opt.icon as any} 
//                 size={24} 
//                 color={opt.color || "#000"} 
//                 style={{ marginRight: 16 }}
//               />
//               <Text style={[styles.optionText, opt.color && { color: opt.color }]}>
//                 {opt.label}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
//   sheetContainer: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     paddingTop: 10,
//     paddingHorizontal: 20,
//     height: '65%',
//     position: 'absolute',
//     bottom: 0, left: 0, right: 0,
//     elevation: 20,
//     shadowColor: '#000', shadowOffset: { width: 0, height: -10 },
//     shadowOpacity: 0.1, shadowRadius: 10,
//   },
//   handleContainer: { alignItems: 'center', marginBottom: 10 },
//   handle: { width: 40, height: 4, backgroundColor: '#ccc', borderRadius: 2 },
//   header: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
//   art: { width: 50, height: 50, borderRadius: 8, backgroundColor: '#eee' },
//   info: { flex: 1, marginLeft: 15 },
//   title: { fontSize: 16, fontWeight: 'bold', color: '#000' },
//   artist: { fontSize: 12, color: 'gray', marginTop: 2 },
//   divider: { height: 1, backgroundColor: '#f0f0f0', marginBottom: 10 },
//   optionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
//   optionText: { fontSize: 16, fontWeight: '500', color: '#000' },
// });

import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback, Share, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Song } from './SongListItem';
import { usePlayerStore } from '../store/usePlayerStore';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { useThemeStore, Colors } from '../store/useThemeStore'; // <--- Added theme import

interface Props {
  visible: boolean;
  song: Song | null;
  onClose: () => void;
}

export default function SongOptionsModal({ visible, song, onClose }: Props) {
  const navigation = useNavigation<any>();
  const addToQueue = usePlayerStore((state) => state.addToQueue);
  const queue = usePlayerStore((state) => state.queue);
  const currentIndex = usePlayerStore((state) => state.currentIndex);
  const reorderQueue = usePlayerStore((state) => state.reorderQueue);
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  
  // 1. Theme state handling
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  const liked = song ? isFavorite(song.id) : false;

  if (!song) return null;

  // --- ACTIONS (Unchanged logic) ---
  const handlePlayNext = () => {
    const newQueue = [...queue];
    const insertIndex = currentIndex + 1;
    newQueue.splice(insertIndex, 0, song);
    reorderQueue(newQueue);
    onClose();
  };

  const handleAddToQueue = () => {
    addToQueue(song); 
    onClose();
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this song: ${song.title} by ${song.artist} \n${song.audioUrl}`,
      });
      onClose();
    } catch (error) { console.log(error); }
  };

  const handleDetails = () => {
    Alert.alert(
      "Song Details",
      `Title: ${song.title}\nArtist: ${song.artist}\nDuration: ${song.duration}s\nID: ${song.id}`,
      [{ text: "OK", onPress: onClose }]
    );
  };

  const handleGoToArtist = () => {
    onClose();
    if (song.artistId) {
      navigation.navigate('ArtistDetailsScreen', { id: song.artistId, name: song.artist });
    } else {
      navigation.navigate('Search', { query: song.artist });
    }
  };

  const handleGoToAlbum = () => {
    onClose();
    if (song.albumId) {
      navigation.navigate('AlbumDetailsScreen', { album: { id: song.albumId, name: song.album, image: song.coverUrl } });
    } else {
       Alert.alert("Unavailable", "Album details are not available for this song.");
    }
  };

  const options = [
    { icon: 'arrow-forward-circle-outline', label: 'Play Next', action: handlePlayNext },
    { icon: 'list-circle-outline', label: 'Add to Playing Queue', action: handleAddToQueue },
    { icon: 'add-circle-outline', label: 'Add to Playlist', action: () => Alert.alert("Coming Soon", "Playlist feature is next!") },
    { icon: 'disc-outline', label: 'Go to Album', action: handleGoToAlbum },
    { icon: 'person-outline', label: 'Go to Artist', action: handleGoToArtist },
    { icon: 'information-circle-outline', label: 'Details', action: handleDetails },
    { icon: 'share-social-outline', label: 'Share', action: handleShare },
    { icon: 'call-outline', label: 'Set as Ringtone', action: () => Alert.alert("Coming Soon") },
    { icon: 'trash-outline', label: 'Delete from Device', color: '#ff4d4d', action: () => Alert.alert("Cannot Delete", "This is a streamed song.") },
  ];

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* 2. Sheet Container with dynamic background */}
      <View style={[styles.sheetContainer, { backgroundColor: isDarkMode ? Colors.dark.surface : '#fff' }]}>
        <View style={styles.handleContainer}>
           <View style={[styles.handle, { backgroundColor: theme.border }]} />
        </View>

        <View style={styles.header}>
          <Image source={{ uri: song.coverUrl }} style={[styles.art, { backgroundColor: theme.card }]} />
          <View style={styles.info}>
            <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>{song.title}</Text>
            <Text style={[styles.artist, { color: theme.subText }]} numberOfLines={1}>
                {song.artist}  |  {typeof song.duration === 'number' ? Math.floor(song.duration / 60) + ':' + (song.duration % 60).toString().padStart(2, '0') : song.duration}
            </Text>
          </View>
          
          <TouchableOpacity onPress={() => toggleFavorite(song)}>
             <Ionicons 
                name={liked ? "heart" : "heart-outline"} 
                size={28} 
                color={liked ? theme.primary : theme.subText} 
             />
          </TouchableOpacity>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
          {options.map((opt, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.optionRow} 
              onPress={opt.action ? opt.action : onClose}
            >
              <Ionicons 
                name={opt.icon as any} 
                size={24} 
                color={opt.color || theme.text} 
                style={{ marginRight: 16 }}
              />
              <Text style={[styles.optionText, { color: opt.color || theme.text }]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' }, // Darker overlay for Mume style
  sheetContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 10,
    paddingHorizontal: 20,
    height: '70%', // Slightly taller to fit icons comfortably
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    elevation: 20,
  },
  handleContainer: { alignItems: 'center', marginBottom: 10 },
  handle: { width: 40, height: 4, borderRadius: 2 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  art: { width: 55, height: 55, borderRadius: 12 },
  info: { flex: 1, marginLeft: 15 },
  title: { fontSize: 18, fontWeight: 'bold' },
  artist: { fontSize: 13, marginTop: 2 },
  divider: { height: 1, marginBottom: 15 },
  optionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  optionText: { fontSize: 16, fontWeight: '500' },
});