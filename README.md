# Sanwariya Electrotech Pvt. Ltd. — Website

A responsive React + Vite company website with a navy/cyan visual system, animated sections, service cards, technology showcase, concept portfolio and Google Sheets & Supabase inquiry form integration. The Vite React plugin is explicitly configured to ensure JSX is transformed correctly; a visible error screen is included for runtime rendering errors.

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

## Configure Google Sheets for the Contact Form (Recommended)
You can connect the inquiry form directly to a Google Sheet with zero backend server costs:

1. Create a new Google Sheet at https://sheets.new (e.g. named "Sanwariya Electrotech Inquiries").
2. Go to **Extensions → Apps Script**.
3. Open `google-apps-script.js` from this project repository, copy its entire contents, and replace all code in the Apps Script editor.
4. Click **Save** (floppy disk icon).
5. Click **Deploy → New deployment**.
6. Click the gear icon next to "Select type" and choose **Web app**.
7. Set:
   - **Description**: `Inquiries Webhook`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone` *(Crucial: must be set to Anyone)*
8. Click **Deploy**, grant permissions if prompted, and copy the **Web app URL** (`https://script.google.com/macros/s/.../exec`).
9. In your `.env` file, set:
   ```env
   VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
10. Restart Vite (`npm run dev`). Form submissions will automatically create headers (if sheet is empty) and append inquiry rows to your Google Sheet!

## Alternative / Additional: Configure Supabase
The form also supports saving to Supabase (or saving to both simultaneously):

1. Create a project at https://supabase.com/.
2. In the project dashboard, open **SQL Editor** and run the contents of `supabase-schema.sql`.
3. In **Project Settings → API**, copy the Project URL and anon/public key.
4. In your `.env` file, set:
   ```env
   VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
   ```
5. Restart the dev server.

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
