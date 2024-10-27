import React, { useState, useEffect, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { ListMusic, X, Trash2 } from "lucide-react";
import usePlayerStore from "../../store/use-player-store";

const QUEUE_STATES = {
    EXPANDED_WIDTH: "w-80",
    COLLAPSED_WIDTH: "w-20",
    TRANSITION_DURATION: "duration-200",
};

const TrackImage = ({ src, alt, className }) => {
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={(e) => {
                e.target.src = "/placeholder-music.png";
            }}
        />
    );
};

const MusicBars = React.memo(() => (
    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="flex gap-0.5">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className={`w-0.5 h-3 bg-white animate-music-bar-${i}`}
                />
            ))}
        </div>
    </div>
));

MusicBars.displayName = "MusicBars";

const QueueItem = React.memo(
    ({
        track,
        index,
        isDraggable = true,
        isDragging,
        onRemove,
        onPlay,
        currentTrackId,
    }) => {
        const handlePlay = useCallback(() => {
            if (!isDragging && isDraggable) {
                onPlay(index);
            }
        }, [isDragging, isDraggable, onPlay, index]);

        const handleRemove = useCallback(
            (e) => {
                e.stopPropagation(); // Prevent play trigger when removing
                if (!isDragging) {
                    onRemove(track.id);
                }
            },
            [isDragging, onRemove, track.id]
        );

        const itemContent = (
            <div
                className={`group flex items-center gap-3 px-4 py-2
        transition-all duration-200 ease-in-out
        ${!isDraggable ? "bg-purple-900/30" : "hover:bg-gray-800/50"}
        ${isDragging ? "opacity-90" : ""}`}
                onClick={handlePlay}
            >
                <div className="relative rounded-md overflow-hidden">
                    <TrackImage
                        src={track.coverUrl}
                        alt={track.title}
                        className="h-12 w-12 object-cover"
                    />
                    {currentTrackId === track.id && <MusicBars />}
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className="text-left font-bold text-white text-sm truncate">
                        {track.title}
                    </h4>
                    <p className="text-left text-sm text-gray-400 truncate">
                        {track.artists?.map((a) => a.name).join(", ")}
                    </p>
                </div>

                {isDraggable && (
                    <button
                        onClick={handleRemove}
                        className={`p-1 text-gray-400 hover:text-white
            transition-all duration-200 transform
            hover:scale-110 active:scale-95
            ${isDragging ? "opacity-0" : "opacity-0 group-hover:opacity-100"}`}
                        disabled={isDragging}
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
        );

        if (!isDraggable) return itemContent;

        return (
            <Draggable draggableId={`queue-${track.id}`} index={index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={snapshot.isDragging ? "bg-gray-800/50" : ""}
                    >
                        {itemContent}
                    </div>
                )}
            </Draggable>
        );
    }
);

QueueItem.displayName = "QueueItem";

const CollapsedQueue = React.memo(({ tracks, currentTrackId, onPlay }) => (
    <div className="absolute inset-0 flex flex-col items-center gap-2 pt-16">
        {tracks.map((track, index) => (
            <div
                key={track.id}
                className="relative rounded-md overflow-hidden scroll hover:scale-110
          transition-transform duration-200 cursor-pointer"
                onClick={() => onPlay(index)}
            >
                <TrackImage
                    src={track.coverUrl}
                    alt={track.title}
                    className="h-12 w-12 object-cover"
                />
                {currentTrackId === track.id && <MusicBars />}
            </div>
        ))}
    </div>
));

CollapsedQueue.displayName = "CollapsedQueue";

const Queue = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const {
        queue,
        shuffledQueue,
        isShuffled,
        currentTrack,
        playTrackAt,
        removeFromQueue,
        reorderQueue,
        clearQueue,
        initializeAudio,
    } = usePlayerStore();

    const displayQueue = isShuffled ? shuffledQueue : queue;
    const currentTrackInQueue = displayQueue.find(
        (track) => track.id === currentTrack?.id
    );
    const remainingQueue = displayQueue
        .filter((track) => track.id !== currentTrack?.id)
        .reverse();

    const handleDragStart = useCallback(() => {
        setIsDragging(true);
    }, []);

    const handleDragEnd = useCallback(
        (result) => {
            setIsDragging(false);
            if (!result.destination) return;
            const newIndex =
                remainingQueue.length - 1 - result.destination.index;
            const oldIndex = remainingQueue.length - 1 - result.source.index;
            reorderQueue(oldIndex, newIndex);
        },
        [remainingQueue.length, reorderQueue]
    );

    useEffect(() => {
        initializeAudio();
    }, [initializeAudio]);

    return (
        <div
            className={`fixed right-0 top-0 h-[calc(100vh-6rem)] transition-all ${
                QUEUE_STATES.TRANSITION_DURATION
            } ease-in-out 
        ${
            isExpanded
                ? QUEUE_STATES.EXPANDED_WIDTH
                : QUEUE_STATES.COLLAPSED_WIDTH
        } 
        bg-gray-900/95 backdrop-blur-sm border-l border-gray-800`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <div className="h-full flex flex-col">
                <div className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <ListMusic className="w-5 h-5 text-purple-500" />
                        <span
                            className={`text-white text-sm font-medium transition-opacity duration-200 
                ${isExpanded ? "opacity-100" : "opacity-0"}`}
                        >
                            Queue
                        </span>
                    </div>
                    {isExpanded && queue.length > 0 && !isDragging && (
                        <button
                            onClick={clearQueue}
                            className="text-gray-400 hover:text-white transition-colors duration-200
                hover:scale-110 active:scale-95 transform flex items-center gap-2"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span className="text-sm">Clear</span>
                        </button>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {currentTrackInQueue && (
                        <div className="border-y border-gray-800">
                            <QueueItem
                                track={currentTrackInQueue}
                                index={0}
                                isDraggable={false}
                                isDragging={isDragging}
                                onRemove={removeFromQueue}
                                onPlay={playTrackAt}
                                currentTrackId={currentTrack?.id}
                            />
                        </div>
                    )}

                    {isExpanded ? (
                        <DragDropContext
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                        >
                            <Droppable droppableId="queue">
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <div className="transform translate-x-0 opacity-100 transition-all duration-300 ease-in-out">
                                            {remainingQueue.length === 0 &&
                                            !currentTrackInQueue ? (
                                                <div className="flex items-center justify-center h-full p-4">
                                                    <p className="text-gray-400 text-sm">
                                                        Queue is empty
                                                    </p>
                                                </div>
                                            ) : (
                                                <div>
                                                    {remainingQueue.map(
                                                        (track, index) => (
                                                            <QueueItem
                                                                key={`queue-${track.id}`}
                                                                track={track}
                                                                index={index}
                                                                isDragging={
                                                                    isDragging
                                                                }
                                                                onRemove={
                                                                    removeFromQueue
                                                                }
                                                                onPlay={
                                                                    playTrackAt
                                                                }
                                                                currentTrackId={
                                                                    currentTrack?.id
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            )}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    ) : (
                        <CollapsedQueue
                            tracks={[
                                currentTrackInQueue,
                                ...remainingQueue,
                            ].filter(Boolean)}
                            currentTrackId={currentTrack?.id}
                            onPlay={playTrackAt}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Queue;
