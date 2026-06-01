"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export interface RelatedLink {
  href: string;
  label: string;
  description: string;
  /** Optional eyebrow above label, e.g. "L'univers" */
  eyebrow?: string;
}

interface RelatedLinksProps {
  title?: string;
  intro?: string;
  links: RelatedLink[];
  /** Background variant. Default = bg-noir-2 */
  variant?: "default" | "dark";
}

/**
 * Block en bas de page — maillage interne SEO + parcours utilisateur.
 *
 * Bonnes pratiques SEO appliquées :
 * - Liens internes contextuels (favorisent le crawling Google)
 * - Ancres avec mots-clés naturels ("écouter sa musique", "voir ses concerts")
 * - description courte qui contextualise la destination
 */
export default function RelatedLinks({
  title = "Continuez le voyage",
  intro,
  links,
  variant = "default",
}: RelatedLinksProps) {
  const bg = variant === "dark" ? "bg-noir" : "bg-noir-2";

  return (
    <section className={`${bg} border-t border-or/10 py-section-sm`}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-10 max-w-2xl"
        >
          <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-4">
            {title}
          </p>
          {intro && (
            <p className="text-sable/60 text-sm lg:text-base leading-relaxed">
              {intro}
            </p>
          )}
        </motion.div>

        <nav
          aria-label="Liens connexes"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6"
        >
          {links.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={link.href}
                className="group block relative border border-or/10 hover:border-or/40 transition-all duration-500 p-6 lg:p-7 h-full"
              >
                {/* Left accent bar */}
                <span
                  className={`absolute left-0 top-6 bottom-6 w-[2px] ${
                    i % 2 === 1 ? "bg-vert-light/40 group-hover:bg-vert-light" : "bg-or/40 group-hover:bg-or"
                  } transition-colors duration-500`}
                  aria-hidden
                />

                {link.eyebrow && (
                  <p className={`text-[9px] tracking-[0.4em] uppercase mb-3 pl-3 ${
                    i % 2 === 1 ? "text-vert-light" : "text-or"
                  }`}>
                    {link.eyebrow}
                  </p>
                )}
                <h3 className="font-serif text-xl lg:text-2xl text-creme group-hover:text-or transition-colors duration-500 mb-3 pl-3 leading-tight">
                  {link.label}
                </h3>
                <p className="text-sable/50 text-sm leading-relaxed tracking-wide pl-3">
                  {link.description}
                </p>
                <div className="mt-5 pl-3 flex items-center gap-2 text-or/70 group-hover:text-or text-[10px] tracking-[0.3em] uppercase transition-colors duration-500">
                  <span>En savoir plus</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="group-hover:translate-x-1 transition-transform duration-500"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>
    </section>
  );
}
