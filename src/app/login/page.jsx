"use client"
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock authentication (replace with real auth logic)
    if (email === "admin@example.com" && password === "password") {
      router.push("/admin-dashboard");
    } else if (email === "faculty@example.com" && password === "password") {
      router.push("/faculty-dashboard");
    } else if (email === "student@example.com" && password === "password") {
      router.push("/student-dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
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

export default LoginPage;
