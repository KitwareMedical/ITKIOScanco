import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'

const itkConfig = path.resolve(__dirname, 'src', 'itkConfig.js')

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  plugins: [
    // put lazy loaded JavaScript and Wasm bundles in dist directory
    viteStaticCopy({
      targets: [
        { src: 'node_modules/itk-wasm/dist/web-workers/*', dest: 'dist/itk/web-workers' },
        {
          src: 'node_modules/itk-image-io/*',
          dest: 'dist/itk/image-io',
        },
      ],
    })
  ],
  resolve: {
    // where itk-wasm code has 'import ../itkConfig.js` point to the path of itkConfig
    alias: {
      '../itkConfig.js': itkConfig,
      '../../itkConfig.js': itkConfig
    }
  }
})
