
import React, { useState } from 'react'
import { useCase } from '../context/CaseContext'
import knowledgeBase from '../data/legalKnowledgeBase.json'

const LegalFlow = () => {
    const { nextStep, caseData } = useCase()
    const { structuredEvidence } = caseData
    const [expandedCard, setExpandedCard] = useState(null)

    // Identify if the user is in a high-risk situation
    const crisisProcedures = knowledgeBase.procedures.filter(p => p.isCrisis && p.validContexts.includes(structuredEvidence.context))
    const showCrisisBanner = crisisProcedures.length > 0

    // Calculates how many requirements are met for a procedure
    const checkReadiness = (procedure) => {
        if (!procedure.requiredInfo || procedure.requiredInfo.length === 0) return 100

        const met = procedure.requiredInfo.filter(req =>
            structuredEvidence[req] && structuredEvidence[req].length > 5
        )
        return Math.round((met.length / procedure.requiredInfo.length) * 100)
    }

    const toggleExpand = (id) => {
        setExpandedCard(expandedCard === id ? null : id)
    }

    return (
        <div className="page-container">
            <div className="container">
                {showCrisisBanner && (
                    <div className="fade-in" style={{ background: '#7f1d1d', color: 'white', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '5px solid #ef4444' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '1.5rem' }}>⚠️</span>
                            <div>
                                <h3 style={{ margin: 0, color: 'white' }}>{knowledgeBase.crisisResources.title}</h3>
                                <p style={{ margin: 0, opacity: 0.9 }}>{knowledgeBase.crisisResources.description}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            {knowledgeBase.crisisResources.hotlines.map(hotline => (
                                <a key={hotline.name} href={`tel:${hotline.number.replace(/\D/g, '')}`} style={{ background: 'white', color: '#b91c1c', padding: '0.5rem 1rem', borderRadius: '2rem', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    📞 {hotline.name}: {hotline.number}
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                <div className="title-area fade-in" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1>Your Legal Pathways</h1>
                    <p style={{ fontSize: '1.2rem', color: '#831843' }}>Based on the evidence you've gathered, here is your readiness for different legal options.</p>
                </div>

                <div className="feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                    {knowledgeBase.procedures.filter(proc =>
                        !proc.validContexts ||
                        !structuredEvidence.context ||
                        proc.validContexts.includes(structuredEvidence.context)
                    ).map((proc) => {
                        const readiness = checkReadiness(proc)
                        const readyColor = readiness === 100 ? '#10b981' : readiness > 50 ? '#f59e0b' : '#ef4444'
                        const isExpanded = expandedCard === proc.id
                        const isCrisis = proc.isCrisis

                        return (
                            <div key={proc.id} className="feature-card glass" style={{
                                padding: '2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                transform: isExpanded ? 'scale(1.02)' : 'scale(1)',
                                border: isExpanded ? '1px solid #db2777' : isCrisis ? '1px solid #fecaca' : '1px solid rgba(255, 255, 255, 0.2)',
                                background: isCrisis ? 'rgba(254, 226, 226, 0.4)' : undefined
                            }} onClick={() => toggleExpand(proc.id)}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {isCrisis && '🛡️'} {proc.title}
                                    </h3>
                                    <div style={{ background: readyColor, color: 'white', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 700 }}>
                                        {readiness}% Ready
                                    </div>
                                </div>

                                <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>{proc.description}</p>

                                <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {proc.references && proc.references.map((ref, idx) => (
                                        <a key={idx} href={ref.url} target="_blank" rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()} // Prevent card toggle
                                            style={{ fontSize: '0.75rem', background: 'rgba(74, 16, 46, 0.1)', color: '#4a102e', padding: '0.2rem 0.6rem', borderRadius: '0.5rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                            <span>🔗</span> {ref.title}
                                        </a>
                                    ))}
                                </div>

                                {isExpanded ? (
                                    <div style={{ animation: 'fadeIn 0.4s ease' }}>
                                        <h4 style={{ fontSize: '0.9rem', color: '#831843', marginBottom: '0.8rem', marginTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '1rem' }}>Step-by-Step Procedure:</h4>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '1.5rem' }}>
                                            {proc.steps.map(step => {
                                                const isStepReady = step.requiredInfo.every(req => structuredEvidence[req] && structuredEvidence[req].length > 5)
                                                return (
                                                    <li key={step.id} style={{ fontSize: '0.85rem', marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', opacity: isStepReady ? 1 : 0.8 }}>
                                                        <span style={{ color: isStepReady ? '#10b981' : '#ccc', marginTop: '2px' }}>{isStepReady ? '✓' : '○'}</span>
                                                        <div>
                                                            <strong style={{ display: 'block', marginBottom: '0.2rem' }}>{step.title}</strong>
                                                            <div style={{ fontSize: '0.8rem', color: '#666', lineHeight: '1.4' }}>{step.description}</div>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                ) : (
                                    <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#db2777', marginTop: 'auto', fontWeight: 600 }}>
                                        Tap to view details ▼
                                    </div>
                                )}

                                {readiness < 100 && isExpanded && (
                                    <div style={{ background: 'rgba(219, 39, 119, 0.05)', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
                                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#db2777', marginBottom: '0.5rem' }}>Missing Key Info:</div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            {proc.steps.flatMap(s => s.requiredInfo).filter(req => !structuredEvidence[req]).map(req => (
                                                <span key={req} style={{ fontSize: '0.75rem', background: 'white', border: '1px solid #f9a8d4', padding: '0.2rem 0.6rem', borderRadius: '1rem' }}>
                                                    {req.replace('_', ' ')}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <button className="btn-secondary" onClick={() => nextStep('home')}>
                        Back to Home
                    </button>
                    <button className="btn-primary" style={{ marginLeft: '1rem' }} onClick={() => nextStep('input')}>
                        Adding Missing Info
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LegalFlow
