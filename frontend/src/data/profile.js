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
      'Escribo código y también lo audito. Trabajo en una empresa que controla sistemas de casas de cambio, así que mis días se reparten entre programar, probar y revisar que todo cumpla la normativa.',
  },
  {
    id: 'auditoria',
    label: 'Auditoría IT',
    titulo: 'Auditoría de sistemas y riesgo tecnológico.',
    bajada:
      'Audito sistemas de casas y agencias de cambio bajo normativa del BCRA. Reviso accesos, leo logs y escribo los informes que después se usan para decidir. Como además programo, entiendo lo que estoy mirando.',
  },
  {
    id: 'soporte',
    label: 'Soporte / Mesa de ayuda',
    titulo: 'Soporte técnico, redes y resolución de incidentes.',
    bajada:
      'Atiendo incidentes y me ocupo de que la conexión remota por VPN funcione y sea segura. Vengo de programación, y eso me ayuda a buscar por qué se rompió algo en vez de tapar el síntoma.',
  },
  {
    id: 'fullstack',
    label: 'Full Stack',
    titulo: 'Desarrollo full stack.',
    bajada:
      'React de un lado, Node y base de datos del otro. Como trabajo en QA y auditoría, lo que hago sale probado y con los permisos bien puestos desde el principio.',
  },
];

export const sobreMi = [
  'Estudio programación y trabajo auditando sistemas. Esa mezcla me cambió la forma de escribir código: antes miraba si andaba, ahora también miro quién puede entrar, qué queda registrado y qué pasa si falla.',
  'El software con el que trabajo es del sector cambiario. Ahí un error no queda en un bug, puede ser un problema regulatorio. Me acostumbré a revisar dos veces y a dejar anotado lo que toco.',
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
    ],
  },
];

export const experiencia = [
  {
    puesto: 'Auditora de Sistemas y Soporte Técnico',
    empresa: 'Enivel7',
    periodo: '01-2026 — Presente',
    resumen:
      'Trabajo en auditoría, soporte y QA sobre las plataformas internas y las de clientes del sector cambiario.',
    logros: [
      {
        roles: ['auditoria'],
        texto:
          'Participo en las auditorías de sistemas de casas y agencias de cambio, revisando que cumplan la normativa del BCRA.',
      },
      {
        roles: ['soporte'],
        texto:
          'Atiendo incidentes de soporte y mantengo andando la conectividad remota por VPN.',
      },
      {
        roles: ['auditoria', 'fullstack'],
        texto:
          'Pruebo las plataformas internas antes de que los cambios lleguen a producción.',
      },
      {
        roles: ['auditoria'],
        texto:
          'Escribo los informes técnicos que después usa la gerencia para decidir.',
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
      'Cursé estructuras de datos, programación web, aplicaciones móviles y bases de datos. De ahí salieron varios de los proyectos que están más arriba.',
  },
];

export const metodologia = [
  {
    titulo: 'Pruebo mientras escribo',
    texto:
      'Uso TDD cuando el proyecto lo permite. Me ahorra el rato de buscar a mano qué rompí.',
  },
  {
    titulo: 'Los permisos, primero',
    texto:
      'En FoodieByte separé el middleware de usuario del de administrador desde el arranque. Agregar eso después siempre sale peor.',
  },
  {
    titulo: 'Dejar registro',
    texto:
      'Commits que se entienden, logs que se pueden leer, informes que alguien puede seguir sin preguntarme nada.',
  },
];
