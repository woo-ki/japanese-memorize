import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

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
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: '일본어 암기장',
          short_name: '일본어 암기장',
          start_url: '/',
          description: 'JLPT N1 ~ N5까지의 단어를 외워 보세요',
          display: 'standalone',
          theme_color: '#f7f3e9',
          icons: [
            {
              src: '/pwa/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/pwa/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
        workbox: {
          // 전체 오프라인 캐싱 비활성화
          runtimeCaching: [
            {
              // 특정 경로의 파일만 캐싱
              urlPattern: /\/assets\/fonts\/Hangeuljaemin4-Regular\/.*\.(woff|woff2|ttf|otf)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'font-cache',
                expiration: {
                  maxEntries: 10, // 최대 10개 파일만 캐싱
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30일 동안 캐시 유지
                },
              },
            },
          ],
        },
      }),
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
