import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';
import CredibilityBot from '../components/CredibilityBot';

const Forum = () => {
    const { user, logout } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [activeCommentPost, setActiveCommentPost] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostCategory, setNewPostCategory] = useState('Workplace');
    const [isCreatingPost, setIsCreatingPost] = useState(false);

    // Bot State
    const [analyzingPost, setAnalyzingPost] = useState(null);

    // Fetch posts from backend
    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/forum/posts');
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            }
        } catch (err) {
            console.error("Failed to fetch posts", err);
        } finally {
            setLoading(false);
        }
    };

    const categories = ['All', 'Workplace', 'Legal', 'Support'];
    const filteredPosts = filter === 'All' ? posts : posts.filter(post => post.category === filter);

    const handleVote = (id, delta) => {
        // Update local state for immediate UI feedback
        const updatedPosts = posts.map(post =>
            post.id === id ? { ...post, votes: post.votes + delta } : post
        );
        setPosts(updatedPosts);
        // TODO: Implement backend vote persistence via POST /api/forum/posts/:id/vote
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!user) return setIsAuthModalOpen(true);
        if (!newPostTitle || !newPostContent) return;

        const token = localStorage.getItem('shadow_token');
        try {
            const res = await fetch('http://localhost:3000/api/forum/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: newPostTitle,
                    content: newPostContent,
                    category: newPostCategory
                })
            });

            if (res.ok) {
                await fetchPosts(); // Refresh list
                setNewPostTitle('');
                setNewPostContent('');
                setIsCreatingPost(false);
            }
        } catch (err) {
            console.error("Post creation failed", err);
        }
    };

    const handleAddComment = async (postId) => {
        if (!user) return setIsAuthModalOpen(true);
        if (!commentText.trim()) return;

        const token = localStorage.getItem('shadow_token');
        try {
            const res = await fetch(`http://localhost:3000/api/forum/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ text: commentText })
            });

            if (res.ok) {
                await fetchPosts(); // Refresh list
                setCommentText('');
                setActiveCommentPost(null);
            }
        } catch (err) {
            console.error("Comment failed", err);
        }
    };

    return (
        <div className="page-container">
            <div className="container" style={{ maxWidth: '800px' }}>
                <div className="forum-header fade-in" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Anonymous Community</h1>
                    <p style={{ color: '#831843' }}>Share your journey, find common ground, and stay protected.</p>

                    {user ? (
                        <div style={{ marginTop: '1.5rem', background: '#fce7f3', padding: '0.8rem 1.5rem', borderRadius: '1rem', display: 'inline-flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontWeight: 600, color: '#db2777' }}>Logged in as: {user.username}</span>
                            <button onClick={logout} style={{ background: 'none', border: 'none', color: '#831843', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>Logout</button>
                        </div>
                    ) : (
                        <button className="btn-secondary" style={{ marginTop: '1.5rem' }} onClick={() => setIsAuthModalOpen(true)}>
                            Login to Participate
                        </button>
                    )}
                </div>

                {isCreatingPost ? (
                    <div className="card glass fade-in" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Share Your Move</h2>
                        <form onSubmit={handleCreatePost} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input
                                type="text"
                                placeholder="Title of your experience..."
                                value={newPostTitle}
                                onChange={(e) => setNewPostTitle(e.target.value)}
                                style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid rgba(0,0,0,0.1)', background: 'white' }}
                            />
                            <select
                                value={newPostCategory}
                                onChange={(e) => setNewPostCategory(e.target.value)}
                                style={{ padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid rgba(0,0,0,0.1)', background: 'white' }}
                            >
                                {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <textarea
                                placeholder="Describe your journey anonymously..."
                                value={newPostContent}
                                onChange={(e) => setNewPostContent(e.target.value)}
                                style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid rgba(0,0,0,0.1)', minHeight: '150px', background: 'white' }}
                            />
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button type="submit" className="btn-primary">Post Anonymously</button>
                                <button type="button" className="btn-secondary" onClick={() => setIsCreatingPost(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="forum-controls fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <div className="filter-chips" style={{ display: 'flex', gap: '1rem' }}>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    style={{
                                        padding: '0.5rem 1.2rem',
                                        borderRadius: '999px',
                                        border: '1px solid var(--surface-border)',
                                        background: filter === cat ? 'var(--gradient-primary)' : 'var(--surface-color)',
                                        color: filter === cat ? 'white' : 'var(--text-primary)',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <button className="btn-primary" onClick={() => user ? setIsCreatingPost(true) : setIsAuthModalOpen(true)}>
                            Share Your Move
                        </button>
                    </div>
                )}

                <div className="forum-feed">
                    {filteredPosts.map(post => (
                        <div key={post.id} className="post-card glass fade-in" style={{ padding: '2rem', marginBottom: '1.5rem', display: 'flex', gap: '1.5rem' }}>
                            <div className="vote-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', minWidth: '40px' }}>
                                <button onClick={() => handleVote(post.id, 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#db2777', fontSize: '1.5rem' }}>▲</button>
                                <span style={{ fontWeight: 700, color: 'var(--plum-900)' }}>{post.votes}</span>
                                <button onClick={() => handleVote(post.id, -1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4a102e', fontSize: '1.5rem' }}>▼</button>
                            </div>
                            <div className="post-content" style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                    <span style={{ background: '#fce7f3', color: '#db2777', padding: '0.2rem 0.8rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 600 }}>{post.category}</span>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Posted by {post.user} • {post.timestamp}</span>
                                </div>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem', color: 'var(--plum-900)' }}>{post.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7' }}>{post.content}</p>

                                <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <button
                                        onClick={() => setActiveCommentPost(activeCommentPost === post.id ? null : post.id)}
                                        style={{ width: 'fit-content', background: 'none', border: 'none', color: '#831843', fontSize: '0.9rem', cursor: 'pointer', fontWeight: 600 }}
                                    >
                                        💬 {post.comments?.length || 0} Comments
                                    </button>

                                    <button
                                        onClick={() => setAnalyzingPost(post)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#db2777',
                                            fontSize: '0.9rem',
                                            cursor: 'pointer',
                                            fontWeight: 600,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.3rem'
                                        }}
                                    >
                                        🦉 Analyze Validity
                                    </button>
                                </div>

                                {activeCommentPost === post.id && (
                                    <div className="comments-section fade-in" style={{ paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.05)', marginTop: '1rem' }}>
                                        <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.5rem' }}>
                                            <input
                                                type="text"
                                                placeholder={user ? "Write a comment..." : "Login to comment"}
                                                value={commentText}
                                                onChange={(e) => setCommentText(e.target.value)}
                                                disabled={!user}
                                                style={{ flex: 1, padding: '0.6rem 1rem', borderRadius: '0.5rem', border: '1px solid rgba(0,0,0,0.1)' }}
                                            />
                                            <button
                                                onClick={() => handleAddComment(post.id)}
                                                className="btn-primary"
                                                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                                                disabled={!user}
                                            >
                                                Post
                                            </button>
                                        </div>

                                        {post.comments?.map(comment => (
                                            <div key={comment.id} style={{ padding: '0.8rem', background: 'rgba(0,0,0,0.02)', borderRadius: '0.5rem', marginBottom: '0.8rem' }}>
                                                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#db2777', marginBottom: '0.2rem' }}>{comment.user} • {comment.timestamp}</div>
                                                <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{comment.text}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />

            {analyzingPost && (
                <CredibilityBot
                    postContent={analyzingPost.content}
                    onClose={() => setAnalyzingPost(null)}
                />
            )}
        </div>
    );
};

export default Forum;