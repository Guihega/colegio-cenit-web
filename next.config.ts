import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // <--- ESTO genera la carpeta /out
  images: {
    qualities: [75, 85],
    unoptimized: true, // ✅ evita el uso del optimizador interno
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-*/**",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        pathname: "/photo/**",
      },
    ],
  },
  reactStrictMode: true,
  compress: true,
  trailingSlash: true,
  poweredByHeader: false,
  experimental: { typedRoutes: true },
};

export default nextConfig;
