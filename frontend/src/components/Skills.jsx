import { useMemo } from 'react';
import { skills } from '../data/profile';
import Section from './Section';

export default function Skills({ roleId, coincide }) {
  // Los grupos relevantes para el perfil elegido se muestran primero.
  const ordenados = useMemo(() => {
    const conMeta = skills.map((grupo, indice) => ({
      grupo,
      orden: indice,
      relevante: coincide(grupo.roles),
    }));

    if (roleId === 'todo') return conMeta;

    return [...conMeta].sort((a, b) => {
      if (a.relevante !== b.relevante) return a.relevante ? -1 : 1;
      return a.orden - b.orden;
    });
  }, [roleId, coincide]);

  return (
    <Section id="skills" numero="03" etiqueta="Skills" titulo="Conocimientos técnicos">
      <p className="section__lead">
        Herramientas con las que trabajo hoy, entre el desarrollo, el control de calidad
        y la infraestructura.
      </p>

      <div className="skills">
        {ordenados.map(({ grupo, relevante }) => (
          <div
            key={grupo.titulo}
            className={`skillgroup${roleId !== 'todo' && !relevante ? ' skillgroup--dim' : ''}`}
          >
            <h3 className="skillgroup__title">
              {grupo.titulo}
              {/* El badge solo tiene sentido en grupos que no aplican a todos los perfiles. */}
              {roleId !== 'todo' && relevante && grupo.roles.length < 3 && (
                <span className="skillgroup__badge">clave</span>
              )}
            </h3>
            <ul>
              {grupo.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
