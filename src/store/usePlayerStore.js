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
            audioElement: typeof window !== "undefined" ? new Audio() : null,

            initializeAudio: () => {
                if (typeof window === "undefined") return;
                const audio = get().audioElement;

                audio.addEventListener("timeupdate", () => {
                    set({ progress: audio.currentTime });
                });

                audio.addEventListener("loadedmetadata", () => {
                    set({ duration: audio.duration });
                });

                audio.addEventListener("ended", () => {
                    const store = get();
                    store.handleTrackEnd();
                });
            },

            playTrack: (track) => {
                const state = get();
                const audio = state.audioElement;

                // If we're already playing this track, just toggle play/pause
                if (state.currentTrack?.id === track.id) {
                    if (state.isPlaying) {
                        audio.pause();
                        set({ isPlaying: false });
                    } else {
                        audio.play().catch(console.error);
                        set({ isPlaying: true });
                    }
                    return;
                }

                // Stop current track if any
                if (state.currentTrack) {
                    audio.pause();
                }

                // Set up new track
                audio.src = track.fileUrl;
                audio.volume = state.volume;

                // Add track to queue if it's not already there
                const newQueue = [...state.queue];
                if (!newQueue.find((t) => t.id === track.id)) {
                    newQueue.push(track);
                }

                // Play the new track
                audio
                    .play()
                    .then(() => {
                        set({
                            currentTrack: track,
                            isPlaying: true,
                            queue: newQueue,
                            queueIndex: newQueue.findIndex(
                                (t) => t.id === track.id
                            ),
                        });
                    })
                    .catch((error) => {
                        console.error("Error playing track:", error);
                        set({
                            currentTrack: null,
                            isPlaying: false,
                        });
                    });
            },

            // Add the missing reorderQueue function
            reorderQueue: (sourceIndex, destinationIndex) => {
                set((state) => {
                    const newQueue = [...state.queue];
                    const [removed] = newQueue.splice(sourceIndex, 1);
                    newQueue.splice(destinationIndex, 0, removed);

                    // If shuffle is on, we need to update the shuffled queue too
                    let newShuffledQueue = state.shuffledQueue;
                    if (state.isShuffled) {
                        newShuffledQueue = [...state.shuffledQueue];
                        const [removedShuffled] = newShuffledQueue.splice(
                            sourceIndex,
                            1
                        );
                        newShuffledQueue.splice(
                            destinationIndex,
                            0,
                            removedShuffled
                        );
                    }

                    // Update queue index if necessary
                    let newQueueIndex = state.queueIndex;
                    if (sourceIndex === state.queueIndex) {
                        newQueueIndex = destinationIndex;
                    } else if (
                        sourceIndex < state.queueIndex &&
                        destinationIndex >= state.queueIndex
                    ) {
                        newQueueIndex--;
                    } else if (
                        sourceIndex > state.queueIndex &&
                        destinationIndex <= state.queueIndex
                    ) {
                        newQueueIndex++;
                    }

                    return {
                        queue: newQueue,
                        shuffledQueue: newShuffledQueue,
                        queueIndex: newQueueIndex,
                    };
                });
            },

            removeFromQueue: (trackId) => {
                set((state) => {
                    const queueIndex = state.queue.findIndex(
                        (track) => track.id === trackId
                    );
                    if (queueIndex === -1) return state;

                    const newQueue = state.queue.filter(
                        (track) => track.id !== trackId
                    );

                    let newShuffledQueue = state.shuffledQueue;
                    if (state.isShuffled) {
                        newShuffledQueue = state.shuffledQueue.filter(
                            (track) => track.id !== trackId
                        );
                    }

                    // adjust queue index if necessary
                    let newQueueIndex = state.queueIndex;
                    if (queueIndex < state.queueIndex) {
                        newQueueIndex--;
                    } else if (queueIndex === state.queueIndex) {
                        // if we're removing the current track, play the next one
                        if (newQueue.length > 0) {
                            const nextTrack =
                                newQueue[newQueueIndex] || newQueue[0];
                            get().playTrack(nextTrack);
                        } else {
                            get().cleanup();
                        }
                    }

                    return {
                        queue: newQueue,
                        shuffledQueue: newShuffledQueue,
                        queueIndex: Math.min(
                            newQueueIndex,
                            newQueue.length - 1
                        ),
                    };
                });
            },

            handleTrackEnd: () => {
                const store = get();
                const queue = store.isShuffled
                    ? store.shuffledQueue
                    : store.queue;

                if (store.repeatMode === "ONE") {
                    store.seekTo(0);
                    store.audioElement.play().catch(console.error);
                } else if (
                    store.repeatMode === "ALL" ||
                    store.queueIndex < queue.length - 1
                ) {
                    store.playNext();
                } else {
                    set({ isPlaying: false });
                }
            },

            playTrackAt: (index) => {
                const store = get();
                const queue = store.isShuffled
                    ? store.shuffledQueue
                    : store.queue;
                const track = queue[index];

                if (track) {
                    set({ queueIndex: index });
                    store.playTrack(track);
                }
            },

            togglePlay: () => {
                const store = get();
                const audio = store.audioElement;

                if (audio) {
                    if (store.isPlaying) {
                        audio.pause();
                    } else {
                        audio.play().catch(console.error);
                    }
                    set({ isPlaying: !store.isPlaying });
                }
            },

            playNext: () => {
                const store = get();
                const queue = store.isShuffled
                    ? store.shuffledQueue
                    : store.queue;
                const nextIndex = store.queueIndex + 1;

                if (nextIndex < queue.length) {
                    store.playTrackAt(nextIndex);
                } else if (store.repeatMode === "ALL") {
                    store.playTrackAt(0);
                }

            },

            playPrevious: () => {
                const store = get();
                if (store.progress > 3) {
                    store.seekTo(0);
                } else {
                    const prevIndex = store.queueIndex - 1;
                    if (prevIndex >= 0) {
                        store.playTrackAt(prevIndex);
                    }
                }
            },

            setVolume: (volume) => {
                const store = get();
                if (store.audioElement) {
                    store.audioElement.volume = volume;
                    set({ volume });
                }
            },

            seekTo: (time) => {
                const audio = get().audioElement;
                if (audio) {
                    audio.currentTime = time;
                    set({ progress: time });
                }
            },

            addToQueue: (tracks) => {
                set((state) => ({
                    queue: [
                        ...state.queue,
                        ...(Array.isArray(tracks) ? tracks : [tracks]),
                    ],
                }));
            },

            clearQueue: () => {
                set({ queue: [], queueIndex: 0 });
                const store = get();
                if (store.currentTrack) {
                    set({ queue: [store.currentTrack] });
                }
            },

            toggleShuffle: () => {
                const store = get();
                const newIsShuffled = !store.isShuffled;

                if (newIsShuffled) {
                    // Create shuffled queue
                    const currentTrack = store.queue[store.queueIndex];
                    const remainingTracks = store.queue
                        .filter((_, i) => i !== store.queueIndex)
                        .sort(() => Math.random() - 0.5);

                    set({
                        isShuffled: true,
                        shuffledQueue: [currentTrack, ...remainingTracks],
                        queueIndex: 0,
                    });
                } else {
                    // Restore original queue
                    const currentTrack = store.currentTrack;
                    set({
                        isShuffled: false,
                        queueIndex: store.queue.findIndex(
                            (track) => track.id === currentTrack?.id
                        ),
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
                    store.audioElement.src = "";
                }
                set({
                    currentTrack: null,
                    isPlaying: false,
                    progress: 0,
                    duration: 0,
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
