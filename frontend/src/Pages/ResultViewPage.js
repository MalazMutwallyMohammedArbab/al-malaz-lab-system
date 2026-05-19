import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CBC from "../Components/Tests/CBC";
import BFFM from "../Components/Tests/BFFM";
import ESR from "../Components/Tests/ESR";
import Urine from "../Components/Tests/Urine";
import Chemistry from "../Components/Tests/Chemistry";
import Serology from "../Components/Tests/Serology";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function ResultViewPage() {
  const { id } = useParams();

  const [patient, setPatient] = useState(null);
  const [cbcResults, setCbcResults] = useState({});
  const [bffmResults, setBffmResults] = useState();
  const [esrResults, setEsrResults] = useState();
  const [urineResults, setUrineResults] = useState({});
  const [chemistryResults, setChemistryResults] = useState([]);
  const [serologyResults, setSerologyResults] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/result/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const r = data.result;

          setPatient(r);
          setCbcResults(JSON.parse(r.cbc || "{}"));
          setBffmResults(r.bffm || "");
          setEsrResults(r.esr || "");
          setUrineResults(JSON.parse(r.urine || "{}"));
          setChemistryResults(JSON.parse(r.chemistry || "[]"));
          setSerologyResults(JSON.parse(r.serology || "[]"));
        }
      });
  }, [id]);

  if (!patient) return <p>جاري تحميل النتيجة...</p>;

  const header = (
  <div>
    <h1 style={{ textAlign: "center" }}>AL-MALAZ LABORATORY</h1>
    <p style={{ textAlign: "center" }}>Khartoum - Sudan</p>
    <hr />
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <p><b>الاسم:</b> {patient.name}</p>
      <p><b>رقم المعمل:</b> {patient.labNumber}</p>
      <p><b>الهاتف:</b> {patient.phone}</p>
      <p><b>العمر:</b> {patient.age}</p>
      <p><b>التاريخ:</b> {new Date(patient.created_at).toLocaleDateString()}</p>
    </div>
    <hr />
  </div>
  );

  const Footer = (
  <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
    <p>📍 موقعنا: موقع المعمل</p>
    <p>📞 للتواصل والاستفسار: رقم المعمل</p>
  </div>
  );

  const openWhatsApp = () => {

  let phone = patient.phone || "";

  // إزالة المسافات
  phone = phone.replace(/\s+/g, "");

  // تحويل الرقم السوداني
  if (phone.startsWith("0")) {
    phone = "249" + phone.substring(1);
  }

  // إزالة +
  if (phone.startsWith("+")) {
    phone = phone.substring(1);
  }

  const message =
    `نتيجة الفحص الخاصة بـ ${patient.name}`;

  const url =
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
  };

  return (
  <div style={{ padding: "20px" }} id="reportContent">

  {/* النتائج */}
  {/* الصفحة 1 */}
  {(patient.tests.includes("CBC") ||
  patient.tests.includes("BFFM") ||
  patient.tests.includes("ESR")) && (

  <div className="print-section">
    {header}
    <div className="no-break">
    {patient.tests.includes("CBC") && <CBC data={cbcResults} readOnly />}
    {patient.tests.includes("BFFM") && <BFFM value={bffmResults} readOnly />}
    {patient.tests.includes("ESR") && <ESR value={esrResults} readOnly />}
    </div>
    {Footer}
  </div>)}


  {/* الصفحة 2 */}
  {patient.tests.includes("URINE") && (
    <div className="print-section">
      {header}
      <Urine
      urineData={urineResults.urine || []}
      stoolData={urineResults.stool || []}
      readOnly
      />
      {Footer}
    </div>
  )}


  {/* ================== الصفحة 3 ================== */}
  {(patient.tests.includes("Chemistry") || patient.tests.includes("Serology")) && (
  <div className="print-section">
    {header}
    {patient.tests.includes("Chemistry") && (
      <Chemistry tests={chemistryResults} readOnly />
    )}

    {patient.tests.includes("Serology") && (
      <Serology savedSerology={serologyResults} readOnly />
    )}

    {Footer}

  </div>
)}

  {/* زر الطباعة */}
  <div style={{ textAlign: "center", marginTop: "20px", display: "flex", justifyContent: "center", marginBottom: "20px" }}>
    <button style={{ marginLeft: "9px" }} className="print-btn" onClick={() =>{
      // حفظ اسم الموقع الأصلي
      const originTitle = "نظام طبي";

      // اسم ملف ال PDF
      document.title = 
      `Result_${patient.name}_${patient.labNumber}`;

      // بعد الطباعة يرجع الاسم القديم
      window.onafterprint = () => {
        document.title = originTitle;
      }

      // فتح الطباعة
      window.print()}}>
      🖨️ طباعة
    </button>

    {/* زر إرسال واتساب */}
  <button style={{ marginRight: "9px" }} onClick={openWhatsApp} className="print-btn">
  📤 إرسال واتساب
  </button>
  </div>

</div>
  );
}

export default ResultViewPage;