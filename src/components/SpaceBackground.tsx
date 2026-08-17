"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  life: number;
  maxLife: number;
};

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    let rafId = 0;
    let lastShot = 0;
    let running = true;

    const STAR_DENSITY = 0.00012; // stars per px^2

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(width * height * STAR_DENSITY);
      stars = Array.from({ length: count }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.2 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      }));
    }

    function spawnShootingStar() {
      const startX = Math.random() * width * 0.6 + width * 0.2;
      const startY = Math.random() * height * 0.25;
      const angle = (Math.random() * 20 + 25) * (Math.PI / 180); // 25–45 degrees
      const speed = Math.random() * 6 + 8;
      shootingStars.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: Math.random() * 70 + 60,
        life: 0,
        maxLife: Math.random() * 40 + 40,
      });
    }

    function draw(time: number) {
      if (!running) return;
      ctx!.clearRect(0, 0, width, height);

      // static twinkling stars
      for (const s of stars) {
        const alpha =
          s.baseAlpha + Math.sin(time * s.twinkleSpeed + s.twinklePhase) * 0.25;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(243, 244, 246, ${Math.max(0, Math.min(1, alpha))})`;
        ctx!.fill();
      }

      // shooting stars
      if (time - lastShot > 3200 + Math.random() * 4000) {
        lastShot = time;
        if (shootingStars.length < 2) spawnShootingStar();
      }

      shootingStars = shootingStars.filter((star) => star.life < star.maxLife);
      for (const star of shootingStars) {
        star.x += star.vx;
        star.y += star.vy;
        star.life += 1;

        const progress = star.life / star.maxLife;
        const fade = progress < 0.15 ? progress / 0.15 : 1 - (progress - 0.15) / 0.85;
        const tailX = star.x - Math.cos(Math.atan2(star.vy, star.vx)) * star.len;
        const tailY = star.y - Math.sin(Math.atan2(star.vy, star.vx)) * star.len;

        const gradient = ctx!.createLinearGradient(star.x, star.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${0.9 * fade})`);
        gradient.addColorStop(0.4, `rgba(147, 179, 255, ${0.4 * fade})`);
        gradient.addColorStop(1, "rgba(37, 99, 235, 0)");

        ctx!.strokeStyle = gradient;
        ctx!.lineWidth = 1.6;
        ctx!.lineCap = "round";
        ctx!.beginPath();
        ctx!.moveTo(star.x, star.y);
        ctx!.lineTo(tailX, tailY);
        ctx!.stroke();
      }

      rafId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      // Draw a single static frame, no animation loop.
      draw(0);
      running = false;
    } else {
      rafId = requestAnimationFrame(draw);
    }

    const onVisibility = () => {
      running = document.visibilityState === "visible" && !reduced;
      if (running) rafId = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
    />
  );
}
