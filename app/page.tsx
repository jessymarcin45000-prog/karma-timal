import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import StorySection from "@/components/sections/StorySection";

// ─────────────────────────────────────────────────────────────────────────────
// Lazy-load des sections sous-le-fold — chargées au scroll (≈40% bundle initial
// économisé sur la 1ʳᵉ peinture). SSR conservé pour le SEO.
// ─────────────────────────────────────────────────────────────────────────────
const MusicSection      = dynamic(() => import("@/components/sections/MusicSection"));
const LiveExperience    = dynamic(() => import("@/components/sections/LiveExperience"));
const GalleryPreview    = dynamic(() => import("@/components/sections/GalleryPreview"));
const ConcertDates      = dynamic(() => import("@/components/sections/ConcertDates"));
const BookingCTA        = dynamic(() => import("@/components/sections/BookingCTA"));
const SocialSection     = dynamic(() => import("@/components/sections/SocialSection"));
const ScrollProgress    = dynamic(() => import("@/components/ui/ScrollProgress"), { ssr: false });
const FloatingBookingCTA= dynamic(() => import("@/components/ui/FloatingBookingCTA"), { ssr: false });

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <StorySection />
      <MusicSection />
      <LiveExperience />
      <GalleryPreview />
      <ConcertDates />
      <BookingCTA />
      <SocialSection />
      <FloatingBookingCTA />
    </>
  );
}
