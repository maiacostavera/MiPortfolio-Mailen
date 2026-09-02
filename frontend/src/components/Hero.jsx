import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../data/profile';
import { IconArrow, IconDownload } from './Icons';
import RoleSwitcher from './RoleSwitcher';

export default function Hero({ role, roleId, onRoleChange, stats }) {
  const reducirMovimiento = useReducedMotion();
  const animar = (delay) =>
    reducirMovimiento
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <header id="inicio" className="section hero">
      <aside className="section__aside">
        <p className="section__indicator">
          <span>§00 — Inicio</span>
        </p>
      </aside>

      <div>
        <motion.div className="hero__eyebrow" {...animar(0)}>
          <span className="hero__status">
            <span className="hero__dot" aria-hidden />
            {profile.disponibilidad}
          </span>
          <span className="hero__sep" aria-hidden>
            ·
          </span>
          <span>{profile.ubicacion}</span>
        </motion.div>

        <motion.p className="hero__name" {...animar(0.08)}>
          {profile.nombre}
        </motion.p>

        <motion.h1
          className="hero__title"
          key={role.id}
          {...animar(0.14)}
        >
          {role.titulo}
        </motion.h1>

        <motion.p className="hero__lead" key={`lead-${role.id}`} {...animar(0.2)}>
          {role.bajada}
        </motion.p>

        <motion.div className="hero__actions" {...animar(0.26)}>
          <a className="btn btn--primary" href="#proyectos">
            Ver proyectos <IconArrow />
          </a>
          <a className="btn" href={profile.cv} download>
            Descargar CV <IconDownload />
          </a>
        </motion.div>

        <motion.div {...animar(0.32)}>
          <RoleSwitcher roleId={roleId} onChange={onRoleChange} />
        </motion.div>

        <motion.div className="hero__stats" {...animar(0.38)}>
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="stat__value">{stat.value}</div>
              <div className="stat__label">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </header>
  );
}
