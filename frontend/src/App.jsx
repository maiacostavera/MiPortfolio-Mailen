import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Methodology from './components/Methodology';
import Education from './components/Education';
import Footer from './components/Footer';
import './App.css'; // O index.css, dependiendo de cómo esté configurado tu main.jsx. Asumimos que usa el global.

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <AboutMe />
      <Skills />
      <Experience />
      <Methodology />
      <Education />
      <Footer />
    </div>
  );
}

export default App;
