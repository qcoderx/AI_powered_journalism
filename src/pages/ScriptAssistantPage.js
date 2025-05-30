import React, { useState } from 'react';
import './ScriptAssistantPage.css'; // Assuming your CSS file is correctly styled

const ScriptAssistantPage = () => {
  const [scriptText, setScriptText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // It's best practice to store API URLs in environment variables
  // For example, process.env.REACT_APP_API_URL
  // For now, using the provided URL directly.
  const API_BASE_URL = 'https://journalaise-backend.onrender.com';

  const handleAnalyzeScript = async () => {
    if (!scriptText.trim()) {
      setError('Please enter some script text to analyze.');
      return;
    }

    setIsLoading(true);
    setError(''); // Clear previous errors
    setCorrectedText(''); // Clear previous results
    setSuggestions('');   // Clear previous results

    try {
      const response = await fetch(`${API_BASE_URL}/api/correct-script`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: scriptText }),
      });

      if (!response.ok) {
        // Try to parse error response from backend, otherwise use status text
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
      setCorrectedText(data.correctedText || ''); // Ensure it's a string
      setSuggestions(data.suggestions || '');   // Ensure it's a string, handle if null/undefined
    } catch (err) {
      console.error("Failed to analyze script:", err);
      setError(err.message || 'Failed to connect to the AI service. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="script-assistant-container page-container">
      <h2>AI Script Assistant</h2>
      <p>Enter your script below for AI-powered corrections and stylistic suggestions.</p>

      <div className="script-io-layout">
        <div className="script-input-section">
          <h3>Your Script</h3>
          <textarea
            value={scriptText}
            onChange={(e) => setScriptText(e.target.value)}
            placeholder="Paste or type your script here..."
            rows="15"
            className="script-textarea"
            disabled={isLoading}
          />
          <div className="action-buttons">
            <button 
              onClick={handleAnalyzeScript} 
              disabled={isLoading || !scriptText.trim()} 
              className="tool-button"
            >
              {isLoading ? 'Analyzing...' : 'Analyze & Correct Script'}
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="script-output-section">
          {isLoading && (
            <div className="output-box loading-box">
              <p>JournalAIse is thinking...</p>
              {/* Consider adding a visual spinner icon here */}
            </div>
          )}

          {!isLoading && !error && (correctedText || suggestions) && (
            <>
              {correctedText && (
                <div className="output-box">
                  <h4>Corrected Text:</h4>
                  <pre>{correctedText}</pre> {/* Using <pre> to preserve formatting */}
                </div>
              )}
              {suggestions && (
                <div className="output-box suggestions-box">
                  <h4>Suggestions:</h4>
                  <pre>{suggestions}</pre> {/* Using <pre> to preserve formatting */}
                </div>
              )}
            </>
          )}

          {!isLoading && !error && !correctedText && !suggestions && (
             <div className="output-box placeholder-box">
                <p>Your AI feedback will appear here after analysis.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScriptAssistantPage;
