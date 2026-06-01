"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * ScrollRestoration — garantit que chaque changement de page démarre en y=0.
 *
 * Robustesse renforcée :
 *   1. `useLayoutEffect` : scroll AVANT la première peinture (pas de flash visible)
 *   2. Triple-cible : window + document.documentElement + document.body (Safari iOS)
 *   3. Triple-tentative : à 0ms, 60ms et 200ms — couvre les transitions SPA lentes
 *      où le DOM est mis à jour après le changement de pathname
 *   4. `scrollRestoration = "manual"` : désactive le restore natif du navigateur
 *      qui sinon ramène à l'ancienne position lors du retour arrière
 *   5. Popstate : intercepte les retours avant/arrière du navigateur
 *   6. Respect des ancres `#section` : ne touche pas au scroll si hash dans URL
 *   7. Search params (?q=...) : navigation re-déclenche aussi
 */

// SSR-safe useLayoutEffect
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function scrollToTop() {
  // Pas d'animation : changement net + perf
  const opts: ScrollToOptions = { top: 0, left: 0, behavior: "instant" as ScrollBehavior };
  try {
    window.scrollTo(opts);
  } catch {
    // Fallback ancien Safari
    window.scrollTo(0, 0);
  }
  // Mobile Safari : window.scrollTo ne suffit pas toujours
  if (document.documentElement) document.documentElement.scrollTop = 0;
  if (document.body) document.body.scrollTop = 0;
}

export default function ScrollRestoration() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastKey = useRef<string | null>(null);

  // Désactive le restore natif une seule fois au mount
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Intercepte les boutons retour/avancer du navigateur
    const onPop = () => {
      // Si pas de hash, on remet en haut
      if (!window.location.hash) {
        requestAnimationFrame(scrollToTop);
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Réinitialise le scroll à chaque changement de route ou de query
  useIsoLayoutEffect(() => {
    const key = `${pathname}?${searchParams?.toString() ?? ""}`;
    if (lastKey.current === key) return;
    lastKey.current = key;

    // Skip si ancre dans URL
    if (typeof window !== "undefined" && window.location.hash) return;

    // 1ère tentative : avant la peinture
    scrollToTop();

    // 2ᵉ tentative : après le 1er paint (couvre les transitions SPA)
    const r1 = requestAnimationFrame(() => {
      scrollToTop();
      // 3ᵉ tentative : après l'hydratation des sections lazy
      const t = setTimeout(scrollToTop, 200);
      return () => clearTimeout(t);
    });

    return () => cancelAnimationFrame(r1);
  }, [pathname, searchParams]);

  return null;
}
