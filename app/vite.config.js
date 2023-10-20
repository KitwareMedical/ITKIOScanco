import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'

const itkConfig = path.resolve(__dirname, 'src', 'itkConfig.js')

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  worker: {
    format: 'es'
  },
  optimizeDeps: {
    exclude: ['@itk-wasm/image-io']
  },
  plugins: [
    // put lazy loaded JavaScript and Wasm bundles in dist directory
    viteStaticCopy({
      targets: [
        { src: 'node_modules/@itk-wasm/image-io/dist/pipelines/*.{js,wasm.zst}', dest: 'itk/image-io' },
      ],
    })
  ],
})
