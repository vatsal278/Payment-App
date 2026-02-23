"use client";

import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught:", error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black p-6 text-center">
                    <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
                        <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
                        An unexpected error occurred. Please try again or refresh the page.
                    </p>
                    <button
                        onClick={this.handleRetry}
                        className="flex items-center space-x-2 bg-cashapp text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-cashapp/20 hover:scale-105 active:scale-95 transition-all"
                    >
                        <RefreshCw className="w-5 h-5" />
                        <span>Try Again</span>
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
