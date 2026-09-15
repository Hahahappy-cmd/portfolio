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
    if (done) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const previousOverflow = document.body.style.overflow;
    const warp = { speed: 0.5 };
    let stopCanvas = () => {};
    const finish = () => {
      stopCanvas();
      document.body.style.overflow = previousOverflow;
      setDone(true);
    };

    // Defer removal to the next GSAP tick; reduced motion never starts a canvas loop.
    if (motionQuery.matches) {
      const skip = gsap.delayedCall(0, finish);
      return () => skip.kill();
    }

    document.body.style.overflow = "hidden";
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      type Star = { x: number; y: number; z: number; brightness: number; size: number };
      const depth = 1000;
      const near = 12;
      let width = 0;
      let height = 0;
      let focalLength = 0;
      let stars: Star[] = [];
      let frameId = 0;
      let lastTime: number | undefined;
      let stopped = false;

      const resetStar = (star: Star, z = depth) => {
        star.x = (Math.random() - 0.5) * width * depth / focalLength;
        star.y = (Math.random() - 0.5) * height * depth / focalLength;
        star.z = z;
      };

      const resize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        focalLength = Math.min(width, height) * 0.7;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.strokeStyle = "#ffffff";
        ctx.fillStyle = "#ffffff";
        ctx.lineCap = "round";
        const count = Math.round(Math.min(400, Math.max(120, width * height / 3000)));
        stars = Array.from({ length: count }, () => {
          const star = { x: 0, y: 0, z: 0, brightness: 0.35 + Math.random() * 0.65, size: 0.5 + Math.random() * 0.5 };
          resetStar(star, near + Math.random() * (depth - near));
          return star;
        });
        lastTime = undefined;
      };

      const render = (time: number) => {
        if (stopped) return;
        // Speeds are depth units per 60 Hz frame, independent of display refresh rate.
        const delta = lastTime === undefined ? 1 : Math.min((time - lastTime) / (1000 / 60), 2);
        lastTime = time;
        ctx.clearRect(0, 0, width, height);

        for (const star of stars) {
          star.z -= warp.speed * delta;
          if (star.z <= near) {
            resetStar(star);
            continue;
          }

          const scale = focalLength / star.z;
          const x = width / 2 + star.x * scale;
          const y = height / 2 + star.y * scale;
          // A short virtual shutter exposure gives continuous trails at any refresh rate.
          // Both endpoints use the same x/y ray, so every streak points at the center.
          const previousZ = Math.min(depth, star.z + warp.speed * 2.5);
          const previousScale = focalLength / previousZ;
          const previousX = width / 2 + star.x * previousScale;
          const previousY = height / 2 + star.y * previousScale;
          const tailOutside = previousX < 0 || previousX > width || previousY < 0 || previousY > height;
          if (tailOutside) {
            resetStar(star);
            continue;
          }

          const proximity = 1 - star.z / depth;
          ctx.globalAlpha = star.brightness * (0.35 + proximity * 0.65);
          ctx.lineWidth = star.size * (0.65 + proximity * 0.5);
          if (Math.hypot(x - previousX, y - previousY) < 0.75) {
            ctx.beginPath();
            ctx.arc(x, y, ctx.lineWidth * 0.65, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.moveTo(previousX, previousY);
            ctx.lineTo(x, y);
            ctx.stroke();
          }
        }

        frameId = requestAnimationFrame(render);
      };

      const onVisibility = () => {
        cancelAnimationFrame(frameId);
        lastTime = undefined;
        if (!stopped && !document.hidden) frameId = requestAnimationFrame(render);
      };
      resize();
      window.addEventListener("resize", resize);
      document.addEventListener("visibilitychange", onVisibility);
      if (!document.hidden) frameId = requestAnimationFrame(render);
      stopCanvas = () => {
        stopped = true;
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", onVisibility);
      };
    }

    const context = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish });

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

      // Keep the existing launch/fade timing while smoothly accelerating the stars.
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
      .to(warp, { speed: 50, duration: 0.8, ease: "power2.in" }, "warp+=0.1")
      .to(
        canvasRef.current,
        {
          opacity: 0,
          duration: 1.2,
          ease: "power3.inOut",
        },
        "warp+=0.1"
      )
      .to(
        overlayRef.current,
        { autoAlpha: 0, duration: 0.3 },
        "warp+=0.9"
      );
    }, overlayRef);

    const onMotionChange = () => {
      if (motionQuery.matches) {
        context.revert();
        finish();
      }
    };
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      stopCanvas();
      context.revert();
      motionQuery.removeEventListener("change", onMotionChange);
      document.body.style.overflow = previousOverflow;
    };
  }, [done]);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background overflow-hidden motion-reduce:hidden"
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
