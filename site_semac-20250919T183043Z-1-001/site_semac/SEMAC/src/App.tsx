import "./index.css";
import { motion } from "framer-motion";
import Header from "./components/Header";
import Sobre from "./components/Sobre";
import Programacao from "./components/Programacao";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="app-container">
      <div
        className="background-gradient"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          background: "var(--gradient-background)",
        }}
      />
      <motion.div
        className="content-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          padding: "0 20px",
        }}
      >
        <Header />
        <main>
          <Sobre />
          <Programacao />
        </main>
        <Footer />
      </motion.div>
    </div>
  );
};

export default App;
