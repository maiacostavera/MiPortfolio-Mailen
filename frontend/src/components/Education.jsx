import { educacion } from '../data/profile';
import Section from './Section';

export default function Education() {
  return (
    <Section id="formacion" numero="05" etiqueta="Formación" titulo="Formación académica">
      {educacion.map((estudio) => (
        <article key={estudio.titulo} className="entry">
          <div className="entry__head">
            <h3 className="entry__role">{estudio.titulo}</h3>
            <span className="entry__period">{estudio.periodo}</span>
          </div>
          <p className="entry__org">{estudio.institucion}</p>
          <p>{estudio.detalle}</p>
        </article>
      ))}
    </Section>
  );
}
