/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      // optional if you ever use it:
      // {
      //   protocol: "https",
      //   hostname: "source.unsplash.com",
      //   pathname: "/**",
      // },
    ],
  },
};

export default nextConfig;