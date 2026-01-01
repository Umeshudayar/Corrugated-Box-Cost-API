"use client";

import { useState } from "react";

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "signup">("login");

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center p-4"
      style={{
        backgroundImage:
          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuATQDm21GDUovH_8b9aZo1h8GMMDcO2wmtSrnm-aqYqcTlZUfMLv_zF3RaLa8jkD3DqVYrpn1Q9NQ84i86TVi95uNjP2EjFPaIdgu5Y21uAqt7k_LA9qI18Lt7IIW79lXVqrgv-tfDCzBzEzcSjk2SJYz6_oR-RuR_Td66jppw0-NSyZiQNYqRWK9hTLdt2or8JPtNT21nYHVzVaprwyQ9NrR6LEkL9Y-OdXZEdJEnV9LbBwXqTCfRFByX06lf2DSh4aOGY4aw_HA')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Card */}
      <div className="relative w-full max-w-[450px] rounded-xl bg-background-light dark:bg-background-dark p-8 shadow-2xl">
        {/* Tabs */}
        <div className="mb-6">
          <div className="flex h-11 rounded-lg bg-gray-200 dark:bg-gray-800 p-1">
            <button
              onClick={() => setTab("login")}
              className={`flex-1 rounded-md text-sm font-semibold transition ${
                tab === "login"
                  ? "bg-white text-primary shadow dark:bg-gray-700 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setTab("signup")}
              className={`flex-1 rounded-md text-sm font-semibold transition ${
                tab === "signup"
                  ? "bg-white text-primary shadow dark:bg-gray-700 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-center text-2xl font-bold tracking-tight text-primary dark:text-white">
          {tab === "login" ? "Log In to AmarBox" : "Create your AmarBox account"}
        </h1>

        <p className="pt-2 pb-6 text-center text-sm text-gray-500 dark:text-gray-400">
          {tab === "login"
            ? "Enter your credentials to access your account"
            : "Sign up to start designing custom packaging"}
        </p>

        {/* Form */}
        <form className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1.5 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="h-11 rounded-md border px-3 text-sm bg-transparent focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-1.5 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="h-11 rounded-md border px-3 text-sm bg-transparent focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Confirm Password (Sign Up only) */}
          {tab === "signup" && (
            <div className="flex flex-col">
              <label className="mb-1.5 text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="h-11 rounded-md border px-3 text-sm bg-transparent focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="mt-4 h-11 w-full rounded-md bg-primary text-white text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition"
          >
            {tab === "login" ? "Log In" : "Sign Up"}
          </button>
        </form>

        {/* Footer link */}
        {tab === "login" && (
          <div className="pt-6 text-center">
            <a className="text-sm font-medium text-primary hover:underline">
              Forgot password?
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
