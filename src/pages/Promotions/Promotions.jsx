import React, { useState, useEffect, useCallback } from 'react';
import styles from './Promotions.module.css';
import PropTypes from 'prop-types';

const promotionsData = {
  dulces: [
    {
      id: 'dulce1',
      title: 'Chocolate + otras cosas dulces',
      price: 40.0,
    },
    {
      id: 'dulce2',
      title: 'Caja de cereal + leche',
      price: 22.0,
    },
  ],
  salados: [
    {
      id: 'salado1',
      title: '2 Bebidas + 2 cotufas',
      price: 23.5,
    },
    {
      id: 'salado2',
      title: 'Pack sorpresa (para 4 personas)',
      price: 35.0,
    },
  ],
};

function PromotionCard({ title, price }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>{title}</div>
      <div className={styles.cardPrice}>S/ {price.toFixed(2)}</div>
    </div>
  );
}
PromotionCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
const Promotion = ({ title, price }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>S/. {price.toFixed(2)}</p>
    </div>
  );
};

Promotion.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
export default function Promotions() {
  const [currentDulces, setCurrentDulces] = useState(0);
  const [currentSalados, setCurrentSalados] = useState(0);

  // rotación automática cada 4 segundos
  useEffect(() => {
    const intervalDulces = setInterval(() => {
      setCurrentDulces((prev) => (prev + 1) % promotionsData.dulces.length);
    }, 2500);
    const intervalSalados = setInterval(() => {
      setCurrentSalados((prev) => (prev + 1) % promotionsData.salados.length);
    }, 2500);
    return () => {
      clearInterval(intervalDulces);
      clearInterval(intervalSalados);
    };
  }, []);

  const prevDulce = useCallback(() => {
    setCurrentDulces((prev) => (prev === 0 ? promotionsData.dulces.length - 1 : prev - 1));
  }, []);
  const nextDulce = useCallback(() => {
    setCurrentDulces((prev) => (prev + 1) % promotionsData.dulces.length);
  }, []);
  const prevSalado = useCallback(() => {
    setCurrentSalados((prev) => (prev === 0 ? promotionsData.salados.length - 1 : prev - 1));
  }, []);
  const nextSalado = useCallback(() => {
    setCurrentSalados((prev) => (prev + 1) % promotionsData.salados.length);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Promociones solo en tienda</h1>

      <div className={styles.section}>
        <h2 className={styles.subheading}>Dulces</h2>
        <div className={styles.carousel}>
          <button aria-label="Anterior dulce" className={styles.navBtn} onClick={prevDulce}>
            ‹
          </button>
          <PromotionCard {...promotionsData.dulces[currentDulces]} />
          <button aria-label="Siguiente dulce" className={styles.navBtn} onClick={nextDulce}>
            ›
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.subheading}>Salados</h2>
        <div className={styles.carousel}>
          <button aria-label="Anterior salado" className={styles.navBtn} onClick={prevSalado}>
            ‹
          </button>
          <PromotionCard {...promotionsData.salados[currentSalados]} />
          <button aria-label="Siguiente salado" className={styles.navBtn} onClick={nextSalado}>
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
