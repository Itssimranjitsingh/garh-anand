import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.sikhtranslations.com",
                pathname: "/**",
            },
            {
                protocol: "http",
                hostname: "panthic.org",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "live.staticflickr.com",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
