import React, { useState } from 'react';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import './GEOStudio.css';

const GEOStudio = () => {
  const [formData, setFormData] = useState({
    keyPoints: '',
    platform: 'Instagram',
    tone: 'Professional',
    goal: 'Engagement',
    tags: [],
    advanced: {
      density: 50,
      creativity: 50,
      audience: 'General',
      length: 'Medium'
    }
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

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
