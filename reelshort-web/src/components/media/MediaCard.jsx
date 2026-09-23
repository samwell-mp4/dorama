import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Plus, Check, Star } from 'lucide-react';
import { normalizeMedia, isInMyList, toggleMyList } from '../../data/dataLayer';
import { authService } from '../../data/authService';
import VIPPaywallModal from '../auth/VIPPaywallModal';

export default function MediaCard({ rawMedia }) {
  const navigate = useNavigate();
  const media = normalizeMedia(rawMedia);

  if (!media) return null;

  const [inList, setInList] = React.useState(isInMyList(media.id));
  const [isPaywallOpen, setIsPaywallOpen] = React.useState(false);

  const handleCardClick = () => {
    navigate(`/series/${media.slug}`, { state: { media } });
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    if (!authService.isAuthenticated() || !authService.isVIP()) {
      setIsPaywallOpen(true);
      return;
    }
    navigate(`/series/${media.slug}/temporada-1/episodio-1`);
  };


  const handleListToggle = (e) => {
    e.stopPropagation();
    const added = toggleMyList(media);
    setInList(added);
  };

  return (
    <article 
      className="media-card" 
      onClick={handleCardClick}
      aria-label={`Ver detalhes de ${media.title}`}
    >
      <div className="media-card-poster-wrapper">
        <img
          src={media.poster}
          alt={`Pôster de ${media.title}`}
          className="media-card-img"
          loading="lazy"
          onError={(e) => {
            // Fallback elegante
            e.currentTarget.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80';
          }}
        />

        <div className="media-card-badge">
          <span className="badge badge-vip">HD</span>
        </div>

        <div className="media-card-overlay">
          <div className="media-card-quick-actions">
            <button 
              className="quick-action-play" 
              onClick={handlePlayClick}
              aria-label={`Assistir ${media.title}`}
            >
              <Play size={18} fill="currentColor" />
            </button>
            <button 
              className="quick-action-btn" 
              onClick={handleListToggle}
              aria-label={inList ? "Remover da minha lista" : "Adicionar à minha lista"}
            >
              {inList ? <Check size={16} /> : <Plus size={16} />}
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#FFB800' }}>
            <Star size={12} fill="#FFB800" />
            <span style={{ fontWeight: 700 }}>{media.rating}</span>
            <span style={{ color: '#9E9EB2', marginLeft: 'auto' }}>{media.year}</span>
          </div>
        </div>
      </div>

      <div className="media-card-info">
        <h3 className="media-card-title" title={media.title}>{media.title}</h3>
        <div className="media-card-meta">
          <span>{media.chapterCount} episódios</span>
          <span>•</span>
          <span>Dublado</span>
        </div>
      </div>

      <VIPPaywallModal
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
        onSuccess={() => {
          setIsPaywallOpen(false);
          navigate(`/series/${media.slug}/temporada-1/episodio-1`);
        }}
      />
    </article>
  );
}

