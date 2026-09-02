import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      padding: '6rem 5%',
      marginTop: '4rem',
      borderTop: '1px solid rgba(0,0,0,0.1)',
      backgroundColor: 'var(--bg-color)'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '2.5rem', 
          fontFamily: 'var(--font-serif)', 
          color: 'var(--text-color)',
          marginBottom: '1.5rem',
          lineHeight: '1.2'
        }}>
          ¿Diseñamos soluciones seguras y eficientes juntos?
        </h2>
        <p style={{ 
          fontSize: '1.1rem', 
          color: 'var(--text-color)', 
          marginBottom: '3rem',
          opacity: '0.8'
        }}>
          Estoy siempre abierta a discutir nuevas oportunidades, proyectos desafiantes y formas de aportar valor técnico a tu equipo.
        </p>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '2rem',
          flexWrap: 'wrap'
        }}>
          <a href="mailto:mai.acostavera@gmail.com" style={linkStyle}>Email</a>
          <a href="https://github.com/maiacostavera" target="_blank" rel="noopener noreferrer" style={linkStyle}>GitHub</a>
          <a href="https://www.linkedin.com/in/mailen-acosta-vera-4606a3266/" target="_blank" rel="noopener noreferrer" style={linkStyle}>LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

const linkStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: '1rem',
  color: 'var(--accent-color)',
  textDecoration: 'none',
  borderBottom: '1px solid var(--accent-color)',
  paddingBottom: '0.2rem',
  transition: 'opacity 0.2s ease'
};

export default Footer;
