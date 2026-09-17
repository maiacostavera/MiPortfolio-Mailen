/**
 * Muestra una captura del proyecto dentro de una ventana de navegador dibujada
 * con CSS. La imagen se carga en diferido: solo pesa cuando entra en pantalla.
 */
export default function BrowserFrame({ vista, alt, url, onAmpliar }) {
  const etiqueta = url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : null;

  return (
    <figure className="marco">
      <div className="marco__barra" aria-hidden>
        <span className="marco__puntos">
          <i />
          <i />
          <i />
        </span>
        {etiqueta && <span className="marco__url">{etiqueta}</span>}
      </div>

      <button
        type="button"
        className="marco__lienzo"
        onClick={onAmpliar}
        aria-label={`Ampliar captura: ${alt}`}
      >
        <img
          src={`${import.meta.env.BASE_URL}proyectos/${vista}`}
          alt={alt}
          width="1280"
          height="800"
          loading="lazy"
          decoding="async"
        />
      </button>
    </figure>
  );
}
