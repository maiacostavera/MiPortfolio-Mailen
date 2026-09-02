import { metodologia, sobreMi } from '../data/profile';
import Section from './Section';

export default function About() {
  return (
    <Section id="sobre-mi" numero="01" etiqueta="Sobre mí" titulo="Mi enfoque">
      {sobreMi.map((parrafo) => (
        <p key={parrafo.slice(0, 40)} className="section__lead">
          {parrafo}
        </p>
      ))}

      <div className="method" style={{ marginTop: '2.5rem' }}>
        {metodologia.map((item) => (
          <div key={item.titulo} className="method__item">
            <h3 className="method__title">{item.titulo}</h3>
            <p className="method__text">{item.texto}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
