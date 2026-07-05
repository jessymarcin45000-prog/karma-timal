"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import RevealText from "@/components/ui/RevealText";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BookingCTA from "@/components/sections/BookingCTA";
import RelatedLinks from "@/components/ui/RelatedLinks";

const liveVideos = [
  { title: "Extrait de concert live — voix, guitare & groupe", id: "MOdGgXHactg" },
  { title: "Live au Baiser Salé — Paris",                      id: "bNKdNOMM9Ro" },
];

export default function MusiquePage() {
  return (
    <>
      <ScrollProgress />

      <PageHero
        label="Écouter"
        title="L'EP Soleil"
        titleItalic="& le live"
        subtitle="Plongez dans l'univers afro-jazz, soul créole et latino de Karma Timal — EP Soleil sur Spotify, extraits live au Baiser Salé et concerts en plein air."
        accent="true"
      />

      {/* ── Spotify ── */}
      <section className="py-section bg-noir">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <RevealText delay={0.1}>
                <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-4">Écouter maintenant</p>
              </RevealText>
              <RevealText delay={0.2}>
                <h2 className="font-serif text-display-sm text-creme mb-6">
                  Disponible sur <em className="text-or">Spotify</em>
                </h2>
              </RevealText>
              <RevealText delay={0.35}>
                <p className="text-sable/50 text-sm leading-relaxed tracking-wide mb-8">
                  Retrouvez toute la discographie de Karma Timal sur Spotify —
                  albums, EPs, singles et playlists thématiques.
                </p>
              </RevealText>
              <RevealText delay={0.45}>
                <a
                  href="https://open.spotify.com/artist/3x7cNgI4IzjqYPVj2DI7w0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Ouvrir sur Spotify
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M8 2l6 6-6 6M2 8h12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </RevealText>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <iframe
                src="https://open.spotify.com/embed/artist/3x7cNgI4IzjqYPVj2DI7w0?utm_source=generator&theme=0"
                width="100%"
                height="420"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Karma Timal sur Spotify"
                className="border border-or/10"
                style={{ borderRadius: 12 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mid-page Booking CTA ── */}
      <BookingCTA />

      {/* ── Live videos ── */}
      <section className="py-section bg-noir">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="mb-14">
            <RevealText delay={0.1}>
              <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-4">Sessions Live</p>
            </RevealText>
            <RevealText delay={0.2}>
              <h2 className="font-serif text-display-sm text-creme">
                Vidéos <em className="text-or">Live</em>
              </h2>
            </RevealText>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {liveVideos.map((video, i) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-3"
              >
                <div className="relative aspect-video bg-noir-3 overflow-hidden border border-or/10">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0&showinfo=0&color=white&iv_load_policy=3`}
                    title={video.title}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                  />
                </div>
                <p className="text-sable/60 text-xs tracking-wide leading-snug">{video.title}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-10 text-center"
          >
            <a
              href="https://www.youtube.com/@karmatimaleri1563"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Voir toutes les vidéos sur YouTube
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Maillage interne ── */}
      <RelatedLinks
        title="Aller plus loin"
        intro="La musique n'est qu'une partie du voyage. Découvrez l'univers de Karma Timal, ses prochaines dates de concert et ses archives en images."
        links={[
          {
            eyebrow: "L'artiste",
            href: "/univers",
            label: "Découvrez l'univers de Karma Timal",
            description: "Sa biographie, sa vision artistique, le sens caché derrière chaque chanson afro-jazz.",
          },
          {
            eyebrow: "La scène",
            href: "/concerts",
            label: "Voir les prochains concerts à Paris",
            description: "Live au Baiser Salé, festivals d'été — toutes les dates à venir de Karma Timal.",
          },
          {
            eyebrow: "Réserver",
            href: "/booking",
            label: "Faire venir Karma Timal sur votre scène",
            description: "Demande de devis pour concert, festival, mariage, soirée privée — réponse sous 48h.",
          },
        ]}
      />
    </>
  );
}
