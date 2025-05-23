import React from 'react';
import './Header.css'; // We'll assume you create this CSS file
import Menu from './Menu';
import './assets/journalAIse_logo.png'; 

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo-container">
        <img src='./assets/journalAIse_logo.png' alt="JournalAIse Logo" className="logo-img" />
        <h1 className="logo-text">JournalAISE</h1>
        <p className="tagline">WHERE JOURNALISM MEETS INTELLIGENCE</p>
      </div>
      <Menu />
      <nav className="navigation">
        <a href="/" className="nav-link">Home</a>
        <a href="/script-assistant" className="nav-link">Script Assistant</a>
        <a href="/audio-transcription" className="nav-link">Audio Transcription</a>
        <a href="/about" className="nav-link">About</a>
      </nav>
    </header>
  );
};

export default Header;
