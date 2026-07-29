import { useState } from "react";
import "./LoginPage.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "123456") {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/";
    } else {
      alert("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h1>🧪</h1>

        <h2>AL-MALAZ LAB SYSTEM</h2>

        <p>تسجيل الدخول إلى النظام</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="اسم المستخدم"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
}