"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import ThemeToggle from "@/components/ThemeToggle";
import { ArrowLeft, Moon, Bell, Lock, Shield, CreditCard, Smartphone, CircleHelp, LogOut, ChevronRight, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    // Change password
    const [showPasswordSection, setShowPasswordSection] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPasswords, setShowPasswords] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState(false);

    useEffect(() => {
        if (!loading && !user) router.push("/login");
    }, [user, loading]);

    const handleChangePassword = async () => {
        setPasswordError("");
        if (newPassword !== confirmPassword) {
            setPasswordError("Passwords don't match");
            return;
        }
        if (newPassword.length < 8) {
            setPasswordError("Password must be at least 8 characters");
            return;
        }
        setIsChangingPassword(true);
        try {
            await api.patch("/users/password", {
                currentPassword,
                newPassword,
            });
            setPasswordSuccess(true);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setPasswordSuccess(false);
                setShowPasswordSection(false);
            }, 2000);
        } catch (err) {
            setPasswordError(err.response?.data?.message || "Failed to change password");
        } finally {
            setIsChangingPassword(false);
        }
    };

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    if (loading || !user) return null;

    const settingsGroups = [
        {
            title: "Account",
            items: [
                { icon: CreditCard, label: "Payment Methods", action: () => { } },
                { icon: Lock, label: "Change Password", action: () => setShowPasswordSection(!showPasswordSection) },
                { icon: Shield, label: "Privacy & Security", action: () => { } },
            ]
        },
        {
            title: "Preferences",
            items: [
                { icon: Bell, label: "Notifications", action: () => { }, subtitle: "Enabled" },
                { icon: Moon, label: "Appearance", customRight: <ThemeToggle /> },
                { icon: Smartphone, label: "Device Settings", action: () => { } },
            ]
        },
        {
            title: "Support",
            items: [
                { icon: CircleHelp, label: "Help & Support", action: () => { } },
            ]
        },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-black p-6 pb-24">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-8">
                <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold">Settings</h1>
            </div>

            {/* User Card */}
            <button
                onClick={() => router.push("/profile")}
                className="w-full flex items-center space-x-4 p-5 bg-gray-50 dark:bg-zinc-900 rounded-3xl mb-8 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all active:scale-[0.98]"
            >
                <div className="w-14 h-14 bg-cashapp/10 rounded-full flex items-center justify-center">
                    <span className="text-cashapp text-xl font-bold">{(user.fullName || user.full_name || "?").charAt(0).toUpperCase()}</span>
                </div>
                <div className="text-left flex-1">
                    <p className="font-bold text-lg">{user.fullName || user.full_name}</p>
                    <p className="text-sm text-cashapp">{user.cashtag}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            {/* Settings Groups */}
            <div className="space-y-8">
                {settingsGroups.map((group) => (
                    <div key={group.title}>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">{group.title}</h3>
                        <div className="bg-gray-50 dark:bg-zinc-900 rounded-2xl overflow-hidden divide-y divide-gray-100 dark:divide-zinc-800">
                            {group.items.map((item) => {
                                const Container = item.action ? "button" : "div";
                                return (
                                    <Container
                                        key={item.label}
                                        onClick={item.action}
                                        className={`w-full flex items-center justify-between p-4 transition-all ${item.action ? 'hover:bg-gray-100 dark:hover:bg-zinc-800' : ''}`}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <item.icon className="w-5 h-5 text-gray-500" />
                                            <div className="text-left">
                                                <p className="font-medium text-sm">{item.label}</p>
                                                {item.subtitle && <p className="text-xs text-gray-400">{item.subtitle}</p>}
                                            </div>
                                        </div>
                                        {item.customRight || <ChevronRight className="w-4 h-4 text-gray-400" />}
                                    </Container>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Change Password Section (expandable) */}
            {
                showPasswordSection && (
                    <div className="mt-6 p-6 bg-gray-50 dark:bg-zinc-900 rounded-2xl space-y-4 animate-in slide-in-from-top duration-200">
                        <h3 className="font-bold text-sm mb-2">Change Password</h3>
                        <div className="relative">
                            <input
                                type={showPasswords ? "text" : "password"}
                                placeholder="Current password"
                                className="w-full bg-white dark:bg-black p-4 rounded-xl outline-none border border-transparent focus:border-cashapp transition-all font-medium pr-12"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>
                        <input
                            type={showPasswords ? "text" : "password"}
                            placeholder="New password"
                            className="w-full bg-white dark:bg-black p-4 rounded-xl outline-none border border-transparent focus:border-cashapp transition-all font-medium"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            type={showPasswords ? "text" : "password"}
                            placeholder="Confirm new password"
                            className="w-full bg-white dark:bg-black p-4 rounded-xl outline-none border border-transparent focus:border-cashapp transition-all font-medium"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button onClick={() => setShowPasswords(!showPasswords)} className="text-xs text-cashapp font-bold">
                            {showPasswords ? "Hide passwords" : "Show passwords"}
                        </button>
                        {passwordError && <p className="text-red-500 text-sm font-medium">{passwordError}</p>}
                        {passwordSuccess ? (
                            <div className="flex items-center justify-center space-x-2 text-cashapp py-2">
                                <CheckCircle2 className="w-5 h-5" />
                                <span className="font-bold text-sm">Password Changed!</span>
                            </div>
                        ) : (
                            <button
                                onClick={handleChangePassword}
                                disabled={isChangingPassword || !currentPassword || !newPassword}
                                className="w-full bg-cashapp text-white font-bold py-4 rounded-xl disabled:opacity-50 transition-all text-sm"
                            >
                                {isChangingPassword ? "Changing..." : "Update Password"}
                            </button>
                        )}
                    </div>
                )
            }

            {/* Sign Out */}
            <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-3 mt-8 p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl text-red-500 font-bold hover:bg-red-100 dark:hover:bg-red-900/20 transition-all active:scale-[0.98]"
            >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
            </button>

            <p className="text-center text-gray-400 text-xs mt-6">FlowCash v1.0 • Made with ❤️</p>
        </div >
    );
}
