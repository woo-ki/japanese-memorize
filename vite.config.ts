import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const envDir = `${process.cwd()}`;
  const env = loadEnv(mode, envDir);
  return {
    plugins: [
      svgr({
        include: '**/*.svg',
        exclude: '**/favicon.svg',
      }),
      react({
        jsxImportSource: '@emotion/react',
      }),
      tsconfigPaths(),
    ],
    server: {
      port: Number(env.VITE_APP_PORT),
      host: env.VITE_APP_HOST,
      proxy: {
        '/s3': {
          target: 'https://woo-ki.s3.ap-northeast-2.amazonaws.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/s3/, ''),
        },
      },
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  };
});
