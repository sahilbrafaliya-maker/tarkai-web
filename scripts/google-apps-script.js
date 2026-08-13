/**
 * TARK AI EdTech — Google Apps Script Webhook
 * Direct container-bound or standalone Google Apps Script
 */

var SHEET_ID = '1whJRRokBkyLccNO9QTaJZBEfW9z7LK3eaDdE3_ime9c';

function doPost(e) {
  try {
    var rawData = (e && e.postData) ? e.postData.contents : '{}';
    var data = {};
    try {
      data = JSON.parse(rawData);
    } catch(err) {
      data = (e && e.parameter) ? e.parameter : {};
    }

    // Try active spreadsheet first, fallback to openById
    var ss;
    try {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    } catch(err) {}
    if (!ss) {
      ss = SpreadsheetApp.openById(SHEET_ID);
    }

    var sheet = ss.getSheetByName('Form_Responses') || ss.getSheetByName('Admissions') || ss.getSheets()[0];

    // Format IST timestamp
    var timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    var rowData = [
      timestamp,
      data.fullName || '',
      data.mobile || '',
      data.email || '',
      data.currentStatus || '',
      data.courseInterested || '',
      data.demoSession || data.courseInterested || ''
    ];

    // Insert at exact next empty row
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1, 1, rowData.length).setValues([rowData]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, rowInserted: lastRow + 1, sheetName: sheet.getName() }))
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
