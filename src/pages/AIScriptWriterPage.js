import React, { useState } from 'react';
import './AIScriptWriterPage.css'; // Ensure this CSS file is created and styled

const AIScriptWriterPage = () => {
  const [topic, setTopic] = useState('');
  const [generatedScript, setGeneratedScript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // It's best practice to store API URLs in environment variables
  // e.g., process.env.REACT_APP_API_URL
  // For now, using the provided URL directly.
  const API_BASE_URL = 'https://journalaise-backend.onrender.com';

  const handleGenerateScript = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic to generate a script.');
      return;
    }
    setError('');
    setIsLoading(true);
    setGeneratedScript(''); // Clear previous script

    try {
      const response = await fetch(`${API_BASE_URL}/api/generate-script`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: topic.trim() }), // Send trimmed topic
      });

      if (!response.ok) {
        let errorMessage = `Error: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorData.error || errorMessage;
        } catch (e) {
          // Could not parse JSON, stick with status text
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setGeneratedScript(data.script || ''); // Ensure it's a string
    } catch (err) {
      console.error("Failed to generate script:", err);
      setError(err.message || 'Failed to connect to the AI service. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-script-writer-container page-container">
      <h2>AI Script Writer</h2>
      <p className="page-description">
        Need a starting point for your next segment? Enter a topic below, and JournalAIse
        will generate a foundational script to get you started.
      </p>

      <div className="script-writer-form">
        <label htmlFor="topic-input" className="form-label">Your Topic:</label>
        <input
          type="text"
          id="topic-input"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., The Future of Renewable Energy, Impact of Social Media on Youth"
          className="topic-input-field"
          disabled={isLoading}
        />
        <button
          onClick={handleGenerateScript}
          disabled={isLoading || !topic.trim()}
          className="generate-button tool-button"
        >
          {isLoading ? 'Generating Script...' : 'Generate Script'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>

      {isLoading && (
        <div className="loading-indicator">
          <p>JournalAIse is thinking... Please wait.</p>
          {/* Optional: Add a spinner visual element here */}
        </div>
      )}

      {!isLoading && !error && generatedScript && (
        <div className="generated-script-output">
          <h3>Generated Script for: "{topic}"</h3>
          {/* Using a key on <pre> can help React re-render it if topic changes,
              though it might not be strictly necessary if generatedScript always updates.
              It's more impactful if the content of the pre itself was editable or had internal state.
          */}
          <pre className="script-content" key={topic + generatedScript}>
            {generatedScript}
          </pre>
          <button
            onClick={() => {
              // Using document.execCommand for broader compatibility in iframes
              const textarea = document.createElement('textarea');
              textarea.value = generatedScript;
              document.body.appendChild(textarea);
              textarea.select();
              try {
                document.execCommand('copy');
                alert('Script copied to clipboard!'); // Replace with a custom notification if possible
              } catch (err) {
                console.error('Failed to copy script: ', err);
                alert('Failed to copy script. Please try manually.'); // Replace with custom notification
              }
              document.body.removeChild(textarea);
            }}
            className="tool-button secondary copy-button"
            title="Copy script to clipboard"
          >
            Copy Script
          </button>
        </div>
      )}
      
      {!isLoading && !error && !generatedScript && (
         <div className="output-box placeholder-box" style={{textAlign: 'center', marginTop: '20px'}}>
            <p>Your AI-generated script will appear here.</p>
         </div>
      )}

    </div>
  );
};

export default AIScriptWriterPage;
