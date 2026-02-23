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
"[project]/frontend/app/activity/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ActivityPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$context$2f$AuthContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/context/AuthContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$Navbar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/Navbar.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$StockLogo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/StockLogo.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$Toast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/Toast.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$assets$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/assets.js [app-ssr] (ecmascript)");
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
function ActivityPage() {
    const { user, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$context$2f$AuthContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [activity, setActivity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isRefreshing, setIsRefreshing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("all");
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$Toast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    // Read filter from URL on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const params = new URLSearchParams(window.location.search);
        const urlFilter = params.get("filter");
        if (urlFilter && [
            "all",
            "sent",
            "received",
            "requests",
            "investing",
            "bitcoin",
            "savings"
        ].includes(urlFilter)) {
            setFilter(urlFilter);
        }
    }, []);
    // Pull-to-refresh
    const [pullDistance, setPullDistance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const touchStartY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const isPulling = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!loading && !user) router.push("/login");
    }, [
        user,
        loading
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (user) fetchActivity();
    }, [
        user,
        filter
    ]);
    const fetchActivity = async ()=>{
        setIsRefreshing(true);
        try {
            const filterParam = filter !== "all" ? `&type=${filter}` : "";
            const [transRes, fundingRes, tradeRes] = await Promise.all([
                filter !== "investing" ? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/transfer/history?limit=50${filterParam}`) : Promise.resolve({
                    data: {
                        data: {
                            transactions: []
                        }
                    }
                }),
                filter === "all" || filter === "funding" ? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get("/funding/history?limit=20") : Promise.resolve({
                    data: {
                        data: {
                            movements: []
                        }
                    }
                }),
                filter === "all" || filter === "investing" ? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get("/trading/orders?limit=30") : Promise.resolve({
                    data: {
                        data: []
                    }
                })
            ]);
            const transfers = (transRes.data.data?.transactions || []).map((t)=>{
                const isSender = t.sender_id === user.id;
                let displayType, otherParty, otherCashtag;
                if (t.type === "request") {
                    const isRequester = t.receiver_id === user.id;
                    displayType = isRequester ? "Requested from" : "Request from";
                    otherParty = isRequester ? t.sender_name : t.receiver_name;
                    otherCashtag = isRequester ? t.sender_cashtag : t.receiver_cashtag;
                } else if (t.type === "bitcoin_send") {
                    displayType = isSender ? "Sent Bitcoin to" : "Received Bitcoin from";
                    otherParty = isSender ? t.receiver_name : t.sender_name;
                    otherCashtag = isSender ? t.receiver_cashtag : t.sender_cashtag;
                } else {
                    displayType = isSender ? "Sent to" : "Received from";
                    otherParty = isSender ? t.receiver_name : t.sender_name;
                    otherCashtag = isSender ? t.receiver_cashtag : t.sender_cashtag;
                }
                return {
                    ...t,
                    displayType,
                    otherParty: otherParty || otherCashtag || "Unknown",
                    otherCashtag,
                    isCashIn: false
                };
            });
            const funding = (fundingRes.data.data?.movements || []).map((f)=>({
                    ...f,
                    displayType: f.direction === "cash_in" ? "Added from Bank" : "Withdrawal",
                    otherParty: f.nickname || f.brand || "Bank Account",
                    isCashIn: true,
                    type: f.direction === "cash_in" ? "receive" : "send"
                }));
            const trades = (tradeRes.data.data || []).map((o)=>{
                const isCrypto = o.asset_class === "crypto" || o.symbol.includes("/");
                const qtyStr = Number(o.filled_qty) > 0 ? Number(o.filled_qty).toLocaleString(undefined, {
                    maximumFractionDigits: isCrypto ? 6 : 4
                }) + " " : "";
                const symbolStr = isCrypto ? o.symbol.split("/")[0] : o.symbol;
                return {
                    id: o.id,
                    displayType: o.side === "buy" ? `Bought ${qtyStr}` : `Sold ${qtyStr}`,
                    otherParty: symbolStr,
                    isCashIn: o.side === "sell",
                    type: "trade",
                    amount: parseFloat(o.notional || o.filled_avg_price * o.filled_qty || 0) * 100,
                    created_at: o.filled_at || o.submitted_at,
                    status: o.status === "accepted" || o.status === "new" ? "pending" : o.status,
                    isTrade: true
                };
            });
            const combined = [
                ...transfers,
                ...funding,
                ...trades
            ].sort((a, b)=>new Date(b.created_at) - new Date(a.created_at));
            // Load savings activities from localStorage
            let savingsItems = [];
            try {
                const savingsRaw = localStorage.getItem(`flowcash_savings_activity_${user.id}`);
                if (savingsRaw) {
                    savingsItems = JSON.parse(savingsRaw).map((s)=>{
                        const isDeposit = s.type === 'save' || s.type === 'goal_complete';
                        let displayType;
                        switch(s.type){
                            case 'save':
                                displayType = 'Saved to';
                                break;
                            case 'goal_complete':
                                displayType = '🎉 Goal Reached:';
                                break;
                            case 'withdraw':
                                displayType = 'Withdrew from';
                                break;
                            case 'withdraw_all':
                                displayType = 'Withdrew all from';
                                break;
                            case 'goal_deleted':
                                displayType = 'Deleted goal:';
                                break;
                            default:
                                displayType = 'Savings';
                        }
                        return {
                            ...s,
                            displayType,
                            otherParty: s.goalName,
                            isCashIn: isDeposit,
                            isSavings: true,
                            type: 'savings',
                            amount: Math.round((s.amount || 0) * 100),
                            status: 'completed'
                        };
                    });
                }
            } catch  {}
            // Filter savings based on active filter
            if (filter === "savings") {
                setActivity(savingsItems.sort((a, b)=>new Date(b.created_at) - new Date(a.created_at)));
            } else if (filter === "all") {
                setActivity([
                    ...combined,
                    ...savingsItems
                ].sort((a, b)=>new Date(b.created_at) - new Date(a.created_at)));
            } else {
                setActivity(combined);
            }
        } catch (err) {
            console.error("Failed to fetch activity");
        } finally{
            setIsRefreshing(false);
        }
    };
    const handleRespondToRequest = async (transactionId, action)=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`/transfer/respond/${transactionId}`, {
                action
            });
            await fetchActivity();
        } catch (err) {
            toast.error(`Failed to ${action} request: ` + (err.response?.data?.message || err.message));
        }
    };
    const onTouchStart = (e)=>{
        if (window.scrollY === 0) {
            touchStartY.current = e.touches[0].clientY;
            isPulling.current = true;
        }
    };
    const onTouchMove = (e)=>{
        if (!isPulling.current) return;
        const diff = e.touches[0].clientY - touchStartY.current;
        if (diff > 0 && window.scrollY === 0) setPullDistance(Math.min(diff * 0.4, 80));
    };
    const onTouchEnd = ()=>{
        if (pullDistance > 50) fetchActivity();
        setPullDistance(0);
        isPulling.current = false;
    };
    if (loading || !user) return null;
    const filters = [
        {
            key: "all",
            label: "All"
        },
        {
            key: "investing",
            label: "Investing"
        },
        {
            key: "bitcoin",
            label: "Bitcoin"
        },
        {
            key: "savings",
            label: "Savings"
        },
        {
            key: "sent",
            label: "Sent"
        },
        {
            key: "received",
            label: "Received"
        },
        {
            key: "requests",
            label: "Requests"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pb-24 pt-8 px-6 min-h-screen flex flex-col bg-white dark:bg-black",
        onTouchStart: onTouchStart,
        onTouchMove: onTouchMove,
        onTouchEnd: onTouchEnd,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center items-center overflow-hidden transition-all duration-200",
                style: {
                    height: pullDistance > 0 ? `${pullDistance}px` : isRefreshing ? "40px" : "0px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                    className: `w-5 h-5 text-cashapp ${isRefreshing ? "animate-spin" : ""}`
                }, void 0, false, {
                    fileName: "[project]/frontend/app/activity/page.js",
                    lineNumber: 251,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/app/activity/page.js",
                lineNumber: 240,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push("/"),
                                className: "p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    className: "w-6 h-6"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/activity/page.js",
                                    lineNumber: 263,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/activity/page.js",
                                lineNumber: 259,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold",
                                children: "Activity"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/activity/page.js",
                                lineNumber: 265,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/activity/page.js",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: fetchActivity,
                        className: "p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                            className: `w-5 h-5 text-gray-400 ${isRefreshing ? "animate-spin" : ""}`
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/activity/page.js",
                            lineNumber: 271,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/activity/page.js",
                        lineNumber: 267,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/activity/page.js",
                lineNumber: 257,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex space-x-2 mb-6 overflow-x-auto no-scrollbar",
                children: filters.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFilter(f.key),
                        className: `px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${filter === f.key ? "bg-cashapp text-white shadow-sm" : "bg-gray-100 dark:bg-zinc-900 text-gray-500 hover:bg-gray-200 dark:hover:bg-zinc-800"}`,
                        children: f.label
                    }, f.key, false, {
                        fileName: "[project]/frontend/app/activity/page.js",
                        lineNumber: 280,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/frontend/app/activity/page.js",
                lineNumber: 278,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-0 flex-1",
                children: activity.length > 0 ? activity.map((item, idx)=>{
                    const isSender = item.sender_id === user.id;
                    const isIncoming = item.isSavings ? !item.isCashIn // savings withdraw = money back to you
                     : item.isCashIn || !isSender && item.type === "send";
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex items-center justify-between py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-900 px-1 -mx-1 rounded-xl transition-all ${idx < activity.length - 1 ? "border-b border-gray-100 dark:border-zinc-800/50" : ""}`,
                        onClick: ()=>!item.isCashIn && !item.isSavings && router.push(`/activity/detail?id=${item.id}`),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-3 flex-1 min-w-0",
                                children: [
                                    item.isTrade ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$StockLogo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        assetInfo: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$assets$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CRYPTOS"].find((c)=>c.symbol.startsWith(item.otherParty)) || __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$assets$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STOCKS"].find((s)=>s.symbol === item.otherParty),
                                        symbol: item.otherParty,
                                        size: "w-10 h-10"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/activity/page.js",
                                        lineNumber: 314,
                                        columnNumber: 21
                                    }, this) : item.type === "bitcoin_send" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$StockLogo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        assetInfo: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$assets$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CRYPTOS"].find((c)=>c.alpacaSymbol === "BTCUSD"),
                                        symbol: "BTC",
                                        size: "w-10 h-10"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/activity/page.js",
                                        lineNumber: 322,
                                        columnNumber: 21
                                    }, this) : item.isSavings ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-sm",
                                        children: "💰"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/activity/page.js",
                                        lineNumber: 328,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${item.isCashIn ? "bg-blue-500" : item.type === "request" ? "bg-orange-500" : isIncoming ? "bg-cashapp" : "bg-gray-400 dark:bg-zinc-600"}`,
                                        children: item.isCashIn ? "🏦" : item.type === "request" ? "!" : isIncoming ? "↓" : "↑"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/activity/page.js",
                                        lineNumber: 332,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold text-[15px] truncate",
                                                children: item.otherCashtag || item.otherParty
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/activity/page.js",
                                                lineNumber: 344,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-500 mt-0.5",
                                                children: [
                                                    item.displayType,
                                                    " · ",
                                                    new Date(item.created_at).toLocaleDateString(undefined, {
                                                        month: "short",
                                                        day: "numeric"
                                                    })
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/activity/page.js",
                                                lineNumber: 347,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/activity/page.js",
                                        lineNumber: 343,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/activity/page.js",
                                lineNumber: 311,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right ml-3 shrink-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `font-bold text-[15px] ${isIncoming ? "text-cashapp" : ""}`,
                                        children: [
                                            isIncoming ? "+" : "-",
                                            "$",
                                            (item.amount / 100).toFixed(2)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/activity/page.js",
                                        lineNumber: 357,
                                        columnNumber: 19
                                    }, this),
                                    item.status && item.status !== "completed" && item.status !== "filled" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `text-[10px] font-medium mt-0.5 ${item.status === "pending" ? "text-amber-500" : item.status === "failed" || item.status === "declined" ? "text-red-500" : "text-gray-400"}`,
                                        children: item.status
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/activity/page.js",
                                        lineNumber: 361,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/activity/page.js",
                                lineNumber: 356,
                                columnNumber: 17
                            }, this)
                        ]
                    }, item.id, true, {
                        fileName: "[project]/frontend/app/activity/page.js",
                        lineNumber: 303,
                        columnNumber: 15
                    }, this);
                }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center justify-center pt-20 text-gray-500",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                            className: "w-12 h-12 mb-4 opacity-15"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/activity/page.js",
                            lineNumber: 374,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-medium text-sm",
                            children: "No activity yet"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/activity/page.js",
                            lineNumber: 375,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/app/activity/page.js",
                    lineNumber: 373,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/app/activity/page.js",
                lineNumber: 294,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$Navbar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/frontend/app/activity/page.js",
                lineNumber: 380,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/app/activity/page.js",
        lineNumber: 233,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=frontend_bf757559._.js.map