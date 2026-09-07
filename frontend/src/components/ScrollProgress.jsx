import { motion, useScroll, useSpring } from 'framer-motion';

/** Barra fina arriba de todo que indica cuanto se leyo de la pagina. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const avance = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  return <motion.div className="scroll-progress" style={{ scaleX: avance }} aria-hidden />;
}
