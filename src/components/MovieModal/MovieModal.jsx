import React, { useState, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import TrailerStep from './steps/TrailerStep';
import AuthStep from './steps/AuthStep';
import TicketsStep from './steps/TicketsStep';
import SeatsStep from './steps/SeatsStep';
import PromoStep from './steps/PromoStep';
import PaymentStep from './steps/PaymentStep';
import ConfirmationStep from './steps/ConfirmationStep';
import { AuthContext } from '../../context/AuthContext';
import styles from './MovieModal.module.css';
import CastModal from './CastModal';

const ticketOptions = {
  promoOnline: { price: 15.0, label: 'Promo Online' },
  adulto2d: { price: 30.0, label: 'Adulto 2D' },
  nino2d: { price: 20.0, label: 'Niño 2D' },
  discapacitado2d: { price: 20.0, label: 'P. con discapacidad 2D' },
  ruedas2d: { price: 20.0, label: 'Silla de ruedas 2D' },
};
const promoOptions = {
  duo: { price: 85.9, label: 'Combo Duo' },
  vaso: { price: 85.9, label: 'Combo Vaso' },
  trio: { price: 85.9, label: 'Combo Trio' },
};

const STEP = {
  TRAILER: 0,
  AUTH: 1,
  TICKETS: 2,
  SEATS: 3,
  PROMO: 4,
  PAYMENT: 5,
  CONFIRM: 6,
};

export default function MovieModal({ movie, onClose, preview = false }) {
  const { user, login } = useContext(AuthContext);
  const [step, setStep] = useState(STEP.TRAILER);
  const [purchase, setPurchase] = useState({
    tickets: {},
    promo: {},
    seats: [],
    paymentInfo: null,
    cardDigits: '',
    total: 0,
  });

  const [showCast, setShowCast] = useState(false);

  const updatePurchase = (partial) => {
    setPurchase((p) => ({ ...p, ...partial }));
  };

  const totals = useMemo(() => {
    const totalTickets = Object.entries(purchase.tickets || {}).reduce(
      (sum, [key, qty]) => sum + (ticketOptions[key]?.price || 0) * qty,
      0
    );
    const totalPromo = Object.entries(purchase.promo || {}).reduce(
      (sum, [key, qty]) => sum + (promoOptions[key]?.price || 0) * qty,
      0
    );
    return {
      totalTickets,
      totalPromo,
      total: totalTickets + totalPromo,
    };
  }, [purchase]);

  const handleBack = () => {
    setStep((s) => {
      if (s === STEP.TICKETS && user) {
        // si el usuario ya está logueado, volver de TICKETS a TRAILER (salta AUTH)
        return STEP.TRAILER;
      }
      const prev = Math.max(0, s - 1);
      if (prev === STEP.TRAILER) {
        // reset completo si vuelve al inicio
        setPurchase({
          tickets: {},
          promo: {},
          seats: [],
          paymentInfo: null,
          cardDigits: '',
          total: 0,
        });
      }
      return prev;
    });
  };

  const handleFinish = () => {
    onClose();
    setStep(STEP.TRAILER);
    setPurchase({
      tickets: {},
      promo: {},
      seats: [],
      paymentInfo: null,
      cardDigits: '',
      total: 0,
    });
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Compra de entradas">
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar modal">
          Cerrar
        </button>

        {step >= STEP.TICKETS && (
          <div className={styles.summaryBar}>
            <div>Boletos: S/{totals.totalTickets.toFixed(2)}</div>
            <div>Promos: S/{totals.totalPromo.toFixed(2)}</div>
            <div>
              <strong>Total: S/{totals.total.toFixed(2)}</strong>
            </div>
          </div>
        )}

        {step === STEP.TRAILER && (
          <div className={styles.inner}>
            <div className={styles.trailerAndDetails}>
              {/* Lado izquierdo: trailer + comprar */}

              <div className={styles.left}>
                <div className={styles.trailer}>
                  <TrailerStep
                    trailerUrl={movie.trailer || movie.trailerUrl}
                    onNext={() => {
                      if (!preview) {
                        setStep(user ? STEP.TICKETS : STEP.AUTH);
                      }
                    }}
                  />
                </div>
                {!preview && (
                  <div className={styles.buyWrapper}>
                    <button
                      className={styles.primaryBtn}
                      onClick={() => setStep(user ? STEP.TICKETS : STEP.AUTH)}
                    >
                      {user ? 'Comprar entrada' : 'Iniciar sesión / registrarse'}
                    </button>
                  </div>
                )}
              </div>

              <div className={styles.details}>
                <h1 className={styles.title}>{movie.title || '—'}</h1>
                <p className={styles.info}>Duración | {movie.duration || '—'}</p>
                <p className={styles.info}>Formato | {movie.format || '—'}</p>
                <p className={styles.info}>Cine | {movie.cinema || '—'}</p>
                <p className={styles.info}>
                  Fecha y horario | {movie.schedule || movie.showtime || '—'}
                </p>
                <p className={styles.info}>Género | {movie.genre || '—'}</p>
                <p className={styles.synopsis}>{movie.synopsis || 'Sin sinopsis disponible.'}</p>
                <div className={styles.actions}>
                  <button className={styles.secondaryBtn} onClick={() => setShowCast(true)}>
                    Reparto
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === STEP.AUTH && (
          <AuthStep
            onLogin={(userData) => {
              login(userData);
              setStep(STEP.TICKETS);
            }}
            onRegister={(userData) => {
              login(userData);
              setStep(STEP.TICKETS);
            }}
            onBack={handleBack}
          />
        )}

        {step === STEP.TICKETS && (
          <TicketsStep
            initialTickets={purchase.tickets}
            onNext={(data) => {
              updatePurchase(data);
              setStep(STEP.SEATS);
            }}
            onBack={handleBack}
          />
        )}

        {step === STEP.SEATS && (
          <SeatsStep
            tickets={purchase.tickets}
            onNext={(data) => {
              updatePurchase(data);
              setStep(STEP.PROMO);
            }}
            onBack={handleBack}
          />
        )}

        {step === STEP.PROMO && (
          <PromoStep
            initialPromo={purchase.promo}
            onNext={(data) => {
              updatePurchase(data);
              setStep(STEP.PAYMENT);
            }}
            onBack={handleBack}
          />
        )}

        {step === STEP.PAYMENT && (
          <PaymentStep
            total={totals.total}
            onNext={({ paymentInfo, cardDigits }) => {
              updatePurchase({
                paymentInfo,
                cardDigits,
                total: totals.total,
              });
              setStep(STEP.CONFIRM);
            }}
            onBack={handleBack}
          />
        )}

        {step === STEP.CONFIRM && (
          <ConfirmationStep purchase={purchase} movie={movie} onFinish={handleFinish} />
        )}

        {showCast && <CastModal onBack={() => setShowCast(false)} cast={movie.cast || []} />}
      </div>
    </div>
  );
}

MovieModal.propTypes = {
  movie: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  preview: PropTypes.bool,
};
