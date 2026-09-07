import { motion, useReducedMotion } from 'framer-motion';

/**
 * Revela un texto palabra por palabra: cada una sube desde abajo detras de una
 * mascara, como una cortina. Se usa para los titulos grandes.
 */
export default function RevealText({ texto, className, delay = 0, as = 'h2' }) {
  const reducirMovimiento = useReducedMotion();

  if (reducirMovimiento) {
    const Simple = as;
    return <Simple className={className}>{texto}</Simple>;
  }

  const Etiqueta = motion[as] ?? motion.h2;
  const palabras = texto.split(' ');

  return (
    <Etiqueta
      className={className}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, margin: '-70px' }}
      transition={{ staggerChildren: 0.055, delayChildren: delay }}
      aria-label={texto}
    >
      {palabras.map((palabra, i) => (
        <span key={`${palabra}-${i}`} className="reveal-word" aria-hidden>
          <motion.span
            className="reveal-word__inner"
            variants={{ oculto: { y: '110%' }, visible: { y: '0%' } }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            {palabra}
          </motion.span>
        </span>
      ))}
    </Etiqueta>
  );
}
