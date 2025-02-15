"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthenticatedHeader from "@/components/AuthenticatedHeader";
import Footer from "@/components/Footer";

export default function ViewFriendsPage() {
  const [friends, setFriends] = useState([]);
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
      // Fetch the user's friends
      fetchFriends(userName);
    }
  }, [router]);

  const fetchFriends = async (userName: string) => {
    try {
      //http://localhost:8000/
      const response = await fetch(`https://socialspherebackend-production.up.railway.app/api/friends?username=${userName}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch friends");
      }
      const data = await response.json();
      setFriends(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to fetch friends. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFriend = async (friendUsername: string) => {
    try {
      //http://localhost:8000/
      const response = await fetch("https://socialspherebackend-production.up.railway.app/api/remove-friend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: localStorage.getItem("userName"),
          friend: friendUsername,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to remove friend");
      }

      // Refresh the list of friends
      fetchFriends(localStorage.getItem("userName")!);
      alert("Friend removed successfully!");
    } catch (error) {
      console.error("Error removing friend:", error);
      alert("Failed to remove friend. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Use the AuthenticatedHeader */}
      <AuthenticatedHeader />

      {/* Main Section */}
      <main className="mt-24 flex-grow container mx-auto p-4">
        <h2 className="text-2xl font-semibold text-green-500 mb-6">Friends</h2>
        {loading ? (
          <p className="text-lg mt-2 text-black">Loading...</p>
        ) : error ? (
          <p className="text-lg mt-2 text-red-500">{error}</p>
        ) : friends.length === 0 ? (
          <p className="text-lg mt-2 text-black">No friends found.</p>
        ) : (
          <div className="pe-80 mr-16 space-y-4">
            {friends.map((friend: any) => (
              <div
                key={friend.username} // Use the friend's username as the key
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-xl font-semibold text-black">{friend.username}</h3>
                <p className="text-black">{friend.email}</p>
                <div className="mt-2 flex space-x-4">
                  <button
                    onClick={() => handleRemoveFriend(friend.username)}
                    className="flex-1 bg-red-500 text-white py-1 rounded-lg hover:bg-red-600 transition-colors duration-200"
                  >
                    Remove Friend
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