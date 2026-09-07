import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../data/profile';
import { useMagnetic } from '../hooks/useMagnetic';
import AnimatedNumber from './AnimatedNumber';
import { IconArrow, IconDownload } from './Icons';
import RevealText from './RevealText';
import RoleSwitcher from './RoleSwitcher';

function BotonMagnetico({ href, className, children, ...resto }) {
  const ref = useMagnetic(0.28);
  return (
    <a ref={ref} href={href} className={className} {...resto}>
      {children}
    </a>
  );
}

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

        {/* key por perfil: el titulo se vuelve a revelar al cambiar de puesto */}
        <RevealText
          key={role.id}
          as="h1"
          className="hero__title"
          texto={role.titulo}
          delay={0.15}
        />

        <motion.p className="hero__lead" key={`lead-${role.id}`} {...animar(0.35)}>
          {role.bajada}
        </motion.p>

        <motion.div className="actions" {...animar(0.42)}>
          <BotonMagnetico href="#proyectos" className="btn btn--primary">
            Ver proyectos <IconArrow />
          </BotonMagnetico>
          <BotonMagnetico href={profile.cv} className="btn" download>
            Descargar CV <IconDownload />
          </BotonMagnetico>
        </motion.div>

        <motion.div {...animar(0.48)}>
          <RoleSwitcher roleId={roleId} onChange={onRoleChange} />
        </motion.div>

        <motion.div className="hero__stats" {...animar(0.54)}>
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="stat__value">
                <AnimatedNumber value={stat.value} />
              </div>
              <div className="stat__label">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </header>
  );
}
