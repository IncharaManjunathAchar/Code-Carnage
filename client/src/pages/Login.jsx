import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

function Login() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/users/login", loginForm);
      alert("Login successful!");

      localStorage.setItem("userToken", res.data.token); // store JWT
      window.location.href = "/Homepage"; // redirect after login
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>
      <form className="p-4 shadow-sm border rounded" onSubmit={handleLogin}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            name="email"
            value={loginForm.email}
            onChange={(e) =>
              setLoginForm({ ...loginForm, email: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={loginForm.password}
            onChange={(e) =>
              setLoginForm({ ...loginForm, password: e.target.value })
            }
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Login
        </button>
        <div className="mt-3 text-center">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
