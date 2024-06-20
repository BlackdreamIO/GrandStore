import { useState, useEffect, MutableRefObject } from 'react';

interface IntersectionObserverOptions extends IntersectionObserverInit {}

const useIntersectionObserver = ( ref: MutableRefObject<Element | null>, options: IntersectionObserverOptions ): boolean => {
    const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
    const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setEntry(entry);
        }, options)

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        }
    }, [ref, options])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (entry) {
                setIsIntersecting(entry.isIntersecting);
            }
        }, 100)// debounce delay MS

        return () => {
            clearTimeout(timeoutId);
        }
    }, [entry]);

  return isIntersecting;
};

export default useIntersectionObserver;
