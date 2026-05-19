import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CBC from "../Components/Tests/CBC";
import BFFM from "../Components/Tests/BFFM";
import ESR from "../Components/Tests/ESR";
import Urine from "../Components/Tests/Urine";
import Chemistry from "../Components/Tests/Chemistry";
import Serology from "../Components/Tests/Serology";

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
    fetch(`http://localhost:5000/api/patients/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setPatient(data.patient);
      });
  }, [id]);

  if (!patient) return <p>جاري تحميل بيانات المريض...</p>;

  const handleSave = async () => {
    // بوبوب تأكيد حفظ النتيجة
    const confirmSave = window.confirm("هل أنت متأكد من حفظ النتائج؟");
    if (!confirmSave) return;

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

  const res = await fetch("http://localhost:5000/api/results", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(allResults)
  });

  const data = await res.json();

  if (data.success) {
    alert("تم حفظ النتائج بنجاح ✅");

    // تحويل لصفحة قائمة النتائج
    navigate('/results');
  } else {
    alert("حدث خطأ أثناء الحفظ");
  }

};

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>إدخال نتائج المريض</h2>
      <p><b>الاسم:</b> {patient.name}</p>
      <p><b>رقم المعمل:</b> {patient.labNumber}</p>

      {patient.tests.includes("CBC") && <CBC data={cbcResults} onChange={(p,v)=>setCbcResults(prev=>({...prev,[p]:v}))} />}
      {patient.tests.includes("BFFM") && <BFFM value={bffmResults} onChange={setBffmResults} />}

      {patient.tests.includes("ESR") && <ESR value={esrResults} onChange={setEsrResults} />}

      {patient.tests.includes("URINE") && <Urine urineData={urineResults.urine || []} stoolData={urineResults.stool || []} onChange={(data) => setUrineResults(data)} />}
      {patient.tests.includes("Chemistry") && <Chemistry tests={chemistryResults} onChange={setChemistryResults} readOnly={false} />}
      {patient.tests.includes("Serology") && <Serology data={serologyResults} onChange={setSerologyResults} />}

      <button
        onClick={handleSave}
        style={{ marginTop: "20px", padding: "10px 20px", backgroundColor:"#4CAF50", color:"white", border:"none", cursor:"pointer" }}
      >
        حفظ النتائج
      </button>
    </div>
  );
}

export default ResultsPage;