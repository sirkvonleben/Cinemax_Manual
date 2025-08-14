import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function LoginRegisterPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    acceptTerms: false,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError('Usuario y contraseña son requeridos.');
      return;
    }
    login({ username: form.username });
    navigate('/');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName) {
      setError('Nombre y apellido son requeridos.');
      return;
    }
    if (!isValidEmail(form.email)) {
      setError('Correo inválido.');
      return;
    }
    const ageNum = parseInt(form.age, 10);
    if (isNaN(ageNum) || ageNum < 18) {
      setError('Debes ser mayor de 18 años.');
      return;
    }
    if (!form.acceptTerms) {
      setError('Debes aceptar los términos y condiciones.');
      return;
    }
    login({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      age: ageNum,
    });
    navigate('/');
  };

  return (
    <div style={{ maxWidth: 900, margin: '60px auto', padding: 24, display: 'flex', gap: 40 }}>
      <div style={{ flex: 1, background: '#1f2630', borderRadius: 12, color: '#fff', padding: 32 }}>
        <h2 style={{ marginTop: 0 }}>Create an account</h2>
        <p>Vive la experiencia única del cine</p>
      </div>
      <div style={{ flex: 1, background: '#f5f5f5', borderRadius: 12, padding: 32 }}>
        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          <button
            onClick={() => {
              setMode('login');
              setError('');
            }}
            style={{
              flex: 1,
              padding: '10px 16px',
              background: mode === 'login' ? '#e53946' : '#ddd',
              color: mode === 'login' ? '#fff' : '#333',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            Entrar
          </button>
          <button
            onClick={() => {
              setMode('register');
              setError('');
            }}
            style={{
              flex: 1,
              padding: '10px 16px',
              background: mode === 'register' ? '#e53946' : '#ddd',
              color: mode === 'register' ? '#fff' : '#333',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            Registrarse
          </button>
        </div>

        {error && <div style={{ marginBottom: 12, color: 'red' }}>{error}</div>}

        {mode === 'login' ? (
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 12 }}>
              <label>Usuario</label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                style={{ width: '100%', padding: 8, marginTop: 4 }}
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Contraseña</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                style={{ width: '100%', padding: 8, marginTop: 4 }}
              />
            </div>
            <button
              type="submit"
              style={{
                background: '#6c757d',
                color: '#fff',
                border: 'none',
                padding: '12px 20px',
                borderRadius: 6,
                cursor: 'pointer',
              }}
            >
              Entrar
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <div style={{ flex: 1 }}>
                <label>Nombre</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  style={{ width: '100%', padding: 8, marginTop: 4 }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label>Apellido</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  style={{ width: '100%', padding: 8, marginTop: 4 }}
                />
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Correo</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                style={{ width: '100%', padding: 8, marginTop: 4 }}
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Edad</label>
              <input
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                style={{ width: '100%', padding: 8, marginTop: 4 }}
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  name="acceptTerms"
                  type="checkbox"
                  checked={form.acceptTerms}
                  onChange={handleChange}
                />
                Acepto términos y condiciones
              </label>
            </div>
            <button
              type="submit"
              style={{
                background: '#e53946',
                color: '#fff',
                border: 'none',
                padding: '12px 20px',
                borderRadius: 6,
                cursor: 'pointer',
              }}
            >
              Crear cuenta
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
