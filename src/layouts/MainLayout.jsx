// src/layouts/MainLayout.jsx
import React, { useContext } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from './MainLayout.module.css';

export default function MainLayout() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <Link to="/">CineMax</Link>
        </div>
        <nav className={styles.nav}>
          <Link to="/cartelera">En Cartelera</Link>
          <Link to="/proximos-estrenos">Próximos Estrenos</Link>
          <Link to="/promociones">Promociones</Link>
          <Link to="/contacto">Contacto</Link>
          {user ? (
            <button onClick={handleLogout}>Salir</button>
          ) : (
            <button onClick={handleLogin}>Entrar</button>
          )}
        </nav>
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
