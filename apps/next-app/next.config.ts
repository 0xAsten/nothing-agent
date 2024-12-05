import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: [
    '@cartridge/utils',
    '@cartridge/ui-next',
    '@cartridge/connector',
    '@cartridge/controller',
  ],
  webpack: (config) => {
    // Configure WebAssembly to use async loading
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    }

    return config
  },
  output: 'standalone',
}

export default nextConfig
