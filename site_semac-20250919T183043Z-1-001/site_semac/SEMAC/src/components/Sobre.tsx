// src/components/Sobre.tsx
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Sobre.css";

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: "🎯",
    title: "Palestras Inspiradoras",
    description: "Aprenda com especialistas da indústria",
  },
  {
    icon: "💡",
    title: "Workshops Práticos",
    description: "Experiência hands-on em tecnologias modernas",
  },
  {
    icon: "🤝",
    title: "Networking",
    description: "Conecte-se com profissionais e estudantes",
  },
  {
    icon: "🚀",
    title: "Inovação",
    description: "Explore as últimas tendências em tecnologia",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Sobre: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.4], [100, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.4], [0.8, 1, 1]);

  return (
    <motion.section
      className="sobre-container"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.div className="sobre-hero" style={{ opacity, y, scale }}>
        <motion.h2
          className="sobre-title"
          data-text="XI Semana da Computação"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          XI Semana da Computação
        </motion.h2>

        <motion.div
          className="sobre-date"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="date-box">
            <span className="date-icon">📅</span>
            <div className="date-content">
              <h3>20-24 de Outubro</h3>
              <p>2025</p>
            </div>
          </div>
        </motion.div>

        <motion.p
          className="main-text"
          initial="hidden"
          animate="visible"
          variants={itemVariants}
        >
          Prepare-se para uma imersão completa no universo da tecnologia e
          inovação. A SEMAC é o ponto de encontro anual para estudantes,
          profissionais e entusiastas da computação, oferecendo palestras,
          minicursos e workshops com os temas mais atuais do mercado.
        </motion.p>

        <motion.div
          className="features-grid"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-item"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="feature-icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="cyber-decorations"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className={`cyber-line line-${i}`}
              variants={itemVariants}
              custom={i}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                x: [-10, 10, -10],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Sobre;
