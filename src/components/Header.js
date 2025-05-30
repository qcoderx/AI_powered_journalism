import React, { useState, useEffect } from 'react';
import './Header.css';
// import logo from '../assets/journalAIse_logo.png'; // Assuming you save your logo in src/assets

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Optional: Close mobile menu if window is resized to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <header className="app-header">
      <div className="header-main-bar"> {/* Added a wrapper for logo and toggle */}
        <div className="logo-container">
          {/* <img src={logo} alt="JournalAIse Logo" className="logo-img" /> */}
          <a href="/" className="logo-link-wrapper"> {/* Make logo clickable to home */}
            <h1 className="logo-text">JournalAIse</h1>
            <p className="tagline">WHERE JOURNALISM MEETS INTELLIGENCE</p>
          </a>
        </div>
        <button 
          className={`menu-toggle ${isMobileMenuOpen ? 'open' : ''}`} 
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
      <nav className={`navigation ${isMobileMenuOpen ? 'nav-open' : ''}`}>
        <a href="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
        <a href="/script-assistant" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Script Assistant</a>
        <a href="/audio-transcription" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Audio Transcription</a>
        <a href="/ai-script-writer" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>AI Script Writer</a>
        <a href="/about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>About</a>
      </nav>
    </header>
  );
};

export default Header;