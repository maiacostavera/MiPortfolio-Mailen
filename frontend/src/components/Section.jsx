import { motion, useReducedMotion } from 'framer-motion';
import RevealText from './RevealText';

/**
 * Envoltorio de seccion con la grilla editorial: indicador numerado a la
 * izquierda, contenido a la derecha, y aparicion al entrar en pantalla.
 */
export default function Section({ id, numero, etiqueta, titulo, children }) {
  const reducirMovimiento = useReducedMotion();

  return (
    <section id={id} className="section">
      <aside className="section__aside">
        <motion.p
          className="section__indicator"
          initial={reducirMovimiento ? false : { opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>
            §{numero} — {etiqueta}
          </span>
        </motion.p>
      </aside>

      <div>
        {titulo && <RevealText as="h2" className="section__title" texto={titulo} />}

        <motion.div
          initial={reducirMovimiento ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
