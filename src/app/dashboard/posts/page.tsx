"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthenticatedHeader from "@/components/AuthenticatedHeader";
import Footer from "@/components/Footer";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userName = localStorage.getItem("userName");

    if (!userName) {
      router.push("/login");
    } else {
      fetchPosts(userName);
    }
  }, [router]);

  const fetchPosts = async (userName: string) => {
    try {
      //http://localhost:8000
      const response = await fetch(`https://socialspherebackend-production.up.railway.app/api/posts?username=${userName}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch posts");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to fetch posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!commentContent.trim()) {
      alert("Comment cannot be empty!"); // Validate comment content
      return;
    }

    try {
      const userName = localStorage.getItem("userName");
      ////http://localhost:8000
      const response = await fetch(`https://socialspherebackend-production.up.railway.app/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commenter: userName,
          content: commentContent,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add comment");
      }

      alert("Comment added successfully!");
      setCommentContent(""); // Clear the input field
      fetchPosts(userName!); // Refresh the posts
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Use the AuthenticatedHeader */}
      <AuthenticatedHeader />

      {/* Main Section */}
      <main className="mt-24 flex-grow container mx-auto p-4">
        <h2 className="text-2xl font-semibold text-green-500 mb-6">Posts</h2>
        {loading ? (
          <p className="text-lg mt-2 text-black">Loading...</p>
        ) : error ? (
          <p className="text-lg mt-2 text-red-500">{error}</p>
        ) : posts.length === 0 ? (
          <p className="text-lg mt-2 text-black">No posts found.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post: any) => (
              <div
                key={post._id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-xl font-semibold text-black">{post.author}</h3>
                <p className="text-black">{post.content}</p>
                <div className="mt-2">
                  <h4 className="text-lg font-semibold text-black">Comments</h4>
                  {post.comments.map((comment: any) => (
                    <div key={comment._id} className="mt-2">
                      <p className="text-black">
                        <strong>{comment.commenter}:</strong> {comment.content}
                      </p>
                    </div>
                  ))}
                  <textarea
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    className="text-black w-full p-2 border border-gray-300 rounded-lg mt-2"
                    placeholder="Add a comment..."
                    rows={2}
                  />
                  <button
                    onClick={() => handleAddComment(post._id)}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 mt-2"
                  >
                    Add Comment
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