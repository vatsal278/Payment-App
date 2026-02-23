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
"[project]/frontend/app/crypto/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CryptoPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$context$2f$AuthContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/context/AuthContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$Navbar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/Navbar.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$PriceChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/PriceChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$assets$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/assets.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/api.js [app-ssr] (ecmascript)");
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
function CryptoPage() {
    const { user, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$context$2f$AuthContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [cryptoData, setCryptoData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [positions, setPositions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [dataLoading, setDataLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!loading && !user) router.push("/login");
    }, [
        user,
        loading,
        router
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!user) return;
        const fetchCryptos = async ()=>{
            setDataLoading(true);
            try {
                // Fetch positions and cash balance concurrently
                const [posRes, cashRes] = await Promise.all([
                    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get("/trading/positions?asset_class=crypto"),
                    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get("/wallet/balance")
                ]);
                const posData = posRes.data.data || [];
                // Map positions by symbol
                const posMap = {};
                posData.forEach((p)=>{
                    posMap[p.symbol] = p;
                });
                setPositions(posMap);
                // Fetch latest bars (fallback for crypto summary quotes)
                const fetchPromises = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$assets$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CRYPTOS"].map(async (crypto)=>{
                    try {
                        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/trading/crypto/bars/${crypto.symbol}?timeframe=1Day&limit=2`);
                        const bars = res.data.data.bars || [];
                        const pos = posMap[crypto.symbol];
                        let currentPrice = 0;
                        let prevPrice = 0;
                        let openPrice = 0;
                        if (bars.length > 0) {
                            currentPrice = parseFloat(bars[bars.length - 1].c);
                            openPrice = parseFloat(bars[0].o);
                        }
                        const diff = currentPrice - openPrice;
                        const pctChange = openPrice ? diff / openPrice * 100 : 0;
                        return {
                            ...crypto,
                            price: currentPrice,
                            change: pctChange,
                            isUp: pctChange >= 0,
                            qty: pos ? pos.qty : 0,
                            market_value: pos ? pos.market_value : 0,
                            chartData: [
                                openPrice,
                                currentPrice
                            ]
                        };
                    } catch (err) {
                        return {
                            ...crypto,
                            price: 0,
                            change: 0,
                            isUp: true,
                            qty: 0,
                            market_value: 0,
                            chartData: [
                                0,
                                0
                            ]
                        };
                    }
                });
                const merged = await Promise.all(fetchPromises);
                setCryptoData(merged);
            } catch (err) {
                console.error("Failed to fetch crypto data:", err);
            } finally{
                setDataLoading(false);
            }
        };
        fetchCryptos();
    }, [
        user
    ]);
    if (loading || !user) return null;
    // Calculate total crypto portfolio value from tracked cryptos
    const totalValue = cryptoData.reduce((sum, p)=>sum + p.market_value, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-white dark:bg-black pb-24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center space-x-4 p-6 pb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.back(),
                        className: "p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            className: "w-6 h-6"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/crypto/page.js",
                            lineNumber: 112,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/crypto/page.js",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold",
                        children: "Invest"
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/crypto/page.js",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/crypto/page.js",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-6 mt-4 mb-4 bg-gray-100 dark:bg-zinc-900 p-1 rounded-full flex overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push("/stocks"),
                        className: "flex-1 py-2.5 rounded-full font-bold text-sm transition-all text-gray-500 hover:text-gray-700",
                        children: "Stocks"
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/crypto/page.js",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "flex-1 py-2.5 rounded-full font-bold text-sm transition-all bg-white dark:bg-zinc-800 shadow-sm text-[#F7931A]",
                        children: "Crypto"
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/crypto/page.js",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/crypto/page.js",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            (totalValue > 0 || dataLoading) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500 font-bold uppercase tracking-widest",
                        children: "Crypto Value"
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/crypto/page.js",
                        lineNumber: 133,
                        columnNumber: 11
                    }, this),
                    dataLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-8 w-32 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded mt-1"
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/crypto/page.js",
                        lineNumber: 137,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-3xl font-bold mt-1",
                        children: [
                            "$",
                            totalValue.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/crypto/page.js",
                        lineNumber: 139,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/crypto/page.js",
                lineNumber: 132,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-6 mb-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-2xl p-5 border border-orange-100/50 dark:border-orange-800/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-3 mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xl",
                                children: "🚀"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/crypto/page.js",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-bold text-sm",
                                children: "Diversify with Crypto"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/crypto/page.js",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/crypto/page.js",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500",
                        children: "Trade Bitcoin, Ethereum, and other cryptocurrencies seamlessly directly from your balance."
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/crypto/page.js",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/crypto/page.js",
                lineNumber: 151,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xs font-bold uppercase tracking-widest text-gray-400 mb-4",
                        children: "Available Assets"
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/crypto/page.js",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this),
                    dataLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center py-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            className: "w-8 h-8 animate-spin text-gray-300"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/crypto/page.js",
                            lineNumber: 170,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/crypto/page.js",
                        lineNumber: 169,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: cryptoData.map((crypto)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push(`/crypto/detail?symbol=${crypto.alpacaSymbol}`),
                                className: "w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all active:scale-[0.98]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-12 h-12 rounded-full flex items-center justify-center overflow-hidden bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: crypto.logo,
                                                        alt: crypto.name,
                                                        className: "w-full h-full object-cover",
                                                        onError: (e)=>{
                                                            e.target.style.display = "none";
                                                            e.target.nextSibling.style.display = "flex";
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/crypto/page.js",
                                                        lineNumber: 182,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            display: "none",
                                                            backgroundColor: crypto.color
                                                        },
                                                        className: "w-12 h-12 items-center justify-center text-xl text-white",
                                                        children: crypto.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/crypto/page.js",
                                                        lineNumber: 191,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/crypto/page.js",
                                                lineNumber: 181,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-left",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-bold text-sm",
                                                        children: crypto.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/crypto/page.js",
                                                        lineNumber: 199,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-500 font-medium",
                                                        children: [
                                                            crypto.alpacaSymbol,
                                                            crypto.qty > 0 ? ` • ${crypto.qty.toFixed(6)}` : ""
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/app/crypto/page.js",
                                                        lineNumber: 200,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/crypto/page.js",
                                                lineNumber: 198,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/crypto/page.js",
                                        lineNumber: 180,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-16 h-8",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$PriceChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    data: crypto.chartData,
                                                    color: crypto.isUp ? "#00D632" : "#EF4444",
                                                    height: 32
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/crypto/page.js",
                                                    lineNumber: 209,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/crypto/page.js",
                                                lineNumber: 208,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-right min-w-[70px]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-bold text-sm",
                                                        children: [
                                                            "$",
                                                            crypto.price.toLocaleString(undefined, {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2
                                                            })
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/app/crypto/page.js",
                                                        lineNumber: 216,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: `text-xs font-bold ${crypto.isUp ? "text-cashapp" : "text-red-500"}`,
                                                        children: [
                                                            crypto.isUp ? "+" : "",
                                                            crypto.change.toFixed(2),
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/app/crypto/page.js",
                                                        lineNumber: 223,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/crypto/page.js",
                                                lineNumber: 215,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/crypto/page.js",
                                        lineNumber: 207,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, crypto.symbol, true, {
                                fileName: "[project]/frontend/app/crypto/page.js",
                                lineNumber: 175,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/crypto/page.js",
                        lineNumber: 173,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/crypto/page.js",
                lineNumber: 163,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$Navbar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/frontend/app/crypto/page.js",
                lineNumber: 237,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/app/crypto/page.js",
        lineNumber: 105,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=frontend_c6fd36e2._.js.map