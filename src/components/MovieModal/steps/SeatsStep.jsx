// src/components/MovieModal/steps/SeatsStep.jsx
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
const COLS = Array.from({ length: 17 }, (_, i) => i + 1);

export default function SeatsStep({ tickets = {}, onNext, onBack }) {
  const totalToSelect = useMemo(
    () => Object.values(tickets).reduce((sum, v) => sum + (v || 0), 0),
    [tickets]
  );
  const [selected, setSelected] = React.useState([]);

  const toggleSeat = (seat) => {
    setSelected((s) => {
      if (s.includes(seat)) return s.filter((x) => x !== seat);
      if (s.length >= totalToSelect) return s; // no más
      return [...s, seat];
    });
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Asientos</h2>
      <p>Selecciona tus sillas sin dejar espacios intermedios o próximos al pasillo.</p>
      <p>Puedes seleccionar: {totalToSelect} asiento(s).</p>
      <div
        style={{ display: 'grid', gridTemplateColumns: `repeat(18, auto)`, gap: 4, marginTop: 12 }}
      >
        <div /> {/* placeholder top-left */}
        {COLS.map((c) => (
          <div key={`col-${c}`} style={{ fontSize: 12, fontWeight: '600' }}>
            {c}
          </div>
        ))}
        {ROWS.map((r) => (
          <React.Fragment key={r}>
            <div style={{ fontWeight: '600' }}>{r}</div>
            {COLS.map((c) => {
              const seat = `${r}${c}`;
              const isSelected = selected.includes(seat);
              return (
                <div
                  key={seat}
                  onClick={() => toggleSeat(seat)}
                  style={{
                    width: 28,
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #ccc',
                    borderRadius: 4,
                    cursor: 'pointer',
                    background: isSelected ? '#4b5563' : '#1f2937',
                    color: '#fff',
                    fontSize: 10,
                  }}
                >
                  {c}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      <div style={{ marginTop: 12 }}>
        <div>Seleccionaste: {selected.length} asiento(s)</div>
        <div>Asientos: {selected.join(', ') || '—'}</div>
      </div>
      <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
        <button className="btn btn-outline-secondary" onClick={onBack}>
          Volver
        </button>
        <button
          className="btn btn-danger"
          onClick={() => onNext({ seats: selected })}
          disabled={selected.length !== totalToSelect || totalToSelect === 0}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}

SeatsStep.propTypes = {
  tickets: PropTypes.object.isRequired,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};
