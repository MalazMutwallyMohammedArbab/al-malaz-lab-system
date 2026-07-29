import { useState, useEffect } from "react";
import TestsSelect from "../Components/TestsSelect";
import PrintPatient from "../Components/PrintPatient";
import { FaUserPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { API_URL } from "../config";

function AddPatient() {
  const [name, setName] = useState("");
  const [labNumber, setLabNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [tests, setTests] = useState([]);
  const [savedPatient, setSavedPatient] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    const result = await Swal.fire({
    title: "تأكيد الحفظ",
    text: "هل تريد حفظ بيانات المريض؟",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "حفظ",
    cancelButtonText: "إلغاء",
    confirmButtonColor: "#0d6efd"
    });

    if (!result.isConfirmed) return;

    const patientData = {
      name: name,
      labNumber: labNumber,
      phone: phone,
      gender: gender,
      age: age,
      tests
    };

    // ✅ سطر اختبار
    console.log("Sending Data:", patientData);

    try {
      const response = await fetch(
        `${API_URL}/patients/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(patientData)
        }
      );

      // مهم جداً في fetch 👇
      if (!response.ok) {
        throw new Error("Failed to register patient");
      }

      const data = await response.json();
      console.log("Server Response:", data);

      Swal.fire({
      icon: "success",
      title: "تم الحفظ",
      text: "تم تسجيل المريض بنجاح.",
      confirmButtonText: "حسناً",
      confirmButtonColor: "#0d6efd"
      });
      console.log("Saved patient:", data.patient);
      if (data.success){
        setSavedPatient(data.patient);

        // جلب الرقم التالي
        fetch(`${API_URL}/patients/next-lab-number`)
        .then(res=>res.json())
        .then(d=>{
        if(d.success){
          setLabNumber(d.labNumber);
        }
      });
    }

      // تفريغ الحقول
      setName("");
      setPhone("");
      setGender("");
      setAge("");
      setTests([]);

    } catch (error) {
      console.error("Error:", error.message);
      Swal.fire({
      icon: "error",
      title: "حدث خطأ",
      text: "تعذر تسجيل المريض.",
      confirmButtonText: "إغلاق",
      });
    }
  };

  // تعطيل الزر لو البيانات ناقصة
  const isFormValid = name.trim() !== "" &&
  tests.length > 0;

  // توليد رقم معمل جديد
  useEffect(() => {
  fetch(`${API_URL}/patients/next-lab-number`)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setLabNumber(data.labNumber);
      }
    })
    .catch(err => console.error(err));
}, []);

  return (
    <div className="page-container">
      <h2 className="page-title">
        <FaUserPlus />
        {" "}
        تسجيل مريض جديد
      </h2>
      <p className="page-description">أدخل بيانات المريض ثم اختر الفحوصات المطلوبة</p>

      <form className="card patient-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name" className="form-label">اسم المريض: </label>
          <input id="name" className="input"
            type="text"
            placeholder="اسم المريض"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="labNumber" className="form-label">رقم المعمل: </label>
          <input id= "labNumber" className="input"
            type="text"
            value={labNumber}
            readOnly
          />
        </div>

        <div className="form-row">
          <label htmlFor="phone" className="form-label">رقم الهاتف: </label>
          <input id= "phone" className="input"
            type="text"
            placeholder="رقم الهاتف"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="gender" className="form-label">الجنس: </label>
          <select
          id="gender" className="input"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          >
          <option value="" disabled>اختر الجنس</option>
          <option value="ذكر">ذكر</option>
          <option value="أنثى">أنثى</option>
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="age" className="form-label">العمر: </label>
          <input id= "age" className="input"
            type="number"
            placeholder="العمر"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <TestsSelect selectedTests={tests} onChange={setTests} />

        <button className="btn"
        type="submit" disabled={!isFormValid}>حفظ</button>
      </form>
      <PrintPatient patient={savedPatient} onClose={() => setSavedPatient(null)} />
    </div>
  );
}

export default AddPatient;