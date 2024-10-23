import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import usePlayerStore from "../../store/usePlayerStore";
import { Music3, X } from "lucide-react";

const Queue = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const {
        queue,
        shuffledQueue,
        isShuffled,
        currentTrack,
        playTrackAt,
        removeFromQueue,
        reorderQueue,
        clearQueue,
    } = usePlayerStore();

    const displayQueue = isShuffled ? shuffledQueue : queue;

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        reorderQueue(result.source.index, result.destination.index);
    };

    useEffect(() => {
        const audio = document.querySelector("audio");
        const handleEnded = () => {
            if (queue.length === 1) {
                clearQueue();
            }
        };

        audio?.addEventListener("ended", handleEnded);
        return () => audio?.removeEventListener("ended", handleEnded);
    }, [queue, clearQueue]);

    return (
        <div
            className={`fixed right-0 top-0 h-[calc(100vh-6rem)] transition-all duration-300 ${
                isExpanded ? "w-72" : "w-16"
            } bg-gray-900 border-l border-gray-800 shadow-lg`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <div className="p-3 border-b border-gray-800 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Music3 className="w-5 h-5 text-purple-500" />
                    {isExpanded && (
                        <span className="text-white text-sm font-medium">
                            Queue
                        </span>
                    )}
                </div>
                {isExpanded && queue.length > 0 && (
                    <button
                        onClick={clearQueue}
                        className="text-gray-400 hover:text-white"
                        title="Clear queue"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="queue">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="h-[calc(100%-48px)] overflow-y-auto"
                        >
                            <div
                                className={`transform transition-transform duration-300 ${
                                    isExpanded
                                        ? "translate-x-0"
                                        : "translate-x-full"
                                }`}
                            >
                                {displayQueue.length === 0 ? (
                                    <div className="flex items-center justify-center h-full">
                                        <p className="text-gray-400 text-sm">
                                            Queue is empty
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        {displayQueue.map((track, index) => (
                                            <Draggable
                                                key={`${track.id}-${index}`}
                                                draggableId={`${track.id}-${index}`}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`flex items-center gap-2 p-2 ${
                                                            snapshot.isDragging
                                                                ? "bg-gray-800"
                                                                : "hover:bg-gray-800"
                                                        } ${
                                                            currentTrack?.id ===
                                                            track.id
                                                                ? "bg-purple-900 bg-opacity-50"
                                                                : ""
                                                        }`}
                                                    >
                                                        <div className="relative">
                                                            <img
                                                                src={
                                                                    track.coverUrl
                                                                }
                                                                alt={
                                                                    track.title
                                                                }
                                                                className="h-10 w-10 rounded object-cover"
                                                                onError={(
                                                                    e
                                                                ) => {
                                                                    e.target.src =
                                                                        "/placeholder-music.png";
                                                                }}
                                                            />
                                                            {currentTrack?.id ===
                                                                track.id && (
                                                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded">
                                                                    <div className="flex gap-0.5">
                                                                        <div className="w-0.5 h-3 bg-white animate-music-bar-1" />
                                                                        <div className="w-0.5 h-3 bg-white animate-music-bar-2" />
                                                                        <div className="w-0.5 h-3 bg-white animate-music-bar-3" />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div
                                                            className="flex-1 min-w-0 cursor-pointer"
                                                            onClick={() =>
                                                                playTrackAt(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            <h4 className="font-medium text-white text-sm truncate">
                                                                {track.title}
                                                            </h4>
                                                            <p className="text-xs text-gray-400 truncate">
                                                                {track.artists
                                                                    ?.map(
                                                                        (a) =>
                                                                            a.name
                                                                    )
                                                                    .join(", ")}
                                                            </p>
                                                        </div>

                                                        <button
                                                            onClick={() =>
                                                                removeFromQueue(
                                                                    track.id
                                                                )
                                                            }
                                                            className="p-1 text-gray-400 hover:text-white"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    </div>
                                )}
                                {provided.placeholder}
                            </div>

                            {!isExpanded && (
                                <div className="absolute inset-0 flex flex-col items-center gap-2 p-2">
                                    {displayQueue.map((track, index) => (
                                        <div
                                            key={`${track.id}-${index}`}
                                            className="relative"
                                        >
                                            <img
                                                src={track.coverUrl}
                                                alt={track.title}
                                                className="h-10 w-10 rounded object-cover"
                                                onError={(e) => {
                                                    e.target.src =
                                                        "/placeholder-music.png";
                                                }}
                                            />
                                            {currentTrack?.id === track.id && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded">
                                                    <div className="flex gap-0.5">
                                                        <div className="w-0.5 h-3 bg-white animate-music-bar-1" />
                                                        <div className="w-0.5 h-3 bg-white animate-music-bar-2" />
                                                        <div className="w-0.5 h-3 bg-white animate-music-bar-3" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default Queue;
