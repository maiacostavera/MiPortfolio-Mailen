// Fuente unica de verdad del contenido del portfolio.
// Editar aca es suficiente: los componentes leen todo desde este archivo.

export const profile = {
  nombre: 'Mailen Acosta Vera',
  iniciales: 'M.A.V',
  ubicacion: 'Buenos Aires, Argentina',
  email: 'mai.acostavera@gmail.com',
  github: 'https://github.com/maiacostavera',
  githubUser: 'maiacostavera',
  linkedin: 'https://www.linkedin.com/in/mailen-acosta-vera-4606a3266/',
  // BASE_URL contempla que el sitio pueda vivir en un subdirectorio,
  // como pasa en GitHub Pages (/MiPortfolio-Mailen/).
  cv: `${import.meta.env.BASE_URL}cv-mailen-acosta-vera.pdf`,
  disponibilidad: 'Abierta a nuevas oportunidades',
};

// Perfiles: el visitante elige uno y el portfolio se reordena para ese puesto.
// El id se puede pasar por URL (?perfil=auditoria) para mandar un link a medida.
export const roles = [
  {
    id: 'todo',
    label: 'Perfil completo',
    titulo: 'Desarrolladora de software y auditora de sistemas.',
    bajada:
      'Construyo software que funciona y verifico que sea seguro, trazable y auditable. Trabajo en el cruce entre el desarrollo, el aseguramiento de calidad y el cumplimiento normativo.',
  },
  {
    id: 'auditoria',
    label: 'Auditoría IT',
    titulo: 'Auditoría de sistemas, riesgo tecnológico y QA.',
    bajada:
      'Audito sistemas de casas y agencias de cambio bajo normativa BCRA: control de accesos, revisión de logs, análisis de riesgos e informes técnicos para decisiones gerenciales. Escribo código, así que entiendo lo que audito por dentro.',
  },
  {
    id: 'soporte',
    label: 'Soporte / Mesa de ayuda',
    titulo: 'Soporte técnico, redes y resolución de incidentes.',
    bajada:
      'Resuelvo incidentes críticos y garantizo conectividad remota segura por VPN. Perfil técnico con formación en programación: diagnostico la causa raíz en lugar de aplicar parches temporales.',
  },
  {
    id: 'fullstack',
    label: 'Full Stack',
    titulo: 'Desarrollo full stack con obsesión por la calidad.',
    bajada:
      'React, Node y bases de datos relacionales de punta a punta. Mi experiencia en QA y auditoría hace que lo que construyo llegue a producción probado, con control de accesos y sin sorpresas.',
  },
];

export const sobreMi = [
  'Entiendo el desarrollo de software no solo como escribir código que funciona, sino como un ecosistema donde la seguridad, la trazabilidad y el cumplimiento normativo son innegociables.',
  'Mi experiencia en entornos financieros y de alta exigencia operativa me enseñó a anticipar fallos antes de que lleguen a producción, fusionando la ingeniería de software con estándares rigurosos de control y auditoría tecnológica.',
];

// Cada grupo declara para que perfiles es relevante.
export const skills = [
  {
    titulo: 'Auditoría y cumplimiento',
    roles: ['auditoria'],
    items: [
      'Marcos normativos BCRA',
      'Análisis de riesgos tecnológicos',
      'Control de accesos y revisión de logs',
      'Informes técnicos de control',
      'Aseguramiento de calidad de procesos',
    ],
  },
  {
    titulo: 'QA y testing',
    roles: ['auditoria', 'fullstack'],
    items: [
      'TDD (Test-Driven Development)',
      'Cypress / Playwright',
      'Postman (testing de APIs)',
      'Jest',
      'Pruebas de integración y regresión',
    ],
  },
  {
    titulo: 'Infraestructura y soporte',
    roles: ['soporte', 'auditoria'],
    items: [
      'Redes y VPN (conectividad remota segura)',
      'Resolución de incidentes y mesa de ayuda',
      'Administración de accesos y usuarios',
      'Linux',
      'Docker',
    ],
  },
  {
    titulo: 'Frontend',
    roles: ['fullstack'],
    items: [
      'React 19',
      'JavaScript (ES2023+) y TypeScript',
      'Angular',
      'HTML5 semántico y CSS3 responsive',
      'Kotlin (Android nativo)',
    ],
  },
  {
    titulo: 'Backend y datos',
    roles: ['fullstack'],
    items: [
      'Node.js + Express',
      'Sequelize (ORM) y migraciones',
      'MySQL / PostgreSQL',
      'APIs REST, JWT y bcrypt',
      'Python',
    ],
  },
  {
    titulo: 'Herramientas',
    roles: ['auditoria', 'soporte', 'fullstack'],
    items: [
      'Git y GitHub',
      'Make (automatización de flujos)',
      'Vite',
      'Godot (GDScript)',
    ],
  },
];

export const experiencia = [
  {
    puesto: 'Auditora de Sistemas y Soporte Técnico',
    empresa: 'Enivel7',
    periodo: '01-2026 — Presente',
    resumen:
      'Rol mixto entre auditoría tecnológica, soporte técnico y aseguramiento de calidad sobre plataformas internas y de clientes del sector cambiario.',
    logros: [
      {
        roles: ['auditoria'],
        texto:
          'Participación en el ciclo de auditoría de sistemas para casas y agencias de cambio, asegurando el cumplimiento de las normativas del BCRA y mitigando riesgos operativos.',
      },
      {
        roles: ['soporte'],
        texto:
          'Resolución de incidentes críticos de soporte y garantía de conectividad remota segura mediante VPN.',
      },
      {
        roles: ['auditoria', 'fullstack'],
        texto:
          'Ejecución integral de pruebas de aseguramiento de calidad (QA / testing) sobre plataformas internas.',
      },
      {
        roles: ['auditoria'],
        texto:
          'Redacción de informes técnicos de control para la toma de decisiones gerenciales.',
      },
    ],
  },
];

export const educacion = [
  {
    titulo: 'Tecnicatura en Programación de Sistemas',
    institucion: 'Universidad de Ciencias Empresariales y Sociales (UCES)',
    periodo: '03-2024 — Presente',
    detalle:
      'Formación en ciencias de la computación, estructuras de datos, programación web, aplicaciones móviles y bases de datos relacionales.',
  },
];

export const metodologia = [
  {
    titulo: 'Probar antes de construir',
    texto:
      'Desarrollo orientado a pruebas: si no está cubierto por un test, todavía no está terminado.',
  },
  {
    titulo: 'Seguridad desde el diseño',
    texto:
      'Control de accesos, contraseñas hasheadas y validación en el servidor no son un extra al final del proyecto.',
  },
  {
    titulo: 'Trazabilidad',
    texto:
      'Todo cambio deja registro: commits descriptivos, logs revisables e informes que otro puede auditar sin mí.',
  },
];
