"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthenticatedHeader from "@/components/AuthenticatedHeader";
import Footer from "@/components/Footer";

export default function CreatePostPage() { // Renamed from Dashboard to CreatePostPage
  const [userName, setUserName] = useState("");
  const [postContent, setPostContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (!name) {
      router.push("/login");
    } else {
      setUserName(name);
    }
  }, [router]);

  const handleCreatePost = async () => {
    if (!postContent.trim()) {
      alert("Post content cannot be empty!"); // Validate post content
      return;
    }

    try {
      //http://localhost:8000
      const response = await fetch("https://socialspherebackend-production.up.railway.app/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: postContent,
          author: userName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create post");
      }

      alert("Post created successfully!");
      setPostContent(""); // Clear the input field
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Use the AuthenticatedHeader */}
      <AuthenticatedHeader />

      {/* Main Section */}
      <main className="mt-24 flex-grow container mx-auto p-4">
        <h2 className="text-2xl font-semibold text-green-500 mb-6">Create a Post</h2>
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          className="text-black w-full p-2 border border-gray-300 rounded-lg mb-4"
          placeholder="What's on your mind?"
          rows={4}
        />
        <button
          onClick={handleCreatePost}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Post
        </button>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}