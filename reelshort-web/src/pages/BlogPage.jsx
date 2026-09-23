import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles, MessageCircle, Crown } from 'lucide-react';
import { getAllPosts, getCategories } from '../data/blogData';
import SEOHead, { buildBreadcrumbSchema } from '../components/seo/SEOHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import '../styles/blog.css';

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredPosts = selectedCategory === 'Todos'
    ? posts
    : posts.filter(p => p.category === selectedCategory);

  const featuredPost = posts[0];
  const gridPosts = filteredPosts.filter(p => p.id !== featuredPost.id || selectedCategory !== 'Todos');

  const breadcrumbs = [{ name: 'Blog dos Doramas', url: '/blog' }];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);

  const whatsappUrl = 'https://wa.me/5531988868362?text=' + encodeURIComponent('Olá! Quero comprar minha licença VIP do Doramas Dublados por R$ 5,00 para liberar todo o catálogo.');

  return (
    <div className="blog-view">
      <SEOHead
        title="Blog dos Doramas — Guias, Notícias e Melhores Séries Dubladas"
        description="Acompanhe o blog oficial do Doramas Dublados. Rankings, análises completas, dicas de mini-dramas, enredos de romance e guias de streaming em português."
        canonicalUrl="https://doramasdublados.online/blog"
        schemaJson={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbSchema,
            {
              "@type": "Blog",
              "name": "Blog dos Doramas — Doramas Dublados",
              "description": "Artigos, resenhas e rankings das melhores séries e doramas dublados em português.",
              "url": "https://doramasdublados.com.br/blog"
            }
          ]
        }}
      />

      <div className="cinematic-container">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero do Artigo em Destaque */}
        {selectedCategory === 'Todos' && featuredPost && (
          <section className="blog-hero">
            <div className="blog-hero-content">
              <span className="blog-badge">
                <Sparkles size={14} /> Artigo em Destaque
              </span>
              <h1 className="blog-hero-title">
                <Link to={`/blog/${featuredPost.slug}`} style={{ color: '#fff', textDecoration: 'none' }}>
                  {featuredPost.title}
                </Link>
              </h1>
              <p className="blog-hero-desc">{featuredPost.excerpt}</p>
              
              <div className="blog-hero-meta">
                <span>Por {featuredPost.author.name}</span>
                <span>•</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={14} /> {new Date(featuredPost.date).toLocaleDateString('pt-BR')}
                </span>
                <span>•</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14} /> {featuredPost.readTime}
                </span>
              </div>

              <div style={{ marginTop: '24px' }}>
                <Link to={`/blog/${featuredPost.slug}`} className="btn btn-primary">
                  Ler Artigo Completo <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Barra de Filtro de Categorias */}
        <div className="blog-filter-bar">
          {categories.map(cat => (
            <button
              key={cat}
              className={`blog-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grade de Artigos */}
        <section className="blog-grid" aria-label="Lista de artigos">
          {gridPosts.map(post => (
            <article key={post.id} className="blog-card">
              <Link to={`/blog/${post.slug}`} className="blog-card-img-wrapper" aria-label={post.title}>
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="blog-card-img"
                  loading="lazy"
                />
                <span className="blog-card-category">{post.category}</span>
              </Link>

              <div className="blog-card-body">
                <div className="blog-card-meta">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={13} /> {new Date(post.date).toLocaleDateString('pt-BR')}
                  </span>
                  <span>•</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} /> {post.readTime}
                  </span>
                </div>

                <h2 className="blog-card-title">
                  <Link to={`/blog/${post.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {post.title}
                  </Link>
                </h2>

                <p className="blog-card-excerpt">{post.excerpt}</p>

                <div className="blog-card-footer">
                  <Link to={`/blog/${post.slug}`} style={{ color: 'var(--accent-coral)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Continuar lendo <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Banner de Conversão VIP */}
        <section className="article-vip-cta" style={{ marginTop: '32px' }}>
          <Crown size={36} style={{ color: 'var(--accent-coral)', marginBottom: '12px' }} />
          <h3>Acesso Ilimitado aos Melhores Doramas Dublados</h3>
          <p>
            Assista a todas as séries completas em HD por uma licença única de R$ 5,00 no WhatsApp oficial. Liberação imediata sem mensalidades!
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <MessageCircle size={18} /> Ativar VIP no WhatsApp (R$ 5,00)
            </a>
            <Link to="/series" className="btn btn-secondary">
              Explorar Todo o Catálogo
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
