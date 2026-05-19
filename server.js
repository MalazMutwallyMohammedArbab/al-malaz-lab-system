const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create tables
db.run(`
CREATE TABLE IF NOT EXISTS patients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  labNumber INTEGER NOT NULL,
  phone TEXT,
  gender TEXT,
  age INTEGER,
  tests TEXT,
  status TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

db.run(`
CREATE TABLE IF NOT EXISTS results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_id INTEGER,
  labNumber INTEGER,
  cbc TEXT,
  bffm TEXT,
  esr TEXT,
  urine TEXT,
  chemistry TEXT,
  serology TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

// Routes
app.use('/api/patients', require('./routes/patients'));

// Add results
app.post("/api/results", (req, res) => {
  const {
    patient_id,
    labNumber,
    cbc,
    bffm,
    esr,
    urine,
    chemistry,
    serology
  } = req.body;

  const sql = `
    INSERT INTO results
    (patient_id, labNumber, cbc, bffm, esr, urine, chemistry, serology)
    VALUES (?,?,?,?,?,?,?,?)
  `;

  db.run(
    sql,
    [
      patient_id,
      labNumber,
      JSON.stringify(cbc),
      bffm,
      esr,
      JSON.stringify(urine),
      JSON.stringify(chemistry),
      JSON.stringify(serology)
    ],
    function (err) {
      if (err) return res.json({ success: false });

      db.run(
        "UPDATE patients SET status='completed' WHERE id=?",
        [patient_id]
      );

      res.json({ success: true, id: this.lastID });
    }
  );
});

// List results
app.get("/api/results-list", (req, res) => {
  const sql = `
    SELECT * FROM patients
    WHERE status = 'completed'
    ORDER BY createdAt DESC
  `;

  db.all(sql, [], (err, rows) => {
    if (err) return res.json({ success: false });

    res.json({
      success: true,
      patients: rows
    });
  });
});

// Get single result
app.get("/api/result/:id", (req, res) => {
  const patientId = req.params.id;

  const sql = `
    SELECT patients.*, results.*
    FROM patients
    LEFT JOIN results
    ON patients.id = results.patient_id
    WHERE patients.id = ?
  `;

  db.get(sql, [patientId], (err, row) => {
    if (err) return res.json({ success: false });

    res.json({
      success: true,
      result: row
    });
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});