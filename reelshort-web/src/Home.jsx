import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from './api';
import { filterAvailableContent, getContinueWatching } from './data/dataLayer';
import HeroMovie from './components/home/HeroMovie';
import MediaCarousel from './components/media/MediaCarousel';
import { HeroSkeleton, CarouselSkeleton } from './components/media/MediaSkeleton';
import SEOHead from './components/seo/SEOHead';
import AdBanner from './components/common/AdBanner';
import { Sparkles, Flame, Heart, TrendingUp, History, Tv, CheckCircle2 } from 'lucide-react';
import './components/home/home.css';

export default function Home() {
  const [bookshelves, setBookshelves] = useState([]);
  const [continueWatching, setContinueWatching] = useState([]);
  const [heroDrama, setHeroDrama] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carregar histórico local
    setContinueWatching(getContinueWatching());

    const loadData = async () => {
      try {
        const data = await api.getBookshelves();
        if (data && data.bookshelves) {
          // Filtrar ESTRITAMENTE todas as séries sem episódios em todas as estantes
          const sanitizedShelves = data.bookshelves.map(shelf => ({
            ...shelf,
            books: filterAvailableContent(shelf.books || [])
          })).filter(shelf => shelf.books.length > 0);

          setBookshelves(sanitizedShelves);

          // Escolher o primeiro livro disponível para o Hero
          if (sanitizedShelves.length > 0 && sanitizedShelves[0].books.length > 0) {
            setHeroDrama(sanitizedShelves[0].books[0]);
          }
        }
      } catch (err) {
        console.error('Erro ao carregar dados da Home:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getShelfIcon = (name) => {
    const lower = (name || '').toLowerCase();
    if (lower.includes('alta')) return <Flame size={20} />;
    if (lower.includes('votados') || lower.includes('drama')) return <TrendingUp size={20} />;
    if (lower.includes('amor') || lower.includes('romance')) return <Heart size={20} />;
    return <Sparkles size={20} />;
  };

  return (
    <div className="home-view">
      <SEOHead 
        title="Novelas e Doramas Dublados Grátis — Catálogo Completo Online"
        description="Assista a novelas e doramas dublados grátis em português! Mini-dramas de romance, CEO, vingança e fantasia com episódios completos sem assinatura."
      />

      {loading ? (
        <>
          <HeroSkeleton />
          <div className="cinematic-container">
            <CarouselSkeleton count={6} />
            <CarouselSkeleton count={6} />
          </div>
        </>
      ) : (
        <>
          {/* Seção Hero Cinematográfica */}
          {heroDrama && <HeroMovie rawMedia={heroDrama} />}

          <div className="cinematic-container">
            {/* Faixa Informativa 100% Grátis */}
            <section 
              className="vip-offer-strip" 
              aria-label="Novelas e Doramas 100% Grátis"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(14, 165, 233, 0.1))',
                borderColor: 'rgba(16, 185, 129, 0.35)'
              }}
            >
              <div className="vip-offer-strip-left">
                <div 
                  className="vip-offer-strip-icon"
                  style={{ background: 'linear-gradient(135deg, #10B981, #059669)', color: '#fff' }}
                >
                  <Sparkles size={28} />
                </div>
                <div>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    Novelas & Doramas Dublados <span style={{ color: '#10B981' }}>100% Grátis</span>
                  </h3>
                  <p>
                    Aproveite centenas de episódios completos dublados em alta definição. Sem cobrança de assinatura, sem cartão e sem burocracia!
                  </p>
                </div>
              </div>
              <Link 
                to="/series" 
                className="btn btn-primary" 
                style={{ padding: '10px 24px', background: 'linear-gradient(135deg, #10B981, #059669)', gap: '8px' }}
              >
                <Tv size={18} /> Ver Catálogo Grátis
              </Link>
            </section>

            {/* Anúncio AdSense Superior da Home */}
            <AdBanner 
              slot="3000000001" 
              style={{ margin: '20px auto 30px' }} 
              label="PUBLICIDADE" 
            />

            {/* Continuar Assistindo (Se houver progresso salvo) */}
            {continueWatching.length > 0 && (
              <MediaCarousel
                title="Continuar Assistindo"
                icon={<History size={20} />}
                items={continueWatching}
                isHorizontal={true}
              />
            )}

            {/* Carrosséis por categoria */}
            {bookshelves.map((shelf, idx) => (
              <React.Fragment key={shelf.bookshelf_name || idx}>
                <MediaCarousel
                  title={shelf.bookshelf_name}
                  icon={getShelfIcon(shelf.bookshelf_name)}
                  items={shelf.books}
                />
                {/* Inserir anúncio responsivo a cada 2 carrosséis */}
                {idx === 1 && (
                  <AdBanner 
                    slot="3000000002" 
                    style={{ margin: '24px auto' }} 
                    label="PUBLICIDADE" 
                  />
                )}
              </React.Fragment>
            ))}

            {/* Anúncio AdSense Rodapé da Home */}
            <AdBanner 
              slot="3000000003" 
              style={{ margin: '30px auto' }} 
              label="PUBLICIDADE" 
            />
          </div>
        </>
      )}
    </div>
  );
}
