"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthenticatedHeader from "@/components/AuthenticatedHeader";
import Footer from "@/components/Footer";

export default function FriendRequestPage() {
  const [friendRequests, setFriendRequests] = useState([]);
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
      // Fetch pending friend requests
      fetchFriendRequests(userName);
    }
  }, [router]);

  const fetchFriendRequests = async (userName: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/friend-requests?username=${userName}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch friend requests");
      }
      const data = await response.json();
      setFriendRequests(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to fetch friend requests. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (senderUsername: string) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/accept-friend-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: senderUsername,
            receiver: localStorage.getItem("userName"),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to accept friend request");
      }

      // Refresh the list of friend requests
      fetchFriendRequests(localStorage.getItem("userName")!);
      alert("Friend request accepted!");
    } catch (error) {
      console.error("Error accepting friend request:", error);
      alert("Failed to accept friend request. Please try again later.");
    }
  };

  const handleRejectRequest = async (senderUsername: string) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/reject-friend-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: senderUsername,
            receiver: localStorage.getItem("userName"),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to reject friend request");
      }

      // Refresh the list of friend requests
      fetchFriendRequests(localStorage.getItem("userName")!);
      alert("Friend request rejected!");
    } catch (error) {
      console.error("Error rejecting friend request:", error);
      alert("Failed to reject friend request. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Use the AuthenticatedHeader */}
      <AuthenticatedHeader />

      {/* Main Section */}
      <main className="mt-24 flex-grow container mx-auto p-4">
        <h2 className="text-2xl font-semibold text-green-500 mb-6">
          Friend Requests
        </h2>
        {loading ? (
          <p className="text-lg mt-2 text-black">Loading...</p>
        ) : error ? (
          <p className="text-lg mt-2 text-red-500">{error}</p>
        ) : friendRequests.length === 0 ? (
          <p className="text-lg mt-2 text-black">No pending friend requests.</p>
        ) : (
            <div className="mr-80 space-y-4">
            {friendRequests.map((request: any) => (
              <div
                key={request.username} // Use the sender's username as the key
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-xl font-semibold text-black">{request.username}</h3>
                <p className="text-black">{request.email}</p>
                <div className="mt-2 flex space-x-4">
                  <button
                    onClick={() => handleAcceptRequest(request.username)}
                    className="flex-1 bg-green-500 text-white py-1 rounded-lg hover:bg-green-600 transition-colors duration-200"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRejectRequest(request.username)}
                    className="flex-1 bg-red-500 text-white py-1 rounded-lg hover:bg-red-600 transition-colors duration-200"
                  >
                    Reject
                  </button>
                </div>
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
