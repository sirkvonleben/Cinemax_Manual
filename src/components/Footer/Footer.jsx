import React from 'react';
import './Footer.css';

export function Footer() {
  return (
    <footer>
      <div className="info-enterprice">
        <div className="footer-logo">
          <img src="/img/logo-idat.png" alt="IDAT Logo" />
        </div>

        <div className="info-enterprice-text">
          <strong>Oficina principal:</strong>
          <span>Av. Lima del Perú 1234</span>
          <strong>Razón Social:</strong>
          <span>IDAT SAC</span>
          <strong>RUC:</strong>
          <span>20605391738</span>
        </div>

        <div className="info-enterprice-links">
          <a href="/terms">Términos y condiciones</a>
          <a href="/jobs">Trabaja con nosotros</a>
          <a href="/cookies">Política de cookies</a>
          <a href="/promotions">Promociones</a>
          <a href="/contact">Contáctenos</a>
        </div>

        <div className="info-enterprice-social">
          <span>Síguenos:</span>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="/img/facebook.png" alt="Facebook" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="/img/instagram.png" alt="Instagram" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
              <img src="/img/tiktok.png" alt="TikTok" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <img src="/img/youtube.png" alt="YouTube" />
            </a>
          </div>
          <img
            src="/img/libro_reclamaciones.png"
            alt="Libro de Reclamaciones"
            className="libro-reclamaciones"
          />
          <div className="info-copyright">
            <p>© Todos los derechos reservados por CINE IDAT - 2025</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
