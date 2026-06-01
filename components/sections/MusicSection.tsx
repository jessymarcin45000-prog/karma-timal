"use client";

import { motion } from "framer-motion";
import RevealText from "../ui/RevealText";

export default function MusicSection() {
  return (
    <section className="py-section relative overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-warm-gradient opacity-60" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(196,169,106,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 relative z-10">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <RevealText>
            <span className="line-or mx-auto block mb-5" />
          </RevealText>
          <RevealText delay={0.1}>
            <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-4">Écouter</p>
          </RevealText>
          <RevealText delay={0.2}>
            <h2 className="font-serif text-display-md text-creme">
              La Musique de{" "}
              <em className="text-or">Karma Timal</em>
            </h2>
          </RevealText>
          <RevealText delay={0.35}>
            <p className="text-sable/50 mt-4 max-w-lg mx-auto text-sm tracking-wide leading-relaxed">
              Des compositions qui voyagent entre les cultures, portées par une voix chaude
              et des arrangements acoustiques d&apos;exception.
            </p>
          </RevealText>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center max-w-5xl mx-auto">

          {/* ── Spotify Embed ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4 w-full max-w-md mx-auto lg:mx-0 lg:ml-auto"
          >
            <p className="text-or text-[10px] tracking-[0.4em] uppercase">L&apos;EP &amp; les titres</p>
            <iframe
              src="https://open.spotify.com/embed/artist/3x7cNgI4IzjqYPVj2DI7w0?utm_source=generator&theme=0"
              width="100%"
              height="380"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Karma Timal sur Spotify"
              className="border border-or/10 w-full max-w-full"
              style={{ borderRadius: 12 }}
            />
            <a
              href="https://open.spotify.com/artist/3x7cNgI4IzjqYPVj2DI7w0"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-fit text-xs"
            >
              Écouter sur Spotify
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 2l6 6-6 6M2 8h12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>

          {/* ── YouTube live embed — Baiser Salé ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4 w-full max-w-md mx-auto lg:mx-0 lg:mr-auto"
          >
            <p className="text-or text-[10px] tracking-[0.4em] uppercase">
              Extrait live — Baiser Salé
            </p>
            <p className="text-sable/60 text-sm leading-relaxed tracking-wide">
              Un extrait d&apos;un concert live de Karma Timal &amp; son groupe sur la scène mythique
              du <span className="text-creme">Baiser Salé</span>, club de jazz parisien.
            </p>
            <div className="relative aspect-[9/16] bg-noir-3 border border-or/10 overflow-hidden max-w-[280px] sm:max-w-[300px] mx-auto w-full"
                 style={{ borderRadius: 12 }}>
              <iframe
                src="https://www.youtube-nocookie.com/embed/bNKdNOMM9Ro?rel=0&showinfo=0&color=white&iv_load_policy=3"
                title="Karma Timal – Extrait live au Baiser Salé"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                loading="lazy"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <a
                href="https://www.youtube.com/shorts/bNKdNOMM9Ro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sable/40 hover:text-or text-[10px] tracking-widest uppercase transition-colors duration-200 flex items-center gap-2"
              >
                Voir sur YouTube →
              </a>
              <a
                href="https://www.lebaisersale.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sable/40 hover:text-or text-[10px] tracking-widest uppercase transition-colors duration-200"
              >
                Le Baiser Salé ↗
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── Mid-section booking CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 border-t border-or/15 pt-12 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6 text-center sm:text-left"
        >
          <div className="max-w-xl">
            <p className="text-or text-[10px] tracking-[0.4em] uppercase mb-3">
              Envie de le voir en vrai ?
            </p>
            <p className="font-serif text-creme text-2xl lg:text-3xl leading-snug">
              Faites venir Karma Timal{" "}
              <em className="text-or">sur votre scène</em>.
            </p>
          </div>
          <a href="/booking" className="btn-primary shrink-0">
            Réserver un concert
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
