import { useEffect, useRef } from 'react';
import { useFinePointer } from './useFinePointer';

/**
 * Devuelve una ref para un elemento que se "imanta" hacia el cursor cuando el
 * mouse pasa cerca. Se desactiva en tactil y con movimiento reducido.
 *
 * @param {number} fuerza Cuanto se desplaza respecto de la distancia al centro.
 */
export function useMagnetic(fuerza = 0.32) {
  const ref = useRef(null);
  const activo = useFinePointer();

  useEffect(() => {
    const el = ref.current;
    if (!el || !activo) return undefined;

    let cuadro = 0;

    const mover = (evento) => {
      const caja = el.getBoundingClientRect();
      const dx = evento.clientX - (caja.left + caja.width / 2);
      const dy = evento.clientY - (caja.top + caja.height / 2);

      cancelAnimationFrame(cuadro);
      cuadro = requestAnimationFrame(() => {
        el.style.transform = `translate(${dx * fuerza}px, ${dy * fuerza}px)`;
      });
    };

    const soltar = () => {
      cancelAnimationFrame(cuadro);
      el.style.transform = '';
    };

    el.addEventListener('mousemove', mover);
    el.addEventListener('mouseleave', soltar);
    return () => {
      cancelAnimationFrame(cuadro);
      el.removeEventListener('mousemove', mover);
      el.removeEventListener('mouseleave', soltar);
      soltar();
    };
  }, [activo, fuerza]);

  return ref;
}
