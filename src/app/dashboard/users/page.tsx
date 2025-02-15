// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import AuthenticatedHeader from "@/components/AuthenticatedHeader";
// import Footer from "@/components/Footer";

// export default function UserPage() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     // Fetch the user's name from localStorage
//     const userName = localStorage.getItem("userName");

//     if (!userName) {
//       // If no user name is found, redirect to login
//       router.push("/login");
//     } else {
//       // Fetch all users excluding the currently logged-in user
//       fetchUsers(userName);
//     }
//   }, [router]);

//   const fetchUsers = async (userName: string) => {
//     try {
//       const response = await fetch("http://localhost:8000/api/users");
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to fetch users");
//       }
//       const data = await response.json();

//       // Filter out the currently logged-in user
//       const filteredUsers = data.filter((user: any) => user.username !== userName);
//       setUsers(filteredUsers);
//     } catch (error) {
//       console.error("Fetch error:", error);
//       setError("Failed to fetch users. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       {/* Use the AuthenticatedHeader */}
//       <AuthenticatedHeader />

//       {/* Main Section */}
//       <main className="mt-24 flex-grow container mx-auto p-4">
//         <h2 className="text-2xl font-semibold text-green-500 mb-6">All Users</h2>
//         {loading ? (
//           <p className="text-lg mt-2 text-black">Loading...</p>
//         ) : error ? (
//           <p className="text-lg mt-2 text-red-500">{error}</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {users.map((user: any) => (
//               <div
//                 key={user._id}
//                 className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
//               >
//                 <h3 className="text-xl font-semibold text-gray-800">{user.username}</h3>
//                 <p className="text-gray-600 mt-2">{user.email}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthenticatedHeader from "@/components/AuthenticatedHeader";
import Footer from "@/components/Footer";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Fetch the user's name from localStorage
    const userName = localStorage.getItem("userName");
  
    if (!userName) {
      // If no user name is found, redirect to login
      router.push("/login");
    } else {
      // Fetch all users excluding the currently logged-in user
      fetchUsers(userName);
    }
  }, [router]);

  const fetchUsers = async (userName: string) => {
    try {
      // Pass the logged-in user's username as a query parameter
      //const response = await fetch(`http://localhost:8000/api/users?username=${userName}`
      const response = await fetch(`https://socialspherebackend-production.up.railway.app/api/users?username=${userName}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch users");
      }
      const data = await response.json();
  
      // No need to filter users here since the backend already excludes the logged-in user
      setUsers(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendFriendRequest = async (receiverUsername: string) => {
    try {
      const senderUsername = localStorage.getItem("userName");

      if (!senderUsername) {
        throw new Error("You must be logged in to send a friend request.");
      }
      
      //const response = await fetch("http://localhost:8000/api/friend-request",
      const response = await fetch("https://socialspherebackend-production.up.railway.app/api/friend-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: senderUsername,
          receiver: receiverUsername,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send friend request");
      }

      alert("Friend request sent successfully!");
    } catch (error) {
      console.error("Error sending friend request:", error);
      alert("Failed to send friend request. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Use the AuthenticatedHeader */}
      <AuthenticatedHeader />

      {/* Main Section */}
      <main className="mt-24 flex-grow container mx-auto p-4">
        <h2 className="text-2xl font-semibold text-green-500 mb-6">All Users</h2>
        {loading ? (
          <p className="text-lg mt-2 text-black">Loading...</p>
        ) : error ? (
          <p className="text-lg mt-2 text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {users.map((user: any) => (
              <div
                key={user._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-xl font-semibold text-gray-800">{user.username}</h3>
                <p className="text-gray-600 mt-2">{user.email}</p>
                <button
                  onClick={() => handleSendFriendRequest(user.username)}
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  Send Friend Request
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}