import React from 'react';
import { Sparkles, Copy, Check, ThumbsUp, ThumbsDown, ChevronRight } from 'lucide-react';
import GlassCard from './components/ui/GlassCard';
import ScoreBadge from './components/ui/ScoreBadge';
import BreakdownMetrics from './components/ui/BreakdownMetrics';
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <GlassCard glowColor="rgba(0, 210, 255, 0.15)">
                        <div className="best-variation-header">
                            <div className="best-variation-title">
                                <Sparkles size={24} color="var(--geo-neon-blue)" />
                                <h3>Best Variation</h3>
                                <span className="best-badge">Top Pick</span>
                            </div>
                            <ScoreBadge score={results.best.score} size="md" />
                        </div>


                        <div className="content-preview">
                            <div className="content-text">
                                {results.best.content}
                            </div>
                        </div>

                        <BreakdownMetrics metrics={results.best.breakdown} />

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

                    {/* Alternative Variations */}
                    <div className="alternatives-section">
                        <h3 className="section-title">Alternative Variations</h3>
                        <div className="alternatives-list">
                            {[1, 2].map((alt) => (
                                <GlassCard key={alt} style={{ padding: '1rem', cursor: 'pointer' }}>
                                    <div className="alt-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <ScoreBadge score={85 - alt * 3} size="sm" />
                                            <span style={{ fontWeight: 600, color: 'var(--geo-text-primary)' }}>Variation {alt + 1}</span>
                                        </div>
                                        <ChevronRight size={18} color="var(--geo-text-secondary)" />
                                    </div>
                                    <p style={{ color: 'var(--geo-text-secondary)', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        This is a placeholder for the alternative variation content. It provides a different angle or tone based on the AI generation.
                                    </p>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
};

export default RightPanel;

