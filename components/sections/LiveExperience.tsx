"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RevealText from "../ui/RevealText";
import Link from "next/link";

const experiencePoints = [
  { icon: "♪", title: "Acoustique & Organique",  body: "Des arrangements live épurés qui laissent chaque note respirer." },
  { icon: "◎", title: "Présence & Charisme",      body: "Une connexion unique avec le public, un moment suspendu hors du temps." },
  { icon: "◈", title: "Adaptable & Sur-mesure",   body: "Du duo intime au big band, Karma Timal façonne son show à votre vision." },
  { icon: "◬", title: "Ambiance Universelle",     body: "Jazz, soul, créole — une musique qui parle à toutes les âmes." },
];

export default function LiveExperience() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative py-section overflow-hidden bg-noir">

      {/* ── Parallax background ── */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 80% 50%, rgba(232,105,42,0.15) 0%, transparent 55%), " +
              "radial-gradient(ellipse at 20% 50%, rgba(74,117,88,0.18) 0%, transparent 55%), " +
              "radial-gradient(ellipse at 50% 90%, rgba(42,74,56,0.22) 0%, transparent 50%), " +
              "#0A0A0A",
          }}
        />
      </motion.div>

      {/* ── Full-width banner ── */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-screen-xl mx-auto px-6 lg:px-12 mb-16 origin-left"
      >
        <div className="border border-or/15 p-8 lg:p-12 relative bg-noir-3/40">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="flex-1">
              <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-4">Expérience Live</p>
              <h2 className="font-serif text-display-md text-creme leading-tight">
                Monter sur scène<br />
                avec <em className="text-or">Karma Timal</em>,<br />
                c&apos;est vivre une<br />
                expérience totale.
              </h2>
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <p className="text-sable/60 text-sm leading-relaxed tracking-wide">
                Sa musique vous transporte — des ruelles de Paris aux plages des Caraïbes,
                des jams sessions nocturnes aux couchers de soleil vibrants.
              </p>
              <p className="text-sable/60 text-sm leading-relaxed tracking-wide">
                Un concert Karma Timal est avant tout une rencontre humaine. Une communion
                entre une voix, des instruments vivants et un public prêt à voyager.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <Link href="/booking" className="btn-primary">
                  Réserver un concert
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link href="/concerts" className="btn-outline">
                  Voir les dates
                </Link>
              </div>
            </div>
          </div>
          {/* Corner ornaments */}
          <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-or/30" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-or/30" />
        </div>
      </motion.div>

      {/* ── Feature grid ── */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-or/10">
          {experiencePoints.map((point, i) => {
            // Alterne accent or / vert pour rythme visuel
            const isVert = i % 2 === 1;
            const accent = isVert ? "text-vert-light" : "text-or";
            const accentHover = isVert ? "group-hover:text-vert-light" : "group-hover:text-or";
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-noir p-8 flex flex-col gap-4 group hover:bg-noir-3 transition-colors duration-300 text-center sm:text-left items-center sm:items-start"
              >
                <span className={`${accent} text-2xl group-hover:scale-110 transition-transform duration-300 inline-block`}>
                  {point.icon}
                </span>
                <h3 className={`font-serif text-lg text-creme ${accentHover} transition-colors duration-300`}>
                  {point.title}
                </h3>
                <p className="text-sable/40 text-xs leading-relaxed tracking-wide">{point.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Grandes citations ── */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 mt-20 relative z-10">
        <RevealText delay={0.2}>
          <blockquote className="text-center">
            <p className="font-serif italic text-display-sm text-creme/30 max-w-4xl mx-auto leading-snug">
              &ldquo;Une voix qui vient d&apos;ailleurs et qui vous ramène à l&apos;essentiel&rdquo;
            </p>
            <cite className="text-or/50 text-[10px] tracking-[0.4em] uppercase not-italic mt-6 block">
              — Festival Jazz en Île, 2024
            </cite>
          </blockquote>
        </RevealText>
      </div>
    </section>
  );
}
