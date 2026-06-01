"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function FloatingBookingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Appears after scrolling past the hero (~ 1 viewport)
      const past = window.scrollY > window.innerHeight * 0.9;
      // Hide near the bottom (don't compete with the footer CTA)
      const nearBottom =
        window.innerHeight + window.scrollY > document.body.offsetHeight - 800;
      setVisible(past && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 z-40 hidden md:block"
        >
          <Link
            href="/booking"
            className="group relative flex items-center gap-3 bg-or text-noir px-6 py-4 shadow-2xl shadow-or/20 hover:shadow-or/40 hover:bg-creme transition-all duration-300"
            style={{ borderRadius: 2 }}
          >
            <span className="flex h-2 w-2 relative">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-noir opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-noir" />
            </span>
            <span className="text-[11px] tracking-[0.25em] uppercase font-semibold">
              Réserver un concert
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
