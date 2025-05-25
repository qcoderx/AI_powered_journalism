// src/pages/AIScriptWriterPage.js
import React, { useState } from 'react';
import './AIScriptWriterPage.css'; // We will create this CSS file next

const AIScriptWriterPage = () => {
  const [topic, setTopic] = useState('');
  const [generatedScript, setGeneratedScript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateScript = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic to generate a script.');
      return;
    }
    setError('');
    setIsLoading(true);
    setGeneratedScript(''); // Clear previous script

**Scene:** News Studio / Vlogger Setup

**Host:** Welcome back to "Insights Today"! The topic that's been buzzing all week, and the one we're diving deep into, is **${topic}**.

**(Intro Music Fades)**

**Host:** So, what exactly is **${topic}**? At its core, it's about [AI elaborates with a brief definition and context]. Many people first encounter **${topic}** through [common example or scenario].

**Expert (via video call or in studio):** Absolutely, and it's fascinating how **${topic}** has evolved. Initially, [historical point if any], but now we're seeing its impact across [mention 2-3 diverse areas]. For instance, in [Area 1], **${topic}** is enabling [specific benefit or change].

**Host:** That’s a great point. We've also received questions from viewers about [common misconception or question about the topic]. What's your take on that?

**Expert:** That's a common query. The reality is [clarification and nuanced explanation]. It's not as simple as [oversimplification]. We need to consider [factor A] and [factor B].

**(Short graphic or B-roll footage related to the topic, if applicable)**

**Host:** Looking ahead, what are the future implications or developments we can expect concerning **${topic}**?

**Expert:** The trajectory is exciting. We're anticipating [future trend 1] and potentially [future trend 2]. However, it also brings challenges like [challenge A] that we need to address proactively.

**Host:** Powerful insights indeed. Thank you, [Expert's Name], for shedding light on **${topic}**. And to our viewers, keep those questions coming! Join us after the break when we discuss [Next Segment Teaser].

**(Outro Music Begins to Swell)**

**Host:** Stay informed, stay curious.

**(End Scene)**`
      );
      setIsLoading(false);
    }, 2500);
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
        />
        <button onClick={handleGenerateScript} disabled={isLoading} className="generate-button tool-button">
          {isLoading ? 'Generating Script...' : 'Generate Script'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>

      {isLoading && (
        <div className="loading-indicator">
          <p>JournalAIse is thinking... Please wait.</p>
          {/* You can add a spinner animation here */}
        </div>
      )}

      {generatedScript && !isLoading && (
        <div className="generated-script-output">
          <h3>Generated Script for: "{topic}"</h3>
          <pre className="script-content">{generatedScript}</pre>
          <button
            onClick={() => navigator.clipboard.writeText(generatedScript)}
            className="tool-button secondary copy-button"
            title="Copy script to clipboard"
          >
            Copy Script
          </button>
        </div>
      )}
    </div>
  );
};

export default AIScriptWriterPage;
