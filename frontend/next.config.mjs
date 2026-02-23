/** @type {import('next').NextConfig} */
const nextConfig = {
    // Static export for Capacitor native apps
    output: 'export',
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    // Strict mode helps catch bugs in development
    reactStrictMode: true,
    // Compress responses
    compress: true,
    // Trailing slash for clean static file serving
    trailingSlash: true,
};

export default nextConfig;
