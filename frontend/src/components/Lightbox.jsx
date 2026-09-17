import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { IconClose } from './Icons';

/** Capa que muestra una captura en grande. Se cierra con Escape o clic afuera. */
export default function Lightbox({ vista, alt, onCerrar }) {
  const cerrarRef = useRef(null);
  const reducirMovimiento = useReducedMotion();

  useEffect(() => {
    const alPresionar = (e) => {
      if (e.key === 'Escape') onCerrar();
    };
    document.addEventListener('keydown', alPresionar);

    // Evita que la página de atrás siga scrolleando mientras está abierto.
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    cerrarRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', alPresionar);
      document.body.style.overflow = overflowPrevio;
    };
  }, [onCerrar]);

  return (
    <motion.div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onCerrar}
      initial={reducirMovimiento ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <button
        ref={cerrarRef}
        type="button"
        className="lightbox__cerrar"
        onClick={onCerrar}
        aria-label="Cerrar"
      >
        <IconClose />
      </button>

      <motion.img
        src={`${import.meta.env.BASE_URL}proyectos/${vista}`}
        alt={alt}
        className="lightbox__imagen"
        onClick={(e) => e.stopPropagation()}
        initial={reducirMovimiento ? false : { scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}
