"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * MobileActionBar — barre d'actions persistante en bas d'écran (mobile only).
 *
 * Stratégie de conversion :
 *   - 4 actions essentielles dans le pouce (zone < 50% basse de l'écran)
 *   - CTA primaire (Réserver) mis en valeur visuellement (fond doré)
 *   - Visible sur toutes les pages → maximise le taux de clic
 *   - Auto-cachée pendant le scroll vers le bas (UX inspirée Instagram/TikTok)
 *   - Safe-area iPhone X+ home indicator
 *   - Pas affichée sur /booking (déjà en page de conversion)
 */

const actions = [
  {
    href: "/univers",
    label: "Univers",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
      </svg>
    ),
  },
  {
    href: "/musique",
    label: "Écouter",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    href: "/concerts",
    label: "Concerts",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 11h18" />
      </svg>
    ),
  },
];

export default function MobileActionBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      // Cache vers le bas (scroll down rapide), affiche vers le haut (scroll up)
      if (Math.abs(delta) > 8) {
        setVisible(delta < 0 || y < 200);
        setLastY(y);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  // Ne pas afficher sur la page booking (déjà en mode conversion)
  if (pathname === "/booking" || !mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Actions principales"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden fixed left-0 right-0 z-40 bg-noir/95 backdrop-blur-xl border-t border-or/15"
          style={{ bottom: 0, paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="flex items-stretch justify-between px-2 pt-2 pb-2 gap-1.5">
            {/* 3 secondary actions */}
            {actions.map((a) => {
              const active = pathname === a.href;
              return (
                <Link
                  key={a.href}
                  href={a.href}
                  className={`flex-1 min-w-0 flex flex-col items-center justify-center gap-1 py-2 rounded-md transition-all duration-200 ${
                    active ? "text-or" : "text-sable/70 hover:text-creme active:bg-or/5"
                  }`}
                  aria-label={a.label}
                >
                  {a.icon}
                  <span className="text-[10px] tracking-[0.15em] uppercase font-medium">
                    {a.label}
                  </span>
                </Link>
              );
            })}

            {/* Primary CTA — Réserver (mis en valeur) */}
            <Link
              href="/booking"
              className="flex-1 min-w-0 flex flex-col items-center justify-center gap-1 py-2 rounded-md bg-or text-noir font-semibold transition-all duration-200 hover:bg-creme active:scale-[0.97] relative"
              aria-label="Réserver un concert"
            >
              {/* Pulse halo derrière le CTA pour attirer l'œil */}
              <span className="absolute inset-0 rounded-md bg-or animate-pulse opacity-30" aria-hidden="true" />
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="relative z-10"
                aria-hidden="true"
              >
                <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7l3-7z" />
              </svg>
              <span className="text-[10px] tracking-[0.15em] uppercase relative z-10">
                Réserver
              </span>
            </Link>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
