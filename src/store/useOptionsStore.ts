import { create } from 'zustand';
import { Song } from '../components/SongListItem';

interface OptionsState {
  visible: boolean;
  song: Song | null;
  openOptions: (song: Song) => void;
  closeOptions: () => void;
}

export const useOptionsStore = create<OptionsState>((set) => ({
  visible: false,
  song: null,
  openOptions: (song) => set({ visible: true, song }),
  closeOptions: () => set({ visible: false, song: null }),
}));