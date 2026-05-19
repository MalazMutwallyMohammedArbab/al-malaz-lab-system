import { useEffect, useState } from "react";
import PrintPatient from "../Components/PrintPatient";
//import ResultsEntry from "../Components/ResultEntry";
import {useNavigate} from "react-router-dom";


function PatientsList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  //const [resultPatient, setResultPatient] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/patients")
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

  if (loading) return <p>جارٍ تحميل المرضى...</p>;
  if (patients.length === 0) return <p>لا يوجد مرضى مسجلين حتى الآن</p>;

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
    <div>
      <input
      type="text"
      placeholder="بحث برقم المعمل أو الاسم أو التاريخ"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{marginBottom:"15px", padding:"8px", width:"250px"}}
      />
      <h2>قائمة المرضى</h2>
      <table className="hidden"
        border="1"
        cellPadding="8"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
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
              <td>{patient.created_at || "غير محدد"}</td>
              <td><button onClick={() => handlePrint(patient)}>طباعة</button></td>
              <td><button onClick={() => navigate(`/results/${patient.id}`)}>إضافة نتيجة</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <PrintPatient patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
    </div>
  );
}

export default PatientsList;