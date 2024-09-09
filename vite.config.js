import * as path from 'path';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

export default {
  root: './src/',
  build: {
    outDir: '../dist/',
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      {
        find: '@composables',
        replacement: path.resolve(__dirname, 'src/composables'),
      },
      {
        find: '@scripts',
        replacement: path.resolve(__dirname, 'src/scripts'),
      },
      {
        find: '@styles',
        replacement: path.resolve(__dirname, 'src/styles'),
      },
    ],
  },
  plugins: [vue(), vueDevTools()],
};
