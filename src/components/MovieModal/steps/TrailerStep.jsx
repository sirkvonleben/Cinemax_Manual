// src/components/MovieModal/steps/TrailerStep.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from './TrailerStep.module.css';

/**
 * Normaliza distintos formatos de trailer de YouTube a la URL de embed.
 * Acepta:
 *  - ID puro ("dQw4w9WgXcQ")
 *  - https://www.youtube.com/watch?v=...
 *  - https://youtu.be/...
 *  - https://www.youtube.com/embed/...
 */
function getEmbedUrl(trailerUrl) {
  if (!trailerUrl) return '';
  // Si ya es embed o URL válida, intentar transformarla
  try {
    // Si es solo un ID (no contiene http), lo tratamos como ID
    if (!trailerUrl.startsWith('http')) {
      return `https://www.youtube.com/embed/${trailerUrl}`;
    }

    const url = new URL(trailerUrl);

    // youtube.com watch?v=ID
    if (url.hostname.includes('youtube.com')) {
      const v = url.searchParams.get('v');
      if (v) return `https://www.youtube.com/embed/${v}`;
      if (url.pathname.startsWith('/embed/')) return trailerUrl;
    }

    // youtu.be/ID
    if (url.hostname === 'youtu.be') {
      const id = url.pathname.replace(/^\/+/, '');
      return `https://www.youtube.com/embed/${id}`;
    }
  } catch (e) {
    // caída segura: tratarlo como ID si no es URL válida
    return `https://www.youtube.com/embed/${trailerUrl}`;
  }

  // Fallback: si empieza con http lo devolvemos tal cual
  return trailerUrl;
}

export default function TrailerStep({ trailerUrl, onNext }) {
  const embedUrl = getEmbedUrl(trailerUrl);

  return (
    <div className={styles.container}>
      {embedUrl ? (
        <div className={styles.videoWrapper}>
          <iframe title="Trailer" src={embedUrl} allowFullScreen loading="lazy" frameBorder="0" />
        </div>
      ) : (
        <div className={styles.placeholder}>No hay trailer disponible</div>
      )}

      {onNext && (
        <div className={styles.actions}>
          <button className="btn btn-danger" onClick={onNext}>
            {/** Texto genérico, puedes parametrizar si quieres */}
            Continuar
          </button>
        </div>
      )}
    </div>
  );
}

TrailerStep.propTypes = {
  trailerUrl: PropTypes.string,
  onNext: PropTypes.func,
};
