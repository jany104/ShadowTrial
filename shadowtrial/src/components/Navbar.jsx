import React from 'react'
import { useCase } from '../context/CaseContext'
import logo from '../assets/logo.png'

const Navbar = () => {
    const { nextStep } = useCase()

    return (
        <nav style={{
            position: 'sticky',
            top: 0,
            width: '100%',
            padding: '0.5rem 0',
            zIndex: 100,
            background: 'rgba(155, 59, 117, 0.4)',
            backdropFilter: 'blur(24px)',
            borderBottom: '1px solid rgba(74, 16, 46, 0.1)'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginLeft: '0'
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
                    
                    <img
                        src={logo}
                        alt="ShadowTrial Logo"
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '8px',
                            objectFit: 'contain'
                            }}
                        />
                    <span>ShadowTrial</span>
                </div>
                <div className="nav-links" style={{ display: 'flex',alignItems:'center',justifyContent:'space-between', gap: '2rem', marginRight:'0',position:'fixed',right:'3srem' }}>
                    <button
                        onClick={() => nextStep('home')}
                        style={{ background: 'none', border: 'none', color: '#4a102e', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem' }}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => {
                            nextStep('about');
                            setTimeout(() => {
                                const aboutSection = document.getElementById('about');
                                if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                        }}
                        style={{ background: 'none', border: 'none', color: '#4a102e', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem' }}
                    >
                        About
                    </button>
                    <button
                        onClick={() => nextStep('forum')}
                        style={{ background: 'none', border: 'none', color: '#4a102e', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem' }}
                    >
                        Community
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
