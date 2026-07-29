import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">

      <div className="navbar-logo">
        🧪 AL-MALAZ LAB SYSTEM
      </div>

      <div className="navbar-links">
        <Link to="/">تسجيل مريض</Link>

        <Link to="/patients">
          عرض المرضى
        </Link>

        <Link to="/results">
          قائمة النتائج
        </Link>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        تسجيل الخروج
      </button>

    </nav>
  );
}

export default Navbar;