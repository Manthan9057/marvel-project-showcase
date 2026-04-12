import { useEffect, useRef } from "react";

interface Wave {
  y: number;
  amplitude: number;
  frequency: number;
  speed: number;
  color: string;
  phase: number;
}

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
}

interface LightRay {
  x: number;
  width: number;
  opacity: number;
  speed: number;
  angle: number;
}

export default function OceanBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let waves: Wave[] = [];
    let bubbles: Bubble[] = [];
    let lightRays: LightRay[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
      initElements();
    };

    const initElements = () => {
      const h = canvas.height;

      waves = [
        { y: h * 0.08, amplitude: 25, frequency: 0.008, speed: 0.015, color: "rgba(6, 78, 112, 0.12)", phase: 0 },
        { y: h * 0.15, amplitude: 35, frequency: 0.006, speed: 0.012, color: "rgba(8, 105, 145, 0.10)", phase: 2 },
        { y: h * 0.25, amplitude: 20, frequency: 0.01, speed: 0.02, color: "rgba(14, 130, 165, 0.08)", phase: 4 },
        { y: h * 0.4, amplitude: 30, frequency: 0.005, speed: 0.008, color: "rgba(10, 90, 130, 0.06)", phase: 1 },
        { y: h * 0.6, amplitude: 15, frequency: 0.012, speed: 0.018, color: "rgba(6, 60, 100, 0.05)", phase: 3 },
      ];

      bubbles = Array.from({ length: 40 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 4 + 1,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.3 + 0.05,
        wobble: 0,
        wobbleSpeed: Math.random() * 0.02 + 0.01,
      }));

      lightRays = Array.from({ length: 6 }, (_, i) => ({
        x: (canvas.width / 6) * i + Math.random() * 100,
        width: Math.random() * 80 + 40,
        opacity: Math.random() * 0.04 + 0.01,
        speed: Math.random() * 0.3 + 0.1,
        angle: Math.random() * 0.15 - 0.075,
      }));
    };

    let time = 0;
    const draw = () => {
      time += 1;

      // Deep ocean gradient
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, "#030d1a");
      grad.addColorStop(0.3, "#041e33");
      grad.addColorStop(0.6, "#052a45");
      grad.addColorStop(1, "#031525");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Light rays from surface
      for (const ray of lightRays) {
        const sway = Math.sin(time * 0.005 + ray.x * 0.01) * 30;
        ctx.save();
        ctx.globalAlpha = ray.opacity + Math.sin(time * 0.008) * 0.01;
        const rayGrad = ctx.createLinearGradient(ray.x + sway, 0, ray.x + sway + ray.width, canvas.height * 0.7);
        rayGrad.addColorStop(0, "rgba(80, 180, 220, 0.08)");
        rayGrad.addColorStop(0.5, "rgba(40, 120, 180, 0.03)");
        rayGrad.addColorStop(1, "transparent");
        ctx.fillStyle = rayGrad;
        ctx.beginPath();
        ctx.moveTo(ray.x + sway - ray.width / 2, 0);
        ctx.lineTo(ray.x + sway + ray.width * 1.5, canvas.height * 0.7);
        ctx.lineTo(ray.x + sway - ray.width * 0.5, canvas.height * 0.7);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // Waves
      for (const wave of waves) {
        wave.phase += wave.speed;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        for (let x = 0; x <= canvas.width; x += 3) {
          const y = wave.y + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude
            + Math.sin(x * wave.frequency * 0.5 + wave.phase * 0.7) * wave.amplitude * 0.5;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();
      }

      // Bubbles
      for (const bubble of bubbles) {
        bubble.y -= bubble.speed;
        bubble.wobble += bubble.wobbleSpeed;
        const wx = bubble.x + Math.sin(bubble.wobble) * 15;

        if (bubble.y < -20) {
          bubble.y = canvas.height + 20;
          bubble.x = Math.random() * canvas.width;
        }

        // Bubble glow
        const g = ctx.createRadialGradient(wx, bubble.y, 0, wx, bubble.y, bubble.radius * 3);
        g.addColorStop(0, `rgba(100, 200, 255, ${bubble.opacity * 0.5})`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(wx, bubble.y, bubble.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Bubble body
        ctx.beginPath();
        ctx.arc(wx, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(140, 210, 255, ${bubble.opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Highlight
        ctx.beginPath();
        ctx.arc(wx - bubble.radius * 0.3, bubble.y - bubble.radius * 0.3, bubble.radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 240, 255, ${bubble.opacity * 0.6})`;
        ctx.fill();
      }

      // Floating particles (plankton)
      for (let i = 0; i < 50; i++) {
        const px = (Math.sin(time * 0.003 + i * 1.7) * 0.5 + 0.5) * canvas.width;
        const py = (Math.cos(time * 0.002 + i * 2.3) * 0.5 + 0.5) * canvas.height;
        const pAlpha = 0.1 + Math.sin(time * 0.01 + i) * 0.05;
        ctx.fillStyle = `rgba(120, 200, 230, ${pAlpha})`;
        ctx.beginPath();
        ctx.arc(px, py, 1.2, 0, Math.PI * 2);
        ctx.fill();
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
