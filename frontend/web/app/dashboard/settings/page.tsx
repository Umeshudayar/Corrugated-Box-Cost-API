"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SettingsPage() {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            router.push("/auth");
            return;
        }
        setUser(JSON.parse(storedUser));
    }, [router]);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#121212] p-8 text-slate-900 dark:text-white">
            <div className="max-w-4xl mx-auto">
                <Link href="/dashboard" className="text-primary font-bold text-sm mb-2 block">← Back to Dashboard</Link>
                <h1 className="text-4xl font-black mb-12">User Settings</h1>

                <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-8 shadow-xl border border-white/10 space-y-8">
                    <div className="border-b border-gray-100 dark:border-gray-800 pb-8">
                        <h2 className="text-xl font-bold mb-4">Profile Information</h2>
                        <div className="grid gap-4">
                            <div>
                                <label className="text-xs font-black uppercase text-gray-400">Full Name</label>
                                <div className="p-4 bg-gray-50 dark:bg-black/20 rounded-xl font-bold mt-1">{user.name}</div>
                            </div>
                            <div>
                                <label className="text-xs font-black uppercase text-gray-400">Email Address</label>
                                <div className="p-4 bg-gray-50 dark:bg-black/20 rounded-xl font-bold mt-1">{user.email}</div>
                            </div>
                            <div>
                                <label className="text-xs font-black uppercase text-gray-400">Business ID</label>
                                <div className="p-4 bg-gray-50 dark:bg-black/20 rounded-xl font-bold mt-1 text-primary">{user.user_id}</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold mb-4">Pricing Tier</h2>
                        <div className="p-6 bg-primary/10 border border-primary/20 rounded-2xl flex justify-between items-center">
                            <div>
                                <p className="font-black text-primary">Current Plan: Tier {user.tier}</p>
                                <p className="text-sm text-primary/60">Your custom manufacturing discounts are applied based on this tier.</p>
                            </div>
                            <button className="bg-primary text-white px-6 py-2 rounded-xl font-bold text-sm">Upgrade</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
