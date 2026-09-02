import { useEffect, useState } from 'react';

const CACHE_KEY = 'portfolio-github-cache';
const CACHE_TTL = 1000 * 60 * 60 * 6; // 6 horas

/**
 * Trae los repositorios publicos del usuario desde la API de GitHub.
 *
 * La API publica permite 60 pedidos por hora y por IP, asi que el resultado se
 * guarda en localStorage. Si falla o se agota el limite, el componente que lo
 * usa sigue mostrando los datos curados y este hook simplemente no aporta
 * metadatos en vivo.
 *
 * @returns {{ repos: Record<string, object>, estado: 'cargando'|'vivo'|'cache'|'sin-conexion' }}
 */
export function useGithubRepos(usuario) {
  const [repos, setRepos] = useState({});
  const [estado, setEstado] = useState('cargando');

  useEffect(() => {
    if (!usuario) return undefined;

    let cancelado = false;
    const controller = new AbortController();

    // 1. Mostrar de inmediato lo que haya en cache.
    let hayCache = false;
    try {
      const crudo = window.localStorage.getItem(CACHE_KEY);
      if (crudo) {
        const { timestamp, data } = JSON.parse(crudo);
        if (data && typeof data === 'object') {
          setRepos(data);
          hayCache = true;
          if (Date.now() - timestamp < CACHE_TTL) {
            setEstado('cache');
            return undefined; // cache fresca: no gastamos un pedido a la API
          }
        }
      }
    } catch {
      // cache corrupta o inaccesible: la ignoramos y pedimos de nuevo
    }

    // 2. Refrescar contra la API.
    fetch(`https://api.github.com/users/${usuario}/repos?per_page=100&sort=updated`, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub respondio ${res.status}`);
        return res.json();
      })
      .then((lista) => {
        if (cancelado || !Array.isArray(lista)) return;

        const porNombre = {};
        for (const repo of lista) {
          porNombre[repo.name.toLowerCase()] = {
            nombre: repo.name,
            url: repo.html_url,
            descripcion: repo.description,
            lenguaje: repo.language,
            estrellas: repo.stargazers_count,
            forks: repo.forks_count,
            actualizado: repo.pushed_at,
            homepage: repo.homepage || null,
            topics: repo.topics || [],
          };
        }

        setRepos(porNombre);
        setEstado('vivo');
        try {
          window.localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ timestamp: Date.now(), data: porNombre }),
          );
        } catch {
          // sin cache: solo perdemos la optimizacion, no la funcionalidad
        }
      })
      .catch((error) => {
        if (cancelado || error.name === 'AbortError') return;
        setEstado(hayCache ? 'cache' : 'sin-conexion');
      });

    return () => {
      cancelado = true;
      controller.abort();
    };
  }, [usuario]);

  return { repos, estado };
}
