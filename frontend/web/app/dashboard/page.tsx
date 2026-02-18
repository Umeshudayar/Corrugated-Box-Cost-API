"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({ total_quotes: 0, active_orders: 0, tier: 0 });
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/auth");
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    fetchData(parsedUser.user_id);
  }, [router]);

  const fetchData = async (userId: string) => {
    try {
      const [statsData, quotesData] = await Promise.all([
        api.getUserStats(userId),
        api.getUserQuotes(userId),
      ]);
      setStats(statsData);
      setQuotes(quotesData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/auth");
  };

  if (!user || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7f7] dark:bg-[#191919]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#2b2b2b] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="bg-[#f7f7f7] dark:bg-[#191919] text-[#2b2b2b] dark:text-white font-display overflow-hidden">
      <div className="flex h-screen w-full">
        {/* Sidebar Navigation */}
        <aside className="hidden md:flex w-64 flex-col bg-[#2b2b2b] dark:bg-[#111111] h-full shrink-0 transition-all duration-300">
          <div className="flex flex-col h-full p-4">
            {/* Logo */}
            <div className="flex flex-col mb-8 px-2 mt-2">
              <h1 className="text-white text-xl font-bold leading-normal tracking-tight">AmarBox</h1>
              <p className="text-gray-400 text-xs font-normal leading-normal tracking-wide uppercase mt-1">Packaging Dashboard</p>
            </div>
            {/* Navigation Links */}
            <nav className="flex flex-col gap-1 flex-1">
              <button
                onClick={() => setActiveNav("home")}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${activeNav === "home" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
              >
                <span className="material-symbols-outlined text-[20px]">home</span>
                <span className="text-sm font-medium">Home</span>
              </button>
              <Link
                href="/dashboard/quotes"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">description</span>
                <span className="text-sm font-medium">Quotes</span>
              </Link>
              <button
                onClick={() => setActiveNav("gallery")}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${activeNav === "gallery" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
              >
                <span className="material-symbols-outlined text-[20px]">photo_library</span>
                <span className="text-sm font-medium">Gallery</span>
              </button>
              <button
                onClick={() => setActiveNav("dielines")}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${activeNav === "dielines" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
              >
                <span className="material-symbols-outlined text-[20px]">grid_on</span>
                <span className="text-sm font-medium">Dielines</span>
              </button>
              <div className="mt-auto">
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">settings</span>
                  <span className="text-sm font-medium">Settings</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors w-full text-left mt-1"
                >
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                  <span className="text-sm font-medium">Log Out</span>
                </button>
              </div>
            </nav>
            {/* CTA */}
            <div className="mt-6">
              <Link
                href="/calculator"
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg h-10 px-4 bg-white text-[#2b2b2b] hover:bg-gray-100 transition-colors text-sm font-bold tracking-tight shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>New Quote</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-full overflow-y-auto bg-[#f7f7f7] dark:bg-[#191919]">
          {/* Mobile header */}
          <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#2b2b2b] text-white">
            <h1 className="text-lg font-bold">AmarBox</h1>
            <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-white">
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>

          <div className="w-full max-w-[1200px] mx-auto p-6 md:p-10 flex flex-col gap-8">
            {/* Page Heading & Search */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-[#2b2b2b] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                  Welcome back, {user.name?.split(" ")[0] || "User"}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal">
                  Here is a summary of your active packaging projects.
                </p>
              </div>
              <div className="w-full md:w-96">
                <label className="flex w-full items-center rounded-lg h-12 bg-white dark:bg-[#252525] border border-gray-200 dark:border-gray-700 shadow-sm focus-within:ring-2 focus-within:ring-[#2b2b2b]/20 transition-all overflow-hidden">
                  <div className="flex items-center justify-center pl-4 text-gray-400">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input
                    className="w-full bg-transparent border-none focus:ring-0 text-[#2b2b2b] dark:text-white placeholder:text-gray-400 px-3 text-sm font-medium"
                    placeholder="Search orders, designs, or dielines..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </label>
              </div>
            </header>

            {/* Active Production Section */}
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[#2b2b2b] dark:text-white text-lg font-bold uppercase tracking-wider text-opacity-90">Active Production</h3>
                <Link href="/dashboard/quotes" className="text-sm font-semibold text-[#2b2b2b]/70 dark:text-white/70 hover:text-[#2b2b2b] dark:hover:text-white transition-colors">
                  View All
                </Link>
              </div>
              {/* Production Card */}
              <div className="bg-white dark:bg-[#202020] rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-6 flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="bg-gray-100 dark:bg-gray-800 rounded-lg h-16 w-16 bg-cover bg-center shrink-0 border border-gray-100 dark:border-gray-700"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuArM0h7TuMHjqodNu1Fg4udFSo95QRC32gxFZJ6cJYQJcHxuC2Y0o4Ht-Al1TCQvPhX0VW6u21e77iZs3i_gIqjlyXn9Zkg_yDI_dAOgcEZZAVvY0oinSSF-WcryTHd_qCK8hJlP0mjUc_GLtVpYpoC84JDoSxrcx1uyTBclmsPvGPnHPieFoOS0N5yMVezyRpbeVlEplbxi4aXbNfg60HlsrJQJsLaZQ2H2LKMO5SGqVofkXtlP0DgCglN7qw7v66PLuLhRgB_OVk')",
                      }}
                    ></div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                        {quotes.length > 0 ? `Quote #${quotes[0]?.id || "—"}` : "Order #12345"}
                      </span>
                      <h4 className="text-lg font-bold text-[#2b2b2b] dark:text-white">
                        {quotes.length > 0 ? `${quotes[0]?.box_type || "Custom"} Box` : "Custom Kraft Mailer Box - 10x8x4\""}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Qty: {quotes.length > 0 ? "500" : "500"} • Material: E-Flute Corrugated
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs font-bold uppercase tracking-wide border border-blue-100 dark:border-blue-800">
                      In Production
                    </span>
                    <button className="p-2 text-gray-400 hover:text-[#2b2b2b] dark:hover:text-white transition-colors">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </div>
                </div>
                {/* Timeline Stepper */}
                <div className="relative w-full px-2 sm:px-4 py-2">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 dark:bg-gray-700 -translate-y-1/2 z-0"></div>
                  <div className="absolute top-1/2 left-0 w-1/2 h-0.5 bg-[#2b2b2b] dark:bg-white -translate-y-1/2 z-0"></div>
                  <div className="relative z-10 flex justify-between w-full">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#2b2b2b] dark:bg-white text-white dark:text-[#2b2b2b] flex items-center justify-center border-4 border-white dark:border-[#202020] shadow-sm">
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      </div>
                      <span className="text-xs font-semibold text-[#2b2b2b] dark:text-white">Ordered</span>
                    </div>
                    {/* Step 2 */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#2b2b2b] dark:bg-white text-white dark:text-[#2b2b2b] flex items-center justify-center border-4 border-white dark:border-[#202020] shadow-sm">
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      </div>
                      <span className="text-xs font-semibold text-[#2b2b2b] dark:text-white">Proof Approved</span>
                    </div>
                    {/* Step 3 (Active) */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white dark:bg-[#202020] text-[#2b2b2b] dark:text-white flex items-center justify-center border-4 border-[#2b2b2b] dark:border-white shadow-sm">
                        <span className="material-symbols-outlined text-[16px] animate-pulse">print</span>
                      </div>
                      <span className="text-xs font-bold text-[#2b2b2b] dark:text-white">Printing</span>
                    </div>
                    {/* Step 4 */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white dark:bg-[#202020] border-2 border-gray-200 dark:border-gray-600 flex items-center justify-center shadow-sm">
                        <span className="text-[10px] font-bold text-gray-300 dark:text-gray-600">4</span>
                      </div>
                      <span className="text-xs font-medium text-gray-400 dark:text-gray-500">Quality Check</span>
                    </div>
                    {/* Step 5 */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white dark:bg-[#202020] border-2 border-gray-200 dark:border-gray-600 flex items-center justify-center shadow-sm">
                        <span className="text-[10px] font-bold text-gray-300 dark:text-gray-600">5</span>
                      </div>
                      <span className="text-xs font-medium text-gray-400 dark:text-gray-500">Shipping</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Recent Designs Gallery */}
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[#2b2b2b] dark:text-white text-lg font-bold uppercase tracking-wider text-opacity-90">Saved Designs</h3>
                <button className="flex items-center gap-1 text-sm font-semibold text-[#2b2b2b]/70 dark:text-white/70 hover:text-[#2b2b2b] dark:hover:text-white transition-colors">
                  <span>View All</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="group flex flex-col bg-white dark:bg-[#202020] rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 w-full bg-gray-50 dark:bg-[#252525] relative p-6 flex items-center justify-center border-b border-gray-100 dark:border-gray-800">
                    <img
                      alt="Cosmetic box design"
                      className="h-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcy6z6pBSTFmCVVX00sY3fqz-D0Si2nJ194PAXpvFZOVaL57DhspeljOxmioZYUYL_o82NVrc50ZnNchS_D7gKtjft3oBQjVVpInM42-PzotqOPTYzn-qXG-yTulcYy4ahwpb5PQV2vQfVnflZIm31bGJjOyhzJvQGqS53enBPgOkCa6sgESle8lINIj5WUR4cTfyYSdGJT5DMAp-6oRwlkYobTRrsEDnx9xbiQtUv-hfk5ovXVgU28aghvWdXDUt3mSS30lHUdZU"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-3">
                    <div>
                      <h4 className="font-bold text-[#2b2b2b] dark:text-white text-base leading-tight">Serum Bottle Box</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Edited 2 days ago</p>
                    </div>
                    <div className="h-px w-full bg-gray-100 dark:bg-gray-700"></div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-white/10 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 ring-1 ring-inset ring-gray-500/10">3x3x6&quot;</span>
                        <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-white/10 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 ring-1 ring-inset ring-gray-500/10">SBS Paperboard</span>
                      </div>
                    </div>
                    <Link href="/calculator" className="mt-2 w-full py-2 border border-[#2b2b2b]/20 dark:border-white/20 rounded-md text-sm font-semibold text-[#2b2b2b] dark:text-white hover:bg-[#2b2b2b] hover:text-white dark:hover:bg-white dark:hover:text-[#2b2b2b] transition-colors text-center block">
                      Order Again
                    </Link>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="group flex flex-col bg-white dark:bg-[#202020] rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 w-full bg-gray-50 dark:bg-[#252525] relative p-6 flex items-center justify-center border-b border-gray-100 dark:border-gray-800">
                    <img
                      alt="Coffee bag packaging design"
                      className="h-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAvKbHRWMyK0I1K2_SJIYY-C5kriWONocATxb4WESQuNXP3IF-voNyF58aPI3sF9Aqq3zZyj9BdKDmdDEfMtq9GKJwrqEwysS5A5c5tcC5SmiFK7rxC431d96cR_cIlKFuGdfhkADCW2Q4zJ_p9f0-Zz-DSQhJd_jghgKUSqKvzpfXCv0KjPoLTCtTBT_ISlSHM4p7qexcMQkZjQTJ8_wbJfdVwykokcbt4MZj3WlXx7fjq1JDlDu1qUwfTNw6Uvzh91nnW5E14PI"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-3">
                    <div>
                      <h4 className="font-bold text-[#2b2b2b] dark:text-white text-base leading-tight">Roast Coffee Pouch</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Edited 5 days ago</p>
                    </div>
                    <div className="h-px w-full bg-gray-100 dark:bg-gray-700"></div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-white/10 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 ring-1 ring-inset ring-gray-500/10">12oz</span>
                        <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-white/10 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 ring-1 ring-inset ring-gray-500/10">Kraft</span>
                      </div>
                    </div>
                    <Link href="/calculator" className="mt-2 w-full py-2 border border-[#2b2b2b]/20 dark:border-white/20 rounded-md text-sm font-semibold text-[#2b2b2b] dark:text-white hover:bg-[#2b2b2b] hover:text-white dark:hover:bg-white dark:hover:text-[#2b2b2b] transition-colors text-center block">
                      Order Again
                    </Link>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="group flex flex-col bg-white dark:bg-[#202020] rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 w-full bg-gray-50 dark:bg-[#252525] relative p-6 flex items-center justify-center border-b border-gray-100 dark:border-gray-800">
                    <img
                      alt="Minimalist shipping box design"
                      className="h-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXFD0B1-bucKm2WWx24TnuM9-vUkBB2yCaiqA7hFGnpZook3mJbTugxyfSWpvaWe_Wy1Gb0ZXnFe85sWLfRe8kD57mmB9GmeWJGGQChJIIiesgISSPZ7zv2-eRMGtGNCn2s9fRAedX6EMF-H9PZ138NC5er6n2u1jp28joWGoyNNXdJU3NCxlUt__Jtri517p-sL5IM5W09hm8LVyahWPKxKf7CmPFhQR6bHjOh_aAWQ_IFaa0Fd6Zm7JqqPWnRsQwIUGmjqDYsVk"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-3">
                    <div>
                      <h4 className="font-bold text-[#2b2b2b] dark:text-white text-base leading-tight">Holiday Gift Mailer</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Edited 1 week ago</p>
                    </div>
                    <div className="h-px w-full bg-gray-100 dark:bg-gray-700"></div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-white/10 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 ring-1 ring-inset ring-gray-500/10">12x10x4&quot;</span>
                        <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-white/10 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 ring-1 ring-inset ring-gray-500/10">B-Flute</span>
                      </div>
                    </div>
                    <Link href="/calculator" className="mt-2 w-full py-2 border border-[#2b2b2b]/20 dark:border-white/20 rounded-md text-sm font-semibold text-[#2b2b2b] dark:text-white hover:bg-[#2b2b2b] hover:text-white dark:hover:bg-white dark:hover:text-[#2b2b2b] transition-colors text-center block">
                      Order Again
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Dieline Repository */}
            <section className="flex flex-col gap-4 pb-10">
              <div className="flex items-center justify-between">
                <h3 className="text-[#2b2b2b] dark:text-white text-lg font-bold uppercase tracking-wider text-opacity-90">Saved Dielines</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Dieline Item 1 */}
                <div className="flex flex-col gap-2 p-3 bg-white dark:bg-[#202020] rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#2b2b2b]/50 dark:hover:border-white/50 transition-colors cursor-pointer group">
                  <div className="aspect-square bg-white dark:bg-[#1a1a1a] rounded border border-dashed border-gray-300 dark:border-gray-600 relative overflow-hidden flex items-center justify-center">
                    <svg className="w-2/3 h-2/3 text-gray-300 dark:text-gray-600 group-hover:text-[#2b2b2b] dark:group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 100">
                      <rect height="60" width="60" x="20" y="20"></rect>
                      <line x1="20" x2="10" y1="20" y2="10"></line>
                      <line x1="80" x2="90" y1="20" y2="10"></line>
                      <line x1="20" x2="10" y1="80" y2="90"></line>
                      <line x1="80" x2="90" y1="80" y2="90"></line>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#2b2b2b] dark:text-white truncate">Standard Mailer</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">10x8x4 in</span>
                  </div>
                </div>
                {/* Dieline Item 2 */}
                <div className="flex flex-col gap-2 p-3 bg-white dark:bg-[#202020] rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#2b2b2b]/50 dark:hover:border-white/50 transition-colors cursor-pointer group">
                  <div className="aspect-square bg-white dark:bg-[#1a1a1a] rounded border border-dashed border-gray-300 dark:border-gray-600 relative overflow-hidden flex items-center justify-center">
                    <svg className="w-2/3 h-2/3 text-gray-300 dark:text-gray-600 group-hover:text-[#2b2b2b] dark:group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 100">
                      <rect height="80" rx="5" width="40" x="30" y="10"></rect>
                      <line x1="30" x2="70" y1="30" y2="30"></line>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#2b2b2b] dark:text-white truncate">Tall Cosmetic Box</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">2x2x6 in</span>
                  </div>
                </div>
                {/* Dieline Item 3 */}
                <div className="flex flex-col gap-2 p-3 bg-white dark:bg-[#202020] rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#2b2b2b]/50 dark:hover:border-white/50 transition-colors cursor-pointer group">
                  <div className="aspect-square bg-white dark:bg-[#1a1a1a] rounded border border-dashed border-gray-300 dark:border-gray-600 relative overflow-hidden flex items-center justify-center">
                    <svg className="w-2/3 h-2/3 text-gray-300 dark:text-gray-600 group-hover:text-[#2b2b2b] dark:group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 100">
                      <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"></path>
                      <line x1="10" x2="50" y1="30" y2="50"></line>
                      <line x1="90" x2="50" y1="30" y2="50"></line>
                      <line x1="50" x2="50" y1="90" y2="50"></line>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#2b2b2b] dark:text-white truncate">Hexagon Gift Box</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">5x5x3 in</span>
                  </div>
                </div>
                {/* Add New Dieline */}
                <div className="flex flex-col items-center justify-center gap-2 p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer aspect-[3/4] md:aspect-auto h-full min-h-[140px]">
                  <div className="h-10 w-10 rounded-full bg-white dark:bg-[#252525] border border-gray-200 dark:border-gray-600 flex items-center justify-center text-[#2b2b2b] dark:text-white">
                    <span className="material-symbols-outlined">add</span>
                  </div>
                  <span className="text-xs font-bold text-[#2b2b2b] dark:text-white">Upload Dieline</span>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
