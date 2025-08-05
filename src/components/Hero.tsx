import React, { useState, useEffect } from 'react';
import '../styles/components/_hero.scss';
import topPageBackground from '../assets/images/Top-Page-Background.jpg';
import coffeeMilkyLatte from '../assets/images/Coffee Milky Latte.jpg';
import chocoLatte from '../assets/images/Choco Latte.jpg';
import mangoFrappe from '../assets/images/Mango Frappe.jpg';
import ubeFrappe from '../assets/images/Ube Frappe.jpg';
import chocolateCake from '../assets/images/Chocolate Cake.jpg';
import croissant from '../assets/images/croissant.jpg';
import waffleIceCream from '../assets/images/Waffle Ice cream.jpg';
import waffleCookiesCream from '../assets/images/Waffle Ice cream Cookies and Cream.jpg';

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const coffeeImages = [
    { src: coffeeMilkyLatte, alt: 'Coffee Milky Latte' },
    { src: chocoLatte, alt: 'Chocolate Latte' },
    { src: mangoFrappe, alt: 'Mango Frappe' },
    { src: ubeFrappe, alt: 'Ube Frappe' },
    { src: chocolateCake, alt: 'Chocolate Cake' },
    { src: croissant, alt: 'Croissant' },
    { src: waffleIceCream, alt: 'Waffle Ice Cream' },
    { src: waffleCookiesCream, alt: 'Waffle Ice Cream Cookies and Cream' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === coffeeImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // Switch every 6 seconds

    return () => clearInterval(interval);
  }, [coffeeImages.length]);

  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openMessenger = () => {
    const messengerUrl = 'https://www.facebook.com/messages/t/108856035174485';
    
    // Check if user is on mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // For mobile devices, try to open Messenger app first, fallback to browser
      const messengerAppUrl = `fb-messenger://user/108856035174485`;
      
      // Try to open the app
      window.location.href = messengerAppUrl;
      
      // Fallback to browser after a short delay if app doesn't open
      setTimeout(() => {
        window.open(messengerUrl, '_blank');
      }, 1000);
    } else {
      // For desktop, open in new window
      window.open(messengerUrl, '_blank', 'width=400,height=600');
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero__background">
      <div 
          className="hero__background-image"
        style={{
          backgroundImage: `url(${topPageBackground})`,
        }}
      ></div>
      <div className="hero__overlay"></div>
      </div>
      
        <div className="hero__content">
        <div className="hero__text-section">
                        <div className="hero__badge">
              <span>🏆 Award-Winning Cafe</span>
            </div>
            <h1 className="hero__title">
              <span className="title-line">TIME TO DISCOVER</span>
              <span className="title-line">COFFEE HOUSE</span>
            </h1>
            <p className="hero__description">
              Recognized as the best cafe in Pililla by Restaurant Guru, serving exceptional quality and taste. 
              Experience our signature coffee blends and warm hospitality.
            </p>
            <div className="hero__actions">
              <button className="btn btn-primary" onClick={openMessenger}>
                TESTY COFFEE
              </button>
              <button className="btn btn-secondary" onClick={scrollToMenu}>
                LEARN MORE
              </button>
          </div>
        </div>
        
        <div className="hero__visual-section">
          <div className="hero__coffee-elements">
            <div className="coffee-beans-scatter">
              <div className="coffee-bean coffee-bean--1"></div>
              <div className="coffee-bean coffee-bean--2"></div>
              <div className="coffee-bean coffee-bean--3"></div>
              <div className="coffee-bean coffee-bean--4"></div>
              <div className="coffee-bean coffee-bean--5"></div>
              <div className="coffee-bean coffee-bean--6"></div>
            </div>
            
            
            
            <div className="coffee-bowl">
              <div className="bowl-content">
                <div className="coffee-bean coffee-bean--bowl-1"></div>
                <div className="coffee-bean coffee-bean--bowl-2"></div>
                <div className="coffee-bean coffee-bean--bowl-3"></div>
              </div>
            </div>
            
            <div className="coffee-leaves">
              <div className="coffee-leaf coffee-leaf--1"></div>
              <div className="coffee-leaf coffee-leaf--2"></div>
              <div className="coffee-leaf coffee-leaf--3"></div>
            </div>
            
                          <div className="hero__main-image">
                <img 
                  src={coffeeImages[currentImageIndex].src} 
                  alt={coffeeImages[currentImageIndex].alt}
                  className="coffee-image"
                  key={currentImageIndex}
                />
            </div>
          </div>
        </div>
      </div>
      
      <div className="hero__scroll-indicator">
        <div className="scroll-arrow"></div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
};

export default Hero; 