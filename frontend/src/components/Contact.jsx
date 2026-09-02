import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../data/profile';
import { IconDownload, IconGithub } from './Icons';

export default function Contact() {
  const reducirMovimiento = useReducedMotion();

  return (
    <footer id="contacto" className="contact">
      <motion.div
        className="contact__inner"
        initial={reducirMovimiento ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="section__indicator" style={{ position: 'static', marginBottom: '2rem' }}>
          <span>§06 — Contacto</span>
        </p>

        <h2 className="contact__title">¿Construimos algo seguro y bien hecho?</h2>
        <p className="contact__lead">
          Estoy abierta a posiciones de auditoría IT, soporte técnico y desarrollo.
          Escribime y te respondo.
        </p>

        <div className="hero__actions">
          <a className="btn btn--primary" href={`mailto:${profile.email}`}>
            Escribirme
          </a>
          <a className="btn" href={profile.cv} download>
            Descargar CV <IconDownload />
          </a>
          <a
            className="btn"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconGithub />
            GitHub
          </a>
        </div>

        <div className="contact__grid">
          <div className="contact__item">
            <span className="mono">Email</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
          <div className="contact__item">
            <span className="mono">LinkedIn</span>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              Mailen Acosta Vera
            </a>
          </div>
          <div className="contact__item">
            <span className="mono">GitHub</span>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              @{profile.githubUser}
            </a>
          </div>
          <div className="contact__item">
            <span className="mono">Ubicación</span>
            <span style={{ color: 'var(--text-muted)' }}>{profile.ubicacion}</span>
          </div>
        </div>
      </motion.div>

      <div className="contact__legal">
        <span>
          © {new Date().getFullYear()} {profile.nombre}
        </span>
        <span>Construido con React y Vite</span>
      </div>
    </footer>
  );
}
