module.exports = [
"[project]/frontend/components/Navbar.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/house.js [app-ssr] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-ssr] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
// Custom Investing Icon combining a chart and Bitcoin logo
const InvestingIcon = ({ className })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3 17l4-4 3 3"
            }, void 0, false, {
                fileName: "[project]/frontend/components/Navbar.js",
                lineNumber: 20,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M10 16l4-4"
            }, void 0, false, {
                fileName: "[project]/frontend/components/Navbar.js",
                lineNumber: 21,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3 21h18"
            }, void 0, false, {
                fileName: "[project]/frontend/components/Navbar.js",
                lineNumber: 22,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M17 11h2.5a1.5 1.5 0 0 0 0-3H17v6h3.5a1.5 1.5 0 0 0 0-3H17",
                strokeWidth: "1.5"
            }, void 0, false, {
                fileName: "[project]/frontend/components/Navbar.js",
                lineNumber: 23,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M18 7v1",
                strokeWidth: "1.5"
            }, void 0, false, {
                fileName: "[project]/frontend/components/Navbar.js",
                lineNumber: 27,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M20 7v1",
                strokeWidth: "1.5"
            }, void 0, false, {
                fileName: "[project]/frontend/components/Navbar.js",
                lineNumber: 28,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M18 14v1",
                strokeWidth: "1.5"
            }, void 0, false, {
                fileName: "[project]/frontend/components/Navbar.js",
                lineNumber: 29,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M20 14v1",
                strokeWidth: "1.5"
            }, void 0, false, {
                fileName: "[project]/frontend/components/Navbar.js",
                lineNumber: 30,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/Navbar.js",
        lineNumber: 11,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
const navItems = [
    {
        href: "/",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"],
        label: "Home"
    },
    {
        href: "/cards",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"],
        label: "Cards"
    },
    {
        href: "/pay",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"],
        label: "Pay",
        isCenter: true
    },
    {
        href: "/investing",
        icon: InvestingIcon,
        label: "Investing"
    },
    {
        href: "/activity",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"],
        label: "Activity"
    }
];
function Navbar() {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    // Hide navbar on login/register screens
    if ([
        "/login",
        "/register"
    ].includes(pathname)) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "md:hidden fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 dark:bg-black/80 backdrop-blur-md border-t border-gray-100 dark:border-zinc-800 px-6 py-3 flex items-center justify-between z-50",
                "aria-label": "Mobile navigation",
                children: navItems.map((item)=>{
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    if (item.isCenter) {
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/pay",
                            "aria-label": "Pay",
                            className: "bg-cashapp text-white p-3 rounded-full -translate-y-6 shadow-lg shadow-cashapp/40 hover:scale-110 active:scale-95 transition-all",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                className: "w-8 h-8",
                                strokeWidth: 3
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/Navbar.js",
                                lineNumber: 71,
                                columnNumber: 17
                            }, this)
                        }, item.href, false, {
                            fileName: "[project]/frontend/components/Navbar.js",
                            lineNumber: 65,
                            columnNumber: 15
                        }, this);
                    }
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: item.href,
                        "aria-label": item.label,
                        className: cn("flex flex-col items-center space-y-1 transition-colors min-w-[44px] min-h-[44px] justify-center", isActive ? "text-cashapp" : "text-gray-400 hover:text-gray-600"),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            className: "w-6 h-6"
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/Navbar.js",
                            lineNumber: 86,
                            columnNumber: 15
                        }, this)
                    }, item.href, false, {
                        fileName: "[project]/frontend/components/Navbar.js",
                        lineNumber: 77,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/frontend/components/Navbar.js",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "hidden md:flex fixed left-0 top-0 bottom-0 w-20 lg:w-56 bg-white/90 dark:bg-black/90 backdrop-blur-md border-r border-gray-100 dark:border-zinc-800 flex-col items-center lg:items-stretch py-8 px-2 lg:px-4 z-50 gap-2",
                "aria-label": "Desktop navigation",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center lg:justify-start mb-8 px-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-10 h-10 bg-cashapp rounded-xl flex items-center justify-center shadow-lg shadow-cashapp/20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white font-black text-lg",
                                    children: "$"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/Navbar.js",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/Navbar.js",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden lg:block ml-3 text-xl font-black tracking-tight",
                                children: "FlowCash"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/Navbar.js",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/Navbar.js",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    navItems.map((item)=>{
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        if (item.isCenter) {
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/pay",
                                "aria-label": "Pay",
                                className: "flex items-center justify-center lg:justify-start gap-3 bg-cashapp text-white font-bold py-3 px-3 lg:px-4 rounded-xl shadow-lg shadow-cashapp/20 hover:scale-[1.02] active:scale-95 transition-all my-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        className: "w-6 h-6",
                                        strokeWidth: 3
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/Navbar.js",
                                        lineNumber: 119,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden lg:inline text-sm",
                                        children: "Pay"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/Navbar.js",
                                        lineNumber: 120,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, item.href, true, {
                                fileName: "[project]/frontend/components/Navbar.js",
                                lineNumber: 113,
                                columnNumber: 15
                            }, this);
                        }
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: item.href,
                            "aria-label": item.label,
                            className: cn("flex items-center justify-center lg:justify-start gap-3 py-3 px-3 lg:px-4 rounded-xl transition-all font-medium text-sm min-h-[44px]", isActive ? "bg-cashapp/10 text-cashapp font-bold" : "text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-900 hover:text-gray-700 dark:hover:text-gray-200"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                    className: "w-6 h-6 shrink-0"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/Navbar.js",
                                    lineNumber: 137,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden lg:inline",
                                    children: item.label
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/Navbar.js",
                                    lineNumber: 138,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, item.href, true, {
                            fileName: "[project]/frontend/components/Navbar.js",
                            lineNumber: 126,
                            columnNumber: 13
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/Navbar.js",
                lineNumber: 93,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/frontend/components/PriceChart.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PriceChart,
    "generatePriceHistory",
    ()=>generatePriceHistory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
function generatePriceHistory(basePrice, volatility, points) {
    const data = [];
    let price = basePrice;
    for(let i = 0; i < points; i++){
        const change = (Math.random() - 0.48) * volatility * basePrice;
        price = Math.max(price + change, basePrice * 0.5);
        data.push(price);
    }
    return data;
}
function PriceChart({ data, color = "#00D632", height = 200 }) {
    if (!data || data.length < 2) return null;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const padding = 4;
    const w = 100;
    const h = 100;
    const points = data.map((val, i)=>{
        const x = padding + i / (data.length - 1) * (w - padding * 2);
        const y = padding + (1 - (val - min) / range) * (h - padding * 2);
        return `${x},${y}`;
    }).join(" ");
    const isDown = data[data.length - 1] < data[0];
    const lineColor = isDown ? "#EF4444" : color;
    // Gradient fill
    const firstPoint = points.split(" ")[0];
    const lastPoint = points.split(" ").pop();
    const fillPoints = `${padding},${h} ${points} ${w - padding},${h}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: `0 0 ${w} ${h}`,
        style: {
            height,
            width: "100%"
        },
        preserveAspectRatio: "none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                    id: `grad-${lineColor.replace('#', '')}`,
                    x1: "0",
                    x2: "0",
                    y1: "0",
                    y2: "1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "0%",
                            stopColor: lineColor,
                            stopOpacity: "0.15"
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/PriceChart.js",
                            lineNumber: 45,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "100%",
                            stopColor: lineColor,
                            stopOpacity: "0"
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/PriceChart.js",
                            lineNumber: 46,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/PriceChart.js",
                    lineNumber: 44,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/components/PriceChart.js",
                lineNumber: 43,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                points: fillPoints,
                fill: `url(#grad-${lineColor.replace('#', '')})`
            }, void 0, false, {
                fileName: "[project]/frontend/components/PriceChart.js",
                lineNumber: 49,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                points: points,
                fill: "none",
                stroke: lineColor,
                strokeWidth: "0.8",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/frontend/components/PriceChart.js",
                lineNumber: 53,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/PriceChart.js",
        lineNumber: 42,
        columnNumber: 9
    }, this);
}
}),
"[project]/frontend/lib/assets.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Asset reference data + Alpaca API helpers.
 *
 * Static data (icons, colors, names) stays here.
 * All price / holdings / trading data now comes from
 * the backend via Alpaca.
 */ __turbopack_context__.s([
    "BITCOIN_DATA",
    ()=>BITCOIN_DATA,
    "CRYPTOS",
    ()=>CRYPTOS,
    "STOCKS",
    ()=>STOCKS,
    "getBarParams",
    ()=>getBarParams,
    "getCompanyInfo",
    ()=>getCompanyInfo
]);
const BITCOIN_DATA = {
    symbol: "BTC/USD",
    alpacaSymbol: "BTCUSD",
    name: "Bitcoin",
    icon: "₿",
    color: "#F7931A"
};
const CRYPTOS = [
    {
        symbol: "BTC/USD",
        alpacaSymbol: "BTCUSD",
        name: "Bitcoin",
        icon: "₿",
        color: "#F7931A",
        coingeckoId: "bitcoin",
        logo: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
    },
    {
        symbol: "ETH/USD",
        alpacaSymbol: "ETHUSD",
        name: "Ethereum",
        icon: "♦",
        color: "#627EEA",
        coingeckoId: "ethereum",
        logo: "https://assets.coingecko.com/coins/images/279/large/ethereum.png"
    },
    {
        symbol: "LTC/USD",
        alpacaSymbol: "LTCUSD",
        name: "Litecoin",
        icon: "Ł",
        color: "#345D9D",
        coingeckoId: "litecoin",
        logo: "https://assets.coingecko.com/coins/images/2/large/litecoin.png"
    },
    {
        symbol: "BCH/USD",
        alpacaSymbol: "BCHUSD",
        name: "Bitcoin Cash",
        icon: "₿",
        color: "#8DC351",
        coingeckoId: "bitcoin-cash",
        logo: "https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png"
    },
    {
        symbol: "LINK/USD",
        alpacaSymbol: "LINKUSD",
        name: "Chainlink",
        icon: "🔗",
        color: "#2A5ADA",
        coingeckoId: "chainlink",
        logo: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png"
    },
    {
        symbol: "UNI/USD",
        alpacaSymbol: "UNIUSD",
        name: "Uniswap",
        icon: "🦄",
        color: "#FF007A",
        coingeckoId: "uniswap",
        logo: "https://assets.coingecko.com/coins/images/12504/large/uni.jpg"
    }
];
const STOCKS = [
    {
        symbol: "AAPL",
        name: "Apple",
        icon: "🍎",
        color: "#555555",
        logo: "https://logo.clearbit.com/apple.com"
    },
    {
        symbol: "MSFT",
        name: "Microsoft",
        icon: "🪟",
        color: "#00A4EF",
        logo: "https://logo.clearbit.com/microsoft.com"
    },
    {
        symbol: "NVDA",
        name: "NVIDIA",
        icon: "🟢",
        color: "#76B900",
        logo: "https://logo.clearbit.com/nvidia.com"
    },
    {
        symbol: "AMZN",
        name: "Amazon",
        icon: "📦",
        color: "#FF9900",
        logo: "https://logo.clearbit.com/amazon.com"
    },
    {
        symbol: "META",
        name: "Meta Platforms",
        icon: "♾️",
        color: "#0080FB",
        logo: "https://logo.clearbit.com/meta.com"
    },
    {
        symbol: "GOOGL",
        name: "Alphabet (Google)",
        icon: "🔍",
        color: "#4285F4",
        logo: "https://logo.clearbit.com/google.com"
    },
    {
        symbol: "TSLA",
        name: "Tesla",
        icon: "⚡",
        color: "#E31937",
        logo: "https://logo.clearbit.com/tesla.com"
    },
    {
        symbol: "BRK.B",
        name: "Berkshire Hathaway",
        icon: "🏢",
        color: "#000000",
        logo: "https://logo.clearbit.com/berkshirehathaway.com"
    },
    {
        symbol: "AVGO",
        name: "Broadcom",
        icon: "🔴",
        color: "#CC0000",
        logo: "https://logo.clearbit.com/broadcom.com"
    },
    {
        symbol: "LLY",
        name: "Eli Lilly",
        icon: "💊",
        color: "#D11920",
        logo: "https://logo.clearbit.com/lilly.com"
    },
    {
        symbol: "V",
        name: "Visa",
        icon: "💳",
        color: "#1A1F71",
        logo: "https://logo.clearbit.com/visa.com"
    },
    {
        symbol: "JPM",
        name: "JPMorgan Chase",
        icon: "🏦",
        color: "#000000",
        logo: "https://logo.clearbit.com/jpmorganchase.com"
    },
    {
        symbol: "UNH",
        name: "UnitedHealth",
        icon: "🩺",
        color: "#003A70",
        logo: "https://logo.clearbit.com/unitedhealthgroup.com"
    },
    {
        symbol: "XOM",
        name: "Exxon Mobil",
        icon: "🛢️",
        color: "#D8232A",
        logo: "https://logo.clearbit.com/exxonmobil.com"
    },
    {
        symbol: "MA",
        name: "Mastercard",
        icon: "💳",
        color: "#EB001B",
        logo: "https://logo.clearbit.com/mastercard.com"
    },
    {
        symbol: "PG",
        name: "Procter & Gamble",
        icon: "🧼",
        color: "#003DA5",
        logo: "https://logo.clearbit.com/pg.com"
    },
    {
        symbol: "JNJ",
        name: "Johnson & Johnson",
        icon: "🩹",
        color: "#C8102E",
        logo: "https://logo.clearbit.com/jnj.com"
    },
    {
        symbol: "HD",
        name: "Home Depot",
        icon: "🔨",
        color: "#F96302",
        logo: "https://logo.clearbit.com/homedepot.com"
    },
    {
        symbol: "MRK",
        name: "Merck",
        icon: "🔬",
        color: "#00A3E0",
        logo: "https://logo.clearbit.com/merck.com"
    },
    {
        symbol: "ABBV",
        name: "AbbVie",
        icon: "🧪",
        color: "#000000",
        logo: "https://logo.clearbit.com/abbvie.com"
    },
    {
        symbol: "CVX",
        name: "Chevron",
        icon: "⛽",
        color: "#0054A4",
        logo: "https://logo.clearbit.com/chevron.com"
    },
    {
        symbol: "CRM",
        name: "Salesforce",
        icon: "☁️",
        color: "#00A1E0",
        logo: "https://logo.clearbit.com/salesforce.com"
    },
    {
        symbol: "AMD",
        name: "AMD",
        icon: "💻",
        color: "#000000",
        logo: "https://logo.clearbit.com/amd.com"
    },
    {
        symbol: "PEP",
        name: "PepsiCo",
        icon: "🥤",
        color: "#004B93",
        logo: "https://logo.clearbit.com/pepsico.com"
    },
    {
        symbol: "KO",
        name: "Coca-Cola",
        icon: "🥤",
        color: "#F40000",
        logo: "https://logo.clearbit.com/coca-cola.com"
    },
    {
        symbol: "BAC",
        name: "Bank of America",
        icon: "🏛️",
        color: "#012169",
        logo: "https://logo.clearbit.com/bankofamerica.com"
    },
    {
        symbol: "TMO",
        name: "Thermo Fisher",
        icon: "🧬",
        color: "#000000",
        logo: "https://logo.clearbit.com/thermofisher.com"
    },
    {
        symbol: "COST",
        name: "Costco",
        icon: "🛒",
        color: "#E31837",
        logo: "https://logo.clearbit.com/costco.com"
    },
    {
        symbol: "WMT",
        name: "Walmart",
        icon: "🏪",
        color: "#0071CE",
        logo: "https://logo.clearbit.com/walmart.com"
    },
    {
        symbol: "MCD",
        name: "McDonald's",
        icon: "🍟",
        color: "#FFC72C",
        logo: "https://logo.clearbit.com/mcdonalds.com"
    },
    {
        symbol: "DIS",
        name: "Disney",
        icon: "🏰",
        color: "#113CCF",
        logo: "https://logo.clearbit.com/disney.com"
    },
    {
        symbol: "ABT",
        name: "Abbott",
        icon: "🏥",
        color: "#0093D0",
        logo: "https://logo.clearbit.com/abbott.com"
    },
    {
        symbol: "CSCO",
        name: "Cisco",
        icon: "🌐",
        color: "#1BA0D7",
        logo: "https://logo.clearbit.com/cisco.com"
    },
    {
        symbol: "INTU",
        name: "Intuit",
        icon: "📊",
        color: "#365EBF",
        logo: "https://logo.clearbit.com/intuit.com"
    },
    {
        symbol: "NFLX",
        name: "Netflix",
        icon: "🍿",
        color: "#E50914",
        logo: "https://logo.clearbit.com/netflix.com"
    },
    {
        symbol: "NKE",
        name: "Nike",
        icon: "👟",
        color: "#000000",
        logo: "https://logo.clearbit.com/nike.com"
    },
    {
        symbol: "IBM",
        name: "IBM",
        icon: "🖥️",
        color: "#0F62FE",
        logo: "https://logo.clearbit.com/ibm.com"
    },
    {
        symbol: "ORCL",
        name: "Oracle",
        icon: "💾",
        color: "#F80000",
        logo: "https://logo.clearbit.com/oracle.com"
    },
    {
        symbol: "CMCSA",
        name: "Comcast",
        icon: "📡",
        color: "#000000",
        logo: "https://logo.clearbit.com/comcast.com"
    },
    {
        symbol: "VZ",
        name: "Verizon",
        icon: "📱",
        color: "#CD040B",
        logo: "https://logo.clearbit.com/verizon.com"
    },
    {
        symbol: "QCOM",
        name: "Qualcomm",
        icon: "📱",
        color: "#3253AD",
        logo: "https://logo.clearbit.com/qualcomm.com"
    },
    {
        symbol: "TXN",
        name: "Texas Instruments",
        icon: "🔌",
        color: "#CC0000",
        logo: "https://logo.clearbit.com/ti.com"
    },
    {
        symbol: "PFE",
        name: "Pfizer",
        icon: "💊",
        color: "#0000FF",
        logo: "https://logo.clearbit.com/pfizer.com"
    },
    {
        symbol: "GE",
        name: "General Electric",
        icon: "⚙️",
        color: "#005EAD",
        logo: "https://logo.clearbit.com/ge.com"
    },
    {
        symbol: "WFC",
        name: "Wells Fargo",
        icon: "💳",
        color: "#CD1409",
        logo: "https://logo.clearbit.com/wellsfargo.com"
    },
    {
        symbol: "NOW",
        name: "ServiceNow",
        icon: "☁️",
        color: "#293E40",
        logo: "https://logo.clearbit.com/servicenow.com"
    },
    {
        symbol: "UNP",
        name: "Union Pacific",
        icon: "🚂",
        color: "#005587",
        logo: "https://logo.clearbit.com/up.com"
    },
    {
        symbol: "BA",
        name: "Boeing",
        icon: "✈️",
        color: "#1D439C",
        logo: "https://logo.clearbit.com/boeing.com"
    },
    {
        symbol: "UPS",
        name: "UPS",
        icon: "📦",
        color: "#351C15",
        logo: "https://logo.clearbit.com/ups.com"
    },
    {
        symbol: "PM",
        name: "Philip Morris",
        icon: "🚬",
        color: "#000000",
        logo: "https://logo.clearbit.com/pmi.com"
    }
];
function getBarParams(range) {
    const now = new Date();
    let start, timeframe, limit;
    switch(range){
        case "1D":
            start = new Date(now);
            start.setDate(now.getDate() - 1);
            timeframe = "15Min";
            limit = 96;
            break;
        case "1W":
            start = new Date(now);
            start.setDate(now.getDate() - 7);
            timeframe = "1Hour";
            limit = 168;
            break;
        case "1M":
            start = new Date(now);
            start.setMonth(now.getMonth() - 1);
            timeframe = "1Day";
            limit = 30;
            break;
        case "1Y":
            start = new Date(now);
            start.setFullYear(now.getFullYear() - 1);
            timeframe = "1Day";
            limit = 365;
            break;
        case "ALL":
            start = new Date(now);
            start.setFullYear(now.getFullYear() - 5);
            timeframe = "1Week";
            limit = 260;
            break;
        default:
            start = new Date(now);
            start.setDate(now.getDate() - 1);
            timeframe = "15Min";
            limit = 96;
    }
    return {
        timeframe,
        start: start.toISOString(),
        limit
    };
}
function getCompanyInfo(symbol, name) {
    const known = {
        AAPL: {
            ceo: "Tim Cook",
            employees: "161,000",
            hq: "Cupertino, CA",
            about: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide."
        },
        MSFT: {
            ceo: "Satya Nadella",
            employees: "221,000",
            hq: "Redmond, WA",
            about: "Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide."
        },
        TSLA: {
            ceo: "Elon Musk",
            employees: "127,855",
            hq: "Austin, TX",
            about: "Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems."
        },
        NVDA: {
            ceo: "Jensen Huang",
            employees: "26,196",
            hq: "Santa Clara, CA",
            about: "NVIDIA Corporation provides graphics, and compute and networking solutions in the United States, Taiwan, China, and internationally."
        },
        AMZN: {
            ceo: "Andy Jassy",
            employees: "1,541,000",
            hq: "Seattle, WA",
            about: "Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally."
        },
        META: {
            ceo: "Mark Zuckerberg",
            employees: "86,482",
            hq: "Menlo Park, CA",
            about: "Meta Platforms, Inc. engages in the development of products that enable people to connect and share with friends and family."
        },
        GOOGL: {
            ceo: "Sundar Pichai",
            employees: "190,234",
            hq: "Mountain View, CA",
            about: "Alphabet Inc. offers various products and platforms in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America."
        }
    };
    if (known[symbol]) return known[symbol];
    // Fallback for the remaining top 50
    return {
        ceo: `CEO of ${name}`,
        employees: `${Math.floor(Math.random() * 100) + 10},000+`,
        hq: "United States",
        about: `${name} is a leading publicly traded company listed on the US stock exchange, providing innovative products and services globally.`
    };
}
}),
"[project]/frontend/components/StockLogo.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StockLogo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
function StockLogo({ assetInfo, symbol, size = "w-12 h-12", textClass = "" }) {
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const symbolStr = symbol.split("/")[0];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${size} rounded-full flex items-center justify-center text-xl overflow-hidden shadow-sm bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800`,
        children: assetInfo?.logo && !error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: assetInfo.logo,
            alt: symbolStr,
            className: "w-full h-full object-cover",
            onError: ()=>setError(true)
        }, void 0, false, {
            fileName: "[project]/frontend/components/StockLogo.js",
            lineNumber: 12,
            columnNumber: 17
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: textClass,
            children: assetInfo?.icon || symbolStr.charAt(0)
        }, void 0, false, {
            fileName: "[project]/frontend/components/StockLogo.js",
            lineNumber: 19,
            columnNumber: 17
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/components/StockLogo.js",
        lineNumber: 8,
        columnNumber: 9
    }, this);
}
}),
"[project]/frontend/app/investing/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InvestingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$context$2f$AuthContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/context/AuthContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$Navbar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/Navbar.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$PriceChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/PriceChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$assets$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/assets.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$StockLogo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/StockLogo.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
const TIME_RANGES = [
    "1D",
    "1W",
    "1M",
    "1Y",
    "ALL"
];
function InvestingPage() {
    const { user, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$context$2f$AuthContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("stocks"); // 'stocks' | 'crypto'
    const [timeRange, setTimeRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("1D");
    // Stocks State
    const [stocksEquity, setStocksEquity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [stocksInvested, setStocksInvested] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [stocksChart, setStocksChart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [stocksActivity, setStocksActivity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [stocksLoading, setStocksLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    // Crypto State
    const [cryptoEquity, setCryptoEquity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [cryptoInvested, setCryptoInvested] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [cryptoChart, setCryptoChart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [cryptoActivity, setCryptoActivity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [cryptoLoading, setCryptoLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!loading && !user) router.push("/login");
    }, [
        user,
        loading,
        router
    ]);
    const fetchStocksData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        setStocksLoading(true);
        try {
            const [posRes, histRes, ordersRes] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get("/trading/positions"),
                __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/trading/portfolio/history?period=${getPeriod(timeRange)}&timeframe=${getTimeframe(timeRange)}`),
                __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get("/trading/orders?limit=30&status=all")
            ]);
            // Fix: User's invested balance is ONLY the value of their held STOCKS, not the giant $50k master cash pool.
            const positions = posRes.data.data || [];
            const userStockEquity = positions.filter((p)=>!p.symbol.includes("/") && p.asset_class !== "crypto").reduce((sum, p)=>sum + p.market_value, 0);
            const userStockInvested = positions.filter((p)=>!p.symbol.includes("/") && p.asset_class !== "crypto").reduce((sum, p)=>sum + parseFloat(p.cost_basis || 0), 0);
            setStocksEquity(userStockEquity);
            setStocksInvested(userStockInvested);
            const bars = histRes.data.data.equity || [];
            // Remove nulls which indicate non-trading hours
            const validBars = bars.filter((b)=>b !== null);
            setStocksChart(validBars);
            const orders = ordersRes.data.data || [];
            setStocksActivity(orders.filter((o)=>!o.symbol.includes("/") && o.asset_class !== "crypto"));
        } catch (err) {
            console.error("Failed to fetch stocks investing data", err);
        } finally{
            setStocksLoading(false);
        }
    }, [
        timeRange
    ]);
    const fetchCryptoData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        setCryptoLoading(true);
        try {
            const [posRes, chartRes, ordersRes, transfersRes] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/trading/positions`),
                __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/trading/crypto/bars/BTC/USD`, {
                    params: getBtcBarParams(timeRange)
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get("/trading/orders?limit=30&status=all"),
                __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get("/transfer/history?limit=30")
            ]);
            const positions = posRes.data.data || [];
            const userCryptoEquity = positions.filter((p)=>p.asset_class === "crypto" || p.symbol.includes("/")).reduce((sum, p)=>sum + p.market_value, 0);
            const userCryptoInvested = positions.filter((p)=>p.asset_class === "crypto" || p.symbol.includes("/")).reduce((sum, p)=>sum + parseFloat(p.cost_basis || 0), 0);
            setCryptoEquity(userCryptoEquity);
            setCryptoInvested(userCryptoInvested);
            const bars = chartRes.data.data.bars || [];
            setCryptoChart(bars.map((b)=>parseFloat(b.c)));
            const orders = ordersRes.data.data || [];
            const cryptoOrders = orders.filter((o)=>o.symbol?.includes("/") || o.asset_class === "crypto");
            // Blend in P2P Bitcoin transfers
            const transfers = transfersRes.data?.data?.transactions || [];
            const btcTransfers = transfers.filter((t)=>t.type === "bitcoin_send").map((t)=>({
                    ...t,
                    symbol: "BTC"
                }));
            // Sort combined activity by date descending
            const combinedActivity = [
                ...cryptoOrders,
                ...btcTransfers
            ].sort((a, b)=>new Date(b.created_at || b.submitted_at || b.filled_at) - new Date(a.created_at || a.submitted_at || a.filled_at));
            setCryptoActivity(combinedActivity);
        } catch (err) {
            console.error("Failed to fetch crypto data", err);
        } finally{
            setCryptoLoading(false);
        }
    }, [
        timeRange
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (user) {
            if (tab === "stocks") fetchStocksData();
            else fetchCryptoData();
        }
    }, [
        user,
        tab,
        timeRange,
        fetchStocksData,
        fetchCryptoData
    ]);
    if (loading || !user) return null;
    // Helpers
    function getPeriod(tr) {
        if (tr === "1D") return "1D";
        if (tr === "1W") return "1W";
        if (tr === "1M") return "1M";
        if (tr === "1Y") return "1A";
        return "all";
    }
    function getTimeframe(tr) {
        if (tr === "1D") return "5Min";
        if (tr === "1W") return "15Min";
        if (tr === "1M") return "1H";
        if (tr === "1Y") return "1D";
        return "1D";
    }
    function getBtcBarParams(tr) {
        const now = new Date();
        let start, timeframe, limit;
        switch(tr){
            case "1D":
                start = new Date(now);
                start.setDate(now.getDate() - 1);
                timeframe = "15Min";
                limit = 96;
                break;
            case "1W":
                start = new Date(now);
                start.setDate(now.getDate() - 7);
                timeframe = "1Hour";
                limit = 168;
                break;
            case "1M":
                start = new Date(now);
                start.setMonth(now.getMonth() - 1);
                timeframe = "1Day";
                limit = 30;
                break;
            case "1Y":
                start = new Date(now);
                start.setFullYear(now.getFullYear() - 1);
                timeframe = "1Day";
                limit = 365;
                break;
            case "ALL":
                start = new Date(now);
                start.setFullYear(now.getFullYear() - 5);
                timeframe = "1Week";
                limit = 260;
                break;
            default:
                start = new Date(now);
                start.setDate(now.getDate() - 1);
                timeframe = "15Min";
                limit = 96;
        }
        return {
            timeframe,
            start: start.toISOString(),
            limit
        };
    }
    // Render configuration
    const isStocks = tab === "stocks";
    const primaryColor = isStocks ? "#00d632" : "#F7931A"; // Green for stocks, Orange for Crypto
    const textColorClass = isStocks ? "text-cashapp" : "text-[#F7931A]";
    const balance = isStocks ? stocksEquity : cryptoEquity;
    const invested = isStocks ? stocksInvested : cryptoInvested;
    const totalGain = balance - invested;
    const gainPrefix = totalGain >= 0 ? "+" : "";
    const chartData = isStocks ? stocksChart : cryptoChart;
    const activityData = isStocks ? stocksActivity : cryptoActivity;
    const isLoading = isStocks ? stocksLoading : cryptoLoading;
    // Calculate chart delta safely
    let pctChange = 0;
    let diff = 0;
    if (chartData.length > 0) {
        const first = chartData[0];
        const last = chartData[chartData.length - 1];
        if (first > 0) {
            diff = last - first;
            pctChange = diff / first * 100;
        }
    }
    // We visually enforce the chart direction on the summary line for realism
    const isUp = pctChange >= 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-white dark:bg-black pb-24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between p-6 pb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold",
                        children: "Investing"
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/investing/page.js",
                        lineNumber: 240,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push("/search"),
                                className: "p-2 -mr-2 text-gray-800 dark:text-gray-200",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                    className: "w-6 h-6",
                                    style: {
                                        color: primaryColor
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/investing/page.js",
                                    lineNumber: 246,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/investing/page.js",
                                lineNumber: 242,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "w-8 h-8 bg-cashapp/10 rounded-full flex items-center justify-center border border-transparent font-bold text-xs",
                                style: {
                                    color: primaryColor
                                },
                                children: (user.fullName || user.full_name || "?").charAt(0).toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/investing/page.js",
                                lineNumber: 248,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/investing/page.js",
                        lineNumber: 241,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/investing/page.js",
                lineNumber: 239,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-6 mt-4 mb-8 bg-gray-50 dark:bg-zinc-900 p-1 rounded-full flex overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setTab("stocks"),
                        className: `flex-1 py-2.5 rounded-full font-bold text-sm transition-all ${isStocks ? "bg-white dark:bg-zinc-800 shadow-sm text-cashapp" : "text-gray-500 hover:text-gray-700"}`,
                        children: "Stocks"
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/investing/page.js",
                        lineNumber: 259,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setTab("crypto"),
                        className: `flex-1 py-2.5 rounded-full font-bold text-sm transition-all ${!isStocks ? "bg-white dark:bg-zinc-800 shadow-sm text-[#F7931A]" : "text-gray-500 hover:text-gray-700"}`,
                        children: "Crypto"
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/investing/page.js",
                        lineNumber: 268,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/investing/page.js",
                lineNumber: 258,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 text-center mt-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-5xl font-bold tracking-tight mb-2",
                        children: [
                            "$",
                            balance.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/investing/page.js",
                        lineNumber: 281,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center space-x-1 font-bold text-sm",
                        style: {
                            color: primaryColor
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    isUp ? "+" : "-",
                                    " $",
                                    Math.abs(diff).toFixed(2)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/investing/page.js",
                                lineNumber: 292,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mx-1",
                                children: [
                                    isUp ? "↑" : "↓",
                                    " ",
                                    Math.abs(pctChange).toFixed(2),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/investing/page.js",
                                lineNumber: 295,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Today"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/investing/page.js",
                                lineNumber: 298,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/investing/page.js",
                        lineNumber: 288,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/investing/page.js",
                lineNumber: 280,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 px-2 relative h-[250px]",
                children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 flex items-center justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        className: "w-8 h-8 animate-spin text-gray-300"
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/investing/page.js",
                        lineNumber: 306,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/frontend/app/investing/page.js",
                    lineNumber: 305,
                    columnNumber: 11
                }, this) : chartData.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$PriceChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    data: chartData,
                    color: primaryColor,
                    height: 250
                }, void 0, false, {
                    fileName: "[project]/frontend/app/investing/page.js",
                    lineNumber: 309,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 flex items-center justify-center text-gray-500 text-sm",
                    children: "No data available"
                }, void 0, false, {
                    fileName: "[project]/frontend/app/investing/page.js",
                    lineNumber: 311,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/app/investing/page.js",
                lineNumber: 303,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center space-x-2 px-6 mt-4 mb-8",
                children: TIME_RANGES.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setTimeRange(t),
                        className: `w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${timeRange === t ? "bg-gray-100 dark:bg-zinc-800 text-black dark:text-white" : "text-gray-400 hover:text-gray-600"}`,
                        children: t
                    }, t, false, {
                        fileName: "[project]/frontend/app/investing/page.js",
                        lineNumber: 320,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/frontend/app/investing/page.js",
                lineNumber: 318,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-6 mb-8 bg-gray-50 dark:bg-zinc-900 rounded-3xl p-6 border border-gray-100 dark:border-zinc-800/60 shadow-sm relative overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-bold text-lg text-gray-900 dark:text-gray-100",
                                children: "My Investments"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/investing/page.js",
                                lineNumber: 336,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-8 rounded-full bg-white dark:bg-black/50 flex items-center justify-center shadow-sm",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-400",
                                    children: "•••"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/investing/page.js",
                                    lineNumber: 340,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/investing/page.js",
                                lineNumber: 339,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/investing/page.js",
                        lineNumber: 335,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4 relative z-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-6 w-24 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded mb-2"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/investing/page.js",
                                        lineNumber: 347,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xl font-bold text-gray-900 dark:text-white",
                                        children: [
                                            "$",
                                            invested.toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/investing/page.js",
                                        lineNumber: 349,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-semibold text-gray-500",
                                        children: "Total Invested"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/investing/page.js",
                                        lineNumber: 357,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/investing/page.js",
                                lineNumber: 345,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-6 w-24 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded mb-2"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/investing/page.js",
                                        lineNumber: 364,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `text-xl font-bold ${totalGain > 0 ? "text-cashapp" : totalGain < 0 ? "text-red-500" : "text-gray-500"}`,
                                        children: [
                                            gainPrefix,
                                            "$",
                                            Math.abs(totalGain).toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/investing/page.js",
                                        lineNumber: 366,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-semibold text-gray-500",
                                        children: "Total Gain"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/investing/page.js",
                                        lineNumber: 376,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/investing/page.js",
                                lineNumber: 362,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/investing/page.js",
                        lineNumber: 344,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/investing/page.js",
                lineNumber: 334,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 space-y-4",
                children: isStocks ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>router.push("/stocks"),
                    className: "w-full bg-gray-50 dark:bg-zinc-900 rounded-2xl p-5 flex items-center justify-between group hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all font-bold",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xl",
                                    children: "📈"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/investing/page.js",
                                    lineNumber: 388,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Discover Stocks"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/investing/page.js",
                                    lineNumber: 389,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/app/investing/page.js",
                            lineNumber: 387,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-gray-400 group-hover:text-cashapp transition-colors",
                            children: "Buy"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/investing/page.js",
                            lineNumber: 391,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/app/investing/page.js",
                    lineNumber: 383,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>router.push("/crypto"),
                    className: "w-full bg-gray-50 dark:bg-zinc-900 rounded-2xl p-5 flex items-center justify-between group hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all font-bold",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xl text-[#F7931A]",
                                    children: "₿"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/investing/page.js",
                                    lineNumber: 401,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Explore Crypto"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/investing/page.js",
                                    lineNumber: 402,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/app/investing/page.js",
                            lineNumber: 400,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-gray-400 group-hover:text-[#F7931A] transition-colors",
                            children: "Buy / Sell"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/investing/page.js",
                            lineNumber: 404,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/app/investing/page.js",
                    lineNumber: 396,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/app/investing/page.js",
                lineNumber: 381,
                columnNumber: 7
            }, this),
            activityData.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 mt-8 mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-bold text-lg text-gray-900 dark:text-gray-100",
                                children: "Activity"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/investing/page.js",
                                lineNumber: 415,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push("/activity?filter=investing"),
                                className: "px-4 py-1.5 bg-gray-100 dark:bg-zinc-800 rounded-full text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all",
                                children: "See All"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/investing/page.js",
                                lineNumber: 418,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/investing/page.js",
                        lineNumber: 414,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: activityData.slice(0, 5).map((order)=>{
                            const amount = parseFloat(order.filled_avg_price || 0) * parseFloat(order.filled_qty || 0) || parseFloat(order.notional) || parseFloat(order.amount) / 100 || 0;
                            const isP2P = order.type === "bitcoin_send";
                            const isReceived = isP2P && order.receiver_id === user.id;
                            const isBuy = !isP2P && order.side === "buy";
                            const isCrypto = isP2P || order.asset_class === "crypto" || order.symbol?.includes("/");
                            const symbolStr = isP2P ? "BTC" : isCrypto ? order.symbol.split("/")[0] : order.symbol;
                            const date = new Date(order.filled_at || order.submitted_at || order.created_at).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric"
                            });
                            const assetInfo = isCrypto ? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$assets$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CRYPTOS"].find((c)=>c.symbol.startsWith(symbolStr) || c.alpacaSymbol === order.symbol) : __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$assets$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STOCKS"].find((s)=>s.symbol === order.symbol);
                            let actionText = isBuy ? "Bought" : "Sold";
                            if (isP2P) actionText = isReceived ? "Received" : "Sent";
                            const isPositiveCashFlow = isP2P ? isReceived : !isBuy;
                            let qtyText = "";
                            if (!isP2P && Number(order.filled_qty) > 0) {
                                qtyText = Number(order.filled_qty).toLocaleString(undefined, {
                                    maximumFractionDigits: isCrypto ? 6 : 4
                                }) + " ";
                            }
                            let displayAmount = `${actionText} ${qtyText}${symbolStr}`;
                            if (isP2P) {
                                displayAmount = `${actionText} Bitcoin`;
                                // If the default note format is used (e.g. "0.00500000 BTC ($..."), extract it
                                if (order.note && order.note.match(/^[\d.]+ BTC/)) {
                                    displayAmount = `${actionText} ${order.note.split(' ')[0]} ${symbolStr}`;
                                }
                            }
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push(`/activity/detail?id=${order.id}`),
                                className: "w-full flex items-center justify-between group hover:bg-gray-50 dark:hover:bg-zinc-900 p-2 -mx-2 rounded-xl transition-all",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$StockLogo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                assetInfo: assetInfo,
                                                symbol: symbolStr,
                                                textClass: isBuy || isReceived ? "text-cashapp" : "text-red-500"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/investing/page.js",
                                                lineNumber: 482,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-left",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-bold text-sm text-gray-900 dark:text-gray-100",
                                                        children: displayAmount
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/investing/page.js",
                                                        lineNumber: 488,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-500 font-medium capitalize",
                                                        children: [
                                                            order.status,
                                                            " • ",
                                                            date
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/app/investing/page.js",
                                                        lineNumber: 491,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/investing/page.js",
                                                lineNumber: 487,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/investing/page.js",
                                        lineNumber: 481,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-bold text-sm text-gray-900 dark:text-gray-100",
                                                children: [
                                                    "$",
                                                    amount.toLocaleString(undefined, {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2
                                                    })
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/investing/page.js",
                                                lineNumber: 497,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `text-xs font-bold ${isPositiveCashFlow ? "text-cashapp" : "text-gray-400"}`,
                                                children: [
                                                    isPositiveCashFlow ? "+" : "-",
                                                    "$",
                                                    amount.toLocaleString(undefined, {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2
                                                    })
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/investing/page.js",
                                                lineNumber: 504,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/investing/page.js",
                                        lineNumber: 496,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, order.id, true, {
                                fileName: "[project]/frontend/app/investing/page.js",
                                lineNumber: 476,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/investing/page.js",
                        lineNumber: 425,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/investing/page.js",
                lineNumber: 413,
                columnNumber: 9
            }, this),
            isStocks && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 space-y-6 mt-2 mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-50 dark:bg-zinc-900 rounded-3xl p-6 border border-gray-100 dark:border-zinc-800/60 shadow-sm relative overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-bold text-lg text-gray-900 dark:text-gray-100 mb-2",
                                children: "Most Traded Monthly"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/investing/page.js",
                                lineNumber: 526,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500 mb-6 leading-relaxed hidden sm:block",
                                children: "These stocks were bought and sold more over the last 30 days than any other stocks available on Cash App."
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/investing/page.js",
                                lineNumber: 529,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500 mb-6 leading-relaxed sm:hidden",
                                children: "These stocks were bought and sold more over the last 30 days than any other stocks available."
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/investing/page.js",
                                lineNumber: 533,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    "V",
                                    "NVDA",
                                    "NFLX"
                                ].map((sym)=>{
                                    const stock = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$assets$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STOCKS"].find((s)=>s.symbol === sym);
                                    if (!stock) return null;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center cursor-pointer group hover:bg-white dark:hover:bg-zinc-800 p-2 -mx-2 rounded-xl transition-all",
                                        onClick: ()=>router.push(`/stocks/detail?symbol=${stock.symbol}`),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center space-x-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$StockLogo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        assetInfo: stock,
                                                        symbol: stock.symbol,
                                                        size: "w-10 h-10",
                                                        textClass: "text-cashapp"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/investing/page.js",
                                                        lineNumber: 553,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-bold text-sm text-gray-900 dark:text-gray-100",
                                                        children: stock.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/investing/page.js",
                                                        lineNumber: 559,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/investing/page.js",
                                                lineNumber: 552,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-right",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs font-bold text-cashapp",
                                                    children: [
                                                        "↑ ",
                                                        (Math.random() * 2).toFixed(2),
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/investing/page.js",
                                                    lineNumber: 564,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/investing/page.js",
                                                lineNumber: 563,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, stock.symbol, true, {
                                        fileName: "[project]/frontend/app/investing/page.js",
                                        lineNumber: 547,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/investing/page.js",
                                lineNumber: 538,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center mt-6 space-x-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-1.5 h-1.5 rounded-full bg-gray-300"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/investing/page.js",
                                        lineNumber: 574,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-1.5 h-1.5 rounded-full bg-gray-300"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/investing/page.js",
                                        lineNumber: 575,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-1.5 h-1.5 rounded-full bg-gray-300"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/investing/page.js",
                                        lineNumber: 576,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-1.5 h-1.5 rounded-full bg-black dark:bg-white"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/investing/page.js",
                                        lineNumber: 577,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/investing/page.js",
                                lineNumber: 573,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/investing/page.js",
                        lineNumber: 525,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-50 dark:bg-zinc-900 rounded-3xl p-6 border border-gray-100 dark:border-zinc-800/60 shadow-sm relative overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-bold text-lg text-gray-900 dark:text-gray-100 mb-2",
                                children: "Biggest Daily Movers"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/investing/page.js",
                                lineNumber: 583,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500 mb-6 leading-relaxed",
                                children: "These companies gained or lost the most value today of any stock on Cash App."
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/investing/page.js",
                                lineNumber: 586,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    "TSLA",
                                    "AAPL",
                                    "META"
                                ].map((sym)=>{
                                    const stock = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$assets$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STOCKS"].find((s)=>s.symbol === sym);
                                    if (!stock) return null;
                                    const isUp = Math.random() > 0.5;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center cursor-pointer group hover:bg-white dark:hover:bg-zinc-800 p-2 -mx-2 rounded-xl transition-all",
                                        onClick: ()=>router.push(`/stocks/detail?symbol=${stock.symbol}`),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center space-x-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$StockLogo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        assetInfo: stock,
                                                        symbol: stock.symbol,
                                                        size: "w-10 h-10",
                                                        textClass: isUp ? "text-cashapp" : "text-red-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/investing/page.js",
                                                        lineNumber: 607,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-bold text-sm text-gray-900 dark:text-gray-100",
                                                        children: stock.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/investing/page.js",
                                                        lineNumber: 613,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/investing/page.js",
                                                lineNumber: 606,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-right",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: `text-xs font-bold ${isUp ? "text-cashapp" : "text-red-500"}`,
                                                    children: [
                                                        isUp ? "↑" : "↓",
                                                        " ",
                                                        (Math.random() * 5).toFixed(2),
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/app/investing/page.js",
                                                    lineNumber: 618,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/investing/page.js",
                                                lineNumber: 617,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, stock.symbol, true, {
                                        fileName: "[project]/frontend/app/investing/page.js",
                                        lineNumber: 601,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/investing/page.js",
                                lineNumber: 591,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center mt-6 space-x-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-1.5 h-1.5 rounded-full bg-black dark:bg-white"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/investing/page.js",
                                        lineNumber: 628,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-1.5 h-1.5 rounded-full bg-gray-300"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/investing/page.js",
                                        lineNumber: 629,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-1.5 h-1.5 rounded-full bg-gray-300"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/investing/page.js",
                                        lineNumber: 630,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-1.5 h-1.5 rounded-full bg-gray-300"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/investing/page.js",
                                        lineNumber: 631,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/investing/page.js",
                                lineNumber: 627,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/investing/page.js",
                        lineNumber: 582,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/investing/page.js",
                lineNumber: 523,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$Navbar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/frontend/app/investing/page.js",
                lineNumber: 637,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/app/investing/page.js",
        lineNumber: 237,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=frontend_405177ca._.js.map