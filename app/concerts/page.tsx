"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import RevealText from "@/components/ui/RevealText";
import ScrollProgress from "@/components/ui/ScrollProgress";
import RelatedLinks from "@/components/ui/RelatedLinks";
import SafeMarkup from "@/components/ui/SafeMarkup";
import Link from "next/link";

type ConcertType = "Tous" | "Festival" | "Concert Salle" | "Événement Privé" | "Hôtel & Resort" | "Plein Air";

// ─────────────────────────────────────────────────────────────────────────────
// Liste des concerts à venir.
//
// Pour ajouter une vraie date : copier l'objet ci-dessous, remplir les champs.
//   `sold: true`   → "COMPLET" affiché, pas de lien tickets
//   `tickets: "#"` → bouton "Billetterie" actif (remplacer "#" par l'URL réelle)
//   `tickets: null` → pas de bouton billetterie (événement privé / sur invit')
// ─────────────────────────────────────────────────────────────────────────────
const concerts: Array<{
  date: string;
  title: string;
  location: string;
  type: ConcertType;
  sold: boolean;
  tickets: string | null;
}> = [
  // Exemple à conserver pour montrer une scène signature :
  {
    date: "Sur réservation",
    title: "Live au Baiser Salé",
    location: "58 rue des Lombards, Paris",
    type: "Concert Salle",
    sold: false,
    tickets: "https://www.lebaisersale.com/",
  },
  // ↓ Ajoutez vos vraies dates ici ↓
];

const filters: ConcertType[] = ["Tous", "Festival", "Concert Salle", "Événement Privé", "Hôtel & Resort", "Plein Air"];

const eventTypes = [
  { icon: "♪", title: "Concerts en salle",    desc: "Clubs de jazz, salles de spectacle, théâtres." },
  { icon: "◎", title: "Festivals",             desc: "Scènes en plein air, grands rassemblements culturels." },
  { icon: "◈", title: "Soirées privées",       desc: "Mariages, anniversaires, événements exclusifs." },
  { icon: "◬", title: "Hôtels & Resorts",      desc: "Ambiance lounge haut de gamme, pool parties, dîners gastronomiques." },
  { icon: "◇", title: "Corporate",             desc: "Séminaires, lancements de produit, galas d&apos;entreprise." },
  { icon: "✦", title: "Cocktails & Réceptions", desc: "Musique d&apos;ambiance live sur-mesure pour vos réceptions." },
];

export default function ConcertsPage() {
  const [active, setActive] = useState<ConcertType>("Tous");

  const filtered = active === "Tous" ? concerts : concerts.filter((c) => c.type === active);

  return (
    <>
      <ScrollProgress />

      <PageHero
        label="Agenda"
        title="Concerts &"
        titleItalic="Événements"
        subtitle="Retrouvez Karma Timal sur scène — festivals, concerts privés, hôtels de luxe et événements sur-mesure partout en France et aux Antilles."
        accent="true"
      />

      {/* ── Filters ── */}
      <section className="pt-0 pb-section bg-noir sticky top-[72px] z-30 border-b border-or/10 bg-noir/90 backdrop-blur-md">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`flex-shrink-0 text-[9px] tracking-widest uppercase px-4 py-2 border transition-all duration-200 ${
                  active === f
                    ? "border-vert-light bg-vert/20 text-vert-soft"
                    : "border-or/15 text-sable/40 hover:border-vert-light/40 hover:text-sable"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Concert list ── */}
      <section className="py-section bg-noir">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col"
            >
              {filtered.map((show, i) => (
                <motion.div
                  key={`${show.title}-${i}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="group border-b border-or/10 first:border-t"
                >
                  <div className="flex items-center gap-4 lg:gap-8 py-5 hover:bg-or/3 transition-colors duration-300 px-3 -mx-3">
                    <div className="flex-shrink-0 w-14 lg:w-20 text-center hidden sm:block">
                      <p className="font-serif text-xl lg:text-2xl text-or leading-none">
                        {show.date.split(" ")[0]}
                      </p>
                      <p className="text-sable/30 text-[9px] tracking-widest uppercase mt-1">
                        {show.date.split(" ").slice(1).join(" ")}
                      </p>
                    </div>
                    <div className="hidden sm:block w-px h-8 bg-or/15 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="sm:hidden text-or text-[10px] tracking-widest mb-1">{show.date}</div>
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <h3 className="text-creme text-sm tracking-wide group-hover:text-or transition-colors duration-300 font-medium">
                          {show.title}
                        </h3>
                        <span className="text-[9px] tracking-widest uppercase text-sable/25 border border-sable/10 px-2 py-0.5 flex-shrink-0">
                          {show.type}
                        </span>
                      </div>
                      <p className="text-sable/30 text-xs tracking-wide">{show.location}</p>
                    </div>
                    <div className="flex-shrink-0">
                      {show.sold ? (
                        <span className="text-[9px] tracking-widest uppercase text-sunset/50 border border-sunset/15 px-3 py-2">
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
                          className="text-[9px] tracking-widest uppercase text-sable/40 border border-sable/10 px-3 py-2 hover:border-or hover:text-or transition-all duration-300"
                        >
                          Privatiser
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {filtered.length === 0 && (
                <div className="py-16 lg:py-24 text-center max-w-xl mx-auto">
                  <p className="text-or text-[10px] tracking-[0.4em] uppercase mb-4">
                    Prochaines dates en cours de confirmation
                  </p>
                  <h3 className="font-serif text-2xl lg:text-3xl text-creme leading-snug mb-4">
                    Aucune date dans cette catégorie pour l&apos;instant
                  </h3>
                  <p className="text-sable/60 text-sm leading-relaxed mb-8">
                    Pour être informé(e) des prochaines dates en avant-première, suivez
                    Karma Timal sur les réseaux — ou réservez-le pour votre propre événement.
                  </p>
                  <Link href="/booking" className="btn-primary">
                    Réserver un concert
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Types d'événements ── */}
      <section className="py-section bg-noir-2">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="mb-14">
            <RevealText delay={0.1}>
              <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-4">Formules</p>
            </RevealText>
            <RevealText delay={0.2}>
              <h2 className="font-serif text-display-sm text-creme">
                Chaque événement,<br />
                une <em className="text-or">expérience unique</em>
              </h2>
            </RevealText>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {eventTypes.map((type, i) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.09 }}
                className="border border-or/10 p-6 group hover:border-or/30 transition-colors duration-300 text-center sm:text-left"
              >
                <span className="text-or text-2xl block mb-4">{type.icon}</span>
                <h3 className="text-creme text-sm font-medium tracking-wide mb-2 group-hover:text-or transition-colors duration-300">
                  {type.title}
                </h3>
                <SafeMarkup
                  as="p"
                  className="text-sable/40 text-xs leading-relaxed tracking-wide"
                >
                  {type.desc}
                </SafeMarkup>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-14 flex justify-center"
          >
            <Link href="/booking" className="btn-primary">
              Réserver Karma Timal
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Maillage interne ── */}
      <RelatedLinks
        title="Avant le concert"
        intro="Découvrez la musique, l'univers et les images de Karma Timal avant de le voir en live."
        links={[
          {
            eyebrow: "Écouter",
            href: "/musique",
            label: "L'EP Soleil et le live au Baiser Salé",
            description: "Plongez dans l'univers afro-jazz, soul et hip-hop de Karma Timal avant la scène.",
          },
          {
            eyebrow: "L'artiste",
            href: "/univers",
            label: "L'univers de Karma Timal",
            description: "De Paris aux Antilles — la biographie et la vision artistique du chanteur-guitariste.",
          },
          {
            eyebrow: "En images",
            href: "/galerie",
            label: "Photos de scène & coulisses",
            description: "L'énergie d'un concert de Karma Timal capturée en images.",
          },
        ]}
      />
    </>
  );
}
