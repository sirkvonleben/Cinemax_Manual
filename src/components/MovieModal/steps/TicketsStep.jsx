// src/components/MovieModal/steps/TicketsStep.jsx
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const ticketOptions = {
  promoOnline: { price: 15.0, label: 'Promo Online' },
  adulto2d: { price: 30.0, label: 'Adulto 2D' },
  nino2d: { price: 20.0, label: 'Niño 2D' },
  discapacitado2d: { price: 20.0, label: 'P. con discapacidad 2D' },
  ruedas2d: { price: 20.0, label: 'Silla de ruedas 2D' },
};

export default function TicketsStep({ initialTickets = {}, onNext, onBack }) {
  const [tickets, setTickets] = React.useState({ ...initialTickets });

  const adjust = (key, delta) => {
    setTickets((t) => {
      const current = t[key] || 0;
      const updated = Math.max(0, current + delta);
      return { ...t, [key]: updated };
    });
  };

  const totalTickets = useMemo(
    () =>
      Object.entries(tickets).reduce((sum, [key, qty]) => {
        return sum + (ticketOptions[key]?.price || 0) * qty;
      }, 0),
    [tickets]
  );

  const totalCount = useMemo(
    () => Object.values(tickets).reduce((acc, v) => acc + (v || 0), 0),
    [tickets]
  );

  return (
    <div style={{ padding: 24 }}>
      <h2>Entradas</h2>
      <p>Selecciona tus entradas.</p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {Object.entries(ticketOptions).map(([key, { label, price }]) => (
          <div
            key={key}
            style={{
              background: '#1f2937',
              borderRadius: 8,
              padding: 16,
              minWidth: 140,
              color: '#fff',
              position: 'relative',
            }}
          >
            <div style={{ fontWeight: '600' }}>{label}</div>
            <div>S/{price.toFixed(2)}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button
                onClick={() => adjust(key, -1)}
                disabled={(tickets[key] || 0) <= 0}
                style={{ padding: '8px 12px', borderRadius: 4 }}
              >
                -
              </button>
              <div style={{ minWidth: 24, textAlign: 'center' }}>{tickets[key] || 0}</div>
              <button
                onClick={() => adjust(key, +1)}
                style={{ padding: '8px 12px', borderRadius: 4 }}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12 }}>
        <div>Subtotal boletos: S/{totalTickets.toFixed(2)}</div>
        {/* totalCount se omite aquí porque ya se muestra en el summary bar */}
      </div>

      <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
        <button className="btn btn-outline-secondary" onClick={onBack}>
          Volver
        </button>
        <button
          className="btn btn-danger"
          onClick={() => onNext({ tickets })}
          disabled={totalCount === 0}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}

TicketsStep.propTypes = {
  initialTickets: PropTypes.object,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};
