# 🎶 Music Player Application

A feature-rich **mobile music player** developed using **React Native (Expo)** and **TypeScript**.  
The application consumes real music data from the **JioSaavn public API** and focuses on delivering a smooth listening experience with modern UI, persistent playback, and advanced state handling.

---

## 📦 App Overview

This app allows users to explore music, manage playlists, control playback, and enjoy uninterrupted audio even when the app runs in the background.  
It is designed with scalability, maintainability, and real-world usage in mind.

---

## 📲 Download

- **Android APK:** _(link to be added)_

---

## 🚀 Key Capabilities

### Home Experience
- Displays recently interacted tracks
- Highlights popular artists with visual cards
- Shows frequently played songs
- Category-based tabs for songs, artists, and albums
- Auto-loading content while scrolling
- Expandable sections using quick actions

---

### Search System
- Unified search for songs, artists, and albums
- Instant result updates while typing
- Tab-based filtering
- Pagination for large result sets
- Saved recent search history
- Friendly empty-state messages

---

### Music Playback
- Full-screen player with detailed artwork
- Interactive progress slider
- Playback actions:
  - Play / Pause
  - Next / Previous
  - Skip forward / backward
- Displays current and total duration
- Shuffle and repeat controls
- Queue access and management
- Add tracks to playlists or favorites

---

### Mini Player
- Fixed player visible across the app
- Reflects real-time playback state
- Tap-to-expand full player
- Playback progress indicator
- Quick play/pause access
- Displays current track details

---

### Playback Queue
- Displays upcoming tracks
- Add songs from anywhere in the app
- Remove tracks with confirmation
- Reorder tracks using controls
- Persistent queue across app restarts
- Automatically starts playback when queue is ready

---

### Background Audio
- Music continues outside the app
- Lock-screen playback support
- Android foreground service enabled
- Background audio mode configured for iOS

---

## 🌟 Additional Functionality

<!-- ### Shuffle & Repeat
- Randomized playback option
- Repeat modes:
  - Disabled
  - Repeat all
  - Repeat one
- Visual indicators for active modes -->

<!-- --- -->

### Data Persistence
- Playback queue
- Favorite tracks
- User playlists
- Theme preference
- Search history  
(All stored locally)

---

### Theme Support
- Light and dark appearance modes
- User preference saved automatically
- All UI components respond to theme changes
- Toggle available in Settings

---

### Playlists
- Create custom playlists
- Add or remove tracks
- View playlist details
- Play or shuffle entire playlists

---

### Favorites
- Mark songs as favorites
- Dedicated favorites screen
- Persistent favorite list
- Visual feedback for liked tracks

---

### Artist & Album Views
- Artist profiles with songs and albums
- Album track listings
- Load-more support for large lists
- Play-all and shuffle options

---

### Navigation
- Bottom tab navigation:
  - Home
  - Favorites
  - Playlists
  - Settings
- Stack navigation for detail screens
- Smooth native transitions
- Proper back navigation handling

---

## 🧰 Technology Stack

- **Framework:** React Native (Expo)
- **Language:** TypeScript
- **Navigation:** React Navigation (Stack + Tabs)
- **State Management:** Zustand
- **Local Storage:** AsyncStorage
- **Audio Engine:** expo-av
- **Networking:** Axios
- **Icons:** Expo Vector Icons
- **Safe Area Handling:** react-native-safe-area-context

---

## 📁 Folder Organization

MUSIC-APP-MAI   
├── assets/ # App icons, images   
├── src/  
│ ├── components/             # Reusable UI components   
│ │ ├── AlbumListItem.tsx   
│ │ ├── ArtistListItem.tsx   
│ │ ├── SongListItem.tsx   
│ │ ├── MiniPlayer.tsx     
│ │ ├── PlayerModal.tsx   
│ │ ├── SongOptionsModal.tsx   
│ │ ├── ArtistOptionModal.tsx   
│ │ └── GlobalOptionsHandler.tsx   
│ │
│ ├── navigation/ # App navigation setup   
│ │ ├── BottomTabs.tsx  
│ │ ├── HomeStack.tsx   
│ │ └── PlaylistStack.tsx   
│ │     
│ ├── screens/ # Application screens    
│ │ ├── HomeScreen.tsx  
│ │ ├── SearchScreen.tsx    
│ │ ├── PlayerScreen.tsx    
│ │ ├── QueueScreen.tsx    
│ │ ├── FavoritesScreen.tsx    
│ │ ├── PlaylistsScreen.tsx    
│ │ ├── PlaylistDetailScreen.tsx    
│ │ ├── AlbumDetailsScreen.tsx  
│ │ ├── ArtistDetailsScreen.tsx            
│ │ └── SettingsScreen.tsx      
│ │         
│ ├── services/ # API & audio logic    
│ ├── store/ # Global state management      
│ │    
│ └── tabs/ # Home screen tabs    
│ ├── SuggestedTab.tsx    
│ ├── SongTab.tsx    
│ ├── ArtistTab.tsx    
│ └── AlbumsTab.tsx    
│
├── App.tsx # Root component    
├── app.json # Expo configuration   
├── index.ts # Entry point    
├── package.json    
├── tsconfig.json    
└── readme.md


---

## ⚡ Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Expo CLI
- Android Studio / Xcode (optional)
- Expo Go (recommended for testing)

---

### Installation

```bash
npm install
```

## ▶️ Running the Development Server
```
expo start
```

### You can launch the app in multiple ways:

Open the project on a physical device by scanning the QR code with Expo Go

Press a to run on an Android emulator

Press i to launch the iOS simulator (macOS only)

Press w to open in a web browser (audio features may be limited)

## 🧠 Application Architecture

### Architectural Characteristics

- UI built using reusable, self-contained components

- Centralized playback and app state management

- Mini Player and Full Player share a common state source

- User actions handled through modal-based option components

- Navigation logic kept independent from UI components

- Common list components reused for songs, artists, and albums

### 💾 Data Persistence

- To ensure a seamless user experience, the application stores key data locally, including:

- Current playback queue

- Favorite songs

- User-created playlists

- Playback status and state

This allows the app to restore the user’s session after closing or restarting.

### ⚠ Current Limitations

- Music downloads for offline use are not available

- Lyrics are not displayed

- Queue reordering is button-based rather than drag-and-drop

- Audio quality is selected automatically without manual control

### 🚧 Planned Enhancements

- Full offline playback support

- Song lyrics integration

- Built-in audio equalizer

- Sleep timer functionality

- Drag-and-drop queue reordering

- Cloud-based data synchronization

- Production-ready iOS build

👤 Author

Developed using React Native, Expo, and TypeScript, with a focus on clean architecture, modular design, and real-world usability.