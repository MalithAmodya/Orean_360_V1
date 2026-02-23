import React from 'react';
import { Sparkles, Copy, Check, ThumbsUp, ThumbsDown } from 'lucide-react';
import GlassCard from './components/ui/GlassCard';
import './RightPanel.css';

const RightPanel = ({ results, isAnalyzing }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        if (results?.best?.content) {
            navigator.clipboard.writeText(results.best.content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!results && !isAnalyzing) {
        return (
            <section className="right-panel">
                <div className="results-placeholder">
                    <div className="placeholder-content">
                        <Sparkles size={48} className="placeholder-icon" />
                        <h2>Ready to Optimize</h2>
                        <p>Configure your content settings and run the analysis to see AI-generated variations here.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="right-panel">
            {/* Best Variation Card */}
            {results?.best && (
                <GlassCard glowColor="rgba(0, 210, 255, 0.15)">
                    <div className="best-variation-header">
                        <div className="best-variation-title">
                            <Sparkles size={24} color="var(--geo-neon-blue)" />
                            <h3>Best Variation</h3>
                            <span className="best-badge">Top Pick</span>
                        </div>
                    </div>

                    <div className="content-preview">
                        <div className="content-text">
                            {results.best.content}
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button className="icon-btn" onClick={handleCopy} title="Copy to Clipboard">
                            {copied ? <Check size={18} color="var(--geo-neon-blue)" /> : <Copy size={18} />}
                        </button>
                        <button className="icon-btn" title="Good Result">
                            <ThumbsUp size={18} />
                        </button>
                        <button className="icon-btn" title="Bad Result">
                            <ThumbsDown size={18} />
                        </button>
                    </div>
                </GlassCard>
            )}
        </section>
    );
};

export default RightPanel;

