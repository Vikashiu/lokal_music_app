
// import React from 'react';
// import { View, Text, StyleSheet, Modal, Image, TouchableOpacity, Dimensions } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import Slider from '@react-native-community/slider';
// import { useNavigation } from '@react-navigation/native'; // <--- 1. Import Navigation
// import { usePlayerStore } from '../store/usePlayerStore';

// interface Props {
//   visible: boolean;
//   onClose: () => void;
// }

// const { width } = Dimensions.get('window');

// export default function PlayerModal({ visible, onClose }: Props) {
//   const navigation = useNavigation<any>(); // <--- 2. Get Navigation Hook
//   const { currentSong, isPlaying, togglePlayPause, duration, position, seek, playNext, playPrevious } = usePlayerStore();

//   if (!currentSong) return null;

//   const formatTime = (millis: number) => {
//     const totalSeconds = Math.floor(millis / 1000);
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = totalSeconds % 60;
//     return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
//   };

//   return (
//     <Modal animationType="slide" visible={visible} presentationStyle="pageSheet">
//       <View style={styles.container}>
        
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={onClose} style={styles.headerButton}>
//             <Ionicons name="chevron-down" size={30} color="#000" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Now Playing</Text>
//           <TouchableOpacity style={styles.headerButton}>
//             <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
//           </TouchableOpacity>
//         </View>

//         {/* ... (Your Album Art & Info Code remains unchanged) ... */}
//         <View style={styles.artContainer}>
//           <View style={styles.shadowWrapper}>
//              <Image source={{ uri: currentSong.coverUrl }} style={styles.art} />
//           </View>
//         </View>

//         <View style={styles.infoContainer}>
//           <View>
//             <Text style={styles.title} numberOfLines={1}>{currentSong.title}</Text>
//             <Text style={styles.artist} numberOfLines={1}>{currentSong.artist}</Text>
//           </View>
//           <TouchableOpacity>
//              <Ionicons name="heart-outline" size={28} color="#000" />
//           </TouchableOpacity>
//         </View>

//         {/* Slider Section */}
//         <View style={styles.progressContainer}>
//           <Slider
//             style={{ width: '100%', height: 40 }}
//             minimumValue={0}
//             maximumValue={duration}
//             value={position}
//             onSlidingComplete={seek}
//             minimumTrackTintColor="#FF6B00"
//             maximumTrackTintColor="#f0f0f0"
//             thumbTintColor="#FF6B00"
//           />
//           <View style={styles.timeRow}>
//             <Text style={styles.timeText}>{formatTime(position)}</Text>
//             <Text style={styles.timeText}>{formatTime(duration)}</Text>
//           </View>
//         </View>

//         {/* Playback Controls */}
//         <View style={styles.controls}>
//           <TouchableOpacity>
//             <Ionicons name="shuffle" size={24} color="#ccc" />
//           </TouchableOpacity>

//           <TouchableOpacity onPress={playPrevious}>
//             <Ionicons name="play-skip-back" size={35} color="#000" />
//           </TouchableOpacity>

//           <TouchableOpacity onPress={togglePlayPause} style={styles.playButton}>
//             <Ionicons 
//               name={isPlaying ? "pause" : "play"} 
//               size={32} 
//               color="#fff" 
//               style={{ marginLeft: isPlaying ? 0 : 4 }}
//             />
//           </TouchableOpacity>

//           <TouchableOpacity onPress={playNext}>
//             <Ionicons name="play-skip-forward" size={35} color="#000" />
//           </TouchableOpacity>

//           <TouchableOpacity>
//             <Ionicons name="repeat" size={24} color="#ccc" />
//           </TouchableOpacity>
//         </View>

//         {/* --- 3. UPDATED BOTTOM ROW --- */}
//         <View style={styles.bottomRow}>
//            <TouchableOpacity style={styles.bottomIcon}>
//               <Ionicons name="timer-outline" size={24} color="#000" />
//            </TouchableOpacity>
           
//            {/* THIS IS THE BUTTON YOU WANTED */}
//            <TouchableOpacity 
//               style={styles.bottomIcon} 
//               onPress={() => {
//                 onClose(); // Close the player first so you can see the queue
//                 navigation.navigate('Queue');
//               }}
//            >
//               <Ionicons name="list" size={24} color="#000" />
//            </TouchableOpacity>
//         </View>

//       </View>
//     </Modal>
//   );
// }

// // ... (Your styles remain unchanged)
// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     backgroundColor: '#fff', 
//     paddingHorizontal: 15, 
//     paddingTop: 20,
//     paddingBottom: 40,
//     justifyContent: 'space-between' 
//   },
//   header: { 
//     flexDirection: 'row', 
//     justifyContent: 'space-between', 
//     alignItems: 'center',
//     marginBottom: 20,
//     paddingHorizontal: 10 
//   },
//   headerTitle: { fontSize: 16, fontWeight: '600', color: 'gray', textTransform: 'uppercase', letterSpacing: 1 },
//   headerButton: { padding: 8 },
//   artContainer: { 
//     alignItems: 'center', 
//     justifyContent: 'center',
//     flex: 1, 
//     maxHeight: width - 50,
//   },
//   shadowWrapper: {
//     shadowColor: '#FF6B00',
//     shadowOffset: { width: 0, height: 15 },
//     shadowOpacity: 0.25,
//     shadowRadius: 20,
//     elevation: 20,
//     borderRadius: 20,
//   },
//   art: { width: width - 60, height: width - 60, borderRadius: 20 },
//   infoContainer: { 
//     flexDirection: 'row', 
//     justifyContent: 'space-between', 
//     alignItems: 'center', 
//     marginBottom: 20,
//     marginTop: 20,
//     paddingHorizontal: 10 
//   },
//   title: { fontSize: 24, fontWeight: 'bold', color: '#000', marginBottom: 4, maxWidth: width - 100 },
//   artist: { fontSize: 16, color: 'gray', fontWeight: '500' },
//   progressContainer: { 
//     width: '100%', 
//     marginBottom: 20,
//   },
//   timeRow: { 
//     flexDirection: 'row', 
//     justifyContent: 'space-between', 
//     paddingHorizontal: 5, 
//     marginTop: 5
//   },
//   timeText: { fontSize: 12, color: 'gray', fontWeight: '600' },
//   controls: { 
//     flexDirection: 'row', 
//     justifyContent: 'space-between', 
//     alignItems: 'center', 
//     marginBottom: 30,
//     paddingHorizontal: 10
//   },
//   playButton: { 
//     width: 75, height: 75, borderRadius: 40, backgroundColor: '#FF6B00',
//     justifyContent: 'center', alignItems: 'center', 
//     shadowColor: '#FF6B00', shadowOpacity: 0.4, shadowRadius: 10, elevation: 8
//   },
//   bottomRow: { flexDirection: 'row', justifyContent: 'center', gap: 40 },
//   bottomIcon: { padding: 10 }
// });

import React from 'react';
import { View, Text, StyleSheet, Modal, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { usePlayerStore } from '../store/usePlayerStore';
import { useThemeStore, Colors } from '../store/useThemeStore'; // <--- Import Theme Store

interface Props {
  visible: boolean;
  onClose: () => void;
}

const { width } = Dimensions.get('window');

export default function PlayerModal({ visible, onClose }: Props) {
  const navigation = useNavigation<any>();
  const { currentSong, isPlaying, togglePlayPause, duration, position, seek, playNext, playPrevious } = usePlayerStore();
  
  // 1. Access the current theme
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  if (!currentSong) return null;

  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <Modal animationType="slide" visible={visible} presentationStyle="fullScreen">
      {/* 2. Container background dynamically matches theme */}
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        
        {/* Header with dynamic text/icon colors */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.headerButton}>
            <Ionicons name="chevron-down" size={30} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.subText }]}>Now Playing</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="ellipsis-horizontal" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* Artwork matches Starboy layout with large radius */}
        <View style={styles.artContainer}>
          <View style={[styles.shadowWrapper, isDarkMode && { shadowOpacity: 0 }]}>
             <Image source={{ uri: currentSong.coverUrl }} style={styles.art} />
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoContainer}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>{currentSong.title}</Text>
            <Text style={[styles.artist, { color: theme.subText }]} numberOfLines={1}>{currentSong.artist}</Text>
          </View>
          <TouchableOpacity>
             <Ionicons name="heart-outline" size={28} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* Slider Section */}
        <View style={styles.progressContainer}>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            onSlidingComplete={seek}
            minimumTrackTintColor={theme.primary}
            maximumTrackTintColor={theme.border}
            thumbTintColor={theme.primary}
          />
          <View style={styles.timeRow}>
            <Text style={[styles.timeText, { color: theme.subText }]}>{formatTime(position)}</Text>
            <Text style={[styles.timeText, { color: theme.subText }]}>{formatTime(duration)}</Text>
          </View>
        </View>

        {/* Playback Controls with signature Play Button */}
        <View style={styles.controls}>
          <TouchableOpacity>
            <Ionicons name="shuffle" size={24} color={theme.subText} />
          </TouchableOpacity>

          <TouchableOpacity onPress={playPrevious}>
            <Ionicons name="play-skip-back" size={35} color={theme.text} />
          </TouchableOpacity>

          <TouchableOpacity onPress={togglePlayPause} style={[styles.playButton, { backgroundColor: theme.primary }]}>
            <Ionicons 
              name={isPlaying ? "pause" : "play"} 
              size={32} 
              color="#fff" 
              style={{ marginLeft: isPlaying ? 0 : 4 }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={playNext}>
            <Ionicons name="play-skip-forward" size={35} color={theme.text} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name="repeat" size={24} color={theme.subText} />
          </TouchableOpacity>
        </View>

        {/* Bottom Row Navigation */}
        <View style={styles.bottomRow}>
           <TouchableOpacity style={styles.bottomIcon}>
              <Ionicons name="timer-outline" size={24} color={theme.text} />
           </TouchableOpacity>
           
           <TouchableOpacity 
              style={styles.bottomIcon} 
              onPress={() => {
                onClose();
                navigation.navigate('Queue');
              }}
           >
              <Ionicons name="list" size={24} color={theme.text} />
           </TouchableOpacity>
        </View>

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingHorizontal: 20, 
    paddingTop: 20,
    paddingBottom: 40,
    justifyContent: 'space-between' 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: { fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  headerButton: { padding: 8 },
  artContainer: { 
    alignItems: 'center', 
    justifyContent: 'center',
    flex: 1, 
    maxHeight: width - 40,
  },
  shadowWrapper: {
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 20,
    borderRadius: 32,
  },
  art: { width: width - 60, height: width - 60, borderRadius: 32 },
  infoContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginVertical: 20,
    paddingHorizontal: 10 
  },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 4 },
  artist: { fontSize: 18, fontWeight: '500' },
  progressContainer: { 
    width: '100%', 
    marginBottom: 20,
  },
  timeRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 5, 
    marginTop: 5
  },
  timeText: { fontSize: 12, fontWeight: '600' },
  controls: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 30,
    paddingHorizontal: 10
  },
  playButton: { 
    width: 75, height: 75, borderRadius: 40,
    justifyContent: 'center', alignItems: 'center', 
    shadowColor: '#FF6B00', shadowOpacity: 0.4, shadowRadius: 10, elevation: 8
  },
  bottomRow: { flexDirection: 'row', justifyContent: 'center', gap: 60 },
  bottomIcon: { padding: 10 }
});