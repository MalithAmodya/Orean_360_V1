import React from 'react';
import { Sparkles } from 'lucide-react';
import GlassCard from './components/ui/GlassCard';
import './LeftPanel.css';

const LeftPanel = ({ formData, setFormData, onRun, isAnalyzing }) => {
    const handleTextChange = (e) => {
        const value = e.target.value;
        if (value.length <= 1000) {
            setFormData({ ...formData, keyPoints: value });
        }
    };

    return (
        <aside className="left-panel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="section-group">
                {/* A. Generative Engine Optimization Section */}
                <div id="geo-engine-config">
                    <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--geo-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Generative Engine Optimization
                    </h3>

                    <GlassCard>
                        <div className="input-group">
                            <label className="input-label">
                                Key Points
                                <button className="ai-icon-btn" title="AI Suggestion">
                                    <Sparkles size={16} />
                                </button>
                            </label>
                            <div className="textarea-wrapper">
                                <textarea
                                    className="geo-textarea"
                                    placeholder="Enter the primary messaging or key points for analysis..."
                                    value={formData.keyPoints}
                                    onChange={handleTextChange}
                                />
                                <span className="char-counter">
                                    {formData.keyPoints.length}/1000
                                </span>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* B. Campaign Settings Section */}
                <div id="campaign-settings-config" style={{ marginTop: '2rem' }}>
                    {/* Placeholder for Step 14 & 15 */}
                </div>

                {/* C. Advanced Options */}
                <div id="advanced-config" style={{ marginTop: '2rem' }}>
                    {/* Placeholder for Step 16 */}
                </div>
            </div>

            {/* D. Run Action Area */}
            <div className="action-area" style={{ marginTop: 'auto' }}>
                {/* Placeholder for Step 18 */}
            </div>
        </aside>
    );
};



export default LeftPanel;
