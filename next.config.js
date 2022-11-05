/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    IPFS_TOKEN: process.env.IPFS_TOKEN,
  },
  swcMinify: true,
  images:{
    domains:['dweb.link','ipfs.w3s.link']
  },
}

module.exports = nextConfig
