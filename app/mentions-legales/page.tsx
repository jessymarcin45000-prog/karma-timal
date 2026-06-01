"use client";

import PageHero from "@/components/PageHero";
import RevealText from "@/components/ui/RevealText";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function MentionsLegalesPage() {
  return (
    <>
      <ScrollProgress />

      <PageHero
        label="Informations"
        title="Mentions"
        titleItalic="légales"
        subtitle="Informations éditoriales et coordonnées conformément à la loi française."
      />

      <section className="py-section bg-noir relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col gap-12">

            {/* Éditeur */}
            <RevealText>
              <article className="border-l border-or/20 pl-6">
                <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-4">
                  Éditeur du site
                </p>
                <h2 className="font-serif text-2xl text-creme mb-4">
                  Karma Timal
                </h2>
                <div className="text-sable/70 text-sm leading-relaxed tracking-wide space-y-2">
                  <p>
                    Nom commercial :{" "}
                    <span className="text-creme">Karma Timal</span> — artiste
                    musicien, auteur, compositeur, interprète.
                  </p>
                  <p>
                    Représentant légal :{" "}
                    <span className="text-creme">Jessy Lubin Marcin</span>
                  </p>
                  <p>
                    Statut juridique :{" "}
                    <span className="text-creme">
                      Entreprise individuelle — micro-entreprise (auto-entrepreneur)
                    </span>
                  </p>
                  <p>
                    Activité :{" "}
                    <span className="text-creme">
                      Arts du spectacle vivant — code APE/NAF 9001Z
                    </span>
                  </p>
                  <p>
                    Adresse du siège :{" "}
                    <span className="text-creme">
                      231 rue Saint-Honoré, 75001 Paris, France
                    </span>
                  </p>
                  <p>
                    SIRET :{" "}
                    <span className="text-creme">877 485 896 00022</span>
                    {" · "}
                    SIREN :{" "}
                    <span className="text-creme">877 485 896</span>
                  </p>
                  <p>
                    Immatriculation :{" "}
                    <span className="text-creme">01/04/2026</span>
                  </p>
                  <p className="text-sable/50 italic">
                    TVA non applicable, article 293 B du Code général des impôts.
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-or/10 text-sable/70 text-sm leading-relaxed tracking-wide space-y-1">
                  <p>
                    Contact :{" "}
                    <a
                      href="mailto:booking@karmatimal.com"
                      className="text-creme hover:text-or transition-colors"
                    >
                      booking@karmatimal.com
                    </a>
                  </p>
                  <p>
                    Téléphone :{" "}
                    <a
                      href="tel:+33603436014"
                      className="text-creme hover:text-or transition-colors"
                    >
                      06 03 43 60 14
                    </a>
                  </p>
                  <p>
                    WhatsApp :{" "}
                    <a
                      href="https://wa.me/33603436014"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-creme hover:text-or transition-colors"
                    >
                      +33 6 03 43 60 14
                    </a>
                  </p>
                </div>
              </article>
            </RevealText>

            {/* Directeur de publication */}
            <RevealText delay={0.1}>
              <article className="border-l border-or/20 pl-6">
                <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-4">
                  Directeur de la publication
                </p>
                <p className="text-sable/70 text-sm leading-relaxed tracking-wide">
                  <span className="text-creme">Jessy Lubin Marcin</span>, en sa
                  qualité d&apos;artiste éditeur du présent site.
                </p>
              </article>
            </RevealText>

            {/* Hébergeur */}
            <RevealText delay={0.15}>
              <article className="border-l border-or/20 pl-6">
                <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-4">
                  Hébergeur
                </p>
                <div className="text-sable/70 text-sm leading-relaxed tracking-wide space-y-1">
                  <p>Vercel Inc.</p>
                  <p>440 N Barranca Ave #4133, Covina, CA 91723, USA</p>
                  <p>
                    Site :{" "}
                    <a
                      href="https://vercel.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-creme hover:text-or transition-colors"
                    >
                      vercel.com
                    </a>
                  </p>
                </div>
                <p className="text-sable/40 text-xs italic mt-4">
                  * À adapter si le site est hébergé ailleurs (OVH, Netlify,
                  etc.).
                </p>
              </article>
            </RevealText>

            {/* Propriété intellectuelle */}
            <RevealText delay={0.2}>
              <article className="border-l border-or/20 pl-6">
                <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-4">
                  Propriété intellectuelle
                </p>
                <div className="text-sable/70 text-sm leading-relaxed tracking-wide space-y-3">
                  <p>
                    L&apos;ensemble du contenu de ce site (textes, photographies,
                    musiques, vidéos, logos, identité visuelle) est la propriété
                    exclusive de Karma Timal ou de ses ayants droit. Toute
                    reproduction, représentation, modification ou exploitation,
                    totale ou partielle, sans autorisation écrite préalable est
                    strictement interdite et constitue une contrefaçon
                    sanctionnée par les articles L.335-2 et suivants du Code de
                    la propriété intellectuelle.
                  </p>
                  <p>
                    Les marques tierces (Spotify, YouTube, Instagram, TikTok,
                    WhatsApp) appartiennent à leurs propriétaires respectifs.
                  </p>
                </div>
              </article>
            </RevealText>

            {/* Crédits */}
            <RevealText delay={0.25}>
              <article className="border-l border-or/20 pl-6">
                <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-4">
                  Crédits
                </p>
                <div className="text-sable/70 text-sm leading-relaxed tracking-wide space-y-2">
                  <p>Conception et développement : projet Karma Timal.</p>
                  <p>
                    Photographies : Karma Timal et photographes contributeurs —
                    tous droits réservés.
                  </p>
                  <p>
                    Typographies : Playfair Display et Inter (Google Fonts).
                  </p>
                </div>
              </article>
            </RevealText>

            {/* Responsabilité */}
            <RevealText delay={0.3}>
              <article className="border-l border-or/20 pl-6">
                <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-4">
                  Limitation de responsabilité
                </p>
                <p className="text-sable/70 text-sm leading-relaxed tracking-wide">
                  Karma Timal s&apos;efforce d&apos;assurer l&apos;exactitude et
                  la mise à jour des informations diffusées sur ce site. Toutefois,
                  l&apos;éditeur ne peut être tenu responsable des erreurs,
                  omissions ou interruptions de service indépendantes de sa
                  volonté. Les liens vers des sites externes (Spotify, YouTube,
                  Le Baiser Salé, etc.) sont fournis à titre informatif ;
                  l&apos;éditeur n&apos;est pas responsable du contenu de ces
                  sites.
                </p>
              </article>
            </RevealText>

            {/* Loi applicable */}
            <RevealText delay={0.35}>
              <article className="border-l border-or/20 pl-6">
                <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-4">
                  Loi applicable
                </p>
                <p className="text-sable/70 text-sm leading-relaxed tracking-wide">
                  Les présentes mentions légales sont soumises au droit
                  français. Tout litige relatif au site relève de la
                  compétence des tribunaux français.
                </p>
              </article>
            </RevealText>

            <p className="text-sable/30 text-xs tracking-widest uppercase pt-8 border-t border-or/10">
              Dernière mise à jour : mai 2026
            </p>

          </div>
        </div>
      </section>
    </>
  );
}
