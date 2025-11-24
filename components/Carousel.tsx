import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface CarouselProps {
  items: CarouselItem[];
  autoplay?: boolean;
  autoplayDelay?: number;
}

const Carousel: React.FC<CarouselProps> = ({ items, autoplay = true, autoplayDelay = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemWidthRef = useRef(0);
  const autoplayIntervalRef = useRef<number | null>(null);

  const goToSlide = useCallback((index: number) => {
    if (trackRef.current) {
      gsap.to(trackRef.current, {
        x: -index * itemWidthRef.current,
        duration: 0.5,
        ease: 'power3.inOut',
      });
    }
  }, []);

  const startAutoplay = useCallback(() => {
    if (!autoplay) return;
    stopAutoplay();
    autoplayIntervalRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoplayDelay);
  }, [autoplay, autoplayDelay, items.length]);

  const stopAutoplay = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !track.parentElement) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        itemWidthRef.current = entry.contentRect.width;
        goToSlide(currentIndex);
      }
    });

    resizeObserver.observe(track.parentElement);

    startAutoplay();

    return () => {
      resizeObserver.disconnect();
      stopAutoplay();
    };
  }, [items.length, startAutoplay, goToSlide, currentIndex]);

  useEffect(() => {
    goToSlide(currentIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div
      className='w-full max-w-sm mx-auto'
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div className='overflow-hidden relative rounded-2xl'>
        <div ref={trackRef} className='flex'>
          {items.map((item, index) => (
            <div key={item.id} className='flex-shrink-0 w-full p-2'>
              <div className='bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center h-full flex flex-col justify-center items-center'>
                <div className='w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6'>
                  {item.icon}
                </div>
                <h3 className='text-xl font-bold font-poppins text-gray-800 mb-3'>{item.title}</h3>
                <p className='text-gray-600'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex justify-center mt-4 space-x-2'>
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              currentIndex === index ? 'bg-red-500' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
