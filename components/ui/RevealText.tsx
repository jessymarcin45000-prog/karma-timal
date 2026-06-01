"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealTextProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  direction?: "up" | "down" | "left";
}

export default function RevealText({
  children,
  delay = 0,
  duration = 0.9,
  className,
  as: Tag = "div",
  direction = "up",
}: RevealTextProps) {
  const directionMap = {
    up:   { y: 30,  x: 0  },
    down: { y: -30, x: 0  },
    left: { y: 0,   x: 30 },
  };

  const initial = { opacity: 0, ...directionMap[direction] };
  const animate = { opacity: 1, y: 0, x: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <Tag className={cn(className)}>{children}</Tag>
    </motion.div>
  );
}
