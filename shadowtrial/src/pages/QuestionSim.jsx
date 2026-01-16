import React, { useState } from 'react'
import { useCase } from '../context/CaseContext'
import knowledgeBase from '../data/legalKnowledgeBase.json'

const QuestionSim = () => {
    const { caseData, updateCase, nextStep } = useCase()
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState(caseData.structuredEvidence)

    const questions = knowledgeBase.evidenceCategories

    const handleAnswerChange = (e) => {
        setAnswers({ ...answers, [questions[currentQuestionIndex].id]: e.target.value })
    }

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        } else {
            // Finished
            updateCase({ structuredEvidence: answers })
            nextStep('result')
        }
    }

    const progress = ((currentQuestionIndex + 1) / questions.length) * 100

    return (
        <div className="page-container">
            <div className="container">
                <div className="card glass fade-in" style={{ padding: '3rem', maxWidth: '700px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ marginBottom: '0.5rem' }}>Structured Intake</h2>
                        <p style={{ color: '#831843', opacity: 0.8 }}>We need a few specific details to assess your legal options.</p>
                    </div>

                    <div style={{ height: '6px', background: 'rgba(0,0,0,0.05)', borderRadius: '3px', marginBottom: '2rem' }}>
                        <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #f472b6, #db2777)', borderRadius: '3px', transition: 'width 0.3s ease' }}></div>
                    </div>

                    <div key={currentQuestionIndex} style={{ animation: 'fadeIn 0.5s ease' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#4a102e' }}>
                            {questions[currentQuestionIndex].question}
                        </h3>

                        {questions[currentQuestionIndex].options ? (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                                {questions[currentQuestionIndex].options.map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => setAnswers({ ...answers, [questions[currentQuestionIndex].id]: opt })}
                                        style={{
                                            padding: '1rem',
                                            borderRadius: '0.5rem',
                                            border: answers[questions[currentQuestionIndex].id] === opt ? '2px solid #db2777' : '1px solid rgba(0,0,0,0.1)',
                                            background: answers[questions[currentQuestionIndex].id] === opt ? 'rgba(219, 39, 119, 0.1)' : 'white',
                                            color: answers[questions[currentQuestionIndex].id] === opt ? '#db2777' : '#4a102e',
                                            fontWeight: answers[questions[currentQuestionIndex].id] === opt ? 600 : 400,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            textAlign: 'center'
                                        }}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <textarea
                                className="text-area-glass"
                                value={answers[questions[currentQuestionIndex].id] || ''}
                                onChange={handleAnswerChange}
                                placeholder={questions[currentQuestionIndex].placeholder}
                                rows={5}
                                autoFocus
                                style={{
                                    width: '100%',
                                    background: 'white',
                                    minHeight: '120px',
                                    fontSize: '1.1rem',
                                    padding: '1rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid rgba(0,0,0,0.1)',
                                    fontFamily: 'inherit',
                                    marginBottom: '2rem'
                                }}
                            />
                        )}

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="btn-primary" onClick={handleNext} disabled={!answers[questions[currentQuestionIndex].id]}>
                                {currentQuestionIndex === questions.length - 1 ? 'Finish Assessment' : 'Next Question'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionSim