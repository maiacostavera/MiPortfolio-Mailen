import { useCallback, useEffect, useState } from 'react';
import { roles } from '../data/profile';

const STORAGE_KEY = 'portfolio-perfil';
const IDS = roles.map((rol) => rol.id);

function leerRolInicial() {
  if (typeof window === 'undefined') return 'todo';

  // Un link como ?perfil=auditoria abre el portfolio ya orientado a ese puesto.
  const desdeUrl = new URLSearchParams(window.location.search).get('perfil');
  if (desdeUrl && IDS.includes(desdeUrl)) return desdeUrl;

  try {
    const guardado = window.localStorage.getItem(STORAGE_KEY);
    if (guardado && IDS.includes(guardado)) return guardado;
  } catch {
    // sin localStorage: arrancamos con el perfil completo
  }
  return 'todo';
}

export function useRole() {
  const [roleId, setRoleId] = useState(leerRolInicial);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, roleId);
    } catch {
      // ignorar
    }
  }, [roleId]);

  const role = roles.find((rol) => rol.id === roleId) ?? roles[0];

  /** True si el item aplica al perfil elegido (con 'todo' aplica siempre). */
  const coincide = useCallback(
    (rolesDelItem) => roleId === 'todo' || (rolesDelItem ?? []).includes(roleId),
    [roleId],
  );

  return { role, roleId, setRoleId, coincide };
}
