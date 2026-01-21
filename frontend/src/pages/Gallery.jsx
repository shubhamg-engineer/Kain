import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const Gallery = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState(null);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await api.getGallery();
      setPages(response.data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '48px' }}>Loading gallery...</div>;
  }

  return (
    <div>
      <h1 style={{ fontSize: '36px', marginBottom: '24px', textAlign: 'center' }}>
        Comic Gallery
      </h1>

      {pages.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
          <h2>📚 Coming Soon!</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '16px' }}>
            Comic pages will be published as Kain's journey progresses.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {pages.map((page) => (
            <div 
              key={page.day} 
              className="card"
              onClick={() => setSelectedPage(page)}
              style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                background: 'var(--bg-secondary)',
                height: '400px',
                borderRadius: '8px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <img 
                  src={page.imageUrl} 
                  alt={page.title}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
              </div>
              <div style={{
                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '4px',
                marginBottom: '12px',
                display: 'inline-block'
              }}>
                DAY {page.day} | {page.daysRemaining} DAYS LEFT
              </div>
              <h3 style={{ marginBottom: '8px' }}>{page.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                {page.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal for full view */}
      {selectedPage && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setSelectedPage(null)}
        >
          <div style={{ maxWidth: '90%', maxHeight: '90%' }}>
            <img 
              src={selectedPage.imageUrl} 
              alt={selectedPage.title}
              style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' }}
            />
            <div style={{ color: 'white', textAlign: 'center', marginTop: '16px' }}>
              <h2>Day {selectedPage.day}: {selectedPage.title}</h2>
              <p>{selectedPage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;