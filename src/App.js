import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ScriptAssistantPage from './pages/ScriptAssistantPage';
import AudioTranscriptionPage from './pages/AudioTranscriptionPage';
import AboutPage from './pages/AboutPage';
import './App.css'; // For global styles

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <main className="app-main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/script-assistant" element={<ScriptAssistantPage />} />
            <Route path="/audio-transcription" element={<AudioTranscriptionPage />} />
            <Route path="/about" element={<AboutPage />} />           
            {/* Redirect any unknown routes to homepage */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
