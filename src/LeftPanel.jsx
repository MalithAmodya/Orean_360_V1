import React, { useState } from 'react';
import { Sparkles, Upload, X, FileText, Image as ImageIcon } from 'lucide-react';
import GlassCard from './components/ui/GlassCard';
import './LeftPanel.css';

const LeftPanel = ({ formData, setFormData, onRun, isAnalyzing }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleTextChange = (e) => {
        const value = e.target.value;
        if (value.length <= 1000) {
            setFormData({ ...formData, keyPoints: value });
        }
    };

    const handleFileChange = (file) => {
        if (file) {
            // Basic validation
            const validTypes = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'];
            if (validTypes.includes(file.type)) {
                setFormData({ ...formData, attachedFile: file });
            } else {
                alert('Please upload a valid file (Image, PDF, or TXT)');
            }
        }
    };

    const onDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = () => {
        setIsDragging(false);
    };

    const onDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFileChange(file);
    };

    const removeFile = () => {
        setFormData({ ...formData, attachedFile: null });
    };

    return (
        <aside className="left-panel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="section-group">
                {/* A. Generative Engine Optimization Section */}
                <div id="geo-engine-config">
                    <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--geo-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Generative Engine Optimization
                    </h3>

                    <GlassCard style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Attached Media Upload */}
                        <div className="input-group">
                            <label className="input-label">Attached Media</label>
                            {!formData.attachedFile ? (
                                <div
                                    className={`upload-dropzone ${isDragging ? 'dragging' : ''}`}
                                    onDragOver={onDragOver}
                                    onDragLeave={onDragLeave}
                                    onDrop={onDrop}
                                >
                                    <input
                                        type="file"
                                        id="file-upload"
                                        hidden
                                        onChange={(e) => handleFileChange(e.target.files[0])}
                                    />
                                    <label htmlFor="file-upload" className="upload-content">
                                        <Upload size={24} className="upload-icon" />
                                        <div className="upload-text">
                                            <span className="primary-text">Click to upload or drag & drop</span>
                                            <span className="secondary-text">PDF, TXT, PNG, or JPG (max 10MB)</span>
                                        </div>
                                    </label>
                                </div>
                            ) : (
                                <div className="file-preview-card">
                                    <div className="file-info">
                                        {formData.attachedFile.type.startsWith('image/') ? (
                                            <ImageIcon size={20} className="file-icon" />
                                        ) : (
                                            <FileText size={20} className="file-icon" />
                                        )}
                                        <div className="file-details">
                                            <span className="file-name">{formData.attachedFile.name}</span>
                                            <span className="file-size">{(formData.attachedFile.size / 1024).toFixed(1)} KB</span>
                                        </div>
                                    </div>
                                    <button className="remove-file-btn" onClick={removeFile}>
                                        <X size={16} />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Key Points Textarea */}
                        <div className="input-group" style={{ marginBottom: 0 }}>
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
                    <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--geo-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Campaign Settings
                    </h3>
                    <GlassCard shadow="lg">
                        <div className="settings-grid">
                            <div className="input-group">
                                <label className="input-label">Target Platform</label>
                                <select
                                    className="geo-select"
                                    value={formData.platform}
                                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                                >
                                    <option value="Instagram">Instagram</option>
                                    <option value="LinkedIn">LinkedIn</option>
                                    <option value="Twitter/X">Twitter/X</option>
                                    <option value="Blog">Blog</option>
                                    <option value="YouTube">YouTube</option>
                                    <option value="Facebook">Facebook</option>
                                </select>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Tone</label>
                                <select
                                    className="geo-select"
                                    value={formData.tone}
                                    onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                                >
                                    <option value="Professional">Professional</option>
                                    <option value="Friendly">Friendly</option>
                                    <option value="Humorous">Humorous</option>
                                    <option value="Persuasive">Persuasive</option>
                                    <option value="Technical">Technical</option>
                                    <option value="Inspirational">Inspirational</option>
                                </select>
                            </div>

                            <div className="input-group" style={{ gridColumn: 'span 2' }}>
                                <label className="input-label">Primary Goal</label>
                                <select
                                    className="geo-select"
                                    value={formData.goal}
                                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                                >
                                    <option value="Brand Awareness">Brand Awareness</option>
                                    <option value="Engagement">Engagement</option>
                                    <option value="Lead Generation">Lead Generation</option>
                                    <option value="Conversion">Conversion</option>
                                    <option value="Informative">Informative</option>
                                </select>
                            </div>
                        </div>
                    </GlassCard>
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
