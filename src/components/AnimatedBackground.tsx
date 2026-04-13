import { useEffect, useRef, useState } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const stars: Star[] = [];
    const STAR_COUNT = 300;
    const SPEED = 0.5;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: (Math.random() - 0.5) * canvas.width * 2,
        y: (Math.random() - 0.5) * canvas.height * 2,
        z: Math.random() * canvas.width,
        px: 0,
        py: 0,
      });
    }

    // Blobs
    const blobs = Array.from({ length: 4 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 150 + Math.random() * 200,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      hue: 220 + Math.random() * 80,
    }));

    const animate = () => {
      ctx.fillStyle = "rgba(10, 10, 25, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw gradient blobs
      for (const blob of blobs) {
        blob.x += blob.vx;
        blob.y += blob.vy;
        if (blob.x < -blob.r || blob.x > canvas.width + blob.r) blob.vx *= -1;
        if (blob.y < -blob.r || blob.y > canvas.height + blob.r) blob.vy *= -1;

        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r);
        gradient.addColorStop(0, `hsla(${blob.hue}, 70%, 50%, 0.06)`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(blob.x - blob.r, blob.y - blob.r, blob.r * 2, blob.r * 2);
      }

      // Draw flowing stars
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      for (const star of stars) {
        star.z -= SPEED;
        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * canvas.width * 2;
          star.y = (Math.random() - 0.5) * canvas.height * 2;
          star.z = canvas.width;
          star.px = cx + (star.x / star.z) * canvas.width;
          star.py = cy + (star.y / star.z) * canvas.height;
        }

        const sx = cx + (star.x / star.z) * canvas.width;
        const sy = cy + (star.y / star.z) * canvas.height;
        const size = Math.max(0, (1 - star.z / canvas.width) * 2.5);
        const opacity = Math.max(0, (1 - star.z / canvas.width) * 0.8);

        ctx.beginPath();
        ctx.moveTo(star.px, star.py);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = `rgba(140, 160, 255, ${opacity * 0.3})`;
        ctx.lineWidth = size * 0.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 200, 255, ${opacity})`;
        ctx.fill();

        star.px = sx;
        star.py = sy;
      }

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
