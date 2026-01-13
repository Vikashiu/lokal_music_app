
// import React, { memo } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { usePlayerStore } from '../store/usePlayerStore';
// import { useOptionsStore } from '../store/useOptionsStore';

// // 1. UPDATE THIS INTERFACE
// export interface Song {
//   id: string;
//   title: string;
//   artist: string;
  
//   // New Optional Fields for Navigation
//   album?: string;   
//   albumId?: string; 
//   artistId?: string; 
  
//   duration: number; // Changed to number to handle math
//   coverUrl: string;
//   audioUrl: string;
// }

// interface Props {
//   song: Song;
//   onPlay: () => void;
//   index?: number;
//   isPlaying?: boolean;
// }

// const SongListItem = ({ song, onPlay }: Props) => {
//   const currentSong = usePlayerStore((state) => state.currentSong);
//   const isPlaying = usePlayerStore((state) => state.isPlaying);
//   const openOptions = useOptionsStore((state) => state.openOptions);

//   const isThisSongActive = currentSong?.id === song.id;
//   const showPauseIcon = isThisSongActive && isPlaying;

//   // Format Duration safely
//   const formattedDuration = typeof song.duration === 'number' 
//     ? `${Math.floor(song.duration / 60)}:${(song.duration % 60).toString().padStart(2, '0')}`
//     : song.duration;

//   return (
//     <View style={styles.container}>
//       <Image source={{ uri: song.coverUrl }} style={styles.albumArt} />

//       <TouchableOpacity style={styles.infoContainer} onPress={onPlay}>
//         <Text style={[styles.title, isThisSongActive && { color: '#FF6B00' }]} numberOfLines={1}>
//           {song.title}
//         </Text>
//         <Text style={styles.subtitle} numberOfLines={1}>
//           {song.artist}  |  {formattedDuration}
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={onPlay} style={styles.playButton}>
//         <Ionicons name={showPauseIcon ? "pause" : "play"} size={16} color="#FF6B00" />
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.menuButton} onPress={() => openOptions(song)}>
//         <Ionicons name="ellipsis-vertical" size={20} color="gray" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, height: 60 },
//   albumArt: { width: 60, height: 60, borderRadius: 16, backgroundColor: '#eee' },
//   infoContainer: { flex: 1, marginLeft: 16, justifyContent: 'center' },
//   title: { fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 4 },
//   subtitle: { fontSize: 14, color: 'gray', fontWeight: '500' },
//   playButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#FFF0E0', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
//   menuButton: { padding: 4, paddingHorizontal: 8 }
// });

// export default memo(SongListItem);
import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePlayerStore } from '../store/usePlayerStore';
import { useOptionsStore } from '../store/useOptionsStore';
import { useThemeStore, Colors } from '../store/useThemeStore'; // <--- Import Theme Store

export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;   
  albumId?: string; 
  artistId?: string; 
  duration: number; 
  coverUrl: string;
  audioUrl: string;
}

interface Props {
  song: Song;
  onPlay: () => void;
  index?: number;
  isPlaying?: boolean;
}

const SongListItem = ({ song, onPlay }: Props) => {
  const currentSong = usePlayerStore((state) => state.currentSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const openOptions = useOptionsStore((state) => state.openOptions);

  // 1. Access the current theme
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  const isThisSongActive = currentSong?.id === song.id;
  const showPauseIcon = isThisSongActive && isPlaying;

  const formattedDuration = typeof song.duration === 'number' 
    ? `${Math.floor(song.duration / 60)}:${(song.duration % 60).toString().padStart(2, '0')}`
    : song.duration;

  return (
    <View style={styles.container}>
      {/* Album artwork with rounded corners matching the Mume UI */}
      <Image 
        source={{ uri: song.coverUrl }} 
        style={[styles.albumArt, { backgroundColor: theme.card }]} 
      />

      <TouchableOpacity style={styles.infoContainer} onPress={onPlay}>
        {/* Title turns Orange if active, otherwise pure white/black */}
        <Text 
          style={[styles.title, { color: isThisSongActive ? theme.primary : theme.text }]} 
          numberOfLines={1}
        >
          {song.title}
        </Text>
        {/* Metadata uses the muted subText color */}
        <Text style={[styles.subtitle, { color: theme.subText }]} numberOfLines={1}>
          {song.artist}  |  {formattedDuration}
        </Text>
      </TouchableOpacity>

      {/* Play/Pause button container matches Starboy orange accent */}
      <TouchableOpacity 
        onPress={onPlay} 
        style={[styles.playButton, { backgroundColor: isDarkMode ? 'rgba(255, 107, 0, 0.15)' : '#FFF0E0' }]}
      >
        <Ionicons name={showPauseIcon ? "pause" : "play"} size={16} color={theme.primary} />
      </TouchableOpacity>

      {/* Options menu dots */}
      <TouchableOpacity style={styles.menuButton} onPress={() => openOptions(song)}>
        <Ionicons name="ellipsis-vertical" size={20} color={theme.subText} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20, 
    height: 60 
  },
  albumArt: { 
    width: 60, 
    height: 60, 
    borderRadius: 16 
  },
  infoContainer: { 
    flex: 1, 
    marginLeft: 16, 
    justifyContent: 'center' 
  },
  title: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 4 
  },
  subtitle: { 
    fontSize: 14, 
    fontWeight: '500' 
  },
  playButton: { 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 10 
  },
  menuButton: { 
    padding: 4, 
    paddingHorizontal: 8 
  }
});

export default memo(SongListItem);