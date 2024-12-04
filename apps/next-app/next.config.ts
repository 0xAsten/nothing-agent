import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: [
    '@cartridge/utils',
    '@cartridge/ui-next',
    '@cartridge/connector',
    '@cartridge/controller',
  ],
  webpack: (config) => {
    // Add support for importing JSX files
    config.resolve.extensions.push('.jsx')

    // Configure module rules for JSX files in node_modules
    config.module.rules.push({
      test: /\.jsx?$/,
      include: [/node_modules\/@cartridge/],
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      ],
    })

    // Add proper module resolution
    config.resolve.fallback = {
      ...config.resolve.fallback,
      module: false,
    }

    // Configure WebAssembly to use async loading
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    }

    // config.target = ['web', 'es2017']

    return config
  },
}

export default nextConfig
