/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    IPFS_TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGY1NDc4ODM3QjA1OGI2MTFhODFjZGRmZUVCNDg5ODVmYjQyQ0Y5ODQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njc2MDAwNTExNjcsIm5hbWUiOiJjcnlwdG9ub3RlQVBJIn0.8DesUTnP2THvUxHDL7v-5Os8MUWb2aOV438tIRUaA_U',
  },
  swcMinify: true,
  images:{
    domains:['dweb.link','ipfs.w3s.link']
  },
}

module.exports = nextConfig
