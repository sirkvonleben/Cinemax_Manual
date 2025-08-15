// src/components/MovieCard/MovieCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from './MovieCard.module.css';

export default function MovieCard({ title, image, onClick }) {
  // Detectamos si es una URL absoluta (http o https)
  const isUrl = image.startsWith('http://') || image.startsWith('https://');
  const imageSrc = isUrl ? image : `/assets/${image}`; // si no es URL, se asume imagen local

  return (
    <div
      className={styles.card}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className={styles.image}>
        <img
          src={imageSrc}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
      </div>

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
