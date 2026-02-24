"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CreditCard, Clock, Plus } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useAuth } from "@/context/AuthContext";

// Custom Investing Icon combining a chart and Bitcoin logo
const InvestingIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 17l4-4 3 3" />
    <path d="M10 16l4-4" />
    <path d="M3 21h18" />
    <path
      d="M17 11h2.5a1.5 1.5 0 0 0 0-3H17v6h3.5a1.5 1.5 0 0 0 0-3H17"
      strokeWidth="1.5"
    />
    <path d="M18 7v1" strokeWidth="1.5" />
    <path d="M20 7v1" strokeWidth="1.5" />
    <path d="M18 14v1" strokeWidth="1.5" />
    <path d="M20 14v1" strokeWidth="1.5" />
  </svg>
);

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/cards", icon: CreditCard, label: "Cards" },
  { href: "/pay", icon: Plus, label: "Pay", isCenter: true },
  { href: "/investing", icon: InvestingIcon, label: "Investing" },
  { href: "/activity", icon: Clock, label: "Activity" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();

  // Hide navbar on login/register screens, or if the user is not logged in / loading
  if (["/login", "/register"].includes(pathname) || !user) {
    return null;
  }

  return (
    <>
      {/* ── Mobile Bottom Bar ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 dark:bg-black/80 backdrop-blur-md border-t border-gray-100 dark:border-zinc-800 px-6 py-3 flex items-center justify-between z-50"
        aria-label="Mobile navigation"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.isCenter) {
            return (
              <Link
                key={item.href}
                href="/pay"
                aria-label="Pay"
                className="bg-cashapp text-white p-3 rounded-full -translate-y-6 shadow-lg shadow-cashapp/40 hover:scale-110 active:scale-95 transition-all"
              >
                <Icon className="w-8 h-8" strokeWidth={3} />
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={cn(
                "flex flex-col items-center space-y-1 transition-colors min-w-[44px] min-h-[44px] justify-center",
                isActive ? "text-cashapp" : "text-gray-400 hover:text-gray-600",
              )}
            >
              <Icon className="w-6 h-6" />
            </Link>
          );
        })}
      </nav>

      {/* ── Desktop Sidebar ── */}
      <nav
        className="hidden md:flex fixed left-0 top-0 bottom-0 w-20 lg:w-56 bg-white/90 dark:bg-black/90 backdrop-blur-md border-r border-gray-100 dark:border-zinc-800 flex-col items-center lg:items-stretch py-8 px-2 lg:px-4 z-50 gap-2"
        aria-label="Desktop navigation"
      >
        {/* Logo / Brand */}
        <div className="flex items-center justify-center lg:justify-start mb-8 px-2">
          <div className="w-10 h-10 bg-cashapp rounded-xl flex items-center justify-center shadow-lg shadow-cashapp/20">
            <span className="text-white font-black text-lg">$</span>
          </div>
          <span className="hidden lg:block ml-3 text-xl font-black tracking-tight">
            FlowCash
          </span>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.isCenter) {
            return (
              <Link
                key={item.href}
                href="/pay"
                aria-label="Pay"
                className="flex items-center justify-center lg:justify-start gap-3 bg-cashapp text-white font-bold py-3 px-3 lg:px-4 rounded-xl shadow-lg shadow-cashapp/20 hover:scale-[1.02] active:scale-95 transition-all my-2"
              >
                <Icon className="w-6 h-6" strokeWidth={3} />
                <span className="hidden lg:inline text-sm">Pay</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={cn(
                "flex items-center justify-center lg:justify-start gap-3 py-3 px-3 lg:px-4 rounded-xl transition-all font-medium text-sm min-h-[44px]",
                isActive
                  ? "bg-cashapp/10 text-cashapp font-bold"
                  : "text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-900 hover:text-gray-700 dark:hover:text-gray-200",
              )}
            >
              <Icon className="w-6 h-6 shrink-0" />
              <span className="hidden lg:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
