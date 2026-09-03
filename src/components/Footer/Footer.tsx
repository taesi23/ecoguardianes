import { UserCircleIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-brand-row">
            <Link to="/" aria-label="Ir al inicio">
              <img src="/logo-horizontal.svg" alt="Eco Guardianes" className="footer-brand-logo" />
            </Link>
          </div>
          <p className="footer-brand-copy">
            Monitoreando hoy el compost que transforma el mañana.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Navegación</h4>
          <ul className="footer-link-list">
            <li><Link to="/" className="footer-link">FDMA-Festival</Link></li>
            <li><Link to="/ecoguardianes" className="footer-link">Eco Guardianes</Link></li>
            <li><Link to="/info" className="footer-link">Nosotros & Contacto</Link></li>
            <li><Link to="/login" className="footer-link">Inicio de sesión</Link></li>
            <li><Link to="/registro" className="footer-link">Registro</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Recursos</h4>
          <ul className="footer-link-list">
            <li><a href="/manuales" className="footer-link">Manuales</a></li>
            <li><a href="/info#recursos" className="footer-link">Guías de compostaje</a></li>
            <li><a href="/info#recursos" className="footer-link">Preguntas frecuentes</a></li>
            <li><a href="/info#sobre-nosotros" className="footer-link">Sobre nosotros</a></li>
            <li><Link to="/aviso-privacidad" className="footer-link">Aviso de Privacidad</Link></li>
            <li><Link to="/terminos-condiciones" className="footer-link">Términos y Condiciones</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Aliados</h4>


          <div className="footer-contact-item">
            <UserCircleIcon className="footer-contact-icon text-pink-500" />
            <a
              href="https://instagram.com/eco_marce_shop"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-green-500 transition-colors"
            >
              @eco_marce_shop
            </a>
          </div>

          <div className="footer-contact-item">
            <UserCircleIcon className="footer-contact-icon text-pink-500" />
            <a
              href="https://www.instagram.com/fdma.mx"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-green-500 transition-colors"
            >
              @fdma.mx
            </a>
          </div>

          <div className="footer-contact-item">
            <UserCircleIcon className="footer-contact-icon text-pink-500" />
            <a
              href="https://www.instagram.com/puratastudio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-green-500 transition-colors"
            >
              @puratastudio
            </a>
          </div>

          <div className="footer-contact-item">
            <UserCircleIcon className="footer-contact-icon text-pink-500" />
            <a
              href="https://www.instagram.com/vivero_monos_garden"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-green-500 transition-colors"
            >
              @vivero_monos_garden
            </a>
          </div>

          <div className="footer-contact-item">
            <UserCircleIcon className="footer-contact-icon text-pink-500" />
            <a
              href="https://www.instagram.com/pomodoro_agroecologico"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-green-500 transition-colors"
            >
              @pomodoro_agroecologico
            </a>
          </div>

          <div className="footer-contact-item">
            <UserCircleIcon className="footer-contact-icon text-pink-500" />
            <a
              href="https://www.instagram.com/_ware_street"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-green-500 transition-colors"
            >
              @_ware_street
            </a>
          </div>

          <div className="footer-contact-item">
            <UserCircleIcon className="footer-contact-icon text-pink-500" />
            <a
              href="https://www.instagram.com/edgara.castillo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-green-500 transition-colors"
            >
              @edgara.castillo
            </a>
          </div>

          <div className="footer-contact-item">
            <UserCircleIcon className="footer-contact-icon text-pink-500" />
            <a
              href="https://www.instagram.com/parquecasablanca3"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-green-500 transition-colors"
            >
              @parquecasablanca3
            </a>
          </div>

          <div className="footer-contact-item">
            <svg
              className="footer-contact-icon text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
            <a
              href="https://www.facebook.com/share/1DKWiUtHvb/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-blue-500 transition-colors"
            >
              Comunidad en FB de Parque Casa Blanca 3
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom text-center">
        <p>© 2026 Eco Guardianes. Todos los derechos reservados.</p>
        <p>
          Hecho con amor. Desarrollado por{' '}
          <a
            href="https://instagram.com/ijessiyou"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:text-green-500 hover:underline transition-colors"
          >
            @ijessiyou
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;