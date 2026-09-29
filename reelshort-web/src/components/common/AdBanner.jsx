import React, { useEffect, useRef } from 'react';

/**
 * Componente Reutilizável de Anúncio Google AdSense
 * Suporta formatos responsivos, banners de episódios, topo e rodapé.
 */
export default function AdBanner({
  slot,
  format = 'auto',
  responsive = 'true',
  layoutKey = null,
  style = {},
  className = '',
  label = 'PUBLICIDADE'
}) {
  const adRef = useRef(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      // Evita erros no console em dev ou recarregamentos SPA
      console.warn('AdSense push caught:', err?.message || err);
    }
  }, [slot]);

  return (
    <div 
      className={`adsense-wrapper ${className}`}
      style={{
        margin: '20px auto',
        textAlign: 'center',
        maxWidth: '100%',
        overflow: 'hidden',
        ...style
      }}
    >
      {label && (
        <span 
          style={{
            display: 'block',
            fontSize: '0.68rem',
            letterSpacing: '1px',
            color: 'var(--text-muted, #71717a)',
            marginBottom: '4px',
            textTransform: 'uppercase',
            fontWeight: 600
          }}
        >
          {label}
        </span>
      )}
      <div 
        ref={adRef}
        style={{
          minHeight: '90px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          width: '100%'
        }}
      >
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', ...style }}
          data-ad-client="ca-pub-1359270969670760"
          {...(slot ? { 'data-ad-slot': slot } : {})}
          data-ad-format={format}
          data-full-width-responsive={responsive}
          {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
        />
      </div>
    </div>
  );
}
