import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CBC from "../Components/Tests/CBC";
import BFFM from "../Components/Tests/BFFM";
import ESR from "../Components/Tests/ESR";
import Urine from "../Components/Tests/Urine";
import Chemistry from "../Components/Tests/Chemistry";
import Serology from "../Components/Tests/Serology";
import Swal from "sweetalert2";
import { API_URL } from "../config";

function ResultsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);

  const [cbcResults, setCbcResults] = useState({});
  const [bffmResults, setBffmResults] = useState();
  const [esrResults, setEsrResults] = useState();
  const [urineResults, setUrineResults] = useState({ urine: [], stool: []});
  const [chemistryResults, setChemistryResults] = useState([]);
  const [serologyResults, setSerologyResults] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/patients/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setPatient(data.patient);
      });
  }, [id]);

  if (!patient) {
    return (
        <div className="page-container">
            <div className="card empty-state">
                <h2>⏳</h2>
                <h3>جارٍ تحميل بيانات المريض...</h3>
            </div>
        </div>
    );
  }

  const handleSave = async () => {
    // بوبوب تأكيد حفظ النتيجة
    const result = await Swal.fire({
  title: "تأكيد الحفظ",
  text: "هل تريد حفظ نتائج هذا المريض؟",
  icon: "question",
  showCancelButton: true,
  confirmButtonText: "حفظ",
  cancelButtonText: "إلغاء",
  confirmButtonColor: "#0d6efd",
  cancelButtonColor: "#6c757d",
});

if (!result.isConfirmed) return;

  const allResults = {
    patient_id: patient.id,
    labNumber: patient.labNumber,

    cbc: cbcResults,
    bffm: bffmResults,
    esr: esrResults,
    urine: urineResults,
    chemistry: chemistryResults,
    serology: serologyResults
  };

  const res = await fetch(`${API_URL}/results`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(allResults)
  });

  const data = await res.json();

  if (data.success) {
    await Swal.fire({
      icon: "success",
      title: "تم الحفظ",
      text: "تم حفظ النتائج بنجاح.",
      confirmButtonText: "حسناً",
      confirmButtonColor: "#0d6efd"
    });

    // تحويل لصفحة قائمة النتائج
    navigate('/results');
  } else {
    Swal.fire({
      icon: "error",
      title: "حدث خطأ",
      text: "تعذر حفظ النتائج.",
      confirmButtonText: "إغلاق",
    });
  }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">🧪 إدخال نتائج المريض</h2>
      <p className="page-description">أدخل نتائج الفحوصات المطلوبة ثم احفظ التقرير</p>
      <div className="card patient-info">
        <p>👤 <strong>الاسم:</strong> {patient.name}</p>
        <p>🧪 <strong>رقم المعمل:</strong> {patient.labNumber}</p>
      </div>

      {patient.tests.includes("CBC") && <div className="card"><CBC data={cbcResults} onChange={(p,v)=>setCbcResults(prev=>({...prev,[p]:v}))} /></div>}
      {patient.tests.includes("BFFM") && <div className="card"><BFFM value={bffmResults} onChange={setBffmResults} /></div>}

      {patient.tests.includes("ESR") && <div className="card"><ESR value={esrResults} onChange={setEsrResults} /></div>}

      {patient.tests.includes("URINE") && <div className="card"><Urine urineData={urineResults.urine || []} stoolData={urineResults.stool || []} onChange={(data) => setUrineResults(data)} /></div>}
      {patient.tests.includes("Chemistry") && <div className="card"><Chemistry tests={chemistryResults} onChange={setChemistryResults} readOnly={false} /></div>}
      {patient.tests.includes("Serology") && <div className="card"><Serology data={serologyResults} onChange={setSerologyResults} /></div>}

      <button onClick={handleSave} className="btn">
        💾 حفظ النتائج
      </button>
    </div>
  );
}

export default ResultsPage;