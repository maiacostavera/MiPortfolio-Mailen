import { IconExternal, IconGithub, IconStar } from './Icons';

// Colores oficiales de GitHub por lenguaje: dan textura visual sin inventar capturas.
const COLOR_LENGUAJE = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Kotlin: '#a97bff',
  Java: '#b07219',
  GDScript: '#355570',
  PHP: '#4f5d95',
  Python: '#3572a5',
  Vue: '#41b883',
};

function tiempoRelativo(iso) {
  if (!iso) return null;
  const dias = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (Number.isNaN(dias)) return null;
  if (dias <= 0) return 'actualizado hoy';
  if (dias === 1) return 'actualizado ayer';
  if (dias < 30) return `actualizado hace ${dias} días`;
  const meses = Math.floor(dias / 30);
  if (meses < 12) return `actualizado hace ${meses} ${meses === 1 ? 'mes' : 'meses'}`;
  const anios = Math.floor(meses / 12);
  return `actualizado hace ${anios} ${anios === 1 ? 'año' : 'años'}`;
}

export default function ProjectCard({ proyecto, indice, github, atenuado }) {
  const urlRepo = github?.url ?? `https://github.com/maiacostavera/${proyecto.repo}`;
  const demo = proyecto.demo ?? github?.homepage ?? null;
  const lenguaje = github?.lenguaje;
  const actualizado = tiempoRelativo(github?.actualizado);

  return (
    <article className={`project${atenuado ? ' project--dim' : ''}`}>
      <div className="project__index" aria-hidden>
        {String(indice).padStart(2, '0')}
      </div>

      <div>
        <div className="project__head">
          <h3 className="project__title">{proyecto.titulo}</h3>
          <span className="project__type">{proyecto.tipo}</span>
        </div>

        <p className="project__summary">{proyecto.resumen}</p>
        <p className="project__detail">{proyecto.detalle}</p>

        <ul className="project__highlights">
          {proyecto.highlights.map((punto) => (
            <li key={punto}>{punto}</li>
          ))}
        </ul>

        <div className="project__stack">
          {proyecto.stack.map((tecnologia) => (
            <span key={tecnologia} className="tag">
              {tecnologia}
            </span>
          ))}
        </div>

        <div className="project__meta">
          {lenguaje && (
            <span>
              <span
                className="lang-dot"
                style={{ background: COLOR_LENGUAJE[lenguaje] ?? 'currentColor' }}
                aria-hidden
              />
              {lenguaje}
            </span>
          )}
          {github?.estrellas > 0 && (
            <span>
              <IconStar style={{ width: 11, height: 11 }} />
              {github.estrellas}
            </span>
          )}
          {actualizado && <span>{actualizado}</span>}
        </div>

        <div className="project__links">
          <a className="link" href={urlRepo} target="_blank" rel="noopener noreferrer">
            <IconGithub />
            Ver código
          </a>
          {demo && (
            <a className="link" href={demo} target="_blank" rel="noopener noreferrer">
              <IconExternal />
              Ver demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
