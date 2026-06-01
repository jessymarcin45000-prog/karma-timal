"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import SocialLinks from "./ui/SocialLinks";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Parallax transforms
  const yBg     = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity  = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  // Stagger variants for the title letters
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
  };

  const wordVariants = {
    hidden:  { y: "100%", opacity: 0 },
    visible: { y: "0%",   opacity: 1, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] overflow-hidden flex items-center">

      {/* ── Background photo ── */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 hero-bg"
      >
        <Image
          src="/photos/karma-live-guitare.jpg"
          alt="Karma Timal en performance live"
          fill
          priority
          sizes="100vw"
          // Mobile : centré sur le visage, pas de zoom excessif
          // Desktop : composition large droite
          className="object-cover object-[58%_22%] sm:object-[62%_18%] lg:object-[70%_15%]"
        />
        {/* Dark overlay for legibility — keep photo visible on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-noir via-noir/70 to-noir/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-noir/30" />

        {/* Ambient orbs */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(232,105,42,0.18) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(184,115,51,0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        {/* Vert tropical orb — pour ancrer la charte verte */}
        <motion.div
          className="absolute top-1/2 left-1/3 w-[450px] h-[450px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(74,117,88,0.18) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </motion.div>

      {/* ── Diagonal separator line ── */}
      <motion.div
        className="absolute right-[22%] top-0 bottom-0 w-px bg-or/10 hidden lg:block"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ originY: 0 }}
      />

      {/* ── Main content ── */}
      <motion.div
        style={{ y: yContent, opacity }}
        className="relative z-10 max-w-screen-xl mx-auto safe-px lg:px-12 w-full"
      >
        {/* Tag line top */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center gap-4 mb-6 sm:mb-10"
        >
          <span className="line-or" />
          <span className="text-or text-[10px] tracking-[0.45em] uppercase">
            Musicien · Chanteur · Live
          </span>
        </motion.div>

        {/* ── Title ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="overflow-hidden"
        >
          <div className="overflow-hidden">
            <motion.h1
              variants={wordVariants}
              className="font-serif text-display-xl text-creme leading-[0.88] tracking-tight block"
            >
              Karma
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              variants={wordVariants}
              className="font-serif italic text-display-xl text-or leading-[0.88] tracking-tight block lg:pl-16"
            >
              Timal
            </motion.h1>
          </div>
        </motion.div>

        {/* ── Tagline ── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 sm:mt-8 text-sable/70 text-sm sm:text-base lg:text-lg tracking-[0.06em] max-w-sm font-light"
        >
          L&apos;âme du monde en musique
        </motion.p>

        {/* ── CTAs : empilés pleine largeur sur mobile, en ligne sur sm+ ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 max-w-md sm:max-w-none"
        >
          {/* CTA primaire — halo doré pulsé pour attirer l'œil */}
          <a
            href="/booking"
            className="btn-primary cta-primary-shine justify-center sm:w-auto relative overflow-hidden group"
            aria-label="Réserver un concert avec Karma Timal"
          >
            <span className="relative z-10">Réserver un concert</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
              aria-hidden="true"
            >
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="/univers" className="btn-outline justify-center sm:w-auto">
            Découvrir l&apos;univers
          </a>
        </motion.div>

        {/* ── Mini-actions secondaires sous le hero (mobile) — accès rapide ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.6 }}
          className="mt-8 sm:hidden flex items-center justify-center gap-5 text-sable/50 text-[10px] tracking-[0.25em] uppercase"
        >
          <a href="/musique" className="flex items-center gap-1.5 hover:text-or transition-colors py-2 px-1">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
            </svg>
            Écouter
          </a>
          <span className="w-px h-3 bg-or/20" aria-hidden="true" />
          <a href="/concerts" className="flex items-center gap-1.5 hover:text-or transition-colors py-2 px-1">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" />
            </svg>
            Concerts
          </a>
          <span className="w-px h-3 bg-or/20" aria-hidden="true" />
          <a href="/galerie" className="flex items-center gap-1.5 hover:text-or transition-colors py-2 px-1">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="M21 15l-5-5L5 21" />
            </svg>
            Galerie
          </a>
        </motion.div>
      </motion.div>

      {/* ── Social links (left vertical) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4"
      >
        <div className="w-px h-16 bg-or/20" />
        <SocialLinks orientation="vertical" iconSize="sm" variant="minimal" className="gap-3" />
        <div className="w-px h-16 bg-or/20" />
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-sable/30 text-[9px] tracking-[0.4em] uppercase">Scroll</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-or/60 to-transparent"
          animate={{ scaleY: [1, 0.4, 1], opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* ── Quote bottom-right ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 1 }}
        className="absolute bottom-16 right-6 lg:right-12 text-right hidden lg:block"
      >
        <p className="text-sable/25 text-[10px] tracking-[0.3em] uppercase leading-loose">
          Afro-Jazz · Créole · Soul
        </p>
      </motion.div>
    </section>
  );
}
