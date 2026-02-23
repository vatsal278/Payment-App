import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ToastProvider } from "@/components/Toast";
import MainContent from "@/components/MainContent";
import "./globals.css";

export const metadata = {
    title: "FlowCash",
    description: "Spend, save, and invest with FlowCash.",
    manifest: "/manifest.json",
    themeColor: "#00D632",
    viewport: "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover",
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: "FlowCash",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="apple-touch-icon" href="/flowcash-logo.png" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
            </head>
            <body className="antialiased overflow-x-hidden">
                <ErrorBoundary>
                    <AuthProvider>
                        <ThemeProvider>
                            <ToastProvider>
                                <MainContent>
                                    {children}
                                </MainContent>
                            </ToastProvider>
                        </ThemeProvider>
                    </AuthProvider>
                </ErrorBoundary>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            if ('serviceWorker' in navigator) {
                                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                                    for(let registration of registrations) {
                                        registration.unregister();
                                    }
                                }).catch(function() {});
                            }
                        `,
                    }}
                />
            </body>
        </html>
    );
}

