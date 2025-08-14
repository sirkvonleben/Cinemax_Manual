// src/pages/MovieDetails/MovieDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieById } from '../../services/movieService';
import styles from './MovieDetails.module.css';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieById(id).then((data) => setMovie(data));
  }, [id]);

  if (!movie) {
    return (
      <div className="container py-5">
        <p>Cargando detalles...</p>
      </div>
    );
  }

  return (
    <div className={`container py-5 ${styles.details}`}>
      <div className="row">
        <div className="col-md-4">
          <img src={movie.image} alt={movie.title} className={`img-fluid ${styles.poster}`} />
        </div>
        <div className="col-md-8">
          <h1 className={styles.title}>{movie.title}</h1>
          <p className={styles.genre}>
            <strong>Género:</strong> {movie.genre}
          </p>
          <p className={styles.release}>
            <strong>Fecha de estreno:</strong> {movie.releaseDate}
          </p>
          <p className={styles.rating}>
            <strong>Rating:</strong> {movie.rating}
          </p>
          <hr />
          <p className={styles.synopsis}>{movie.synopsis}</p>
          <button className="btn btn-danger mt-3">Comprar entrada</button>
        </div>
      </div>
    </div>
  );
}
