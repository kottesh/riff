import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = ({ children, title }) => {
    const carouselRef = useRef(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(false);
    const [hasOverflow, setHasOverflow] = useState(false);

    // Check for overflow and update button visibility
    const checkOverflow = () => {
        const container = carouselRef.current;
        if (container) {
            const hasHorizontalOverflow =
                container.scrollWidth > container.clientWidth;
            setHasOverflow(hasHorizontalOverflow);
            setShowRightButton(hasHorizontalOverflow);
            setShowLeftButton(container.scrollLeft > 0);
        }
    };

    // Initial check for overflow
    useEffect(() => {
        checkOverflow();
        window.addEventListener("resize", checkOverflow);
        return () => window.removeEventListener("resize", checkOverflow);
    }, [children]);

    const scroll = (direction) => {
        const container = carouselRef.current;
        const scrollAmount =
            direction === "left"
                ? -container.offsetWidth
                : container.offsetWidth;
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    const handleScroll = () => {
        const container = carouselRef.current;
        if (container) {
            setShowLeftButton(container.scrollLeft > 0);
            setShowRightButton(
                container.scrollLeft <
                    container.scrollWidth - container.offsetWidth - 1
            );
        }
    };

    return (
        <div className="relative group">
            <h2 className="text-white text-left text-2xl font-bold mb-6">
                {title}
            </h2>
            <div className="relative">
                {hasOverflow && showLeftButton && (
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 p-2 rounded-full
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200
                            hover:scale-110 transform shadow-xl"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                )}
                <div
                    ref={carouselRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto scrollbar-hide scroll-smooth gap-4 pb-4"
                >
                    {children}
                </div>
                {hasOverflow && showRightButton && (
                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 p-2 rounded-full
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200
                            hover:scale-110 transform shadow-xl"
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Carousel;
