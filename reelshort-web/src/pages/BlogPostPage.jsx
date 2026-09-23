import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Share2, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  MessageCircle, 
  Crown, 
  List, 
  ArrowLeft,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { getPostBySlug, getRelatedPosts } from '../data/blogData';
import SEOHead, { buildBreadcrumbSchema } from '../components/seo/SEOHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import '../styles/blog.css';

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getPostBySlug(slug);

  const [readingProgress, setReadingProgress] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Monitorar rolagem para barra de progresso
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="cinematic-container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Artigo não encontrado</h2>
        <p style={{ color: 'var(--text-secondary)', margin: '16px 0 24px' }}>
          O artigo solicitado não existe ou foi movido.
        </p>
        <Link to="/blog" className="btn btn-primary">
          <ArrowLeft size={18} /> Voltar ao Blog
        </Link>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post.slug, 3);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://doramasdublados.online/blog/${post.slug}`;

  const breadcrumbs = [
    { name: 'Blog dos Doramas', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` }
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);

  // Schema.org BlogPosting
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.metaTitle || post.title,
    "description": post.metaDescription,
    "image": post.coverImage,
    "author": {
      "@type": "Person",
      "name": post.author.name
    },
    "publisher": {
      "@type": "Organization",
      "name": "Doramas Dublados",
      "logo": {
        "@type": "ImageObject",
        "url": "https://doramasdublados.com.br/favicon.svg"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    }
  };

  // Schema.org FAQPage se houver FAQs
  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  } : null;

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, blogPostingSchema, faqSchema].filter(Boolean)
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      alert('Link do artigo copiado com sucesso!');
    }
  };

  const whatsappUrl = 'https://wa.me/5531988868362?text=' + encodeURIComponent(`Olá! Li o artigo "${post.title}" no Blog e quero ativar minha licença VIP de R$ 5,00.`);

  return (
    <div className="article-view">
      {/* Barra de Progresso de Leitura */}
      <div 
        className="reading-progress-bar" 
        style={{ width: `${readingProgress}%` }} 
        aria-hidden="true"
      />

      <SEOHead
        title={post.metaTitle || `${post.title} — Blog dos Doramas`}
        description={post.metaDescription}
        canonicalUrl={currentUrl}
        ogImage={post.coverImage}
        ogType="article"
        schemaJson={combinedSchema}
      />

      <div className="cinematic-container">
        <Breadcrumbs items={breadcrumbs} />

        <article className="article-wrapper">
          {/* Cabeçalho do Artigo */}
          <header className="article-header">
            <span className="blog-badge">{post.category}</span>
            <h1 className="article-title">{post.title}</h1>
            <p className="article-lead">{post.excerpt}</p>

            <div className="article-author-box">
              <div className="article-author-avatar">
                {post.author.name.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: '#fff' }}>{post.author.name}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{post.author.role}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <Calendar size={14} /> {new Date(post.date).toLocaleDateString('pt-BR')}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <Clock size={14} /> {post.readTime}
                </span>
                <button 
                  onClick={handleShare}
                  className="btn btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                  aria-label="Compartilhar artigo"
                >
                  <Share2 size={15} /> Compartilhar
                </button>
              </div>
            </div>

            <div className="article-featured-image">
              <img src={post.coverImage} alt={post.title} />
            </div>
          </header>

          {/* Layout Principal com Índice e Conteúdo */}
          <div className="article-layout">
            {/* Índice Lateral Navegável */}
            {post.tableOfContents && post.tableOfContents.length > 0 && (
              <aside className="article-toc-box" aria-label="Índice do conteúdo">
                <div className="article-toc-title">
                  <List size={16} /> Índice do Artigo
                </div>
                <nav>
                  <ul className="article-toc-list">
                    {post.tableOfContents.map((item, idx) => (
                      <li key={item.id}>
                        <a href={`#${item.id}`} className="article-toc-link">
                          {idx + 1}. {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>
            )}

            {/* Conteúdo Editorial do Artigo */}
            <main className="article-content">
              {post.contentSections.map(section => (
                <section key={section.id} id={section.id} className="article-section">
                  <h2>{section.heading}</h2>

                  {section.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}

                  {section.highlight && (
                    <div className="article-highlight-box">
                      "{section.highlight}"
                    </div>
                  )}

                  {/* Card de Dorama Vinculado */}
                  {section.seriesRecommendation && (
                    <div className="article-series-card">
                      <div className="article-series-info">
                        <span className="badge badge-accent" style={{ marginBottom: '8px' }}>
                          <Sparkles size={12} /> {section.seriesRecommendation.badge}
                        </span>
                        <h3 className="article-series-title">{section.seriesRecommendation.title}</h3>
                        <p className="article-series-desc">{section.seriesRecommendation.synopsis}</p>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <Link 
                            to={`/series/${section.seriesRecommendation.slug}`} 
                            className="btn btn-primary"
                            style={{ padding: '8px 18px', fontSize: '0.88rem' }}
                          >
                            <Play size={16} /> Assistir Dorama ({section.seriesRecommendation.episodes} eps)
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              ))}

              {/* Seção de FAQ Estruturada */}
              {post.faqs && post.faqs.length > 0 && (
                <section id="perguntas-frequentes" className="article-faq-container">
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '20px' }}>
                    Perguntas Frequentes (FAQ)
                  </h2>
                  <div className="faq-list">
                    {post.faqs.map((faq, idx) => {
                      const isOpen = openFaqIndex === idx;
                      return (
                        <div key={idx} className="faq-item">
                          <button
                            className="faq-question"
                            onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                            aria-expanded={isOpen}
                          >
                            <span>{faq.question}</span>
                            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </button>
                          {isOpen && (
                            <div className="faq-answer">
                              <p>{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Banner de Conversão VIP */}
              <div className="article-vip-cta">
                <Crown size={36} style={{ color: 'var(--accent-coral)', marginBottom: '12px' }} />
                <h3>Gostou das Recomendações? Assista Agora!</h3>
                <p>
                  Desbloqueie todos os episódios dublados em alta definição por apenas R$ 5,00 no WhatsApp oficial. Acesso instantâneo e garantido!
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <MessageCircle size={18} /> Chamar no WhatsApp (31) 98886-8362
                  </a>
                  <Link to="/series" className="btn btn-secondary">
                    Ver Catálogo Completo
                  </Link>
                </div>
              </div>
            </main>
          </div>

          {/* Artigos Relacionados */}
          {relatedPosts.length > 0 && (
            <section style={{ marginTop: '64px', paddingTop: '40px', borderTop: '1px solid var(--glass-border)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '24px', color: '#fff' }}>
                Você Também Pode Gostar
              </h3>
              <div className="blog-grid">
                {relatedPosts.map(rel => (
                  <article key={rel.id} className="blog-card">
                    <Link to={`/blog/${rel.slug}`} className="blog-card-img-wrapper">
                      <img src={rel.coverImage} alt={rel.title} className="blog-card-img" />
                      <span className="blog-card-category">{rel.category}</span>
                    </Link>
                    <div className="blog-card-body">
                      <h4 className="blog-card-title">
                        <Link to={`/blog/${rel.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {rel.title}
                        </Link>
                      </h4>
                      <p className="blog-card-excerpt">{rel.excerpt}</p>
                      <div className="blog-card-footer">
                        <Link to={`/blog/${rel.slug}`} style={{ color: 'var(--accent-coral)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          Ler Artigo <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </div>
  );
}
