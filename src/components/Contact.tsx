import React from 'react';
import GoogleMapEmbed from './GoogleMapEmbed';
import '../styles/components/_contact.scss';

const Contact: React.FC = () => {
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
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-title">
          <div className="section-title__badge">
            <span>Contact Us</span>
          </div>
          <h2>Get In Touch With Us</h2>
          <p>We'd love to hear from you. Visit us, call us, or explore our locations below.</p>
        </div>
        
        <div className="contact__content">
          <div className="contact__info">
            <div className="contact__header">
              <div className="contact__header-icon">💬</div>
              <h3>Let's Connect</h3>
              <p>Choose your preferred way to reach us</p>
            </div>
            
            <div className="contact__items">
              <div className="contact__item contact__item--primary">
                <div className="contact__icon">📍</div>
                <div className="contact__details">
                  <h4>Visit Our Locations</h4>
                  <div className="contact__addresses">
                    <div className="address">
                      <span className="address__label">TANAY RIZAL:</span>
                      <p>G COMPLEX Sitio Lubigan Sampaloc Rd.<br />
                      Plaza Aldea Tanay Rizal</p>
                    </div>
                    <div className="address">
                      <span className="address__label">PILILLA:</span>
                      <p>915 Manila East Rd Hulo Pililla Rizal<br />
                      Tanay, Philippines, 1910</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="contact__item contact__item--messenger">
                <div className="contact__icon">💬</div>
                <div className="contact__details">
                  <h4>Message Us on Facebook</h4>
                  <p className="contact__messenger">Chat with us instantly</p>
                  <button className="btn btn-messenger" onClick={openMessenger}>
                    <span className="messenger-icon">📱</span>
                    Open Messenger
                  </button>
                </div>
              </div>
              
              <div className="contact__item">
                <div className="contact__icon">📞</div>
                <div className="contact__details">
                  <h4>Call Us</h4>
                  <p className="contact__phone">0962 045 3746</p>
                  <span className="contact__availability">Available during business hours</span>
                </div>
              </div>
              
              <div className="contact__item">
                <div className="contact__icon">✉️</div>
                <div className="contact__details">
                  <h4>Email Us</h4>
                  <p className="contact__email">helloarios@yahoo.com</p>
                  <span className="contact__response">We'll respond within 24 hours</span>
                </div>
              </div>
              
              <div className="contact__item contact__item--service">
                <div className="contact__icon">🌍</div>
                <div className="contact__details">
                  <h4>Service Areas</h4>
                  <div className="service-areas">
                    <span className="service-area">Tanay, Philippines</span>
                    <span className="service-area">Rizal, Philippines</span>
                    <span className="service-area">Jalajala, Philippines</span>
                    <span className="service-area">Baras, Philippines</span>
                    <span className="service-area">Teresa, Philippines</span>
                    <span className="service-area">Morong, Philippines</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact__map-section">
            <div className="contact__item contact__item--hours">
              <div className="contact__icon">🕒</div>
              <div className="contact__details">
                <h4>Opening Hours</h4>
                <div className="opening-hours-list">
                  <div className="hours-item">
                    <span className="day">Sunday</span>
                    <span className="time">8AM - 10PM</span>
                  </div>
                  <div className="hours-item">
                    <span className="day">Monday - Friday</span>
                    <span className="time">8AM - 11PM</span>
                  </div>
                  <div className="hours-item">
                    <span className="day">Saturday</span>
                    <span className="time">8AM - 10PM</span>
                  </div>
                </div>
                <span className="contact__status">We're currently open!</span>
              </div>
            </div>
            
            <div className="contact__map-header">
              <div className="map-header__icon">🗺️</div>
              <h3>Find Us on the Map</h3>
              <p>Click to get directions to our locations</p>
            </div>
            <div className="contact__map">
              <GoogleMapEmbed />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 