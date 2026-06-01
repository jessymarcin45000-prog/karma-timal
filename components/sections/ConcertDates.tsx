"use client";

import { motion } from "framer-motion";
import RevealText from "../ui/RevealText";
import Link from "next/link";

const concerts = [
  {
    date: { day: "15", month: "Juin", year: "2026" },
    title: "La Cave du Jazz",
    location: "Paris, France",
    type: "Concert Salle",
    tickets: "https://billetweb.fr",
    sold: false,
  },
  {
    date: { day: "28", month: "Juin", year: "2026" },
    title: "Festival des Îles",
    location: "Pointe-à-Pitre, Guadeloupe",
    type: "Festival",
    tickets: "https://billetweb.fr",
    sold: false,
  },
  {
    date: { day: "05", month: "Juil", year: "2026" },
    title: "Soirée Privée — Villa Bella",
    location: "Saint-Tropez, France",
    type: "Événement Privé",
    tickets: null,
    sold: true,
  },
  {
    date: { day: "20", month: "Juil", year: "2026" },
    title: "Rooftop Jazz Sessions",
    location: "Marseille, France",
    type: "Concert Plein Air",
    tickets: "https://billetweb.fr",
    sold: false,
  },
  {
    date: { day: "02", month: "Août", year: "2026" },
    title: "Hôtel Majestic — Live Lounge",
    location: "Cannes, France",
    type: "Hôtel & Resort",
    tickets: null,
    sold: true,
  },
];

export default function ConcertDates() {
  return (
    <section className="py-section bg-noir overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <RevealText delay={0.1}>
              <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-3">Agenda</p>
            </RevealText>
            <RevealText delay={0.2}>
              <h2 className="font-serif text-display-sm text-creme">
                Prochains <em className="text-or">Concerts</em>
              </h2>
            </RevealText>
          </div>
          <RevealText delay={0.3} direction="left">
            <Link href="/concerts" className="btn-outline">
              Toutes les dates
            </Link>
          </RevealText>
        </div>

        {/* ── Concert list ── */}
        <div className="flex flex-col">
          {concerts.map((show, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group border-b border-or/10 first:border-t"
            >
              <div className="flex items-center gap-6 lg:gap-10 py-5 lg:py-6 hover:bg-or/3 transition-colors duration-300 px-3 -mx-3">

                {/* Date */}
                <div className="flex-shrink-0 w-16 lg:w-20 text-center">
                  <p className="font-serif text-2xl lg:text-3xl text-or leading-none">
                    {show.date.day}
                  </p>
                  <p className="text-sable/40 text-[9px] tracking-widest uppercase mt-1">
                    {show.date.month} {show.date.year}
                  </p>
                </div>

                {/* Separator */}
                <div className="w-px h-10 bg-or/20 flex-shrink-0" />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3 className="text-creme text-sm lg:text-base tracking-wide group-hover:text-or transition-colors duration-300 font-medium truncate">
                      {show.title}
                    </h3>
                    <span className="text-[9px] tracking-widest uppercase text-sable/30 border border-sable/10 px-2 py-0.5 flex-shrink-0">
                      {show.type}
                    </span>
                  </div>
                  <p className="text-sable/40 text-xs tracking-wide flex items-center gap-1.5">
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 1a5 5 0 00-5 5c0 4 5 9 5 9s5-5 5-9a5 5 0 00-5-5zm0 7a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                    {show.location}
                  </p>
                </div>

                {/* CTA */}
                <div className="flex-shrink-0">
                  {show.sold ? (
                    <span className="text-[9px] tracking-widest uppercase text-sunset/60 border border-sunset/20 px-3 py-2">
                      Complet
                    </span>
                  ) : show.tickets ? (
                    <a
                      href={show.tickets}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] tracking-widest uppercase text-or border border-or/30 px-3 py-2 hover:bg-or hover:text-noir transition-all duration-300"
                    >
                      Billets
                    </a>
                  ) : (
                    <Link
                      href="/booking"
                      className="text-[9px] tracking-widest uppercase text-sable/50 border border-sable/10 px-3 py-2 hover:border-or hover:text-or transition-all duration-300"
                    >
                      Privatisation
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Booking CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 border border-or/15 p-8 lg:p-12 relative bg-noir-3/30"
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="flex-1">
              <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-3">Votre événement</p>
              <h3 className="font-serif text-display-sm text-creme">
                Invitez Karma Timal<br />dans votre univers
              </h3>
              <p className="text-sable/50 text-sm mt-3 max-w-sm leading-relaxed tracking-wide">
                Concerts, festivals, soirées privées, hôtels, mariages, événements corporate —
                chaque prestation est une expérience unique et sur-mesure.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link href="/booking" className="btn-primary">
                Demander un devis
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-or/30" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-or/30" />
        </motion.div>
      </div>
    </section>
  );
}
