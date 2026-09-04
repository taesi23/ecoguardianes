import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export const DashboardLayout = () => {
  // Estado para controlar si el menú móvil está abierto o cerrado
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full max-w-full min-w-0 overflow-x-hidden bg-[#F9F7F1] flex font-sans text-[#4A2E18]">
      
      {/* Menú lateral (Desktop) - Se oculta en celulares, se muestra en pantallas medianas o grandes */}
      <div className="hidden md:block">
         <Sidebar />
      </div>

      {/* Menú lateral deslizable (Móvil) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Fondo oscuro transparente */}
          <div 
            className="fixed inset-0 bg-black/40 transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* Contenedor del Sidebar que desliza */}
          <div className="relative w-64 max-w-[85vw] shrink-0 bg-[#FFF8DF] shadow-2xl">
            <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Contenedor Principal Central */}
      <main className="min-h-screen min-w-0 flex-1 flex flex-col overflow-x-hidden">
        
        {/* Barra superior móvil */}
        <header className="md:hidden bg-[#FFF8DF] border-b border-[#4A2E18]/10 p-4 flex justify-between items-center z-40 relative shadow-sm">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Logo" className="w-6 h-6 object-contain" />
            <span className="font-bold text-lg text-[#4A2E18]">Eco-Guardianes</span>
          </div>
          
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-[#4A2E18] focus:outline-none hover:bg-[#4A2E18]/5 rounded-lg"
          >
            {/* AQUÍ PONES TU SVG DE MENÚ HAMBURGUESA */}
            <img src="/menu.svg" alt="Menú" className="w-6 h-6 object-contain" />
          </button>
        </header>

        {/* Área donde cargan las páginas (con padding más amigable para celular) */}
        <div className="w-full max-w-full min-w-0 flex-1 p-4 sm:p-6 md:p-8">
          <Outlet /> 
        </div>

      </main>
    </div>
  );
};