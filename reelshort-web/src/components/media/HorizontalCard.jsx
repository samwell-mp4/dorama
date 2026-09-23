import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';

export default function HorizontalCard({ item }) {
  const navigate = useNavigate();

  if (!item) return null;

  const handleClick = () => {
    navigate(`/series/${item.slug}/temporada-${item.season || 1}/episodio-${item.episodeNum || 1}`);
  };

  return (
    <article 
      className="horizontal-card"
      onClick={handleClick}
      aria-label={`Continuar assistindo ${item.title}`}
    >
      <div className="horizontal-card-thumbnail-wrapper">
        <img
          src={item.poster}
          alt={item.title}
          className="horizontal-card-img"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&q=80';
          }}
        />
        <div className="horizontal-play-overlay">
          <div className="quick-action-play">
            <Play size={20} fill="currentColor" />
          </div>
        </div>
      </div>

      <div className="progress-bar-track">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${Math.max(5, item.percentage || 0)}%` }}
        />
      </div>

      <div className="horizontal-card-body">
        <h3 className="horizontal-card-title">{item.title}</h3>
        <div className="horizontal-card-subtitle">
          <span>T{item.season || 1} • Ep. {item.episodeNum || 1}</span>
          <span style={{ color: 'var(--accent-coral)', fontWeight: 600 }}>
            {item.percentage || 0}%
          </span>
        </div>
      </div>
    </article>
  );
}
