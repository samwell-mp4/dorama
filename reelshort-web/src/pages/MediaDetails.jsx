import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { Play, Plus, Check, Star, Share2, AlertCircle, BookOpen, Trophy } from 'lucide-react';
import { api } from '../api';
import { parseSlug, normalizeMedia, isInMyList, toggleMyList, filterAvailableContent, addUnavailableId } from '../data/dataLayer';
import SEOHead, { buildSeriesSchema, buildBreadcrumbSchema } from '../components/seo/SEOHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import MediaCarousel from '../components/media/MediaCarousel';
import { authService } from '../data/authService';
import VIPPaywallModal from '../components/auth/VIPPaywallModal';

import './details.css';

export default function MediaDetails() {
  const { slug, bookId: paramBookId, filteredTitle: paramFilteredTitle } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const stateMedia = location.state?.media;

  // Extrair ID e slug limpo
  const parsed = parseSlug(slug);
  const bookId = paramBookId || parsed.id || stateMedia?.id;
  const filteredTitle = paramFilteredTitle || parsed.title.replace(/\s+/g, '-').toLowerCase() || stateMedia?.filteredTitle;

  const [mediaInfo, setMediaInfo] = useState(stateMedia ? normalizeMedia(stateMedia) : null);
  const [episodes, setEpisodes] = useState([]);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(!stateMedia);
  const [inList, setInList] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [pendingEpisode, setPendingEpisode] = useState(null);

  // Garantir que a página sempre inicie no topo exato (0, 0) no celular e desktop
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, [bookId, slug]);

  useEffect(() => {
    let isMounted = true;

    const loadDetails = async () => {
      setErrorState(false);

      try {
        // Buscar episódios reais e dados oficiais da API
        const epData = await api.getEpisodes(bookId, filteredTitle);
        const fetchedEpisodes = epData?.episodes || [];

        // REGRA CRÍTICA: Se não possui nenhum episódio válido, auto-registrar na blacklist e redirecionar
        if (!fetchedEpisodes || fetchedEpisodes.length === 0) {
          addUnavailableId(bookId);
          console.warn(`[Auto-Heal] Series ${bookId} has 0 episodes. Redirecting away from broken content.`);
          if (isMounted) {
            navigate('/series', { replace: true });
          }
          return;
        }

        if (isMounted) {
          setEpisodes(fetchedEpisodes);

          // Puxar títulos, capa e sinopse reais vindos da API oficial
          const realTitle = epData.book_title || stateMedia?.title || (parsed.title ? parsed.title.toUpperCase() : filteredTitle.replace(/-/g, ' ').toUpperCase());
          const realPoster = epData.book_pic || stateMedia?.poster || '';
          const realDesc = epData.special_desc || stateMedia?.synopsis || 'Acompanhe os episódios completos desta produção dramática com reviravoltas intensas e histórias envolventes.';

          const normalized = normalizeMedia({
            book_id: bookId,
            book_title: realTitle,
            filtered_title: filteredTitle,
            chapter_count: fetchedEpisodes.length,
            book_pic: realPoster,
            backdrop: realPoster, // Contra-capa usa a imagem autêntica de cada título
            special_desc: realDesc,
            episodes: fetchedEpisodes
          });

          setMediaInfo(normalized);
          setInList(isInMyList(bookId));
        }

        // Buscar relacionados via bookshelf e filtrar estritamente
        try {
          const shelvesData = await api.getBookshelves();
          if (shelvesData?.bookshelves && isMounted) {
            const allBooks = shelvesData.bookshelves.flatMap(s => s.books || []);
            const validBooks = filterAvailableContent(allBooks).filter(b => String(b.book_id) !== String(bookId));
            setRelated(validBooks.slice(0, 10));
          }
        } catch (e) {
          console.error('Erro ao buscar relacionados:', e);
        }

      } catch (err) {
        console.error('Erro ao carregar detalhes:', err);
        addUnavailableId(bookId);
        if (isMounted) {
          navigate('/series', { replace: true });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (bookId) {
      loadDetails();
    }

    return () => {
      isMounted = false;
    };
  }, [bookId, filteredTitle, slug, navigate]);

  const handlePlayEpisode = (ep) => {
    const epNum = Number(ep?.episode || ep?.serial_number || 1);

    // REGRA DE PRÉVIA GRÁTIS: O 1º episódio é liberado para todos assistirem à prévia!
    if (epNum === 1 || authService.isVIP()) {
      navigate(`/series/${mediaInfo?.slug || slug}/temporada-1/episodio-${epNum}`);
      return;
    }

    // A partir do episódio 2, exige acesso VIP
    setPendingEpisode(ep);
    setIsPaywallOpen(true);
  };

  const handlePaywallSuccess = () => {
    setIsPaywallOpen(false);
    const targetEp = pendingEpisode || episodes[0];
    if (targetEp) {
      navigate(`/series/${mediaInfo?.slug || slug}/temporada-1/episodio-${targetEp.episode || targetEp.serial_number || 1}`);
    }
  };


  const handleToggleList = () => {
    if (mediaInfo) {
      const added = toggleMyList(mediaInfo);
      setInList(added);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: mediaInfo?.title || 'Doramas Dublados',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  // Se por qualquer razão ocorrer erro, redirecionar de imediato sem exibir tela de erro
  if (errorState && !loading) {
    navigate('/series', { replace: true });
    return null;
  }

  const breadcrumbs = [
    { name: 'Séries', url: '/series' },
    { name: mediaInfo?.title || 'Detalhes', url: '#' }
  ];

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const seriesSchema = mediaInfo ? buildSeriesSchema(mediaInfo, currentUrl) : null;
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [seriesSchema, breadcrumbSchema].filter(Boolean)
  };

  return (
    <div className="details-view">
      {mediaInfo && (
        <SEOHead
          title={`${mediaInfo.title} (${mediaInfo.year}) — Assistir, Sinopse e Informações`}
          description={`Assista a todos os episódios de ${mediaInfo.title} dublado em português. Sinopse completa, elenco e episódios disponíveis em HD no Doramas Dublados.`}
          canonicalUrl={currentUrl}
          ogImage={mediaInfo.poster}
          ogType="video.tv_show"
          schemaJson={combinedSchema}
        />
      )}

      {/* Hero dos Detalhes com Capa e Contra-Capa Autênticas */}
      <section className="details-hero">
        <div className="details-backdrop">
          <img 
            src={mediaInfo?.backdrop || mediaInfo?.poster} 
            alt={mediaInfo?.title || ''} 
          />
        </div>
        <div className="details-backdrop-gradient" />

        <div className="cinematic-container" style={{ width: '100%' }}>
          <Breadcrumbs items={breadcrumbs} />

          <div className="details-hero-layout">
            <div className="details-poster-box">
              <img 
                src={mediaInfo?.poster} 
                alt={mediaInfo?.title || ''} 
                loading="eager"
              />
            </div>

            <div className="details-info-box">
              <h1 className="details-title">{mediaInfo?.title}</h1>

              <div className="details-meta-bar">
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#FFB800', fontWeight: 700 }}>
                  <Star size={16} fill="#FFB800" /> {mediaInfo?.rating}
                </span>
                <span>•</span>
                <span>{mediaInfo?.year}</span>
                <span>•</span>
                <span className="badge badge-vip">Original</span>
                <span>•</span>
                <span>{episodes.length} Episódios</span>
                <span>•</span>
                <span>{mediaInfo?.genres?.join(', ')}</span>
              </div>

              <p style={{ maxWidth: '650px', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px' }}>
                {mediaInfo?.synopsis}
              </p>

              <div className="details-actions-bar">
                {episodes.length > 0 && (
                  <button className="btn btn-primary" onClick={() => handlePlayEpisode(episodes[0])}>
                    <Play size={20} fill="currentColor" /> Assistir 1º Ep. Grátis
                  </button>
                )}
                <button className="btn btn-secondary" onClick={handleToggleList}>
                  {inList ? <Check size={18} /> : <Plus size={18} />}
                  {inList ? 'Na Minha Lista' : 'Minha Lista'}
                </button>
                <button className="btn btn-glass" onClick={handleShare} aria-label="Compartilhar">
                  <Share2 size={18} /> Compartilhar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal: Temporadas e Grade de Episódios */}
      <div className="cinematic-container">
        <section className="episodes-section">
          <div className="episodes-header-row">
            <h2>Episódios Disponíveis</h2>
            <div className="season-tab-btn">
              Temporada 1 ({episodes.length} episódios)
            </div>
          </div>

          <div className="episodes-list">
            {episodes.map((ep, idx) => {
              const epNum = Number(ep.episode || ep.serial_number || idx + 1);
              const isFreePreview = epNum === 1;
              return (
                <div 
                  key={ep.chapter_id || ep.episode || idx}
                  className="episode-item-card"
                  onClick={() => handlePlayEpisode(ep)}
                >
                  <div className="episode-item-badge">
                    {epNum}
                  </div>
                  <div className="episode-item-details">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h3 className="episode-item-title">
                        Episódio {epNum}
                      </h3>
                      {isFreePreview ? (
                        <span className="preview-badge-pill" style={{ fontSize: '0.65rem' }}>
                          PRÉVIA GRÁTIS
                        </span>
                      ) : (
                        !authService.isVIP() && (
                          <span className="badge badge-vip" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                            VIP
                          </span>
                        )
                      )}
                    </div>
                    <div className="episode-item-meta">
                      {isFreePreview ? 'Liberado para Assistir • Dublado em HD' : 'Disponível com VIP R$ 5 • Dublado em HD'}
                    </div>
                  </div>
                  <Play size={18} style={{ color: isFreePreview ? '#10B981' : 'var(--accent-coral)', marginLeft: 'auto' }} />
                </div>
              );
            })}
          </div>
        </section>

        {/* Títulos Relacionados */}
        {related.length > 0 && (
          <MediaCarousel
            title="Você Também Pode Gostar"
            items={related}
          />
        )}

        {/* Barra de Descoberta & Links de SEO Interno */}
        <section style={{ margin: 'var(--space-48) 0', padding: 'var(--space-28)', background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
              Explore Análises, Curiosidades e Dicas
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              Confira resenhas completas, os segredos dos melhores mini-dramas e o ranking dos doramas mais assistidos no nosso Blog.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link to="/top-10" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.88rem' }}>
              <Trophy size={16} /> Ver Top 10
            </Link>
            <Link to="/blog" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.88rem' }}>
              <BookOpen size={16} /> Acessar Blog
            </Link>
          </div>
        </section>
      </div>

      {/* Botão Flutuante de Prévia Grátis (posicionado estrategicamente sem sobrepor o WhatsApp) */}
      {episodes.length > 0 && (
        <button 
          className="floating-preview-cta" 
          onClick={() => handlePlayEpisode(episodes[0])}
          aria-label="Assistir 1º episódio grátis"
        >
          <Play size={18} fill="currentColor" />
          <span>Assistir Prévia</span>
          <span className="preview-badge-pill">Ep. 1 Grátis</span>
        </button>
      )}

      {/* Modal VIP acionado ao clicar em episódios sem login */}
      <VIPPaywallModal
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
        onSuccess={handlePaywallSuccess}
      />
    </div>
  );
}

