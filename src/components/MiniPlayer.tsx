
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { usePlayerStore } from '../store/usePlayerStore'; 
// import PlayerModal from './PlayerModal';
// import { useSafeAreaInsets } from 'react-native-safe-area-context'; 

// export default function MiniPlayer() {
//   // 1. ADD playNext here
//   const { currentSong, isPlaying, togglePlayPause, position, duration, playNext } = usePlayerStore();
//   const [modalVisible, setModalVisible] = useState(false);
//   const insets = useSafeAreaInsets(); 

//   if (!currentSong) return null;

//   const progressPercent = duration > 0 ? (position / duration) * 100 : 0;

//   return (
//     <>
//       <TouchableOpacity 
//         onPress={() => setModalVisible(true)} 
//         activeOpacity={0.9} 
//         style={[
//           styles.container, 
//           { bottom: 60 + insets.bottom } 
//         ]}
//       >
//         <View style={styles.progressBarBackground}>
//           <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
//         </View>

//         <View style={styles.content}>
//           <Image source={{ uri: currentSong.coverUrl }} style={styles.image} />
          
//           <View style={styles.textContainer}>
//             <Text style={styles.title} numberOfLines={1}>{currentSong.title}</Text>
//             <Text style={styles.artist} numberOfLines={1}>{currentSong.artist}</Text>
//           </View>

//           <View style={styles.controls}>
//             <TouchableOpacity onPress={(e) => { e.stopPropagation(); togglePlayPause(); }}>
//               <Ionicons name={isPlaying ? "pause" : "play"} size={28} color="#000" />
//             </TouchableOpacity>
            
//             {/* 2. ATTACH playNext HERE */}
//             <TouchableOpacity 
//                 onPress={(e) => { 
//                     e.stopPropagation(); // Stop modal from opening
//                     playNext();          // Play next song
//                 }} 
//                 style={{ marginLeft: 15 }}
//             >
//                <Ionicons name="play-skip-forward" size={24} color="#000" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </TouchableOpacity>

//       <PlayerModal 
//         visible={modalVisible} 
//         onClose={() => setModalVisible(false)} 
//       />
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     left: 0, 
//     right: 0,
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//     borderBottomWidth:1,
//     borderBottomColor:'#eee',
//     height: 60,
//     justifyContent: 'center',
//   },
//   progressBarBackground: { position: 'absolute', top: 0, left: 0, right: 0, height: 2, backgroundColor: '#eee' },
//   progressBarFill: { height: '100%', backgroundColor: '#FF6B00' },
//   content: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 },
//   image: { width: 40, height: 40, borderRadius: 4, backgroundColor: '#eee' },
//   textContainer: { flex: 1, marginLeft: 12, marginRight: 12 },
//   title: { fontSize: 14, fontWeight: 'bold', color: '#000' },
//   artist: { fontSize: 12, color: 'gray' },
//   controls: { flexDirection: 'row', alignItems: 'center' },
// });
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePlayerStore } from '../store/usePlayerStore'; 
import { useThemeStore, Colors } from '../store/useThemeStore'; // <--- Added Theme Store
import PlayerModal from './PlayerModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 

export default function MiniPlayer() {
  const { currentSong, isPlaying, togglePlayPause, position, duration, playNext } = usePlayerStore();
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets(); 
  
  // 1. Get Theme State
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  if (!currentSong) return null;

  const progressPercent = duration > 0 ? (position / duration) * 100 : 0;

  return (
    <>
      <TouchableOpacity 
        onPress={() => setModalVisible(true)} 
        activeOpacity={0.9} 
        style={[
          styles.container, 
          { 
            bottom: 60 + insets.bottom,
            backgroundColor: theme.background, // Dynamic background
            borderTopColor: theme.border,      // Dynamic border
            borderBottomColor: theme.border 
          } 
        ]}
      >
        {/* Progress Bar Background matches theme border */}
        <View style={[styles.progressBarBackground, { backgroundColor: theme.border }]}>
          <View style={[styles.progressBarFill, { width: `${progressPercent}%`, backgroundColor: theme.primary }]} />
        </View>

        <View style={styles.content}>
          <Image source={{ uri: currentSong.coverUrl }} style={styles.image} />
          
          <View style={styles.textContainer}>
            {/* Dynamic Text Colors */}
            <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>{currentSong.title}</Text>
            <Text style={[styles.artist, { color: theme.subText }]} numberOfLines={1}>{currentSong.artist}</Text>
          </View>

          <View style={styles.controls}>
            {/* Play/Pause Button */}
            <TouchableOpacity onPress={(e) => { e.stopPropagation(); togglePlayPause(); }}>
              <Ionicons name={isPlaying ? "pause" : "play"} size={28} color={theme.text} />
            </TouchableOpacity>
            
            {/* Play Next Button */}
            <TouchableOpacity 
                onPress={(e) => { 
                    e.stopPropagation(); 
                    playNext(); 
                }} 
                style={{ marginLeft: 15 }}
            >
               <Ionicons name="play-skip-forward" size={24} color={theme.text} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>

      <PlayerModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0, 
    right: 0,
    height: 60,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  progressBarBackground: { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    height: 2 
  },
  progressBarFill: { 
    height: '100%' 
  },
  content: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 15 
  },
  image: { 
    width: 40, 
    height: 40, 
    borderRadius: 8, // Slightly more rounded as per reference
    backgroundColor: '#eee' 
  },
  textContainer: { 
    flex: 1, 
    marginLeft: 12, 
    marginRight: 12 
  },
  title: { 
    fontSize: 14, 
    fontWeight: 'bold' 
  },
  artist: { 
    fontSize: 12 
  },
  controls: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
});