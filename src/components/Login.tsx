import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { useRole } from "../contexts/RoleContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserFromApi } = useRole();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await AuthService.login({ email, password });
      if (response.detail.status === "success") {
        // Set user role from API response
        if (response.detail.role) {
          setUserFromApi(
            response.detail.role["role-name"] as
              | "Ibu Hamil"
              | "Petugas Kesehatan",
            response.detail.role.id
          );

          // Wait a bit for state to update before redirect
          setTimeout(() => {
            navigate("/dashboard", { replace: true });
          }, 100);
        } else {
          // If no role info, still redirect
          navigate("/dashboard", { replace: true });
        }
      }
    } catch (error) {
      // Error handling is done in AuthService with toast notifications
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
