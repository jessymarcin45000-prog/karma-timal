import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Karma Timal — Réserver un concert, festival ou soirée privée",
  description:
    "Réservez Karma Timal pour votre concert, festival, mariage, événement corporate ou soirée privée. Solo, duo, trio — disponible en France et à l'international. Devis sous 48h.",
  alternates: { canonical: "/booking" },
  openGraph: {
    title: "Réserver Karma Timal pour votre événement",
    description:
      "Concert, festival, mariage, soirée privée — formules sur-mesure pour faire vibrer votre événement. Contact direct par email, téléphone ou WhatsApp.",
    url: "/booking",
    type: "website",
  },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
