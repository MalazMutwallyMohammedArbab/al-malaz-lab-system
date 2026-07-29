import React from "react";
import "./cbc.css";

export default function CBC({ data, onChange, readOnly }) {
  const parameters = [
    { name: "WBC", unit: "10^9/L", normal: "4.0 - 10.0" },
    { name: "#Lym", unit: "10^9/L", normal: " - " },
    { name: "#Mid", unit: "10^9/L", normal: " - " },
    { name: "#Gran", unit: "10^9/L", normal: " - " },
    { name: "Lym%", unit: "%", normal: "20 - 40" },
    { name: "Mid%", unit: "%", normal: "0 - 10" },
    { name: "Gran%", unit: "%", normal: "50 - 70" },
    { name: "RBC", unit: "10^12/L", normal: "4.5 - 5.9" },
    { name: "HGB", unit: "g/dL", normal: "13.5 - 17.5" },
    { name: "HCT", unit: "%", normal: "40 - 50" },
    { name: "MCV", unit: "fL", normal: "80 - 100" },
    { name: "MCH", unit: "pg", normal: "27 - 33" },
    { name: "MCHC", unit: "g/dL", normal: "32 - 36" },
    { name: "RDW-CV", unit: "%", normal: "11.5 - 14.5" },
    { name: "RDW-SD", unit: "fL", normal: "39 - 46" },
    { name: "PLT", unit: "10^9/L", normal: "150 - 450" },
    { name: "MPV", unit: "fL", normal: "7.5 - 11.5" },
    { name: "PDW", unit: "%", normal: "10 - 17" },
    { name: "PCT", unit: "%", normal: "0.19 - 0.39" },
    { name: "P-LCC", unit: "%", normal: "19 - 48" },
    { name: "P-LCR", unit: "%", normal: "15 - 35" }
  ];

  const middle = Math.ceil(parameters.length / 2);

  const leftParameters = parameters.slice(0, middle);
  const rightParameters = parameters.slice(middle);

  return (
    <div className="report-card">
      <h3 className="report-title">CBC</h3>
      <div className="cbc-tables">

  <table className="report-table">
    <thead>
      <tr>
        <th>Para</th>
        <th>Result</th>
        <th>Unit</th>
        <th>Normal Range</th>
      </tr>
    </thead>

    <tbody>
      {leftParameters.map((param) => (
        <tr key={param.name}>
          <td>{param.name}</td>

          <td>
            <input
              className="report-input"
              type="text"
              value={data[param.name] || ""}
              readOnly={readOnly}
              onChange={(e) => onChange(param.name, e.target.value)}
            />
          </td>

          <td>{param.unit}</td>

          <td>{param.normal}</td>
        </tr>
      ))}
    </tbody>
  </table>

  <table className="report-table">
    <thead>
      <tr>
        <th>Para</th>
        <th>Result</th>
        <th>Unit</th>
        <th>Normal Range</th>
      </tr>
    </thead>

    <tbody>
      {rightParameters.map((param) => (
        <tr key={param.name}>
          <td>{param.name}</td>

          <td>
            <input
              className="report-input"
              type="text"
              value={data[param.name] || ""}
              readOnly={readOnly}
              onChange={(e) => onChange(param.name, e.target.value)}
            />
          </td>

          <td>{param.unit}</td>

          <td>{param.normal}</td>
        </tr>
      ))}
    </tbody>
  </table>

</div>
    </div>
  );
}