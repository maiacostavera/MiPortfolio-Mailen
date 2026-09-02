import { motion, useReducedMotion } from 'framer-motion';

/**
 * Envoltorio de seccion con la grilla editorial: indicador numerado a la
 * izquierda, contenido a la derecha, y aparicion suave al entrar en pantalla.
 */
export default function Section({ id, numero, etiqueta, titulo, children }) {
  const reducirMovimiento = useReducedMotion();

  return (
    <section id={id} className="section">
      <aside className="section__aside">
        <p className="section__indicator">
          <span>
            §{numero} — {etiqueta}
          </span>
        </p>
      </aside>

      <motion.div
        initial={reducirMovimiento ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {titulo && <h2 className="section__title">{titulo}</h2>}
        {children}
      </motion.div>
    </section>
  );
}
