"use client";

import { motion } from "framer-motion";
import RevealText from "../ui/RevealText";

const platforms = [
  {
    name: "Instagram",
    handle: "@karma_8945",
    href: "https://www.instagram.com/karma_8945/",
    stat: "Suivre",
    statLabel: "Photos & coulisses",
    color: "from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    name: "TikTok",
    handle: "@karmatimal",
    href: "https://www.tiktok.com/@karmatimal",
    stat: "Suivre",
    statLabel: "Extraits live",
    color: "from-[#010101] via-[#69C9D0] to-[#EE1D52]",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.18 8.18 0 004.78 1.52V6.94a4.85 4.85 0 01-1.02-.25z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    handle: "@karmatimaleri1563",
    href: "https://www.youtube.com/@karmatimaleri1563",
    stat: "Voir",
    statLabel: "Vidéos & concerts",
    color: "from-[#FF0000] to-[#CC0000]",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: "Spotify",
    handle: "Karma Timal",
    href: "https://open.spotify.com/artist/3x7cNgI4IzjqYPVj2DI7w0",
    stat: "Écouter",
    statLabel: "EP & singles",
    color: "from-[#1DB954] to-[#158a3c]",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
  },
];

export default function SocialSection() {
  return (
    <section className="py-section bg-noir-2 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <RevealText delay={0.1}>
            <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-4">Suivre l&apos;univers</p>
          </RevealText>
          <RevealText delay={0.2}>
            <h2 className="font-serif text-display-md text-creme">
              Rejoindre la <em className="text-or">communauté</em>
            </h2>
          </RevealText>
          <RevealText delay={0.35}>
            <p className="text-sable/50 mt-4 max-w-md mx-auto text-sm tracking-wide leading-relaxed">
              Coulisses, sessions live, voyages et émotions — suivez l&apos;aventure de Karma Timal sur tous les réseaux.
            </p>
          </RevealText>
        </div>

        {/* ── Platform cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {platforms.map((platform, i) => (
            <motion.a
              key={platform.name}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="group relative border border-or/10 p-7 flex flex-col gap-5 bg-noir hover:border-or/30 transition-all duration-400 overflow-hidden text-center sm:text-left items-center sm:items-stretch"
            >
              {/* Gradient accent top */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${platform.color} opacity-0 group-hover:opacity-100 transition-opacity duration-400`} />

              <div className="flex items-center justify-center sm:justify-between w-full">
                <span className="text-sable/50 group-hover:text-creme transition-colors duration-300">
                  {platform.icon}
                </span>
                <svg
                  width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
                  className="text-or/0 group-hover:text-or/60 transition-colors duration-300 -rotate-45 hidden sm:block"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div className="w-full">
                <p className="text-creme text-sm font-medium tracking-wide">{platform.name}</p>
                <p className="text-sable/40 text-xs tracking-wide mt-0.5">{platform.handle}</p>
              </div>

              <div className="mt-auto pt-4 border-t border-or/10 w-full">
                <p className="font-serif text-2xl text-or">{platform.stat}</p>
                <p className="text-sable/30 text-[9px] tracking-widest uppercase mt-0.5">{platform.statLabel}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* ── CTA strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 text-center"
        >
          <p className="text-sable/30 text-xs tracking-widest uppercase">
            Contenus exclusifs · Coulisses · Sessions live · Actualités
          </p>
        </motion.div>
      </div>
    </section>
  );
}
