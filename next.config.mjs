/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 🔥 This enables static HTML export

  images: {
    unoptimized: true, // Required for static export when using next/image
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/Images/**",
      },
      {
        protocol: "https",
        hostname: "api.tojonews.com",
        pathname: "/Images/**",
      },
    ],
  },
};

export default nextConfig;
