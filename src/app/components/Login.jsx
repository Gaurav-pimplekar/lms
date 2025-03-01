"use client";
import { useState, useEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      setUserRole(role);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      setUserRole(data.role);

      console.log(data);
      if (data.role === "admin") {
        router.push("/home/admin");
      } else if (data.role === "faculty") {
        router.push("/home/faculty");
      } else if (data.role === "student") {
        router.push("/home/student");
      }
    } catch (err) {
        console.log(err);
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Email</label>
            <div className="flex items-center border p-2 rounded-md">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Password</label>
            <div className="flex items-center border p-2 rounded-md">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>

    </div>
  );
};

export default Login;
