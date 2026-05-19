import { useState, useEffect } from "react";
import TestsSelect from "../Components/TestsSelect";
import PrintPatient from "../Components/PrintPatient";

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

    const confirmSave = window.confirm("تأكيد الحفظ؟");
    if (!confirmSave) return;

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
        "http://localhost:5000/api/patients/register",
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

      alert("تم تسجيل المريض بنجاح ✅");
      console.log("Saved patient:", data.patient);
      if (data.success){
        setSavedPatient(data.patient);

        // جلب الرقم التالي
        fetch("http://localhost:5000/api/patients/next-lab-number")
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
      alert("حصل خطأ ❌");
    }
  };

  // تعطيل الزر لو البيانات ناقصة
  const isFormValid = name.trim() !== "" &&
  tests.length > 0;

  // توليد رقم معمل جديد
  useEffect(() => {
  fetch("http://localhost:5000/api/patients/next-lab-number")
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setLabNumber(data.labNumber);
      }
    })
    .catch(err => console.error(err));
}, []);

  return (
    <div>
      <h2 style={{fontSize: "40px", textAlign: "center"}}>تسجيل مريض</h2>

      <form className="hidden" onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <div style={{display: "flex", alignItems: "center", width: "80%", justifyContent: "center"}}>
          <label htmlFor="name" style={{fontSize: "18px", width: "20%", textAlign: "center"}}>اسم المريض: </label>
          <input id="name" style={{padding: "10px", margin: "10px 0", border: "1px, solid, blue"}}
            type="text"
            placeholder="اسم المريض"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div style={{display: "flex", alignItems: "center", width: "80%", justifyContent: "center"}}>
          <label htmlFor="labNumber" style={{fontSize: "18px", width: "20%", textAlign: "center"}}>رقم المعمل: </label>
          <input id= "labNumber" style={{padding: "10px", margin: "10px 0", border: "1px, solid, blue"}}
            type="text"
            value={labNumber}
            readOnly
          />
        </div>

        <div style={{display: "flex", alignItems: "center", width: "80%", justifyContent: "center"}}>
          <label htmlFor="phone" style={{fontSize: "18px", width: "20%", textAlign: "center"}}>رقم الهاتف: </label>
          <input id= "phone" style={{padding: "10px", margin: "10px 0", border: "1px, solid, blue"}}
            type="text"
            placeholder="رقم الهاتف"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div style={{display: "flex", alignItems: "center", width: "80%", justifyContent: "center"}}>
          <label htmlFor="gender" style={{fontSize: "18px", width: "20%", textAlign: "center"}}>الجنس: </label>
          <select
          id="gender" style={{padding: "10px", margin: "10px 0", border: "1px, solid, blue"}}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          >
          <option value="" disabled>اختر الجنس</option>
          <option value="ذكر">ذكر</option>
          <option value="أنثى">أنثى</option>
          </select>
        </div>

        <div style={{display: "flex", alignItems: "center", width: "80%", justifyContent: "center"}}>
          <label htmlFor="age" style={{fontSize: "18px", width: "20%", textAlign: "center"}}>العمر: </label>
          <input id= "age" style={{padding: "10px", margin: "10px 0", border: "1px, solid, blue"}}
            type="number"
            placeholder="العمر"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <TestsSelect selectedTests={tests} onChange={setTests} />

        <button style={{padding: "8px 15px", margin: "10px 0", border: "none", color: "white", backgroundColor: isFormValid? "#4CAF50" : "#333", cursor: isFormValid? "pointer" : "not-allowed"}} 
        type="submit" disabled={!isFormValid}>حفظ</button>
      </form>
      <PrintPatient patient={savedPatient} onClose={() => setSavedPatient(null)} />
    </div>
  );
}

export default AddPatient;