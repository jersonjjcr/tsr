import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import logo from "./assets/logo.png";
import Menu from "./components/Menu";

function Home() {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (particles.length < 20 && Math.random() > 0.7) {
        setParticles(prev => [
          ...prev,
          {
            id: Date.now(),
            x: Math.random() * 100,
            size: Math.random() * 10 + 5,
            duration: Math.random() * 3 + 2
          }
        ]);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [particles]);

  const handleMenuClick = () => {
    navigate("/menu");
  };

  return (
    <div className="main-container">
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="particle"
            initial={{ 
              x: `${particle.x}%`,
              y: "110%",
              opacity: 0.7,
              scale: 0
            }}
            animate={{ 
              y: "-10%",
              opacity: [0.7, 0.3, 0],
              scale: [0, 1, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: particle.duration,
              ease: "linear"
            }}
            onAnimationComplete={() => {
              setParticles(prev => prev.filter(p => p.id !== particle.id));
            }}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: `hsl(${Math.random() * 30 + 10}, 80%, 60%)`,
              borderRadius: "50%",
              position: "absolute",
              left: `${particle.x}%`
            }}
          />
        ))}
      </AnimatePresence>

      <div className="left-side">
        <motion.div 
          className="background-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        
        <motion.div 
          className="logo-container"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.img 
            src={logo} 
            alt="The Smash Room Logo" 
            className="logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
        </motion.div>
      </div>

      <motion.div 
        className="right-side"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="content">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Bienvenido a <br />
            <motion.span 
              className="brand-name"
              animate={{
                textShadow: isHovering 
                  ? "0 0 10px  #facc15, 0 0 20px  #facc15" 
                  : "none"
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              The Smash Room
            </motion.span>
          </motion.h1>

          <motion.p 
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Disfruta el verdadero <br />
            sabor aplastado con presión.
          </motion.p>

          <motion.button
            className="btn menu-btn"
            onClick={handleMenuClick}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 15px rgba(255, 211, 14, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            Ver Menú
            <motion.span 
              className="btn-arrow"
              animate={{
                x: [0, 5, 0],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              →
            </motion.span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;