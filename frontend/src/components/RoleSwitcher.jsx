import { useState } from 'react';
import { roles } from '../data/profile';

/**
 * Selector de perfil. Reordena y resalta el contenido segun el puesto,
 * y permite copiar un link directo a esa vista para enviar en una postulacion.
 */
export default function RoleSwitcher({ roleId, onChange }) {
  const [copiado, setCopiado] = useState(false);

  const copiarLink = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set('perfil', roleId);
    try {
      await navigator.clipboard.writeText(url.toString());
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2200);
    } catch {
      // el navegador puede bloquear el portapapeles sin gesto directo
    }
  };

  return (
    <div className="roleswitch">
      <p className="roleswitch__label" id="roleswitch-label">
        Ver mi perfil orientado a
      </p>

      <div className="roleswitch__options" role="group" aria-labelledby="roleswitch-label">
        {roles.map((rol) => (
          <button
            key={rol.id}
            type="button"
            className="pill"
            aria-pressed={roleId === rol.id}
            onClick={() => onChange(rol.id)}
          >
            {rol.label}
          </button>
        ))}
      </div>

      <p className="roleswitch__hint">
        {roleId === 'todo'
          ? 'Elegí un puesto y reordeno skills, experiencia y proyectos según lo que importa para ese rol.'
          : 'Contenido reordenado para este puesto. '}
        {roleId !== 'todo' && (
          <button type="button" className="roleswitch__copy" onClick={copiarLink}>
            {copiado ? '¡Link copiado!' : 'Copiar link de esta vista'}
          </button>
        )}
      </p>
    </div>
  );
}
