"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { ArrowLeft, User, AtSign, Save, Loader2, CheckCircle2 } from "lucide-react";

export default function ProfileEditPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [cashtag, setCashtag] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!loading && !user) router.push("/login");
        if (user) {
            setFullName(user.fullName || user.full_name || "");
            setCashtag((user.cashtag || "").replace(/^\$/, ""));
        }
    }, [user, loading]);

    const handleSave = async () => {
        setIsSaving(true);
        setError("");
        try {
            await api.patch("/users/profile", {
                fullName: fullName,
            });
            setSaved(true);
            setTimeout(() => {
                setSaved(false);
                router.push("/");
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update profile");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading || !user) return null;

    return (
        <div className="min-h-screen bg-white dark:bg-black p-6">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-8">
                <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold">Edit Profile</h1>
            </div>

            {/* Avatar */}
            <div className="flex justify-center mb-8">
                <div className="w-24 h-24 bg-cashapp/10 rounded-full flex items-center justify-center border-4 border-cashapp/20">
                    <span className="text-cashapp text-3xl font-bold">{fullName.charAt(0)?.toUpperCase() || "?"}</span>
                </div>
            </div>

            {/* Form */}
            <div className="space-y-6 max-w-sm mx-auto">
                <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Full Name</label>
                    <div className="flex items-center space-x-3 bg-gray-50 dark:bg-zinc-900 p-4 rounded-2xl border border-transparent focus-within:border-cashapp transition-all">
                        <User className="w-5 h-5 text-gray-400" />
                        <input
                            className="bg-transparent outline-none flex-1 font-bold"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Your name"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Cashtag</label>
                    <div className="flex items-center space-x-3 bg-gray-50 dark:bg-zinc-900 p-4 rounded-2xl border border-transparent focus-within:border-cashapp transition-all">
                        <AtSign className="w-5 h-5 text-cashapp" />
                        <input
                            className="bg-transparent outline-none flex-1 font-bold"
                            value={cashtag}
                            onChange={(e) => setCashtag(e.target.value)}
                            placeholder="yourname"
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-2 ml-1">Your unique identifier on FlowCash</p>
                </div>

                {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                {saved ? (
                    <div className="flex items-center justify-center space-x-2 text-cashapp py-4">
                        <CheckCircle2 className="w-6 h-6" />
                        <span className="font-bold">Profile Updated!</span>
                    </div>
                ) : (
                    <button
                        onClick={handleSave}
                        disabled={isSaving || !fullName.trim()}
                        className="w-full bg-cashapp text-white font-bold py-5 rounded-full flex items-center justify-center space-x-2 disabled:opacity-50 shadow-lg shadow-cashapp/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /><span>Save Changes</span></>}
                    </button>
                )}
            </div>
        </div>
    );
}
