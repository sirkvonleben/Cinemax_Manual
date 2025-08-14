// src/components/MovieModal/CastModal.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from './CastModal.module.css';

export default function CastModal({ cast, onBack }) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.headerRow}>
          <h1 className={styles.heading}>Reparto</h1>
          <button className={styles.closeBtn} onClick={onBack}>
            Regresar
          </button>
        </div>

        {cast.length === 0 ? (
          <p className={styles.empty}>No hay información de reparto disponible.</p>
        ) : (
          <div className={styles.grid}>
            {cast.map((c) => (
              <div className={styles.card} key={c.id || c.name}>
                <div className={styles.avatarWrapper}>
                  <img src={c.photo} alt={c.name} className={styles.avatar} />
                </div>
                <div className={styles.info}>
                  <div className={styles.name}>
                    <a href={c.profileUrl || '#'}>{c.name}</a>
                  </div>
                  <div className={styles.character}>{c.character || ''}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

CastModal.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string.isRequired,
      character: PropTypes.string,
      photo: PropTypes.string,
      profileUrl: PropTypes.string,
    })
  ),
  onBack: PropTypes.func.isRequired,
};
