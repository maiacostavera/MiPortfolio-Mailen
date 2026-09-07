import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/** Numero que cuenta desde cero la primera vez que entra en pantalla. */
export default function AnimatedNumber({ value, duracion = 1100 }) {
  const ref = useRef(null);
  const enPantalla = useInView(ref, { once: true, margin: '-60px' });
  const reducirMovimiento = useReducedMotion();
  const [mostrado, setMostrado] = useState(0);

  const destino = Number(value);
  const esNumero = Number.isFinite(destino);

  useEffect(() => {
    if (!esNumero || !enPantalla || reducirMovimiento) return undefined;

    let cuadro;
    const inicio = performance.now();

    const paso = (ahora) => {
      const t = Math.min((ahora - inicio) / duracion, 1);
      // easeOutExpo: arranca rapido y frena suave al llegar al numero.
      const suavizado = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setMostrado(Math.round(destino * suavizado));
      if (t < 1) cuadro = requestAnimationFrame(paso);
    };
    cuadro = requestAnimationFrame(paso);

    return () => cancelAnimationFrame(cuadro);
  }, [destino, duracion, enPantalla, esNumero, reducirMovimiento]);

  if (!esNumero) return <span ref={ref}>{value}</span>;

  return <span ref={ref}>{reducirMovimiento || !enPantalla ? destino : mostrado}</span>;
}
