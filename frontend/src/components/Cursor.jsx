import { useEffect, useRef } from 'react';
import { useFinePointer } from '../hooks/useFinePointer';

// Elementos sobre los que el cursor se agranda.
const INTERACTIVOS = 'a, button, [role="button"], input, textarea, summary';

/**
 * Cursor de dos piezas: un punto que sigue al mouse al instante y un anillo que
 * llega con retraso. Sobre un elemento interactivo el anillo crece.
 */
export default function Cursor() {
  const puntoRef = useRef(null);
  const anilloRef = useRef(null);
  const activo = useFinePointer();

  useEffect(() => {
    if (!activo) return undefined;

    const punto = puntoRef.current;
    const anillo = anilloRef.current;
    if (!punto || !anillo) return undefined;

    document.documentElement.classList.add('cursor-propio');

    // Posicion real del mouse y posicion suavizada del anillo.
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ax = x;
    let ay = y;
    let visible = false;
    let cuadro;

    const mover = (evento) => {
      x = evento.clientX;
      y = evento.clientY;
      if (!visible) {
        visible = true;
        ax = x;
        ay = y;
        punto.style.opacity = anillo.style.opacity = '1';
      }
    };

    const ocultar = () => {
      visible = false;
      punto.style.opacity = anillo.style.opacity = '0';
    };

    const animar = () => {
      ax += (x - ax) * 0.16; // seguimiento con inercia
      ay += (y - ay) * 0.16;
      punto.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      anillo.style.transform = `translate3d(${ax}px, ${ay}px, 0)`;
      cuadro = requestAnimationFrame(animar);
    };
    animar();

    const entrar = (evento) => {
      if (evento.target.closest?.(INTERACTIVOS)) anillo.dataset.sobre = 'true';
    };
    const salir = (evento) => {
      if (evento.target.closest?.(INTERACTIVOS)) delete anillo.dataset.sobre;
    };

    window.addEventListener('mousemove', mover, { passive: true });
    document.addEventListener('mouseleave', ocultar);
    document.addEventListener('mouseover', entrar, true);
    document.addEventListener('mouseout', salir, true);

    return () => {
      cancelAnimationFrame(cuadro);
      document.documentElement.classList.remove('cursor-propio');
      window.removeEventListener('mousemove', mover);
      document.removeEventListener('mouseleave', ocultar);
      document.removeEventListener('mouseover', entrar, true);
      document.removeEventListener('mouseout', salir, true);
    };
  }, [activo]);

  if (!activo) return null;

  return (
    <>
      <div ref={anilloRef} className="cursor cursor--anillo" aria-hidden />
      <div ref={puntoRef} className="cursor cursor--punto" aria-hidden />
    </>
  );
}
