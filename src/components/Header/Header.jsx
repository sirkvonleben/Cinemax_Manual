import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const navItems = [
  { label: 'En Cartelera', href: '#en-cartelera' },
  { label: 'Próximos Estrenos', href: '#proximos-estrenos' },
  { label: 'Promociones', href: '#promociones' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          CineMax
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Toggle"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto">
            {navItems.map((i) => (
              <li className="nav-item" key={i.href}>
                <a className="nav-link" href={i.href}>
                  {i.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
