import React from 'react';

const Skills = () => {
  const categories = [
    {
      title: 'Desarrollo & Backend',
      items: ['React, TypeScript, Next.js', 'Node.js, Python', 'PostgreSQL', 'REST APIs']
    },
    {
      title: 'QA & Testing Avanzado',
      items: ['Cypress / Playwright', 'Postman (Testing de APIs)', 'TDD (Test-Driven Development)', 'Jest', 'Pruebas de Integración y Regresión']
    },
    {
      title: 'Auditoría & Cumplimiento',
      items: ['Marcos normativos BCRA', 'Análisis de Riesgos Tecnológicos', 'Control de Accesos y Logs', 'Aseguramiento de Calidad de Procesos']
    },
    {
      title: 'DevOps, Infraestructura & Automatización',
      items: ['Git & GitHub', 'Docker', 'Make (Automatizaciones de flujos)', 'Redes VPN y Seguridad perimetral', 'Linux']
    }
  ];

  return (
    <section id="habilidades" className="editorial-section">
      <aside>
        <p className="section-indicator">§02 — SKILLS</p>
      </aside>
      <div className="section-content">
        <h2>Conocimientos Técnicos</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '1rem' }}>
          {categories.map((cat, idx) => (
            <div key={idx}>
              <h3 style={{ 
                fontSize: '1rem', 
                marginBottom: '1rem', 
                fontFamily: 'var(--font-mono)', 
                textTransform: 'lowercase',
                color: 'var(--accent-color)',
                borderBottom: '1px solid #eaeaea',
                paddingBottom: '0.5rem'
              }}>
                {cat.title}
              </h3>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {cat.items.map((item, i) => (
                  <li key={i} style={{ fontSize: '1rem', color: 'var(--text-color)' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
