"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import RevealText from "@/components/ui/RevealText";
import ScrollProgress from "@/components/ui/ScrollProgress";
import RelatedLinks from "@/components/ui/RelatedLinks";
import SafeMarkup from "@/components/ui/SafeMarkup";

export default function UniversPage() {
  return (
    <>
      <ScrollProgress />

      <PageHero
        label="L&apos;univers"
        title="Chanteur, guitariste,"
        titleItalic="performer."
        subtitle="Une musique vivante où la voix, la guitare et le rythme ne font qu&apos;un. Entre Afro Jazz Caribéen, sonorités créoles, influences latino, soul et touches hip-hop."
        accent="true"
      />

      {/* ── Story immersive ── */}
      <section className="py-section bg-noir-2 relative overflow-hidden">
        <div
          className="absolute right-0 top-0 bottom-0 w-[600px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at right, rgba(184,115,51,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">

            {/* Visual portrait block — agrandi pour homogénéité texte/image */}
            <div className="lg:col-span-2 flex flex-col">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative lg:sticky lg:top-24"
              >
                <div className="img-zoom relative aspect-[3/4] bg-noir-3 overflow-hidden">
                  <Image
                    src="/photos/karma-pose-grille.jpg"
                    alt="Karma Timal — portrait éditorial"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="img-inner object-cover"
                    style={{ objectPosition: "center 30%" }}
                  />
                  {/* Bottom gradient for quote legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/30 to-transparent" />
                  {/* Quote overlay */}
                  <div className="absolute inset-0 flex items-end p-6 lg:p-8">
                    <blockquote>
                      <p className="font-serif italic text-xl lg:text-2xl text-creme leading-snug mb-3">
                        &ldquo;Une musique libre, sincère et lumineuse — pensée pour rassembler, faire voyager et créer de vraies émotions humaines.&rdquo;
                      </p>
                      <cite className="text-or text-[10px] tracking-[0.4em] uppercase not-italic block">
                        — Karma Timal
                      </cite>
                    </blockquote>
                  </div>
                  {/* Corner ornaments */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-or/40" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-or/40" />
                </div>
              </motion.div>
            </div>

            {/* Body text */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              {[
                "Karma Timal est un chanteur, guitariste et performer à l&apos;univers solaire, métissé et profondément humain. Entre Afro Jazz Caribéen, sonorités créoles, influences latino, soul et touches hip-hop, il construit une musique vivante où la voix, la guitare et le rythme ne font qu&apos;un.",
                "Artiste de scène avant tout, Karma Timal transforme chacun de ses concerts en expérience immersive. Armé de sa guitare, de son looper et de sa voix, il mélange harmonies aériennes, beatbox, improvisation et énergie acoustique dans des performances chaleureuses et spontanées où le public devient lui aussi acteur du voyage.",
                "Son approche du beatbox apporte une dimension rythmique moderne et organique à son univers. Inspiré par les codes du hip-hop, des grooves urbains et des percussions vocales, il utilise sa voix comme un véritable instrument pour créer basses, batteries, textures et improvisations en live. Cette fusion entre musique acoustique, influences caribéennes et énergie hip-hop donne naissance à une signature sonore singulière, à la fois authentique, moderne et fédératrice.",
                "Son univers puise autant dans les vibrations des Caraïbes que dans l&apos;élégance du jazz, la chaleur de la soul et l&apos;énergie brute de la musique de rue. Une musique libre, sincère et lumineuse, pensée pour rassembler, faire voyager et créer de vraies émotions humaines.",
                "Installé à Paris après plusieurs années de scène entre concerts, festivals, bars intimistes et performances urbaines, Karma Timal développe un projet artistique singulier porté par une forte identité visuelle et une connexion immédiate avec son public. Son EP <em>Soleil</em>, sorti en 2023, reflète cette énergie : des morceaux organiques, sensibles et vibrants, entre introspection, chaleur tropicale et liberté.",
                "À travers ses concerts acoustiques, ses créations originales et ses performances improvisées, Karma Timal défend une vision de la musique profondément vivante : une musique qui rapproche, fait danser, apaise et laisse une empreinte.",
              ].map((para, i) => (
                <RevealText key={i} delay={i * 0.15}>
                  <SafeMarkup
                    as="p"
                    className="text-sable/60 leading-relaxed tracking-wide text-sm lg:text-base"
                  >
                    {para}
                  </SafeMarkup>
                </RevealText>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Maillage interne — Continuez le voyage ── */}
      <RelatedLinks
        title="Continuez le voyage"
        intro="Maintenant que vous connaissez l'univers de Karma Timal, écoutez sa musique, retrouvez ses prochains concerts ou découvrez-le en images."
        links={[
          {
            eyebrow: "La musique",
            href: "/musique",
            label: "Écoutez l'EP Soleil et le live au Baiser Salé",
            description: "Afro-jazz caribéen, soul créole et beatbox — la signature sonore de Karma Timal sur Spotify.",
          },
          {
            eyebrow: "La scène",
            href: "/concerts",
            label: "Les prochains concerts à Paris & en tournée",
            description: "Festivals, clubs de jazz, soirées privées — toutes les dates à venir de Karma Timal.",
          },
          {
            eyebrow: "En images",
            href: "/galerie",
            label: "La galerie photo — scène & portraits",
            description: "Live, coulisses, séances éditoriales — l'identité visuelle de l'artiste.",
          },
        ]}
      />

      {/* ── Discreet end-of-page booking CTA ── */}
      <section className="bg-noir border-t border-or/10">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <span className="w-10 h-px bg-vert-light/60" />
              <div>
                <p className="text-vert-soft text-[10px] tracking-[0.4em] uppercase mb-1">
                  Et maintenant
                </p>
                <p className="font-serif italic text-creme text-lg lg:text-xl leading-snug">
                  Faites-le venir sur <span className="text-or">votre scène</span>.
                </p>
              </div>
            </div>
            <Link
              href="/booking"
              className="group inline-flex items-center gap-3 text-creme hover:text-or text-[11px] tracking-[0.3em] uppercase border-b border-or/30 hover:border-or pb-1 transition-colors duration-300 shrink-0"
            >
              Réserver un concert
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

    </>
  );
}
