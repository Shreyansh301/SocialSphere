"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthenticatedHeader from "@/components/AuthenticatedHeader"; // Import the new header
import Footer from "@/components/Footer";

export default function Dashboard() {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Fetch the user's name from localStorage
    const name = localStorage.getItem("userName");

    if (!name) {
      // If no user name is found, redirect to login
      router.push("/login");
    } else {
      // Set the user's name
      setUserName(name);
    }
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Use the AuthenticatedHeader */}
      <AuthenticatedHeader />

      {/* Main Section */}
      {/* <main className="mt-16 flex-grow container mx-auto p-4">
        <h2 className="text-2xl font-semibold text-green-500">Task 1</h2>
        <p className="text-lg mt-2 text-black">
          Create a users route that fetches all users from the database excluding
          the currently logged-in user. When the "Users" button is clicked, it
          should navigate to{" "}
          <span className="text-blue-400">
            http://localhost:3000/dashboard/users
          </span>
          , where all users will be displayed.
        </p>
        <h2 className="mt-8 text-2xl font-semibold text-green-500">Task 2</h2>
        <p className="text-lg mt-2 text-black">
          Create a friendrequest route that displays the incoming friendrequests from other users. When the "Friend Requests" button is clicked, it
          should navigate to{" "}
          <span className="text-blue-400">
            http://localhost:3000/dashboard/friendrequest
          </span>
          , where all friendrequests will be displayed with options to Accept or Reject.
        </p>
        <h2 className="mt-8 text-2xl font-semibold text-green-500">Task 3</h2>
        <p className="text-lg mt-2 text-black">
          Create a viewfriends route that displays friends whose friendrequest have been accepted. When the "View Friends" button is clicked, it
          should navigate to{" "}
          <span className="text-blue-400">
            http://localhost:3000/dashboard/viewfriends
          </span>
          , where all friends will be displayed with an option to remove a friend.
        </p>
      </main> */}

      <main className="mt-16 flex-grow container mx-auto flex items-center justify-center h-full">
        <h2 className="text-3xl font-semibold text-green-600">
          Nice to see you here again!
        </h2>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
