import React from 'react'
import { useCase } from '../context/CaseContext'

const LegalFlow = () => {
    const { nextStep } = useCase()

    return (
        <div className="page-container">
            <div className="container">
                <div className="title-area fade-in" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1>Your Legal Pathway</h1>
                    <p style={{ fontSize: '1.2rem', color: '#831843' }}>Understanding the options and resources available to you.</p>
                </div>

                <div className="feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div className="feature-card glass" style={{ padding: '2rem' }}>
                        <h3>1. Internal Reporting</h3>
                        <p style={{ margin: '1rem 0' }}>Formal HR complaint process within your organization.</p>
                        <div className="tag" style={{ background: '#fce7f3', color: '#db2777', padding: '0.2rem 0.8rem', borderRadius: '1rem', fontSize: '0.8rem', display: 'inline-block' }}>Estimated Time: 1-3 Months</div>
                    </div>

                    <div className="feature-card glass" style={{ padding: '2rem' }}>
                        <h3>2. Legal Action</h3>
                        <p style={{ margin: '1rem 0' }}>Filing a lawsuit or reporting to state/federal labor boards.</p>
                        <div className="tag" style={{ background: '#fce7f3', color: '#db2777', padding: '0.2rem 0.8rem', borderRadius: '1rem', fontSize: '0.8rem', display: 'inline-block' }}>Estimated Cost: $1,500 - $10,000</div>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <button className="btn-primary" onClick={() => alert('Feature coming soon: Connect to Advisors')}>
                        Connect with Real Advisors
                    </button>
                    <button className="btn-secondary" style={{ marginLeft: '1rem' }} onClick={() => nextStep('home')}>
                        Return Home
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LegalFlow