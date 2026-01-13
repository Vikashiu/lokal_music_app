import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// FIX: Renamed 'image' to 'coverUrl' to match the Player and SongListItem
interface Song {
  id: string;
  title: string;
  artist: string;
  coverUrl: string; 
  audioUrl: string;
  duration: number;
}

interface FavoritesState {
  favorites: Song[];
  toggleFavorite: (song: Song) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (song) => {
        const { favorites } = get();
        const exists = favorites.some((f) => f.id === song.id);

        if (exists) {
          set({ favorites: favorites.filter((f) => f.id !== song.id) });
        } else {
          set({ favorites: [song, ...favorites] });
        }
      },

      isFavorite: (id) => {
        return get().favorites.some((f) => f.id === id);
      },

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);