import React from 'react';
import './AboutPage.css'; // Assuming you create this CSS file

const AboutPage = () => {
  return (
    <div className="about-container page-container">
      <h2>About JournalAIse</h2>
      <section className="about-content">
        <p>
          JournalAIse is a conceptual web application designed to integrate cutting-edge
          Artificial Intelligence to support and enhance the field of journalism.
          Our mission is to provide journalists with intelligent tools that streamline
          their workflow, improve the quality of their output, and help them adapt
          to the fast-paced digital media landscape.
        </p>
        <p>
          The core features include:
        </p>
        <ul>
          <li><strong>AI Script Assistant:</strong> Offering advanced grammar correction, style suggestions, and even creative assistance for writing compelling scripts.</li>
          <li><strong>Audio-to-Broadcast Text:</strong> A powerful tool to transcribe audio recordings accurately and then refine the text, correcting it for clarity, conciseness, and suitability for broadcasting standards.</li>
        </ul>
        <p>
          JournalAIse aims to be more than just a set of tools; it's envisioned as a
          partner for journalists, helping them to focus on what they do best –
          finding and telling important stories – while the AI handles some of the
          more time-consuming and technical aspects of content creation.
        </p>
        <p className="logo-inspiration">
          The logo, featuring a brain-shaped lightbulb, symbolizes the fusion of
          human intellect and illuminating AI-driven insights. The colors – deep blue
          and vibrant purple – represent trust, intelligence, and innovation.
        </p>
        <p><em>This project was conceived by <b>Lasisi Quadri Toluwalase</b>.</em></p>
      </section>
    </div>
  );
};

export default AboutPage;
