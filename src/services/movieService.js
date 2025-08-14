// src/services/movieService.js

// Define la URL base de la API usando variables de entorno de Create React App
const BASE_URL = process.env.REACT_APP_API_URL || 'https://api.cinemax.com';

/**
 * Obtiene la lista de películas desde la API
 */
export async function fetchMovies() {
  const resp = await fetch(`${BASE_URL}/movies`);
  if (!resp.ok) {
    throw new Error(`Error fetching movies: ${resp.status}`);
  }
  return resp.json();
}

/**
 * Obtiene los detalles de una película por su ID
 */
export async function fetchMovieById(id) {
  const resp = await fetch(`${BASE_URL}/movies/${id}`);
  if (!resp.ok) {
    throw new Error(`Error fetching movie ${id}: ${resp.status}`);
  }
  return resp.json();
}
