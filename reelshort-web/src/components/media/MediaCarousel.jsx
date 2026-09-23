import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MediaCard from './MediaCard';
import HorizontalCard from './HorizontalCard';
import './media.css';

export default function MediaCarousel({ 
  title, 
  icon,
  items = [], 
  isHorizontal = false 
}) {
  const trackRef = useRef(null);

  if (!items || items.length === 0) return null;

  const handleScroll = (direction) => {
    if (trackRef.current) {
      const scrollAmount = trackRef.current.clientWidth * 0.75;
      trackRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="media-carousel-section" aria-label={title}>
      <div className="media-carousel-header">
        <h2 className="media-carousel-title">
          {icon && <span style={{ color: 'var(--accent-coral)' }}>{icon}</span>}
          {title}
        </h2>
        <div className="media-carousel-controls">
          <button 
            className="carousel-arrow-btn" 
            onClick={() => handleScroll('left')}
            aria-label="Rolar para a esquerda"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            className="carousel-arrow-btn" 
            onClick={() => handleScroll('right')}
            aria-label="Rolar para a direita"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div 
        ref={trackRef} 
        className={`media-carousel-track ${isHorizontal ? 'horizontal-track' : ''}`}
      >
        {items.map((item, index) => (
          isHorizontal ? (
            <HorizontalCard key={item.id || index} item={item} />
          ) : (
            <MediaCard key={item.book_id || item.id || index} rawMedia={item} />
          )
        ))}
      </div>
    </section>
  );
}
