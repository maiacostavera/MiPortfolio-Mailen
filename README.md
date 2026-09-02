# Portfolio — Mailen Acosta Vera

Portfolio personal de desarrollo de software, QA y auditoría de sistemas.
Diseño editorial propio, modo claro/oscuro y una sección de proyectos que se
sincroniza sola con la API pública de GitHub.

## Cómo lo corro

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

Otros comandos:

| Comando | Qué hace |
|---|---|
| `npm run build` | Compila el sitio para producción en `frontend/dist` |
| `npm run preview` | Sirve el build de producción para revisarlo |
| `npm run lint` | Revisa el código con oxlint |
| `npm run cv` | Regenera `public/cv-mailen-acosta-vera.pdf` desde `cv/cv.html` |

## Estructura

```
frontend/
  src/
    data/
      profile.js       ← Todo mi contenido: perfiles, skills, experiencia, educación
      projects.json    ← Los proyectos (lo lee también la API del backend)
    hooks/
      useGithubRepos.js  ← Trae datos en vivo de GitHub, con caché y respaldo
      useRole.js         ← Selector de perfil (auditoría / soporte / full stack)
      useTheme.js        ← Modo claro/oscuro
      useActiveSection.js
    components/        ← Un componente por sección
    index.css          ← Sistema de diseño completo (tokens claros y oscuros)
cv/
  cv.html              ← Fuente del CV en PDF
  build-cv.mjs         ← Generador del PDF (no necesita dependencias de npm)
backend/               ← API opcional. El sitio funciona sin ella.
```

## Cómo lo actualizo

**Agregar o editar un proyecto** → `frontend/src/data/projects.json`.
El campo `repo` tiene que coincidir con el nombre real del repositorio en
GitHub: con eso el sitio trae solo el lenguaje, las estrellas y la fecha de la
última actualización. Si el proyecto tiene demo publicada, poner la URL en
`demo` (si es `null`, el botón simplemente no aparece).

**Cambiar mis datos, skills o experiencia** → `frontend/src/data/profile.js`.
Cada grupo de skills y cada logro laboral lleva una lista `roles`, que define
para qué perfiles se destaca.

**Actualizar el CV** → editar `cv/cv.html` y correr `npm run cv` desde
`frontend/`. El PDF se regenera con las tipografías incrustadas.

## Detalles de implementación

- **Datos de GitHub en vivo.** La API pública permite 60 pedidos por hora e IP,
  así que la respuesta se guarda en `localStorage` por 6 horas. Si GitHub no
  responde, el sitio muestra igual los proyectos con los datos curados: nunca
  queda una sección vacía ni un mensaje de error a la vista.
- **Selector de perfil.** Reordena skills, experiencia y proyectos según el
  puesto. El estado se puede compartir por URL: `?perfil=auditoria`,
  `?perfil=soporte` o `?perfil=fullstack` abren el portfolio ya orientado, útil
  para mandar un link a medida en una postulación.
- **Modo oscuro.** Respeta la preferencia del sistema y recuerda la elección.
  El tema se aplica antes del primer pintado para que no haya destello blanco.
- **Accesibilidad.** Navegación por teclado con foco visible, `aria-current` en
  el menú, enlace para saltar al contenido y soporte de
  `prefers-reduced-motion`.

## Publicar el sitio

### GitHub Pages (ya configurado)

El repositorio incluye `.github/workflows/deploy.yml`: cada push a `main`
compila el sitio y lo publica solo. **Falta habilitarlo una única vez:**

1. Ir a **Settings → Pages** en el repositorio.
2. En *Build and deployment*, elegir **Source: GitHub Actions**.
3. Hacer merge a `main` (o correr el workflow a mano desde la pestaña
   *Actions → Deploy a GitHub Pages → Run workflow*).

El sitio queda en **https://maiacostavera.github.io/MiPortfolio-Mailen/**.

El workflow corre el linter antes de compilar, así que un error de código frena
el deploy en vez de publicar algo roto.

### Otros hostings

El sitio es estático, así que sirve cualquier hosting. Como en Vercel, Netlify o
un dominio propio el sitio vive en la raíz y no en un subdirectorio, hay que
compilar sin prefijo:

```bash
cd frontend && VITE_BASE=/ npm run build   # genera frontend/dist
```

- **Vercel / Netlify**: directorio raíz `frontend`, comando
  `VITE_BASE=/ npm run build`, carpeta de salida `dist`.

> El prefijo por defecto es `/MiPortfolio-Mailen/` porque es el que necesita
> GitHub Pages. Si alguna vez cambia el nombre del repositorio, hay que
> actualizarlo en `frontend/vite.config.js`.

## API opcional (backend)

No hace falta para que el sitio funcione. Sirve los mismos proyectos que el
frontend, leyendo el mismo archivo JSON:

```bash
cd backend && npm install && npm start
```

| Endpoint | Respuesta |
|---|---|
| `GET /api/health` | Estado del servicio |
| `GET /api/projects` | Todos los proyectos |
| `GET /api/projects/:rol` | Proyectos de un perfil (`auditoria`, `soporte`, `fullstack`) |

## Stack

React 19 · Vite · Framer Motion · CSS moderno (sin frameworks de UI) · Express
