import React, { useState, useEffect, useCallback } from "react";
import "./PhotoCarousel.css";
import { filmPhotos } from "../data/filmPhotos";

export default function PhotoCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    // Auto-rotation every 5 seconds (pause when expanded)
    useEffect(() => {
        if (isExpanded) return; // Don't rotate when viewing expanded

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === filmPhotos.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [isExpanded]);

    const goToPrevious = () => {
        setCurrentIndex(currentIndex === 0 ? filmPhotos.length - 1 : currentIndex - 1);
    };

    const goToNext = () => {
        setCurrentIndex(currentIndex === filmPhotos.length - 1 ? 0 : currentIndex + 1);
    };

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape') setIsExpanded(false);
        if (e.key === 'ArrowLeft') goToPrevious();
        if (e.key === 'ArrowRight') goToNext();
    }, [currentIndex]);

    const handleWheel = useCallback((e) => {
        e.preventDefault();
        if (e.deltaY > 0) {
            goToNext();
        } else if (e.deltaY < 0) {
            goToPrevious();
        }
    }, [currentIndex]);

    useEffect(() => {
        if (isExpanded) {
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('wheel', handleWheel, { passive: false });
            document.body.style.overflow = 'hidden'; // Prevent background scroll
            return () => {
                document.removeEventListener('keydown', handleKeyDown);
                document.removeEventListener('wheel', handleWheel);
                document.body.style.overflow = 'unset';
            };
        }
    }, [isExpanded, handleKeyDown, handleWheel]);

    return (
        <div className="photoCarousel">
            <div className="filmStrip">
                {/* Sprocket holes - top */}
                <div className="sprockets sprocketsTop">
                    {[...Array(16)].map((_, i) => (
                        <div key={i} className="sprocket"></div>
                    ))}
                </div>

                {/* Photo frame */}
                <div className="photoFrame" onClick={toggleExpanded} style={{cursor: 'pointer'}} title="Click to expand">
                    <img
                        src={filmPhotos[currentIndex].src}
                        alt={`Frame ${currentIndex + 1}`}
                        className="photo"
                        onError={(e) => {
                            // Fallback to a placeholder if image doesn't exist
                            e.target.src = "https://via.placeholder.com/400x300/404d31/e5f0c6?text=Film+Photo+" + (currentIndex + 1);
                        }}
                    />

                    {/* Expand hint */}
                    <div className="expandHint">Click to expand</div>

                    {/* Navigation arrows */}
                    <button className="navButton navPrev" onClick={(e) => { e.stopPropagation(); goToPrevious(); }}>
                        ‹
                    </button>
                    <button className="navButton navNext" onClick={(e) => { e.stopPropagation(); goToNext(); }}>
                        ›
                    </button>
                </div>

                {/* Sprocket holes - bottom */}
                <div className="sprockets sprocketsBottom">
                    {[...Array(16)].map((_, i) => (
                        <div key={i} className="sprocket"></div>
                    ))}
                </div>

                {/* Film frame counter */}
                <div className="frameCounter">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(filmPhotos.length).padStart(2, '0')}
                </div>
            </div>

            {/* Expanded Modal/Lightbox */}
            {isExpanded && (
                <div className="modalOverlay" onClick={toggleExpanded}>
                    <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                        <button className="modalClose" onClick={toggleExpanded}>×</button>

                        <div className="modalFilmStrip">
                            {/* Sprocket holes - top */}
                            <div className="sprockets sprocketsTop">
                                {[...Array(20)].map((_, i) => (
                                    <div key={i} className="sprocket"></div>
                                ))}
                            </div>

                            <div className="modalPhotoFrame">
                                <img
                                    src={filmPhotos[currentIndex].src}
                                    alt={`Frame ${currentIndex + 1}`}
                                    className="modalPhoto"
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/800x600/404d31/e5f0c6?text=Film+Photo+" + (currentIndex + 1);
                                    }}
                                />

                                {/* Navigation in modal */}
                                <button className="modalNavButton modalNavPrev" onClick={goToPrevious}>
                                    ‹
                                </button>
                                <button className="modalNavButton modalNavNext" onClick={goToNext}>
                                    ›
                                </button>
                            </div>

                            {/* Sprocket holes - bottom */}
                            <div className="sprockets sprocketsBottom">
                                {[...Array(20)].map((_, i) => (
                                    <div key={i} className="sprocket"></div>
                                ))}
                            </div>

                            {/* Frame counter in modal */}
                            <div className="frameCounter">
                                {String(currentIndex + 1).padStart(2, '0')} / {String(filmPhotos.length).padStart(2, '0')}
                            </div>
                        </div>

                        {/* Photo description - only show if not empty */}
                        {filmPhotos[currentIndex].description && (
                            <div className="photoDescription">
                                <p>{filmPhotos[currentIndex].description}</p>
                            </div>
                        )}

                        {/* Bottom navigation */}
                        <div className="modalBottomNav">
                            <button className="modalBottomButton" onClick={goToPrevious}>
                                ← Prev
                            </button>
                            <button className="modalBottomButton" onClick={goToNext}>
                                Next →
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
