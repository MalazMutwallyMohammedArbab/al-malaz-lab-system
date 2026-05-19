import { useState } from "react";

function Serology({ savedSerology, onChange, readOnly = false }) {

  const serologyTestsList = [
    "HBsAg",
    "Anti-HCV",
    "HIV Ab/Ag",
    "VDRL",
    "CRP",
    "ANA",
    "ASO",
    "RF (Rheumatoid Factor)",
    "Beta HCG",
    "EBV IgM",
    "EBV IgG",
    "CMV IgM",
    "CMV IgG",
    "Toxoplasma IgM",
    "Toxoplasma IgG",
    "Other"
  ];

  const [tests, setTests] = useState(savedSerology || []);

  // ================== 🧾 وضع العرض ==================
  if (readOnly) {
    return (
      <div style={{ marginTop: "20px", marginBottom: "25px" }} dir="ltr">
        <h2 style={{ textAlign: "center", fontSize: "27px", marginBottom: "15px" }}>SEROLOGY</h2>

        <table className="lab-table" style={{ width: "100%", textAlign: "center"}}>
          <thead>
            <tr>
              <th>Test Name</th>
              <th>Result</th>
            </tr>
          </thead>

          <tbody>
            {tests.map((test, index) => (
              <tr key={index}>
                <td>{test.name}</td>
                <td>{test.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  const addTest = () => {
    const updated = [...tests, { name: "", value: "" }];
    setTests(updated);
    if (onChange) onChange(updated);
  };

  const removeTest = (index) => {
    const updated = [...tests];
    updated.splice(index, 1);
    setTests(updated);
    if (onChange) onChange(updated);
  };

  const updateTest = (index, field, value) => {
    const updated = [...tests];
    updated[index][field] = value;
    setTests(updated);
    if (onChange) onChange(updated);
  };

  return (
    <div className="serology-container" style={{ padding: "10px", direction: "ltr" }}>

      <h2 style={{ textAlign: "center", fontSize: "24px" }}>
        Serology
      </h2>

      {tests.map((test, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            margin: "5px 0",
            gap: "10px"
          }}
        >

          {/* اسم الفحص */}
          <input
            type="text"
            list={`serologyTestsList-${index}`}
            placeholder="اسم الفحص"
            value={test.name}
            onChange={(e) => updateTest(index, "name", e.target.value)}
            style={{
              flex: 2,
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
          />

          <datalist id={`serologyTestsList-${index}`}>
            {serologyTestsList.map((t, i) => (
              <option key={i} value={t} />
            ))}
          </datalist>

          {/* النتيجة */}
          <input
            type="text"
            placeholder="النتيجة"
            value={test.value}
            onChange={(e) => updateTest(index, "value", e.target.value)}
            style={{
              flex: 1,
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
          />

          {/* حذف */}
          <button
            onClick={() => removeTest(index)}
            style={{
              padding: "5px 10px",
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "4px"
            }}
          >
            حذف
          </button>

        </div>
      ))}

      {/* إضافة صف */}
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "center"
        }}
      >

        <button
          onClick={addTest}
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "4px",
            border: "1px solid #333",
            fontWeight: "bold",
            fontSize: "20px",
            cursor: "pointer"
          }}
        >
          +
        </button>

      </div>

    </div>
  );
}

export default Serology;