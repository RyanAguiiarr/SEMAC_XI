import './index.css';
import Header from './components/Header';
import Sobre from './components/Sobre';
import Programacao from './components/Programacao';
import Footer from './components/Footer';
import BackgroundImage from './components/BackgroundImage';

const App = () => {
  return (
    <>
      <BackgroundImage />
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