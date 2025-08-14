// src/pages/PurchaseFlow/PurchaseFlow.jsx
import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import TrailerStep from '../../components/MovieModal/steps/TrailerStep';
import AuthStep from '../../components/MovieModal/steps/AuthStep';
import TicketsStep from '../../components/MovieModal/steps/TicketsStep';
import SeatsStep from '../../components/MovieModal/steps/SeatsStep';
import PromoStep from '../../components/MovieModal/steps/PromoStep';
import PaymentStep from '../../components/MovieModal/steps/PaymentStep';
import ConfirmationStep from '../../components/MovieModal/steps/ConfirmationStep';
import { movies } from '../../data/movies';
import styles from './PurchaseFlow.module.css';

export default function PurchaseFlow() {
  const [step, setStep] = useState(0);
  const [purchaseData, setPurchaseData] = useState({
    tickets: {},
    seats: [],
    promo: {},
    cardDigits: '',
    paymentInfo: {},
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);

  const movie = movies.find((m) => m.id.toString() === id);
  if (!movie) {
    return <p className="text-center text-danger mt-5">Película no encontrada.</p>;
  }

  const next = (data = {}) => {
    setPurchaseData((prev) => ({ ...prev, ...data }));
    setStep((s) => s + 1);
  };
  const back = () => setStep((s) => Math.max(0, s - 1));
  const finish = () => navigate('/wallet');

  // Precios (como en los steps)
  const ticketPrices = {
    promoOnline: 15.0,
    adulto2d: 30.0,
    nino2d: 20.0,
    discapacitado2d: 20.0,
    ruedas2d: 20.0,
  };
  const promoPrices = {
    duo: 85.9,
    vaso: 85.9,
    trio: 85.9,
  };

  const totalTickets = Object.entries(purchaseData.tickets || {}).reduce(
    (sum, [k, qty]) => sum + (ticketPrices[k] || 0) * qty,
    0
  );
  const totalPromo = Object.entries(purchaseData.promo || {}).reduce(
    (sum, [k, qty]) => sum + (promoPrices[k] || 0) * qty,
    0
  );
  const total = totalTickets + totalPromo;

  return (
    <div className={styles.container}>
      {/* resumen similar opcional */}
      <div style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
        <div>Boletos: S/{totalTickets.toFixed(2)}</div>
        <div>Promos: S/{totalPromo.toFixed(2)}</div>
        <div>
          <strong>Total: S/{total.toFixed(2)}</strong>
        </div>
      </div>

      {step === 0 && <TrailerStep trailerUrl={movie.trailerUrl} onNext={() => setStep(1)} />}

      {step === 1 && !user && (
        <AuthStep
          onLogin={(userData) => {
            login(userData);
            next();
          }}
          onRegister={(userData) => {
            login(userData);
            next();
          }}
          onBack={back}
        />
      )}
      {step === 1 && user && <TicketsStep onNext={next} onBack={back} />}

      {step === 2 && <SeatsStep tickets={purchaseData.tickets} onNext={next} onBack={back} />}
      {step === 3 && <PromoStep onNext={next} onBack={back} />}
      {step === 4 && <PaymentStep total={total} onNext={next} onBack={back} />}
      {step === 5 && (
        <ConfirmationStep purchase={purchaseData} movie={movie} total={total} onFinish={finish} />
      )}
    </div>
  );
}
