# Politique de sécurité — Karma Timal

## Signalement d'une vulnérabilité

Si vous découvrez une faille de sécurité sur ce site, **merci de ne pas la divulguer publiquement**.

Contactez-nous via WhatsApp ou e-mail :

- **WhatsApp** : <https://wa.me/33603436014>
- **E-mail** : `booking@karmatimal.com` — objet : `[SECURITY]`

Nous accusons réception sous **48 h** et publions un correctif sous **7 jours** pour les failles confirmées.

## Périmètre

Sont concernées les vulnérabilités sur :

- Le site `karmatimal.com` et ses sous-domaines.
- Le formulaire de booking (`/booking`).
- Les Server Actions Next.js.
- Le pipeline de déploiement Vercel.

Hors périmètre (à signaler aux providers concernés) :

- Services Spotify / YouTube embarqués.
- Hébergement Vercel lui-même.

## Mesures de sécurité en place

| Couche               | Mécanisme                                                   |
|---------------------|-------------------------------------------------------------|
| Transport           | HSTS 2 ans (`preload`), HTTPS forcé                          |
| Navigateur          | CSP strict, X-Frame-Options DENY, Referrer-Policy, etc.      |
| Edge                | Middleware : rate-limit, blocage scanners, blocage probes    |
| Formulaire booking  | Server Action, Zod, honeypot, timer, anti-spam, RGPD         |
| Dépendances         | `npm audit` hebdomadaire, overrides forcés                   |
| Secrets             | `.env.local` privé, jamais commit, séparation server/client  |
| Pré-déploiement     | `npm run audit:security` (scripts/security-check.mjs)        |

## Variables d'environnement obligatoires

Voir `.env.example`. Toute variable `NEXT_PUBLIC_*` est embarquée dans le bundle JS et **ne doit jamais contenir de secret**.

## Avant chaque déploiement

```bash
npm run audit:security
```

Le script échoue (exit 1) en cas de :

- Secret détecté dans le code.
- `.gitignore` manquant ou incomplet.
- Fichiers de sécurité manquants.
- Variable `NEXT_PUBLIC_*` suspecte (contient "KEY", "SECRET"…).
- Dépendance avec vulnérabilité high/critical non documentée.

## CVE Next.js mitigées au niveau application

Next.js 14.2.x conserve quelques advisories non corrigées sans migration majeure (Next 16). Notre code est protégé car :

| CVE                                         | Mitigation                                                                  |
|---------------------------------------------|-----------------------------------------------------------------------------|
| Image Optimizer DoS                         | `images.unoptimized: true` — l'optimiseur n'est pas exposé                  |
| Cache Poisoning via Server Components       | Aucun input utilisateur n'alimente les Server Components côté rendu         |
| Middleware bypass i18n                      | Pas d'i18n configuré                                                        |
| HTTP request smuggling rewrites             | Pas de `rewrites()` dans `next.config.js`                                   |
| XSS via CSP nonces                          | Pas de nonces — CSP statique                                                |
| WebSocket SSRF                              | Pas de WebSocket exposé                                                     |
| Image cache disk growth                     | Optimisation désactivée — pas de cache disque next/image                    |
