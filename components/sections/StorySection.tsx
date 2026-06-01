"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import RevealText from "../ui/RevealText";
import Link from "next/link";

export default function StorySection() {
  return (
    <section className="py-section bg-noir relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(184,115,51,0.07) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Left: visual card ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Main image */}
            <div className="img-zoom relative aspect-[3/4] bg-noir-3 overflow-hidden">
              <Image
                src="/photos/karma-portrait-cauris.jpg"
                alt="Portrait de Karma Timal"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="img-inner object-cover"
              />
              {/* Bottom gradient for quote legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/20 to-transparent" />
              {/* Quote overlay */}
              <div className="absolute inset-0 flex items-end p-8">
                <div>
                  <p className="font-serif italic text-or text-3xl leading-tight mb-2">
                    &ldquo;La musique est<br />ma langue<br />maternelle.&rdquo;
                  </p>
                  <span className="text-sable/60 text-xs tracking-widest uppercase">— Karma Timal</span>
                </div>
              </div>
              {/* Corner ornament */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-or/40" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-or/40" />
            </div>

            {/* Floating accent card */}
            <motion.div
              className="absolute -bottom-6 -right-6 lg:-right-10 bg-noir-2 border border-or/20 p-5 max-w-[180px]"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-or text-3xl font-serif font-bold">12+</p>
              <p className="text-sable/50 text-[10px] tracking-widest uppercase mt-1 leading-snug">
                Années de scène
              </p>
            </motion.div>

            {/* Dot pattern */}
            <div
              className="absolute -top-6 -left-6 w-24 h-24 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(196,169,106,0.25) 1px, transparent 1px)",
                backgroundSize: "8px 8px",
              }}
            />
          </motion.div>

          {/* ── Right: text ── */}
          <div className="flex flex-col gap-8">
            <div>
              <RevealText delay={0.1}>
                <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-5">
                  L&apos;artiste
                </p>
              </RevealText>

              <RevealText delay={0.2}>
                <h2 className="font-serif text-display-sm text-creme leading-tight mb-6">
                  Chanteur, guitariste,{" "}
                  <em className="text-or">performer.</em>
                </h2>
              </RevealText>

              <RevealText delay={0.35}>
                <p className="text-sable/60 leading-relaxed tracking-wide text-sm lg:text-base">
                  Un univers solaire, métissé et profondément humain. Entre Afro Jazz Caribéen,
                  sonorités créoles, influences latino, soul et touches hip-hop, Karma Timal
                  construit une musique vivante où la voix, la guitare et le rythme ne font qu&apos;un.
                </p>
              </RevealText>

              <RevealText delay={0.48}>
                <p className="text-sable/60 leading-relaxed tracking-wide text-sm lg:text-base mt-4">
                  Armé de sa guitare, de son looper et de sa voix, il mélange harmonies aériennes,
                  beatbox, improvisation et énergie acoustique dans des performances chaleureuses
                  et spontanées où le public devient lui aussi acteur du voyage.
                </p>
              </RevealText>
            </div>

            {/* Stats row */}
            <RevealText delay={0.6}>
              <div className="grid grid-cols-3 gap-px border border-or/10">
                {[
                  { number: "200+", label: "Concerts" },
                  { number: "15+", label: "Pays" },
                  { number: "50K+", label: "Fans" },
                ].map((stat) => (
                  <div key={stat.label} className="py-5 px-4 bg-noir-3/40 text-center">
                    <p className={`font-serif text-2xl ${stat.label === "Pays" ? "text-vert-light" : "text-or"}`}>{stat.number}</p>
                    <p className="text-sable/40 text-[9px] tracking-widest uppercase mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </RevealText>

            <RevealText delay={0.7}>
              <Link href="/univers" className="btn-outline w-fit">
                Découvrir l&apos;univers
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </RevealText>
          </div>
        </div>
      </div>
    </section>
  );
}
