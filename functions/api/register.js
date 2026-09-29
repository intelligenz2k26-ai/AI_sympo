export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    const { DB } = context.env;

    if (DB) {
      // Auto-create table if not exists
      await DB.prepare(`
        CREATE TABLE IF NOT EXISTS registrations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          timestamp TEXT,
          passId TEXT,
          name TEXT,
          email TEXT,
          mobile TEXT,
          regNo TEXT,
          gender TEXT,
          college TEXT,
          dept TEXT,
          district TEXT,
          pincode TEXT,
          selectedEvents TEXT,
          referred TEXT,
          referralSource TEXT,
          referralDept TEXT,
          utrNo TEXT,
          paymentProof TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `).run();

      // Insert registration row
      await DB.prepare(`
        INSERT INTO registrations (
          timestamp, passId, name, email, mobile, regNo, gender, college, dept,
          district, pincode, selectedEvents, referred, referralSource, referralDept, utrNo, paymentProof
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        data.timestamp || new Date().toISOString(),
        data.passId || '',
        data.name || '',
        data.email || '',
        data.mobile || '',
        data.regNo || '',
        data.gender || '',
        data.college || '',
        data.dept || '',
        data.district || '',
        data.pincode || '',
        data.selectedEvents || '',
        data.referred || '',
        data.referralSource || '',
        data.referralDept || '',
        data.utrNo || '',
        data.paymentProof || ''
      ).run();

      return new Response(JSON.stringify({ result: "success", message: "Saved to Cloudflare D1 Database" }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    return new Response(JSON.stringify({ result: "success", message: "Received (No D1 binding)" }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });

  } catch (err) {
    return new Response(JSON.stringify({ result: "error", message: err.toString() }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
