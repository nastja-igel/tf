/**
 * Vite config for building mt-ds as a distributable npm library.
 * Used by: npm run build:lib
 * Output:  lib/index.mjs  (ESM)
 *          lib/index.cjs  (CJS)
 *          lib/style.css  (all component CSS modules bundled)
 *
 * Peer deps (react, react-dom) are externalised — consumers must provide them.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'),
      name: 'MtDs',
      formats: ['es', 'cjs'],
      fileName: (fmt) => fmt === 'es' ? 'index.mjs' : 'index.cjs',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react:               'React',
          'react-dom':         'ReactDOM',
          'react/jsx-runtime': 'ReactJSXRuntime',
        },
        // Bundle all CSS modules into a single style.css
        assetFileNames: 'style[extname]',
      },
    },
    // Output directory separate from the app build
    outDir:     'lib',
    emptyOutDir: true,
    // Inline sourcemaps for easy debugging in consuming projects
    sourcemap:  true,
    // Don't minify — consumers run their own bundler
    minify:     false,
  },
  css: {
    // Merge all CSS modules into one file (lib/style.css)
    modules: {
      localsConvention: 'camelCase',
    },
  },
})
