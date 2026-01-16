import React, { useState } from 'react'

const CredibilityBot = ({ postContent, onClose }) => {
    const [analysis, setAnalysis] = useState(null)
    const [loading, setLoading] = useState(false)

    // Heuristics Logic
    const analyzeCredibility = () => {
        setLoading(true)
        setTimeout(() => {
            const text = (postContent || '').toLowerCase()
            let score = 50 // Base score
            const tips = []

            // check for length
            if (postContent && postContent.length > 200) {
                score += 20
            } else if (!postContent || postContent.length < 50) {
                score -= 10
                tips.push("It's a bit short. More detail usually adds credibility.")
            }

            // Check for specific timestamps/dates
            const timePatterns = [/\d{1,2}:\d{2}/, /monday|tuesday|wednesday|thursday|friday|saturday|sunday/, /jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/]
            if (timePatterns.some(p => p.test(text))) {
                score += 15
            } else {
                tips.push("Mentioning specific dates or times helps verify the story.")
            }

            // Check for "I statements" vs objective facts
            if (text.includes("i saw") || text.includes("he said") || text.includes("she said")) {
                score += 10
            }

            // Cap score
            score = Math.min(Math.max(score, 0), 100)

            let verdict = "Neutral"
            if (score > 80) verdict = "Highly Credible 🌟"
            else if (score > 60) verdict = "Likely Credible ✅"
            else if (score < 40) verdict = "Needs More Detail 📉"

            setAnalysis({ score, verdict, tips })
            setLoading(false)
        }, 1500) // Fake "thinking" delay
    }

    return (
        <div className="fade-in" style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '320px',
            background: 'white',
            borderRadius: '1rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            border: '1px solid rgba(219, 39, 119, 0.2)',
            zIndex: 1000,
            overflow: 'hidden',
            fontFamily: "'Outfit', sans-serif"
        }}>
            {/* Header */}
            <div style={{
                background: 'linear-gradient(135deg, #f472b6, #db2777)',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'white'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ fontSize: '1.5rem', background: 'white', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🦉</div>
                    <div style={{ fontWeight: 600 }}>Justice Jr.</div>
                </div>
                <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer' }}>×</button>
            </div>

            {/* Content */}
            <div style={{ padding: '1.5rem' }}>
                {!analysis ? (
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ color: '#4a102e', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                            Hi! I can help you evaluate how credible this post looks based on details and structure.
                        </p>
                        {loading ? (
                            <div className="loader-ring" style={{ width: '30px', height: '30px', margin: '0 auto', border: '3px solid #fce7f3', borderTopColor: '#db2777', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                        ) : (
                            <button className="btn-primary" onClick={analyzeCredibility} style={{ width: '100%' }}>
                                Analyze This Post 🔍
                            </button>
                        )}
                        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    </div>
                ) : (
                    <div className="fade-in">
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#db2777' }}>{analysis.score}</div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#831843', textTransform: 'uppercase' }}>Trust Score</div>
                            <div style={{ marginTop: '0.5rem', fontSize: '1.1rem', fontWeight: 500 }}>{analysis.verdict}</div>
                        </div>

                        {analysis.tips.length > 0 && (
                            <div style={{ background: '#fdf2f8', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.85rem' }}>
                                <strong style={{ color: '#db2777', display: 'block', marginBottom: '0.5rem' }}>💡 Improvement Tips:</strong>
                                <ul style={{ paddingLeft: '1.2rem', margin: 0, color: '#4a102e' }}>
                                    {analysis.tips.map((tip, i) => (
                                        <li key={i} style={{ marginBottom: '0.3rem' }}>{tip}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button
                            onClick={() => setAnalysis(null)}
                            style={{
                                width: '100%',
                                marginTop: '1.5rem',
                                padding: '0.8rem',
                                background: 'transparent',
                                border: '1px solid #db2777',
                                color: '#db2777',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                fontWeight: 600
                            }}>
                            Check Another
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CredibilityBot