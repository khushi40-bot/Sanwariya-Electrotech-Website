# Sanwariya Electrotech Pvt. Ltd. — Website

A responsive React + Vite company website with a navy/cyan visual system, animated sections, service cards, technology showcase, concept portfolio and a Supabase-backed inquiry form. The Vite React plugin is explicitly configured to ensure JSX is transformed correctly; a visible error screen is included for runtime rendering errors.

## Requirements
- Node.js 18.18+ (Node 20 LTS recommended)
- npm

## Run locally
Run these commands from the folder that contains `package.json` (not from its parent folder):
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (usually http://localhost:5173).

## Configure the contact form database (Supabase)
The contact form intentionally does not show a false success when the database is not configured.

1. Create a project at https://supabase.com/.
2. In the project dashboard, open **SQL Editor** and run the contents of `supabase-schema.sql`.
3. In **Project Settings → API**, copy the Project URL and anon/public key.
4. Copy `.env.example` to `.env` in the project root.
5. Set the values:
   ```env
   VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
   ```
6. Restart the dev server. New form submissions will be inserted into `public.inquiries`.

The anon key is designed for browser use; keep Row Level Security enabled. The provided SQL allows inserts only and does not expose inquiry records for public reading. For production, add server-side rate limiting / CAPTCHA and review spam protection before launch.

## Build for production
```bash
npm run build
npm run preview
```
The production site is generated in `dist/`.

## Company details used
- Sanwariya Electrotech Pvt. Ltd.
- Smart Solutions for a Digital Tomorrow
- +91 9468574274
- sanwariyakrishan@gmail.com
- https://www.sanwariyatech.com

The supplied company service-card image is retained in `src/assets/company-services-card.png`; the original emblem has been cropped from it for the site header and footer. Portfolio tiles are explicitly labelled demo concepts, not claimed client work.

## Blank-screen troubleshooting
- Make sure Node.js 18.18+ is installed (`node -v`).
- Open a terminal in this project folder and run `npm install`.
- Start with `npm run dev` and open the exact localhost URL printed in the terminal.
- If the page still fails, open browser Developer Tools → Console. The app now includes a visible React error fallback instead of silently rendering a blank page.
- If `npm install` fails with a network/DNS error, retry when the npm registry is reachable.

## Latest visual refinements
- Navbar and footer now use a transparent-background company logo asset (`src/assets/sanwariya-logo-transparent.png`).
- About Us now uses a custom CSS-built 3D laptop, phone, cloud and floating geometric illustration instead of the logo inside a white tile.
- About Us and Technologies sections use a light blue/white palette to balance the darker navy sections.
- Technologies are displayed in a continuous horizontal marquee; hover or keyboard focus pauses the animation.
- The technology marquee respects the user's reduced-motion accessibility preference.
