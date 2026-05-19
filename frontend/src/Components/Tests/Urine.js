import React, { useState } from "react";

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
    <div style={{ display: "flex", gap: "30px", direction: "ltr", marginTop: "20px" }}>
      {/* URINE */}
      <div className="urine-table" style={{ flex: 1, borderRight: "2px solid #333", paddingRight: "10px" }}>
        <h3 style={{ textAlign: "center", fontSize: "20px", marginBottom: "8px" }}>URINE</h3>
        {/* Macroscopic */}
        {urineParameters.slice(0, 7).map((param, idx) => (
          <div key={idx} style={{ display: "flex", marginBottom: "6px", alignItems: "center" }}>
            <div style={{ width: "120px" }}>{param}</div>
            <input
              type="text"
              value={(urine[idx] && urine[idx].result) || ""}
              onChange={(e) => handleUrineChange(idx, e.target.value)}
              style={{ flex: 1, border: "1px solid #333", padding: "4px" }}
            />
          </div>
        ))}

        <h4 style={{ textAlign: "center", fontSize: "18px", marginBottom: "6px", marginTop: "14px" }}>Microscopic</h4>
        {urineParameters.slice(7).map((param, idx) => (
          <div key={idx} style={{ display: "flex", marginBottom: "6px", alignItems: "center" }}>
            <div style={{ width: "120px" }}>{param}</div>
            <input
              type="text"
              value={(urine[7 + idx] && urine[7 + idx].result) || ""}
              onChange={(e) => handleUrineChange(7 + idx, e.target.value)}
              style={{ flex: 1, border: "1px solid #333", padding: "4px" }}
            />
          </div>
        ))}
      </div>

      {/* STOOL */}
      <div className="stool-table" style={{ flex: 1, paddingLeft: "10px" }}>
        <h3 style={{ textAlign: "center", fontSize: "20px", marginBottom: "8px" }}>STOOL</h3>
        {/* Macroscopic */}
        {stoolParameters.slice(0, 5).map((param, idx) => (
          <div key={idx} style={{ display: "flex", marginBottom: "6px", alignItems: "center" }}>
            <div style={{ width: "120px" }}>{param}</div>
            <input
              type="text"
              value={(stool[idx] && stool[idx].result) || ""}
              onChange={(e) => handleStoolChange(idx, e.target.value)}
              style={{ flex: 1, border: "1px solid #333", padding: "4px" }}
            />
          </div>
        ))}

        <h4 style={{ textAlign: "center", fontSize: "18px", marginBottom: "6px", marginTop: "14px" }}>Microscopic</h4>
        {stoolParameters.slice(5).map((param, idx) => (
          <div key={idx} style={{ display: "flex", marginBottom: "6px", alignItems: "center" }}>
            <div style={{ width: "120px" }}>{param}</div>
            <input
              type="text"
              value={(stool[5 + idx] && stool[5 + idx].result) || ""}
              onChange={(e) => handleStoolChange(5 + idx, e.target.value)}
              style={{ flex: 1, border: "1px solid #333", padding: "4px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Urine;