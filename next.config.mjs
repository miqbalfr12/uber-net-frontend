/** @type {import('next').NextConfig} */
const nextConfig = {
 async rewrites() {
  return [
   {
    source: "/api/v1.0.0/:path*",
    destination: `http://localhost:3001/api/v1.0.0/:path*`,
   },
  ];
 },
};

export default nextConfig;
