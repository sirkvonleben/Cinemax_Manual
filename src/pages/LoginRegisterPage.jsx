// src/pages/LoginRegisterPage.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginRegisterPage() {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' o 'register'
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    age: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((errs) => ({ ...errs, [name]: undefined }));
  };

  const validate = () => {
    const err = {};
    if (!emailRegex.test(form.email)) {
      err.email = 'Correo inválido';
    }
    if (!form.password || form.password.length < 6) {
      err.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    if (mode === 'register') {
      if (!form.firstName.trim()) err.firstName = 'Requerido';
      if (!form.lastName.trim()) err.lastName = 'Requerido';
      const ageNum = parseInt(form.age, 10);
      if (Number.isNaN(ageNum) || ageNum < 18) {
        err.age = 'Debes ser mayor de 18 años';
      }
      if (!form.acceptTerms) {
        err.acceptTerms = 'Debes aceptar los términos y condiciones';
      }
    }
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    // Aquí simulas login/register. En real se llamaría a un API.
    const userData =
      mode === 'login'
        ? { email: form.email }
        : {
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email,
            age: parseInt(form.age, 10),
          };

    login(userData);
    navigate('/');
  };

  return (
    <div
      style={{
        maxWidth: 500,
        margin: '60px auto',
        padding: 24,
        background: '#1f2630',
        borderRadius: 8,
        color: '#fff',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2>{mode === 'login' ? 'Entrar' : 'Crear cuenta'}</h2>
        <div>
          {mode === 'login' ? (
            <button
              type="button"
              style={{
                background: 'transparent',
                border: '1px solid #fff',
                color: '#fff',
                padding: '6px 12px',
                cursor: 'pointer',
              }}
              onClick={() => {
                setMode('register');
                setErrors({});
              }}
            >
              Registrarse
            </button>
          ) : (
            <button
              type="button"
              style={{
                background: 'transparent',
                border: '1px solid #fff',
                color: '#fff',
                padding: '6px 12px',
                cursor: 'pointer',
              }}
              onClick={() => {
                setMode('login');
                setErrors({});
              }}
            >
              Entrar
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {mode === 'register' && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: 4 }}>
                Nombre
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Nombre"
                  style={{
                    width: '100%',
                    padding: 8,
                    borderRadius: 4,
                    border: '1px solid #444',
                    background: '#0f1724',
                    color: '#fff',
                  }}
                />
              </label>
              {errors.firstName && (
                <div style={{ color: '#ff6b6b', fontSize: 12 }}>{errors.firstName}</div>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: 4 }}>
                Apellido
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Apellido"
                  style={{
                    width: '100%',
                    padding: 8,
                    borderRadius: 4,
                    border: '1px solid #444',
                    background: '#0f1724',
                    color: '#fff',
                  }}
                />
              </label>
              {errors.lastName && (
                <div style={{ color: '#ff6b6b', fontSize: 12 }}>{errors.lastName}</div>
              )}
            </div>
          </div>
        )}

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>
            Correo
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              style={{
                width: '100%',
                padding: 8,
                borderRadius: 4,
                border: '1px solid #444',
                background: '#0f1724',
                color: '#fff',
              }}
            />
          </label>
          {errors.email && <div style={{ color: '#ff6b6b', fontSize: 12 }}>{errors.email}</div>}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>
            Contraseña
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Contraseña"
              style={{
                width: '100%',
                padding: 8,
                borderRadius: 4,
                border: '1px solid #444',
                background: '#0f1724',
                color: '#fff',
              }}
            />
          </label>
          {errors.password && (
            <div style={{ color: '#ff6b6b', fontSize: 12 }}>{errors.password}</div>
          )}
        </div>

        {mode === 'register' && (
          <>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', marginBottom: 4 }}>
                Edad
                <input
                  name="age"
                  type="number"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="18"
                  style={{
                    width: '100%',
                    padding: 8,
                    borderRadius: 4,
                    border: '1px solid #444',
                    background: '#0f1724',
                    color: '#fff',
                  }}
                />
              </label>
              {errors.age && <div style={{ color: '#ff6b6b', fontSize: 12 }}>{errors.age}</div>}
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={form.acceptTerms}
                  onChange={handleChange}
                  style={{ marginRight: 6 }}
                />
                Acepto los términos y condiciones
              </label>
              {errors.acceptTerms && (
                <div style={{ color: '#ff6b6b', fontSize: 12 }}>{errors.acceptTerms}</div>
              )}
            </div>
          </>
        )}

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            type="submit"
            style={{
              flex: 1,
              background: '#e53946',
              border: 'none',
              padding: '12px 20px',
              borderRadius: 6,
              cursor: 'pointer',
              color: '#fff',
              fontWeight: 600,
            }}
          >
            {mode === 'login' ? 'Entrar' : 'Crear cuenta'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{
              flex: 1,
              background: 'transparent',
              border: '1px solid #fff',
              padding: '12px 20px',
              borderRadius: 6,
              cursor: 'pointer',
              color: '#fff',
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
