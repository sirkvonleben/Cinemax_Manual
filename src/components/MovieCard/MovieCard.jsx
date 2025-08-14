// src/components/MovieCard/MovieCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from './MovieCard.module.css';

export default function MovieCard({ title, image, onClick }) {
  return (
    <div
      className={styles.card}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.body}>
        <h5 className={styles.title}>{title}</h5>
        <div className={styles.buttonWrapper}>
          <button className="btn btn-danger">Comprar Entradas</button>
        </div>
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
