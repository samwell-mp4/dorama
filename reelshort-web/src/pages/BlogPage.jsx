import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles, Tv } from 'lucide-react';
import { getAllPosts, getCategories } from '../data/blogData';
import SEOHead, { buildBreadcrumbSchema } from '../components/seo/SEOHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import AdBanner from '../components/common/AdBanner';
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

  const breadcrumbs = [{ name: 'Blog de Doramas e Novelas', url: '/blog' }];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);

  return (
    <div className="blog-view">
      <SEOHead
        title="Blog de Doramas e Novelas Grátis — Guias, Dicas e Rankings"
        description="Acompanhe o blog oficial do Doramas Dublados Grátis. Rankings de mini-dramas, novidades sobre doramas de romance, CEO e vingança para assistir grátis."
        canonicalUrl="https://doramasdublados.online/blog"
        schemaJson={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbSchema,
            {
              "@type": "Blog",
              "name": "Blog dos Doramas — Doramas Dublados Grátis",
              "description": "Artigos, resenhas e rankings das melhores séries e doramas dublados em português para assistir grátis.",
              "url": "https://doramasdublados.online/blog"
            }
          ]
        }}
      />

      <div className="cinematic-container">
        <Breadcrumbs items={breadcrumbs} />

        {/* Anúncio AdSense Superior */}
        <AdBanner 
          slot="7000000001" 
          style={{ margin: '16px auto 32px' }} 
          label="PUBLICIDADE" 
        />

        {/* Hero do Artigo em Destaque */}
        {selectedCategory === 'Todos' && featuredPost && (
          <section className="blog-hero">
            <div className="blog-hero-content">
              <span className="blog-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
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
                <Link to={`/blog/${featuredPost.slug}`} className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
                  Ler Artigo Completo <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="blog-hero-img-box">
              <img src={featuredPost.coverImage} alt={featuredPost.title} />
            </div>
          </section>
        )}

        {/* Filtro por Categorias */}
        <div className="blog-category-bar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`blog-category-pill ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grade de Artigos */}
        <section className="blog-grid">
          {gridPosts.map(post => (
            <article key={post.id} className="blog-card">
              <Link to={`/blog/${post.slug}`} className="blog-card-img-wrapper">
                <img src={post.coverImage} alt={post.title} loading="lazy" className="blog-card-img" />
                <span className="blog-card-category">{post.category}</span>
              </Link>

              <div className="blog-card-body">
                <div className="blog-card-meta">
                  <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h2 className="blog-card-title">
                  <Link to={`/blog/${post.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {post.title}
                  </Link>
                </h2>

                <p className="blog-card-excerpt">{post.excerpt}</p>

                <div className="blog-card-footer">
                  <Link to={`/blog/${post.slug}`} style={{ color: '#10B981', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                    Continuar lendo <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Anúncio AdSense Inferior */}
        <AdBanner 
          slot="7000000002" 
          style={{ margin: '36px auto' }} 
          label="PUBLICIDADE" 
        />

        {/* Banner 100% Grátis */}
        <section className="article-vip-cta" style={{ marginTop: '32px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(14, 165, 233, 0.08))', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
          <Sparkles size={36} style={{ color: '#10B981', marginBottom: '12px' }} />
          <h3>Assista a Todos os Doramas e Novelas 100% Grátis</h3>
          <p>
            Todas as produções citadas em nossos artigos estão liberadas com dublagem em português e episódios completos sem custos e sem mensalidade.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/series" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #10B981, #059669)', gap: '8px' }}>
              <Tv size={18} /> Explorar Catálogo Grátis
            </Link>
            <Link to="/top-10" className="btn btn-secondary">
              Ver Top 10 Doramas
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
