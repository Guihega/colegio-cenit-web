import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export", // <--- genera /out para subir a Hostinger

  // 🔥 Rutas correctas para despliegue en carpeta
  basePath: isProd ? "/colegio-cenit" : "",
  assetPrefix: isProd ? "/colegio-cenit/" : "",

  // 🔥 ENV pública para usar en componentes
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/colegio-cenit" : "",
  },

  images: {
    qualities: [75, 85],
    unoptimized: true,
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com", pathname: "/photos/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-*/**" },
      { protocol: "https", hostname: "cdn.pixabay.com", pathname: "/photo/**" },
    ],
  },

  reactStrictMode: true,
  compress: true,
  trailingSlash: true,
  poweredByHeader: false,
  experimental: { typedRoutes: true },
};

export default nextConfig;
