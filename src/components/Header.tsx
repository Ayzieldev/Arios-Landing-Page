import React, { useState, useEffect } from 'react';
import '../styles/components/_header.scss';
import ariosLogo from '../assets/images/Arios Logo.png';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const heroSection = document.getElementById('home');
      
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        // Only show scrolled state when completely out of hero section
        setIsScrolled(scrollTop >= heroHeight);
      } else {
        // Fallback to original behavior if hero section not found
        setIsScrolled(scrollTop > 50);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="container">
        <div className="header__content">
          <div className="header__logo">
            <div className="logo">
              <img src={ariosLogo} alt="Arios Cafe" className="logo__image" />
            </div>
          </div>
          
          <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
            <ul className="nav__list">
              <li className="nav__item">
                <a href="#home" className="nav__link">HOME</a>
              </li>
              <li className="nav__item">
                <a href="#about" className="nav__link">ABOUT</a>
              </li>
              <li className="nav__item">
                <a href="#menu" className="nav__link">MENU</a>
              </li>
              <li className="nav__item">
                <a href="#contact" className="nav__link">CONTACT</a>
              </li>
            </ul>
          </nav>
          
          <div className="header__actions">
            <button className="btn btn-order" onClick={openMessenger}>ORDER NOW</button>
            <button className="btn btn-contact" onClick={scrollToMenu}>CONTACT US</button>
            <button 
              className={`header__menu-toggle ${isMenuOpen ? 'header__menu-toggle--open' : ''}`}
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 