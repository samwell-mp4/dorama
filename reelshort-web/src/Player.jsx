import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { Play, SkipForward, SkipBack, ArrowLeft, AlertCircle, Crown, Lock, MessageCircle, LogIn } from 'lucide-react';
import { api } from './api';
import { parseSlug, saveContinueWatching } from './data/dataLayer';
import { authService } from './data/authService';
import SEOHead, { buildEpisodeSchema, buildBreadcrumbSchema } from './components/seo/SEOHead';
import Breadcrumbs from './components/common/Breadcrumbs';
import VIPPaywallModal from './components/auth/VIPPaywallModal';
import './pages/player.css';

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

  // Controle de Acesso VIP (Episódio 1 é PRÉVIA GRÁTIS liberada para todos)
  const isPreviewEp = currentEpisodeNum === 1;
  const initialIsVIP = authService.isAuthenticated() && authService.isVIP();
  const [isVIPUser, setIsVIPUser] = useState(initialIsVIP);
  const [isPaywallModalOpen, setIsPaywallModalOpen] = useState(!initialIsVIP && !isPreviewEp);

  const videoRef = useRef(null);

  useEffect(() => {
    const handleAuth = () => {
      const isAuthVIP = authService.isAuthenticated() && authService.isVIP();
      setIsVIPUser(isAuthVIP);
      if (isAuthVIP || currentEpisodeNum === 1) {
        setIsPaywallModalOpen(false);
      }
    };
    window.addEventListener('authChange', handleAuth);
    return () => window.removeEventListener('authChange', handleAuth);
  }, [currentEpisodeNum]);

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
            // Se o episódio solicitado não existir (ex: foi além do limite), ir para o primeiro episódio
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

  // 2. Buscar URL do vídeo (apenas se for VIP)
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

    if (currentChapterId && !unavailableSeries && (isVIPUser || currentEpisodeNum === 1)) {
      fetchVideoUrl();
    } else {
      setLoading(false);
      if (!isVIPUser && currentEpisodeNum > 1) {
        setIsPaywallModalOpen(true);
      }
    }
  }, [bookId, currentEpisodeNum, filteredTitle, currentChapterId, unavailableSeries, isVIPUser]);

  // 2.1. Suporte universal a streaming HLS (.m3u8) para todos os navegadores (Desktop & Mobile)
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
        video.play().catch(() => {});
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
    if (videoRef.current && isVIPUser) {
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

  // 4. Contagem regressiva para próximo episódio ou abrir oferta VIP se finalizou a prévia grátis do Ep. 1
  const handleVideoEnded = () => {
    if (!isVIPUser && currentEpisodeNum === 1) {
      setIsPaywallModalOpen(true);
      return;
    }
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

  const hasNext = episodesList.some(ep => Number(ep.episode || ep.serial_number) === currentEpisodeNum + 1);
  const hasPrev = episodesList.some(ep => Number(ep.episode || ep.serial_number) === currentEpisodeNum - 1);

  const goToNextEpisode = () => {
    if (!isVIPUser) {
      setIsPaywallModalOpen(true);
      return;
    }
    setCountdown(null);
    const nextEp = episodesList.find(ep => Number(ep.episode || ep.serial_number) === currentEpisodeNum + 1);
    if (nextEp) {
      const num = nextEp.episode || nextEp.serial_number;
      navigate(`/series/${slug}/temporada-1/episodio-${num}`);
    }
  };

  const goToPrevEpisode = () => {
    if (!isVIPUser) {
      setIsPaywallModalOpen(true);
      return;
    }
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
    { name: 'Séries', url: '/series' },
    { name: parsed.title || 'Detalhes', url: `/series/${slug}` },
    { name: `Episódio ${currentEpisodeNum}`, url: '#' }
  ];

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const episodeSchema = buildEpisodeSchema({ title: parsed.title, poster: '' }, currentEpisodeNum, currentUrl);
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);

  const whatsappUrl = 'https://wa.me/5531988868362?text=' + encodeURIComponent('Olá! Quero comprar minha licença VIP do Doramas Dublados por R$ 5,00 para liberar o acesso.');

  return (
    <div className="player-view">
      <SEOHead
        title={`${parsed.title} — Episódio ${currentEpisodeNum} | Reprodução HD`}
        description={`Assista ao Episódio ${currentEpisodeNum} de ${parsed.title} online no Doramas Dublados.`}
        canonicalUrl={currentUrl}
        ogType="video.episode"
        schemaJson={{
          "@context": "https://schema.org",
          "@graph": [episodeSchema, breadcrumbSchema].filter(Boolean)
        }}
      />

      <div className="cinematic-container" style={{ paddingTop: 'var(--space-20)' }}>
        <Breadcrumbs items={breadcrumbs} />

        <div className="player-theater">
          <div className="video-element-wrapper">
            {/* Paywall Overlay para Não Logados / Não VIP apenas se NÃO for o 1º episódio grátis */}
            {!isVIPUser && currentEpisodeNum !== 1 ? (
              <div className="vip-theater-lock-overlay">
                <div className="vip-theater-lock-icon">
                  <Lock size={28} />
                </div>
                <h2 className="vip-theater-lock-title">
                  Conteúdo Exclusivo VIP
                </h2>
                <p className="vip-theater-lock-desc">
                  Para assistir a todos os episódios em Full HD e dublados, adquira sua licença oficial por apenas <strong>R$ 5,00</strong>.
                </p>

                <div className="vip-theater-lock-actions">
                  <a 
                    href={whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary"
                    style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', gap: '8px' }}
                  >
                    <MessageCircle size={18} fill="currentColor" /> Comprar no WhatsApp (31) 98886-8362
                  </a>
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => setIsPaywallModalOpen(true)}
                  >
                    <LogIn size={18} /> Já Tenho Conta / Entrar
                  </button>
                </div>
              </div>
            ) : loading ? (
              <div className="skeleton" style={{ width: '100%', height: '100%' }} />
            ) : videoData?.video_url ? (
              <video
                ref={videoRef}
                controls
                autoPlay
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnded}
              >
                Seu navegador não suporta a reprodução deste vídeo.
              </video>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#fff' }}>
                <AlertCircle size={44} style={{ color: 'var(--accent-coral)', marginBottom: '12px' }} />
                <h3>Vídeo não disponível ou em processamento</h3>
                <p style={{ marginTop: '8px', color: 'var(--text-muted)' }}>
                  Não foi possível reproduzir este episódio no momento.
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

          {/* Banner Informativo de Prévia Grátis para Usuários Não-VIP no Ep. 1 */}
          {!isVIPUser && currentEpisodeNum === 1 && (
            <div className="player-preview-banner">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge" style={{ background: '#10B981', color: '#fff', fontSize: '0.72rem', fontWeight: 800 }}>
                  PRÉVIA GRÁTIS
                </span>
                <span style={{ fontSize: '0.86rem', color: '#fff' }}>
                  Você está assistindo ao <strong>1º episódio grátis</strong>!
                </span>
              </div>
              <button 
                onClick={() => setIsPaywallModalOpen(true)}
                className="btn btn-primary"
                style={{ padding: '6px 14px', fontSize: '0.82rem', gap: '6px', minHeight: '34px' }}
              >
                <Crown size={15} /> Desbloquear Série Completa R$ 5
              </button>
            </div>
          )}

          <div className="player-bottom-bar">
            <div className="player-episode-info">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h2>{parsed.title.toUpperCase()} — Episódio {currentEpisodeNum}</h2>
                {currentEpisodeNum === 1 && (
                  <span className="badge" style={{ background: '#10B981', color: '#fff', fontSize: '0.68rem', fontWeight: 800 }}>
                    PRÉVIA GRÁTIS
                  </span>
                )}
              </div>
              <p>Temporada 1 • Áudio Original com Dublagem PT-BR</p>
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

        {/* Grade de Troca Rápida de Episódios */}
        {episodesList.length > 0 && (
          <div className="player-episodes-drawer">
            <h3 style={{ marginBottom: 'var(--space-16)' }}>Todos os Episódios ({episodesList.length})</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))', gap: '8px' }}>
              {episodesList.map((ep, idx) => {
                const epNum = Number(ep.episode || ep.serial_number || idx + 1);
                const isCurrent = epNum === currentEpisodeNum;
                const isFreePreview = epNum === 1;
                return (
                  <button
                    key={ep.chapter_id || idx}
                    onClick={() => {
                      if (!isVIPUser && epNum > 1) {
                        setIsPaywallModalOpen(true);
                      } else {
                        navigate(`/series/${slug}/temporada-1/episodio-${epNum}`);
                      }
                    }}
                    className="btn"
                    style={{
                      padding: '10px 0',
                      background: isCurrent ? 'var(--accent-coral)' : (isFreePreview ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.06)'),
                      color: isFreePreview && !isCurrent ? '#10B981' : '#fff',
                      fontWeight: 700,
                      borderRadius: 'var(--radius-sm)',
                      border: isFreePreview && !isCurrent ? '1px solid rgba(16, 185, 129, 0.35)' : 'none',
                      boxShadow: isCurrent ? '0 0 12px var(--accent-glow)' : 'none'
                    }}
                  >
                    Ep. {epNum} {isFreePreview && '✨'}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Modal VIP acionado quando o usuário tenta assistir */}
      <VIPPaywallModal
        isOpen={isPaywallModalOpen}
        onClose={() => setIsPaywallModalOpen(false)}
        onSuccess={() => {
          setIsVIPUser(true);
          setIsPaywallModalOpen(false);
        }}
      />
    </div>
  );
}
