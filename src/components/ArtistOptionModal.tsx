// import React from 'react';
// import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { Artist } from './ArtistListItem';

// interface Props {
//   visible: boolean;
//   artist: Artist | null;
//   onClose: () => void;
// }

// export default function ArtistOptionsModal({ visible, artist, onClose }: Props) {
//   if (!artist) return null;

//   const options = [
//     { icon: 'play-circle-outline', label: 'Play' },
//     { icon: 'arrow-forward-circle-outline', label: 'Play Next' },
//     { icon: 'list-circle-outline', label: 'Add to Playing Queue' },
//     { icon: 'add-circle-outline', label: 'Add to Playlist' },
//     { icon: 'share-social-outline', label: 'Share' },
//   ];

//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={visible}
//       onRequestClose={onClose}
//     >
//       {/* Click outside to close */}
//       <TouchableWithoutFeedback onPress={onClose}>
//         <View style={styles.overlay} />
//       </TouchableWithoutFeedback>

//       <View style={styles.sheetContainer}>
//         {/* Grey Handle */}
//         <View style={styles.handleContainer}>
//            <View style={styles.handle} />
//         </View>

//         {/* Header: Circular Image & Info */}
//         <View style={styles.header}>
//           <Image source={{ uri: artist.image }} style={styles.avatar} />
//           <View style={styles.info}>
//             <Text style={styles.title} numberOfLines={1}>{artist.name}</Text>
//             <Text style={styles.subtitle} numberOfLines={1}>{artist.role}</Text>
//           </View>
//         </View>

//         <View style={styles.divider} />

//         {/* Options List */}
//         <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
//           {options.map((opt, index) => (
//             <TouchableOpacity key={index} style={styles.optionRow} onPress={onClose}>
//               <Ionicons 
//                 name={opt.icon as any} 
//                 size={24} 
//                 color="#000" 
//                 style={{ marginRight: 16 }}
//               />
//               <Text style={styles.optionText}>{opt.label}</Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//   },
//   sheetContainer: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     paddingTop: 10,
//     paddingHorizontal: 20,
//     paddingBottom: 30, // Extra padding at bottom
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     elevation: 20,
//   },
//   handleContainer: { alignItems: 'center', marginBottom: 15 },
//   handle: { width: 40, height: 4, backgroundColor: '#ccc', borderRadius: 2 },
  
//   header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
//   avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#eee' }, // Circular
//   info: { flex: 1, marginLeft: 15 },
//   title: { fontSize: 18, fontWeight: 'bold', color: '#000' },
//   subtitle: { fontSize: 13, color: 'gray', marginTop: 2 },
  
//   divider: { height: 1, backgroundColor: '#f0f0f0', marginBottom: 15 },
  
//   optionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
//   optionText: { fontSize: 16, fontWeight: '500', color: '#000' },
// });
import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Artist } from './ArtistListItem';
import { useThemeStore, Colors } from '../store/useThemeStore'; // <--- Import Theme Store

interface Props {
  visible: boolean;
  artist: Artist | null;
  onClose: () => void;
}

export default function ArtistOptionsModal({ visible, artist, onClose }: Props) {
  // 1. Access the current theme
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  if (!artist) return null;

  const options = [
    { icon: 'play-circle-outline', label: 'Play' },
    { icon: 'arrow-forward-circle-outline', label: 'Play Next' },
    { icon: 'list-circle-outline', label: 'Add to Playing Queue' },
    { icon: 'add-circle-outline', label: 'Add to Playlist' },
    { icon: 'share-social-outline', label: 'Share' },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Click outside to close */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* Sheet Container with dynamic background */}
      <View style={[styles.sheetContainer, { backgroundColor: isDarkMode ? Colors.dark.surface : '#fff' }]}>
        {/* Grey Handle */}
        <View style={styles.handleContainer}>
           <View style={[styles.handle, { backgroundColor: theme.border }]} />
        </View>

        {/* Header: Circular Image & Info with themed text */}
        <View style={styles.header}>
          <Image source={{ uri: artist.image }} style={[styles.avatar, { backgroundColor: theme.border }]} />
          <View style={styles.info}>
            <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>{artist.name}</Text>
            <Text style={[styles.subtitle, { color: theme.subText }]} numberOfLines={1}>{artist.role}</Text>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        {/* Options List with themed icons and text */}
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {options.map((opt, index) => (
            <TouchableOpacity key={index} style={styles.optionRow} onPress={onClose}>
              <Ionicons 
                name={opt.icon as any} 
                size={24} 
                color={theme.text} 
                style={{ marginRight: 16 }}
              />
              <Text style={[styles.optionText, { color: theme.text }]}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)', // Slightly darker overlay for better focus
  },
  sheetContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 30, 
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 20,
  },
  handleContainer: { alignItems: 'center', marginBottom: 15 },
  handle: { width: 40, height: 4, borderRadius: 2 },
  
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  avatar: { width: 50, height: 50, borderRadius: 25 }, 
  info: { flex: 1, marginLeft: 15 },
  title: { fontSize: 18, fontWeight: 'bold' },
  subtitle: { fontSize: 13, marginTop: 2 },
  
  divider: { height: 1, marginBottom: 15 },
  
  optionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  optionText: { fontSize: 16, fontWeight: '500' },
});