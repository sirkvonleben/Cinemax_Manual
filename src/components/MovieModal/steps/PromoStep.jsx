// src/components/MovieModal/steps/PromoStep.jsx
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const promoOptions = {
  duo: { price: 85.9, label: 'Combo Duo' },
  vaso: { price: 85.9, label: 'Combo Vaso' },
  trio: { price: 85.9, label: 'Combo Trio' },
};

export default function PromoStep({ initialPromo = {}, onNext, onBack }) {
  const [promo, setPromo] = React.useState({ ...initialPromo });

  const adjust = (key, delta) => {
    setPromo((p) => {
      const current = p[key] || 0;
      const updated = Math.max(0, current + delta);
      return { ...p, [key]: updated };
    });
  };

  const subtotal = useMemo(
    () =>
      Object.entries(promo).reduce((sum, [key, qty]) => {
        return sum + (promoOptions[key]?.price || 0) * qty;
      }, 0),
    [promo]
  );

  return (
    <div style={{ padding: 24 }}>
      <h2>Promociones</h2>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {Object.entries(promoOptions).map(([key, { label, price }]) => (
          <div
            key={key}
            style={{
              background: '#1f2937',
              borderRadius: 8,
              padding: 16,
              minWidth: 140,
              color: '#fff',
            }}
          >
            <div style={{ fontWeight: '600' }}>{label}</div>
            <div>S/{price.toFixed(2)}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button
                onClick={() => adjust(key, -1)}
                disabled={(promo[key] || 0) <= 0}
                style={{ padding: '8px 12px', borderRadius: 4 }}
              >
                -
              </button>
              <div style={{ minWidth: 24, textAlign: 'center' }}>{promo[key] || 0}</div>
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
      <div style={{ marginTop: 12 }}>Subtotal promociones: S/{subtotal.toFixed(2)}</div>
      <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
        <button className="btn btn-outline-secondary" onClick={onBack}>
          Volver
        </button>
        <button className="btn btn-danger" onClick={() => onNext({ promo })}>
          Continuar
        </button>
      </div>
    </div>
  );
}

PromoStep.propTypes = {
  initialPromo: PropTypes.object,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};
