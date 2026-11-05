const sheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;

export const isGoogleSheetsConfigured = Boolean(
  sheetsUrl &&
  !sheetsUrl.includes('YOUR_SCRIPT_ID') &&
  !sheetsUrl.includes('YOUR_GOOGLE_SHEET')
);

/**
 * Submits form inquiry data to Google Sheets.
 * Supports Google Apps Script Web Apps and SheetDB endpoints.
 */
export async function submitToGoogleSheets(data) {
  if (!isGoogleSheetsConfigured) {
    throw new Error(
      'Google Sheets is not configured yet. Add your Web App URL to VITE_GOOGLE_SHEETS_URL in the .env file.'
    );
  }

  // Support for SheetDB API if user uses SheetDB
  if (sheetsUrl.includes('sheetdb.io')) {
    const response = await fetch(sheetsUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: [data] }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`Google Sheets submission error: ${errText || response.statusText}`);
    }
    return true;
  }

  // Google Apps Script Web App
  // Use URLSearchParams with application/x-www-form-urlencoded and mode: 'no-cors'
  // to avoid browser CORS preflight blocking on Google Apps Script 302 redirects.
  const params = new URLSearchParams();
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  params.append('timestamp', timestamp);

  for (const [key, value] of Object.entries(data)) {
    params.append(key, value ?? '');
  }

  await fetch(sheetsUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  return true;
}
