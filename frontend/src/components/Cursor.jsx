import { useEffect, useRef } from 'react';
import { useFinePointer } from '../hooks/useFinePointer';

// Elementos sobre los que la marca se agranda y gira.
const INTERACTIVOS = 'a, button, [role="button"], input, textarea, summary';

/**
 * Cursor con forma de marca de registro, la cruz fina que se usa en imprenta
 * para alinear las planchas de color. Sigue al mouse con una inercia leve y,
 * sobre un elemento interactivo, gira 45 grados y se abre.
 */
export default function Cursor() {
  const marcaRef = useRef(null);
  const activo = useFinePointer();

  useEffect(() => {
    if (!activo) return undefined;

    const marca = marcaRef.current;
    if (!marca) return undefined;

    document.documentElement.classList.add('cursor-propio');

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let mx = x;
    let my = y;
    let visible = false;
    let cuadro;

    const mover = (evento) => {
      x = evento.clientX;
      y = evento.clientY;
      if (!visible) {
        visible = true;
        mx = x;
        my = y;
        marca.style.opacity = '1';
      }
    };

    const ocultar = () => {
      visible = false;
      marca.style.opacity = '0';
    };

    const animar = () => {
      mx += (x - mx) * 0.22;
      my += (y - my) * 0.22;
      marca.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      cuadro = requestAnimationFrame(animar);
    };
    animar();

    const entrar = (evento) => {
      if (evento.target.closest?.(INTERACTIVOS)) marca.dataset.sobre = 'true';
    };
    const salir = (evento) => {
      if (evento.target.closest?.(INTERACTIVOS)) delete marca.dataset.sobre;
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
    <div ref={marcaRef} className="cursor" aria-hidden>
      <span className="cursor__brazo cursor__brazo--v" />
      <span className="cursor__brazo cursor__brazo--h" />
      <span className="cursor__anillo" />
    </div>
  );
}
