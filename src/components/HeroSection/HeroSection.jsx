import React from 'react';
import styles from './HeroSection.module.css'; // crea este CSS module

export default function HeroSection() {
  return (
    <section className={styles.hero} style={{ backgroundImage: `url('/assets/hero-bg.jpg')` }}>
      <div className={styles.content}>
        <h1 className={styles.title}>Bienvenido a CineMax</h1>
        <p className={styles.subtitle}>Vive la experiencia única del cine</p>
        <a href="#en-cartelera" className={`btn btn-danger ${styles.button}`}>
          Ver en Cartelera
        </a>
      </div>
    </section>
  );
}
