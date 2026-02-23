import React from 'react';
import GlassCard from './components/ui/GlassCard';

const LeftPanel = ({ formData, setFormData, onRun, isAnalyzing }) => {
    return (
        <aside className="left-panel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="section-group">
                {/* A. Generative Engine Optimization Section */}
                <div id="geo-engine-config">
                    {/* Placeholder for Step 12 & 13 */}
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
