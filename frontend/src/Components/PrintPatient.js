function PrintPatient({ patient, onClose }) {

  if (!patient) return null;

  return (
    <div className="popup-overlay">

  <div className="popup-box print-area">

    <h2>بيانات المريض</h2>

    <p><b>رقم المعمل:</b> {patient.labNumber}</p>
    <p><b>الاسم:</b> {patient.name}</p>
    <p><b>العمر:</b> {patient.age}</p>
    <p><b>الجنس:</b> {patient.gender}</p>
    <p><b>تاريخ التسجيل:</b> {patient.created_at || patient.createdAt}</p>

    <h3>الفحوصات</h3>

    <ul>
      {(patient.tests || []).map((test, index) => (
        <li key={index}>{test}</li>
      ))}
    </ul>

    <div className="popup-buttons no-print">

      <button className="print-btn" onClick={() => window.print()}>
        طباعة
      </button>

      <button className="close-btn" onClick={onClose}>
        إغلاق
      </button>

    </div>

  </div>

</div>
  );
}

export default PrintPatient;