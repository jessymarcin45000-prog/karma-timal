"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  label?: string;
  title: string;
  titleItalic?: string;
  subtitle?: string;
  className?: string;
  accent?: string;
}

export default function PageHero({
  label,
  title,
  titleItalic,
  subtitle,
  className,
  accent,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative pt-40 pb-24 lg:pt-52 lg:pb-32 overflow-hidden",
        className,
      )}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-1/4 w-[600px] h-[400px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(ellipse, rgba(196,169,106,0.4) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 relative z-10">
        {label && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-or text-[10px] tracking-[0.5em] uppercase mb-6"
          >
            {label}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-display-lg text-creme"
        >
          {title}
          {titleItalic && (
            <>
              {" "}
              <em className="text-gradient-or not-italic">{titleItalic}</em>
            </>
          )}
        </motion.h1>

        {accent && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 w-16 h-px bg-or origin-left"
          />
        )}

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 text-sable/60 max-w-xl leading-relaxed tracking-wide"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
