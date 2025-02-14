"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthenticatedHeader() {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  // Fetch the user's name from localStorage on the client side
  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-10 bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/dashboard" passHref>
          <h1 className="text-3xl font-semibold">Dashboard</h1>{" "}
        </Link>
        <div className="flex items-center">
          <span className="text-2xl font-semibold mr-4">
            Welcome, <span className="text-green-500">{userName}!</span>
          </span>
          {/* Friend Request Button */}
          <Link href="/dashboard/friendrequest" passHref>
            <button className="p-2 bg-purple-600 text-white rounded border-2 border-purple-500 hover:bg-purple-700 hover:scale-105 transition-all duration-200 mr-4">
              Friend Requests
            </button>
          </Link>
          {/* View Friends*/}
          <Link href="/dashboard/viewfriends" passHref>
            <button className="p-2 bg-yellow-600 text-white rounded border-2 border-yellow-500 hover:bg-yellow-700 hover:scale-105 transition-all duration-200 mr-4">
              View Friends
            </button>
          </Link>
          {/* Create Post*/}
          <Link href="/dashboard/createpost" passHref>
            <button className="p-2 bg-orange-600 text-white rounded border-2 border-orange-500 hover:bg-orange-700 hover:scale-105 transition-all duration-200 mr-4">
              Create Post
            </button>
          </Link>
          {/* Posts*/}
          <Link href="/dashboard/posts" passHref>
            <button className="p-2 bg-pink-600 text-white rounded border-2 border-pink-500 hover:bg-pink-700 hover:scale-105 transition-all duration-200 mr-4">
              Posts
            </button>
          </Link>
          {/* Users Button */}
          <Link href="/dashboard/users" passHref>
            <button className="p-2 bg-blue-600 text-white rounded border-2 border-blue-500 hover:bg-blue-700 hover:scale-105 transition-all duration-200 mr-4">
              Users
            </button>
          </Link>
          {/* Logout Button */}
          <button
            onClick={() => {
              localStorage.removeItem("userName"); // Clear the user's name
              router.push("/login"); // Redirect to login
            }}
            className="p-2 bg-green-600 text-white rounded border-2 border-red-500 hover:bg-green-700 hover:scale-105 transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}