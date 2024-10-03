import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const envDir = `${process.cwd()}`;
  const env = loadEnv(mode, envDir);
  return {
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
      }),
      tsconfigPaths(),
    ],
    server: {
      port: Number(env.VITE_APP_PORT),
      host: env.VITE_APP_HOST,
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
