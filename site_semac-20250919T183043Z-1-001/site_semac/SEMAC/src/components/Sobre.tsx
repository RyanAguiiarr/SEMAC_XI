// src/components/Sobre.tsx
import React from 'react';
import { motion } from 'framer-motion';
import './Sobre.css';

// Definição das features para reutilização
const features = [
  { icon: '💡', title: 'Palestras de Vanguarda', description: 'Explore as fronteiras da IA, Cibersegurança e Desenvolvimento Web.' },
  { icon: '🚀', title: 'Workshops Práticos', description: 'Aprenda fazendo com minicursos intensivos nas tecnologias mais atuais.' },
  { icon: '🤝', title: 'Networking de Alto Nível', description: 'Conecte-se com empresas, palestrantes e futuros colegas de trabalho.' },
];

const fadeInUpVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

const Sobre: React.FC = () => {
  return (
    <section className="sobre-container">
      <div className="sobre-content">
        <motion.div
          className="sobre-texto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
        >
          <h2>XI Semana da Computação: Conectando Mentes, Criando o Futuro</h2>
          <p>
            Explore o fascinante mundo da computação em uma semana repleta de
            conhecimento, inovação e networking. Nossa programação foi
            cuidadosamente elaborada para trazer o que há de mais relevante no
            cenário tecnológico atual.
          </p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              variants={fadeInUpVariants}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="decorative-glow-1"></div>
      <div className="decorative-glow-2"></div>
    </section>
  );
};

export default Sobre;