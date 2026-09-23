import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Star, Play, Sparkles, Crown, MessageCircle } from 'lucide-react';
import { api } from '../api';
import { filterAvailableContent, normalizeMedia } from '../data/dataLayer';
import SEOHead, { buildBreadcrumbSchema } from '../components/seo/SEOHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
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
    { name: 'Top 10 Doramas Dublados', url: '/top-10' }
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);

  // Schema ItemList para Rich Snippets no Google
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Top 10 Melhores Doramas Dublados em Português",
    "description": "Ranking oficial dos 10 doramas e mini-dramas mais assistidos e bem avaliados da plataforma.",
    "itemListElement": topSeries.map((series, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": series.title,
      "url": `https://doramasdublados.com.br/series/${series.slug}`
    }))
  };

  const whatsappUrl = 'https://wa.me/5531988868362?text=' + encodeURIComponent('Olá! Vi o ranking Top 10 e quero comprar minha licença VIP de R$ 5,00 para assistir a todas as séries.');

  return (
    <div className="top10-view">
      <SEOHead
        title="Top 10 Melhores Doramas Dublados — Ranking Oficial de Sucesso"
        description="Confira o ranking oficial dos 10 melhores doramas e mini-dramas dublados em português. As produções mais assistidas, aclamadas e maratonadas do streaming em HD."
        canonicalUrl="https://doramasdublados.online/top-10"
        schemaJson={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbSchema, itemListSchema]
        }}
      />

      <div className="cinematic-container">
        <Breadcrumbs items={breadcrumbs} />

        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#FFB800', background: 'rgba(255, 184, 0, 0.1)', padding: '6px 16px', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '16px' }}>
            <Trophy size={16} /> RANKING OFICIAL ATUALIZADO
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', marginBottom: '16px' }}>
            Top 10 Doramas Dublados Mais Assistidos
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Eleitos pela audiência e avaliados pela crítica: estas são as 10 produções mais intensas, emocionantes e populares disponíveis no catálogo com dublagem completa em português.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div className="catalog-loading-spinner" />
            <p style={{ color: 'var(--text-secondary)', marginTop: '16px' }}>Calculando ranking oficial...</p>
          </div>
        ) : (
          <div className="top10-ranking-list">
            {topSeries.map((series, index) => (
              <article key={series.id} className="top10-item-card">
                <div className="top10-rank-number">
                  #{index + 1}
                </div>

                <div className="top10-poster-thumb">
                  <img src={series.poster} alt={series.title} loading="lazy" />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span className="badge badge-accent">
                      <Sparkles size={11} /> Posição #{index + 1}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: '#FFB800', fontWeight: 700 }}>
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
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <Play size={16} /> Assistir Ep. 1
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* CTA VIP */}
        <section className="article-vip-cta" style={{ marginTop: '56px' }}>
          <Crown size={40} style={{ color: 'var(--accent-coral)', marginBottom: '12px' }} />
          <h3>Desbloqueie Todo o Top 10 por Apenas R$ 5,00</h3>
          <p>
            Ative seu acesso VIP e assista a todos os 10 títulos do ranking e a todo o acervo da plataforma sem cortes, sem anúncios e com dublagem completa.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <MessageCircle size={18} /> Liberar Acesso no WhatsApp (31) 98886-8362
            </a>
            <Link to="/blog" className="btn btn-secondary">
              Ler Dicas no Blog
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
