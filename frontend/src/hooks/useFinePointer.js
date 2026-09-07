import { useEffect, useState } from 'react';

/**
 * True solo cuando conviene activar efectos de puntero: mouse real (no tactil)
 * y sin la preferencia de "reducir movimiento" del sistema.
 *
 * Todos los adornos de cursor dependen de esto, asi que en celular y para quien
 * tenga animaciones desactivadas el sitio se comporta de forma normal.
 */
export function useFinePointer() {
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    const puntero = window.matchMedia('(hover: hover) and (pointer: fine)');
    const movimiento = window.matchMedia('(prefers-reduced-motion: reduce)');

    const evaluar = () => setActivo(puntero.matches && !movimiento.matches);
    evaluar();

    puntero.addEventListener('change', evaluar);
    movimiento.addEventListener('change', evaluar);
    return () => {
      puntero.removeEventListener('change', evaluar);
      movimiento.removeEventListener('change', evaluar);
    };
  }, []);

  return activo;
}
