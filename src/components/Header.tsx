import Link from "next/link";

export default function Header() {
  return (
    <header className=" fixed top-0 left-0 w-full z-10 flex items-center justify-between p-4 bg-green-500 text-white">
      <Link href="/" passHref>
      <h1 className="text-3xl font-bold">SocialSphere</h1>
      </Link>
      {/* Navigation */}
      <nav className="flex gap-4">
        <Link href="/login">
          <button className="p-3 rounded bg-white text-green-500 hover:bg-green-600 transition">
            Login
          </button>
        </Link>
        <Link href="/register">
        <button className="p-3 rounded bg-white text-green-500 hover:bg-green-600 transition">
          Signup
        </button>
        </Link>
      </nav>
      
    </header>
  );
}
