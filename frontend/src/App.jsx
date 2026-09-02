import { useMemo } from 'react';
import About from './components/About';
import Contact from './components/Contact';
import Education from './components/Education';
import Experience from './components/Experience';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Skills from './components/Skills';
import proyectos from './data/projects.json';
import { profile } from './data/profile';
import { useGithubRepos } from './hooks/useGithubRepos';
import { useRole } from './hooks/useRole';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { role, roleId, setRoleId, coincide } = useRole();
  const { repos, estado } = useGithubRepos(profile.githubUser);

  const stats = useMemo(() => {
    const listados = Object.values(repos);
    const tecnologias = new Set(proyectos.flatMap((proyecto) => proyecto.stack));

    return [
      { label: 'Proyectos publicados', value: proyectos.length },
      { label: 'Tecnologías usadas', value: tecnologias.size },
      // Solo si GitHub respondio: preferimos omitir el dato antes que mostrar un hueco.
      ...(listados.length ? [{ label: 'Repos públicos', value: listados.length }] : []),
    ];
  }, [repos]);

  return (
    <>
      <a className="skip-link" href="#proyectos">
        Saltar al contenido
      </a>

      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main className="page">
        <Hero role={role} roleId={roleId} onRoleChange={setRoleId} stats={stats} />
        <About />
        <Projects repos={repos} estado={estado} roleId={roleId} coincide={coincide} />
        <Skills roleId={roleId} coincide={coincide} />
        <Experience roleId={roleId} coincide={coincide} />
        <Education />
      </main>

      <Contact />
    </>
  );
}
