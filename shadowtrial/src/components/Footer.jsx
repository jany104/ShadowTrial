import React from 'react'

const Footer = () => {
    return (
        <footer style={{
            padding: '4rem 0',
            textAlign: 'center',
            color: '#831843',
            fontSize: '0.9rem',
            borderTop: '1px solid rgba(74, 16, 46, 0.1)',
            marginTop: '5rem',
            background: 'rgba(255, 255, 255, 0.3)'
        }}>
            <div className="container">
                <p>&copy; 2026 ShadowTrial. All rights reserved.</p>
                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                    <a href="#about" style={{ color: 'inherit', textDecoration: 'none' }}>About</a>
                    <a href="#privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
