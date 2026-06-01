import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollRestoration from "@/components/ui/ScrollRestoration";

// ─────────────────────────────────────────────────────────────────────────────
// Lazy-load des composants flottants — invisibles au premier rendu, chargés
// uniquement après hydratation. Réduit ~8 kB sur le bundle initial.
// ─────────────────────────────────────────────────────────────────────────────
const FloatingWhatsApp = dynamic(() => import("@/components/ui/FloatingWhatsApp"), {
  ssr: false,
  loading: () => null,
});
const CookieBanner = dynamic(() => import("@/components/ui/CookieBanner"), {
  ssr: false,
  loading: () => null,
});
const MobileActionBar = dynamic(() => import("@/components/ui/MobileActionBar"), {
  ssr: false,
  loading: () => null,
});
const BackToTop = dynamic(() => import("@/components/ui/BackToTop"), {
  ssr: false,
  loading: () => null,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  preload: true,
  // Fallback system font pendant le téléchargement (évite FOIT)
  fallback: ["Georgia", "ui-serif", "serif"],
  adjustFontFallback: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
  // Permet le zoom utilisateur (a11y) tout en démarrant à scale 1
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  // Support iPhone notch / Dynamic Island
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://karmatimal.com"),
  title: {
    default: "Karma Timal — Chanteur, guitariste afro-jazz à Paris | Live, Booking",
    template: "%s | Karma Timal",
  },
  description:
    "Karma Timal — chanteur, guitariste et performer afro-jazz à Paris. Concerts, festivals, soirées privées, événements corporate. Réservez en direct l'artiste à l'univers solaire et métissé.",
  keywords: [
    "Karma Timal",
    "musicien afro-jazz",
    "chanteur créole",
    "soul jazz",
    "concert Paris",
    "festival Caraïbes",
    "booking musicien",
    "artiste afro-caribéen",
    "live music",
    "jazz organique",
  ],
  authors: [{ name: "Karma Timal" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Karma Timal",
    title: "Karma Timal | Musicien Afro-Jazz · L'âme du monde en musique",
    description:
      "Né entre les rythmes créoles et l'élégance parisienne, Karma Timal transporte les âmes à travers une musique vivante, organique et universelle.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Karma Timal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karma Timal | Musicien Afro-Jazz",
    description:
      "L'âme du monde en musique. Concerts, bookings et univers musical de Karma Timal.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
  // Empêche les apps natives iOS/Android d'extraire des numéros
  formatDetection: { telephone: false, email: false, address: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/* ── Preconnect tiers — accélère le chargement Spotify/YouTube ── */}
        <link rel="preconnect" href="https://open.spotify.com" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://i.scdn.co" />
        <link rel="dns-prefetch" href="https://wa.me" />
      </head>
      <body className="bg-noir text-creme font-sans antialiased">
        {/* Remet le scroll en haut à chaque changement de route — Suspense
            requis car ScrollRestoration utilise useSearchParams() */}
        <Suspense fallback={null}>
          <ScrollRestoration />
        </Suspense>
        <Navigation />
        <main className="page-enter pb-[88px] md:pb-0">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <BackToTop />
        <MobileActionBar />
        <CookieBanner />
      </body>
    </html>
  );
}
