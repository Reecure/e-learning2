import {useEffect, useRef, useState} from "react";

interface IntersectionObserverOptions {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
}

export const useInfiniteScroll = (
    options: IntersectionObserverOptions
): [React.RefObject<HTMLDivElement>, boolean] => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const callbackFunc: IntersectionObserverCallback = (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunc, options);
        if (containerRef.current) observer.observe(containerRef.current);

        return () => {
            if (containerRef.current) observer.unobserve(containerRef.current);
        };
    }, [containerRef, options]);

    return [containerRef, isVisible];
};