"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/karma_8945/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@karmatimal",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.18 8.18 0 004.78 1.52V6.94a4.85 4.85 0 01-1.02-.25z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@karmatimaleri1563",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: "Spotify",
    href: "https://open.spotify.com/artist/3x7cNgI4IzjqYPVj2DI7w0",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
  },
];

interface SocialLinksProps {
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "minimal" | "labeled";
  className?: string;
  iconSize?: "sm" | "md" | "lg";
}

export default function SocialLinks({
  orientation = "horizontal",
  variant = "default",
  className,
  iconSize = "md",
}: SocialLinksProps) {
  const sizeClass = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-12 h-12" }[iconSize];
  const gapClass = orientation === "vertical" ? "flex-col gap-3" : "flex-row gap-3";

  return (
    <div className={cn("flex items-center", gapClass, className)}>
      {socials.map((s, i) => (
        <motion.a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          whileHover={{ scale: 1.15, color: "#C4A96A" }}
          className={cn(
            "flex items-center justify-center text-sable/60 hover:text-or transition-colors duration-300",
            variant === "default" &&
              cn(sizeClass, "border border-sable/10 hover:border-or/40 rounded-full"),
          )}
        >
          {variant === "labeled" ? (
            <span className="flex items-center gap-2 text-xs tracking-widest uppercase">
              {s.icon} {s.name}
            </span>
          ) : (
            s.icon
          )}
        </motion.a>
      ))}
    </div>
  );
}
