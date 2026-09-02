import { useState } from 'react';
import { profile } from '../data/profile';
import { useActiveSection } from '../hooks/useActiveSection';
import { IconClose, IconMenu, IconMoon, IconSun } from './Icons';

const ENLACES = [
  { id: 'sobre-mi', texto: 'Sobre mí' },
  { id: 'proyectos', texto: 'Proyectos' },
  { id: 'skills', texto: 'Skills' },
  { id: 'experiencia', texto: 'Experiencia' },
  { id: 'formacion', texto: 'Formación' },
  { id: 'contacto', texto: 'Contacto' },
];

const IDS = ENLACES.map((enlace) => enlace.id);

export default function Navbar({ theme, onToggleTheme }) {
  const [abierto, setAbierto] = useState(false);
  const activa = useActiveSection(IDS);

  return (
    <nav className="navbar" aria-label="Navegación principal">
      <div className="navbar__inner">
        <a href="#inicio" className="navbar__logo" onClick={() => setAbierto(false)}>
          {profile.iniciales}
        </a>

        <div
          className={`navbar__links${abierto ? ' navbar__links--open' : ''}`}
          id="navbar-links"
        >
          {ENLACES.map((enlace) => (
            <a
              key={enlace.id}
              href={`#${enlace.id}`}
              aria-current={activa === enlace.id ? 'true' : undefined}
              onClick={() => setAbierto(false)}
            >
              {enlace.texto}
            </a>
          ))}
        </div>

        <div className="navbar__actions">
          <button
            type="button"
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            {theme === 'dark' ? <IconSun /> : <IconMoon />}
          </button>

          <button
            type="button"
            className="icon-btn navbar__toggle"
            onClick={() => setAbierto((valor) => !valor)}
            aria-expanded={abierto}
            aria-controls="navbar-links"
            aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          >
            {abierto ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
}
