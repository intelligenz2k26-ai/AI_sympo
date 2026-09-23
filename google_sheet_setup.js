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

    // 5. AUTOMATED EMAIL GREETINGS & PASS DISPATCH (100% Free via Built-in MailApp)
    if (data.email && data.email.indexOf("@") !== -1) {
      try {
        sendWelcomeEmail(data);
      } catch (mailErr) {
        Logger.log("⚠️ Email Dispatch Error: " + mailErr.toString());
      }
    }

    return ContentService.createTextOutput(JSON.stringify({ "result": "success", "status": 200, "driveLink": proofLinkOrStatus }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "message": err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================================
// AUTOMATED EMAIL DISPATCHER (100% FREE VIA GOOGLE APPS SCRIPT MAILAPP)
// ============================================================================
function sendWelcomeEmail(data) {
  var recipient = (data.email || "").trim();
  if (!recipient || recipient.indexOf("@") === -1) return;

  var passId = data.passId || "#INT2K26-PASS";
  var name = data.name || "Operative";
  var college = data.college || "Your Institution";
  var dept = data.dept || "Engineering";
  var events = data.selectedEvents || "All Registered Technical & Non-Technical Arena Tracks";
  var regNo = data.regNo || "N/A";
  var mobile = data.mobile || "N/A";
  var utr = data.utrNo || data.utr || "N/A";

  var subject = "🚀 Welcome to INTELLI-GENZ 2K26 | Registration Pass Confirmed [" + passId + "]";

  var htmlBody = '<!DOCTYPE html>' +
    '<html><head><meta charset="utf-8">' +
    '<style>' +
    'body { font-family: "Segoe UI", Arial, sans-serif; background-color: #05080a; color: #e6f1ff; margin: 0; padding: 20px; }' +
    '.card { max-width: 600px; margin: 0 auto; background: #0a0e14; border: 1px solid #00f0ff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 25px rgba(0,240,255,0.2); }' +
    '.hdr { background: linear-gradient(135deg, #02182b, #05080a); padding: 30px 20px; text-align: center; border-bottom: 2px solid #00f0ff; }' +
    '.hdr-title { color: #00f0ff; font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 0; font-family: monospace; }' +
    '.hdr-sub { color: #8892b0; font-size: 12px; margin-top: 8px; letter-spacing: 1px; line-height: 1.5; }' +
    '.badge-tag { display: inline-block; background: rgba(0,255,102,0.15); border: 1px solid #00ff66; color: #00ff66; padding: 4px 12px; border-radius: 4px; font-size: 11px; font-family: monospace; margin-top: 12px; }' +
    '.body-content { padding: 25px; line-height: 1.6; }' +
    '.greeting-text { font-size: 18px; color: #ffffff; margin-bottom: 12px; }' +
    '.pass-box { background: rgba(0,240,255,0.05); border: 1px dashed #00f0ff; border-radius: 6px; padding: 18px; margin: 20px 0; }' +
    '.pass-id { font-size: 20px; font-weight: bold; color: #00f0ff; font-family: monospace; letter-spacing: 2px; text-align: center; margin-bottom: 15px; }' +
    '.grid-table { width: 100%; border-collapse: collapse; font-size: 13px; }' +
    '.grid-table td { padding: 8px 6px; border-bottom: 1px solid rgba(255,255,255,0.07); }' +
    '.label-col { color: #8892b0; width: 40%; font-family: monospace; }' +
    '.val-col { color: #ffffff; font-weight: 600; }' +
    '.logistics-box { background: #0f1520; border-left: 3px solid #ffb703; padding: 14px 16px; margin: 20px 0; font-size: 13px; color: #cbd5e1; }' +
    '.cta-btn { display: block; text-align: center; background: #00f0ff; color: #05080a !important; font-weight: bold; padding: 13px 20px; border-radius: 4px; text-decoration: none; margin: 25px 0 12px 0; font-family: monospace; letter-spacing: 1px; font-size: 14px; }' +
    '.wa-btn { display: block; text-align: center; background: #25D366; color: #000000 !important; font-weight: bold; padding: 12px 20px; border-radius: 4px; text-decoration: none; margin: 10px 0 20px 0; font-family: monospace; letter-spacing: 1px; font-size: 14px; }' +
    '.ftr { background: #05080a; padding: 20px; text-align: center; font-size: 11px; color: #53627c; border-top: 1px solid rgba(255,255,255,0.08); }' +
    '.hl { color: #00ff66; text-decoration: none; font-weight: bold; }' +
    '</style></head><body>' +
    '<div class="card">' +
      '<div class="hdr">' +
        '<div class="hdr-title">⚡ INTELLI-GENZ 2K26 ⚡</div>' +
        '<div class="hdr-sub">NATIONAL LEVEL TECHNICAL SYMPOSIUM<br>DEPARTMENT OF ARTIFICIAL INTELLIGENCE & DATA SCIENCE<br>MAHENDRA COLLEGE OF ENGINEERING (AUTONOMOUS), SALEM</div>' +
        '<div class="badge-tag">REGISTRATION PASS CONFIRMED</div>' +
      '</div>' +
      '<div class="body-content">' +
        '<div class="greeting-text">Greetings <strong>' + name + '</strong>,</div>' +
        '<p style="color: #a0aec0; font-size: 14px; margin-top: 0;">' +
          'Welcome to <strong>INTELLI-GENZ 2K26</strong>! Your registration has been successfully recorded in our central operations mainframe. Here are your official entry pass details:' +
        '</p>' +
        '<div class="pass-box">' +
          '<div class="pass-id">' + passId + '</div>' +
          '<table class="grid-table">' +
            '<tr><td class="label-col">PARTICIPANT NAME:</td><td class="val-col">' + name + '</td></tr>' +
            '<tr><td class="label-col">COLLEGE / INSTITUTION:</td><td class="val-col">' + college + '</td></tr>' +
            '<tr><td class="label-col">DEPARTMENT:</td><td class="val-col">' + dept + '</td></tr>' +
            '<tr><td class="label-col">REGISTER / ROLL NO:</td><td class="val-col">' + regNo + '</td></tr>' +
            '<tr><td class="label-col">MOBILE NUMBER:</td><td class="val-col">' + mobile + '</td></tr>' +
            '<tr><td class="label-col">REGISTERED EVENTS:</td><td class="val-col" style="color: #00ff66;">' + events + '</td></tr>' +
            '<tr><td class="label-col">UTR REF NUMBER:</td><td class="val-col">' + utr + '</td></tr>' +
          '</table>' +
        '</div>' +
        '<div class="logistics-box">' +
          '<strong style="color: #ffb703;">📍 MISSION LOGISTICS & VENUE:</strong><br>' +
          '• <strong>Event Date:</strong> 09.10.2026 (Friday)<br>' +
          '• <strong>Reporting Time:</strong> 09:00 AM IST (Inauguration @ 09:30 AM)<br>' +
          '• <strong>Venue:</strong> Mahendra College of Engineering, Minnampalli, Salem - 636106<br>' +
          '• <strong>Meals:</strong> Complimentary Refreshments & College Mess Dining Rations included with pass!' +
        '</div>' +
        '<p style="font-size: 13px; color: #8892b0;">' +
          'Please save this confirmation email or present your Pass Clearance ID (<strong>' + passId + '</strong>) alongside your College Identity Card at the on-campus desk on event day.' +
        '</p>' +
        '<a href="https://wa.me/919500625570?text=Hello%20Coordinator,%20I%20registered%20for%20INTELLIGENZ%202K26.%20My%20Pass%20ID%20is%20' + encodeURIComponent(passId) + '" class="wa-btn">' +
          '💬 CONNECT WITH STAFF COORDINATOR ON WHATSAPP' +
        '</a>' +
      '</div>' +
      '<div class="ftr">' +
        '<div>MAHENDRA COLLEGE OF ENGINEERING (AUTONOMOUS) — SINCE 1978 | NAAC "A" GRADE</div>' +
        '<div style="margin-top: 6px;">Need Assistance? Staff Coordinator: <a href="tel:+919500625570" class="hl">+91 9500625570</a> | Student Lead: <a href="tel:+918778910842" class="hl">+91 8778910842</a></div>' +
        '<div style="margin-top: 8px; color: #3b4252;">&copy; 2026 INTELLIGENZ 2K26 — AI&DS Department. Automated Dispatch System.</div>' +
      '</div>' +
    '</div></body></html>';

  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    htmlBody: htmlBody,
    name: "INTELLI-GENZ 2K26"
  });
}

// Run this test function in Apps Script Editor to test email sending!
function testSendWelcomeEmail() {
  sendWelcomeEmail({
    email: Session.getActiveUser().getEmail(),
    name: "Commander Test Operative",
    passId: "#INT2K26-PASS-TEST01",
    college: "Mahendra College of Engineering",
    dept: "Artificial Intelligence & Data Science",
    regNo: "732023243001",
    mobile: "9500625570",
    selectedEvents: "Innov Expo, Prompt-a-thon",
    utrNo: "123456789012"
  });
  Logger.log("✅ Test Welcome Email sent to " + Session.getActiveUser().getEmail());
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


