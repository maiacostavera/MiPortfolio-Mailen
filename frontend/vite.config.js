import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// En GitHub Pages el sitio queda en https://usuario.github.io/MiPortfolio-Mailen/,
// asi que el build necesita ese prefijo. Para publicar en Vercel, Netlify o un
// dominio propio (donde el sitio vive en la raiz), compilar con:
//     VITE_BASE=/ npm run build
export default defineConfig(({ command }) => ({
  base: command === 'build' ? (process.env.VITE_BASE ?? '/MiPortfolio-Mailen/') : '/',
  plugins: [react()],
}));
