import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { LandingEcoGuardianes } from './components/Landing/Landing';
import LandingFDMA from './components/Landing/LandingFDMA';
import { Footer } from './components/Footer/Footer';
import { Informacion } from './components/pages/Informacion';

import AvisoPrivacidad from './components/pages/AvisoPrivacidad';
import TerminosCondiciones from './components/pages/TerminosCondiciones';

import { Login } from './components/pages/Login';
import { Registro } from './components/pages/Registro';

import Inicio from './components/Dashboard/Inicio';
import { DashboardLayout } from './components/Dashboard/DashboardLayout';
import NuevaBitacora from './components/Dashboard/NuevaBitacora';
import MiHistorial from './components/Dashboard/MiHistorial';
import Comunidad from './components/Dashboard/Comunidad';
import Perfil from './components/Dashboard/Perfil';

import AdminDashboard from './components/Admin/AdminDashboard';
import AdminGuard from './components/Guards/AdminGuard';
import AuthGuard from './components/Guards/AuthGuard';

import './App.css';
import { Toaster } from 'react-hot-toast';
import AdminComposteros from './components/Admin/AdminComposteros';
import AdminUsuarios from './components/Admin/AdminUsuarios';
import AdminColonias from './components/Admin/AdminColonias';
import AdminHistorial from './components/Admin/AdminHistorial';
import AdminReportes from './components/Admin/AdminReportes';
import AdminConvocatorias from './components/Admin/AdminConvocatorias';

// 1. Plantilla para las páginas públicas (Mantiene el Header y Footer)
const PublicLayout = () => {
  return (
    <div className="app-shell min-h-screen flex flex-col bg-[#FFF8DF] text-[#4A2E18]">
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* Aquí se inyectan Landing, Info, Login, etc. */}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        
        {/* === RUTAS PÚBLICAS === */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingFDMA />} />
          <Route path="/ecoguardianes" element={<LandingEcoGuardianes />} />
          <Route path="/info" element={<Informacion />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/aviso-privacidad" element={<AvisoPrivacidad />} />
          <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
        </Route>

       
          {/* === RUTAS DEL DASHBOARD (Privadas, con Sidebar) === */}
        <Route path="/dashboard" element={<AuthGuard />}>
          <Route element={<DashboardLayout />}>
            {/* 'index' es la página por defecto al entrar a /dashboard */}
            <Route index element={<Inicio />} />
            <Route path="mi-historial" element={<MiHistorial />} />
            <Route path="Nueva-Bitacora" element={<NuevaBitacora />} />
            <Route path="Comunidad" element={<Comunidad />} />
            <Route path="Perfil" element={<Perfil />} />
            {/* <Route path="mi-perfil" element={<MiPerfil />} /> ir aqui agregando cosas */}
          </Route>
        </Route>

        {/* <Route path="/admin" element={<AdminGuard />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="/admin/Perfil" element={<Perfil />} />

          </Route>
        </Route> */}

        {/* === RUTAS DEL ADMIN Y SUPER ADMIN === */}
        <Route path="/admin" element={<AdminGuard />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="composteros" element={<AdminComposteros />} />
            <Route path="usuarios" element={<AdminUsuarios />} />
            <Route path="colonias" element={<AdminColonias />} />
            <Route path="convocatorias" element={<AdminConvocatorias />} />
            <Route path="historial" element={<AdminHistorial />} />
            <Route path="reportes" element={<AdminReportes />} />
            <Route path="Nueva-Bitacora" element={<NuevaBitacora />} />
            <Route path="perfil" element={<Perfil />} />
          </Route>
        </Route>

         

      </Routes>
    </BrowserRouter>
  );
}