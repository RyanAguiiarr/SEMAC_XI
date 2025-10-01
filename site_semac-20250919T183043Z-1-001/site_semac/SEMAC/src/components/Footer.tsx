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
          <a href="https://www.instagram.com/ifspcatanduva?igsh=OWJyemo5ZjczZHhh" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          <a href="https://www.linkedin.com/school/ifspoficial/posts/?feedView=all" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;