import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Star, Play, Sparkles, Tv } from 'lucide-react';
import { api } from '../api';
import { filterAvailableContent, normalizeMedia } from '../data/dataLayer';
import SEOHead, { buildBreadcrumbSchema } from '../components/seo/SEOHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import AdBanner from '../components/common/AdBanner';
import '../styles/blog.css';

export default function Top10Page() {
  const [topSeries, setTopSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchTop10() {
      try {
        const shelvesData = await api.getBookshelves();
        if (shelvesData?.bookshelves && isMounted) {
          const allBooks = shelvesData.bookshelves.flatMap(s => s.books || []);
          const validBooks = filterAvailableContent(allBooks);
          
          // Remover duplicados
          const seen = new Set();
          const unique = [];
          for (const b of validBooks) {
            const id = String(b.book_id || b.id);
            if (!seen.has(id)) {
              seen.add(id);
              unique.push(normalizeMedia(b));
            }
          }

          setTopSeries(unique.slice(0, 10));
        }
      } catch (e) {
        console.error('Erro ao carregar Top 10:', e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchTop10();
    return () => { isMounted = false; };
  }, []);

  const breadcrumbs = [
    { name: 'Início', url: '/' },
    { name: 'Top 10 Doramas Dublados Grátis', url: '/top-10' }
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);

  // Schema ItemList para Rich Snippets no Google
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Top 10 Melhores Novelas e Doramas Dublados Grátis em Português",
    "description": "Ranking dos 10 melhores doramas e novelas asiáticas dubladas para assistir 100% grátis online.",
    "itemListElement": topSeries.map((series, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "url": `https://doramasdublados.online/series/${series.slug}`,
      "name": series.title,
      "image": series.poster
    }))
  };

  return (
    <div className="top10-view">
      <SEOHead
        title="Top 10 Melhores Novelas e Doramas Dublados Grátis"
        description="Confira o ranking dos 10 melhores doramas e novelas asiáticas dubladas em português para assistir grátis em HD. Episódios completos liberados sem mensalidade!"
        canonicalUrl="https://doramasdublados.online/top-10"
        schemaJson={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbSchema, itemListSchema]
        }}
      />

      <div className="cinematic-container">
        <Breadcrumbs items={breadcrumbs} />

        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 36px' }}>
          <span className="blog-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
            <Trophy size={14} /> RANKING OFICIAL ATUALIZADO
          </span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', fontWeight: 900, color: '#fff', marginBottom: '16px' }}>
            Top 10 Novelas e Doramas Mais Assistidos Grátis
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            As 10 produções mais aclamadas pelo público brasileiro, com histórias arrebatadoras, reviravoltas intensas e dublagem impecável em português liberada gratuitamente.
          </p>
        </div>

        {/* Anúncio AdSense Superior */}
        <AdBanner 
          slot="6000000001" 
          style={{ margin: '20px auto 36px' }} 
          label="PUBLICIDADE" 
        />

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton" style={{ height: '140px', borderRadius: 'var(--radius-lg)' }} />
            ))}
          </div>
        ) : (
          <div className="top10-list-container">
            {topSeries.map((series, idx) => (
              <React.Fragment key={series.id || idx}>
                <article className="top10-item-card">
                  <div className={`top10-rank-number ${idx < 3 ? 'top3' : ''}`}>
                    #{idx + 1}
                  </div>

                  <div className="top10-poster-box">
                    <img 
                      src={series.poster} 
                      alt={series.title} 
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80';
                      }}
                    />
                  </div>

                  <div className="top10-info-box">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span className="badge" style={{ background: '#10B981', color: '#fff', fontSize: '0.68rem', fontWeight: 800 }}>
                        100% GRÁTIS
                      </span>
                      <span className="hero-rating" style={{ fontSize: '0.82rem' }}>
                        <Star size={13} fill="#FFB800" /> {series.rating}
                      </span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        • {series.chapterCount} episódios
                      </span>
                    </div>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                      <Link to={`/series/${series.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {series.title}
                      </Link>
                    </h2>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5, maxWidth: '720px' }}>
                      {series.synopsis}
                    </p>
                  </div>

                  <div className="top10-action-col">
                    <Link 
                      to={`/series/${series.slug}/temporada-1/episodio-1`}
                      className="btn btn-primary"
                      style={{ whiteSpace: 'nowrap', background: 'linear-gradient(135deg, #10B981, #059669)', gap: '6px' }}
                    >
                      <Play size={16} fill="currentColor" /> Assistir Grátis
                    </Link>
                  </div>
                </article>

                {/* Inserir anúncio responsivo no meio da lista */}
                {idx === 4 && (
                  <AdBanner 
                    slot="6000000002" 
                    style={{ margin: '24px auto' }} 
                    label="PUBLICIDADE" 
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Faixa Informativa 100% Grátis */}
        <section className="article-vip-cta" style={{ marginTop: '56px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(14, 165, 233, 0.08))', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
          <Sparkles size={40} style={{ color: '#10B981', marginBottom: '12px' }} />
          <h3>Todos os Títulos Liberados Grátis sem Mensalidade</h3>
          <p>
            Assista a todos os 10 títulos do ranking e a todo o catálogo de novelas asiáticas dubladas em português sem cortes e sem pagar nada.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/series" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #10B981, #059669)', gap: '8px' }}>
              <Tv size={18} /> Explorar Catálogo Grátis
            </Link>
            <Link to="/blog" className="btn btn-secondary">
              Ler Dicas no Blog
            </Link>
          </div>
        </section>

        {/* Anúncio AdSense Inferior */}
        <AdBanner 
          slot="6000000003" 
          style={{ margin: '30px auto 40px' }} 
          label="PUBLICIDADE" 
        />
      </div>
    </div>
  );
}
