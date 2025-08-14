// src/appRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home/Home';
import Wallet from './pages/wallet/Wallet';
import PurchaseFlow from './pages/PurchaseFlow/PurchaseFlow';
import LoginRegisterPage from './pages/Auth/LoginRegisterPage'; // <- importa el login/register
import Promotions from './pages/Promotions/Promotions';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="cartelera" element={<Home />} />
        <Route path="proximos-estrenos" element={<Home />} />
        <Route path="/promociones" element={<Promotions />} key="promociones" />
        <Route path="contacto" element={<div>Contacto</div>} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="login" element={<LoginRegisterPage />} />
        <Route path="purchase/*" element={<PurchaseFlow />} />
      </Route>
    </Routes>
  );
}
