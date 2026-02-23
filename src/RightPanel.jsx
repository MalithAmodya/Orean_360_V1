import React from 'react';
import GlassCard from './components/ui/GlassCard';

const RightPanel = () => {
    return (
        <section className="right-panel">
            <GlassCard>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Optimized Variations</h2>
                <p style={{ color: 'var(--geo-text-secondary)', fontSize: '0.9rem' }}>
                    Your generated content will appear here after analysis.
                </p>
            </GlassCard>
        </section>
    );
};


export default RightPanel;
