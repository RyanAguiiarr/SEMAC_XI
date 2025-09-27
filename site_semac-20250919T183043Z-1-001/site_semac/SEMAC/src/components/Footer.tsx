// src/components/Footer.tsx
import React from "react";
import "./Footer.css";
import { FaInstagram } from "react-icons/fa"; // Importe os ícones

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-content">
        <p>
          &copy; {currentYear} XI SEMAC - IFSP Catanduva. Todos os direitos
          reservados.
        </p>
        <div className="social-links">
          <a
            href="https://www.instagram.com/ifspcatanduva/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
