// import React, { memo } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// // Get screen width to calculate column size
// const { width } = Dimensions.get('window');
// const COLUMN_WIDTH = (width - 60) / 2; // (Screen - Padding) / 2

// export interface Album {
//   id: string;
//   name: string;
//   artist: string;
//   year: string;
//   songCount: string;
//   image: string;
// }

// interface Props {
//   album: Album;
// }

// const AlbumListItem = ({ album }: Props) => {
//   const navigation = useNavigation<any>();

//   return (
//     <TouchableOpacity 
//       style={styles.container}
//       activeOpacity={0.8}
//       onPress={() => navigation.navigate('AlbumDetails', { album })}
//     >
//       {/* Album Cover */}
//       <Image source={{ uri: album.image }} style={styles.cover} />

//       {/* Info */}
//       <View style={styles.info}>
//         <Text style={styles.title} numberOfLines={1}>{album.name}</Text>
//         <Text style={styles.subtitle} numberOfLines={1}>
//           {album.artist} | {album.year}
//         </Text>
//         <Text style={styles.count}>{album.songCount} songs</Text>
//       </View>

//       {/* Menu Button (Absolute Positioned) */}
//       <TouchableOpacity style={styles.menuButton}>
//         <Ionicons name="ellipsis-vertical" size={18} color="#000" />
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: COLUMN_WIDTH,
//     marginBottom: 20,
//     marginRight: 15, // Gap between columns
//   },
//   cover: {
//     width: '100%',
//     height: COLUMN_WIDTH, // Square aspect ratio
//     borderRadius: 16,
//     marginBottom: 8,
//     backgroundColor: '#eee',
//   },
//   info: { paddingRight: 10 },
//   title: { fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 2 },
//   subtitle: { fontSize: 12, color: 'gray', marginBottom: 2 },
//   count: { fontSize: 12, color: 'gray', fontWeight: '500' },
//   menuButton: {
//     position: 'absolute',
//     bottom: 25, // Adjust based on text height
//     right: 0,
//     padding: 4,
//   }
// });

// export default memo(AlbumListItem);
import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore, Colors } from '../store/useThemeStore'; // <--- Import Theme Store

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 60) / 2;

export interface Album {
  id: string;
  name: string;
  artist: string;
  year: string;
  songCount: string;
  image: string;
}

interface Props {
  album: Album;
}

const AlbumListItem = ({ album }: Props) => {
  const navigation = useNavigation<any>();
  
  // 1. Access the current theme
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  return (
    <TouchableOpacity 
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('AlbumDetails', { album })}
    >
      {/* Album Cover with dynamic background for loading state */}
      <Image 
        source={{ uri: album.image }} 
        style={[styles.cover, { backgroundColor: theme.card }]} 
      />

      {/* Info Section with dynamic text colors */}
      <View style={styles.info}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
            {album.name}
        </Text>
        <Text style={[styles.subtitle, { color: theme.subText }]} numberOfLines={1}>
          {album.artist} | {album.year}
        </Text>
        <Text style={[styles.count, { color: theme.subText }]}>
            {album.songCount} songs
        </Text>
      </View>

      {/* Menu Button with dynamic icon color */}
      <TouchableOpacity style={styles.menuButton}>
        <Ionicons name="ellipsis-vertical" size={18} color={theme.text} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: COLUMN_WIDTH,
    marginBottom: 20,
    marginRight: 15,
  },
  cover: {
    width: '100%',
    height: COLUMN_WIDTH,
    borderRadius: 16,
    marginBottom: 8,
  },
  info: { paddingRight: 20 }, // Increased padding to avoid overlapping with menu button
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  subtitle: { fontSize: 12, marginBottom: 2 },
  count: { fontSize: 12, fontWeight: '500' },
  menuButton: {
    position: 'absolute',
    bottom: 22, // Adjusted to align better with text rows
    right: 0,
    padding: 4,
  }
});

export default memo(AlbumListItem);