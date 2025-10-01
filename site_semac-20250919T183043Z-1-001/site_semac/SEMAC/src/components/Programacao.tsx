import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import "./Programacao.css";

// --- INTERFACES ---
export interface Evento {
  id: number;
  dia: 'Segunda-feira' | 'Terça-feira' | 'Quarta-feira' | 'Quinta-feira' | 'Sexta-feira';
  horario: string;
  tipo: 'Palestra' | 'Minicurso';
  palestrante?: string;
  titulo: string;
  vagas?: number;
}

interface EventoCardProps {
  evento: Evento;
  onReserva?: (evento: Evento) => void;
}

interface InscricaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  evento: Evento | null;
}

// --- DADOS DA PROGRAMAÇÃO ---
const programacao: Evento[] = [
  // ... (seus dados de programação permanecem os mesmos)
  { id: 102, dia: 'Segunda-feira', horario: '19:00 - 20:40', tipo: 'Palestra', palestrante: 'Ronaldo Cesar Pereira', titulo: 'Tendências, Demandas e Estratégias de Carreira' },
  { id: 103, dia: 'Segunda-feira', horario: '21:00 - 22:30', tipo: 'Palestra', palestrante: 'Ronaldo Martins', titulo: 'Intrusões em aplicações web' },
  { id: 104, dia: 'Terça-feira', horario: '19:00 - 20:40', tipo: 'Palestra', palestrante: 'Diego Bruno', titulo: 'Visão Computacional, Robótica: desafios entre sensores' },
  { id: 105, dia: 'Terça-feira', horario: '21:00 - 22:30', tipo: 'Palestra', palestrante: 'Marcus Vinícius de Arruda Santos', titulo: 'Cultura de inovação do Google e momento de inteligência artificial' },
  { id: 106, dia: 'Quarta-feira', horario: '19:00 - 22:30', tipo: 'Minicurso', palestrante: 'Paulo Zanluqui', titulo: 'Trilha Frontend', vagas: 30 },
  { id: 107, dia: 'Quarta-feira', horario: '19:00 - 22:30', tipo: 'Minicurso', palestrante: 'Thiago Aio', titulo: 'Trilha Backend', vagas: 30 },
  { id: 108, dia: 'Quarta-feira', horario: '19:00 - 22:30', tipo: 'Minicurso', palestrante: 'A definir', titulo: 'Trilha Frontend Mobile', vagas: 30 },
  { id: 109, dia: 'Quarta-feira', horario: '19:00 - 22:30', tipo: 'Minicurso', palestrante: 'A definir', titulo: 'Trilha Backend', vagas: 30 },
  { id: 110, dia: 'Quinta-feira', horario: '19:00 - 22:30', tipo: 'Minicurso', palestrante: 'Paulo Zanluqui', titulo: 'Trilha Frontend', vagas: 30 },
  { id: 111, dia: 'Quinta-feira', horario: '19:00 - 22:30', tipo: 'Minicurso', palestrante: 'Thiago Aio', titulo: 'Trilha Backend', vagas: 30 },
  { id: 113, dia: 'Quinta-feira', horario: '19:00 - 22:30', tipo: 'Minicurso', palestrante: 'A definir', titulo: 'Trilha Frontend Mobile', vagas: 30 },
  { id: 112, dia: 'Quinta-feira', horario: '19:00 - 22:30', tipo: 'Minicurso', palestrante: 'A definir', titulo: 'Trilha Backend', vagas: 30 },
  { id: 114, dia: 'Sexta-feira', horario: '19:00 - 20:40', tipo: 'Palestra', palestrante: 'Fábio Eduardo Marçaro', titulo: 'Evolução da tecnologia dentro de uma operadora' },
  { id: 115, dia: 'Sexta-feira', horario: '21:00 - 22:30', tipo: 'Palestra', palestrante: 'Yuri Martins', titulo: 'IOT na tecnologia' },
];


// --- COMPONENTE DO MODAL DE INSCRIÇÃO ---
const InscricaoModal: React.FC<InscricaoModalProps> = ({ isOpen, onClose, evento }) => {
  const [formData, setFormData] = useState({ nome_completo: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [mensagem, setMensagem] = useState<{ tipo: 'sucesso' | 'erro' | null; texto: string }>({ tipo: null, texto: '' });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--x', `${x}%`);
    card.style.setProperty('--y', `${y}%`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!evento) return;
    setIsLoading(true);
    setMensagem({ tipo: null, texto: '' });

    //'https://semac-backend-app.onrender.com/inscrito'

    try {
  await axios.post(`https://semac-backend-app.onrender.com/inscricao?palestra_id=${evento.id}`, {
  nome_completo: formData.nome_completo,
  email: formData.email
});
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulação

  setMensagem({ tipo: 'sucesso', texto: 'Inscrição realizada com sucesso!' });

  setTimeout(() => {
    setFormData({ nome_completo: '', email: '' });
    onClose();
    setMensagem({ tipo: null, texto: '' });
  }, 2000);
} catch (error: any) {
  let mensagemFinal = 'Erro ao realizar inscrição. Tente novamente.';

  if (error.response?.data) {
    const data = error.response.data;

    // Se for string, usa direto. Se for objeto, tenta pegar message ou serializa o objeto.
    const textoCompleto =
      typeof data === "string"
        ? data
        : data.message || JSON.stringify(data, null, 2);

    // Tenta extrair a mensagem final caso venha com "java.lang.Exception: ..."
    const partes = textoCompleto.split("java.lang.Exception: ");
    const ultimaParte = partes.pop()?.trim();

    if (ultimaParte) {
      mensagemFinal = ultimaParte;
    } else {
      mensagemFinal = textoCompleto;
    }
  }

  setMensagem({ tipo: 'erro', texto: mensagemFinal });
  console.error("Erro inscrição:", error);
} finally {
  setIsLoading(false);
}
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <AnimatePresence>
      {isOpen && evento && (
        <div className="modal-root">
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />
          <motion.div
            className="modal-container"
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
          >
            <div className="modal-content">
              <button className="modal-close" onClick={onClose}>×</button>
              <div>
                <h2>Inscrição</h2>
                <h3>{evento.titulo}</h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nome_completo">Nome Completo</label>
                  <input type="text" id="nome_completo" name="nome_completo" value={formData.nome_completo} onChange={handleChange} placeholder="Seu nome aqui" required disabled={isLoading} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" required disabled={isLoading} />
                </div>
                {mensagem.tipo && <div className={`mensagem ${mensagem.tipo}`}>{mensagem.texto}</div>}
                <button type="submit" className="submit-button" disabled={isLoading}>
                  {isLoading ? 'Enviando...' : 'Confirmar Inscrição'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};


// --- COMPONENTE DO CARD DE EVENTO ---
const EventoCard = ({ evento, onReserva }: EventoCardProps) => {
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
      {evento.palestrante && <p className="evento-palestrante">{evento.palestrante}</p>}
      <div className="evento-info">
        <div className="evento-horario">🕒 {evento.horario}</div>
      </div>
      <button className="btn-reserva" onClick={() => onReserva && onReserva(evento)}>
        Fazer Pré-Reserva
      </button>
    </div>
  );
};


// --- COMPONENTE PRINCIPAL DA PROGRAMAÇÃO ---
const Programacao = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);

  const eventosPorDia = programacao.reduce((acc, evento) => {
    (acc[evento.dia] = acc[evento.dia] || []).push(evento);
    return acc;
  }, {} as Record<string, Evento[]>);

  const diasOrdenados = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];

  const handleOpenModal = (evento: Evento) => {
    setSelectedEvento(evento);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="programacao-container">
      {diasOrdenados.map((dia) => {
        const eventosDoDia = eventosPorDia[dia];
        if (!eventosDoDia) return null;

        const palestrasDoDia = eventosDoDia.filter(e => e.tipo === 'Palestra');
        const minicursosDoDia = eventosDoDia.filter(e => e.tipo === 'Minicurso');

        const minicursosPorHorario = minicursosDoDia.reduce((acc, evento) => {
          (acc[evento.horario] = acc[evento.horario] || []).push(evento);
          return acc;
        }, {} as Record<string, Evento[]>);

        return (
          <div key={dia} className="dia-section" data-dia={dia}>
            <h2 className="dia-title">{dia}</h2>
            {palestrasDoDia.length > 0 && (
              <div className="horario-group">
                <h3 className="horario-title">Palestras</h3>
                <div className="palestras-group">
                  {palestrasDoDia.map((evento) => (
                    <EventoCard key={evento.id} evento={evento} onReserva={handleOpenModal} />
                  ))}
                </div>
              </div>
            )}
            {Object.keys(minicursosPorHorario).map(horario => (
              <div key={horario} className="horario-group">
                <h3 className="horario-title">Minicursos das {horario}</h3>
                <div className="minicurso-group">
                  {minicursosPorHorario[horario].map((evento) => (
                    <EventoCard key={evento.id} evento={evento} onReserva={handleOpenModal} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      })}

      <InscricaoModal 
        isOpen={modalOpen}
        onClose={handleCloseModal}
        evento={selectedEvento}
      />
    </div>
  );
};

export default Programacao;
