// src/components/MovieModal/steps/AuthStep.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function AuthStep({ onLogin, onRegister, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin({ email }); // adaptarlo a tu backend real
  };

  const handleRegister = () => {
    onRegister({ email }); // adaptarlo a tu backend real
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Iniciar sesión</h2>
      <div style={{ marginBottom: 12 }}>
        <input
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 8 }}
        />
        <input
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn btn-outline-secondary" onClick={onBack}>
          Volver
        </button>
        <button className="btn btn-primary" onClick={handleLogin}>
          Entrar
        </button>
        <button className="btn btn-secondary" onClick={handleRegister}>
          Crear cuenta
        </button>
      </div>
    </div>
  );
}

AuthStep.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};
