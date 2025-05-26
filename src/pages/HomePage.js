// src/pages/HomePage.js
import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom'; // Assuming you'll use React Router

const HomePage = () => {
  return (
    <div className="homepage-container page-container">
      <section className="hero-section">
        <h2>Welcome to JournalAIse</h2>
        <p className="subtitle">Empowering Journalists with Artificial Intelligence.</p>
        <p>Streamline your workflow, enhance your writing, transform audio, and generate topic-based scripts with our suite of AI-powered tools.</p>
        <div className="hero-cta-buttons">
          <Link to="/script-assistant" className="cta-button primary-cta">
            Go to Script Assistant
          </Link>
          <Link to="/audio-transcription" className="cta-button secondary-cta">
            Try Audio Transcription
          </Link>
          {/* New Button Added Below */}
          <Link to="/ai-script-writer" className="cta-button tertiary-cta">
            Generate AI Script
          </Link>
        </div>
      </section>

      <section className="features-overview">
        <h3>Key Features</h3>
        <div className="features-grid">
          <div className="feature-card">
            <h4>AI Script Assistance</h4>
            <p>Get help with grammar, style, and generating script ideas.</p>
          </div>
          <div className="feature-card">
            <h4>Audio to Broadcast Text</h4>
            <p>Transcribe audio recordings and automatically correct them for broadcasting.</p>
          </div>
          {/* New Feature Card Added Below */}
          <div className="feature-card">
            <h4>AI Script Writer</h4>
            <p>Provide a topic and let our AI generate a foundational script for you.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
