import React from 'react';
import './Header.css'; // We'll assume you create this CSS file
// You would import your actual logo image here
// import logo from '../assets/journalAIse_logo.png'; // Assuming you save your logo in src/assets

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo-container">
        {/* <img src={logo} alt="JournalAIse Logo" className="logo-img" /> */}
        <h1 className="logo-text">JournalAISE</h1>
        <p className="tagline">WHERE JOURNALISM MEETS INTELLIGENCE</p>
      </div>
      <nav className="navigation">
        <a href="/" className="nav-link">Home</a>
        <a href="/script-assistant" className="nav-link">Script Assistant</a>
        <a href="/audio-transcription" className="nav-link">Audio Transcription</a>
        <a href="/about" className="nav-link">About</a>
        <a href="/profile" className="nav-link nav-link-button">Profile</a>
      </nav>
    </header>
  );
};

export default Header;
