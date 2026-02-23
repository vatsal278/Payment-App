"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const [touched, setTouched] = useState({});

    const { login } = useAuth();
    const router = useRouter();

    const validate = (field, value) => {
        const errors = { ...fieldErrors };
        if (field === 'email') {
            if (!value) errors.email = 'Email is required';
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors.email = 'Enter a valid email';
            else delete errors.email;
        }
        if (field === 'password') {
            if (!value) errors.password = 'Password is required';
            else if (value.length < 6) errors.password = 'At least 6 characters';
            else delete errors.password;
        }
        setFieldErrors(errors);
    };

    const isValid = email && password.length >= 6 && !fieldErrors.email && !fieldErrors.password;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setTouched({ email: true, password: true });
        validate('email', email);
        validate('password', password);
        if (!isValid) return;
        setIsSubmitting(true);

        try {
            await login(email, password);
            router.push("/");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid email or password");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-black p-6 transition-colors duration-300">
            <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
                <div className="flex justify-center mb-8">
                    <img src="/flowcash-logo.png" alt="FlowCash" className="w-24 h-24 rounded-3xl shadow-xl shadow-cashapp/10" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight mb-2 text-center">Welcome back</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-10 text-center">
                    Sign in to your FlowCash account.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            className={`w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900 border ${touched.email && fieldErrors.email ? 'border-red-400' : 'border-transparent'} focus:border-cashapp rounded-xl outline-none transition-all`}
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); validate('email', e.target.value); }}
                            onBlur={() => { setTouched(t => ({ ...t, email: true })); validate('email', email); }}
                        />
                        {touched.email && fieldErrors.email && (
                            <p className="text-red-500 text-xs font-medium mt-1">{fieldErrors.email}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            className={`w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900 border ${touched.password && fieldErrors.password ? 'border-red-400' : 'border-transparent'} focus:border-cashapp rounded-xl outline-none transition-all`}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); validate('password', e.target.value); }}
                            onBlur={() => { setTouched(t => ({ ...t, password: true })); validate('password', password); }}
                        />
                        {touched.password && fieldErrors.password && (
                            <p className="text-red-500 text-xs font-medium mt-1">{fieldErrors.password}</p>
                        )}
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm font-medium animate-shake">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting || !isValid}
                        className="w-full bg-cashapp hover:bg-green-600 text-white font-bold py-4 rounded-full flex items-center justify-center space-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        <span>{isSubmitting ? "Signing in..." : "Sign In"}</span>
                        {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                        {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                    </button>
                </form>

                <p className="text-center mt-8 text-gray-500 text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-cashapp font-bold hover:underline">
                        Register now
                    </Link>
                </p>
            </div>
        </div>
    );
}
