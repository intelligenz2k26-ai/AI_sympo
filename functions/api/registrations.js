export async function onRequestGet(context) {
  try {
    const { DB } = context.env;
    let rows = [];

    if (DB) {
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

      const { results } = await DB.prepare(`SELECT * FROM registrations ORDER BY id DESC`).all();
      rows = results || [];
    }

    return new Response(JSON.stringify({ result: "success", count: rows.length, data: rows }), {
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
