import React, { useState, useContext, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MovieModal from '../../components/MovieModal/MovieModal';
import MovieCard from '../../components/MovieCard/MovieCard';
import HeroSection from '../../components/HeroSection/HeroSection';
import { AuthContext } from '../../context/AuthContext';
import * as movieData from '../../data/movies'; // puede que no exporte "movies", lo manejamos abajo
import styles from './Home.module.css';
import { Footer } from '../../components/Footer/Footer';

const fallbackNowShowing = [
  {
    id: 'now-1',
    title: 'Película activa 1',
    image: 'https://via.placeholder.com/300x170?text=En+Cartelera',
    trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '1h 40min',
    format: 'Doblada',
    cinema: 'Cinemark Gamarra',
    schedule: 'Sábado 5 Abril 2026 | 08:00PM',
    genre: 'Acción',
    synopsis: 'Una épica aventura de prueba.',
  },
  {
    id: 'now-2',
    title: 'Película activa 2',
    image: 'https://via.placeholder.com/300x170?text=En+Cartelera',
    trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '1h 40min',
    format: 'Doblada',
    cinema: 'Cinemark Gamarra',
    schedule: 'Sábado 5 Abril 2026 | 08:00PM',
    genre: 'Acción',
    synopsis: 'Una épica aventura de prueba.',
  },
  {
    id: 'now-3',
    title: 'Película activa 3',
    image: 'https://via.placeholder.com/300x170?text=En+Cartelera',
    trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '1h 40min',
    format: 'Doblada',
    cinema: 'Cinemark Gamarra',
    schedule: 'Sábado 5 Abril 2026 | 08:00PM',
    genre: 'Acción',
    synopsis: 'Una épica aventura de prueba.',
  },
];

const fallbackUpcoming = [
  {
    id: 'u1',
    title: 'Aventura Espacial',
    image: 'https://via.placeholder.com/300x170?text=Aventura+Espacial',
    trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    genre: 'Ciencia ficción',
    synopsis: 'Una odisea en las estrellas que desafía la imaginación.',
    duration: '2h 10min',
    format: 'IMAX',
    cinema: 'CineMax Solar',
    schedule: 'Domingo 10 Mayo 2026 | 09:00PM',
  },
  {
    id: 'u2',
    title: 'Misterio en la Ciudad',
    image: 'https://via.placeholder.com/300x170?text=Misterio+en+la+Ciudad',
    trailer: 'https://www.youtube.com/embed/oHg5SJYRHA0',
    genre: 'Thriller',
    synopsis: 'Un detective sigue pistas que no deberían existir.',
    duration: '1h 50min',
    format: '2D',
    cinema: 'CineMax Centro',
    schedule: 'Viernes 21 Junio 2026 | 07:30PM',
  },
  {
    id: 'u3',
    title: 'Corazones en Guerra',
    image: 'https://via.placeholder.com/300x170?text=Corazones+en+Guerra',
    trailer: 'https://www.youtube.com/embed/5NV6Rdv1a3I',
    genre: 'Drama bélico',
    synopsis: 'Amor y sacrificio en medio del conflicto.',
    duration: '2h 5min',
    format: '4DX',
    cinema: 'CineMax Gamarra',
    schedule: 'Miércoles 2 Julio 2026 | 06:00PM',
  },
];

export default function Home() {
  const [sel, setSel] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // 👇 Solo una definición limpia
  const today = useMemo(() => new Date(), []);

  const movies = useMemo(() => {
    return Array.isArray(movieData.movies) ? movieData.movies : [];
  }, []);

  const nowShowingFromData = useMemo(() => {
    return movies.filter((m) => new Date(m.releaseDate) <= today);
  }, [movies, today]);

  const upcomingFromData = useMemo(() => {
    return movies.filter((m) => new Date(m.releaseDate) > today).slice(0, 3);
  }, [movies, today]);

  const nowShowing = nowShowingFromData.length ? nowShowingFromData : fallbackNowShowing;
  const upcoming = upcomingFromData.length ? upcomingFromData : fallbackUpcoming;

  const selectNow = (movie) => {
    setSel(movie);
    setPreviewMode(false);
  };

  const preview = (movie) => {
    setSel(movie);
    setPreviewMode(true);
  };

  return (
    <div className="top-left-panel">
      {user && (
        <Link to="/wallet" className="btn btn-outline-info">
          Mis compras
        </Link>
      )}

      <div className={styles.home}>
        <HeroSection />

        <section
          id="en-cartelera"
          className={`${styles.section} ${styles.sectionDark || ''} container`}
        >
          <h2 className={styles.sectionHeading}>En Cartelera</h2>
          <div className="row">
            {nowShowing.map((m) => (
              <div key={m.id} className="col-md-4 mb-4">
                <MovieCard
                  title={m.title}
                  image={m.image}
                  onClick={() => {
                    if (!user) {
                      navigate('/login');
                      return;
                    }
                    selectNow(m);
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        <section
          id="proximos-estrenos"
          className={`${styles.section} ${styles.sectionLight} container`}
        >
          <h2 className={styles.sectionHeading} style={{ textAlign: 'center', width: '100%' }}>
            Próximos Estrenos
          </h2>
          <div className="row">
            {upcoming.map((m) => (
              <div key={m.id} className="col-md-4 mb-4">
                <div
                  className="card"
                  style={{ background: '#1f2630', borderRadius: 8, color: '#fff' }}
                >
                  <img
                    src={m.image}
                    alt={m.title}
                    style={{
                      width: '100%',
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                  />
                  <div className="card-body" style={{ padding: '1rem' }}>
                    <h5 style={{ marginBottom: 8 }}>{m.title}</h5>
                    <p style={{ fontSize: 12, margin: '4px 0' }}>
                      {m.genre} | {m.duration}
                    </p>
                    <p style={{ fontSize: 12, margin: '4px 0' }}>{m.schedule}</p>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        preview(m);
                      }}
                    >
                      Ver adelanto
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {sel && (
          <MovieModal
            movie={sel}
            onClose={() => {
              setSel(null);
              setPreviewMode(false);
            }}
            preview={previewMode}
          />
        )}
        <Footer />
      </div>
    </div>
  );
}
