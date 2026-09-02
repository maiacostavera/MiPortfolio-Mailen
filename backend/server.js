/**
 * API opcional del portfolio.
 *
 * El sitio de frontend es totalmente estatico y NO necesita este servidor para
 * funcionar: se puede publicar en Vercel, Netlify o GitHub Pages tal cual.
 * Esta API queda disponible por si mas adelante se quiere servir el contenido
 * de forma dinamica o agregar un formulario de contacto con envio real.
 *
 * Los proyectos se leen del mismo archivo que consume el frontend, para que no
 * existan dos listas que se puedan desincronizar.
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const proyectos = require('../frontend/src/data/projects.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true, proyectos: proyectos.length });
});

app.get('/api/projects', (req, res) => {
  res.json(proyectos);
});

// Permite pedir solo los proyectos relevantes para un perfil concreto,
// igual que hace el selector del sitio: /api/projects/fullstack
app.get('/api/projects/:rol', (req, res) => {
  const { rol } = req.params;
  res.json(proyectos.filter((proyecto) => proyecto.roles.includes(rol)));
});

app.listen(PORT, () => {
  console.log(`API del portfolio escuchando en http://localhost:${PORT}`);
});
