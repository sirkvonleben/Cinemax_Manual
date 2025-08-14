import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './appRoutes';
import { Footer } from './components/Footer/Footer'; // asegúrate de usar la ruta correcta

export default function App() {
  const routing = useRoutes(routes);

  return (
    <>
      <Suspense fallback={<div>Cargando…</div>}>{routing}</Suspense>
      <Footer /> {/* Aquí renderizas el Footer */}
    </>
  );
}
