import { useMemo, useState } from 'react';
import proyectos from '../data/projects.json';
import { profile } from '../data/profile';
import { IconArrow, IconGithub } from './Icons';
import ProjectCard from './ProjectCard';
import Section from './Section';

const VISIBLES_INICIALES = 3;

// Si GitHub no responde, no mostramos nada: el visitante ve los proyectos igual
// y un mensaje de error solo restaria confianza.
const MENSAJE_ESTADO = {
  cargando: 'Sincronizando con GitHub…',
  vivo: 'Datos en vivo desde la API pública de GitHub',
  cache: 'Datos de GitHub · caché local',
};

export default function Projects({ repos, estado, roleId, coincide }) {
  const [verTodos, setVerTodos] = useState(false);

  // Con un perfil elegido, los proyectos relevantes suben al principio.
  const ordenados = useMemo(() => {
    const conMeta = proyectos.map((proyecto, indice) => ({
      proyecto,
      orden: indice,
      relevante: coincide(proyecto.roles),
    }));

    if (roleId === 'todo') return conMeta;

    return [...conMeta].sort((a, b) => {
      if (a.relevante !== b.relevante) return a.relevante ? -1 : 1;
      return a.orden - b.orden;
    });
  }, [roleId, coincide]);

  const mostrados = verTodos ? ordenados : ordenados.slice(0, VISIBLES_INICIALES);

  return (
    <Section id="proyectos" numero="02" etiqueta="Proyectos" titulo="Lo que construí">
      <p className="section__lead">
        Proyectos propios y académicos, del sitio estático al full stack con base de datos.
        Cada uno enlaza al repositorio público: el código está para leerlo.
      </p>

      {MENSAJE_ESTADO[estado] && (
        <p className="projects__status">{MENSAJE_ESTADO[estado]}</p>
      )}

      <div className="projects__list">
        {mostrados.map(({ proyecto, relevante }, indice) => (
          <ProjectCard
            key={proyecto.id}
            proyecto={proyecto}
            indice={indice + 1}
            github={repos[proyecto.repo.toLowerCase()]}
            atenuado={roleId !== 'todo' && !relevante}
          />
        ))}
      </div>

      <div className="projects__more hero__actions">
        {!verTodos && ordenados.length > VISIBLES_INICIALES && (
          <button type="button" className="btn" onClick={() => setVerTodos(true)}>
            Ver los {ordenados.length} proyectos <IconArrow />
          </button>
        )}
        <a className="btn" href={profile.github} target="_blank" rel="noopener noreferrer">
          <IconGithub />
          Ir a mi GitHub
        </a>
      </div>
    </Section>
  );
}
