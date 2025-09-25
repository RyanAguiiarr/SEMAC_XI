import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import './InscricaoModal.css';

interface InscricaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventoId: number;
  eventoTitulo: string;
}

export const InscricaoModal: React.FC<InscricaoModalProps> = ({
  isOpen,
  onClose,
  eventoId,
  eventoTitulo
}) => {
  const [formData, setFormData] = useState({
    nome_completo: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [mensagem, setMensagem] = useState<{ tipo: 'sucesso' | 'erro' | null; texto: string }>({
    tipo: null,
    texto: ''
  });

  // Função para o efeito de gradiente dinâmico
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
    setIsLoading(true);
    setMensagem({ tipo: null, texto: '' });

    try {
      // Simulação de chamada de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Descomente a linha abaixo para usar com seu backend real
      // await axios.post('http://localhost:8080/inscrito', {
      //   nome_completo: formData.nome_completo,
      //   email: formData.email,
      //   palestras: [{ id: eventoId }]
      // });

      setMensagem({
        tipo: 'sucesso',
        texto: 'Inscrição realizada com sucesso!'
      });

      setTimeout(() => {
        setFormData({ nome_completo: '', email: '' });
        onClose();
        setMensagem({ tipo: null, texto: '' }); // Limpa a mensagem ao fechar
      }, 2000);

    } catch (error) {
      setMensagem({
        tipo: 'erro',
        texto: 'Erro ao realizar inscrição. Tente novamente.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            onMouseMove={handleMouseMove} // Efeito de gradiente adicionado aqui
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <button className="modal-close" onClick={onClose}>×</button>
              
              <div>
                <h2>Inscrição</h2>
                <h3>{eventoTitulo}</h3>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nome_completo">Nome Completo</label>
                  <input
                    type="text"
                    id="nome_completo"
                    name="nome_completo"
                    value={formData.nome_completo}
                    onChange={handleChange}
                    placeholder="Seu nome aqui"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                    disabled={isLoading}
                  />
                </div>

                {mensagem.tipo && (
                  <div className={`mensagem ${mensagem.tipo}`}>
                    {mensagem.texto}
                  </div>
                )}

                <button
                  type="submit"
                  className="submit-button"
                  disabled={isLoading}
                >
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
