// src/components/MovieModal/steps/PaymentStep.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function PaymentStep({ total, onNext, onBack }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState(''); // MM/YY
  const [cvc, setCvc] = useState('');
  const [error, setError] = useState('');

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return digits;
  };

  const handleExpiryChange = (e) => {
    setExpiry(formatExpiry(e.target.value));
  };

  const handleCardChange = (e) => {
    setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16));
  };

  const handleCvcChange = (e) => {
    setCvc(e.target.value.replace(/\D/g, '').slice(0, 3));
  };

  const handleSubmit = () => {
    if (!firstName || !lastName) {
      setError('Nombre y apellido son requeridos.');
      return;
    }
    if (cardNumber.length < 9) {
      setError('Número de tarjeta incompleto.');
      return;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      setError('Fecha de vencimiento inválida. Usa MM/YY.');
      return;
    }
    if (cvc.length !== 3) {
      setError('CVC debe tener 3 dígitos.');
      return;
    }

    setError('');
    const masked = `${cardNumber.slice(0, 3)}****${cardNumber.slice(-2)}`;
    onNext({
      cardDigits: masked,
      paymentInfo: {
        firstName,
        lastName,
        cardNumber,
        expiry,
        cvc,
      },
    });
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Información de pago</h2>
      <p>Escribe los datos para completar la compra. Total a pagar: S/{total.toFixed(2)}</p>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <input
          placeholder="Nombre"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{ flex: '1 1 200px', padding: 8 }}
        />
        <input
          placeholder="Apellido"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{ flex: '1 1 200px', padding: 8 }}
        />
      </div>
      <div style={{ marginTop: 12 }}>
        <input
          placeholder="Número de tarjeta (9-16 dígitos)"
          value={cardNumber}
          onChange={handleCardChange}
          style={{ width: '100%', padding: 8 }}
        />
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
        <input
          placeholder="MM/YY"
          value={expiry}
          onChange={handleExpiryChange}
          maxLength={5}
          style={{ flex: 1, padding: 8 }}
        />
        <input
          placeholder="CVC"
          value={cvc}
          onChange={handleCvcChange}
          maxLength={3}
          style={{ flex: 1, padding: 8 }}
        />
      </div>
      <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
        <button className="btn btn-outline-secondary" onClick={onBack}>
          Volver
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Pagar S/{total.toFixed(2)}
        </button>
      </div>
    </div>
  );
}

PaymentStep.propTypes = {
  total: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};
