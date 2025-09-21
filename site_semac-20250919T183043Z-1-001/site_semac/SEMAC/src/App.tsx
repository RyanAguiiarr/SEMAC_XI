// src/App.tsx (versão limpa)
import './index.css';
import Header from './components/Header';
import Sobre from './components/Sobre';
import Programacao from './components/Programacao';
import Footer from './components/Footer';

const App = () => {
  return (
    // Removemos os containers extras, simplificando a estrutura
    <> 
      <Header />
      <main>
        <Sobre />
        <Programacao />
      </main>
      <Footer />
    </>
  );
};

export default App;