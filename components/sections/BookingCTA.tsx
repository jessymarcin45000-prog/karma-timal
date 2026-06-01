"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BookingCTA() {
  return (
    <section className="relative py-section overflow-hidden">
      {/* ── Background photo — recadrée pour centrer le visage ── */}
      <div className="absolute inset-0">
        <Image
          src="/photos/karma-live-guitare.jpg"
          alt=""
          fill
          sizes="100vw"
          priority={false}
          className="object-cover"
          // 50%-65% horizontal pousse le sujet vers le centre/droite
          // 18% vertical libère le haut de la tête / casquette
          style={{ objectPosition: "55% 18%" }}
        />
        {/* Gradients : sombre côté gauche pour la lisibilité du texte,
            voile léger côté droit pour conserver la présence de la photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-noir via-noir/80 to-noir/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir/85 via-transparent to-noir/35" />
        {/* Vignette douce */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 70% 50%, transparent 0%, transparent 35%, rgba(10,10,10,0.45) 90%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-screen-xl mx-auto safe-px lg:px-12">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="line-or" />
            <span className="text-or text-[10px] tracking-[0.45em] uppercase">
              Réservation · Disponible 2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-display-md text-creme leading-[0.95] mb-6"
          >
            Prêt à faire vibrer{" "}
            <em className="text-or">votre événement</em> ?
          </motion.h2>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-sable/70 text-base lg:text-lg leading-relaxed tracking-wide mb-10 max-w-xl"
          >
            Concert en salle, festival, mariage, soirée privée, hôtel, événement
            corporate — Karma Timal compose chaque prestation sur-mesure pour
            transformer votre moment en souvenir inoubliable.
          </motion.p>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-10 text-sable/60 text-[11px] tracking-[0.2em] uppercase"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-or rounded-full" />
              Solo · Duo · Trio
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-vert-light rounded-full" />
              France &amp; international
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-or rounded-full" />
              Devis sous 48h
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 max-w-md sm:max-w-none"
          >
            <Link href="/booking" className="btn-primary sm:w-auto">
              Demander un devis
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/concerts" className="btn-outline sm:w-auto">
              Voir les dates à venir
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Corner ornaments */}
      <div className="absolute top-8 right-8 w-10 h-10 border-t border-r border-or/30 hidden lg:block" />
      <div className="absolute bottom-8 left-8 w-10 h-10 border-b border-l border-or/30 hidden lg:block" />
    </section>
  );
}
