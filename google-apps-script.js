/**
 * =========================================================================
 * Sanwariya Electrotech Pvt. Ltd. — Google Sheets Form Integration Script
 * Target Spreadsheet ID: 1NI7RKNLb1-hHnY9CcOoYJ-QZkNj2ey-KFOV_MBi9kec
 * Link: https://docs.google.com/spreadsheets/d/1NI7RKNLb1-hHnY9CcOoYJ-QZkNj2ey-KFOV_MBi9kec/edit
 * =========================================================================
 * 
 * SETUP INSTRUCTIONS (Takes ~1 minute):
 * 1. Open your spreadsheet:
 *    https://docs.google.com/spreadsheets/d/1NI7RKNLb1-hHnY9CcOoYJ-QZkNj2ey-KFOV_MBi9kec/edit
 * 2. In the top menu, click Extensions > Apps Script.
 * 3. Delete any code in the editor, and paste all the code from this file.
 * 4. Click the Save icon (floppy disk).
 * 5. Click the blue "Deploy" button (top right) > "New deployment".
 * 6. Click the gear icon next to "Select type" and choose "Web app".
 * 7. Set:
 *    - Description: Sanwariya Website Inquiries
 *    - Execute as: Me (your Google account)
 *    - Who has access: Anyone (CRITICAL: must be set to Anyone)
 * 8. Click "Deploy".
 *    (If Google asks for authorization: click "Authorize access", choose your Google
 *    account, click "Advanced", and click "Go to Untitled project (unsafe)").
 * 9. Copy the "Web app URL" (looks like https://script.google.com/macros/s/.../exec).
 * 10. Paste it into your .env file in this website folder:
 *     VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_GENERATED_ID/exec
 */

var SPREADSHEET_ID = "1NI7RKNLb1-hHnY9CcOoYJ-QZkNj2ey-KFOV_MBi9kec";

function getTargetSheet() {
  if (SPREADSHEET_ID && SPREADSHEET_ID !== "") {
    try {
      return SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    } catch (e) {
      // Fallback to active sheet if bound to the sheet
      return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    }
  }
  return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds for other submissions to finish
  lock.tryLock(10000);

  try {
    var sheet = getTargetSheet();

    // Auto-create and format header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Full Name",
        "Email",
        "Phone",
        "Company",
        "Service",
        "Budget",
        "Message"
      ]);
      // Format headers with brand navy color (#0a2540) and white bold text
      sheet.getRange(1, 1, 1, 8)
        .setFontWeight("bold")
        .setBackground("#0a2540")
        .setFontColor("#ffffff");
      sheet.setFrozenRows(1);
    }

    var data = {};

    // 1. Check if payload was sent as JSON
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = {};
      }
    }

    // 2. Check if payload was sent as form parameters
    if (e && e.parameter) {
      data = Object.assign({}, e.parameter, data);
    }

    var timestamp = data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    var fullName  = data.full_name  || data.fullName  || data.name  || "";
    var email     = data.email      || "";
    var phone     = data.phone      || "";
    var company   = data.company    || "";
    var service   = data.service    || "";
    var budget    = data.budget     || "";
    var message   = data.message    || "";

    // Append new row
    sheet.appendRow([
      timestamp,
      fullName,
      email,
      phone,
      company,
      service,
      budget,
      message
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", message: "Inquiry recorded successfully" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Health check endpoint
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "active",
      spreadsheetId: SPREADSHEET_ID,
      message: "Sanwariya Electrotech Google Sheets webhook is operational."
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
