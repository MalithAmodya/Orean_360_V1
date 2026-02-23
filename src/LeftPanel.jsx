import React from 'react';
import GlassCard from './components/ui/GlassCard';

const LeftPanel = () => {
    return (
        <aside className="left-panel">
            <GlassCard className="interactive">
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Input & Configuration</h2>
                <p style={{ color: 'var(--geo-text-secondary)', fontSize: '0.9rem' }}>
                    Configure your generative engine settings here.
                </p>
            </GlassCard>
        </aside>
    );
};


export default LeftPanel;
