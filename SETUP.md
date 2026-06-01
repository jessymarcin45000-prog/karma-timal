# Karma Timal — Site Web Premium

## Lancement rapide

### 1. Installer Node.js (si pas encore fait)
```bash
# Via Homebrew (recommandé)
brew install node

# Ou via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install --lts
```

### 2. Installer les dépendances
```bash
cd karma-timal
npm install
```

### 3. Lancer en développement
```bash
npm run dev
```
Ouvrir http://localhost:3000

### 4. Build production
```bash
npm run build
npm start
```

---

## Personnalisation

### Remplacer les médias

| Fichier | Localisation | Action |
|---|---|---|
| **Photos** | `components/sections/GalleryPreview.tsx` | Remplacer les `bg-gradient-*` par `<Image src="..." />` |
| **Spotify** | `components/sections/MusicSection.tsx` | Remplacer l'ID d'artiste dans l'URL d'embed |
| **YouTube** | `components/sections/MusicSection.tsx` | Remplacer `dQw4w9WgXcQ` par les vrais IDs vidéo |
| **OG Image** | `public/og-image.jpg` | Ajouter une image 1200×630 |
| **Favicon** | `public/favicon.ico` | Remplacer par le vrai favicon |

### Réseaux sociaux
Mettre à jour les URLs dans `components/ui/SocialLinks.tsx` :
- Instagram: `https://instagram.com/karmatimal`
- TikTok: `https://tiktok.com/@karmatimal`
- YouTube: `https://youtube.com/@karmatimal`
- Spotify: `https://open.spotify.com/artist/[ID_ARTISTE]`

### Formulaire de booking
Dans `app/booking/page.tsx`, connecter la soumission du formulaire à :
- [Resend](https://resend.com) (recommandé)
- [EmailJS](https://emailjs.com) (sans backend)
- [Formspree](https://formspree.io)

### Couleurs (si besoin de modifier)
Dans `tailwind.config.js` → `theme.extend.colors`

### Typographies
Dans `app/layout.tsx` — Google Fonts chargées automatiquement :
- `Playfair_Display` → titres (serif élégant)
- `Inter` → texte courant

---

## Structure des fichiers

```
karma-timal/
├── app/
│   ├── layout.tsx          ← Layout global + SEO metadata
│   ├── page.tsx            ← Page d'accueil
│   ├── globals.css         ← Styles globaux + variables CSS
│   ├── univers/page.tsx    ← Page Univers artistique
│   ├── musique/page.tsx    ← Page Discographie + Players
│   ├── concerts/page.tsx   ← Page Agenda avec filtres
│   ├── galerie/page.tsx    ← Galerie avec lightbox
│   └── booking/page.tsx    ← Formulaire de booking
│
├── components/
│   ├── Navigation.tsx      ← Menu fixe avec burger mobile
│   ├── Hero.tsx            ← Section hero plein écran
│   ├── Footer.tsx          ← Pied de page
│   ├── PageHero.tsx        ← En-tête des pages internes
│   ├── sections/
│   │   ├── StorySection.tsx     ← Biographie + stats
│   │   ├── MusicSection.tsx     ← Spotify + YouTube + tracklist
│   │   ├── LiveExperience.tsx   ← Section expérience live
│   │   ├── GalleryPreview.tsx   ← Aperçu galerie photo
│   │   ├── ConcertDates.tsx     ← Dates de concerts
│   │   └── SocialSection.tsx    ← Réseaux sociaux
│   └── ui/
│       ├── Button.tsx           ← Bouton réutilisable
│       ├── SocialLinks.tsx      ← Icônes réseaux sociaux
│       ├── RevealText.tsx       ← Animation scroll reveal
│       └── ScrollProgress.tsx  ← Barre de progression
│
├── lib/
│   └── utils.ts            ← Utilitaires (cn, etc.)
│
├── tailwind.config.js      ← Palette couleurs + typographies
└── package.json
```

---

## Déploiement (Vercel — recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Production
vercel --prod
```

Ou connecter le repo GitHub sur [vercel.com](https://vercel.com) pour un déploiement automatique.
