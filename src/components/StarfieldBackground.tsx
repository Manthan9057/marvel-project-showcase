import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  speed: number;
  trail: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
  life: number;
  maxLife: number;
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
    let particles: Particle[] = [];
    let cx = 0;
    let cy = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cx = canvas.width / 2;
      cy = canvas.height / 2;
      initStars();
    };

    const initStars = () => {
      const count = 400;
      stars = Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * canvas.width * 2,
        y: (Math.random() - 0.5) * canvas.height * 2,
        z: Math.random() * 1500 + 1,
        speed: Math.random() * 2 + 1,
        trail: Math.random() * 0.4 + 0.1,
      }));
    };

    // Spawn dust particles
    const spawnParticle = () => {
      if (particles.length > 60) return;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 40 + 20,
        opacity: Math.random() * 0.04 + 0.01,
        hue: Math.random() > 0.5 ? 260 : 210,
        life: 0,
        maxLife: Math.random() * 600 + 300,
      });
    };

    const draw = (time: number) => {
      // Fade trail instead of full clear — gives motion blur
      ctx.fillStyle = "rgba(5, 5, 15, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Cosmic dust particles (nebula clouds)
      if (Math.random() < 0.05) spawnParticle();
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        const lifeRatio = p.life / p.maxLife;
        const fadeIn = Math.min(lifeRatio * 5, 1);
        const fadeOut = Math.max(1 - (lifeRatio - 0.7) / 0.3, 0);
        const alpha = p.opacity * fadeIn * (lifeRatio > 0.7 ? fadeOut : 1);

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0, `hsla(${p.hue}, 60%, 30%, ${alpha})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);

        if (p.life >= p.maxLife) particles.splice(i, 1);
      }

      // Warp-speed stars flowing toward camera
      for (const star of stars) {
        const prevZ = star.z;
        star.z -= star.speed * 3;

        if (star.z <= 1) {
          star.z = 1500;
          star.x = (Math.random() - 0.5) * canvas.width * 2;
          star.y = (Math.random() - 0.5) * canvas.height * 2;
          continue;
        }

        const sx = (star.x / star.z) * 300 + cx;
        const sy = (star.y / star.z) * 300 + cy;
        const psx = (star.x / prevZ) * 300 + cx;
        const psy = (star.y / prevZ) * 300 + cy;

        // Star brightness based on depth
        const brightness = 1 - star.z / 1500;
        const alpha = brightness * 0.9;
        const radius = brightness * 1.8 + 0.3;

        // Draw trail line
        ctx.beginPath();
        ctx.moveTo(psx, psy);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = `rgba(180, 200, 255, ${alpha * star.trail})`;
        ctx.lineWidth = radius * 0.6;
        ctx.stroke();

        // Draw star point
        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 230, 255, ${alpha})`;
        ctx.fill();

        // Glow for close stars
        if (brightness > 0.7) {
          const glowGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, radius * 4);
          glowGrad.addColorStop(0, `rgba(150, 180, 255, ${(brightness - 0.7) * 0.3})`);
          glowGrad.addColorStop(1, "transparent");
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(sx, sy, radius * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    // Initial full clear
    ctx.fillStyle = "rgb(5, 5, 15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
