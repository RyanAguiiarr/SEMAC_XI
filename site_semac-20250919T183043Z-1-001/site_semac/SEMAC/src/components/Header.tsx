// src/components/Header.tsx
import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Header.css";

gsap.registerPlugin(ScrollTrigger);

interface InfoCard {
  title: string;
  description: string;
  icon: string;
}

const infoCards: InfoCard[] = [
  {
    title: "Palestrantes Renomados",
    description:
      "Profissionais experientes compartilhando conhecimento de ponta",
    icon: "",
  },
  {
    title: "Networking",
    description: "Conecte-se com profissionais e estudantes da �rea",
    icon: "",
  },
  {
    title: "Workshops Pr�ticos",
    description: "Experi�ncia hands-on com as �ltimas tecnologias",
    icon: "",
  },
  {
    title: "Certifica��o",
    description: "Certificado de participa��o para todas as atividades",
    icon: "",
  },
];

const Header: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 200], [0, -50]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scale = useTransform(scrollY, [0, 200], [1, 0.95]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    tl.fromTo(
      ".event-title",
      { y: 100, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2 }
    )
      .fromTo(
        ".info-card",
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.2 },
        "-=0.8"
      )
      .fromTo(
        ".cta-button",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.4"
      );

    // Background parallax
    gsap.to(".header-bg-element", {
      y: "30%",
      ease: "none",
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  return (
    <motion.div ref={headerRef} className="main-header" style={{ y, opacity }}>
      <div className="header-bg-element"></div>
      <div className="header-bg-element"></div>

      <motion.div className="header-content" style={{ scale }}>
        <h1 className="event-title" data-text="XI SEMANA DA COMPUTA��O">
          XI SEMANA DA COMPUTA��O
        </h1>

        <div className="header-info">
          {infoCards.map((card, index) => (
            <motion.div
              key={index}
              className="info-card"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 30px rgba(97, 218, 251, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="info-icon">{card.icon}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.button
          className="cta-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Inscreva-se Agora
        </motion.button>

        <motion.div
          className="scroll-indicator"
          animate={{
            y: [0, 10, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 24 24">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Header;
