"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-300);
  const y = useMotionValue(-300);

  const springX = useSpring(x, { stiffness: 80, damping: 25, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 80, damping: 25, mass: 0.5 });

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    },
    [x, y, visible],
  );

  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    if (isTouch) return;

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", () => setVisible(false));
    document.addEventListener("mouseenter", () => setVisible(true));

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", () => setVisible(false));
      document.removeEventListener("mouseenter", () => setVisible(true));
    };
  }, [onMouseMove]);

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[1]"
      aria-hidden
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        width: 300,
        height: 300,
        background:
          "radial-gradient(circle, rgba(34, 211, 238, 0.05) 0%, rgba(34, 211, 238, 0.07) 40%, transparent 70%)",
      }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
    />
  );
}
