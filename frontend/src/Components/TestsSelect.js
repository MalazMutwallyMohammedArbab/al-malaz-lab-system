function TestsSelect({ selectedTests, onChange }) {
  const allTests = ["CBC", "BFFM", "ESR", "URINE", "Chemistry", "Serology"];

  const toggleTest = (test) => {
    let updatedTests;

    if (selectedTests.includes(test)) {
      updatedTests = selectedTests.filter(t => t !== test);
    } else {
      updatedTests = [...selectedTests, test];
    }

    onChange(updatedTests);
  };

  return (
    <div>
      <label>الفحوصات:</label>

      <div style={{ marginTop: "10px" }}>
        {allTests.map(test => (
          <button
            type="button"
            key={test}
            onClick={() => toggleTest(test)}
            style={{
              margin: "5px",
              padding: "5px 10px",
              backgroundColor: selectedTests.includes(test)
                ? "#4CAF50"
                : "#eee",
              border: "1px solid #ccc",
              cursor: "pointer"
            }}
          >
            {test}
          </button>
        ))}
      </div>

      <div style={{ marginTop: "10px" }}>
        {selectedTests.map(test => (
          <span
            key={test}
            style={{
              display: "inline-block",
              margin: "5px",
              padding: "5px 10px",
              backgroundColor: "#d0ebff",
              borderRadius: "5px"
            }}
          >
            {test}
          </span>
        ))}
      </div>
    </div>
  );
}

export default TestsSelect;