// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import { useRouter } from "next/navigation"; 

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter(); 

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault(); // Prevent default form submission

//     // Reset error message
//     setError("");

//     // Validate input fields
//     if (!email || !password) {
//       setError("Email and password are required");
//       return;
//     }

//     try {
//       // Send a POST request to the /login endpoint
//       const response = await fetch("http://localhost:8000/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         // Handle errors from the server
//         setError(data.error || "Invalid email or password");
//       } else {
//         // Handle success
//         console.log("Login successful:", data);
//         // Redirect to a protected route (dashboard)
//         router.push("/dashboard"); 
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("Something went wrong, please try again later");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-black">
//       <div className="bg-white p-8 rounded shadow-md w-96">
//         {/* Logo Image */}
//         <div className="flex justify-center mb-6">
//           <Image src="/login.png" alt="Login Logo" width={100} height={100} />
//         </div>

//         {/* Login Form */}
//         <h2 className="text-2xl font-semibold mb-4 text-green-500">Login</h2>

//         {/* Display error message */}
//         {error && <p className="text-red-500 mb-4">{error}</p>}

//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="block w-full p-2 mb-4 border border-gray-300 rounded text-black"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="block w-full p-2 mb-4 border border-gray-300 rounded text-black"
//           />
//           <button
//             type="submit"
//             className="w-full p-2 bg-green-500 text-white rounded"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
  
    // Reset error message
    setError("");
  
    // Validate input fields
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
  
    try {
      // Send a POST request to the /login endpoint
      // const response = await fetch("http://localhost:8000/login"
      const response = await fetch("https://socialspherebackend-production.up.railway.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        // Handle errors from the server
        setError(data.error || "Invalid email or password");
      } else {
        // Handle success
        console.log("Login successful:", data);
  
        // Store the user's name in localStorage
        localStorage.setItem("userName", data.name);
  
        // Redirect to the dashboard
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong, please try again later");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-white p-8 rounded shadow-md w-96">
        {/* Logo Image */}
        <div className="flex justify-center mb-6">
          <Image src="/login.png" alt="Login Logo" width={100} height={100} />
        </div>

        {/* Login Form */}
        <h2 className="text-2xl font-semibold mb-4 text-green-500">Login</h2>

        {/* Display error message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}