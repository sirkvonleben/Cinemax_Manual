// src/pages/wallet/Wallet.jsx
import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';

function downloadReceipt(purchase) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Detalle de compra', 20, 20);
  doc.setFontSize(12);
  doc.text(`Película: ${purchase.movie.title}`, 20, 35);
  doc.text(`Fecha / horario: ${purchase.movie.showtime}`, 20, 42);
  doc.text(`Asientos: ${purchase.seats.join(', ')}`, 20, 49);
  const promoLines = Object.entries(purchase.promo || {})
    .filter(([, qty]) => qty > 0)
    .map(([k, qty]) => `${k} x${qty}`)
    .join(', ');
  doc.text(`Promos: ${promoLines || '—'}`, 20, 56);
  doc.text(`Total pagado: S/${purchase.total.toFixed(2)}`, 20, 63);
  doc.text(`Fecha de compra: ${new Date(purchase.timestamp).toLocaleString()}`, 20, 70);
  doc.text(`ID de compra: ${purchase.id || 'N/A'}`, 20, 77);
  doc.save(`entrada_${purchase.movie.title.replace(/\s+/g, '_')}.pdf`);
}

const downloadTicket = (purchase) => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(`Boleto: ${purchase.movie.title}`, 10, 20);

  doc.setFontSize(12);
  doc.text(`Fecha: ${new Date(purchase.timestamp).toLocaleDateString()}`, 10, 30);
  doc.text(`Asientos: ${purchase.seats.join(', ')}`, 10, 36);
  doc.text(
    `Promos: ${
      Object.entries(purchase.promo || {})
        .filter(([, q]) => q > 0)
        .map(([k, q]) => `${k} x${q}`)
        .join(', ') || '—'
    }`,
    10,
    42
  );
  doc.text(`Total: S/${purchase.total.toFixed(2)}`, 10, 48);
  doc.save(`boleto_${purchase.id}.pdf`);
};

export default function Wallet() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('walletPurchases') || '[]');
      setPurchases(stored);
    } catch (e) {
      console.warn('Error leyendo wallet', e);
    }
  }, []);

  if (!purchases.length) {
    return (
      <div style={{ padding: 24 }}>
        <h1>Historial</h1>
        <p>Compra una entrada para que te aparezcan aqui.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Historial</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 12 }}>
        {purchases.map((p) => (
          <div
            key={p.id}
            style={{
              background: '#1f2430',
              padding: 16,
              borderRadius: 8,
              color: '#fff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid #ccc',
            }}
          >
            <div>
              <div style={{ fontWeight: '600' }}>
                🎟️ {p.movie.title} —{' '}
                {Object.values(p.tickets || {}).reduce((sum, v) => sum + (v || 0), 0)} entrada(s)
              </div>
              <div style={{ fontSize: 12, marginTop: 4 }}>
                Fecha: {new Date(p.timestamp).toLocaleDateString()}{' '}
                {new Date(p.timestamp).toLocaleTimeString()}
              </div>
              <div style={{ fontSize: 12 }}>Asientos: {p.seats && p.seats.join(', ')}</div>
              <div style={{ fontSize: 12 }}>
                Promos:{' '}
                {Object.entries(p.promo || {})
                  .filter(([, qty]) => qty > 0)
                  .map(([k, qty]) => `${k} x${qty}`)
                  .join(', ') || '—'}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div>Total: S/{p.total.toFixed(2)}</div>
              <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                <button className="btn btn-outline-light btn-sm" onClick={() => downloadReceipt(p)}>
                  Ver entrada
                </button>
                <button className="btn btn-outline-light btn-sm" onClick={() => downloadTicket(p)}>
                  Ver boleto
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
