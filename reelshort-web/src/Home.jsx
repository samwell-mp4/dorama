import React, { useState, useEffect } from 'react';
import { api } from './api';
import { filterAvailableContent, getContinueWatching } from './data/dataLayer';
import HeroMovie from './components/home/HeroMovie';
import MediaCarousel from './components/media/MediaCarousel';
import { HeroSkeleton, CarouselSkeleton } from './components/media/MediaSkeleton';
import SEOHead from './components/seo/SEOHead';
import { Crown, Sparkles, Flame, Heart, TrendingUp, History } from 'lucide-react';
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
        title="Início — Filmes, Séries e Mini-dramas Exclusivos"
        description="Assista aos melhores mini-dramas e séries com dublagem em português, catálogo completo e qualidade cinematográfica."
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
            {/* Faixa VIP R$ 4,99 */}
            <section className="vip-offer-strip" aria-label="Oferta de Assinatura VIP">
              <div className="vip-offer-strip-left">
                <div className="vip-offer-strip-icon">
                  <Crown size={28} />
                </div>
                <div>
                  <h3>Acesso VIP Ilimitado por apenas <span>R$ 4,99/mês</span></h3>
                  <p>Desbloqueie todos os episódios em 4K, sem anúncios e com lançamentos antecipados.</p>
                </div>
              </div>
              <button className="btn btn-primary" style={{ padding: '10px 28px' }}>
                Garantir Desconto
              </button>
            </section>

            {/* Continuar Assistindo (Se houver progresso salvo) */}
            {continueWatching.length > 0 && (
              <MediaCarousel
                title="Continuar Assistindo"
                icon={<History size={20} />}
                items={continueWatching}
                isHorizontal={true}
              />
            )}

            {/* Carrosséis por categoria vindos da API */}
            {bookshelves.map((shelf, idx) => (
              <MediaCarousel
                key={shelf.bookshelf_name || idx}
                title={shelf.bookshelf_name}
                icon={getShelfIcon(shelf.bookshelf_name)}
                items={shelf.books}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
