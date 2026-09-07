import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// En GitHub Pages el sitio queda en https://usuario.github.io/MiPortfolio-Mailen/,
// asi que el build necesita ese prefijo. Para publicar en Vercel, Netlify o un
// dominio propio (donde el sitio vive en la raiz), compilar con:
//     VITE_BASE=/ npm run build
//
// `vite preview` sirve el build ya compilado, asi que tiene que usar el mismo
// prefijo; solo el servidor de desarrollo trabaja desde la raiz.
export default defineConfig(({ command, isPreview }) => ({
  base:
    command === 'build' || isPreview
      ? (process.env.VITE_BASE ?? '/MiPortfolio-Mailen/')
      : '/',
  plugins: [react()],
}));
