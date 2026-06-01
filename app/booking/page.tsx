"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import RevealText from "@/components/ui/RevealText";
import ScrollProgress from "@/components/ui/ScrollProgress";
import RelatedLinks from "@/components/ui/RelatedLinks";
import SafeMarkup from "@/components/ui/SafeMarkup";
import { submitBooking } from "./actions";

const eventTypes = [
  "Concert en salle",
  "Festival",
  "Soirée privée / Mariage",
  "Hôtel & Resort",
  "Événement corporate",
  "Cocktail & Réception",
  "Autre",
];

const budgets = [
  "< 1 000 €",
  "1 000 – 3 000 €",
  "3 000 – 8 000 €",
  "8 000 € et plus",
  "À discuter",
];

export default function BookingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [pending, startTransition] = useTransition();

  // Honeypot + timer — populated client-side, validated server-side.
  const formMountedAt = useRef<number>(0);
  useEffect(() => {
    formMountedAt.current = Date.now();
  }, []);

  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "",
    eventType: "", eventDate: "", eventLocation: "",
    budget: "", guestCount: "", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear field-level error on edit.
    setFieldErrors((prev) => {
      if (!prev[e.target.name]) return prev;
      const next = { ...prev };
      delete next[e.target.name];
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);
    setFieldErrors({});
    if (!consent) {
      setFieldErrors({ consent: "Le consentement RGPD est obligatoire." });
      return;
    }
    const fd = new FormData(e.currentTarget);
    fd.set("elapsed", String(Date.now() - (formMountedAt.current || Date.now())));
    fd.set("consent", consent ? "on" : "");

    startTransition(async () => {
      try {
        const result = await submitBooking(fd);
        if (!result.ok) {
          if (result.errors?._root) setServerError(result.errors._root);
          if (result.errors) {
            const { _root, ...rest } = result.errors;
            void _root;
            setFieldErrors(rest);
          }
          return;
        }
        setSubmitted(true);
      } catch {
        setServerError("Une erreur est survenue. Réessayez ou écrivez-nous directement.");
      }
    });
  };

  return (
    <>
      <ScrollProgress />

      <PageHero
        label="Booking"
        title="Réserver"
        titleItalic="Karma Timal"
        subtitle="Concerts, festivals, événements privés, hôtels — chaque prestation est une expérience musicale unique et sur-mesure."
        accent="true"
      />

      {/* ── Why book ── */}
      <section className="py-section-sm bg-noir">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-or/10">
            {[
              { icon: "◎", title: "Sur-mesure",   body: "Chaque prestation est adaptée à votre événement, votre ambiance et vos invités." },
              { icon: "◈", title: "Professionnel", body: "12 ans de scène, ponctualité, fiabilité, matériel professionnel disponible." },
              { icon: "◬", title: "Mémorable",    body: "Un moment que vos invités n&apos;oublieront pas. La musique comme expérience totale." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-noir p-8 text-center flex flex-col items-center gap-3"
              >
                <span className="text-or text-3xl">{item.icon}</span>
                <h3 className="text-creme text-sm font-medium tracking-wide">{item.title}</h3>
                <SafeMarkup
                  as="p"
                  className="text-sable/40 text-xs leading-relaxed tracking-wide"
                >
                  {item.body}
                </SafeMarkup>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Contact ── */}
      <section className="py-section bg-noir-2">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">

            {/* ── Form ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-10">
                <RevealText delay={0.1}>
                  <p className="text-or text-[10px] tracking-[0.5em] uppercase mb-4">Formulaire de contact</p>
                </RevealText>
                <RevealText delay={0.2}>
                  <h2 className="font-serif text-display-sm text-creme">
                    Parlez-nous de<br />
                    votre <em className="text-or">projet</em>
                  </h2>
                </RevealText>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border border-or/30 p-10 text-center"
                >
                  <span className="text-or text-4xl block mb-4">✦</span>
                  <h3 className="font-serif text-2xl text-creme mb-3">Message envoyé</h3>
                  <p className="text-sable/50 text-sm leading-relaxed max-w-sm mx-auto">
                    Merci pour votre demande. Karma Timal vous répondra dans les 48h pour discuter de votre projet.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-or text-xs tracking-widest uppercase hover:text-or-light transition-colors"
                  >
                    Envoyer un autre message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                  {/* ── Honeypot — invisible to humans, tempting for bots ── */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      width: 0,
                      height: 0,
                      opacity: 0,
                      pointerEvents: "none",
                    }}
                    defaultValue=""
                  />
                  {/* Hidden timer field — server validates min elapsed time. */}
                  <input type="hidden" name="elapsed" value="" readOnly />

                  {serverError && (
                    <div
                      role="alert"
                      className="border border-red-500/30 bg-red-500/10 text-red-200 text-sm px-4 py-3"
                    >
                      {serverError}
                    </div>
                  )}

                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] tracking-widest uppercase text-sable/40">
                        Nom complet *
                      </label>
                      <input
                        required
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jean Dupont"
                        className="input-premium"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] tracking-widest uppercase text-sable/40">
                        Email *
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jean@exemple.com"
                        className="input-premium"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] tracking-widest uppercase text-sable/40">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+33 6 12 34 56 78"
                        className="input-premium"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] tracking-widest uppercase text-sable/40">
                        Structure / Entreprise
                      </label>
                      <input
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Nom de votre structure"
                        className="input-premium"
                      />
                    </div>
                  </div>

                  {/* Event type */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] tracking-widest uppercase text-sable/40">
                      Type d&apos;événement *
                    </label>
                    <select
                      required
                      name="eventType"
                      value={form.eventType}
                      onChange={handleChange}
                      className="input-premium appearance-none cursor-pointer bg-noir"
                    >
                      <option value="" disabled>Sélectionner un type</option>
                      {eventTypes.map((t) => (
                        <option key={t} value={t} className="bg-noir">{t}</option>
                      ))}
                    </select>
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] tracking-widest uppercase text-sable/40">
                        Date envisagée *
                      </label>
                      <input
                        required
                        type="date"
                        name="eventDate"
                        value={form.eventDate}
                        onChange={handleChange}
                        className="input-premium [color-scheme:dark]"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] tracking-widest uppercase text-sable/40">
                        Lieu / Ville
                      </label>
                      <input
                        name="eventLocation"
                        value={form.eventLocation}
                        onChange={handleChange}
                        placeholder="Paris, Nice, Fort-de-France..."
                        className="input-premium"
                      />
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] tracking-widest uppercase text-sable/40">
                        Budget estimé
                      </label>
                      <select
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        className="input-premium appearance-none cursor-pointer bg-noir"
                      >
                        <option value="" disabled>Sélectionner</option>
                        {budgets.map((b) => (
                          <option key={b} value={b} className="bg-noir">{b}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] tracking-widest uppercase text-sable/40">
                        Nombre d&apos;invités
                      </label>
                      <input
                        type="number"
                        name="guestCount"
                        value={form.guestCount}
                        onChange={handleChange}
                        placeholder="ex. 150"
                        className="input-premium"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] tracking-widest uppercase text-sable/40">
                      Décrivez votre projet *
                    </label>
                    <textarea
                      required
                      rows={5}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Ambiance souhaitée, format du concert (duo, trio, big band), exigences techniques, vision artistique..."
                      className="textarea-premium"
                    />
                  </div>

                  {/* RGPD consent */}
                  <label className="flex items-start gap-3 mt-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 accent-or border-or/40 bg-transparent shrink-0"
                    />
                    <span className="text-sable/60 text-xs leading-relaxed tracking-wide group-hover:text-sable/80 transition-colors">
                      J&apos;accepte que mes informations soient utilisées
                      uniquement pour répondre à ma demande. Aucune revente à
                      des tiers. Je peux à tout moment exercer mes droits
                      d&apos;accès, de rectification et d&apos;effacement
                      conformément au RGPD —{" "}
                      <Link
                        href="/confidentialite"
                        className="underline decoration-or/50 underline-offset-4 hover:text-or transition-colors"
                      >
                        en savoir plus
                      </Link>
                      .
                    </span>
                  </label>

                  {fieldErrors.consent && (
                    <p className="text-red-300 text-xs mt-1">{fieldErrors.consent}</p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={!consent || pending}
                    className="btn-primary w-fit mt-2 disabled:opacity-40 disabled:cursor-not-allowed"
                    whileHover={consent && !pending ? { scale: 1.02 } : undefined}
                    whileTap={consent && !pending ? { scale: 0.98 } : undefined}
                  >
                    {pending ? "Envoi en cours…" : "Envoyer la demande"}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* ── Sidebar contact ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-8 lg:sticky lg:top-32"
            >
              {/* Direct contact */}
              <div className="border border-or/15 p-7 flex flex-col gap-5">
                <p className="text-or text-[10px] tracking-[0.4em] uppercase">Contact direct</p>

                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-sable/30 text-[9px] tracking-widest uppercase mb-1">Email booking</p>
                    <a
                      href="mailto:booking@karmatimal.com"
                      className="text-creme text-sm hover:text-or transition-colors duration-200 tracking-wide"
                    >
                      booking@karmatimal.com
                    </a>
                  </div>
                  <div>
                    <p className="text-sable/30 text-[9px] tracking-widest uppercase mb-1">Téléphone</p>
                    <a
                      href="tel:+33603436014"
                      className="text-creme text-sm hover:text-or transition-colors duration-200 tracking-wide"
                    >
                      06 03 43 60 14
                    </a>
                  </div>
                  <div>
                    <p className="text-sable/30 text-[9px] tracking-widest uppercase mb-1">WhatsApp · Réponse rapide</p>
                    <a
                      href="https://wa.me/33603436014?text=Bonjour%20Karma%2C%20je%20vous%20contacte%20depuis%20votre%20site%20pour%20un%20projet%20de%20concert."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-creme text-sm hover:text-[#25D366] transition-colors duration-200 tracking-wide"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      Discuter maintenant
                    </a>
                  </div>
                  <div>
                    <p className="text-sable/30 text-[9px] tracking-widest uppercase mb-1">Localisation</p>
                    <p className="text-creme text-sm tracking-wide">Paris, France</p>
                    <p className="text-sable/30 text-xs mt-0.5">Disponible partout en France &amp; Caraïbes</p>
                  </div>
                </div>
              </div>

              {/* Rider / Tech */}
              <div className="border border-or/15 p-7 flex flex-col gap-4">
                <p className="text-or text-[10px] tracking-[0.4em] uppercase">Informations techniques</p>
                <ul className="flex flex-col gap-2">
                  {[
                    "Formules : Solo, Duo, Trio, Quintet, Big Band",
                    "Rider technique disponible sur demande",
                    "Sono et matériel fourni (optionnel)",
                    "Déplacement France entière + Outremer",
                    "Réponse sous 48h ouvrées",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sable/50 text-xs tracking-wide">
                      <span className="text-or mt-0.5 flex-shrink-0">◇</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quote */}
              <div className="border-l-2 border-or/40 pl-5">
                <p className="font-serif italic text-creme/60 text-sm leading-relaxed">
                  &ldquo;Chaque concert commence par une conversation. Dites-moi votre vision, je construirai un moment inoubliable.&rdquo;
                </p>
                <cite className="text-or/40 text-[9px] tracking-widest uppercase not-italic mt-3 block">
                  — Karma Timal
                </cite>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Maillage interne ── */}
      <RelatedLinks
        title="Avant de réserver"
        intro="Découvrez la musique, l'univers et les dates de concert de Karma Timal pour préparer votre demande."
        links={[
          {
            eyebrow: "Écouter",
            href: "/musique",
            label: "La musique de Karma Timal",
            description: "EP Soleil et extraits live — pour cerner le son afro-jazz, soul et hip-hop de l'artiste.",
          },
          {
            eyebrow: "L'artiste",
            href: "/univers",
            label: "L'univers et la biographie",
            description: "De Paris aux Antilles — la vision artistique et le parcours du chanteur-guitariste.",
          },
          {
            eyebrow: "Voir",
            href: "/concerts",
            label: "Les prochains concerts",
            description: "Festivals, clubs de jazz, soirées privées — les dates à venir de Karma Timal.",
          },
        ]}
      />
    </>
  );
}
