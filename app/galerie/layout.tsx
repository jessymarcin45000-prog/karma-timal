import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galerie photo de Karma Timal — Scène, portraits & coulisses",
  description:
    "Galerie photo de Karma Timal : performances live au Baiser Salé, séances éditoriales, portraits en wax africain et photos de scène à Paris.",
  alternates: { canonical: "/galerie" },
  openGraph: {
    title: "La galerie photo de Karma Timal",
    description:
      "Live, séances studio, coulisses et portraits — l'identité visuelle du chanteur afro-jazz Karma Timal.",
    url: "/galerie",
    type: "website",
  },
};

export default function GalerieLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
