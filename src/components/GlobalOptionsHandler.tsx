import React from 'react';
import { useOptionsStore } from '../store/useOptionsStore';
import SongOptionsModal from './SongOptionsModal';

export default function GlobalOptionsHandler() {
  const visible = useOptionsStore((state) => state.visible);
  const song = useOptionsStore((state) => state.song);
  const closeOptions = useOptionsStore((state) => state.closeOptions);

  return (
    <SongOptionsModal 
      visible={visible} 
      song={song} 
      onClose={closeOptions} 
    />
  );
}