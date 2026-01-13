
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio as AudioAV } from 'expo-av';
import * as Audio from 'expo-audio'; //
import { Song } from '../components/SongListItem';

interface PlayerState {
    currentSong: Song | null;
    isPlaying: boolean;
    queue: Song[];
    currentIndex: number;
    duration: number;
    position: number;

    setupAudioMode: () => Promise<void>;
    playSong: (song: Song, newQueue?: Song[]) => void;
    playNext: () => void;
    playPrevious: () => void;
    togglePlayPause: () => void;
    seek: (position: number) => void;
    addToQueue: (song: Song) => void;
    removeFromQueue: (songId: string) => void;
    reorderQueue: (newOrder: Song[]) => void;
    clearQueue: () => void;
}

let globalPlayer: any = null;
let playbackListener: any = null;

export const usePlayerStore = create<PlayerState>()(
    persist(
        (set, get) => ({
            currentSong: null,
            isPlaying: false,
            queue: [],
            currentIndex: -1,
            duration: 0,
            position: 0,

            // setupAudioMode: async () => { console.log("Audio initialized"); },
            setupAudioMode: async () => {
                try {
                    await AudioAV.setAudioModeAsync({
                        staysActiveInBackground: true, // <--- Key for Background Audio
                        playsInSilentModeIOS: true,    // <--- Key for iOS Silent Switch
                        shouldDuckAndroid: true,
                        playThroughEarpieceAndroid: false,
                    });
                    console.log("Audio initialized");
                    console.log("Background Audio Mode Enabled");
                } catch (e) {
                    console.error("Audio Mode Setup Failed:", e);
                }
            },
            playSong: (song, newQueue) => {
                // 1. Determine Queue and Index
                const currentQueue = newQueue || get().queue;
                const songIndex = currentQueue.findIndex(s => s.id === song.id);

                // 2. Clean up old resources
                if (playbackListener) playbackListener.remove();
                if (globalPlayer) {
                    globalPlayer.pause();
                    if (globalPlayer.release) globalPlayer.release();
                }

                // 3. Create Player (Safe for SDK 54)
                try {
                    globalPlayer = Audio.createAudioPlayer(song.audioUrl);
                } catch (e) {
                    console.error("Player Error:", e);
                    return;
                }

                // // 4. Attach Listener with Buffering Safety
                // playbackListener = globalPlayer.addListener('playbackStatusUpdate', (status: any) => {
                //   set({
                //     position: (status.currentTime || 0) * 1000,
                //     duration: (status.duration || 0) * 1000,
                //     // Only update isPlaying from listener if it's NOT loading/buffering
                //     // This prevents the button from flickering back to "Play"
                //     isPlaying: status.isPlaying 
                //   });

                //   if (status.didJustFinish) {
                //     get().playNext();
                //   }
                // });
                playbackListener = globalPlayer.addListener('playbackStatusUpdate', (status: any) => {
                    set({
                        position: (status.currentTime || 0) * 1000,
                        duration: (status.duration || 0) * 1000,
                        // Removed isPlaying from here to prevent flickering
                    });

                    if (status.didJustFinish) {
                        // Manually set isPlaying to false if you want, or just play next
                        set({ isPlaying: false });
                        get().playNext();
                    }
                });
                // 5. Start Playing
                globalPlayer.play();

                // 6. Force UI Update Immediately
                set({
                    currentSong: song,
                    isPlaying: true, // Force "Pause" icon immediately
                    queue: currentQueue,
                    currentIndex: songIndex
                });
            },

            togglePlayPause: () => {
                const { isPlaying, currentSong, queue } = get();

                if (!globalPlayer) {
                    if (currentSong) get().playSong(currentSong, queue);
                    return;
                }

                // Force UI update immediately for responsiveness
                if (isPlaying) {
                    globalPlayer.pause();
                    set({ isPlaying: false });
                } else {
                    globalPlayer.play();
                    set({ isPlaying: true });
                }
            },

            playNext: () => {
                const { queue, currentIndex, currentSong } = get();

                // Safety: If index is lost (-1), try to find current song again
                let actualIndex = currentIndex;
                if (actualIndex === -1 && currentSong) {
                    actualIndex = queue.findIndex(s => s.id === currentSong.id);
                }

                if (actualIndex < queue.length - 1) {
                    get().playSong(queue[actualIndex + 1]);
                }
            },

            playPrevious: () => {
                const { queue, currentIndex, position } = get();
                if (position > 3000) {
                    if (globalPlayer) globalPlayer.seekTo(0);
                    return;
                }
                if (currentIndex > 0) {
                    get().playSong(queue[currentIndex - 1]);
                }
            },

            seek: (pos) => { if (globalPlayer) globalPlayer.seekTo(pos / 1000); },

            addToQueue: (song) => {
                const { queue } = get();
                if (!queue.find(s => s.id === song.id)) set({ queue: [...queue, song] });
            },

            removeFromQueue: (songId) => {
                const { queue } = get();
                set({ queue: queue.filter(s => s.id !== songId) });
            },

            reorderQueue: (newOrder) => set({ queue: newOrder }),
            clearQueue: () => {
                set({
                    queue: [],
                    currentSong: null,
                    currentIndex: -1,
                    isPlaying: false
                });
                if (globalPlayer) globalPlayer.stop();
            }
        }),
        {
            name: 'player-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                queue: state.queue,
                currentSong: state.currentSong,
                currentIndex: state.currentIndex
            }),
        }
    )
);