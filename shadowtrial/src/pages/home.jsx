import React from 'react'
import { useCase } from '../context/CaseContext'
import logo from '../assets/logo.png'

const Home = () => {
    const { nextStep } = useCase()

    return (
        <div className="home-page">
            <section className="hero" id="home">
                <div className="hero-glow" style={{
                    position: 'absolute',
                    width: '800px',
                    height: '800px',
                    background: 'radial-gradient(circle, rgba(219, 39, 119, 0.1) 0%, rgba(255, 241, 242, 0) 70%)',
                    zIndex: -1,
                    pointerEvents: 'none'
                }}></div>

                <div className="container" style={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative'
                }}>

                    <img
                        src={logo}
                        alt="ShadowTrial Logo"
                        style={{
                            width: '500px',
                            height: 'auto',
                            marginTop: '3rem',
                            marginBottom: '0.5rem',
                            objectFit: 'contain'
                        }}
                        className="reveal-up"
                    />

                    <h1 className="reveal-up" style={{
                        fontSize: '4.5rem',
                        fontWeight: 700,
                        marginTop: '-5.5rem',
                        marginBottom: '2rem',
                        lineHeight: '1.3',
                        background: 'linear-gradient(135deg, #f472b6 0%, #db2777 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animationDelay: '0.5s'
                    }}>
                        Replace Uncertainty with Clarity.
                    </h1>

                    <p className="reveal-up" style={{
                        fontSize: '1.25rem',
                        color: '#831843',
                        maxWidth: '600px',
                        marginBottom: '2.5rem',
                        animationDelay: '1s'
                    }}>
                        ShadowTrial helps you understand and mentally prepare for the reporting process through a private, non-judgmental simulation.
                    </p>

                    <div className="reveal-up" style={{
                        animationDelay: '1.5s',
                        display: 'flex',
                        gap: '1.5rem'
                    }}>
                        <button
                            className="btn-primary"
                            onClick={() => nextStep('input')}
                        >
                            Simulate My Case
                        </button>
                    </div>
                </div>
            </section>

            <section id="about" className="section" style={{ padding: '5rem 0', display: 'block', margin:'5rem' }}>
                <div className="container glass" style={{ padding: '4rem', textAlign: 'center' }}>
                    <h2>What is ShadowTrial?</h2>
                    <p style={{ maxWidth: '800px', margin: '2rem auto', fontSize: '1.1rem' }}>
                        ShadowTrial is a mental simulation platform designed to walk you through the reporting process of an incident.
                        By providing a safe, private space to narrate your experience, we help you identify the key actors,
                        understand the evidence required, and prepare for the questions you might face.
                    </p>
                </div>
            </section>
        </div>
    )
}

export default Home
