// src/components/MovieModal/steps/ConfirmationStep.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

export default function ConfirmationStep({ purchase, movie, onFinish }) {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (saved) return;
    const existing = JSON.parse(localStorage.getItem('walletPurchases') || '[]');
    const newEntry = {
      id: `${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      timestamp: Date.now(),
      movie: {
        title: movie.title,
        showtime: movie.showtime || movie.schedule,
      },
      tickets: purchase.tickets,
      promo: purchase.promo,
      seats: purchase.seats,
      total: purchase.total,
      cardDigits: purchase.cardDigits,
    };
    existing.push(newEntry);
    localStorage.setItem('walletPurchases', JSON.stringify(existing));
    setSaved(true);
  }, [movie, purchase, saved]);

  const handleWallet = () => {
    navigate('/wallet');
  };

  const downloadReceipt = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Compra exitosa - ${movie.title}`, 10, 20);
    doc.setFontSize(12);
    doc.text(`Total pagado: S/${purchase.total.toFixed(2)}`, 10, 30);
    doc.text(`Asientos: ${purchase.seats.join(', ')}`, 10, 40);
    const promoLines = Object.entries(purchase.promo || {})
      .map(([k, v]) => `${k} x${v}`)
      .join(', ');
    doc.text(`Promos: ${promoLines || '—'}`, 10, 50);
    doc.save(`detalle_${movie.title.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Compra exitosa</h2>
      <p>
        Tu entrada para <strong>{movie.title}</strong> fue confirmada.
      </p>
      <p>Total pagado: S/{purchase.total.toFixed(2)}</p>
      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <button className="btn btn-outline-secondary" onClick={onFinish}>
          Cerrar
        </button>
        <button className="btn btn-success" onClick={handleWallet}>
          Ir a mi billetera
        </button>
        <button className="btn btn-info" onClick={downloadReceipt}>
          Descargar detalle (PDF)
        </button>
      </div>
    </div>
  );
}

ConfirmationStep.propTypes = {
  purchase: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired,
  onFinish: PropTypes.func.isRequired,
};
