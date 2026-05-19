const express = require('express');
const router = express.Router();
const patientsController = require('../controllers/patientsController');

// تسجيل مريض جديد
router.post('/register', patientsController.registerPatient);

// جلب كل المرضى
router.get('/', patientsController.getAllPatients);

// تحديث نتيجة مريض
router.put('/:id/result', patientsController.updateResult);

// توليد رقم معمل تلقائي
router.get('/next-lab-number', patientsController.getNextLabNumber);

// جلب مريض واحد لإضافة نتيجة
router.get("/:id", patientsController.getPatientById);

module.exports = router;