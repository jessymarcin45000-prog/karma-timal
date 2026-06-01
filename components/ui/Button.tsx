"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export default function Button({
  href,
  onClick,
  variant = "primary",
  children,
  className,
  external = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-3 text-xs tracking-widest uppercase font-semibold px-8 py-4 transition-all duration-300 cursor-pointer select-none";

  const variants = {
    primary: "bg-or text-noir hover:bg-or-light",
    outline: "border border-or/40 text-creme hover:border-or hover:text-or",
    ghost:   "text-or hover:text-or-light underline-offset-4 hover:underline px-0 py-0",
  };

  const classes = cn(base, variants[variant], className);

  const inner = (
    <motion.span
      className={classes}
      whileHover={{ scale: variant === "ghost" ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
    ) : (
      <Link href={href}>{inner}</Link>
    );
  }

  return inner;
}
