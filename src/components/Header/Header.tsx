import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom'; // Importante importar esto
import './Header.css';

// const navItems = [
//   { label: 'Inicio', href: '/' },
//   { label: 'Eco Guardianes', href: '#composteros' },
//   { label: 'Nosotros', href: '#sobre-nosotros' },
//   { label: 'Contacto', href: '#contacto' },
//   { label: 'Información', href: '/info' }, // Nueva ruta unificada

// ];

const navItems = [
  { label: 'Inicio', href: '/' }, // Te lleva a la página principal
  { label: 'Eco Guardianes', href: '/#Ecoguardianes' }, // Te lleva al inicio y baja a composteros
  { label: 'Nosotros', href: '/info' }, // Te lleva a la página de info
  { label: 'Contacto', href: '/info#contacto' }, // Te lleva a info y baja a contacto
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header-container">
      <div className="header-inner">
        <a href="#composteros" className="header-brand">
          <img src="/logo-horizontal.svg" alt="Eco Guardianes" className="brand-logo" />
        </a>

        <nav className="header-nav">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <Link to="/login" className="header-cta" aria-label="Iniciar sesión">
            <span>Únete</span>
            <img src="/logo.svg" alt="" className="header-cta-logo" />
          </Link>

          <button
            type="button"
            aria-label="Abrir menú"
            aria-expanded={isOpen}
            className="header-menu-button"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mobile-nav-wrapper">
          <nav className="mobile-nav">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link mobile-nav-link"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};