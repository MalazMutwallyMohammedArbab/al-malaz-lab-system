
const db = require("../database");

// ===== تسجيل مريض جديد =====

function registerPatient(req, res) {

  const { name, phone, gender, age, tests } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "الاسم ناقص"
    });
  }

  // الحصول على آخر رقم معمل
  db.get(
    "SELECT MAX(labNumber) as maxLab FROM patients",
    [],
    (err, row) => {

      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message
        });
      }

      const labNumber = row?.maxLab ? row.maxLab + 1 : 1000;

      db.run(
        `INSERT INTO patients (labNumber, name, phone, gender, age, tests, status)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          labNumber,
          name,
          phone,
          gender,
          age,
          JSON.stringify(tests || []),
          "collected"
        ],
        function (err) {

          if (err) {
            return res.status(500).json({
              success: false,
              error: err.message
            });
          }

          res.json({
            success: true,
            patient: {
              id: this.lastID,
              labNumber,
              name,
              phone,
              gender,
              age,
              tests,
              createdAt: new Date().toLocaleDateString("ar-EG", {day: "2-digit", month: "short", year: "numeric"})
            }
          });
        }
      );

    }
  );
}

// ===== جلب كل المرضى =====
function getAllPatients(req, res) {
  db.all("SELECT * FROM patients WHERE status IS NULL OR status != 'completed' ", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }

    // نحول tests من string إلى array
    const patients = rows.map((p) => ({
      ...p,
      tests: JSON.parse(p.tests || "[]"),
    }));

    res.json({ success: true, patients });
  });
}

// ===== تحديث نتيجة مريض =====
function updateResult(req, res) {
  const patientId = parseInt(req.params.id);
  const { tests, status } = req.body;

  db.run(
    `UPDATE patients
     SET tests = ?, status = ?
     WHERE id = ?`,
    [JSON.stringify(tests || []), status, patientId],
    function (err) {
      if (err) {
        return res.status(500).json({ success: false, error: err.message });
      }

      res.json({ success: true, message: "تم التحديث بنجاح" });
    }
  );
}

function getNextLabNumber(req,res){

  db.get(
    "SELECT MAX(labNumber) as maxLab FROM patients",
    [],
    (err,row)=>{

      if(err){
        return res.status(500).json({
          success:false,
          error:err.message
        });
      }

      const labNumber = row?.maxLab ? Number(row.maxLab) + 1 : 1000;

      res.json({
        success:true,
        labNumber
      });

    }
  );

}

// جلب مريض واحد لإضافة نتيجة
function getPatientById(req, res) {

  const id = req.params.id;

  db.get(
    "SELECT * FROM patients WHERE id = ?",
    [id],
    (err, row) => {

      if (err) {
        return res.status(500).json({ success: false, error: err.message });
      }

      if (!row) {
        return res.status(404).json({ success: false, message: "المريض غير موجود" });
      }

      row.tests = JSON.parse(row.tests || "[]");

      res.json({
        success: true,
        patient: row
      });

    }
  );
}

module.exports = {
  registerPatient,
  getAllPatients,
  updateResult,
  getNextLabNumber,
  getPatientById
};