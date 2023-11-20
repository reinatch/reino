/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV;
console.log(isProd);
const nextConfig = {
  // basePath: "",
  basePath: !isProd == "production" ? "" : "/reino",
  output: "export",
  distDir: "dist",
};

module.exports = nextConfig;
