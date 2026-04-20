'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  colorIndex: number;
}

// Richer, more visible dot colors — mostly warm stone with indigo/violet accents
const DOT_COLORS = [
  '99, 91, 200',   // indigo
  '99, 91, 200',   // indigo (weighted)
  '139, 92, 246',  // violet
  '120, 113, 108', // stone
  '120, 113, 108', // stone (weighted)
  '120, 113, 108', // stone (weighted)
  '168, 162, 158', // stone-light
];

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const COUNT = 90;
    particlesRef.current = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 2 + 1,
      colorIndex: Math.floor(Math.random() * DOT_COLORS.length),
    }));

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    const LINE_DIST = 130;
    const PUSH_DIST = 160;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < PUSH_DIST && dist > 0) {
          const force = (PUSH_DIST - dist) / PUSH_DIST;
          p.vx += (dx / dist) * force * 0.18;
          p.vy += (dy / dist) * force * 0.18;
        }

        p.vx *= 0.97;
        p.vy *= 0.97;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.4) {
          p.vx = (p.vx / speed) * 1.4;
          p.vy = (p.vy / speed) * 1.4;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const col = DOT_COLORS[p.colorIndex];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col}, 0.75)`;
        ctx.fill();
      }

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINE_DIST) {
            const alpha = (1 - d / LINE_DIST) * 0.35;
            // Blend color between the two particles
            const ci = particles[i].colorIndex;
            const cj = particles[j].colorIndex;
            const col = ci === cj ? DOT_COLORS[ci] : DOT_COLORS[ci];
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${col}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
