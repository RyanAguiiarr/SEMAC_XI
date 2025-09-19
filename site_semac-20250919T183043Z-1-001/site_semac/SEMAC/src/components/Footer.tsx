// src/components/Footer.tsx
import React from 'react';
import './Footer.css';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa'; // Importe os ícones

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-content">
        <p>&copy; {currentYear} XI SEMAC - IFSP Catanduva. Todos os direitos reservados.</p>
        <div className="social-links">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;