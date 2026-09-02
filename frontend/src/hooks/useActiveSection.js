import { useEffect, useState } from 'react';

/** Marca en la navegacion la seccion visible en pantalla. */
export function useActiveSection(ids) {
  const [activa, setActiva] = useState(ids[0]);

  useEffect(() => {
    const secciones = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (secciones.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibles = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visibles[0]) setActiva(visibles[0].target.id);
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0 },
    );

    secciones.forEach((seccion) => observer.observe(seccion));
    return () => observer.disconnect();
  }, [ids]);

  return activa;
}
