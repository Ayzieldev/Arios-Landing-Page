import React from 'react';
import './styles/main.scss';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LiveChat from './components/LiveChat';
import './fontawesome';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <About />
        <Menu />
        <Contact />
      </main>
      <Footer />
      <LiveChat />
    </div>
  );
}

export default App;
