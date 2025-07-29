import React from 'react';
import '../styles/components/_about.scss';
import awardWinningIcon from '../assets/images/Award-WInning-Icon.png'; 
import 'aos/dist/aos.css';
// @ts-ignore
import AOS from 'aos';



const About: React.FC = () => {
  AOS.init({
    duration: 800, // animation duration in ms
    once: true,    // whether animation should happen only once
  });
  return (
    <section id="about" className="about" >
      <div className="container" data-aos="fade-up" data-aos-delay="100" data-aos-offset="100">
        <div className="about__content">
          <div className="about__image">
            <div className="about__image-container">
              <div className="about__image-bg"></div>
              <div className="about__image-main">
                <div className="award-icon">
                  <a 
                    href="https://restaurantguru.com/Arios-Cafe-Pililla" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title="View Arios Cafe on Restaurant Guru"
                  >
                    <img src={awardWinningIcon} alt="Award Winning" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="about__text" data-aos="fade-up" data-aos-delay="100" data-aos-offset="100">
            <div className="about__badge">
              <span className="about__badge-text">About Arios Cafe</span>
            </div>
            <h2 className="about__title">
              Crafting Perfect Moments Since 2019
            </h2>
            <p className="about__description">
              At Arios Cafe, we believe that every meal should be an experience to remember. 
              Our journey began with a simple passion for creating delicious food and providing 
              a warm, welcoming atmosphere where friends and families can gather.
            </p>
            
            <div className="about__features">
              <div className="feature">
                <div className="feature__icon">🌟</div>
                <div className="feature__content">
                  <h4>Premium Quality</h4>
                  <p>We source only the finest ingredients to ensure exceptional taste and quality.</p>
                </div>
              </div>
              
              <div className="feature">
                <div className="feature__icon">🏆</div>
                <div className="feature__content">
                  <h4>Award-Winning Cafe</h4>
                  <p>Recognized as the best cafe in Pililla by Restaurant Guru, serving exceptional quality and taste.</p>
                </div>
              </div>
              
              <div className="feature">
                <div className="feature__icon">🌱</div>
                <div className="feature__content">
                  <h4>Fresh & Local</h4>
                  <p>We prioritize fresh, locally-sourced ingredients for better taste and sustainability.</p>
                </div>
              </div>
            </div>
            
            <div className="about__stats">
              <div className="stat">
                <span className="stat__number">5+</span>
                <span className="stat__label">Years of Excellence</span>
              </div>
              <div className="stat">
                <span className="stat__number">1000+</span>
                <span className="stat__label">Happy Customers</span>
              </div>
              <div className="stat">
                <span className="stat__number">50+</span>
                <span className="stat__label">Menu Items</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 