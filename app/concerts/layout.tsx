import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concerts de Karma Timal — Dates à Paris, festivals & soirées privées",
  description:
    "Retrouvez les prochains concerts de Karma Timal : live au Baiser Salé, festivals de jazz, soirées privées et événements en France. Réservez votre place ou bookez l'artiste.",
  alternates: { canonical: "/concerts" },
  openGraph: {
    title: "Les concerts à venir de Karma Timal",
    description:
      "Festivals, clubs de jazz, soirées privées, hôtels & resorts — toutes les dates de concert du chanteur afro-jazz Karma Timal.",
    url: "/concerts",
    type: "website",
  },
};

export default function ConcertsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
