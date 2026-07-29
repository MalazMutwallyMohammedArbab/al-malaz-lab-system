import { useEffect, useState } from "react";
import PrintPatient from "../Components/PrintPatient";
//import ResultsEntry from "../Components/ResultEntry";
import {useNavigate} from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { FaPrint } from "react-icons/fa";
import { FaFlask } from "react-icons/fa";
import { API_URL } from "../config";


function PatientsList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  //const [resultPatient, setResultPatient] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/patients`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched patients:", data);

        // نجيب الـ array الصحيحة من data.patients
        if (data.patients && Array.isArray(data.patients)) {
          setPatients(data.patients);
        } else {
          console.warn("Unexpected data format:", data);
          setPatients([]);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching patients:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
  return (
    <div className="page-container">
      <div className="card empty-state">
        <h2>⏳</h2>
        <h3>جارٍ تحميل المرضى...</h3>
      </div>
    </div>
  );}
  if (patients.length === 0) {
  return (
    <div className="page-container">
      <div className="card empty-state">
        <h2>👥</h2>
        <h3>لا يوجد مرضى مسجلون حتى الآن</h3>
        <p>
          ابدأ بتسجيل أول مريض ليظهر في هذه القائمة.
        </p>
      </div>
    </div>
  );}

  // دالة الطباعة
  const handlePrint = (patient) => {
    setSelectedPatient(patient);
  };

  // كود فلترة النتائج
  const filteredPatients = patients.filter((p) => {

  const search = searchTerm.toLowerCase();

  return (
    p.labNumber.toString().includes(search) ||
    p.name.toLowerCase().includes(search) ||
    (p.created_at && p.created_at.toLowerCase().includes(search))
  );
  });

  return (
    <div className="page-container">

      <input
      type="text"
      placeholder="🔍 بحث برقم المعمل أو الاسم أو التاريخ"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="input search-input"
      />
      <h2 className="page-title">
        <FaUsers />
        {" "}
        قائمة المرضى
      </h2>
      <p className="page-description">يمكنك البحث عن مريض أو طباعة بياناته أو إضافة النتائج</p>
      <table className="hidden card table-container">
        <thead>
          <tr>
            <th>ID</th>
            <th>رقم المعمل</th>
            <th>الاسم</th>
            <th>رقم الهاتف</th>
            <th>الجنس</th>
            <th>العمر</th>
            <th>الفحوصات</th>
            <th>تاريخ التسجيل</th>
            <th>طباعة</th>
            <th>إضافة نتيجة</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.id || patient.labNumber}>
              <td>{patient.id ?? "غير محدد"}</td>
              <td>{patient.labNumber || "غير محدد"}</td>
              <td>{patient.name || "غير محدد"}</td>
              <td>{patient.phone || "غير محدد"}</td>
              <td>{patient.gender || "غير محدد"}</td>
              <td>{patient.age || "غير محدد"}</td>
              <td>
                {Array.isArray(patient.tests) && patient.tests.length > 0
                  ? patient.tests.join(", ")
                  : "لا يوجد فحوصات"}
              </td>
              <td>{patient.created_at || patient.createdAt || "غير محدد"}</td>
              <td><button className="btn" onClick={() => handlePrint(patient)}>
                <FaPrint />
                {" "}
                طباعة
                </button></td>
              <td><button className="btn" onClick={() => navigate(`/results/${patient.id}`)}>
                <FaFlask />
                {" "}
                إضافة نتيجة
                </button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <PrintPatient patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
    </div>
  );
}

export default PatientsList;