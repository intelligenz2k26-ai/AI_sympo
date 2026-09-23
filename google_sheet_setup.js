// ============================================================================
// INTELLIGENZ 2K26 - GOOGLE SHEETS AUTOMATIC DATABASE SYNC SCRIPT
// ============================================================================
// Spreadsheet ID: 1qMxYlH-0WHhHGVX4SBvtYdg4ZjYO1lzc2daJT45ynP8
// ============================================================================

var SPREADSHEET_ID = "1qMxYlH-0WHhHGVX4SBvtYdg4ZjYO1lzc2daJT45ynP8";

// Run this test function ONCE in Apps Script Editor to authorize Drive & Sheets permissions!
function testSetup() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheets()[0];
  sheet.appendRow(["TEST_ROW_SUCCESS", new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }), "Test Name", "test@gmail.com", "9876543210", "12345", "Male", "Test College", "AI&DS", "District", "600001", "Innov Expo", "No", "Social Media", "AI&DS", "123456789012", "https://drive.google.com"]);
  Logger.log("✅ SUCCESS! Test row appended to Google Sheet.");
}

function doPost(e) {
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheets()[0];
    var data = {};
    
    // Parse JSON or Form Encoded Data safely
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch(err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // 1. Process Payment Proof Screenshot -> Upload to Google Drive & generate viewable link
    var proofLinkOrStatus = "No Screenshot Attached";
    var rawProof = data.paymentProof || data.payment_proof || "";
    
    if (rawProof && rawProof.indexOf("base64,") !== -1) {
      try {
        var base64Parts = rawProof.split("base64,");
        var base64Data = base64Parts[1];
        var mimeMatch = rawProof.match(/data:(.*?);/);
        var mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";
        var bytes = Utilities.base64Decode(base64Data);
        var passTag = (data.passId || "PASS").replace(/[^a-zA-Z0-9-]/g, "");
        var nameTag = (data.name || "User").replace(/[^a-zA-Z0-9]/g, "");
        var fileName = "Receipt_" + passTag + "_" + nameTag + ".jpg";
        var blob = Utilities.newBlob(bytes, mimeType, fileName);
        
        // Create file in Google Drive & grant view access
        var driveFile = DriveApp.createFile(blob);
        driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        var driveUrl = driveFile.getUrl();
        var fileId = driveFile.getId();
        var directImgUrl = "https://lh3.googleusercontent.com/d/" + fileId;
        // Displays a real thumbnail image inside the Google Sheet cell with a link to Google Drive!
        proofLinkOrStatus = '=HYPERLINK("' + driveUrl + '", IMAGE("' + directImgUrl + '"))';
      } catch(driveErr) {
        proofLinkOrStatus = "Screenshot Received (Drive: " + driveErr.toString() + ")";
      }
    } else if (rawProof) {
      proofLinkOrStatus = rawProof;
    }

    // 2. Extract UTR Ref Number safely
    var utrVal = data.utrNo || data.utrNumber || data.utr || "N/A";
    if (!utrVal || utrVal === "null" || utrVal === "undefined") {
      utrVal = "N/A";
    }

    // 3. Automatically create column headers if sheet is brand new
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp (IST)", 
        "Pass Transaction ID", 
        "Full Name", 
        "Email Address", 
        "Mobile Number", 
        "Register / Roll Number", 
        "Gender", 
        "College Name", 
        "Department", 
        "District", 
        "Pincode", 
        "Selected Events", 
        "Referred?", 
        "Referral Source", 
        "Referral Department", 
        "UTR / UPI Ref Number", 
        "Payment Proof Drive Link"
      ]);
      
      // Format header row
      var headerRange = sheet.getRange(1, 1, 1, 17);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#00f0ff");
      headerRange.setFontColor("#000000");
    }

    // 4. Append participant registration row
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.passId || "",
      data.name || "",
      data.email || "",
      data.mobile || "",
      data.regNo || "",
      data.gender || "",
      data.college || "",
      data.dept || "",
      data.district || "",
      data.pincode || "",
      data.selectedEvents || "",
      data.referred || "",
      data.referralSource || data.source || "",
      data.referralDept || data.refDept || "",
      utrVal,
      proofLinkOrStatus
    ]);

    return ContentService.createTextOutput(JSON.stringify({ "result": "success", "status": 200, "driveLink": proofLinkOrStatus }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "message": err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // If GET request has POST parameters (fallback mode), process POST
  if (e && e.parameter && (e.parameter.name || e.parameter.passId)) {
    return doPost(e);
  }

  // Otherwise, return all registrations stored in Google Sheet as JSON
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheets()[0];
    var data = sheet.getDataRange().getValues();
    
    if (!data || data.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify({ result: "success", count: 0, data: [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var rows = [];
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      if (!row[0] && !row[2]) continue; // Skip empty rows
      rows.push({
        timestamp: row[0] || "",
        passId: row[1] || "",
        name: row[2] || "",
        email: row[3] || "",
        mobile: row[4] || "",
        regNo: row[5] || "",
        gender: row[6] || "",
        college: row[7] || "",
        dept: row[8] || "",
        district: row[9] || "",
        pincode: row[10] || "",
        selectedEvents: row[11] || "",
        referred: row[12] || "",
        referralSource: row[13] || "",
        referralDept: row[14] || "",
        utrNo: row[15] || "",
        paymentProof: row[16] || ""
      });
    }
    
    return ContentService.createTextOutput(JSON.stringify({ result: "success", count: rows.length, data: rows }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


