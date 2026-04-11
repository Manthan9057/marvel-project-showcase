import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let stars: Star[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 2500);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 3 + 0.5,
        size: Math.random() * 2 + 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      }));
    };

    const drawNebula = (time: number) => {
      // Subtle nebula glow centers
      const nebulae = [
        { cx: canvas.width * 0.3, cy: canvas.height * 0.25, r: 300, h: 260, s: 60, l: 15 },
        { cx: canvas.width * 0.7, cy: canvas.height * 0.6, r: 250, h: 280, s: 50, l: 12 },
        { cx: canvas.width * 0.5, cy: canvas.height * 0.8, r: 200, h: 220, s: 40, l: 10 },
      ];

      for (const n of nebulae) {
        const drift = Math.sin(time * 0.0003 + n.h) * 20;
        const grad = ctx.createRadialGradient(
          n.cx + drift, n.cy, 0,
          n.cx + drift, n.cy, n.r
        );
        grad.addColorStop(0, `hsla(${n.h}, ${n.s}%, ${n.l}%, 0.08)`);
        grad.addColorStop(0.5, `hsla(${n.h}, ${n.s}%, ${n.l}%, 0.03)`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Nebula layers
      drawNebula(time);

      // Stars
      for (const star of stars) {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const alpha = star.opacity + twinkle * 0.3;
        if (alpha <= 0) continue;

        // Slow drift
        const dx = Math.sin(time * 0.00005 * star.z + star.twinkleOffset) * 15;
        const dy = Math.cos(time * 0.00003 * star.z + star.twinkleOffset) * 10;

        const sx = star.x + dx;
        const sy = star.y + dy;

        ctx.beginPath();
        ctx.arc(sx, sy, star.size * star.z * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 210, 255, ${Math.min(alpha, 1)})`;
        ctx.fill();

        // Glow for brighter stars
        if (star.size > 1.5 && alpha > 0.5) {
          const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, star.size * 3);
          glow.addColorStop(0, `rgba(180, 200, 255, ${alpha * 0.15})`);
          glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow;
          ctx.fillRect(sx - star.size * 3, sy - star.size * 3, star.size * 6, star.size * 6);
        }
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    animId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
