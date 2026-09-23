import React from 'react';

export function HeroSkeleton() {
  return (
    <div className="skeleton skeleton-hero" style={{ marginBottom: 'var(--space-40)' }} />
  );
}

export function CarouselSkeleton({ count = 6, isHorizontal = false }) {
  return (
    <div className="media-carousel-section">
      <div className="skeleton skeleton-text title" style={{ width: '220px', marginBottom: 'var(--space-16)' }} />
      <div 
        className={`media-carousel-track ${isHorizontal ? 'horizontal-track' : ''}`}
        style={{ overflow: 'hidden' }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div 
            key={i} 
            className={`skeleton ${isHorizontal ? 'skeleton-card-horizontal' : 'skeleton-card-vertical'}`} 
          />
        ))}
      </div>
    </div>
  );
}
