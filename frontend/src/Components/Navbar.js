import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar" style={{ padding: "10px", background: "#eee", fontSize: "28px", display: "flex", justifyContent: "center" }}>
      <Link to="/" style={{ marginLeft: "10px", border: "1px, solid, blue", padding: "6px" }}>
        تسجيل مريض
      </Link>

      <Link to="/patients" style={{ marginLeft: "10px", border: "1px, solid, blue", padding: "6px" }}>
        عرض المرضى
      </Link>

      <Link to="/results" style={{ marginLeft: "10px", border: "1px, solid, blue", padding: "6px" }}>
        قائمة النتائج
      </Link>
    </nav>
  );
}

export default Navbar;