// src/dados.ts

// 1. Definimos a "forma" de um objeto de evento.
export interface Evento {
  id: number;
  tipo: 'Palestra' | 'Minicurso'; // Só aceita esses dois valores
  titulo: string;
  palestrante: string;
  dia: string;
  horario: string;
  vagas: number;
}

// 2. Declaramos que 'programacao' é um array de objetos do tipo 'Evento'.
export const programacao: Evento[] = [
  {
    id: 1,
    tipo: 'Palestra',
    titulo: 'Introdução à Inteligência Artificial Generativa',
    palestrante: 'Dr. Alan Turing',
    dia: '20 de Outubro',
    horario: '19:00 - 20:00',
    vagas: 50,
  },
  {
    id: 2,
    tipo: 'Minicurso',
    titulo: 'Desenvolvimento de APIs com Node.js',
    palestrante: 'Ada Lovelace',
    dia: '21 de Outubro',
    horario: '14:00 - 18:00',
    vagas: 25,
  },
  {
    id: 3,
    tipo: 'Palestra',
    titulo: 'A Revolução do React com Server Components',
    palestrante: 'Grace Hopper',
    dia: '22 de Outubro',
    horario: '20:30 - 21:30',
    vagas: 50,
  },
  {
    id: 4,
    tipo: 'Palestra',
    titulo: 'Cibersegurança: Protegendo o Futuro Digital',
    palestrante: 'Kevin Mitnick',
    dia: '23 de Outubro',
    horario: '19:00 - 20:00',
    vagas: 50,
  }
];