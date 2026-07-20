/**
 * TARK AI EdTech — Google Apps Script
 * =====================================
 * Pre-configured for Google Sheet ID: 1whJRRokBkyLccNO9QTaJZBEfW9z7LK3eaDdE3_ime9c
 */

var SHEET_ID = '1whJRRokBkyLccNO9QTaJZBEfW9z7LK3eaDdE3_ime9c';

function doPost(e) {
  try {
    var rawData = (e && e.postData) ? e.postData.contents : '{}';
    var data = JSON.parse(rawData);

    var ss = SpreadsheetApp.openById(SHEET_ID);
    // Auto-detect Form_Responses tab or Admissions tab or first sheet
    var sheet = ss.getSheetByName('Form_Responses') || ss.getSheetByName('Admissions') || ss.getSheets()[0];

    // Format IST timestamp
    var timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Append row matching Google Sheet column layout
    sheet.appendRow([
      timestamp,
      data.fullName || '',
      data.mobile || '',
      data.email || '',
      data.currentStatus || '',
      data.courseInterested || '',
      data.demoSession || '',
      data.applicationId || '',
      data.browser || '',
      data.device || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Submission saved successfully' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'TARK AI Web App is active', timestamp: new Date().toISOString() }))
    .setMimeType(ContentService.MimeType.JSON);
}
