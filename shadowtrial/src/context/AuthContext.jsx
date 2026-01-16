import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('shadow_token');
        const storedUser = localStorage.getItem('shadow_current_user');
        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const generateUsername = () => {
        const adjectives = ['Silver', 'Brave', 'Quiet', 'Swift', 'Hidden', 'Steady', 'Amber', 'Night', 'Neon', 'Shadow'];
        const nouns = ['Wolf', 'Owl', 'Hawk', 'Fox', 'Lynx', 'Raven', 'Panda', 'Eagle', 'Ghost', 'Stander'];
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        const num = Math.floor(Math.random() * 99) + 1;
        return `${adj}${noun}_${num}`;
    };

    const signup = async (username, password) => {
        try {
            const res = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (!res.ok) return { success: false, message: data.error || 'Signup failed' };

            setUser(data.user);
            localStorage.setItem('shadow_token', data.token);
            localStorage.setItem('shadow_current_user', JSON.stringify(data.user));
            return { success: true };
        } catch (err) {
            return { success: false, message: 'Server error' };
        }
    };

    const login = async (username, password) => {
        try {
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (!res.ok) return { success: false, message: data.error || 'Invalid credentials' };

            setUser(data.user);
            localStorage.setItem('shadow_token', data.token);
            localStorage.setItem('shadow_current_user', JSON.stringify(data.user));
            return { success: true };
        } catch (err) {
            return { success: false, message: 'Server connection failed' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('shadow_current_user');
        localStorage.removeItem('shadow_token');
    };

    return (
        <AuthContext.Provider value={{ user, signup, login, logout, generateUsername, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
