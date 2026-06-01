"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const STORAGE_KEY = "karma-cookie-consent-v1";

type Consent = "accepted" | "refused" | null;

export default function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Consent;
      setConsent(stored);
    } catch {
      /* SSR / privacy mode */
    }
    setMounted(true);
  }, []);

  const decide = (value: "accepted" | "refused") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch { /* ignore */ }
    setConsent(value);
  };

  if (!mounted || consent) return null;

  return (
    <AnimatePresence>
      <motion.aside
        role="dialog"
        aria-labelledby="cookie-title"
        aria-describedby="cookie-desc"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-0 inset-x-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6 pointer-events-none"
      >
        <div className="pointer-events-auto max-w-3xl mx-auto bg-noir-2 border border-or/20 shadow-2xl shadow-black/60 p-5 sm:p-6">
          <div className="flex flex-col gap-4">
            <div>
              <p
                id="cookie-title"
                className="text-or text-[10px] tracking-[0.4em] uppercase mb-2"
              >
                Cookies &amp; confidentialité
              </p>
              <p
                id="cookie-desc"
                className="text-sable/70 text-sm leading-relaxed tracking-wide"
              >
                Ce site utilise uniquement des cookies essentiels et des
                contenus intégrés (Spotify, YouTube) pour vous permettre
                d&apos;écouter et de voir le travail de Karma Timal. Aucune
                donnée n&apos;est revendue à des tiers.{" "}
                <Link
                  href="/confidentialite"
                  className="underline decoration-or/50 underline-offset-4 hover:text-or transition-colors"
                >
                  En savoir plus
                </Link>
                .
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                onClick={() => decide("refused")}
                className="text-sable/70 hover:text-creme border border-or/20 hover:border-or/50 px-5 py-3 text-[10px] tracking-[0.25em] uppercase transition-colors duration-200"
              >
                Refuser les contenus tiers
              </button>
              <button
                onClick={() => decide("accepted")}
                className="bg-or text-noir hover:bg-creme px-5 py-3 text-[10px] tracking-[0.25em] uppercase font-semibold transition-colors duration-200"
              >
                Accepter tout
              </button>
              <Link
                href="/confidentialite"
                className="text-sable/40 hover:text-or text-[10px] tracking-[0.25em] uppercase transition-colors duration-200 sm:ml-auto"
              >
                Paramétrer →
              </Link>
            </div>
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
