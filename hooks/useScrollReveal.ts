
import { useEffect, useRef, RefObject } from 'react';

type Options = {
  threshold?: number;
  rootMargin?: string;
};

export const useScrollReveal = <T extends HTMLElement,>(options?: Options): RefObject<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          currentRef.classList.remove('opacity-0', 'translate-y-10');
          currentRef.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(currentRef);
        }
      },
      {
        threshold: options?.threshold || 0.1,
        rootMargin: options?.rootMargin || '0px',
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return ref;
};
