"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function QuotesPage() {
    const [user, setUser] = useState<any>(null);
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            router.push("/auth");
            return;
        }
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        fetchQuotes(parsedUser.user_id);
    }, [router]);

    const fetchQuotes = async (userId: string) => {
        try {
            // For now, we'll need a new endpoint to list quotes or just use the stats one and mock it
            // Let's add a list quotes endpoint to the backend first
            const response = await fetch(`http://localhost:8000/api/v1/users/${userId}/quotes`);
            if (!response.ok) throw new Error("Failed to fetch quotes");
            const data = await response.json();
            setQuotes(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!user || loading) return <div className="p-20 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#121212] p-8 text-slate-900 dark:text-white">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <Link href="/dashboard" className="text-primary font-bold text-sm mb-2 block">← Back to Dashboard</Link>
                        <h1 className="text-4xl font-black tracking-tight">My Boxes</h1>
                    </div>
                    <Link href="/calculator" className="bg-primary text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs">
                        New Quote
                    </Link>
                </div>

                {quotes.length === 0 ? (
                    <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-20 text-center shadow-xl border border-white/10">
                        <span className="text-6xl mb-6 block">📦</span>
                        <h2 className="text-2xl font-bold mb-2">No quotes found</h2>
                        <p className="text-gray-500 mb-8">Start by creating your first box calculation.</p>
                        <Link href="/calculator" className="text-primary font-black underline">Create Calculation Now</Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {quotes.map((quote: any) => (
                            <div key={quote.id} className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 shadow-lg border border-white/10 flex justify-between items-center">
                                <div>
                                    <p className="text-xs font-black text-primary/40 uppercase mb-1">Quote #{quote.id}</p>
                                    <h3 className="text-xl font-black">{quote.box_type} Box</h3>
                                    <p className="text-sm text-gray-500">
                                        {quote.dimensions.length}" x {quote.dimensions.width}" x {quote.dimensions.height}"
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-black">₹{quote.total_cost.toFixed(2)}</p>
                                    <p className="text-xs font-bold text-gray-400">{new Date(quote.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
