/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  images: {
    unoptimized: true,
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
