import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { api } from '../api';
import { filterAvailableContent } from '../data/dataLayer';
import MediaCard from '../components/media/MediaCard';
import SEOHead from '../components/seo/SEOHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { Tv, Film, Flame, Sparkles, Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import './catalog.css';

const SMART_TABS = [
  { id: 'all', label: 'Todos os Títulos' },
  { id: 'romance', label: 'Romance & Casamento' },
  { id: 'ceo', label: 'CEO & Bilionários' },
  { id: 'vinganca', label: 'Vingança & Segredos' },
  { id: 'drama', label: 'Drama Familiar' },
  { id: 'acao', label: 'Ação & Mestres' },
  { id: 'comedia', label: 'Comédia Romântica' }
];

export default function CatalogPage({ categoryType = 'series' }) {
  const { genre } = useParams();
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Controles Inteligentes de Busca e Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [durationFilter, setDurationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Determinar título da página
  let pageTitle = 'Catálogo de Séries';
  let pageIcon = <Tv size={22} style={{ color: 'var(--accent-coral)' }} />;

  if (genre) {
    pageTitle = `Gênero: ${genre.charAt(0).toUpperCase() + genre.slice(1)}`;
  } else if (location.pathname.includes('/filmes')) {
    pageTitle = 'Filmes & Produções Especiais';
    pageIcon = <Film size={22} style={{ color: 'var(--accent-coral)' }} />;
  } else if (location.pathname.includes('/em-alta')) {
    pageTitle = 'Em Alta no Brasil';
    pageIcon = <Flame size={22} style={{ color: 'var(--accent-coral)' }} />;
  } else if (location.pathname.includes('/lancamentos')) {
    pageTitle = 'Novos Lançamentos';
    pageIcon = <Sparkles size={22} style={{ color: 'var(--accent-coral)' }} />;
  }

  useEffect(() => {
    let isMounted = true;
    const fetchCatalog = async () => {
      setLoading(true);
      try {
        let results = [];

        // Para séries e catálogo geral: carregar catálogo completo multi-termos
        if (location.pathname.includes('/series') || location.pathname.includes('/filmes')) {
          results = await api.getFullCatalog();
        } else if (genre) {
          const res = await api.searchDrama(genre);
          results = res?.results || [];
        } else if (location.pathname.includes('/em-alta')) {
          const res = await api.searchDrama('amor');
          const res2 = await api.searchDrama('casamento');
          results = [...(res?.results || []), ...(res2?.results || [])];
        } else if (location.pathname.includes('/lancamentos')) {
          const res = await api.searchDrama('ceo');
          const res2 = await api.searchDrama('chefe');
          results = [...(res?.results || []), ...(res2?.results || [])];
        }

        if (isMounted) {
          // REGRA CRÍTICA: Filtrar rigorosamente quaisquer itens com 0 episódios
          const valid = filterAvailableContent(results);
          // Deduplicar por book_id
          const uniqueMap = new Map();
          valid.forEach(v => {
            const id = String(v.book_id || v.id);
            if (!uniqueMap.has(id)) {
              uniqueMap.set(id, v);
            }
          });
          setItems(Array.from(uniqueMap.values()));
        }
      } catch (err) {
        console.error('Erro ao buscar catálogo completo:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCatalog();
    return () => { isMounted = false; };
  }, [genre, location.pathname]);

  // Filtragem Inteligente e Ordenação em Tempo Real
  const filteredAndSortedItems = useMemo(() => {
    let result = [...items];

    // 1. Busca Instantânea
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(item => {
        const title = (item.book_title || item.title || '').toLowerCase();
        const intro = (item.introduction || item.abstract || item.description || '').toLowerCase();
        return title.includes(q) || intro.includes(q);
      });
    }

    // 2. Abas de Gênero / Tema
    if (activeTab !== 'all') {
      result = result.filter(item => {
        const text = ((item.book_title || item.title || '') + ' ' + (item.introduction || item.abstract || item.description || '')).toLowerCase();
        if (activeTab === 'romance') return text.includes('amor') || text.includes('paix') || text.includes('casam') || text.includes('beijo') || text.includes('noiv');
        if (activeTab === 'ceo') return text.includes('ceo') || text.includes('chefe') || text.includes('bilion') || text.includes('magnata') || text.includes('rico');
        if (activeTab === 'vinganca') return text.includes('ving') || text.includes('trai') || text.includes('mentir') || text.includes('segred') || text.includes('passado') || text.includes('ex');
        if (activeTab === 'drama') return text.includes('mãe') || text.includes('mae') || text.includes('pai') || text.includes('filha') || text.includes('filho') || text.includes('esposa') || text.includes('marido') || text.includes('família');
        if (activeTab === 'acao') return text.includes('mestre') || text.includes('mendigo') || text.includes('luta') || text.includes('marcial') || text.includes('imortal') || text.includes('ataque');
        if (activeTab === 'comedia') return text.includes('frito') || text.includes('fingir') || text.includes('doce') || text.includes('repente') || text.includes('comédia');
        return true;
      });
    }

    // 3. Filtro de Duração
    if (durationFilter === 'short') {
      result = result.filter(item => {
        const eps = Number(item.total_chapter_num || item.episodesCount || item.chapter_count || 80);
        return eps > 0 && eps < 75;
      });
    } else if (durationFilter === 'long') {
      result = result.filter(item => {
        const eps = Number(item.total_chapter_num || item.episodesCount || item.chapter_count || 80);
        return eps >= 75;
      });
    }

    // 4. Ordenação
    if (sortBy === 'title-asc') {
      result.sort((a, b) => (a.book_title || a.title || '').localeCompare(b.book_title || b.title || ''));
    } else if (sortBy === 'episodes-desc') {
      result.sort((a, b) => (Number(b.total_chapter_num || b.episodesCount || 0) - Number(a.total_chapter_num || a.episodesCount || 0)));
    } else if (sortBy === 'episodes-asc') {
      result.sort((a, b) => (Number(a.total_chapter_num || a.episodesCount || 0) - Number(b.total_chapter_num || b.episodesCount || 0)));
    }

    return result;
  }, [items, searchQuery, activeTab, durationFilter, sortBy]);

  const hasActiveFilters = searchQuery.trim() !== '' || activeTab !== 'all' || durationFilter !== 'all' || sortBy !== 'popular';

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveTab('all');
    setDurationFilter('all');
    setSortBy('popular');
  };

  const breadcrumbs = [
    { name: pageTitle, url: location.pathname }
  ];

  return (
    <div className="catalog-view">
      <SEOHead
        title={`${pageTitle} — Catálogo Completo Doramas Dublados`}
        description={`Explore os melhores doramas, séries e filmes da categoria ${pageTitle} no Doramas Dublados. Assista com qualidade HD e dublado em português.`}
      />

      <div className="cinematic-container">
        <Breadcrumbs items={breadcrumbs} />

        {/* Header com Tipografia Refinada & Busca Integrada */}
        <div className="catalog-search-row">
          <div className="catalog-header">
            <h1 className="catalog-title">
              {pageIcon} <span>{pageTitle}</span>
            </h1>
            <p className="catalog-subtitle">
              {loading 
                ? 'Carregando títulos...' 
                : `${items.length} produções disponíveis para assistir agora.`}
            </p>
          </div>

          {/* Campo de Busca Rápida no Catálogo */}
          <div className="catalog-search-box">
            <Search size={18} className="catalog-search-icon" />
            <input
              type="text"
              className="catalog-search-input"
              placeholder={`Filtrar em ${pageTitle.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Filtrar títulos"
            />
            {searchQuery && (
              <button 
                type="button" 
                className="catalog-search-clear" 
                onClick={() => setSearchQuery('')}
                aria-label="Limpar filtro de busca"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Abas de Filtros Inteligentes (Pills Horizontais sem Deformação) */}
        <div className="catalog-pills-scroll" role="tablist" aria-label="Filtros temáticos">
          {SMART_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`catalog-pill-btn ${activeTab === tab.id ? 'active' : ''}`}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Barra Secundária: Ordenação, Duração & Contador */}
        <div className="catalog-toolbar-secondary">
          <div className="catalog-count-badge">
            <span>Exibindo <strong>{filteredAndSortedItems.length}</strong> {filteredAndSortedItems.length === 1 ? 'título' : 'títulos'}</span>
            {hasActiveFilters && (
              <button onClick={handleResetFilters} className="catalog-reset-btn">
                • Limpar filtros
              </button>
            )}
          </div>

          <div className="catalog-sort-group">
            {/* Filtro de Duração */}
            <select 
              value={durationFilter} 
              onChange={(e) => setDurationFilter(e.target.value)}
              className="catalog-sort-select"
              aria-label="Filtrar por duração"
            >
              <option value="all">Todas as Durações</option>
              <option value="short">Minisséries (&lt; 75 eps)</option>
              <option value="long">Completas (75+ eps)</option>
            </select>

            {/* Ordenação */}
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="catalog-sort-select"
              aria-label="Ordenar títulos"
            >
              <option value="popular">🔥 Mais Populares</option>
              <option value="title-asc">🔤 Título (A-Z)</option>
              <option value="episodes-desc">🎬 Mais Episódios</option>
              <option value="episodes-asc">⚡ Menos Episódios</option>
            </select>
          </div>
        </div>

        {/* Grade de Vídeos (2 por linha no celular, 4-6 no desktop) */}
        {loading ? (
          <div className="media-grid-responsive">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="skeleton skeleton-card-vertical" />
            ))}
          </div>
        ) : filteredAndSortedItems.length > 0 ? (
          <div className="media-grid-responsive">
            {filteredAndSortedItems.map((item) => (
              <MediaCard key={item.book_id || item.id} rawMedia={item} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <p style={{ marginBottom: '12px', fontSize: '1.05rem' }}>Nenhum título encontrado com os filtros selecionados.</p>
            <button 
              onClick={handleResetFilters} 
              className="btn btn-secondary" 
              style={{ padding: '8px 18px', fontSize: '0.85rem' }}
            >
              Restaurar Catálogo Completo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
