"use client";

import Link from "next/link";
import PageHero from "@/components/PageHero";
import RevealText from "@/components/ui/RevealText";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function ConfidentialitePage() {
  return (
    <>
      <ScrollProgress />

      <PageHero
        label="RGPD"
        title="Politique de"
        titleItalic="confidentialité"
        subtitle="Comment vos données sont collectées, utilisées et protégées sur karmatimal.com."
      />

      <section className="py-section bg-noir relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col gap-12">

            {/* Préambule */}
            <RevealText>
              <article className="border-l border-or/20 pl-6">
                <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-4">
                  Préambule
                </p>
                <div className="text-sable/70 text-sm leading-relaxed tracking-wide space-y-3">
                  <p>
                    Karma Timal accorde une importance particulière au respect
                    de votre vie privée. La présente politique de
                    confidentialité explique quelles données sont collectées,
                    pour quelles finalités, sur quelles bases légales et de
                    quels droits vous disposez, conformément au Règlement (UE)
                    2016/679 dit <strong>RGPD</strong> et à la loi française
                    « Informatique et Libertés ».
                  </p>
                </div>
              </article>
            </RevealText>

            {/* Responsable */}
            <RevealText delay={0.1}>
              <article className="border-l border-or/20 pl-6">
                <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-4">
                  Responsable du traitement
                </p>
                <div className="text-sable/70 text-sm leading-relaxed tracking-wide space-y-2">
                  <p>
                    <span className="text-creme">Jessy Lubin Marcin</span> —
                    exerçant sous le nom commercial Karma Timal.
                  </p>
                  <p>
                    Entreprise individuelle (micro-entreprise) — SIRET{" "}
                    <span className="text-creme">877 485 896 00022</span>
                  </p>
                  <p>231 rue Saint-Honoré, 75001 Paris, France</p>
                  <p>
                    Contact :{" "}
                    <a
                      href="mailto:booking@karmatimal.com"
                      className="text-creme hover:text-or transition-colors"
                    >
                      booking@karmatimal.com
                    </a>
                    {" · "}
                    <a
                      href="tel:+33603436014"
                      className="text-creme hover:text-or transition-colors"
                    >
                      06 03 43 60 14
                    </a>
                  </p>
                </div>
              </article>
            </RevealText>

            {/* Données collectées */}
            <RevealText delay={0.15}>
              <article className="border-l border-or/20 pl-6">
                <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-4">
                  Données collectées
                </p>
                <div className="text-sable/70 text-sm leading-relaxed tracking-wide space-y-4">
                  <div>
                    <p className="text-creme font-medium mb-1">
                      Formulaire de booking
                    </p>
                    <p>
                      Nom, prénom, adresse e-mail, numéro de téléphone, société
                      éventuelle, type d&apos;événement, date et lieu envisagés,
                      budget, message.
                    </p>
                  </div>
                  <div>
                    <p className="text-creme font-medium mb-1">
                      Contact direct (e-mail, téléphone, WhatsApp)
                    </p>
                    <p>
                      Coordonnées que vous nous communiquez librement à
                      l&apos;occasion de votre prise de contact.
                    </p>
                  </div>
                  <div>
                    <p className="text-creme font-medium mb-1">
                      Données techniques
                    </p>
                    <p>
                      Aucune donnée de navigation n&apos;est collectée par ce
                      site à des fins statistiques ou publicitaires. Aucun
                      cookie tiers de mesure d&apos;audience (Google Analytics,
                      Meta, etc.) n&apos;est déposé.
                    </p>
                  </div>
                </div>
              </article>
            </RevealText>

            {/* Finalités */}
            <RevealText delay={0.2}>
              <article className="border-l border-or/20 pl-6">
                <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-4">
                  Finalités &amp; bases légales
                </p>
                <ul className="text-sable/70 text-sm leading-relaxed tracking-wide space-y-3 list-none">
                  <li>
                    <span className="text-creme">·</span> Répondre à vos
                    demandes de réservation ou prises de contact —{" "}
                    <em>base légale : exécution de mesures précontractuelles à votre demande</em>.
                  </li>
                  <li>
                    <span className="text-creme">·</span> Établir des devis et
                    formaliser des prestations artistiques —{" "}
                    <em>base légale : exécution du contrat</em>.
                  </li>
                  <li>
                    <span className="text-creme">·</span> Conserver l&apos;historique
                    des échanges à des fins de preuve —{" "}
                    <em>base légale : intérêt légitime</em>.
                  </li>
                </ul>
              </article>
            </RevealText>

            {/* Durée */}
            <RevealText delay={0.25}>
              <article className="border-l border-or/20 pl-6">
                <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-4">
                  Durées de conservation
                </p>
                <ul className="text-sable/70 text-sm leading-relaxed tracking-wide space-y-2 list-none">
                  <li>
                    <span className="text-creme">·</span> Demandes sans suite : 12 mois à compter du dernier contact.
                  </li>
                  <li>
                    <span className="text-creme">·</span> Prestations
                    confirmées : durée du contrat puis archivage légal de 5 ans
                    (Code de commerce).
                  </li>
                  <li>
                    <span className="text-creme">·</span> Données comptables : 10 ans (Code de commerce).
                  </li>
                </ul>
              </article>
            </RevealText>

            {/* Destinataires */}
            <RevealText delay={0.3}>
              <article className="border-l border-or/20 pl-6">
                <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-4">
                  Destinataires
                </p>
                <p className="text-sable/70 text-sm leading-relaxed tracking-wide">
                  Vos données sont strictement destinées à Karma Timal et à
                  son équipe de gestion (booking, comptabilité). Aucune donnée
                  n&apos;est revendue à des tiers ni utilisée à des fins
                  marketing externes.
                </p>
              </article>
            </RevealText>

            {/* Contenus tiers */}
            <RevealText delay={0.35}>
              <article className="border-l border-or/20 pl-6">
                <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-4">
                  Contenus intégrés (cookies tiers)
                </p>
                <div className="text-sable/70 text-sm leading-relaxed tracking-wide space-y-3">
                  <p>
                    Ce site intègre des contenus en provenance de plateformes
                    tierces qui peuvent déposer leurs propres cookies dès lors
                    que vous les lisez :
                  </p>
                  <ul className="space-y-1 list-none">
                    <li>
                      <span className="text-creme">·</span> <strong>Spotify</strong> (lecteur musical) —{" "}
                      <a
                        href="https://www.spotify.com/legal/privacy-policy/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-or/50 underline-offset-4 hover:text-or transition-colors"
                      >
                        Politique Spotify
                      </a>
                    </li>
                    <li>
                      <span className="text-creme">·</span> <strong>YouTube</strong> (vidéos live) —{" "}
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-or/50 underline-offset-4 hover:text-or transition-colors"
                      >
                        Politique Google
                      </a>
                    </li>
                    <li>
                      <span className="text-creme">·</span> <strong>WhatsApp</strong> (bouton de contact) —{" "}
                      <a
                        href="https://www.whatsapp.com/legal/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-or/50 underline-offset-4 hover:text-or transition-colors"
                      >
                        Politique WhatsApp
                      </a>
                    </li>
                  </ul>
                  <p>
                    Le mode &laquo; vie privée renforcée &raquo; est activé sur les
                    vidéos YouTube (domaine youtube-nocookie.com) pour limiter
                    le suivi. Vous pouvez refuser ces contenus depuis la
                    bannière cookies affichée à votre première visite.
                  </p>
                </div>
              </article>
            </RevealText>

            {/* Droits */}
            <RevealText delay={0.4}>
              <article className="border-l border-or/20 pl-6">
                <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-4">
                  Vos droits
                </p>
                <div className="text-sable/70 text-sm leading-relaxed tracking-wide space-y-3">
                  <p>
                    Conformément au RGPD, vous disposez d&apos;un droit
                    d&apos;accès, de rectification, d&apos;effacement, de
                    limitation, d&apos;opposition et de portabilité concernant
                    vos données personnelles.
                  </p>
                  <p>
                    Pour exercer ces droits, écrivez à :{" "}
                    <a
                      href="mailto:booking@karmatimal.com"
                      className="text-creme hover:text-or transition-colors"
                    >
                      booking@karmatimal.com
                    </a>
                    . Une réponse vous sera apportée dans un délai d&apos;un mois.
                  </p>
                  <p>
                    Si vous estimez, après nous avoir contactés, que vos droits
                    « Informatique et Libertés » ne sont pas respectés, vous
                    pouvez adresser une réclamation à la CNIL :{" "}
                    <a
                      href="https://www.cnil.fr/fr/plaintes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-or/50 underline-offset-4 hover:text-or transition-colors"
                    >
                      cnil.fr
                    </a>
                    .
                  </p>
                </div>
              </article>
            </RevealText>

            {/* Sécurité */}
            <RevealText delay={0.45}>
              <article className="border-l border-or/20 pl-6">
                <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-4">
                  Sécurité
                </p>
                <p className="text-sable/70 text-sm leading-relaxed tracking-wide">
                  Les échanges sont chiffrés via HTTPS (TLS). L&apos;accès aux
                  données est limité aux personnes strictement habilitées.
                </p>
              </article>
            </RevealText>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 border-t border-or/10">
              <p className="text-sable/30 text-xs tracking-widest uppercase">
                Dernière mise à jour : mai 2026
              </p>
              <Link
                href="/mentions-legales"
                className="text-or hover:text-creme text-xs tracking-widest uppercase transition-colors"
              >
                Mentions légales →
              </Link>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
