import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.getBlogPosts();
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '48px' }}>Loading...</div>;
  }

  if (selectedPost) {
    return (
      <div>
        <button 
          onClick={() => setSelectedPost(null)}
          className="btn"
          style={{ marginBottom: '24px', background: 'var(--bg-secondary)' }}
        >
          ← Back to all posts
        </button>
        
        <div className="card">
          <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>{selectedPost.title}</h1>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            {new Date(selectedPost.createdAt).toLocaleDateString()} • {selectedPost.author}
          </div>
          {selectedPost.tags && (
            <div style={{ marginBottom: '24px' }}>
              {selectedPost.tags.map((tag, i) => (
                <span key={i} style={{
                  background: 'var(--accent-primary)',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  marginRight: '8px',
                  fontSize: '14px'
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div style={{ lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
            {selectedPost.content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: '36px', marginBottom: '24px', textAlign: 'center' }}>
        Blog & Updates
      </h1>

      {posts.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
          <h2>📝 No Posts Yet</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '16px' }}>
            Updates and insights will be posted here as the journey progresses.
          </p>
        </div>
      ) : (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {posts.map((post) => (
            <div 
              key={post._id} 
              className="card"
              onClick={() => setSelectedPost(post)}
              style={{ cursor: 'pointer', marginBottom: '24px' }}
            >
              <h2 style={{ marginBottom: '12px' }}>{post.title}</h2>
              <div style={{ color: 'var(--text-secondary)', marginBottom: '12px', fontSize: '14px' }}>
                {new Date(post.createdAt).toLocaleDateString()} • {post.author}
              </div>
              {post.tags && (
                <div style={{ marginBottom: '12px' }}>
                  {post.tags.map((tag, i) => (
                    <span key={i} style={{
                      background: 'var(--bg-secondary)',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      marginRight: '8px',
                      fontSize: '12px'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <p style={{ color: 'var(--text-secondary)' }}>
                {post.content.substring(0, 200)}...
              </p>
              <div style={{ marginTop: '12px', color: 'var(--accent-primary)', fontWeight: 'bold' }}>
                Read more →
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;