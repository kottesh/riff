import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePlayerStore = create(
    persist(
        (set, get) => ({
            isPlaying: false,
            currentTrack: null,
            volume: 1,
            progress: 0,
            duration: 0,
            queue: [],
            queueIndex: 0,
            isShuffled: false,
            repeatMode: "OFF", // OFF, ONE, ALL
            shuffledQueue: [],
            isLoading: false,
            audioElement: typeof window !== "undefined" ? new Audio() : null,

            initializeAudio: () => {
                if (typeof window === "undefined") return;
                const audio = get().audioElement;
                if (!audio) return;

                // Clean up existing listeners to prevent memory leaks
                const cleanupListeners = () => {
                    audio.removeEventListener("timeupdate", timeUpdateHandler);
                    audio.removeEventListener(
                        "loadedmetadata",
                        metadataHandler
                    );
                    audio.removeEventListener("ended", endedHandler);
                    audio.removeEventListener("error", errorHandler);
                    audio.removeEventListener("canplaythrough", canPlayHandler);
                };

                // Define handlers
                const timeUpdateHandler = () =>
                    set({ progress: audio.currentTime });
                const metadataHandler = () => set({ duration: audio.duration });
                const endedHandler = () => get().handleTrackEnd();
                const errorHandler = (e) => {
                    console.error("Audio error:", e?.target?.error);
                    set({ isLoading: false, isPlaying: false });
                };
                const canPlayHandler = () => set({ isLoading: false });

                // Clean up and add new listeners
                cleanupListeners();

                audio.addEventListener("timeupdate", timeUpdateHandler);
                audio.addEventListener("loadedmetadata", metadataHandler);
                audio.addEventListener("ended", endedHandler);
                audio.addEventListener("error", errorHandler);
                audio.addEventListener("canplaythrough", canPlayHandler);

                // Preserve volume on initialization
                audio.volume = get().volume;

                return cleanupListeners; // Return cleanup function for component unmount
            },

            handleTrackEnd: async () => {
                const store = get();
                if (!store.audioElement) return;

                try {
                    if (store.repeatMode === "ONE") {
                        store.audioElement.currentTime = 0;
                        await store.audioElement.play();
                        set({ progress: 0 });
                        return;
                    }

                    const queue = store.isShuffled
                        ? store.shuffledQueue
                        : store.queue;
                    const nextIndex = store.queueIndex + 1;

                    if (nextIndex < queue.length) {
                        await store.playTrackAt(nextIndex);
                    } else if (store.repeatMode === "ALL" && queue.length > 0) {
                        await store.playTrackAt(0);
                    } else {
                        store.cleanup();
                    }
                } catch (error) {
                    console.error("Error handling track end:", error);
                    store.cleanup();
                }
            },

            playTrack: async (track) => {
                const store = get();
                const audio = store.audioElement;
                if (!audio || !track?.fileUrl) return;

                try {
                    set({ isLoading: true });

                    // Handle same track toggle
                    if (store.currentTrack?.id === track.id) {
                        if (store.isPlaying) {
                            audio.pause();
                            set({ isPlaying: false, isLoading: false });
                        } else {
                            await audio.play();
                            set({ isPlaying: true, isLoading: false });
                        }
                        return;
                    }

                    // Prepare audio for new track
                    audio.pause();
                    audio.currentTime = 0;
                    audio.src = track.fileUrl;
                    await audio.load();

                    // Update queue management
                    let newQueue = [...store.queue];
                    if (!newQueue.find((t) => t.id === track.id)) {
                        newQueue.push(track);
                    }

                    const newIndex = newQueue.findIndex(
                        (t) => t.id === track.id
                    );

                    // Handle shuffle state
                    let newShuffledQueue = store.shuffledQueue;
                    if (store.isShuffled) {
                        const remainingTracks = newQueue
                            .filter((t) => t.id !== track.id)
                            .sort(() => Math.random() - 0.5);
                        newShuffledQueue = [track, ...remainingTracks];
                    }

                    // Update store state before playing
                    set({
                        currentTrack: track,
                        queue: newQueue,
                        shuffledQueue: newShuffledQueue,
                        queueIndex: newIndex,
                    });

                    // Start playback
                    await audio.play();
                    set({ isPlaying: true, isLoading: false });
                } catch (error) {
                    console.error("Error playing track:", error);
                    store.cleanup();
                }
            },

            playTrackAt: async (index) => {
                const store = get();
                const queue = store.isShuffled
                    ? store.shuffledQueue
                    : store.queue;

                if (index >= 0 && index < queue.length) {
                    try {
                        set({ queueIndex: index });
                        await store.playTrack(queue[index]);
                    } catch (error) {
                        console.error("Error playing track at index:", error);
                        store.cleanup();
                    }
                }
            },

            playNext: async () => {
                const store = get();
                const queue = store.isShuffled
                    ? store.shuffledQueue
                    : store.queue;
                const nextIndex = store.queueIndex + 1;
                const wasPlaying = store.isPlaying;

                try {
                    if (nextIndex < queue.length) {
                        await store.playTrackAt(nextIndex);
                    } else if (store.repeatMode === "ALL" && queue.length > 0) {
                        await store.playTrackAt(0);
                    } else {
                        store.cleanup();
                    }

                    // Restore playing state if needed
                    if (wasPlaying && store.audioElement && !store.isPlaying) {
                        await store.audioElement.play();
                        set({ isPlaying: true });
                    }
                } catch (error) {
                    console.error("Error playing next track:", error);
                    store.cleanup();
                }
            },

            playPrevious: async () => {
                const store = get();
                try {
                    if (store.progress > 3) {
                        store.seekTo(0);
                    } else {
                        const prevIndex = store.queueIndex - 1;
                        if (prevIndex >= 0) {
                            await store.playTrackAt(prevIndex);
                        }
                    }
                } catch (error) {
                    console.error("Error playing previous track:", error);
                    store.cleanup();
                }
            },

            togglePlay: async () => {
                const store = get();
                const audio = store.audioElement;
                if (!audio || !store.currentTrack) return;

                try {
                    if (store.isPlaying) {
                        audio.pause();
                        set({ isPlaying: false });
                    } else {
                        await audio.play();
                        set({ isPlaying: true });
                    }
                } catch (error) {
                    console.error("Error toggling play:", error);
                    store.cleanup();
                }
            },

            setVolume: (volume) => {
                const store = get();
                const normalizedVolume = Math.max(0, Math.min(1, volume));
                if (store.audioElement) {
                    store.audioElement.volume = normalizedVolume;
                    set({ volume: normalizedVolume });
                }
            },

            seekTo: (time) => {
                const store = get();
                const audio = store.audioElement;
                if (audio && time >= 0 && time <= store.duration) {
                    audio.currentTime = time;
                    set({ progress: time });
                }
            },

            addToQueue: (tracks) => {
                const tracksArray = Array.isArray(tracks) ? tracks : [tracks];

                set((state) => {
                    const newQueue = [...state.queue, ...tracksArray];
                    let newShuffledQueue = state.shuffledQueue;

                    if (state.isShuffled) {
                        if (state.currentTrack) {
                            // Maintain current track position in shuffled queue
                            const remainingTracks = newQueue
                                .filter((t) => t.id !== state.currentTrack.id)
                                .sort(() => Math.random() - 0.5);
                            newShuffledQueue = [
                                state.currentTrack,
                                ...remainingTracks,
                            ];
                        } else {
                            newShuffledQueue = [...newQueue].sort(
                                () => Math.random() - 0.5
                            );
                        }
                    }

                    return { queue: newQueue, shuffledQueue: newShuffledQueue };
                });
            },

            removeFromQueue: (trackId) => {
                if (!trackId) return;

                set((state) => {
                    // Find track indices
                    const queueIndex = state.queue.findIndex(
                        (t) => t.id === trackId
                    );
                    if (queueIndex === -1) return state;

                    // Create new queues without the track
                    const newQueue = state.queue.filter(
                        (t) => t.id !== trackId
                    );
                    const newShuffledQueue = state.isShuffled
                        ? state.shuffledQueue.filter((t) => t.id !== trackId)
                        : state.shuffledQueue;

                    // Handle current track removal
                    if (trackId === state.currentTrack?.id) {
                        get().cleanup();
                        if (newQueue.length > 0) {
                            // Try to play next track
                            const nextTrack =
                                newQueue[
                                    Math.min(queueIndex, newQueue.length - 1)
                                ];
                            get().playTrack(nextTrack);
                        }
                    }

                    // Update queue index
                    const newQueueIndex =
                        queueIndex < state.queueIndex
                            ? Math.max(0, state.queueIndex - 1)
                            : Math.min(state.queueIndex, newQueue.length - 1);

                    return {
                        queue: newQueue,
                        shuffledQueue: newShuffledQueue,
                        queueIndex: newQueueIndex,
                    };
                });
            },

            toggleShuffle: () => {
                const store = get();
                const newIsShuffled = !store.isShuffled;

                if (newIsShuffled) {
                    // Enable shuffle
                    const currentTrack = store.currentTrack;
                    const remainingTracks = store.queue
                        .filter((track) => track.id !== currentTrack?.id)
                        .sort(() => Math.random() - 0.5);

                    set({
                        isShuffled: true,
                        shuffledQueue: currentTrack
                            ? [currentTrack, ...remainingTracks]
                            : remainingTracks,
                        queueIndex: currentTrack ? 0 : store.queueIndex,
                    });
                } else {
                    // Disable shuffle
                    const currentTrack = store.currentTrack;
                    if (!currentTrack) {
                        set({ isShuffled: false });
                        return;
                    }

                    const newIndex = store.queue.findIndex(
                        (track) => track.id === currentTrack.id
                    );

                    set({
                        isShuffled: false,
                        queueIndex: Math.max(0, newIndex),
                    });
                }
            },

            toggleRepeatMode: () => {
                const modes = ["OFF", "ONE", "ALL"];
                const currentIndex = modes.indexOf(get().repeatMode);
                const nextIndex = (currentIndex + 1) % modes.length;
                set({ repeatMode: modes[nextIndex] });
            },

            cleanup: () => {
                const store = get();
                if (store.audioElement) {
                    store.audioElement.pause();
                    store.audioElement.currentTime = 0;
                    store.audioElement.src = "";
                }
                set({
                    isPlaying: false,
                    isLoading: false,
                    progress: 0,
                    duration: 0,
                });
            },

            clearQueue: () => {
                const store = get();
                store.cleanup();
                set({
                    queue: [],
                    shuffledQueue: [],
                    queueIndex: 0,
                    currentTrack: null,
                    isPlaying: false,
                });
            },
        }),
        {
            name: "player-storage",
            partialize: (state) => ({
                volume: state.volume,
                isShuffled: state.isShuffled,
                repeatMode: state.repeatMode,
            }),
        }
    )
);

export default usePlayerStore;
