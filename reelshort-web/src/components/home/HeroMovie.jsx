import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Plus, Check, Info, Star, Volume2, VolumeX } from 'lucide-react';
import { normalizeMedia, isInMyList, toggleMyList } from '../../data/dataLayer';
import { authService } from '../../data/authService';
import VIPPaywallModal from '../auth/VIPPaywallModal';
import './home.css';

export default function HeroMovie({ rawMedia }) {
  const navigate = useNavigate();
  const media = normalizeMedia(rawMedia);

  if (!media) return null;

  const [inList, setInList] = useState(isInMyList(media.id));
  const [muted, setMuted] = useState(true);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);

  const handlePlay = () => {
    if (!authService.isAuthenticated() || !authService.isVIP()) {
      setIsPaywallOpen(true);
      return;
    }
    navigate(`/series/${media.slug}/temporada-1/episodio-1`);
  };


  const handleDetails = () => {
    navigate(`/series/${media.slug}`);
  };

  const handleToggleList = () => {
    const added = toggleMyList(media);
    setInList(added);
  };

  return (
    <section className="hero-cinematic" aria-label={`Destaque: ${media.title}`}>
      <div className="hero-cinematic-backdrop">
        <img
          src={media.backdrop || media.poster}
          alt={`Cena de ${media.title}`}
          loading="eager"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&q=80';
          }}
        />
      </div>

      <div className="hero-cinematic-gradient" />

      <div className="cinematic-container" style={{ width: '100%' }}>
        <div className="hero-cinematic-content">
          <div className="hero-badges-row">
            <span className="badge badge-accent">#1 Em Alta Hoje</span>
            <span className="badge badge-vip">Original Doramas Dublados</span>
            <span className="badge badge-hd">4K Ultra HD</span>
          </div>

          <h1 className="hero-title">{media.title}</h1>

          <div className="hero-meta-row">
            <span className="hero-rating">
              <Star size={16} fill="#FFB800" /> {media.rating}
            </span>
            <span>•</span>
            <span>{media.year}</span>
            <span>•</span>
            <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px' }}>14+</span>
            <span>•</span>
            <span>{media.chapterCount} episódios</span>
            <span>•</span>
            <span>{media.genres.join(' / ')}</span>
          </div>

          <p className="hero-synopsis">{media.synopsis}</p>

          <div className="hero-actions-row">
            <button className="btn btn-primary" onClick={handlePlay}>
              <Play size={20} fill="currentColor" /> Assistir Ep. 1
            </button>
            <button className="btn btn-secondary" onClick={handleToggleList}>
              {inList ? <Check size={18} /> : <Plus size={18} />}
              {inList ? 'Na Minha Lista' : 'Minha Lista'}
            </button>
            <button className="btn btn-glass" onClick={handleDetails}>
              <Info size={18} /> Mais Informações
            </button>
          </div>
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
    </section>
  );
}

