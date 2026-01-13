// import React, { useState } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   FlatList, 
//   TouchableOpacity, 
//   TextInput, 
//   Modal, 
//   Alert 
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import { usePlaylistStore } from '../store/usePlaylistStore';
// import { useNavigation } from '@react-navigation/native';

// export default function PlaylistsScreen() {
//   const navigation = useNavigation<any>();
//   const { playlists, createPlaylist, deletePlaylist } = usePlaylistStore();
  
//   // State for the "Create Playlist" Modal
//   const [modalVisible, setModalVisible] = useState(false);
//   const [newPlaylistName, setNewPlaylistName] = useState('');

//   // Handles creating a new playlist entry
//   const handleCreate = () => {
//     if (newPlaylistName.trim().length === 0) return;
//     createPlaylist(newPlaylistName);
//     setNewPlaylistName('');
//     setModalVisible(false);
//   };

//   // Handles playlist deletion with a confirmation alert
//   const handleDelete = (id: string) => {
//     Alert.alert(
//       "Delete Playlist",
//       "Are you sure you want to delete this playlist?",
//       [
//         { text: "Cancel", style: "cancel" },
//         { text: "Delete", style: "destructive", onPress: () => deletePlaylist(id) }
//       ]
//     );
//   };

//   // Navigates to the details of the selected playlist
//   const handleOpenPlaylist = (playlist: any) => {
//     navigation.navigate('PlaylistDetails', { playlistId: playlist.id }); 
//   };

//   return (
//     <SafeAreaView style={styles.container}>
      
//       {/* Header Section */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Your Playlists</Text>
//         <TouchableOpacity onPress={() => setModalVisible(true)}>
//           <Ionicons name="add-circle" size={32} color="#FF6B00" />
//         </TouchableOpacity>
//       </View>

//       {/* Main List / Empty State Logic */}
//       {playlists.length === 0 ? (
//         <View style={styles.emptyContainer}>
//             <Ionicons name="musical-notes-outline" size={60} color="#ddd" />
//             <Text style={styles.emptyText}>No playlists yet.</Text>
//             <TouchableOpacity onPress={() => setModalVisible(true)}>
//                 <Text style={styles.createLink}>Create one now</Text>
//             </TouchableOpacity>
//         </View>
//       ) : (
//         <FlatList
//           data={playlists}
//           keyExtractor={(item) => item.id}
//           numColumns={2} 
//           contentContainerStyle={{ padding: 10 }}
//           renderItem={({ item }) => (
//             <TouchableOpacity 
//                 style={styles.card} 
//                 onPress={() => handleOpenPlaylist(item)}
//                 onLongPress={() => handleDelete(item.id)} 
//             >
//               <View style={styles.cardIcon}>
//                 <Ionicons name="musical-note" size={30} color="#fff" />
//               </View>
//               <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
//               <Text style={styles.cardCount}>{item.songs.length} Songs</Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}

//       {/* Create Playlist Modal Popup */}
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>New Playlist</Text>
//             <TextInput 
//                 style={styles.input} 
//                 placeholder="Playlist Name" 
//                 autoFocus 
//                 value={newPlaylistName}
//                 onChangeText={setNewPlaylistName}
//             />
//             <View style={styles.modalButtons}>
//                 <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.buttonCancel}>
//                     <Text style={{color: 'gray'}}>Cancel</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={handleCreate} style={styles.buttonCreate}>
//                     <Text style={{color: '#fff', fontWeight: 'bold'}}>Create</Text>
//                 </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   header: { 
//     flexDirection: 'row', 
//     justifyContent: 'space-between', 
//     alignItems: 'center', 
//     padding: 20 
//   },
//   headerTitle: { fontSize: 32, fontWeight: 'bold', color: '#000' },
  
//   emptyContainer: { 
//     flex: 1, 
//     justifyContent: 'center', 
//     alignItems: 'center', 
//     marginTop: -50 
//   },
//   emptyText: { fontSize: 16, color: 'gray', marginTop: 10 },
//   createLink: { fontSize: 16, color: '#FF6B00', fontWeight: 'bold', marginTop: 5 },

//   card: { 
//     flex: 1, 
//     backgroundColor: '#333', 
//     margin: 8, 
//     borderRadius: 12, 
//     padding: 15, 
//     height: 140, 
//     justifyContent: 'flex-end' 
//   },
//   cardIcon: { position: 'absolute', top: 15, left: 15, opacity: 0.8 },
//   cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
//   cardCount: { fontSize: 12, color: '#aaa' },

//   modalOverlay: { 
//     flex: 1, 
//     backgroundColor: 'rgba(0,0,0,0.5)', 
//     justifyContent: 'center', 
//     alignItems: 'center' 
//   },
//   modalContent: { 
//     backgroundColor: '#fff', 
//     width: '80%', 
//     padding: 20, 
//     borderRadius: 12, 
//     elevation: 5 
//   },
//   modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
//   input: { 
//     borderBottomWidth: 1, 
//     borderBottomColor: '#ccc', 
//     paddingVertical: 8, 
//     fontSize: 16, 
//     marginBottom: 20 
//   },
  
//   // Fixed: Multiple justifyContent properties removed
//   modalButtons: { 
//     flexDirection: 'row', 
//     justifyContent: 'flex-end', 
//     gap: 20 
//   },

//   buttonCancel: { padding: 10 },
//   buttonCreate: { 
//     backgroundColor: '#FF6B00', 
//     paddingVertical: 10, 
//     paddingHorizontal: 20, 
//     borderRadius: 8 
//   },
// });
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  TextInput, 
  Modal, 
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { usePlaylistStore } from '../store/usePlaylistStore';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore, Colors } from '../store/useThemeStore'; // <--- Import Theme Store

export default function PlaylistsScreen() {
  const navigation = useNavigation<any>();
  const { playlists, createPlaylist, deletePlaylist } = usePlaylistStore();
  
  // 1. Access the current theme
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  const [modalVisible, setModalVisible] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const handleCreate = () => {
    if (newPlaylistName.trim().length === 0) return;
    createPlaylist(newPlaylistName);
    setNewPlaylistName('');
    setModalVisible(false);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Playlist",
      "Are you sure you want to delete this playlist?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deletePlaylist(id) }
      ]
    );
  };

  const handleOpenPlaylist = (playlist: any) => {
    navigation.navigate('PlaylistDetails', { playlistId: playlist.id }); 
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      
      {/* Header Section with themed text */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Your Playlists</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle" size={32} color={theme.primary} />
        </TouchableOpacity>
      </View>

      {/* Main List / Empty State Logic */}
      {playlists.length === 0 ? (
        <View style={styles.emptyContainer}>
            <Ionicons name="musical-notes-outline" size={60} color={theme.border} />
            <Text style={[styles.emptyText, { color: theme.subText }]}>No playlists yet.</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={[styles.createLink, { color: theme.primary }]}>Create one now</Text>
            </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={playlists}
          keyExtractor={(item) => item.id}
          numColumns={2} 
          contentContainerStyle={{ padding: 10, paddingBottom: 100 }}
          renderItem={({ item }) => (
            <TouchableOpacity 
                style={[styles.card, { backgroundColor: Colors.dark.surface }]} 
                onPress={() => handleOpenPlaylist(item)}
                onLongPress={() => handleDelete(item.id)} 
            >
              <View style={styles.cardIcon}>
                <Ionicons name="musical-note" size={30} color={theme.primary} />
              </View>
              <Text style={[styles.cardTitle, { color: theme.text }]} numberOfLines={1}>{item.name}</Text>
              <Text style={[styles.cardCount, { color: theme.subText }]}>{item.songs.length} Songs</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Create Playlist Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isDarkMode ? Colors.dark.surface : '#fff' }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>New Playlist</Text>
            <TextInput 
                style={[styles.input, { color: theme.text, borderBottomColor: theme.border }]} 
                placeholder="Playlist Name" 
                placeholderTextColor={theme.subText}
                autoFocus 
                value={newPlaylistName}
                onChangeText={setNewPlaylistName}
            />
            <View style={styles.modalButtons}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.buttonCancel}>
                    <Text style={{ color: theme.subText }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCreate} style={[styles.buttonCreate, { backgroundColor: theme.primary }]}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Create</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20 
  },
  headerTitle: { fontSize: 32, fontWeight: 'bold' },
  
  emptyContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: -50 
  },
  emptyText: { fontSize: 16, marginTop: 10 },
  createLink: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },

  card: { 
    flex: 1, 
    margin: 8, 
    borderRadius: 16, // Smoother corners for Mume look
    padding: 15, 
    height: 140, 
    justifyContent: 'flex-end' 
  },
  cardIcon: { position: 'absolute', top: 15, left: 15, opacity: 0.8 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  cardCount: { fontSize: 12 },

  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.7)', // Darker overlay for better focus
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  modalContent: { 
    width: '85%', 
    padding: 24, 
    borderRadius: 24, // Matches the Mume sheet corners
    elevation: 5 
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { 
    borderBottomWidth: 1, 
    paddingVertical: 10, 
    fontSize: 16, 
    marginBottom: 30 
  },
  modalButtons: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    alignItems: 'center',
    gap: 20 
  },
  buttonCancel: { padding: 10 },
  buttonCreate: { 
    paddingVertical: 12, 
    paddingHorizontal: 24, 
    borderRadius: 30 
  },
});