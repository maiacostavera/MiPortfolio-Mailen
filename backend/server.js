require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Mock Data
const skills = [
  { id: 1, name: 'Desarrollo de Software', type: 'Programación' },
  { id: 2, name: 'QA / Testing (TDD)', type: 'Calidad' },
  { id: 3, name: 'Auditoría de Sistemas', type: 'Seguridad' },
  { id: 4, name: 'Gestión de Bases de Datos', type: 'Backend' },
  { id: 5, name: 'Soporte Técnico & VPN', type: 'Infraestructura' },
  { id: 6, name: 'Make (Automatizaciones)', type: 'Backend' }
];

const projects = [
  { 
    id: 1, 
    title: 'Enchanted Hall Eventos', 
    description: 'Plataforma para la gestión y organización de eventos. Sistema robusto con enfoque en la experiencia de usuario y escalabilidad.', 
    technologies: ['React', 'Node.js', 'Express'],
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop',
    repoUrl: 'https://github.com/maiacostavera/EnchantedHallEventos', 
    liveUrl: '#' 
  },
  { 
    id: 2, 
    title: 'FoodieByte', 
    description: 'Aplicación orientada al sector gastronómico. Diseñada para optimizar procesos y mejorar la interacción digital.', 
    technologies: ['Frontend', 'Backend', 'Bases de Datos'],
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop',
    repoUrl: 'https://github.com/maiacostavera/FoodieByte', 
    liveUrl: '#' 
  },
  { 
    id: 3, 
    title: 'En desarrollo...', 
    description: 'Actualmente me encuentro trabajando en nuevas soluciones de software que pronto estarán disponibles en mi repositorio.', 
    technologies: ['Próximamente'],
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop',
    repoUrl: 'https://github.com/maiacostavera', 
    liveUrl: '#' 
  }
];

// Rutas
app.get('/api/skills', (req, res) => {
  res.json(skills);
});

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  // Simular el procesamiento del mensaje
  console.log('\n--- Nuevo Mensaje de Contacto Recibido ---');
  console.log(`Nombre: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Mensaje: ${message}`);
  console.log('------------------------------------------\n');
  
  res.status(200).json({ success: true, message: 'Mensaje recibido con éxito.' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor de backend corriendo en http://localhost:${PORT}`);
});
