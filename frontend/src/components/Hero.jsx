import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="inicio" className="editorial-section">
      <aside>
        <p className="section-indicator">§00 — INICIO</p>
      </aside>
      <motion.div 
        className="section-content"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <h1 className="hero-title">
          Desarrolladora de Software & Auditoría de Sistemas.
        </h1>
        <p className="hero-subtitle">
          Construyo soluciones robustas y aseguro la fiabilidad técnica de plataformas críticas. Especializada en QA automatizado, auditoría de procesos y normativas (BCRA).
        </p>
        <br />
        <a 
          href="https://github.com/maiacostavera" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="submit-btn" 
          style={{ textDecoration: 'none', display: 'inline-block' }}
        >
          Explorar GitHub
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
