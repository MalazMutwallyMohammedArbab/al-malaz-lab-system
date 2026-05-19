import { useState, useEffect } from "react";

const presetTests = [
  { test: "اختر اسم الفحص", unit: "", range: "" },
  // 🔹 السكر
  { test: "FBG", unit: "mg/dL", range: "70-110" },
  { test: "RBG", unit: "mg/dL", range: "70-140" },
  { test: "2HBG", unit: "mg/dL", range: "70-140" },
  { test: "HbA1c", unit: "%", range: "4-6" },

  // 🔹 وظائف الكلى RFT
  { test: "Urea", unit: "mg/dL", range: "15-40" },
  { test: "Creatinine", unit: "mg/dL", range: "0.6-1.2" },
  { test: "Uric Acid", unit: "mg/dL", range: "3.5-7.2" },
  { test: "Phosphate (PO4)", unit: "mg/dL", range: "2.5-4.5" },

  // 🔹 وظائف الكبد LFT
  { test: "ALT", unit: "U/L", range: "7-56" },
  { test: "AST", unit: "U/L", range: "10-40" },
  { test: "ALP", unit: "U/L", range: "44-147" },
  { test: "GGT", unit: "U/L", range: "9-48" },
  { test: "Albumin", unit: "g/dL", range: "3.5-5.0" },
  { test: "Total Protein", unit: "g/dL", range: "6-8" },
  { test: "Bilirubin Total", unit: "mg/dL", range: "0.1-1.2" },
  { test: "Bilirubin Direct", unit: "mg/dL", range: "0-0.3" },
  { test: "Bilirubin Indirect", unit: "mg/dL", range: "0.2-0.8" },
  { test: "ALB/Globulin ratio", unit: "ratio", range: "1.0-2.5" },

  // 🔹 الدهون Lipids
  { test: "Total Cholesterol", unit: "mg/dL", range: "<200" },
  { test: "LDL", unit: "mg/dL", range: "<100" },
  { test: "HDL", unit: "mg/dL", range: ">40" },
  { test: "Triglycerides", unit: "mg/dL", range: "<150" },

  // 🔹 الكهارل Electrolytes
  { test: "Na+", unit: "mmol/L", range: "135-145" },
  { test: "K+", unit: "mmol/L", range: "3.5-5.0" },
  { test: "Cl", unit: "mmol/L", range: "95-105" },
  { test: "Ca+", unit: "mg/dL", range: "8.5-10.5" },
  { test: "Mg+", unit: "mg/dL", range: "1.7-2.2" },
  { test: "Ammonia", unit: "µmol/L", range: "15-45" },

  // 🔹 العضلات والقلب
  { test: "Creatine Kinase", unit: "U/L", range: "20-200" },
  { test: "LDH", unit: "U/L", range: "140-280" },
  { test: "Amylase", unit: "U/L", range: "23-85" },
  { test: "Lipase", unit: "U/L", range: "0-160" },

  // 🔹 الغدة الدرقية
  { test: "Free T3", unit: "pg/mL", range: "2.3-4.2" },
  { test: "Free T4", unit: "ng/dL", range: "0.8-1.8" },
  { test: "TSH", unit: "µIU/mL", range: "0.4-4.0" },

  // 🔹 هرمونات وفيتامينات
  { test: "Prolactin", unit: "ng/mL", range: "4-23" },
  { test: "Vit D", unit: "ng/mL", range: "30-100" },

  // 🔹 فحوصات نقص الحديد
  { test: "Iron", unit: "µg/dL", range: "60-170" },
  { test: "TIBC", unit: "µg/dL", range: "240-450" },
  { test: "Ferritin", unit: "ng/mL", range: "20-200" },

  // 🔹 الالتهابات
  { test: "CRP", unit: "mg/L", range: "<5" },
];

function Chemistry({ tests = [], onChange, readOnly = false }) {

  const [chemTests, setChemTests] = useState(
    Array.isArray(tests) && tests.length
      ? tests
      : [{ test: "", result: "", unit: "", range: "" }]
  );

  // ================== 🧾 وضع العرض ==================
  if (readOnly) {
    return (
      <div style={{ marginTop: "20px", marginBottom: "25px" }} dir="ltr">
        <h2 style={{ textAlign: "center", fontSize: "27px", marginBottom: "15px" }}>CHEMISTRY</h2>

        <table className="lab-table" style={{ width: "100%", textAlign: "center"}}>
          <thead>
            <tr>
              <th>Test Name</th>
              <th>Result</th>
              <th>Unit</th>
              <th>Normal Range</th>
            </tr>
          </thead>

          <tbody>
            {chemTests.map((item, index) => (
              <tr key={index}>
                <td>{item.test}</td>
                <td>{item.result}</td>
                <td>{item.unit}</td>
                <td>{item.range}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // ================== ✍️ وضع الإدخال ==================

  const updateTest = (index, field, value) => {
  const updated = [...chemTests];
  updated[index][field] = value;
  setChemTests(updated);
  if (onChange) onChange([...updated]); // ← مهم: أرسلي نسخة array جديدة
};

  const selectPreset = (index, preset) => {
    updateTest(index, "test", preset.test);
    updateTest(index, "unit", preset.unit);
    updateTest(index, "range", preset.range);
    updateTest(index, "result", chemTests[index]?.result || "");
  };

  const addTest = () => {
    const updated = [...chemTests, { test: "", result: "", unit: "", range: "" }];
    setChemTests(updated);
    if (onChange) onChange(updated);
  };

  const removeTest = (index) => {
    const updated = chemTests.filter((_, i) => i !== index);
    setChemTests(updated);
    if (onChange) onChange(updated);
  };

  return (
    <div style={{ marginTop: "40px" }} dir="ltr">
      <h2 style={{ textAlign: "center", fontSize: "22px", marginBottom: "10px" }}>Chemistry</h2>

      {chemTests.map((item, index) => (
        <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "8px", alignItems: "center" }}>
          {readOnly ? (
            <>
              <div style={{ flex: 2 }}>{item.test}</div>
              <div style={{ flex: 1 }}>{item.result}</div>
              <div style={{ flex: 1 }}>{item.unit}</div>
              <div style={{ flex: 1 }}>{item.range}</div>
            </>
          ) : (
            <>
              <select
                value={item.test}
                onChange={(e) => {
                  const preset = presetTests.find((t) => t.test === e.target.value);
                  if (preset) selectPreset(index, preset);
                  else updateTest(index, "test", e.target.value);
                }}
                style={{ flex: 2, padding: "6px", border: "1px solid #333" }}
              >
                <option value="">اختر اسم الفحص</option>
                {presetTests.map((t, i) => (
                  <option key={i} value={t.test}>{t.test}</option>
                ))}
                <option value="Other">آخر</option>
              </select>
              <input
                type="text"
                placeholder="Result"
                value={item.result}
                onChange={(e) => updateTest(index, "result", e.target.value)}
                style={{ flex: 1, padding: "6px", border: "1px solid #333" }}
              />
              <input
                type="text"
                placeholder="Unit"
                value={item.unit}
                onChange={(e) => updateTest(index, "unit", e.target.value)}
                style={{ flex: 1, padding: "6px", border: "1px solid #333" }}
              />
              <input
                type="text"
                placeholder="Normal range"
                value={item.range}
                onChange={(e) => updateTest(index, "range", e.target.value)}
                style={{ flex: 1, padding: "6px", border: "1px solid #333" }}
              />
              <button onClick={() => removeTest(index)} style={{ padding: "4px 8px", backgroundColor: "#d9534f", color: "white", border: "none", cursor: "pointer" }}>🗑</button>
            </>
          )}
        </div>
      ))}

      {!readOnly && (
        <button onClick={addTest} style={{ marginTop: "10px", padding: "6px 12px", border: "1px solid #333", cursor: "pointer" }}>+</button>
      )}
    </div>
  );
}

export default Chemistry;


/*function Chemistry({ tests, onChange, readOnly }) {
  const [chemTests, setChemTests] = useState(
    Array.isArray(tests) && tests.length ? tests : [{ test: "", result: "", unit: "", range: "" }]
  );

  useEffect(() => {
  if (!Array.isArray(tests)) {
    setChemTests([{ test: "", result: "", unit: "", range: "" }]);
  } else {
    setChemTests(tests);
  }
}, [tests]);

const updateTest = (index, field, value) => {
  const updated = [...chemTests];
  updated[index][field] = value;
  setChemTests(updated);
  if (onChange) onChange([...updated]); // ← مهم: أرسلي نسخة array جديدة
};

  const selectPreset = (index, preset) => {
    updateTest(index, "test", preset.test);
    updateTest(index, "unit", preset.unit);
    updateTest(index, "range", preset.range);
    updateTest(index, "result", chemTests[index]?.result || "");
  };

  const addTest = () => {
    const updated = [...chemTests, { test: "", result: "", unit: "", range: "" }];
    setChemTests(updated);
    if (onChange) onChange(updated);
  };

  const removeTest = (index) => {
    const updated = chemTests.filter((_, i) => i !== index);
    setChemTests(updated);
    if (onChange) onChange(updated);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Chemistry</h2>

      {chemTests.map((item, index) => (
        <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "8px", alignItems: "center" }}>
          {readOnly ? (
            <>
              <div style={{ flex: 2 }}>{item.test}</div>
              <div style={{ flex: 1 }}>{item.result}</div>
              <div style={{ flex: 1 }}>{item.unit}</div>
              <div style={{ flex: 1 }}>{item.range}</div>
            </>
          ) : (
            <>
              <select
                value={item.test}
                onChange={(e) => {
                  const preset = presetTests.find((t) => t.test === e.target.value);
                  if (preset) selectPreset(index, preset);
                  else updateTest(index, "test", e.target.value);
                }}
                style={{ flex: 2, padding: "6px", border: "1px solid #333" }}
              >
                <option value="">اختر اسم الفحص</option>
                {presetTests.map((t, i) => (
                  <option key={i} value={t.test}>{t.test}</option>
                ))}
                <option value="Other">آخر</option>
              </select>
              <input
                type="text"
                placeholder="Result"
                value={item.result}
                onChange={(e) => updateTest(index, "result", e.target.value)}
                style={{ flex: 1, padding: "6px", border: "1px solid #333" }}
              />
              <input
                type="text"
                placeholder="Unit"
                value={item.unit}
                onChange={(e) => updateTest(index, "unit", e.target.value)}
                style={{ flex: 1, padding: "6px", border: "1px solid #333" }}
              />
              <input
                type="text"
                placeholder="Normal range"
                value={item.range}
                onChange={(e) => updateTest(index, "range", e.target.value)}
                style={{ flex: 1, padding: "6px", border: "1px solid #333" }}
              />
              <button onClick={() => removeTest(index)} style={{ padding: "4px 8px", backgroundColor: "#d9534f", color: "white", border: "none", cursor: "pointer" }}>🗑</button>
            </>
          )}
        </div>
      ))}

      {!readOnly && (
        <button onClick={addTest} style={{ marginTop: "10px", padding: "6px 12px", border: "1px solid #333", cursor: "pointer" }}>+</button>
      )}
    </div>
  );
}

export default Chemistry; */