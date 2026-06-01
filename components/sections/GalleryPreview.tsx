"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import RevealText from "../ui/RevealText";

const photos = [
  { id: 1, src: "/photos/karma-live-guitare.jpg",    label: "Live — sourire au micro",          position: "center 25%" },
  { id: 2, src: "/photos/karma-accroupi.jpg",        label: "Accroupi — wax & sourire",         position: "center 30%" },
  { id: 3, src: "/photos/karma-paris-1.jpg",         label: "Dans les rues de Paris",           position: "center 30%" },
  { id: 4, src: "/photos/karma-paris-2.jpg",         label: "Duo — la guitare et l'éventail",   position: "center 25%" },
  { id: 5, src: "/photos/karma-portrait-cauris.jpg", label: "Portrait — bonnet à cauris",       position: "center 25%" },
  { id: 6, src: "/photos/karma-pose-grille.jpg",     label: "Adossé à la grille",               position: "center 30%" },
  { id: 7, src: "/photos/karma-manteau-rouge.jpg",   label: "Manteau wax & collier de bois",    position: "center 25%" },
];

export default function GalleryPreview() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, clientWidth, scrollWidth } = el;
    setCanPrev(scrollLeft > 8);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 8);

    // Determine active card (nearest to left edge of scroll container)
    const cards = el.querySelectorAll<HTMLElement>("[data-card]");
    let nearest = 0;
    let minDist = Infinity;
    const containerLeft = el.getBoundingClientRect().left + 24;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.getBoundingClientRect().left - containerLeft);
      if (dist < minDist) {
        minDist = dist;
        nearest = i;
      }
    });
    setActiveIndex(nearest);
  }, []);

  useEffect(() => {
    updateState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);
    return () => {
      el.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, [updateState]);

  const scrollBy = (dir: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.4;
    el.scrollBy({ left: dir === "next" ? step : -step, behavior: "smooth" });
  };

  const goTo = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelectorAll<HTMLElement>("[data-card]")[i];
    if (card) {
      el.scrollTo({ left: card.offsetLeft - 24, behavior: "smooth" });
    }
  };

  return (
    <section className="py-section bg-noir-2 overflow-hidden relative">
      {/* Ambient green orb — charte */}
      <div
        className="absolute -top-32 right-0 w-[500px] h-[500px] pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(74,117,88,0.25) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 relative">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <RevealText delay={0.1}>
              <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-3">Galerie</p>
            </RevealText>
            <RevealText delay={0.2}>
              <h2 className="font-serif text-display-sm text-creme">
                En images
              </h2>
            </RevealText>
            <RevealText delay={0.3}>
              <p className="text-sable/50 text-sm mt-4 max-w-md leading-relaxed">
                De la scène parisienne aux portraits éditoriaux,
                {" "}
                <Link href="/galerie" className="text-creme underline decoration-or/30 underline-offset-4 hover:decoration-or transition">
                  retrouvez toutes les images de Karma Timal
                </Link>
                {" "}
                — concerts, sessions et coulisses.
              </p>
            </RevealText>
          </div>

          {/* Nav buttons (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollBy("prev")}
              disabled={!canPrev}
              aria-label="Photo précédente"
              className="w-12 h-12 border border-or/30 text-or hover:bg-or hover:text-noir transition-all duration-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-or"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13 8H3M7 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => scrollBy("next")}
              disabled={!canNext}
              aria-label="Photo suivante"
              className="w-12 h-12 border border-or/30 text-or hover:bg-or hover:text-noir transition-all duration-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-or"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <Link
              href="/galerie"
              className="ml-3 btn-outline text-[11px]"
            >
              Voir toute la galerie
            </Link>
          </div>
        </div>
      </div>

      {/* ── Carousel scroller (full-bleed) ── */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 lg:px-12 pb-4 pt-2"
          style={{ scrollPaddingLeft: 24 }}
        >
          {photos.map((photo, i) => (
            <motion.article
              key={photo.id}
              data-card
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: Math.min(i * 0.06, 0.42), ease: [0.16, 1, 0.3, 1] }}
              className="snap-start flex-shrink-0 w-[82%] sm:w-[48%] lg:w-[36%] xl:w-[30%] group cursor-pointer"
            >
              <div className="relative aspect-[3/4] bg-noir-3 overflow-hidden img-zoom">
                <Image
                  src={photo.src}
                  alt={photo.label}
                  fill
                  sizes="(max-width:640px) 82vw, (max-width:1024px) 48vw, 30vw"
                  className="img-inner object-cover"
                  style={{ objectPosition: photo.position }}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-noir/95 via-noir/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Number */}
                <div className="absolute top-5 left-5 text-or font-serif text-sm tracking-[0.3em]">
                  {String(i + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-creme font-serif italic text-lg lg:text-xl leading-snug">
                    {photo.label}
                  </p>
                  <div className="mt-3 h-px w-12 bg-or group-hover:w-20 transition-all duration-500" />
                </div>

                {/* Corner ornaments */}
                <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-or/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-or/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.article>
          ))}
        </div>

        {/* Edge fade gradients */}
        <div className="absolute top-0 bottom-4 left-0 w-12 lg:w-20 bg-gradient-to-r from-noir-2 to-transparent pointer-events-none" />
        <div className="absolute top-0 bottom-4 right-0 w-12 lg:w-20 bg-gradient-to-l from-noir-2 to-transparent pointer-events-none" />
      </div>

      {/* ── Indicators ── */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 mt-8 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Aller à la photo ${i + 1}`}
              className={`transition-all duration-300 ${
                i === activeIndex
                  ? "w-8 h-[2px] bg-or"
                  : "w-4 h-[2px] bg-or/20 hover:bg-or/40"
              }`}
            />
          ))}
        </div>

        {/* Mobile nav buttons */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => scrollBy("prev")}
            disabled={!canPrev}
            aria-label="Précédent"
            className="w-10 h-10 border border-or/30 text-or flex items-center justify-center disabled:opacity-30"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M13 8H3M7 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => scrollBy("next")}
            disabled={!canNext}
            aria-label="Suivant"
            className="w-10 h-10 border border-or/30 text-or flex items-center justify-center disabled:opacity-30"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <p className="hidden sm:block text-sable/40 text-[10px] tracking-[0.3em] uppercase">
          {String(activeIndex + 1).padStart(2, "0")} <span className="text-sable/20 mx-1">/</span> {String(photos.length).padStart(2, "0")}
        </p>
      </div>

      {/* Mobile bottom CTA */}
      <div className="md:hidden max-w-screen-xl mx-auto px-6 mt-8 flex justify-center">
        <Link href="/galerie" className="btn-outline text-[11px]">
          Voir toute la galerie
        </Link>
      </div>
    </section>
  );
}
