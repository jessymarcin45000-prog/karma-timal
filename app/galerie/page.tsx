"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import ScrollProgress from "@/components/ui/ScrollProgress";
import RelatedLinks from "@/components/ui/RelatedLinks";

type Category = "Tous" | "Live" | "Portrait" | "Street";

// ─────────────────────────────────────────────────────────────────────────────
// Vraies photos de Karma Timal — fichiers présents dans /public/photos/
// Pour ajouter une nouvelle photo : déposez le fichier dans public/photos/
// et ajoutez une entrée ci-dessous.
// ─────────────────────────────────────────────────────────────────────────────
const photos: Array<{
  id: number;
  cat: Exclude<Category, "Tous">;
  title: string;
  src: string;
  ratio: string;       // aspect-ratio tailwind class
  position: string;    // objectPosition pour cadrer le visage
}> = [
  {
    id: 1,
    cat: "Live",
    title: "Live — sourire au micro",
    src: "/photos/karma-live-guitare.jpg",
    ratio: "aspect-[3/4]",
    position: "center 25%",
  },
  {
    id: 2,
    cat: "Portrait",
    title: "Portrait — bonnet à cauris",
    src: "/photos/karma-portrait-cauris.jpg",
    ratio: "aspect-[3/4]",
    position: "center 25%",
  },
  {
    id: 3,
    cat: "Portrait",
    title: "Accroupi — wax & sourire",
    src: "/photos/karma-accroupi.jpg",
    ratio: "aspect-square",
    position: "center 30%",
  },
  {
    id: 4,
    cat: "Street",
    title: "Dans les rues de Paris",
    src: "/photos/karma-paris-1.jpg",
    ratio: "aspect-[3/4]",
    position: "center 30%",
  },
  {
    id: 5,
    cat: "Live",
    title: "Duo — la guitare et l'éventail",
    src: "/photos/karma-paris-2.jpg",
    ratio: "aspect-[4/3]",
    position: "center 25%",
  },
  {
    id: 6,
    cat: "Street",
    title: "Adossé à la grille",
    src: "/photos/karma-pose-grille.jpg",
    ratio: "aspect-[3/4]",
    position: "center 30%",
  },
  {
    id: 7,
    cat: "Portrait",
    title: "Manteau wax & collier de bois",
    src: "/photos/karma-manteau-rouge.jpg",
    ratio: "aspect-square",
    position: "center 25%",
  },
];

const categories: Category[] = ["Tous", "Live", "Portrait", "Street"];

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
        subtitle="Live, portraits éditoriaux et street style — l'identité visuelle de Karma Timal entre Paris et les Caraïbes."
        accent="true"
      />

      {/* ── Filters ── */}
      <section className="bg-noir border-b border-or/10 sticky top-[72px] z-30 bg-noir/90 backdrop-blur-md">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => {
              const isActive = active === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`flex-shrink-0 text-[10px] tracking-widest uppercase px-4 py-2 border transition-all duration-200 ${
                    isActive
                      ? "border-vert-light bg-vert/20 text-vert-soft"
                      : "border-or/15 text-sable/40 hover:border-vert-light/40 hover:text-sable"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Masonry grid ── */}
      <section className="py-section bg-noir">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-4 lg:gap-5"
            >
              {filtered.map((photo, i) => (
                <motion.button
                  key={photo.id}
                  type="button"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: Math.min(i * 0.05, 0.4), ease: [0.16, 1, 0.3, 1] }}
                  className={`img-zoom relative ${photo.ratio} w-full bg-noir-3 overflow-hidden mb-4 lg:mb-5 cursor-pointer group break-inside-avoid block`}
                  onClick={() => setSelected(photo)}
                  aria-label={`Agrandir : ${photo.title}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="img-inner object-cover"
                    style={{ objectPosition: photo.position }}
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-noir/95 via-noir/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5">
                    <div className="text-left">
                      <p className="font-serif italic text-creme text-lg leading-snug">
                        {photo.title}
                      </p>
                      <p className="text-or/70 text-[10px] tracking-widest uppercase mt-2">
                        {photo.cat}
                      </p>
                    </div>
                  </div>
                  {/* Corner ornaments */}
                  <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-or/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-or/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-sable/50 text-sm">Aucune photo dans cette catégorie pour l&apos;instant.</p>
            </div>
          )}
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
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`relative w-full ${selected.ratio} bg-noir-3 overflow-hidden`}
              >
                <Image
                  src={selected.src}
                  alt={selected.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                  style={{ objectPosition: selected.position }}
                  priority
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="font-serif italic text-creme text-lg">{selected.title}</p>
                  <p className="text-or/60 text-[10px] tracking-widest uppercase mt-1">{selected.cat}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="text-sable/50 hover:text-creme transition-colors duration-200 text-[10px] tracking-[0.3em] uppercase border border-or/20 px-4 py-2 hover:border-or/50"
                  aria-label="Fermer le visualiseur"
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
