import React from 'react'
import { useCase } from '../context/CaseContext'

const IncidentInput = () => {
    const { updateCase, nextStep } = useCase()
    const [text, setText] = React.useState('')

    const handleProcess = () => {
        if (text.length < 20) {
            alert('Please provide more detail for a better simulation.')
            return
        }
        updateCase({ description: text })
        nextStep('sim')
    }

    return (
        <div className="page-container">
            <div className="container">
                <div className="card glass fade-in" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
                    <h2>Narrate the Incident</h2>
                    <p style={{ color: '#831843', marginBottom: '1rem' }}>Describe what happened in your own words. Your data remains private and stays on your device.</p>

                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Specifically mention who was involved, where it happened, and how you felt..."
                        style={{
                            width: '100%',
                            background: 'rgba(0, 0, 0, 0.05)',
                            border: '1px solid rgba(74, 16, 46, 0.1)',
                            borderRadius: '1rem',
                            padding: '1.5rem',
                            fontSize: '1.1rem',
                            minHeight: '250px',
                            margin: '1.5rem 0',
                            fontFamily: 'inherit'
                        }}
                    />

                    <button className="btn-primary" onClick={handleProcess}>
                        Process My Story
                    </button>
                </div>
            </div>
        </div>
    )
}

export default IncidentInput