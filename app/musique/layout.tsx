import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "La musique de Karma Timal — EP Soleil, live au Baiser Salé",
  description:
    "Écoutez la musique de Karma Timal : EP Soleil (2023), extraits de concert live au Baiser Salé Paris. Afro-jazz caribéen, soul créole, beatbox et looper sur Spotify.",
  alternates: { canonical: "/musique" },
  openGraph: {
    title: "La musique de Karma Timal sur Spotify & YouTube",
    description:
      "EP Soleil, extraits live au Baiser Salé — l'univers afro-jazz caribéen et soul créole de Karma Timal.",
    url: "/musique",
    type: "website",
  },
};

export default function MusiqueLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
