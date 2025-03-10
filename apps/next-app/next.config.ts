/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config: any, { isServer, dev }: any) => {
    // Enable WebAssembly
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      topLevelAwait: true,
    }

    // Fix for WebAssembly in production builds
    if (!dev && isServer) {
      config.output.webassemblyModuleFilename = 'chunks/[id].wasm'
      config.plugins.push(new WasmChunksFixPlugin())
    }

    return config
  },
}

// Plugin to fix WASM chunk loading in production
class WasmChunksFixPlugin {
  apply(compiler: any) {
    compiler.hooks.thisCompilation.tap(
      'WasmChunksFixPlugin',
      (compilation: any) => {
        compilation.hooks.processAssets.tap(
          { name: 'WasmChunksFixPlugin' },
          (assets: any) =>
            Object.entries(assets).forEach(([pathname, source]: any) => {
              if (!pathname.match(/\.wasm$/)) return
              compilation.deleteAsset(pathname)

              const name = pathname.split('/')[1]
              const info = compilation.assetsInfo.get(pathname)
              compilation.emitAsset(name, source, info)
            }),
        )
      },
    )
  }
}

module.exports = nextConfig
