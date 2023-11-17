const { defineConfig } = require('vite');
const path = require('path');
const react = require('@vitejs/plugin-react');
const { version } = require('./package.json');

module.exports = defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name].${version}.js`,
        chunkFileNames: `[name].${version}.js`,
        assetFileNames: `[name].${version}.[ext]`
      }
    }
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utilities': path.resolve(__dirname, 'src/utilities'),
      '@views': path.resolve(__dirname, 'src/views')
    },
  },
  preview: {
    host: true,                // needed for docker
    port: process.env.PORT,
    strictPort: true
  },
  server: {
    host: true,                // needed for docker
    port: process.env.PORT,
    strictPort: true
  },
  watch: {
    usePolling: true
  },
  define: {
    'process.env': process.env
  }
});