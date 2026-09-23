import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Sparkles, Filter, AlertCircle } from 'lucide-react';
import { api } from '../api';
import { filterAvailableContent } from '../data/dataLayer';
import MediaCard from '../components/media/MediaCard';
import SEOHead from '../components/seo/SEOHead';
import Breadcrumbs from '../components/common/Breadcrumbs';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all'); // all, series, movies

  // Sincronizar parâmetro de busca quando a URL mudar
  useEffect(() => {
    if (initialQuery) {
      setSearchTerm(initialQuery);
      executeSearch(initialQuery);
    }
  }, [initialQuery]);

  // Debounce de busca automática (Search-as-you-type)
  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      executeSearch(searchTerm.trim());
      setSearchParams({ q: searchTerm.trim() }, { replace: true });
    }, 350);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const executeSearch = async (keywords) => {
    setLoading(true);
    try {
      const data = await api.searchDrama(keywords);
      if (data && data.results) {
        // REGRA CRÍTICA: Filtrar estritamente quaisquer itens com 0 episódios
        const validResults = filterAvailableContent(data.results);
        setResults(validResults);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error('Erro na busca:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickKeyword = (kw) => {
    setSearchTerm(kw);
  };

  return (
    <div className="search-view" style={{ padding: 'var(--space-32) 0 var(--space-64)' }}>
      <SEOHead
        title={searchTerm ? `Resultados para "${searchTerm}" — Busca` : 'Busca — Encontre Doramas e Séries'}
        description="Pesquise por títulos, atores e gêneros em todo o catálogo do Doramas Dublados."
      />

      <div className="cinematic-container">
        <Breadcrumbs items={[{ name: 'Busca', url: '/buscar' }]} />

        {/* Barra de Busca Principal */}
        <div style={{ maxWidth: '720px', margin: '0 auto var(--space-40)', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}>
          <h1 style={{ marginBottom: 'var(--space-16)', fontSize: 'clamp(1.5rem, 5vw, 2.4rem)' }}>
            O que você quer assistir hoje?
          </h1>
          <p style={{ marginBottom: 'var(--space-24)', color: 'var(--text-secondary)', fontSize: 'clamp(0.88rem, 2.5vw, 1rem)' }}>
            Busque entre centenas de mini-dramas, séries e produções completas.
          </p>

          <div style={{ position: 'relative', width: '100%', boxSizing: 'border-box' }}>
            <Search 
              size={20} 
              style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} 
            />
            <input
              type="text"
              className="global-search-input"
              style={{
                height: '52px',
                fontSize: 'clamp(0.92rem, 2.5vw, 1.05rem)',
                paddingLeft: '50px',
                paddingRight: '16px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(255,255,255,0.06)',
                width: '100%',
                boxSizing: 'border-box'
              }}
              placeholder="Busque por títulos, atores, gêneros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>

          {/* Sugestões Rápidas */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Termos em alta:</span>
            {['Amor', 'CEO', 'Vingança', 'Casamento', 'Herdeiro', 'Drama'].map((kw) => (
              <button
                key={kw}
                onClick={() => handleQuickKeyword(kw)}
                className="genre-tag"
                style={{ cursor: 'pointer' }}
              >
                {kw}
              </button>
            ))}
          </div>
        </div>

        {/* Resultados */}
        {loading ? (
          <div className="media-grid-responsive">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton skeleton-card-vertical" />
            ))}
          </div>
        ) : results.length > 0 ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-24)' }}>
              <h2>{results.length} Títulos Encontrados</h2>
            </div>

            <div className="media-grid-responsive">
              {results.map((drama) => (
                <MediaCard key={drama.book_id || drama.id} rawMedia={drama} />
              ))}
            </div>
          </div>
        ) : searchTerm.trim() ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', maxWidth: '480px', margin: '0 auto' }}>
            <AlertCircle size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
            <h3>Nenhum resultado encontrado</h3>
            <p style={{ marginTop: '8px', color: 'var(--text-secondary)' }}>
              Não encontramos títulos para "{searchTerm}". Verifique a digitação ou tente palavras-chave como <strong>Amor</strong>, <strong>CEO</strong> ou <strong>Drama</strong>.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
