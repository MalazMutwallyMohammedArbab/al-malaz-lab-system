import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ResultsListPage() {

  const navigate = useNavigate();

  const [resultsPatients, setResultsPatients] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    fetch("http://localhost:5000/api/results-list")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setResultsPatients(data.patients);
        }
      });

  }, []);

  // كود فلترة النتائج
  const filteredResults = resultsPatients.filter((r) => {
    const value = search.toLowerCase();
    return(
      r.name?.toLowerCase().includes(value) || r.labNumber?.toString().includes(value) || r.date?.includes(value)
    );
  });

  return (

    <div style={{ padding: "20px" }}>

      <h2 style={{ textAlign: "center" }}>
        قائمة النتائج
      </h2>
      {/*  البحث   */}
      <input type="text" placeholder="ابحث بالاسم أو رقم المعمل أو التاريخ" value={search}
      onChange={(e) => setSearch(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "20px", border: "1px solid #ccc"}} />

      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", marginTop: "20px", textAlign: "center" }}
      >

        <thead>
          <tr>
            <th>رقم المعمل</th>
            <th>الاسم</th>
            <th>الفحوصات</th>
            <th>التاريخ</th>
            <th>عرض</th>
          </tr>
        </thead>

        <tbody>

          {filteredResults.map((r) => (

            <tr key={r.id}>

              <td>{r.labNumber}</td>

              <td>{r.name}</td>

              <td>{r.tests}</td>

              <td>{new Date(r.created_at).toLocaleDateString()}</td>

              <td>
                <button onClick={() => navigate(`/result/${r.id}`)}>
                  عرض النتيجة
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default ResultsListPage;