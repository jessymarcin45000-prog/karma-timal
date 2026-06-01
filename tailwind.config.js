/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        noir:    "#0A0A0A",
        "noir-2": "#111111",
        "noir-3": "#1A1A1A",
        sable:   "#E8D5B0",
        bronze:  "#B87333",
        sunset:  "#E8692A",
        creme:   "#F5F0E8",
        or:      "#C4A96A",
        "or-light": "#D4BB7A",
        // ── Vert tropical / sapin — complément organique de la charte ──
        vert:        "#2A4A38",   // accent principal — vert sapin chaleureux
        "vert-deep": "#162B20",   // pour fonds & ambiance
        "vert-light":"#4A7558",   // hover & textes accent
        "vert-soft": "#6F9D80",   // textes secondaires & lueurs
        tropical:    "#2A4A38",   // alias historique
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans:  ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Display scales calibrées 320px → 1920px sans débordement
        "display-xl": ["clamp(3rem, 14vw, 11rem)",   { lineHeight: "0.9",  letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.5rem, 9vw, 7rem)",   { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.875rem, 6vw, 4.5rem)", { lineHeight: "1.05" }],
        "display-sm": ["clamp(1.5rem, 4vw, 2.5rem)",  { lineHeight: "1.15" }],
      },
      spacing: {
        // Espacement section : généreux sur desktop, compact mobile (moins de scroll)
        "section":    "clamp(3.5rem, 9vw, 10rem)",
        "section-sm": "clamp(2.5rem, 6vw, 6rem)",
        // Safe-bottom : compense la MobileActionBar pour les boutons "go down"
        "mobile-bar": "5.5rem",
      },
      animation: {
        "gradient-shift": "gradientShift 8s ease-in-out infinite alternate",
        "scroll-down": "scrollDown 2s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        gradientShift: {
          "0%":   { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        scrollDown: {
          "0%, 100%": { transform: "translateY(0)", opacity: "1" },
          "50%":      { transform: "translateY(8px)", opacity: "0.3" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-10px)" },
        },
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "circ-out": "cubic-bezier(0, 0.55, 0.45, 1)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse at 65% 45%, rgba(232,105,42,0.22) 0%, transparent 60%), " +
          "radial-gradient(ellipse at 25% 75%, rgba(184,115,51,0.15) 0%, transparent 55%), " +
          "radial-gradient(ellipse at 85% 15%, rgba(196,169,106,0.12) 0%, transparent 45%), " +
          "linear-gradient(160deg, #0A0A0A 0%, #120E08 50%, #0A0A0A 100%)",
        "warm-gradient":
          "linear-gradient(135deg, #1A1108 0%, #241A0A 50%, #1A1108 100%)",
        "sable-gradient":
          "linear-gradient(180deg, #0A0A0A 0%, #1A1500 20%, #E8D5B0 50%, #1A1500 80%, #0A0A0A 100%)",
      },
    },
  },
  plugins: [],
};
