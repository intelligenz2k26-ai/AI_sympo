-- Cloudflare D1 Database Schema for INTELLIGENZ 2K26 Registrations Database

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
);
