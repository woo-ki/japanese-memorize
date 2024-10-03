import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import fs from 'fs';
import path from 'path';

export default defineConfig(({ mode }) => {
  const envDir = `${process.cwd()}`;
  const env = loadEnv(mode, envDir);
  return {
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
      }),
      tsconfigPaths(),
      copyGitignorePlugin(),
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

function copyGitignorePlugin(): Plugin {
  return {
    name: 'copy-gitignore',
    closeBundle() {
      const sourcePath = path.resolve(__dirname, '.gitignore');
      const destinationPath = path.resolve(__dirname, 'dist', '.gitignore');

      fs.copyFileSync(sourcePath, destinationPath);
      console.log('.gitignore file copied to dist folder');
    },
  };
}
