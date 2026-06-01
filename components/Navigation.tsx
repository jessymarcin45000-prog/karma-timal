"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SocialLinks from "./ui/SocialLinks";

const navLinks = [
  { href: "/",         label: "Accueil"  },
  { href: "/univers",  label: "Univers"  },
  { href: "/musique",  label: "Musique"  },
  { href: "/concerts", label: "Concerts" },
  { href: "/galerie",  label: "Galerie"  },
  { href: "/booking",  label: "Booking"  },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  // Body scroll lock when mobile menu open (UX premium iOS / Android)
  useEffect(() => {
    if (menuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [menuOpen]);

  // Close on Esc key (accessibility)
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-noir/92 backdrop-blur-xl border-b border-or/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-[72px]">

            {/* ── Logo ── */}
            <Link href="/" className="group flex-shrink-0">
              <motion.div
                className="flex flex-col leading-[0.95]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <span className="font-serif text-[17px] sm:text-[19px] lg:text-[26px] tracking-[0.3em] sm:tracking-[0.35em] text-or uppercase font-medium">
                  Karma
                </span>
                <span className="font-serif text-[17px] sm:text-[19px] lg:text-[26px] tracking-[0.3em] sm:tracking-[0.35em] text-creme uppercase font-medium">
                  Timal
                </span>
              </motion.div>
            </Link>

            {/* ── Desktop links ── */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-10">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative group"
                  >
                    <span
                      className={`text-[13px] xl:text-[14px] tracking-[0.22em] uppercase font-medium transition-colors duration-300 ${
                        active ? "text-or" : "text-sable/70 hover:text-creme"
                      }`}
                    >
                      {link.label}
                    </span>
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-or transition-all duration-300 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* ── Desktop social + CTA ── */}
            <div className="hidden lg:flex items-center gap-6">
              <SocialLinks iconSize="sm" className="gap-2" />
              <Link
                href="/booking"
                className="text-[12px] xl:text-[13px] tracking-widest uppercase font-medium border border-or/40 text-or px-5 py-2.5 hover:bg-or hover:text-noir transition-all duration-300"
              >
                Réserver
              </Link>
            </div>

            {/* ── Hamburger ── */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] group"
              aria-label="Menu"
            >
              <span
                className={`block h-px w-6 bg-creme transition-all duration-300 origin-center ${
                  menuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block h-px bg-creme transition-all duration-300 ${
                  menuOpen ? "w-0 opacity-0" : "w-5"
                }`}
              />
              <span
                className={`block h-px w-6 bg-creme transition-all duration-300 origin-center ${
                  menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Menu — full-screen premium ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-[72px] z-40 bg-noir/98 backdrop-blur-xl overflow-y-auto overscroll-contain"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div className="min-h-full max-w-screen-xl mx-auto px-6 py-8 flex flex-col">
              {/* Nav links */}
              <nav className="flex flex-col gap-0" aria-label="Menu principal">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -24, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between py-4 border-b border-or/10 font-serif text-3xl sm:text-4xl tracking-tight transition-colors duration-200 ${
                        pathname === link.href
                          ? "text-or italic"
                          : "text-creme/85 hover:text-creme"
                      }`}
                    >
                      <span>{link.label}</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="opacity-40"
                        aria-hidden="true"
                      >
                        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA réserver — gros bouton plein-largeur */}
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mt-8"
              >
                <Link
                  href="/booking"
                  className="btn-primary justify-center w-full text-center"
                >
                  Réserver un concert
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </motion.div>

              {/* Socials labellés */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-10 pt-8 border-t border-or/10"
              >
                <p className="text-or text-[10px] tracking-[0.4em] uppercase mb-5">
                  Réseaux
                </p>
                <SocialLinks variant="labeled" orientation="vertical" className="gap-4" />
              </motion.div>

              {/* Contact rapide */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 pt-8 border-t border-or/10 pb-12 flex flex-col gap-3"
              >
                <p className="text-or text-[10px] tracking-[0.4em] uppercase mb-1">
                  Contact rapide
                </p>
                <a
                  href="https://wa.me/33603436014"
                  className="inline-flex items-center gap-3 text-creme/80 hover:text-[#25D366] transition text-sm"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp · 06 03 43 60 14
                </a>
                <a
                  href="mailto:booking@karmatimal.com"
                  className="text-creme/80 hover:text-or transition text-sm"
                >
                  booking@karmatimal.com
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
