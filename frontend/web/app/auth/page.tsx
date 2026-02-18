"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (tab === "signup" && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      if (tab === "login") {
        const data = await api.login(formData.email, formData.password);
        setSuccess("Login successful! Redirecting...");
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        await api.signup(formData.name, formData.email, formData.password);
        setSuccess("Account created successfully! Please log in.");
        setTab("login");
        setFormData({ ...formData, password: "", confirmPassword: "" });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="relative w-full max-w-[450px] rounded-xl bg-white dark:bg-background-dark p-8 shadow-2xl text-gray-900 dark:text-white">
        {/* Tabs */}
        <div className="mb-6">
          <div className="flex h-11 rounded-lg bg-gray-200 dark:bg-gray-800 p-1">
            <button
              onClick={() => {
                setTab("login");
                setError(null);
                setSuccess(null);
              }}
              className={`flex-1 rounded-md text-sm font-semibold transition ${
                tab === "login"
                  ? "bg-white text-primary shadow dark:bg-gray-700 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => {
                setTab("signup");
                setError(null);
                setSuccess(null);
              }}
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

        {/* Messages */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg bg-green-50 dark:bg-green-900/20 p-3 text-sm text-green-600 dark:text-green-400 border border-green-100 dark:border-green-800">
            {success}
          </div>
        )}

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Name (Sign Up only) */}
          {tab === "signup" && (
            <div className="flex flex-col">
              <label className="mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={handleChange}
                className="h-11 rounded-md border border-gray-300 dark:border-gray-600 px-3 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          )}

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              value={formData.email}
              onChange={handleChange}
              className="h-11 rounded-md border border-gray-300 dark:border-gray-600 px-3 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleChange}
              className="h-11 rounded-md border border-gray-300 dark:border-gray-600 px-3 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Confirm Password (Sign Up only) */}
          {tab === "signup" && (
            <div className="flex flex-col">
              <label className="mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="h-11 rounded-md border border-gray-300 dark:border-gray-600 px-3 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 h-11 w-full rounded-md bg-primary text-white text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition disabled:opacity-70"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white inline-block"></span>
                {tab === "login" ? "Logging in..." : "Signing up..."}
              </span>
            ) : tab === "login" ? (
              "Log In"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Footer link */}
        {tab === "login" && (
          <div className="pt-6 text-center">
            <a className="text-sm font-medium text-primary hover:underline cursor-pointer">
              Forgot password?
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
