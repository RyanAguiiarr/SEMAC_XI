import React, { useState } from "react";
import "./Programacao.css";

export interface Evento {
  id: number;
  dia: string;
  horario: string;
  tipo: string;
  palestrante: string;
  titulo: string;
  vagas: number;
}

const programacao: Evento[] = [
  {
    id: 1,
    dia: "Segunda-feira",
    horario: "19:00 - 20:40",
    tipo: "Palestra",
    palestrante: "Marcos Vinicius",
    titulo: "Computação em Nuvem",
    vagas: 100,
  },
  {
    id: 2,
    dia: "Segunda-feira",
    horario: "21:00 - 22:30",
    tipo: "Palestra",
    palestrante: "Márcio Andrey",
    titulo: "IA em Cibersegurança",
    vagas: 100,
  },
  {
    id: 3,
    dia: "Terça-feira",
    horario: "19:00 - 20:40",
    tipo: "Palestra",
    palestrante: "Diego (UNESP)",
    titulo: "Visão Computacional, Robótica: desafios entre sensores",
    vagas: 100,
  },
  {
    id: 4,
    dia: "Terça-feira",
    horario: "21:00 - 22:30",
    tipo: "Palestra",
    palestrante: "Fábio Viana",
    titulo: "Evolução da Tecnologia",
    vagas: 100,
  },
  {
    id: 5,
    dia: "Quarta-feira",
    horario: "19:00 - 20:40",
    tipo: "Palestra",
    palestrante: "Yuri",
    titulo: "IOT na Tecnologia",
    vagas: 100,
  },
  {
    id: 6,
    dia: "Quarta-feira",
    horario: "21:00 - 22:30",
    tipo: "Palestra",
    palestrante: "Ronaldo",
    titulo: "Mercado de Trabalho",
    vagas: 100,
  },
  {
    id: 7,
    dia: "Quinta-feira",
    horario: "19:00 - 22:30",
    tipo: "Minicurso",
    palestrante: "Paulo Zanluqui",
    titulo: "Trilha Frontend",
    vagas: 30,
  },
  {
    id: 8,
    dia: "Quinta-feira",
    horario: "19:00 - 22:30",
    tipo: "Minicurso",
    palestrante: "A definir",
    titulo: "Trilha Backend",
    vagas: 30,
  },
  {
    id: 9,
    dia: "Quinta-feira",
    horario: "19:00 - 22:30",
    tipo: "Minicurso",
    palestrante: "A definir",
    titulo: "Trilha Ambiente de Desenvolvimento + Docker",
    vagas: 30,
  },
  {
    id: 10,
    dia: "Quinta-feira",
    horario: "19:00 - 22:30",
    tipo: "Minicurso",
    palestrante: "A definir",
    titulo: "Trilha Deploy Aplicação + DNS",
    vagas: 30,
  },
];

const EventoCard = ({ evento }: { evento: Evento }) => {
  const [reservado, setReservado] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--x", `${x}%`);
    card.style.setProperty("--y", `${y}%`);
  };

  return (
    <div className="evento-card" onMouseMove={handleMouseMove}>
      <div className="card-glow"></div>
      <span className="evento-tipo">{evento.tipo}</span>
      <h3 className="evento-titulo">{evento.titulo}</h3>
      <p className="evento-palestrante">{evento.palestrante}</p>
      <div className="evento-info">
        <div className="evento-horario">🕒 {evento.horario}</div>
      </div>
      <button
        className={`btn-reserva ${reservado ? "reservado" : ""}`}
        onClick={() => setReservado(!reservado)}
      >
        {reservado ? "Pré-Reservado!" : "Fazer Pré-Reserva"}
      </button>
    </div>
  );
};

const Programacao = () => {
  const diasDaSemana = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
  ];

  return (
    <div className="programacao-container">
      {diasDaSemana.map((dia) => {
        const eventosDoDia = programacao.filter((evento) => evento.dia === dia);

        return eventosDoDia.length > 0 ? (
          <div key={dia} className="dia-section">
            <h2 className="dia-title">{dia}</h2>
            <div className="eventos-grid">
              {eventosDoDia.map((evento) => (
                <EventoCard key={evento.id} evento={evento} />
              ))}
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default Programacao;
