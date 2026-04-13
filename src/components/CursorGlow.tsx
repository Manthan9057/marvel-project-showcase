import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-50 h-[300px] w-[300px] rounded-full opacity-20 blur-[80px]"
      style={{
        background: "radial-gradient(circle, hsl(var(--primary)) 0%, hsl(var(--accent)) 40%, transparent 70%)",
      }}
      animate={{ x: pos.x - 150, y: pos.y - 150 }}
      transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.5 }}
    />
  );
}
