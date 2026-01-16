import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, signup, generateUsername } = useAuth();

    useEffect(() => {
        if (isOpen && !isLogin && !username) {
            setUsername(generateUsername());
        }
    }, [isOpen, isLogin, username, generateUsername]);

    if (!isOpen) return null;

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setUsername(isLogin ? generateUsername() : '');
        setPassword('');
    };

    const handleRegenerate = () => {
        setUsername(generateUsername());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (username.length < 3) return setError('Username too short.');
        if (password.length < 4) return setError('Password too short.');

        const result = isLogin ? login(username, password) : signup(username, password);

        if (result.success) {
            onClose();
        } else {
            setError(result.message);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            animation: 'fadeIn 0.3s ease'
        }}>
            <div className="card glass" style={{
                padding: '3rem',
                maxWidth: '400px',
                width: '90%',
                position: 'relative',
                animation: 'slideUp 0.4s ease'
            }}>
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#831843' }}
                >
                    &times;
                </button>

                <h2 style={{ marginBottom: '0.5rem' }}>{isLogin ? 'Welcome Back' : 'Join Privately'}</h2>
                <p style={{ fontSize: '0.9rem', color: '#831843', marginBottom: '2rem' }}>
                    {isLogin ? 'Enter your assigned handle and password.' : 'Your anonymous handle has been generated.'}
                </p>

                {error && <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem', background: '#fee2e2', padding: '0.5rem', borderRadius: '0.5rem' }}>{error}</p>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Anonymous Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            readOnly={!isLogin}
                            required
                            style={{
                                width: '100%',
                                padding: '0.8rem 1rem',
                                borderRadius: '0.5rem',
                                border: '1px solid rgba(74, 16, 46, 0.1)',
                                background: !isLogin ? 'rgba(219, 39, 119, 0.05)' : 'rgba(255,255,255,0.5)',
                                fontFamily: 'inherit',
                                color: !isLogin ? '#db2777' : 'inherit',
                                fontWeight: !isLogin ? 700 : 400
                            }}
                        />
                        {!isLogin && (
                            <button
                                type="button"
                                onClick={handleRegenerate}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    color: '#db2777',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem',
                                    fontWeight: 600
                                }}
                            >
                                🔄 New
                            </button>
                        )}
                    </div>
                    <input
                        type="password"
                        placeholder="Secret Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ padding: '0.8rem 1rem', borderRadius: '0.5rem', border: '1px solid rgba(74, 16, 46, 0.1)', background: 'rgba(255,255,255,0.5)', fontFamily: 'inherit' }}
                    />
                    <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>
                        {isLogin ? 'Log In' : 'Create Account'}
                    </button>
                    <button
                        type="button"
                        onClick={toggleMode}
                        style={{ background: 'none', border: 'none', color: '#831843', fontSize: '0.9rem', cursor: 'pointer', fontWeight: 500 }}
                    >
                        {isLogin ? "New here? Join anonymously" : "Already have an account? Log in"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthModal;