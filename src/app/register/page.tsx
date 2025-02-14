"use client"

import Image from "next/image";
import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    // Reset error and success messages
    setError("");
    setSuccess("");

    // Validate input fields
    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      // Send a POST request to the /register endpoint
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle errors from the server
        setError(data.error || "Something went wrong");
      } else {
        // Handle success
        setSuccess(data.message);
        // Clear form fields
        setUsername("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Something went wrong, please try again later");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-white p-8 rounded shadow-md w-96">
        {/* Image Logo */}
        <div className="flex justify-center mb-6">
          <Image src="/register.png" alt="Logo" width={100} height={100} />
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-green-500">Register</h2>

        {/* Display error message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Display success message */}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full p-2 mb-4 border border-gray-300 rounded text-black"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-2 mb-4 border border-gray-300 rounded text-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-2 mb-4 border border-gray-300 rounded text-black"
          />
          <button
            type="submit"
            className="w-full p-2 bg-green-500 text-white rounded"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}