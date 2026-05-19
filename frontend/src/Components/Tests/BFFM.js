function BFFM({ value = "", onChange, readOnly }) {

  return (
    <div style={{marginTop: "15px",border: "1px solid #ccc",
      padding: "10px",direction: "ltr",display: "flex",alignItems: "center"}}>

      <h4 style={{ fontWeight: "bold", width: "80px" }}>BFFM:</h4>

      <input
        type="text"
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange && onChange(e.target.value)}
        style={{width: "200px"}}
      />

    </div>
  );

}

export default BFFM;