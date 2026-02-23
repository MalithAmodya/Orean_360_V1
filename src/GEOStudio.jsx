import React, { useState, useEffect } from 'react';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import './GEOStudio.css';

const loadingMessages = [
  "Analyzing keyword density...",
  "Evaluating semantic relevance...",
  "Checking competitor overlap...",
  "Optimizing for search intent...",
  "Finalizing generative scores..."
];

const GEOStudio = () => {
  const [formData, setFormData] = useState({
    keyPoints: '',
    platform: 'Instagram',
    tone: 'Professional',
    goal: 'Engagement',
    tags: [],
    attachedFile: null,
    advanced: {
      density: 50,
      creativity: 50,
      audience: 'General',
      length: 'Medium'
    }
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingText, setLoadingText] = useState(loadingMessages[0]);
  const [results, setResults] = useState(null);

  // Animate loading messages (Step 19)
  useEffect(() => {
    let interval;
    if (isAnalyzing) {
      let msgIndex = 0;
      interval = setInterval(() => {
        msgIndex = (msgIndex + 1) % loadingMessages.length;
        setLoadingText(loadingMessages[msgIndex]);
      }, 800);
    } else {
      setLoadingText(loadingMessages[0]);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);


  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    // Simulation of GEO Analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setResults({
        best: {
          score: 92,
          content: "Optimized content goes here...",
          breakdown: { seo: 95, engagement: 90, readability: 88, platform: 92 }
        },
        alternatives: []
      });
    }, 3000);
  };

  return (
    <div className="geo-studio-container">
      <header className="geo-studio-header">
        <h1>GEO Studio</h1>
        <p style={{ color: 'var(--geo-text-secondary)', marginTop: '0.5rem' }}>
          Input & Configuration for Generative Engine Optimization
        </p>
      </header>
      <main className="geo-studio-main">

        <LeftPanel
          formData={formData}
          setFormData={setFormData}
          onRun={handleRunAnalysis}
          isAnalyzing={isAnalyzing}
        />
        <RightPanel
          results={results}
          isAnalyzing={isAnalyzing}
        />
      </main>
    </div>
  );
};

export default GEOStudio;
