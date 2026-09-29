import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { Play, SkipForward, SkipBack, ArrowLeft, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { api } from './api';
import { parseSlug, saveContinueWatching } from './data/dataLayer';
import SEOHead, { buildEpisodeSchema, buildBreadcrumbSchema } from './components/seo/SEOHead';
import Breadcrumbs from './components/common/Breadcrumbs';
import AdBanner from './components/common/AdBanner';
import './pages/player.css';

const SPONSOR_AD_URL = 'https://www.profitableratecpmnetwork.com/jywn39jgs?key=759b34e4b3be1787f2495ffd288cd698';

export default function Player() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const slug = params.slug || params['*']?.split('/')[0] || '';
  const parsed = parseSlug(slug);
  const bookId = params.bookId || parsed.id;
  const filteredTitle = params.filteredTitle || parsed.title.replace(/\s+/g, '-').toLowerCase();

  // Extrair número do episódio da URL usando regex
  const path = location.pathname;
  const epMatch = path.match(/episodio[-/](\d+)/i) || path.match(/ep[-/](\d+)/i) || path.match(/\/(\d+)(?:\/|$)/);
  const currentEpisodeNum = epMatch ? parseInt(epMatch[1], 10) : (parseInt(params.episodeNum, 10) || 1);

  const [episodesList, setEpisodesList] = useState([]);
  const [currentChapterId, setCurrentChapterId] = useState(params.chapterId || null);
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(null);
  const [unavailableSeries, setUnavailableSeries] = useState(false);
  const [hasTriggeredSponsor, setHasTriggeredSponsor] = useState(false);

  const videoRef = useRef(null);

  // Resetar estado de patrocinador para exigir 2 cliques a cada novo episódio
  useEffect(() => {
    setHasTriggeredSponsor(false);
  }, [currentEpisodeNum, currentChapterId]);

  // Primeiro clique: abre o patrocinador em nova aba e libera o player
  const handleSponsorClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      window.open(SPONSOR_AD_URL, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.warn('Erro ao abrir link do patrocinador:', err);
    }
    setHasTriggeredSponsor(true);
  };

  // 1. Obter lista de episódios para resolver chapter_id e verificar disponibilidade
  useEffect(() => {
    let isMounted = true;
    const fetchEpisodesInfo = async () => {
      setLoading(true);
      setUnavailableSeries(false);

      try {
        const data = await api.getEpisodes(bookId, filteredTitle);
        const eps = data?.episodes || [];

        // Se a série tiver 0 episódios, marcar como indisponível
        if (!eps || eps.length === 0) {
          if (isMounted) {
            setUnavailableSeries(true);
            setLoading(false);
          }
          return;
        }

        if (isMounted) {
          setEpisodesList(eps);

          // Verificar se o episódio solicitado existe
          const found = eps.find(
            ep => Number(ep.episode || ep.serial_number) === currentEpisodeNum
          );

          if (found) {
            setCurrentChapterId(found.chapter_id);
          } else {
            // Se o episódio solicitado não existir, ir para o primeiro episódio
            const fallbackEp = eps[0];
            const fallbackNum = Number(fallbackEp.episode || fallbackEp.serial_number || 1);
            navigate(`/series/${slug}/temporada-1/episodio-${fallbackNum}`, { replace: true });
            return;
          }
        }
      } catch (err) {
        console.error('Erro ao buscar lista de episódios no player:', err);
        if (isMounted) setUnavailableSeries(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (bookId) {
      fetchEpisodesInfo();
    }
    return () => { isMounted = false; };
  }, [bookId, filteredTitle, currentEpisodeNum, slug]);

  // 2. Buscar URL do vídeo - 100% GRÁTIS PARA TODOS OS EPISÓDIOS!
  useEffect(() => {
    let isMounted = true;
    const fetchVideoUrl = async () => {
      setLoading(true);
      setCountdown(null);

      try {
        const data = await api.getVideo(bookId, currentEpisodeNum, filteredTitle, currentChapterId || '');
        if (data && isMounted) {
          setVideoData(data);
        }
      } catch (err) {
        console.error('Erro ao carregar URL do vídeo:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (currentChapterId && !unavailableSeries) {
      fetchVideoUrl();
    } else {
      setLoading(false);
    }
  }, [bookId, currentEpisodeNum, filteredTitle, currentChapterId, unavailableSeries]);

  // 2.1. Suporte universal a streaming HLS (.m3u8) para todos os navegadores
  useEffect(() => {
    if (!videoRef.current || !videoData?.video_url) return;
    const video = videoRef.current;
    const src = videoData.video_url;

    let hls = null;
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    } else if (window.Hls && window.Hls.isSupported()) {
      hls = new window.Hls({
        enableWorker: true,
        lowLatencyMode: true
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
        // Aguarda os 2 cliques do usuário antes de reproduzir
      });
    } else {
      video.src = src;
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [videoData?.video_url]);

  // 3. Salvar progresso
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 1;
      const percentage = (current / total) * 100;

      saveContinueWatching({
        id: bookId,
        title: parsed.title.toUpperCase(),
        slug: slug || `serie--${bookId}`,
        filteredTitle,
        poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80',
        episodeNum: currentEpisodeNum,
        chapterId: currentChapterId,
        season: 1,
        timestamp: current,
        duration: total,
        percentage
      });
    }
  };

  // 4. Contagem regressiva automática para o próximo episódio
  const hasNext = episodesList.some(ep => Number(ep.episode || ep.serial_number) === currentEpisodeNum + 1);
  const hasPrev = episodesList.some(ep => Number(ep.episode || ep.serial_number) === currentEpisodeNum - 1);

  const handleVideoEnded = () => {
    if (hasNext) {
      setCountdown(5);
    }
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      goToNextEpisode();
    }
  }, [countdown]);

  const goToNextEpisode = () => {
    setCountdown(null);
    const nextEp = episodesList.find(ep => Number(ep.episode || ep.serial_number) === currentEpisodeNum + 1);
    if (nextEp) {
      const num = nextEp.episode || nextEp.serial_number;
      navigate(`/series/${slug}/temporada-1/episodio-${num}`);
    }
  };

  const goToPrevEpisode = () => {
    const prevEp = episodesList.find(ep => Number(ep.episode || ep.serial_number) === currentEpisodeNum - 1);
    if (prevEp) {
      const num = prevEp.episode || prevEp.serial_number;
      navigate(`/series/${slug}/temporada-1/episodio-${num}`);
    }
  };

  // Se a série não tiver episódios disponíveis
  if (unavailableSeries && !loading) {
    return (
      <div className="cinematic-container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <SEOHead 
          title="Conteúdo Indisponível"
          description="Este episódio ou série não possui arquivos disponíveis no momento."
        />
        <div style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <AlertCircle size={56} style={{ color: 'var(--accent-coral)' }} />
          <h2>Esse título não possui episódios disponíveis</h2>
          <p>O conteúdo selecionado está temporariamente indisponível para reprodução.</p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <Link to="/series" className="btn btn-primary">
              Explorar Outras Séries
            </Link>
            <Link to="/" className="btn btn-secondary">
              Voltar ao Início
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    { name: 'Início', url: '/' },
    { name: 'Séries & Novelas', url: '/series' },
    { name: parsed.title || 'Detalhes', url: `/series/${slug}` },
    { name: `Episódio ${currentEpisodeNum}`, url: '#' }
  ];

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const episodeSchema = buildEpisodeSchema({ title: parsed.title, poster: '' }, currentEpisodeNum, currentUrl);
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);

  return (
    <div className="player-view">
      <SEOHead
        title={`${parsed.title} — Episódio ${currentEpisodeNum} Completo Dublado Grátis`}
        description={`Assista ao Episódio ${currentEpisodeNum} de ${parsed.title} online grátis dublado em português! Novela e dorama completo em HD sem mensalidade.`}
        canonicalUrl={currentUrl}
        ogType="video.episode"
        schemaJson={{
          "@context": "https://schema.org",
          "@graph": [episodeSchema, breadcrumbSchema].filter(Boolean)
        }}
      />

      <div className="cinematic-container" style={{ paddingTop: 'var(--space-20)' }}>
        <Breadcrumbs items={breadcrumbs} />

        {/* Anúncio AdSense Superior no Player */}
        <AdBanner 
          slot="1000000001" 
          style={{ marginBottom: '16px' }} 
          label="PUBLICIDADE • APOIE O SITE GRÁTIS" 
        />

        <div className="player-theater">
          <div className="video-element-wrapper">
            {loading ? (
              <div className="skeleton" style={{ width: '100%', height: '100%' }} />
            ) : videoData?.video_url ? (
              <>
                <video
                  ref={videoRef}
                  controls
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={handleVideoEnded}
                >
                  Seu navegador não suporta a reprodução deste vídeo.
                </video>

                {/* Overlay do Patrocinador / 2 Cliques para Reproduzir */}
                {!hasTriggeredSponsor && (
                  <div 
                    className="player-sponsor-overlay"
                    onClick={handleSponsorClick}
                    role="button"
                    tabIndex={0}
                    aria-label="Clique para dar o play e assistir"
                  >
                    <div className="sponsor-play-btn">
                      <Play size={38} fill="#fff" color="#fff" style={{ marginLeft: '4px' }} />
                    </div>
                    <span className="sponsor-play-text">
                      Clique para Dar o Play
                    </span>
                    <span className="sponsor-play-sub">
                      Apoie nosso streaming 100% grátis
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#fff' }}>
                <AlertCircle size={44} style={{ color: 'var(--accent-coral)', marginBottom: '12px' }} />
                <h3>Vídeo em carregamento ou temporariamente indisponível</h3>
                <p style={{ marginTop: '8px', color: 'var(--text-muted)' }}>
                  Aguarde alguns instantes ou selecione outro episódio abaixo.
                </p>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => navigate(`/series/${slug}`)}
                  style={{ marginTop: '16px' }}
                >
                  Ver Lista de Episódios
                </button>
              </div>
            )}

            {/* Contagem regressiva para próximo episódio */}
            {countdown !== null && (
              <div className="next-countdown-overlay">
                <h3>Próximo episódio começando em:</h3>
                <div className="countdown-number">{countdown}</div>
                <button className="btn btn-primary" onClick={goToNextEpisode}>
                  <Play size={18} fill="currentColor" /> Reproduzir Agora
                </button>
                <button 
                  className="btn btn-glass" 
                  onClick={() => setCountdown(null)}
                  style={{ fontSize: '0.85rem' }}
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>

          {/* Faixa Informativa 100% Grátis */}
          <div className="player-preview-banner" style={{ background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.05))', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge" style={{ background: '#10B981', color: '#fff', fontSize: '0.72rem', fontWeight: 800 }}>
                100% GRÁTIS
              </span>
              <span style={{ fontSize: '0.86rem', color: '#fff' }}>
                Você está assistindo ao <strong>Episódio {currentEpisodeNum} completo e dublado</strong>! Todos os episódios são liberados grátis.
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981', fontSize: '0.82rem', fontWeight: 700 }}>
              <Sparkles size={16} /> Sem Mensalidade
            </div>
          </div>

          <div className="player-bottom-bar">
            <div className="player-episode-info">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h2>{parsed.title.toUpperCase()} — Episódio {currentEpisodeNum}</h2>
                <span className="badge" style={{ background: '#10B981', color: '#fff', fontSize: '0.68rem', fontWeight: 800 }}>
                  DUBLADO EM HD
                </span>
              </div>
              <p>Temporada 1 • Áudio com Dublagem em Português • Completo e Grátis</p>
            </div>

            <div className="player-nav-actions">
              <button 
                className="btn btn-secondary" 
                onClick={goToPrevEpisode}
                disabled={!hasPrev}
                aria-label="Episódio Anterior"
              >
                <SkipBack size={18} /> Anterior
              </button>

              <button 
                className="btn btn-primary" 
                onClick={goToNextEpisode}
                disabled={!hasNext}
                aria-label="Próximo Episódio"
              >
                Próximo <SkipForward size={18} />
              </button>

              <Link to={`/series/${slug}`} className="btn btn-glass player-btn-details">
                <ArrowLeft size={18} /> Ver Detalhes
              </Link>
            </div>
          </div>
        </div>

        {/* Anúncio AdSense Central no Player */}
        <AdBanner 
          slot="1000000002" 
          style={{ margin: '24px auto' }} 
          label="PUBLICIDADE" 
        />

        {/* Grade de Troca Rápida de Episódios - 100% Liberada para Todos */}
        {episodesList.length > 0 && (
          <div className="player-episodes-drawer">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-16)', flexWrap: 'wrap', gap: '8px' }}>
              <h3 style={{ margin: 0 }}>Todos os Episódios Disponíveis ({episodesList.length})</h3>
              <span style={{ fontSize: '0.82rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                <CheckCircle2 size={15} /> Todos os {episodesList.length} episódios liberados grátis
              </span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))', gap: '8px' }}>
              {episodesList.map((ep, idx) => {
                const epNum = Number(ep.episode || ep.serial_number || idx + 1);
                const isCurrent = epNum === currentEpisodeNum;
                return (
                  <button
                    key={ep.chapter_id || idx}
                    onClick={() => navigate(`/series/${slug}/temporada-1/episodio-${epNum}`)}
                    className="btn"
                    title={`Assistir Episódio ${epNum} Grátis`}
                    style={{
                      padding: '10px 0',
                      background: isCurrent ? 'var(--accent-coral)' : 'rgba(255,255,255,0.06)',
                      color: isCurrent ? '#fff' : 'var(--text-secondary)',
                      fontWeight: 700,
                      borderRadius: 'var(--radius-sm)',
                      border: isCurrent ? '1px solid var(--accent-coral)' : '1px solid rgba(255,255,255,0.08)',
                      boxShadow: isCurrent ? '0 0 12px var(--accent-glow)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Ep. {epNum}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Anúncio AdSense Inferior no Player */}
        <AdBanner 
          slot="1000000003" 
          style={{ marginTop: '28px' }} 
          label="PUBLICIDADE" 
        />
      </div>
    </div>
  );
}
