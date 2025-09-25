// src/components/Header.tsx
import React from 'react';
import { motion, type Variants } from 'framer-motion'; // 1. Importe o tipo 'Variants'
import './Header.css';

// 2. Adicione a tipagem explícita ': Variants' aqui
const lineAnimation: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: custom * 0.2, ease: 'easeOut' },
  }),
};

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Header: React.FC = () => {
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  React.useEffect(() => {
    const eventDate = new Date('2025-10-23T09:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="main-header">
      <div className="header-content">
        <motion.img
          src="/logo_nova_semac.png" 
          alt="Logo SEMAC"
          className="header-logo"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        />

        <div className="title-container">
          <motion.h1
            className="event-title"
            custom={1}
            variants={lineAnimation}
            initial="hidden"
            animate="visible"
          >
            Semana da Computação
          </motion.h1>
          <motion.div
            className="event-acronym"
            custom={2}
            variants={lineAnimation}
            initial="hidden"
            animate="visible"
          >
            XI SEMAC
          </motion.div>
        </div>

        <motion.p
          className="event-subtitle"
          custom={3}
          variants={lineAnimation}
          initial="hidden"
          animate="visible"
        >
          De 20 a 24 de Outubro | IFSP Catanduva
        </motion.p>

        <motion.div
          className="countdown-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="countdown-item">
            <span className="countdown-value">{timeLeft.days}</span>
            <span className="countdown-label">Dias</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="countdown-label">Horas</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="countdown-label">Minutos</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="countdown-label">Segundos</span>
          </div>
        </motion.div>

        <motion.button
          className="cta-button"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 25px #764ABC' }}
          whileTap={{ scale: 0.95 }}
        >
          Garanta sua Vaga
        </motion.button>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          ↓
        </motion.div>
      </motion.div>
    </header>
  );
};

export default Header;