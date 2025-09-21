import React, { useState } from "react";
import "./Programacao.css";

export interface Evento {
  id: number;
  dia: 'Segunda-feira' | 'Terça-feira' | 'Quarta-feira' | 'Quinta-feira' | 'Sexta-feira';
  horario: string;
  tipo: 'Palestra' | 'Minicurso'; // Tipo 'Coffee Break' removido
  palestrante?: string;
  titulo: string;
  vagas?: number;
}

const programacao: Evento[] = [
  // Segunda-feira
  { id: 1, dia: 'Segunda-feira', horario: '19:00 - 20:40', tipo: 'Palestra', palestrante: 'Ronaldo', titulo: 'Mercado de Trabalho' },
  { id: 3, dia: 'Segunda-feira', horario: '21:00 - 22:30', tipo: 'Palestra', palestrante: 'Marcio (IFSP)', titulo: 'IA em Cibersegurança' },
  // Terça-feira
  { id: 4, dia: 'Terça-feira', horario: '19:00 - 20:40', tipo: 'Palestra', palestrante: 'Diego (Unesp)', titulo: 'Visão Computacional, Robótica: desafios entre sensores' },
  { id: 6, dia: 'Terça-feira', horario: '21:00 - 22:30', tipo: 'Palestra', palestrante: 'Marcus', titulo: 'Cultura de Inovação do Google e IA' },
  // Quarta-feira
  { id: 7, dia: 'Quarta-feira', horario: '19:00 - 22:30', tipo: 'Minicurso', palestrante: 'Paulo Zanluqui', titulo: 'Trilha Frontend', vagas: 30 },
  { id: 8, dia: 'Quarta-feira', horario: '19:00 - 22:30', tipo: 'Minicurso', palestrante: 'A definir', titulo: 'Trilha Backend', vagas: 30 },
  { id: 9, dia: 'Quarta-feira', horario: '19:00 - 22:30', tipo: 'Minicurso', palestrante: 'A definir', titulo: 'Dev. + Docker', vagas: 30 },
  { id: 10, dia: 'Quarta-feira', horario: '19:00 - 22:30', tipo: 'Minicurso', palestrante: 'A definir', titulo: 'Deploy + DNS', vagas: 30 },
  // Quinta-feira
  { id: 11, dia: 'Quinta-feira', horario: '19:00 - 22:30', tipo: 'Minicurso', palestrante: 'Paulo Zanluqui', titulo: 'Trilha Frontend', vagas: 30 },
  { id: 12, dia: 'Quinta-feira', horario: '19:00 - 22:30', tipo: 'Minicurso', palestrante: 'A definir', titulo: 'Trilha Backend', vagas: 30 },
  { id: 13, dia: 'Quinta-feira', horario: '19:00 - 22:30', tipo: 'Minicurso', palestrante: 'A definir', titulo: 'Dev. + Docker', vagas: 30 },
  { id: 14, dia: 'Quinta-feira', horario: '19:00 - 22:30', tipo: 'Minicurso', palestrante: 'A definir', titulo: 'Deploy + DNS', vagas: 30 },
  // Sexta-feira
  { id: 15, dia: 'Sexta-feira', horario: '19:00 - 20:40', tipo: 'Palestra', palestrante: 'Yuri', titulo: 'IOT na Tecnologia' },
  { id: 17, dia: 'Sexta-feira', horario: '21:00 - 22:30', tipo: 'Palestra', palestrante: 'Fabio', titulo: 'Evolução da tecnologia dentro de uma operadora' },
];

const EventoCard = ({ evento }: { evento: Evento }) => {
  const [reservado, setReservado] = useState(false);

  // Lógica de mouse-move para o gradiente dinâmico
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--x', `${x}%`);
    card.style.setProperty('--y', `${y}%`);
  };

  return (
    <div className="evento-card" onMouseMove={handleMouseMove}>
      <div className="card-glow"></div>
      <span className="evento-tipo">{evento.tipo}</span>
      <h3 className="evento-titulo">{evento.titulo}</h3>
      {evento.palestrante && (
        <p className="evento-palestrante">{evento.palestrante}</p>
      )}
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
  // Agrupa todos os eventos pelo dia da semana
  const eventosPorDia = programacao.reduce((acc, evento) => {
    (acc[evento.dia] = acc[evento.dia] || []).push(evento);
    return acc;
  }, {} as Record<string, Evento[]>);

  const diasOrdenados = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];

  return (
    <div className="programacao-container">
      {diasOrdenados.map((dia) => {
        const eventosDoDia = eventosPorDia[dia];
        if (!eventosDoDia) return null;

        // Agrupa os eventos do dia por horário
        const eventosPorHorario = eventosDoDia.reduce((acc, evento) => {
          (acc[evento.horario] = acc[evento.horario] || []).push(evento);
          return acc;
        }, {} as Record<string, Evento[]>);

        return (
          <div key={dia} className="dia-section">
            <h2 className="dia-title">{dia}</h2>
            {Object.keys(eventosPorHorario).map((horario) => {
              const eventosDoHorario = eventosPorHorario[horario];
              const eMinicursos = eventosDoHorario.length > 1 && eventosDoHorario.every(e => e.tipo === 'Minicurso');

              // Se for um grupo de minicursos, usa a grade especial
              if (eMinicursos) {
                return (
                  <div key={horario} className="horario-group">
                    <h3 className="horario-title">Minicursos das {horario}</h3>
                    <div className="minicurso-group">
                      {eventosDoHorario.map((evento) => (
                        <EventoCard key={evento.id} evento={evento} />
                      ))}
                    </div>
                  </div>
                );
              }

              // Caso contrário, renderiza os cards normalmente
              return eventosDoHorario.map((evento) => (
                <div key={evento.id} className="evento-item-wrapper">
                  <EventoCard evento={evento} />
                </div>
              ));
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Programacao;