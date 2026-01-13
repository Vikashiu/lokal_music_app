import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Song } from '../components/SongListItem';

export interface Playlist {
  id: string;
  name: string;
  songs: Song[];
  createdAt: number;
}

interface PlaylistState {
  playlists: Playlist[];
  createPlaylist: (name: string) => void;
  deletePlaylist: (id: string) => void;
  addSongToPlaylist: (playlistId: string, song: Song) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;
}

export const usePlaylistStore = create<PlaylistState>()(
  persist(
    (set, get) => ({
      playlists: [],

      createPlaylist: (name) => {
        const newPlaylist: Playlist = {
          id: Date.now().toString(), // Simple unique ID
          name,
          songs: [],
          createdAt: Date.now(),
        };
        set({ playlists: [newPlaylist, ...get().playlists] });
      },

      deletePlaylist: (id) => {
        set({ playlists: get().playlists.filter((p) => p.id !== id) });
      },

      addSongToPlaylist: (playlistId, song) => {
        const { playlists } = get();
        const updated = playlists.map((p) => {
          if (p.id === playlistId) {
             // Check if song already exists to prevent duplicates
             if (p.songs.find(s => s.id === song.id)) return p;
             return { ...p, songs: [...p.songs, song] };
          }
          return p;
        });
        set({ playlists: updated });
      },

      removeSongFromPlaylist: (playlistId, songId) => {
         const { playlists } = get();
         const updated = playlists.map((p) => {
          if (p.id === playlistId) {
             return { ...p, songs: p.songs.filter(s => s.id !== songId) };
          }
          return p;
        });
        set({ playlists: updated });
      }
    }),
    {
      name: 'playlist-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);