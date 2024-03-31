import reactPlugin from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteSvgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPathsPlugin from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    reactPlugin(),
    viteTsconfigPathsPlugin(),
    viteSvgrPlugin({ include: '**/*.svg?react' }),
  ],
  server: {
    open: true,
    port: 3000,
  },
});
