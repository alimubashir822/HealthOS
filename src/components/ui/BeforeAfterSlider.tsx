'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before Treatment',
  afterLabel = 'After Recovery',
  caption
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div 
        ref={containerRef}
        className="relative aspect-video w-full select-none overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 shadow-xl cursor-ew-resize"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* Before Image (Background) */}
        <img 
          src={beforeImage} 
          alt="Before" 
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <div className="absolute bottom-4 left-4 rounded-lg bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
          {beforeLabel}
        </div>

        {/* After Image (Clipped Foreground) */}
        <div 
          className="absolute inset-0 h-full overflow-hidden"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img 
            src={afterImage} 
            alt="After" 
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
          <div className="absolute bottom-4 right-4 rounded-lg bg-teal-500/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
            {afterLabel}
          </div>
        </div>

        {/* Slider Handle Line */}
        <div 
          className="absolute bottom-0 top-0 w-1 bg-white shadow-lg cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Slider Drag Indicator Button */}
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-teal-500 text-white shadow-xl hover:scale-110 active:scale-95 transition-all">
            <div className="flex items-center gap-0.5">
              <ChevronLeft className="w-4 h-4 shrink-0" />
              <ChevronRight className="w-4 h-4 shrink-0" />
            </div>
          </div>
        </div>
      </div>
      {caption && (
        <p className="mt-3 text-center text-xs italic text-slate-500 dark:text-slate-400">
          {caption}
        </p>
      )}
    </div>
  );
}
