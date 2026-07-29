import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function ResultsListPage() {

  const navigate = useNavigate();

  const [resultsPatients, setResultsPatients] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    fetch(`${API_URL}/results-list`)
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

  if (resultsPatients.length === 0) {
  return (
    <div className="page-container">
      <div className="card empty-state">
        <h2>📋</h2>
        <h3>لا توجد نتائج حتى الآن</h3>
        <p>
          بعد إدخال نتائج المرضى ستظهر هنا.
        </p>
      </div>
    </div>
  );}

  return (

    <div className="page-container">

     <h2 className="page-title">📋   قائمة النتائج</h2>
     <p className="page-description"> يمكنك البحث عن النتائج وعرض التقرير الخاص بكل مريض.</p>

      {/*  البحث   */}
      <input className="input search-input"
      type="text" placeholder="🔍 ابحث بالاسم أو رقم المعمل أو التاريخ" value={search}
      onChange={(e) => setSearch(e.target.value)}
      />

      <table className="card table-container">

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

              <td>{new Date(r.created_at || r.createdAt).toLocaleDateString()}</td>

              <td>
                <button className="btn" onClick={() => navigate(`/result/${r.id}`)}>
                  📄 عرض النتيجة
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