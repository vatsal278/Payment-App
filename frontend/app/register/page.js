"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Loader2, CheckCircle2, Mail, Shield, MapPin, AtSign, User, Lock, Smartphone, ShieldCheck } from "lucide-react";
import PinModal from "@/components/PinModal";

// Steps: 0=Splash, 1=Email, 2=OTP, 3=Name, 4=Cashtag, 5=ZIP, 6=Identity, 7=Password, 8=PIN, 9=Success
const TOTAL_STEPS = 10;

export default function RegisterPage() {
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cashtag, setCashtag] = useState("");
    const [zip, setZip] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [generatedOtp, setGeneratedOtp] = useState("");

    const { register, user } = useAuth();
    const router = useRouter();
    const otpRefs = useRef([]);

    // Splash auto-advance
    useEffect(() => {
        if (step === 0) {
            const timer = setTimeout(() => setStep(1), 2200);
            return () => clearTimeout(timer);
        }
    }, [step]);

    // Generate random OTP when reaching step 2
    useEffect(() => {
        if (step === 2) {
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            setGeneratedOtp(code);
        }
    }, [step]);

    // Auto-advance on OTP complete
    useEffect(() => {
        const entered = otp.join("");
        if (entered.length === 6 && entered === generatedOtp) {
            setTimeout(() => {
                setError("");
                setStep(3);
            }, 400);
        }
    }, [otp, generatedOtp]);

    const handleOtpChange = (index, value) => {
        if (value.length > 1) value = value.slice(-1);
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next
        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleNext = () => {
        setError("");
        if (step === 1) {
            if (!email || !email.includes("@")) {
                setError("Please enter a valid email");
                return;
            }
            setStep(2);
        } else if (step === 2) {
            const entered = otp.join("");
            if (entered.length !== 6) {
                setError("Please enter the full code");
                return;
            }
            if (entered !== generatedOtp) {
                setError("Invalid code. Try again.");
                return;
            }
            setStep(3);
        } else if (step === 3) {
            if (!firstName.trim() || !lastName.trim()) {
                setError("Please enter your full name");
                return;
            }
            setStep(4);
        } else if (step === 4) {
            if (!cashtag.trim() || cashtag.trim().length < 2) {
                setError("Cashtag must be at least 2 characters");
                return;
            }
            setStep(5);
        } else if (step === 5) {
            if (!zip.trim() || zip.trim().length < 5) {
                setError("Please enter a valid ZIP code");
                return;
            }
            setStep(6);
        } else if (step === 6) {
            setStep(7);
        } else if (step === 7) {
            if (!password || password.length < 6) {
                setError("Password must be at least 6 characters");
                return;
            }
            handleRegister();
        }
    };

    const handleRegister = async () => {
        setIsSubmitting(true);
        setError("");
        try {
            const tag = cashtag.startsWith("$") ? cashtag : `$${cashtag}`;
            await register({
                email,
                password,
                fullName: `${firstName} ${lastName}`,
                cashtag: tag,
            });
            setStep(8);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Try a different cashtag or email.");
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        setError("");
        if (step > 1 && step < 8) setStep(step - 1);
    };

    const progress = step === 0 ? 0 : Math.min(((step) / (TOTAL_STEPS - 2)) * 100, 100);

    // ─── Step 0: Splash ───────────────────────────────
    if (step === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-cashapp animate-in fade-in zoom-in duration-500">
                <img
                    src="/flowcash-logo.png"
                    alt="FlowCash"
                    className="w-32 h-32 rounded-3xl shadow-2xl shadow-black/30 animate-bounce"
                />
                <h1 className="text-white text-4xl font-bold mt-6 tracking-tight">FlowCash</h1>
                <p className="text-white/70 mt-2">The fastest way to send money</p>
            </div>
        );
    }

    // ─── Step 9: Success ──────────────────────────────
    if (step === 9) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-cashapp text-white animate-in fade-in zoom-in duration-300">
                <CheckCircle2 className="w-24 h-24 mb-6 animate-bounce" />
                <h1 className="text-3xl font-bold">You're all set!</h1>
                <p className="mt-2 text-white/80">Welcome to FlowCash, {firstName}.</p>
                <p className="mt-1 text-white/60 text-sm">Redirecting to dashboard...</p>
            </div>
        );
    }

    // Step configs for rendering
    const stepConfigs = {
        1: {
            icon: Mail,
            title: "Enter your email",
            subtitle: "We'll send you a confirmation code",
        },
        2: {
            icon: Smartphone,
            title: "Enter the code",
            subtitle: `Sent to ${email}`,
        },
        3: {
            icon: User,
            title: "What's your name",
            subtitle: "Your legal name helps keep FlowCash secure",
        },
        4: {
            icon: AtSign,
            title: "Choose a $Cashtag",
            subtitle: "Your unique name for getting paid by anyone",
        },
        5: {
            icon: MapPin,
            title: "Enter your ZIP Code",
            subtitle: "To keep your account safe, verification is required",
        },
        6: {
            icon: Shield,
            title: "Verify your identity",
            subtitle: "All photos are encrypted and your information stays private",
        },
        7: {
            icon: Lock,
            title: "Create a password",
            subtitle: "Secure your FlowCash account",
        },
        8: {
            icon: ShieldCheck,
            title: "Create a PIN",
            subtitle: "You will use this PIN for all your transactions",
        },
    };

    const config = stepConfigs[step];
    const StepIcon = config?.icon || Mail;

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-black transition-colors duration-300">
            {/* Progress Bar */}
            <div className="h-1 bg-gray-100 dark:bg-zinc-900">
                <div
                    className="h-full bg-cashapp transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between p-4">
                <button
                    onClick={handleBack}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                    Step {step} of 7
                </p>
                <div className="w-10" />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col px-8 pt-4 pb-8 max-w-md mx-auto w-full animate-in slide-in-from-right duration-300" key={step}>
                {/* Step Icon */}
                <div className="w-16 h-16 bg-cashapp/10 rounded-2xl flex items-center justify-center mb-6">
                    <StepIcon className="w-8 h-8 text-cashapp" />
                </div>

                <h1 className="text-3xl font-bold tracking-tight mb-2">{config?.title}</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">{config?.subtitle}</p>

                {/* Step-specific content */}
                <div className="flex-1 space-y-4">
                    {/* Step 1: Email */}
                    {step === 1 && (
                        <input
                            autoFocus
                            type="email"
                            className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-900 border-2 border-transparent focus:border-cashapp rounded-2xl outline-none transition-all text-lg font-medium"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleNext()}
                        />
                    )}

                    {/* Step 2: OTP */}
                    {step === 2 && (
                        <>
                            <div className="flex justify-center space-x-3 mb-4">
                                {otp.map((digit, i) => (
                                    <input
                                        key={i}
                                        ref={(el) => (otpRefs.current[i] = el)}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        autoFocus={i === 0}
                                        className={`w-12 h-14 text-center text-2xl font-bold bg-gray-50 dark:bg-zinc-900 rounded-xl border-2 outline-none transition-all ${digit ? 'border-cashapp' : 'border-transparent focus:border-cashapp'
                                            }`}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(i, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                                        onPaste={(e) => {
                                            e.preventDefault();
                                            const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
                                            const newOtp = [...otp];
                                            paste.split("").forEach((c, j) => { if (j < 6) newOtp[j] = c; });
                                            setOtp(newOtp);
                                            otpRefs.current[Math.min(paste.length, 5)]?.focus();
                                        }}
                                    />
                                ))}
                            </div>
                            <div className="bg-cashapp/5 border border-cashapp/10 rounded-2xl p-4 text-center">
                                <p className="text-xs text-gray-500 mb-1">Your verification code is:</p>
                                <p className="text-2xl font-bold text-cashapp tracking-[0.3em]">{generatedOtp}</p>
                                <p className="text-[10px] text-gray-400 mt-1">(Simulated for demo)</p>
                            </div>
                        </>
                    )}

                    {/* Step 3: Name */}
                    {step === 3 && (
                        <>
                            <input
                                autoFocus
                                type="text"
                                className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-900 border-2 border-transparent focus:border-cashapp rounded-2xl outline-none transition-all text-lg font-medium"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                                type="text"
                                className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-900 border-2 border-transparent focus:border-cashapp rounded-2xl outline-none transition-all text-lg font-medium"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleNext()}
                            />
                        </>
                    )}

                    {/* Step 4: Cashtag */}
                    {step === 4 && (
                        <>
                            <div className="flex items-center bg-gray-50 dark:bg-zinc-900 border-2 border-transparent focus-within:border-cashapp rounded-2xl px-5 py-4 transition-all">
                                <span className="text-cashapp text-2xl font-bold mr-2">$</span>
                                <input
                                    autoFocus
                                    type="text"
                                    className="bg-transparent outline-none flex-1 text-lg font-bold"
                                    placeholder="Cashtag"
                                    value={cashtag.replace(/^\$/, '')}
                                    onChange={(e) => setCashtag(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                                    onKeyDown={(e) => e.key === "Enter" && handleNext()}
                                />
                            </div>
                            <p className="text-xs text-gray-400 ml-1">
                                Letters, numbers, and underscores only
                            </p>
                            {cashtag && (
                                <div className="bg-gray-50 dark:bg-zinc-900 rounded-2xl p-4">
                                    <p className="text-sm text-gray-500">Your cashtag will be</p>
                                    <p className="text-xl font-bold text-cashapp mt-1">${cashtag.replace(/^\$/, '')}</p>
                                </div>
                            )}
                        </>
                    )}

                    {/* Step 5: ZIP */}
                    {step === 5 && (
                        <>
                            <input
                                autoFocus
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-900 border-2 border-transparent focus:border-cashapp rounded-2xl outline-none transition-all text-lg font-medium tracking-wider"
                                placeholder="ZIP Code"
                                value={zip}
                                onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                onKeyDown={(e) => e.key === "Enter" && handleNext()}
                            />
                            <div className="flex items-center space-x-3 p-4 bg-cashapp/5 border border-cashapp/10 rounded-2xl">
                                <Shield className="w-5 h-5 text-cashapp shrink-0" />
                                <p className="text-xs text-gray-500">
                                    To keep your account safe, verification is required to buy, send, and receive on FlowCash
                                </p>
                            </div>
                        </>
                    )}

                    {/* Step 6: Identity Verification (Simulated) */}
                    {step === 6 && (
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl">
                                <div className="w-12 h-12 bg-cashapp/10 rounded-xl flex items-center justify-center">
                                    <Shield className="w-6 h-6 text-cashapp" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Photo ID</p>
                                    <p className="text-xs text-gray-500">Driver's license, passport, or state ID</p>
                                </div>
                                <CheckCircle2 className="w-5 h-5 text-cashapp ml-auto" />
                            </div>
                            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl">
                                <div className="w-12 h-12 bg-cashapp/10 rounded-xl flex items-center justify-center">
                                    <User className="w-6 h-6 text-cashapp" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Selfie</p>
                                    <p className="text-xs text-gray-500">A quick photo to match your ID</p>
                                </div>
                                <CheckCircle2 className="w-5 h-5 text-cashapp ml-auto" />
                            </div>
                            <div className="p-4 bg-cashapp/5 border border-cashapp/10 rounded-2xl text-center">
                                <p className="text-xs text-gray-500">✅ Verification auto-approved for demo</p>
                            </div>
                            <p className="text-[11px] text-gray-400 text-center leading-relaxed px-4">
                                By tapping "Continue", you allow FlowCash's partners to verify your facial biometrics and photos for identity verification and agree to the <span className="text-cashapp">Terms of Service</span>.
                            </p>
                        </div>
                    )}

                    {/* Step 7: Password */}
                    {step === 7 && (
                        <>
                            <input
                                autoFocus
                                type="password"
                                className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-900 border-2 border-transparent focus:border-cashapp rounded-2xl outline-none transition-all text-lg font-medium"
                                placeholder="Create password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleNext()}
                            />
                            <div className="space-y-2 mt-2">
                                {[
                                    { label: "At least 6 characters", met: password.length >= 6 },
                                    { label: "Contains a number", met: /\d/.test(password) },
                                    { label: "Contains a letter", met: /[a-zA-Z]/.test(password) },
                                ].map((rule) => (
                                    <div key={rule.label} className="flex items-center space-x-2">
                                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${rule.met ? 'bg-cashapp' : 'bg-gray-200 dark:bg-zinc-800'}`}>
                                            {rule.met && <CheckCircle2 className="w-3 h-3 text-white" />}
                                        </div>
                                        <span className={`text-xs ${rule.met ? 'text-cashapp font-bold' : 'text-gray-400'}`}>{rule.label}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    {/* Step 8: PIN Setup */}
                    {step === 8 && (
                        <div className="flex-1 flex flex-col justify-center items-center">
                            <PinModal
                                isOpen={true}
                                onSuccess={() => {
                                    setStep(9);
                                    setTimeout(() => router.push("/"), 2500);
                                }}
                                onClose={() => { }}
                                userId={user?.id}
                                title="Set your PIN"
                            />
                        </div>
                    )}
                </div>

                {/* Error */}
                {error && (
                    <p className="text-red-500 text-sm font-medium mb-4">{error}</p>
                )}

                {/* Next Button */}
                {step < 8 && (
                    <button
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className="w-full bg-cashapp text-white font-bold py-5 rounded-full flex items-center justify-center space-x-2 shadow-lg shadow-cashapp/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 mt-4"
                    >
                        {isSubmitting ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            <>
                                <span>{step === 6 ? "Continue" : step === 7 ? "Create Account" : "Next"}</span>
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                )}

                {/* Login link on first step */}
                {step === 1 && (
                    <p className="text-center mt-6 text-gray-500 text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="text-cashapp font-bold hover:underline">
                            Log in
                        </Link>
                    </p>
                )}
            </div>
        </div>
    );
}
