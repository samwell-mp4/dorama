import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, Play, HelpCircle, ChevronDown, ChevronUp, Tv, ArrowRight, Star } from 'lucide-react';
import { api } from '../api';
import { filterAvailableContent } from '../data/dataLayer';
import { SEO_HUBS, ALL_SEO_SLUGS } from '../data/seoPagesData';
import MediaCard from '../components/media/MediaCard';
import SEOHead, { buildBreadcrumbSchema } from '../components/seo/SEOHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import AdBanner from '../components/common/AdBanner';
import '../styles/blog.css';
import './catalog.css';

export default function SeoHubPage({ hubKey }) {
  const params = useParams();
  const currentKey = hubKey || params.hubKey || 'assistir-doramas-gratis';
  const hub = SEO_HUBS[currentKey] || SEO_HUBS['assistir-doramas-gratis'];

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchHubData = async () => {
      setLoading(true);
      try {
        let results = [];
        if (hub.searchTerm) {
          const res = await api.searchDrama(hub.searchTerm);
          results = res?.results || [];
        }
        
        // Se retornar poucos resultados ou para termos amplos, buscar catálogo complementar
        if (results.length < 8) {
          try {
            const all = await api.getFullCatalog();
            results = [...results, ...(all || [])];
          } catch (e) {}
        }

        if (isMounted) {
          const valid = filterAvailableContent(results);
          const uniqueMap = new Map();
          valid.forEach(v => {
            const id = String(v.book_id || v.id);
            if (!uniqueMap.has(id)) {
              uniqueMap.set(id, v);
            }
          });
          setItems(Array.from(uniqueMap.values()).slice(0, 18));
        }
      } catch (err) {
        console.error('Erro ao buscar dados do SEO Hub:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchHubData();
    return () => { isMounted = false; };
  }, [hub.searchTerm, currentKey]);

  const breadcrumbs = [
    { name: 'Início', url: '/' },
    { name: hub.navLabel, url: `/${hub.slug}` }
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);

  const faqSchema = hub.faqs && hub.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": hub.faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  } : null;

  const currentUrl = `https://doramasdublados.online/${hub.slug}`;

  return (
    <div className="seo-hub-view" style={{ padding: 'var(--space-24) 0 var(--space-64)' }}>
      <SEOHead
        title={hub.metaTitle}
        description={hub.metaDescription}
        canonicalUrl={currentUrl}
        schemaJson={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbSchema, faqSchema].filter(Boolean)
        }}
      />

      <div className="cinematic-container">
        <Breadcrumbs items={breadcrumbs} />

        {/* Topo Editorial Otimizado para os Termos do Semrush */}
        <header style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto 36px', boxSizing: 'border-box' }}>
          <span 
            className="blog-badge" 
            style={{ 
              background: 'rgba(16, 185, 129, 0.15)', 
              color: '#10B981', 
              borderColor: 'rgba(16, 185, 129, 0.3)',
              marginBottom: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={14} /> {hub.badge}
          </span>

          <h1 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.7rem)', fontWeight: 900, color: '#fff', marginBottom: '16px', lineHeight: 1.2 }}>
            {hub.h1}
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', lineHeight: 1.6, maxWidth: '780px', margin: '0 auto' }}>
            {hub.lead}
          </p>

          {/* Nuvem de Termos em Alta / Links Internos SEO */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Principais buscas:</span>
            {hub.targetKeywords?.map(kw => (
              <span 
                key={kw} 
                className="genre-tag" 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.05)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '0.78rem'
                }}
              >
                {kw}
              </span>
            ))}
          </div>
        </header>

        {/* Anúncio AdSense Superior */}
        <AdBanner 
          slot="1100000001" 
          style={{ margin: '16px auto 32px' }} 
          label="PUBLICIDADE" 
        />

        {/* Grade de Séries Relacionadas ao Hub */}
        <section aria-label="Títulos em Destaque">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-20)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
              Episódios Disponíveis para Assistir Grátis
            </h2>
            <Link to="/series" style={{ color: '#10B981', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              Ver Catálogo Completo <ArrowRight size={15} />
            </Link>
          </div>

          {loading ? (
            <div className="media-grid-responsive">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="skeleton skeleton-card-vertical" />
              ))}
            </div>
          ) : items.length > 0 ? (
            <div className="media-grid-responsive">
              {items.map(item => (
                <MediaCard key={item.book_id || item.id} rawMedia={item} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              <p>Nenhuma série encontrada no momento.</p>
              <Link to="/series" className="btn btn-primary" style={{ marginTop: '16px' }}>
                Explorar Catálogo Geral
              </Link>
            </div>
          )}
        </section>

        {/* Anúncio AdSense Central */}
        <AdBanner 
          slot="1100000002" 
          style={{ margin: '36px auto' }} 
          label="PUBLICIDADE" 
        />

        {/* Seção Editorial Rica para Ranking no Google */}
        <section 
          style={{ 
            background: 'var(--bg-surface-elevated)', 
            border: '1px solid var(--glass-border)', 
            borderRadius: 'var(--radius-xl)', 
            padding: ' clamp(24px, 5vw, 40px)', 
            margin: '36px 0' 
          }}
        >
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
            {hub.editorialTitle}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.7, margin: 0 }}>
            {hub.editorialText}
          </p>

          <div style={{ display: 'flex', gap: '14px', marginTop: '24px', flexWrap: 'wrap' }}>
            <Link 
              to="/series" 
              className="btn btn-primary" 
              style={{ background: 'linear-gradient(135deg, #10B981, #059669)', gap: '8px' }}
            >
              <Tv size={18} /> Começar a Assistir Agora
            </Link>
            <Link to="/top-10" className="btn btn-secondary">
              Conferir Ranking Top 10
            </Link>
          </div>
        </section>

        {/* Perguntas Frequentes (FAQ Estruturado com Rich Snippets) */}
        {hub.faqs && hub.faqs.length > 0 && (
          <section style={{ maxWidth: '840px', margin: '48px auto' }} aria-label="Dúvidas Frequentes">
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                Perguntas Frequentes sobre {hub.navLabel}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Tire suas dúvidas antes de começar a assistir
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {hub.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div 
                    key={idx} 
                    style={{ 
                      background: 'var(--bg-surface)', 
                      border: '1px solid var(--glass-border)', 
                      borderRadius: 'var(--radius-md)', 
                      overflow: 'hidden' 
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'transparent',
                        border: 'none',
                        color: '#fff',
                        fontSize: '1.02rem',
                        fontWeight: 700,
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <HelpCircle size={18} style={{ color: '#10B981', flexShrink: 0 }} />
                        {faq.question}
                      </span>
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>

                    {isOpen && (
                      <div style={{ padding: '0 20px 18px 48px', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Hub Matrix: Links Cruzados Entre Todas as Páginas de SEO */}
        <section style={{ marginTop: '56px', paddingTop: '36px', borderTop: '1px solid var(--glass-border)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '20px', textAlign: 'center' }}>
            Explore Nossos Hubs de Séries e Novelas
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            {ALL_SEO_SLUGS.map(slugKey => {
              const itemHub = SEO_HUBS[slugKey];
              const isCurrent = slugKey === currentKey;
              return (
                <Link
                  key={slugKey}
                  to={`/${itemHub.slug}`}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: isCurrent ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-surface)',
                    border: isCurrent ? '1px solid #10B981' : '1px solid var(--glass-border)',
                    color: isCurrent ? '#10B981' : '#fff',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{itemHub.navLabel}</span>
                  <ArrowRight size={14} style={{ opacity: 0.6 }} />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Anúncio AdSense Inferior */}
        <AdBanner 
          slot="1100000003" 
          style={{ margin: '40px auto 20px' }} 
          label="PUBLICIDADE" 
        />
      </div>
    </div>
  );
}
