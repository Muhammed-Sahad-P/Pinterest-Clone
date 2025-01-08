/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.drupal.org",
        port: "",
      },
      {
        protocol: "https",
        hostname: "your-cdn-or-api.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "helpx.adobe.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
