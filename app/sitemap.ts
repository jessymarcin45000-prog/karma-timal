import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://karmatimal.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Priorités SEO : home et booking = page de conversion ; pages contenu = secondaires
  const routes: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { path: "/",                  priority: 1.0, changeFrequency: "weekly" },
    { path: "/univers",           priority: 0.9, changeFrequency: "monthly" },
    { path: "/musique",           priority: 0.9, changeFrequency: "weekly" },
    { path: "/concerts",          priority: 0.95, changeFrequency: "weekly" },
    { path: "/galerie",           priority: 0.7, changeFrequency: "monthly" },
    { path: "/booking",           priority: 0.9, changeFrequency: "monthly" },
    { path: "/mentions-legales",  priority: 0.3, changeFrequency: "yearly" },
    { path: "/confidentialite",   priority: 0.3, changeFrequency: "yearly" },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
