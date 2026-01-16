import React from 'react'
import { useCase } from '../context/CaseContext'
import { calculateEvidenceScore } from '../logic/evidenceCheck'
import { extractTimeline, extractActors } from '../logic/extractTimeline'

const EvidenceResult = () => {
    const { caseData, updateCase, nextStep } = useCase()
    const [score, setScore] = React.useState(0)
    const [timeline, setTimeline] = React.useState([])
    const [actors, setActors] = React.useState([])

    React.useEffect(() => {
        const calculatedScore = calculateEvidenceScore(caseData.description)
        const extractedTimeline = extractTimeline(caseData.description)
        const extractedActors = extractActors(caseData.description)

        setScore(calculatedScore)
        setTimeline(extractedTimeline)
        setActors(extractedActors)

        updateCase({
            evidenceScore: calculatedScore,
            timeline: extractedTimeline,
            actors: extractedActors
        })
    }, [caseData.description])

    return (
        <div className="page-container">
            <div className="container">
                <div className="card glass fade-in" style={{ padding: '3rem' }}>
                    <h2>Evidence & Readiness Assessment</h2>

                    <div className="readiness-card" style={{ padding: '2rem', background: 'rgba(255, 255, 255, 0.5)', borderRadius: '1rem', border: '1px solid rgba(74, 16, 46, 0.1)', margin: '2rem 0', textAlign: 'center' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '0.9rem', color: '#831843', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Readiness</div>
                            <div style={{ fontSize: '3rem', fontWeight: 700, color: '#db2777', margin: '0.5rem 0' }}>{score}%</div>
                        </div>
                        <div style={{ height: '12px', background: 'rgba(0, 0, 0, 0.05)', borderRadius: '6px', overflow: 'hidden', maxWidth: '400px', margin: '0 auto' }}>
                            <div style={{ width: `${score}%`, height: '100%', background: 'linear-gradient(135deg, #f472b6 0%, #db2777 100%)', transition: 'width 1.5s ease-out' }}></div>
                        </div>
                    </div>

                    <div className="structured-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        <div className="structured-card glass" style={{ padding: '1.5rem' }}>
                            <h3 style={{ color: '#831843' }}>Extracted Timeline</h3>
                            <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
                                {timeline.map((item, i) => (
                                    <li key={i} style={{ fontSize: '0.9rem', marginBottom: '0.8rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.5rem' }}>
                                        <strong>{item.time}:</strong> {item.activity}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="structured-card glass" style={{ padding: '1.5rem' }}>
                            <h3 style={{ color: '#831843' }}>Key Individuals</h3>
                            <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
                                {actors.map((actor, i) => (
                                    <li key={i} style={{ display: 'inline-block', background: '#fce7f3', padding: '0.3rem 0.8rem', borderRadius: '1rem', margin: '0.3rem', fontSize: '0.85rem' }}>
                                        {actor}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <button className="btn-primary" style={{ marginTop: '3rem' }} onClick={() => nextStep('legal')}>
                        View Legal Roadmap
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EvidenceResult