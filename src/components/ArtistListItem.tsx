// import React, { memo } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native'; // <--- 1. Import Navigation Hook

// export interface Artist {
//   id: string;
//   name: string;
//   image: string;
//   role: string;
// }

// interface Props {
//   artist: Artist;
//   onOptionPress: () => void;
// }

// const ArtistListItem = ({ artist, onOptionPress }: Props) => {
//   const navigation = useNavigation<any>(); // <--- 2. Get navigation

//   return (
//     // 3. Wrap everything in TouchableOpacity and add onPress
//     <TouchableOpacity 
//       activeOpacity={0.7}
//       onPress={() => navigation.navigate('ArtistDetails', { artist })}
//     >
//       <View style={styles.container}>
//         {/* Circular Image */}
//         <Image source={{ uri: artist.image }} style={styles.avatar} />

//         {/* Text Info */}
//         <View style={styles.infoContainer}>
//           <Text style={styles.name} numberOfLines={1}>
//             {artist.name}
//           </Text>
//           <Text style={styles.subtitle} numberOfLines={1}>
//             {artist.role} 
//           </Text>
//         </View>

//         {/* Three Dots - Needs to handle its own press separately */}
//         <TouchableOpacity style={styles.menuButton} onPress={onOptionPress}>
//           <Ionicons name="ellipsis-vertical" size={20} color="gray" />
//         </TouchableOpacity>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//     height: 60,
//   },
//   avatar: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#eee',
//   },
//   infoContainer: {
//     flex: 1,
//     marginLeft: 16,
//     justifyContent: 'center',
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 4,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: 'gray',
//     fontWeight: '500',
//   },
//   menuButton: {
//     padding: 8,
//   }
// });

// export default memo(ArtistListItem);
import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore, Colors } from '../store/useThemeStore'; // <--- Import Theme Store

export interface Artist {
  id: string;
  name: string;
  image: string;
  role: string;
}

interface Props {
  artist: Artist;
  onOptionPress: () => void;
}

const ArtistListItem = ({ artist, onOptionPress }: Props) => {
  const navigation = useNavigation<any>();
  
  // 1. Access the current theme
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      onPress={() => navigation.navigate('ArtistDetails', { artist })}
    >
      <View style={styles.container}>
        {/* Circular Image with dynamic placeholder background */}
        <Image 
          source={{ uri: artist.image }} 
          style={[styles.avatar, { backgroundColor: theme.card }]} 
        />

        {/* Text Info with themed colors */}
        <View style={styles.infoContainer}>
          <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
            {artist.name}
          </Text>
          <Text style={[styles.subtitle, { color: theme.subText }]} numberOfLines={1}>
            {artist.role} 
          </Text>
        </View>

        {/* Three Dots menu with themed icon color */}
        <TouchableOpacity style={styles.menuButton} onPress={onOptionPress}>
          <Ionicons name="ellipsis-vertical" size={20} color={theme.subText} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    height: 60,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30, // Maintains circular artist look
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  menuButton: {
    padding: 8,
  }
});

export default memo(ArtistListItem);