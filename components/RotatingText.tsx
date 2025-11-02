import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface RotatingTextProps {
    texts: string[];
    rotationInterval?: number;
    mainClassName?: string;
}

const RotatingText: React.FC<RotatingTextProps> = ({ texts, rotationInterval = 3000, mainClassName = '' }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (texts.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % texts.length);
        }, rotationInterval);
        return () => clearInterval(interval);
    }, [texts.length, rotationInterval]);

    useGSAP(() => {
        if (!containerRef.current) return;
        const chars = gsap.utils.toArray('.rotating-char', containerRef.current);
        
        gsap.fromTo(chars, 
            { yPercent: 100, opacity: 0 },
            { 
                yPercent: 0,
                opacity: 1,
                duration: 0.4,
                stagger: 0.03,
                ease: 'power2.out'
            }
        );

    }, { dependencies: [currentIndex], scope: containerRef });

    const currentText = texts[currentIndex] || '';
    
    return (
        <span ref={containerRef} className={`inline-block ${mainClassName}`} aria-live="polite" aria-atomic="true">
            <span className="inline-flex overflow-hidden" style={{ verticalAlign: 'baseline' }}>
                {currentText.split('').map((char, index) => (
                    <span key={`${currentIndex}-${index}`} className="rotating-char inline-block" style={{ willChange: 'transform, opacity' }}>
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
            </span>
        </span>
    );
};

export default RotatingText;