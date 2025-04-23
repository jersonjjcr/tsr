import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';
import burgerImage from '../assets/burguer.png';
import drinkImage from '../assets/bb.png';

const Menu = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const menuData = {
    'Hamburguesas Smash': [
      { name: 'Clásica Smash', price: '$8.99', desc: 'Carne 100% res, queso americano, cebolla caramelizada, salsa especial' },
      { name: 'Doble Impacto', price: '$12.99', desc: 'Doble carne, doble queso, tocino crujiente, aros de cebolla' },
      { name: 'Picante Inferno', price: '$10.99', desc: 'Carne sazonada, jalapeños, queso pepper jack, salsa chipotle' }
    ],
    'Acompañamientos': [
      { name: 'Papas Smash', price: '$4.99', desc: 'Crujientes papas con piel, sazonadas con nuestra mezcla secreta' },
      { name: 'Aros de Cebolla', price: '$5.49', desc: 'Aros de cebolla empanizados, acompañados de salsa BBQ ahumada' },
      { name: 'Nuggets de Pollo', price: '$6.99', desc: 'Crujientes nuggets de pechuga de pollo, 10 piezas' }
    ],
    'Bebidas': [
      { name: 'Refrescos Artesanales', price: '$3.50', desc: 'Variedad de sabores: cola, limón, naranja, toronja' },
      { name: 'Cervezas Locales', price: '$5.99', desc: 'Selección de las mejores cervezas artesanales de la región' },
      { name: 'Batidos Smash', price: '$4.99', desc: 'Batidos cremosos de vainilla, chocolate o fresa' }
    ]
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="menu-page-wrapper">
      {/* Imágenes de fondo difuminadas */}
      <div className="background-images">
        <img src={burgerImage} alt="Hamburguesas" className="background-image left" />
        <img src={drinkImage} alt="Bebidas" className="background-image right" />
      </div>

      <div className={`menu-container ${isLoaded ? 'loaded' : ''}`}>
        <button 
          className="back-button" 
          onClick={() => navigate('/')}
          onMouseEnter={(e) => e.target.classList.add('hovered')}
          onMouseLeave={(e) => e.target.classList.remove('hovered')}
        >
          ← Volver al Inicio
        </button>

        <div className="title-container">
          <h1 className="main-title">
            <span className="title-word title-word-1">NUESTRO</span>
            <span className="title-word title-word-2">MENÚ</span>
            <span className="title-word title-word-3">SMASH</span>
          </h1>
        </div>

        <div className="menu-sections">
          {Object.entries(menuData).map(([section, items]) => (
            <div 
              key={section} 
              className={`menu-section ${activeSection === section ? 'active' : ''}`}
              onClick={() => toggleSection(section)}
            >
              <h2 className="menu-title">
                {section}
                <span className="toggle-icon">{activeSection === section ? '−' : '+'}</span>
              </h2>
              
              {activeSection === section && (
                <div className="menu-items-container">
                  {items.map((item, index) => (
                    <div 
                      key={index} 
                      className="menu-item"
                      style={{ transitionDelay: `${index * 0.1}s` }}
                    >
                      <div className="item-header">
                        <span className="item-name">{item.name}</span>
                      </div>
                      <span className="item-price">{item.price}</span>
                      <p className="item-desc">{item.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="special-offer">
          <p>¡Pide 2 hamburguesas y lleva papas gratis!</p>
          <div className="offer-badge">OFERTA</div>
        </div>
      </div>
    </div>
  );
};

export default Menu;