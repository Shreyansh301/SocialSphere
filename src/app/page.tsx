// rfc	React Functional Component

import Header from "@/components/Header";

export default function page() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 bg-black">
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-white">
            Welcome to SocialSphere <span className="text-green-500">API</span>
          </h2>
          <p className="mt-2 text-xl text-gray-400">
            Please Signup to continue.
          </p>
          {/* We can add more content here */}
        </div>
      </main>
    </div>
  );
}
