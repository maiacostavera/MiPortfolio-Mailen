import { experiencia } from '../data/profile';
import Section from './Section';

export default function Experience({ roleId, coincide }) {
  return (
    <Section
      id="experiencia"
      numero="04"
      etiqueta="Experiencia"
      titulo="Trayectoria profesional"
    >
      {experiencia.map((puesto) => {
        // Con un perfil elegido, los logros relevantes suben y se destacan.
        const logros =
          roleId === 'todo'
            ? puesto.logros
            : [...puesto.logros].sort(
                (a, b) => Number(coincide(b.roles)) - Number(coincide(a.roles)),
              );

        return (
          <article key={`${puesto.empresa}-${puesto.puesto}`} className="entry">
            <div className="entry__head">
              <h3 className="entry__role">{puesto.puesto}</h3>
              <span className="entry__period">{puesto.periodo}</span>
            </div>
            <p className="entry__org">{puesto.empresa}</p>
            <p>{puesto.resumen}</p>

            <ul className="entry__list">
              {logros.map((logro) => (
                <li
                  key={logro.texto.slice(0, 40)}
                  data-match={roleId === 'todo' ? undefined : String(coincide(logro.roles))}
                >
                  {logro.texto}
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </Section>
  );
}
