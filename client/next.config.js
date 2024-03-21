/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  rules: {
    "react/no-unescaped-entities": "off",
  },
  reactStrictMode: false,
  images: {
    domains: [
      "image.tmdb.org",
      "rb.gy",
      "example.com",
      "hotellerv5.b-cdn.net",
      "picsum.photos",
      "media.istockphoto.com",
      "lh3.googleusercontent.com",
    ],
  },
};
