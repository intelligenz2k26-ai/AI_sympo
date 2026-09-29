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

    // CSV Headers
    const headers = [
      "S.No", "Timestamp", "Pass Transaction ID", "Full Name", "Email Address",
      "Mobile Number", "Register Number", "Gender", "College Name", "Department",
      "District", "Pincode", "Selected Events", "Referred?", "Referral Source",
      "Referral Department", "UTR Ref Number", "Payment Proof Drive Link"
    ];

    let csvContent = headers.join(",") + "\n";

    rows.forEach((r, idx) => {
      const rowData = [
        idx + 1,
        `"${(r.timestamp || '').replace(/"/g, '""')}"`,
        `"${(r.passId || '').replace(/"/g, '""')}"`,
        `"${(r.name || '').replace(/"/g, '""')}"`,
        `"${(r.email || '').replace(/"/g, '""')}"`,
        `"${(r.mobile || '').replace(/"/g, '""')}"`,
        `"${(r.regNo || '').replace(/"/g, '""')}"`,
        `"${(r.gender || '').replace(/"/g, '""')}"`,
        `"${(r.college || '').replace(/"/g, '""')}"`,
        `"${(r.dept || '').replace(/"/g, '""')}"`,
        `"${(r.district || '').replace(/"/g, '""')}"`,
        `"${(r.pincode || '').replace(/"/g, '""')}"`,
        `"${(r.selectedEvents || '').replace(/"/g, '""')}"`,
        `"${(r.referred || '').replace(/"/g, '""')}"`,
        `"${(r.referralSource || '').replace(/"/g, '""')}"`,
        `"${(r.referralDept || '').replace(/"/g, '""')}"`,
        `"${(r.utrNo || '').replace(/"/g, '""')}"`,
        `"${(r.paymentProof || '').replace(/"/g, '""')}"`
      ];
      csvContent += rowData.join(",") + "\n";
    });

    const filename = `INTELLI-GENZ-2K26_Registrations_${new Date().toISOString().split('T')[0]}.csv`;

    return new Response(csvContent, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Access-Control-Allow-Origin": "*"
      }
    });

  } catch (err) {
    return new Response("Error generating CSV export: " + err.toString(), {
      status: 500,
      headers: { "Content-Type": "text/plain" }
    });
  }
}
