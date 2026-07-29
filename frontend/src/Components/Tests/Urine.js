import React, { useState } from "react";
import "./urine.css";

function Urine({ urineData = [], stoolData = [], onChange }) {
  // بيانات افتراضية إذا ما في بيانات
  const defaultUrine = Array(17).fill({ parameter: "", result: "" });
  const defaultStool = Array(17).fill({ parameter: "", result: "" });

  const [urine, setUrine] = useState(urineData.length ? urineData : defaultUrine);
  const [stool, setStool] = useState(stoolData.length ? stoolData : defaultStool);

  // تحديث حقل Urine
  const handleUrineChange = (index, value) => {
    const updated = [...urine];
    updated[index] = { ...updated[index], result: value };
    setUrine(updated);
    if (onChange) onChange({ urine: updated, stool });
  };

  // تحديث حقل Stool
  const handleStoolChange = (index, value) => {
    const updated = [...stool];
    updated[index] = { ...updated[index], result: value };
    setStool(updated);
    if (onChange) onChange({ urine, stool: updated });
  };

  const urineParameters = [
    "Color", "pH", "Albumin", "Glucose", "Acitone", "Bilirubin", "Urobilinogen", // Macroscopic
    "RBCs", "WBCs", "Epithelial", "Casts", "Ova", "Crystals", "Amorphous", "Mucos", "Yeast cell", "Other" // Microscopic
  ];

  const stoolParameters = [
    "Color", "Consistency", "Blood", "Mucus", "Parasites", // Macroscopic
    "Pus cells", "Red cells", "Fat", "Yeast", "Ascaris Lumbircoides",
    "Teania Saginata", "H-Nana", "Giardia Trophozoits", "Giardia Cyst",
    "E-Histolytica Trophozoites", "E-Histolytica Cyst", "Other" // Microscopic
  ];

  return (
  <div className="urine-container">

    {/* URINE */}
    <div className="urine-table">
      <h3>URINE</h3>

      {urineParameters.slice(0, 7).map((param, idx) => (
        <div key={idx} className="urine-row">
          <div className="parameter">{param}</div>
          <input
            className="result-input"
            type="text"
            value={(urine[idx] && urine[idx].result) || ""}
            onChange={(e) => handleUrineChange(idx, e.target.value)}
          />
        </div>
      ))}

      <h4>Microscopic</h4>

      {urineParameters.slice(7).map((param, idx) => (
        <div key={idx} className="urine-row">
          <div className="parameter">{param}</div>
          <input
            className="result-input"
            type="text"
            value={(urine[7 + idx] && urine[7 + idx].result) || ""}
            onChange={(e) => handleUrineChange(7 + idx, e.target.value)}
          />
        </div>
      ))}
    </div>

    {/* STOOL */}
    <div className="stool-table">
      <h3>STOOL</h3>

      {stoolParameters.slice(0, 5).map((param, idx) => (
        <div key={idx} className="urine-row">
          <div className="parameter">{param}</div>
          <input
            className="result-input"
            type="text"
            value={(stool[idx] && stool[idx].result) || ""}
            onChange={(e) => handleStoolChange(idx, e.target.value)}
          />
        </div>
      ))}

      <h4>Microscopic</h4>

      {stoolParameters.slice(5).map((param, idx) => (
        <div key={idx} className="urine-row">
          <div className="parameter">{param}</div>
          <input
            className="result-input"
            type="text"
            value={(stool[5 + idx] && stool[5 + idx].result) || ""}
            onChange={(e) => handleStoolChange(5 + idx, e.target.value)}
          />
        </div>
      ))}
    </div>

  </div>
  );
}

export default Urine;