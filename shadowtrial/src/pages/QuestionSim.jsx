import React, { useEffect, useState } from 'react'
import { useCase } from '../context/CaseContext'

const QuestionSim = () => {
    const { caseData, nextStep } = useCase()
    const [loading, setLoading] = useState(true)
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        const timer = setTimeout(() => {
            const generated = [
                "Exactly what time did this occur, and were there any witnesses?",
                "Were there any prior incidents involving the same individuals?",
                "Did you report this to anyone informally at the time?"
            ];

            if (caseData.description.toLowerCase().includes('email') || caseData.description.toLowerCase().includes('message')) {
                generated.push("Can you provide the specific date and timestamp of the digital communication?");
            }

            setQuestions(generated);
            setLoading(false);
        }, 2000)
        return () => clearTimeout(timer)
    }, [caseData.description])

    if (loading) {
        return (
            <div className="page-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div className="loader-ring" style={{ width: '50px', height: '50px', border: '5px solid #fce7f3', borderTopColor: '#db2777', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                <p style={{ marginTop: '1.5rem', color: '#831843', fontWeight: 500 }}>Analyzing narrative for potential inquiry points...</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        )
    }

    return (
        <div className="page-container">
            <div className="container">
                <div className="card glass fade-in" style={{ padding: '3rem' }}>
                    <h2>Simulated Inquiry Questions</h2>
                    <p style={{ marginBottom: '2rem', color: '#831843' }}>During a formal reporting process, you may be asked the following questions. Practice answering them privately below.</p>

                    <div className="questions-list">
                        {questions.map((q, i) => (
                            <div key={i} className="question-item glass" style={{ padding: '1.5rem', marginBottom: '1.5rem', background: 'rgba(131, 24, 67, 0.03)', border: '1px solid rgba(131, 24, 67, 0.1)' }}>
                                <div style={{ fontWeight: 600, marginBottom: '0.8rem', fontSize: '1.1rem' }}>{q}</div>
                                <textarea
                                    placeholder="Reflect on your answer here (optional, private)..."
                                    style={{
                                        width: '100%',
                                        background: 'white',
                                        minHeight: '80px',
                                        fontSize: '0.95rem',
                                        margin: '0',
                                        padding: '1rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid rgba(0,0,0,0.1)',
                                        fontFamily: 'inherit'
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <button className="btn-primary" onClick={() => nextStep('result')}>
                            Proceed to Readiness Assessment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionSim