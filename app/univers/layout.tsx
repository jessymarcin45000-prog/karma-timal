import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "L'univers de Karma Timal — Chanteur, guitariste, performer afro-jazz",
  description:
    "Chanteur, guitariste et performer à l'univers solaire et métissé. Entre Afro Jazz Caribéen, sonorités créoles, latino, soul et touches hip-hop — découvrez la biographie et la vision artistique de Karma Timal.",
  alternates: { canonical: "/univers" },
  openGraph: {
    title: "L'univers de Karma Timal — Afro-jazz, créole et soul",
    description:
      "Biographie complète de Karma Timal, chanteur et guitariste basé à Paris. Une musique vivante où la voix, la guitare et le rythme ne font qu'un.",
    url: "/univers",
    type: "profile",
  },
};

export default function UniversLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
