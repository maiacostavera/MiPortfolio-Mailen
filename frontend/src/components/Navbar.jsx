import React from 'react';

const Navbar = () => {
  return (
    <nav className="editorial-navbar">
      <a href="#inicio" className="nav-logo">
        M.A.V
      </a>
      <div className="nav-links">
        <a href="#sobre-mi">Sobre Mí</a>
        <a href="#habilidades">Skills</a>
        <a href="#experiencia">Experiencia</a>
        <a href="#metodologia">Metodología</a>
        <a href="#formacion">Formación</a>
      </div>
    </nav>
  );
};

export default Navbar;
