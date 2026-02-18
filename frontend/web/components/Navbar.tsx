"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#191919]/90 backdrop-blur-sm border-b border-[#e5e5e5] dark:border-[#333]">
      <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 text-[#2b2b2b] dark:text-white">
          <div className="size-6 text-[#2b2b2b] dark:text-white">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"></path>
            </svg>
          </div>
          <h2 className="text-lg font-bold tracking-tight uppercase">AmarBox</h2>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-10">
          <Link
            className={`text-sm font-medium transition-colors ${pathname === "/" ? "text-[#2b2b2b] dark:text-white" : "hover:text-[#2b2b2b]/70 dark:hover:text-white/70"}`}
            href="/"
          >
            Home
          </Link>
          <Link
            className={`text-sm font-medium transition-colors ${pathname.startsWith("/calculator") ? "text-[#2b2b2b] dark:text-white" : "hover:text-[#2b2b2b]/70 dark:hover:text-white/70"}`}
            href="/calculator"
          >
            Calculator
          </Link>
          <Link
            className={`text-sm font-medium transition-colors ${pathname.startsWith("/dashboard") ? "text-[#2b2b2b] dark:text-white" : "hover:text-[#2b2b2b]/70 dark:hover:text-white/70"}`}
            href="/dashboard"
          >
            Dashboard
          </Link>
          <a className="text-sm font-medium hover:text-[#2b2b2b]/70 dark:hover:text-white/70 transition-colors" href="#">
            Contact
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>
          {user ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="hidden sm:block text-sm font-medium text-[#2b2b2b] dark:text-white hover:opacity-70 transition-opacity">
                {user.name || "Account"}
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs text-[#757575] hover:text-[#2b2b2b] dark:hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="bg-[#2b2b2b] dark:bg-white text-white dark:text-[#2b2b2b] px-5 py-2 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
            >
              Sign In
            </Link>
          )}
          <button
            className="md:hidden p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="material-symbols-outlined text-[24px]">{menuOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#e5e5e5] dark:border-[#333] bg-white dark:bg-[#191919] px-6 py-4 space-y-3">
          <Link href="/" className="block text-sm font-medium py-2" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/calculator" className="block text-sm font-medium py-2" onClick={() => setMenuOpen(false)}>Calculator</Link>
          <Link href="/dashboard" className="block text-sm font-medium py-2" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <a className="block text-sm font-medium py-2" href="#">Contact</a>
        </div>
      )}
    </header>
  );
}
