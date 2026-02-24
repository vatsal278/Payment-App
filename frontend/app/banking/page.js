"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import { Landmark, ArrowRight } from "lucide-react";

export default function BankingPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) router.push("/login");
    }, [user, loading]);

    if (loading || !user) return null;

    return (
        <div className="pb-24 pt-8 px-6 min-h-screen bg-white dark:bg-black">
            <h1 className="text-2xl font-bold mb-6">Banking</h1>

            <div className="space-y-4">
                {/* Balance Card */}
                <div className="bg-gradient-to-br from-cashapp to-green-600 rounded-3xl p-6 text-white">
                    <p className="text-sm opacity-80 mb-1">FlowCash Balance</p>
                    <p className="text-4xl font-bold">Coming Soon</p>
                    <p className="text-sm opacity-70 mt-4">Direct deposit, paper checks, and more</p>
                </div>

                {/* Feature Cards */}
                {[
                    { title: "Direct Deposit", desc: "Get your paycheck up to 2 days early" },
                    { title: "Paper Checks", desc: "Deposit checks by taking a photo" },
                    { title: "Savings", desc: "Earn interest on your balance" },
                ].map((feature) => (
                    <div key={feature.title} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-cashapp/10 rounded-full flex items-center justify-center">
                                <Landmark className="w-5 h-5 text-cashapp" />
                            </div>
                            <div>
                                <p className="font-bold text-sm">{feature.title}</p>
                                <p className="text-xs text-gray-500">{feature.desc}</p>
                            </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                ))}
            </div>


        </div>
    );
}
