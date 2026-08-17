"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { profile } from "@/lib/data";

const GREETINGS = ["HELLO", "नमस्ते", "કેમ છો"];

export default function Preloader() {
  const [done, setDone] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Starfield Canvas Animation Setup
    const canvas = canvasRef.current;
    let animationFrameId: number;
    if (canvas && !reduced) {
      const ctx = canvas.getContext("2d");
      let w = (canvas.width = window.innerWidth);
      let h = (canvas.height = window.innerHeight);

      const handleResize = () => {
        if (!canvas) return;
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
      };
      window.addEventListener("resize", handleResize);

      const numStars = 400;
      const stars: { x: number; y: number; z: number; size: number }[] = [];

      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: (Math.random() - 0.5) * w * 2,
          y: (Math.random() - 0.5) * h * 2,
          z: Math.random() * w,
          size: Math.random() * 1.5,
        });
      }

      let speed = 0.5; // Normal drift speed

      const render = () => {
        if (!ctx) return;
        ctx.fillStyle = "rgba(10, 10, 10, 0.3)"; // Creates motion trail
        ctx.fillRect(0, 0, w, h);

        const cx = w / 2;
        const cy = h / 2;

        ctx.fillStyle = "#FFFFFF";
        stars.forEach((star) => {
          star.z -= speed;
          if (star.z <= 0) {
            star.z = w;
            star.x = (Math.random() - 0.5) * w * 2;
            star.y = (Math.random() - 0.5) * h * 2;
          }

          const k = 250 / star.z;
          const px = star.x * k + cx;
          const py = star.y * k + cy;

          if (px >= 0 && px <= w && py >= 0 && py <= h) {
            const pSize = Math.max(1, star.size * k * (speed * 0.8));
            ctx.fillRect(px, py, pSize, pSize);
          }
        });

        animationFrameId = requestAnimationFrame(render);
      };

      render();

      (canvas as any).warpControl = {
        get speed() {
          return speed;
        },
        set speed(val: number) {
          speed = val;
        },
      };

      return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(overlayRef.current, { autoAlpha: 0 });
        document.body.style.overflow = "";
        setDone(true);
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setDone(true);
        },
      });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );

      // Cycle through greetings sequentially
      GREETINGS.forEach((_, index) => {
        tl.call(() => setCurrentIndex(index))
          .fromTo(
            wordRef.current,
            { opacity: 0, y: 24, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.35, ease: "power3.out" }
          )
          .to({}, { duration: 0.4 });

        if (index < GREETINGS.length - 1) {
          tl.to(wordRef.current, {
            opacity: 0,
            y: -20,
            filter: "blur(4px)",
            duration: 0.25,
            ease: "power2.in",
          });
        }
      });

      // EXTENDED Warp Speed Hyperspace Launch Sequence
      tl.to(
        wordRef.current,
        { opacity: 0, scale: 1.3, filter: "blur(16px)", duration: 0.5, ease: "power2.in" },
        "warp"
      )
      .to(
        eyebrowRef.current,
        { opacity: 0, duration: 0.3 },
        "warp"
      )
      .to(
        canvasRef.current,
        {
          onStart: () => {
            if (canvasRef.current && (canvasRef.current as any).warpControl) {
              (canvasRef.current as any).warpControl.speed = 50; // Increased speed multiplier
            }
          },
          opacity: 0,
          duration: 1.2, // Extended from 0.6 to 1.2 seconds for a longer warp effect
          ease: "power3.inOut",
        },
        "warp+=0.1"
      )
      .to(
        overlayRef.current,
        { autoAlpha: 0, duration: 0.3 },
        "warp+=0.9" // Delays final cleanup to match the longer duration
      );
    });

    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background overflow-hidden"
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      <p
        ref={eyebrowRef}
        className="absolute bottom-10 left-6 font-mono text-[13px] uppercase tracking-[0.3em] text-accent md:left-10 z-30"
      >
        {profile.location}
      </p>

      <div className="relative z-30 flex flex-col items-center text-center">
        <div
          ref={wordRef}
          className="text-[14vw] font-semibold tracking-tight text-primary sm:text-[110px]"
        >
          {GREETINGS[currentIndex]}
        </div>
      </div>
    </div>
  );
}