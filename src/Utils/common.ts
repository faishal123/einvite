import { useEffect, useRef, useState } from "react";

export function useWindowSize() {
  const isClient = typeof window === "object";
  const [windowSize, setWindowSize] = useState({
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined,
  });

  function handleResize() {
    setWindowSize({
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    });
  }

  useEffect(() => {
    if (!isClient) {
      console.error("no client");
    } else {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [isClient]);

  return windowSize;
}

export function useMobile() {
  return (useWindowSize()?.width || 0) <= 480;
}

export function useTablet() {
  return (useWindowSize()?.width || 0) <= 600;
}

export function useCustomScreenSize(size: number) {
  return (useWindowSize()?.width || 0) <= size;
}

export const useCheckOverflow = <T>() => {
  const elRef = useRef<HTMLElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (elRef.current) {
      var curOverflow = elRef.current.style.overflow;
      if (!curOverflow || curOverflow === "visible")
        elRef.current.style.overflow = "hidden";
      var isOverflowing =
        elRef.current.clientWidth < elRef.current.scrollWidth ||
        elRef.current.clientHeight < elRef.current.scrollHeight;
      elRef.current.style.overflow = curOverflow;
      setIsOverflowing(isOverflowing);
    }
  }, [elRef]);

  const newRef = elRef as React.RefObject<T>;

  return { ref: newRef, isOverflowing };
};
