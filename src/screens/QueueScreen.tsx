// import React from 'react';
// import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert, Dimensions } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { usePlayerStore } from '../store/usePlayerStore';

// const { width } = Dimensions.get('window');

// export default function QueueScreen() {
//   const { queue, removeFromQueue, playSong, currentSong, clearQueue } = usePlayerStore();

//   const handleClearQueue = () => {
//     Alert.alert(
//       "Clear Queue",
//       "Remove all songs from the queue?",
//       [
//         { text: "Cancel", style: "cancel" },
//         { text: "Clear All", style: "destructive", onPress: clearQueue }
//       ]
//     );
//   };

//   const renderItem = ({ item }: { item: any }) => {
//     const isActive = currentSong?.id === item.id;

//     return (
//       <View style={[styles.itemContainer, isActive && styles.activeItemContainer]}>
        
//         {/* Song Info (Tap to Play) */}
//         <TouchableOpacity 
//           style={styles.contentContainer} 
//           onPress={() => playSong(item)}
//           activeOpacity={0.7}
//         >
//           {/* Artwork */}
//           <Image source={{ uri: item.coverUrl }} style={styles.artwork} />
          
//           {/* Text Info */}
//           <View style={styles.textContainer}>
//             <Text 
//               style={[styles.title, isActive && styles.activeTitle]} 
//               numberOfLines={1}
//             >
//               {item.title}
//             </Text>
//             <Text 
//               style={[styles.artist, isActive && styles.activeArtist]} 
//               numberOfLines={1}
//             >
//               {item.artist}
//             </Text>
//           </View>
//         </TouchableOpacity>

//         {/* Remove Button */}
//         <TouchableOpacity 
//           onPress={() => removeFromQueue(item.id)}
//           style={styles.removeButton}
//           hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//         >
//           <Ionicons 
//             name="close-circle" 
//             size={22} 
//             color={isActive ? "#FF6B00" : "#ccc"} 
//           />
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Up Next</Text>
//         <Text style={styles.headerSubtitle}>{queue.length} songs queued</Text>
//       </View>

//       {/* The List */}
//       <FlatList
//         data={queue}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={styles.listContent}
//         showsVerticalScrollIndicator={false}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Ionicons name="musical-notes-outline" size={60} color="#eee" />
//             <Text style={styles.emptyText}>Queue is empty</Text>
//           </View>
//         }
//       />

//       {/* Floating Clear Button */}
//       {queue.length > 0 && (
//         <TouchableOpacity style={styles.fab} onPress={handleClearQueue}>
//           <Ionicons name="trash-outline" size={20} color="#fff" />
//           <Text style={styles.fabText}>Clear</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
  
//   // Header
//   header: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 15,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#f5f5f5',
//   },
//   headerTitle: {
//     fontSize: 28,
//     fontWeight: '800',
//     color: '#000',
//     letterSpacing: 0.5,
//   },
//   headerSubtitle: {
//     fontSize: 14,
//     color: '#888',
//     marginTop: 4,
//     fontWeight: '500',
//   },

//   // List Styles
//   listContent: {
//     paddingHorizontal: 20,
//     paddingTop: 10,
//     paddingBottom: 120, // Huge padding at bottom for Mini Player
//   },
//   itemContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f9f9f9',
//   },
//   activeItemContainer: {
//     backgroundColor: '#FFF5EC', // Subtle orange tint for active song
//     marginHorizontal: -20,     // Expand highlight to edges
//     paddingHorizontal: 20,     // Push content back in
//     borderBottomColor: 'transparent',
//   },
  
//   // Content
//   contentContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//     paddingRight: 10,
//   },
//   artwork: {
//     width: 56,
//     height: 56,
//     borderRadius: 12,
//     backgroundColor: '#f0f0f0',
//   },
//   textContainer: {
//     flex: 1,
//     marginLeft: 16,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 4,
//   },
//   activeTitle: {
//     color: '#FF6B00', // Active Orange
//     fontWeight: '700',
//   },
//   artist: {
//     fontSize: 14,
//     color: '#999',
//     fontWeight: '500',
//   },
//   activeArtist: {
//     color: '#FF9F5A', // Lighter orange
//   },

//   // Buttons
//   removeButton: {
//     padding: 5,
//   },
  
//   // Floating Action Button (Clear)
//   fab: {
//     position: 'absolute',
//     bottom: 90, // Positioned above Mini Player area
//     right: 20,
//     backgroundColor: '#000',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 30,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   fabText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     marginLeft: 8,
//     fontSize: 16,
//   },

//   // Empty State
//   emptyContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 100,
//   },
//   emptyText: {
//     marginTop: 10,
//     color: '#ccc',
//     fontSize: 16,
//     fontWeight: '600',
//   }
// });
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePlayerStore } from '../store/usePlayerStore';
import { useThemeStore, Colors } from '../store/useThemeStore'; // <--- Import Theme Store

const { width } = Dimensions.get('window');

export default function QueueScreen() {
  const { queue, removeFromQueue, playSong, currentSong, clearQueue } = usePlayerStore();
  
  // 1. Access the current theme
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  const handleClearQueue = () => {
    Alert.alert(
      "Clear Queue",
      "Remove all songs from the queue?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear All", style: "destructive", onPress: clearQueue }
      ]
    );
  };

  const renderItem = ({ item }: { item: any }) => {
    const isActive = currentSong?.id === item.id;

    return (
      <View style={[
        styles.itemContainer, 
        isActive && { backgroundColor: isDarkMode ? 'rgba(255, 107, 0, 0.1)' : '#FFF5EC', borderBottomColor: 'transparent' },
        { borderBottomColor: theme.border }
      ]}>
        
        <TouchableOpacity 
          style={styles.contentContainer} 
          onPress={() => playSong(item)}
          activeOpacity={0.7}
        >
          <Image 
            source={{ uri: item.coverUrl }} 
            style={[styles.artwork, { backgroundColor: theme.card }]} 
          />
          
          <View style={styles.textContainer}>
            <Text 
              style={[styles.title, { color: isActive ? theme.primary : theme.text }]} 
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <Text 
              style={[styles.artist, { color: isActive ? theme.primary : theme.subText, opacity: isActive ? 0.8 : 1 }]} 
              numberOfLines={1}
            >
              {item.artist}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => removeFromQueue(item.id)}
          style={styles.removeButton}
        >
          <Ionicons 
            name="close-circle" 
            size={22} 
            color={isActive ? theme.primary : theme.subText} 
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header with themed text */}
      <View style={[styles.header, { backgroundColor: theme.background, borderBottomColor: theme.border }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Up Next</Text>
        <Text style={[styles.headerSubtitle, { color: theme.subText }]}>{queue.length} songs queued</Text>
      </View>

      <FlatList
        data={queue}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="musical-notes-outline" size={60} color={theme.border} />
            <Text style={[styles.emptyText, { color: theme.subText }]}>Queue is empty</Text>
          </View>
        }
      />

      {/* Floating Clear Button */}
      {queue.length > 0 && (
        <TouchableOpacity style={[styles.fab, { backgroundColor: theme.primary }]} onPress={handleClearQueue}>
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={styles.fabText}>Clear</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  headerTitle: { fontSize: 28, fontWeight: '800', letterSpacing: 0.5 },
  headerSubtitle: { fontSize: 14, marginTop: 4, fontWeight: '500' },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 120,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    marginHorizontal: -20, // Expand to edges
    paddingHorizontal: 20,
  },
  contentContainer: { flexDirection: 'row', alignItems: 'center', flex: 1, paddingRight: 10 },
  artwork: { width: 56, height: 56, borderRadius: 12 },
  textContainer: { flex: 1, marginLeft: 16, justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  artist: { fontSize: 14, fontWeight: '500' },
  removeButton: { padding: 5 },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabText: { color: '#fff', fontWeight: 'bold', marginLeft: 8, fontSize: 16 },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 100 },
  emptyText: { marginTop: 10, fontSize: 16, fontWeight: '600' }
});