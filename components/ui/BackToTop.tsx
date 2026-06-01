"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * BackToTop — bouton flottant "Retour en haut" premium.
 *
 * Comportement
 *   - Apparaît après 300px de scroll vers le bas
 *   - Animation fade + scale élégante (respecte `prefers-reduced-motion`)
 *   - Smooth scroll au clic (instant si reduced-motion)
 *   - Position en bas-droite, EMPILÉ au-dessus du bouton WhatsApp
 *   - Taille tactile ≥ 44×44px sur mobile (norme Apple HIG)
 *
 * Design
 *   - Pastille ronde noire avec bordure dorée fine
 *   - Icône flèche vers le haut (chevron stylisé)
 *   - Hover : fond doré + flèche noire
 *   - Active : scale 0.96 (feedback tactile)
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = () => {
    if (reduce) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={goTop}
          aria-label="Retour en haut de la page"
          title="Retour en haut"
          initial={{ opacity: 0, scale: 0.7, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 14 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          whileTap={{ scale: 0.94 }}
          className="group fixed right-4 sm:right-6 z-[44] h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center rounded-full bg-noir/85 backdrop-blur-md border border-or/35 text-or shadow-xl shadow-noir/40 hover:bg-or hover:text-noir hover:border-or transition-colors duration-300"
          // Empilé au-dessus de WhatsApp : WhatsApp est à `var(--floating-wa-offset)`,
          // BackToTop monte de WhatsApp height (48-56px) + gap (12px)
          style={{
            bottom:
              "calc(env(safe-area-inset-bottom) + var(--floating-wa-offset, 1rem) + 4rem)",
          }}
        >
          {/* Halo doré subtil au hover */}
          <span
            className="absolute inset-0 rounded-full bg-or/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          />
          {/* Flèche vers le haut élégante */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="relative z-10 group-hover:-translate-y-0.5 transition-transform duration-300"
            aria-hidden="true"
          >
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
