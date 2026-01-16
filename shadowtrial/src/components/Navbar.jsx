import React from 'react'
import { useCase } from '../context/CaseContext'

const Navbar = () => {
    const { nextStep } = useCase()

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            padding: '1.5rem 0',
            zIndex: 100,
            background: 'rgba(255, 241, 242, 0.4)',
            backdropFilter: 'blur(24px)',
            borderBottom: '1px solid rgba(74, 16, 46, 0.1)'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div
                    className="brand"
                    onClick={() => nextStep('home')}
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer'
                    }}
                >
                    <div className="brand-icon" style={{
                        width: '32px',
                        height: '32px',
                        background: 'linear-gradient(135deg, #f472b6 0%, #db2777 100%)',
                        borderRadius: '8px'
                    }}></div>
                    <span>ShadowTrial</span>
                </div>
                <div className="nav-links" style={{ display: 'flex', gap: '2rem' }}>
                    <button
                        onClick={() => nextStep('home')}
                        style={{ background: 'none', border: 'none', color: '#4a102e', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                        Home
                    </button>
                    <a href="#about" style={{ textDecoration: 'none', color: '#4a102e', fontWeight: 500 }}>About</a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
