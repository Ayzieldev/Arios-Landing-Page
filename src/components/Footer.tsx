import React from 'react';
import '../styles/components/_footer.scss';
import ariosLogo from '../assets/images/Arios Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__section">
            <div className="footer__logo">
              <div className="logo">
                <img src={ariosLogo} alt="Arios Cafe" className="logo__image" />
              </div>
            </div>
            <p className="footer__description">
              Experience the perfect blend of taste and comfort at Arios Cafe. 
              We bring you the finest culinary delights in a warm, welcoming atmosphere.
            </p>
            <div className="footer__social">
              <a href="https://facebook.com" className="social-link"><FontAwesomeIcon icon={['fab', 'facebook']} /></a>
              <a href="https://instagram.com" className="social-link"><FontAwesomeIcon icon={['fab', 'instagram']} /></a>
              <a href="https://twitter.com" className="social-link"><FontAwesomeIcon icon={['fab', 'x-twitter']} /></a>
              <a href="https://youtube.com" className="social-link"><FontAwesomeIcon icon={['fab', 'youtube']} /></a>
            </div>
          </div>
          
          <div className="footer__section">
            <h4 className="footer__title">Quick Links</h4>
            <ul className="footer__links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer__section">
            <h4 className="footer__title">Our Services</h4>
            <ul className="footer__links">
              <li>Dine-in Experience</li>
              <li>Takeaway Orders</li>
              <li>Catering Services</li>
              <li>Private Events</li>
              <li>Online Delivery</li>
            </ul>
          </div>
          
          <div className="footer__section">
            <h4 className="footer__title">Contact Info</h4>
            <div className="footer__contact">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>123 Cafe Street, Downtown District</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <span>info@arioscafe.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer__bottom">
          <div className="footer__copyright">
            <p>&copy; 2024 Arios Cafe. All rights reserved.</p>
          </div>
          <div className="footer__legal">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 