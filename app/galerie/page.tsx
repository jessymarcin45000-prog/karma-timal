"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import ScrollProgress from "@/components/ui/ScrollProgress";
import RelatedLinks from "@/components/ui/RelatedLinks";

type Category = "Tous" | "Live" | "Studio" | "Voyage" | "Coulisses";

// Placeholder photo data — remplacer les gradients par de vraies images
const photos = [
  { id: 1,  cat: "Live",      title: "Festival des Îles, Guadeloupe",   ratio: "aspect-[3/4]",  g: "from-[#3A1808] via-[#1A0E04] to-[#0A0A0A]" },
  { id: 2,  cat: "Studio",    title: "Session acoustique, Paris",        ratio: "aspect-square",  g: "from-[#1A1808] via-[#0E0E08] to-[#0A0A0A]" },
  { id: 3,  cat: "Voyage",    title: "Coucher de soleil, Martinique",    ratio: "aspect-[4/3]",  g: "from-[#3A2008] via-[#1A1204] to-[#0A0A0A]" },
  { id: 4,  cat: "Live",      title: "La Cave du Jazz, Paris",           ratio: "aspect-[3/4]",  g: "from-[#1A0808] via-[#0E0808] to-[#0A0A0A]" },
  { id: 5,  cat: "Coulisses", title: "Backstage, Festival",              ratio: "aspect-square",  g: "from-[#241A08] via-[#1A1208] to-[#0A0A0A]" },
  { id: 6,  cat: "Studio",    title: "Enregistrement, Studio B",         ratio: "aspect-[4/3]",  g: "from-[#0A0A1A] via-[#0A0A12] to-[#0A0A0A]" },
  { id: 7,  cat: "Voyage",    title: "Marché de Pointe-à-Pitre",         ratio: "aspect-[3/4]",  g: "from-[#2A1A08] via-[#1A1004] to-[#0A0A0A]" },
  { id: 8,  cat: "Live",      title: "Rooftop Jazz, Marseille",          ratio: "aspect-square",  g: "from-[#1A0A08] via-[#120808] to-[#0A0A0A]" },
  { id: 9,  cat: "Coulisses", title: "Soundcheck, Cannes",               ratio: "aspect-[4/3]",  g: "from-[#1A1A1A] via-[#141414] to-[#0A0A0A]" },
  { id: 10, cat: "Voyage",    title: "Port de Fort-de-France",           ratio: "aspect-square",  g: "from-[#1A2A08] via-[#141A04] to-[#0A0A0A]" },
  { id: 11, cat: "Live",      title: "Hôtel Majestic, Cannes",           ratio: "aspect-[3/4]",  g: "from-[#2A1808] via-[#1A1004] to-[#0A0A0A]" },
  { id: 12, cat: "Studio",    title: "Portrait artistique",              ratio: "aspect-[4/3]",  g: "from-[#1A1808] via-[#121208] to-[#0A0A0A]" },
];

const categories: Category[] = ["Tous", "Live", "Studio", "Voyage", "Coulisses"];

export default function GaleriePage() {
  const [active, setActive] = useState<Category>("Tous");
  const [selected, setSelected] = useState<(typeof photos)[0] | null>(null);

  const filtered = active === "Tous" ? photos : photos.filter((p) => p.cat === active);

  return (
    <>
      <ScrollProgress />

      <PageHero
        label="Galerie"
        title="L'univers en"
        titleItalic="images"
        subtitle="Photos de concerts, coulisses, studio et voyages. L'œil derrière la musique de Karma Timal."
        accent="true"
      />

      {/* ── Filters ── */}
      <section className="bg-noir border-b border-or/10 sticky top-[72px] z-30 bg-noir/90 backdrop-blur-md">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="flex gap-2 overflow-x-auto py-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`flex-shrink-0 text-[9px] tracking-widest uppercase px-4 py-2 border transition-all duration-200 ${
                  active === cat
                    ? "border-or bg-or/10 text-or"
                    : "border-or/15 text-sable/40 hover:border-or/40 hover:text-sable"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="py-section bg-noir">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="columns-2 md:columns-3 lg:columns-4 gap-3 lg:gap-4"
            >
              {filtered.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={`img-zoom relative ${photo.ratio} bg-noir-3 overflow-hidden mb-3 lg:mb-4 cursor-pointer group break-inside-avoid`}
                  onClick={() => setSelected(photo)}
                >
                  <div className={`img-inner absolute inset-0 bg-gradient-to-br ${photo.g}`} />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-noir/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4">
                    <div>
                      <p className="text-creme text-xs tracking-wide leading-snug">{photo.title}</p>
                      <p className="text-or/60 text-[9px] tracking-widest uppercase mt-1">{photo.cat}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-noir/95 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`relative w-full ${selected.ratio} bg-gradient-to-br ${selected.g}`} />
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-creme text-sm tracking-wide">{selected.title}</p>
                  <p className="text-or/50 text-[9px] tracking-widest uppercase mt-1">{selected.cat}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-sable/40 hover:text-creme transition-colors duration-200 text-xs tracking-widest uppercase"
                >
                  Fermer ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Maillage interne ── */}
      <RelatedLinks
        title="Continuez l'exploration"
        intro="Les images racontent une partie de l'histoire — découvrez aussi la musique, l'univers et les concerts à venir de Karma Timal."
        links={[
          {
            eyebrow: "Écouter",
            href: "/musique",
            label: "La musique de Karma Timal",
            description: "EP Soleil, extraits de concert et live au Baiser Salé sur Spotify.",
          },
          {
            eyebrow: "La scène",
            href: "/concerts",
            label: "Les prochains concerts",
            description: "Festivals, clubs de jazz et soirées privées — toutes les dates à venir.",
          },
          {
            eyebrow: "L'artiste",
            href: "/univers",
            label: "L'univers et la biographie",
            description: "De Paris aux Antilles — l'histoire et la vision artistique du musicien.",
          },
        ]}
      />
    </>
  );
}
