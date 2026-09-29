import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Film, BookOpen, Layers, Sparkles, ExternalLink, ChevronRight, Tv } from 'lucide-react';
import { SEO_HUBS, ALL_SEO_SLUGS } from '../data/seoPagesData';
import { BLOG_POSTS } from '../data/blogData';
import SEOHead, { buildBreadcrumbSchema } from '../components/seo/SEOHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import AdBanner from '../components/common/AdBanner';
import '../styles/blog.css';

export default function SitemapHtmlPage() {
  const canonicalUrl = 'https://doramasdublados.online/mapa-do-site';

  const breadcrumbsList = [
    { name: 'Início', url: 'https://doramasdublados.online/' },
    { name: 'Mapa do Site', url: canonicalUrl }
  ];

  // Agrupamento dos hubs de SEO para facilitar navegação
  const assistirHubs = ALL_SEO_SLUGS.filter(s => s.includes('assistir') || s.includes('onde') || s.includes('sites'));
  const onlineGratisHubs = ALL_SEO_SLUGS.filter(s => (s.includes('online') || s.includes('gratis') || s.includes('sem-cadastro') || s.includes('streaming')) && !assistirHubs.includes(s));
  const generosHubs = ALL_SEO_SLUGS.filter(s => (s.includes('love') || s.includes('romance') || s.includes('amor') || s.includes('ceo') || s.includes('vinganca') || s.includes('casamento') || s.includes('coreano') || s.includes('chines') || s.includes('japones') || s.includes('kdrama') || s.includes('mini') || s.includes('netflix')) && !assistirHubs.includes(s) && !onlineGratisHubs.includes(s));
  const outrosHubs = ALL_SEO_SLUGS.filter(s => !assistirHubs.includes(s) && !onlineGratisHubs.includes(s) && !generosHubs.includes(s));

  return (
    <div className="blog-container" style={{ minHeight: '100vh', paddingBottom: '80px' }}>
      <SEOHead
        title="Mapa do Site — Diretório Completo de Séries, Doramas e Novelas Dubladas"
        description="Acesse o mapa do site oficial do Doramas Dublados. Encontre todos os hubs de streaming, categorias, gêneros, artigos do blog e séries para assistir online grátis."
        canonical={canonicalUrl}
        ogType="website"
        schema={[buildBreadcrumbSchema(breadcrumbsList)]}
      />

      <div className="blog-content-wrapper" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        <Breadcrumbs items={[{ label: 'Início', path: '/' }, { label: 'Mapa do Site' }]} />

        {/* Header do Mapa do Site */}
        <header style={{ textAlign: 'center', margin: '32px 0 40px' }}>
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '6px 16px', 
              borderRadius: '999px', 
              background: 'rgba(16, 185, 129, 0.1)', 
              color: '#10B981', 
              fontSize: '0.85rem', 
              fontWeight: 700, 
              marginBottom: '16px',
              border: '1px solid rgba(16, 185, 129, 0.25)' 
            }}
          >
            <MapPin size={16} /> DIRETÓRIO & ÍNDICE GERAL DE PÁGINAS
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 900, color: '#fff', marginBottom: '16px' }}>
            Mapa do Site — Todos os Doramas e Séries Dubladas
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
            Navegue por todas as seções, categorias, páginas de busca e artigos editoriais do nosso catálogo. Índice estruturado para navegação rápida de usuários e indexação completa em motores de busca.
          </p>
        </header>

        {/* Anúncio Superior */}
        <AdBanner slot="1200000001" style={{ margin: '24px auto 40px' }} label="PUBLICIDADE" />

        {/* Grade do Diretório */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          
          {/* Seção 1: Páginas de Assistir & Busca Orgânica */}
          <section style={{ background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
              <Tv size={22} style={{ color: '#10B981' }} />
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                Assistir Doramas & Plataformas de Streaming
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
              {assistirHubs.map(slug => {
                const h = SEO_HUBS[slug];
                return (
                  <Link
                    key={slug}
                    to={`/${slug}`}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{h.navLabel}</span>
                    <ChevronRight size={14} style={{ opacity: 0.5 }} />
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Seção 2: Doramas Online & Acesso Gratuito */}
          <section style={{ background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
              <Layers size={22} style={{ color: '#3B82F6' }} />
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                Doramas Online & Catálogo Gratuito
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
              {onlineGratisHubs.map(slug => {
                const h = SEO_HUBS[slug];
                return (
                  <Link
                    key={slug}
                    to={`/${slug}`}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{h.navLabel}</span>
                    <ChevronRight size={14} style={{ opacity: 0.5 }} />
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Seção 3: Gêneros, Países & Temas */}
          <section style={{ background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
              <Sparkles size={22} style={{ color: '#F59E0B' }} />
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                Gêneros, Temas & Países (K-Dramas, C-Dramas, Romance, CEO)
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
              {generosHubs.map(slug => {
                const h = SEO_HUBS[slug];
                return (
                  <Link
                    key={slug}
                    to={`/${slug}`}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{h.navLabel}</span>
                    <ChevronRight size={14} style={{ opacity: 0.5 }} />
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Seção 4: Outros Hubs de Alto Volume */}
          {outrosHubs.length > 0 && (
            <section style={{ background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
                <Film size={22} style={{ color: '#EC4899' }} />
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                  Mais Páginas e Hubs de Séries
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                {outrosHubs.map(slug => {
                  const h = SEO_HUBS[slug];
                  return (
                    <Link
                      key={slug}
                      to={`/${slug}`}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--glass-border)',
                        color: 'var(--text-primary)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span>{h.navLabel}</span>
                      <ChevronRight size={14} style={{ opacity: 0.5 }} />
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Seção 5: Catálogos Principais e Navegação Base */}
          <section style={{ background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
              <Layers size={22} style={{ color: '#10B981' }} />
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                Catálogos Principais do Site
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              <Link to="/" style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', color: '#fff', textDecoration: 'none', fontSize: '0.9rem' }}>Página Inicial</Link>
              <Link to="/series" style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', color: '#fff', textDecoration: 'none', fontSize: '0.9rem' }}>Todas as Séries</Link>
              <Link to="/filmes" style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', color: '#fff', textDecoration: 'none', fontSize: '0.9rem' }}>Filmes & Mini-Dramas</Link>
              <Link to="/em-alta" style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', color: '#fff', textDecoration: 'none', fontSize: '0.9rem' }}>Em Alta no Brasil</Link>
              <Link to="/lancamentos" style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', color: '#fff', textDecoration: 'none', fontSize: '0.9rem' }}>Lançamentos e Novidades</Link>
              <Link to="/top-10" style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', color: '#fff', textDecoration: 'none', fontSize: '0.9rem' }}>Ranking Top 10</Link>
              <Link to="/como-assistir" style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', color: '#fff', textDecoration: 'none', fontSize: '0.9rem' }}>Como Assistir Grátis</Link>
              <Link to="/blog" style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', color: '#fff', textDecoration: 'none', fontSize: '0.9rem' }}>Blog & Dicas de Doramas</Link>
            </div>
          </section>

          {/* Seção 6: Artigos e Guias do Blog */}
          {BLOG_POSTS && BLOG_POSTS.length > 0 && (
            <section style={{ background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
                <BookOpen size={22} style={{ color: '#8B5CF6' }} />
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                  Artigos Editoriais & Análises do Blog
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                {BLOG_POSTS.map(post => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <span style={{ fontWeight: 700, color: '#fff' }}>{post.title}</span>
                    <span style={{ fontSize: '0.8rem', color: '#10B981' }}>{post.category} • {post.readTime}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Anúncio Inferior */}
        <AdBanner slot="1200000002" style={{ margin: '40px auto 20px' }} label="PUBLICIDADE" />
      </div>
    </div>
  );
}
