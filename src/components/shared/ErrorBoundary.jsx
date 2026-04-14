import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false, error: null, errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentsDidCatch(error, errorInfo) {
        console.log("Error caught by boundary", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });

    }

    render() {
        if (this.state.hasError) {

            if (this.props.fallback) {
                return this.props.children;
            }

            // Default fallback UI — styled to match your dark theme
            return (
                <div className="flex items-center justify-center min-h-screen bg-gray-950 text-gray-100">
                    <div className="text-center p-8 rounded-2xl bg-gray-900 border border-gray-800 max-w-md mx-4">
                        <div className="text-5xl mb-4">⚠️</div>
                        <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
                        <p className="text-gray-400 mb-6 text-sm">
                            An unexpected error occurred. Please try again.
                        </p>
                        {/* Show error details in development only */}
                        {import.meta.env.DEV && this.state.error && (
                            <details className="mb-4 text-left text-xs text-red-400 bg-gray-800 p-3 rounded-lg overflow-auto max-h-40">
                                <summary className="cursor-pointer mb-2 text-red-300">
                                    Error Details
                                </summary>
                                <pre className="whitespace-pre-wrap">
                                    {this.state.error.toString()}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={this.handleReset}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition-colors"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors"
                            >
                                Reload Page
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}
export default ErrorBoundary;



