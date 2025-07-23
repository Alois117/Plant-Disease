// src/components/CustomCursor.tsx
import { useEffect, useRef, useState } from "react";

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const dot = dotRef.current;
      const ring = ringRef.current;

      if (dot && ring) {
        dot.style.left = `${clientX}px`;
        dot.style.top = `${clientY}px`;
        ring.style.left = `${clientX}px`;
        ring.style.top = `${clientY}px`;
      }
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, label")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleHover);
    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <>
      {/* Inner green dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-green-600 rounded-full pointer-events-none z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2"
      ></div>

      {/* Outer ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-10 h-10 border-2 border-green-600 rounded-full pointer-events-none z-[9998] transition-all duration-95 transform -translate-x-1/2 -translate-y-1/2 ${
          isHovering ? "scale-125 opacity-80" : "opacity-50"
        }`}
      ></div>
    </>
  );
}

export default CustomCursor;