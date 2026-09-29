import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Smartphone, 
  Tv, 
  Laptop, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  HelpCircle,
  Play
} from 'lucide-react';
import SEOHead, { buildBreadcrumbSchema } from '../components/seo/SEOHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import AdBanner from '../components/common/AdBanner';
import '../styles/blog.css';

export default function HowToWatchPage() {
  const breadcrumbs = [
    { name: 'Início', url: '/' },
    { name: 'Como Assistir Grátis', url: '/como-assistir' }
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);

  const faqList = [
    {
      q: 'O site Doramas Dublados é realmente 100% gratuito?',
      a: 'Sim! Todos os doramas, novelas asiáticas e mini-dramas estão totalmente liberados para você assistir do primeiro ao último episódio sem pagar nada, sem planos e sem mensalidade.'
    },
    {
      q: 'Preciso cadastrar cartão de crédito ou fazer assinatura?',
      a: 'Não! Não exigimos cartão de crédito, assinaturas recorrentes ou períodos de teste. O acesso é instantâneo e livre para qualquer visitante.'
    },
    {
      q: 'Como a plataforma se sustenta sendo gratuita?',
      a: 'Nosso projeto é sustentado por anúncios publicitários (como Google AdSense). Dessa forma, mantemos os servidores de alta velocidade e os episódios dublados com qualidade HD sem cobrar 1 centavo dos nossos usuários.'
    },
    {
      q: 'Como assistir no celular ou na Smart TV?',
      a: 'Nosso site é totalmente responsivo e otimizado. Você pode assistir no navegador do celular (Chrome, Safari) ou na sua Smart TV abrindo o navegador da televisão e acessando nosso catálogo.'
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqList.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <div className="how-to-watch-view">
      <SEOHead
        title="Como Assistir Novelas e Doramas Dublados Grátis — Guia Completo"
        description="Aprenda como assistir a doramas e novelas asiáticas dubladas em português 100% grátis em qualquer dispositivo. Sem assinatura, sem mensalidade e em alta definição."
        canonicalUrl="https://doramasdublados.online/como-assistir"
        schemaJson={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbSchema, faqSchema]
        }}
      />

      <div className="cinematic-container">
        <Breadcrumbs items={breadcrumbs} />

        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px' }}>
          <span className="blog-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
            <Sparkles size={14} /> STREAMING 100% GRÁTIS E DUBLADO
          </span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', fontWeight: 900, color: '#fff', marginBottom: '16px' }}>
            Como Assistir a Novelas e Doramas Dublados Grátis
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Aproveite centenas de episódios completos dublados em alta definição no seu smartphone, computador ou Smart TV sem pagar nada e sem precisar cadastrar cartão de crédito.
          </p>
        </div>

        {/* Anúncio AdSense Superior */}
        <AdBanner 
          slot="5000000001" 
          style={{ margin: '20px auto 36px' }} 
          label="PUBLICIDADE" 
        />

        {/* 3 Passos Simples */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '32px 24px', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.4rem', fontWeight: 900 }}>
              1
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
              Escolha seu Dorama
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Navegue pelo nosso catálogo completo de novelas asiáticas, mini-dramas de romance, CEO, vingança e fantasia.
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '32px 24px', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.4rem', fontWeight: 900 }}>
              2
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
              Clique no Episódio
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Todos os episódios estão liberados gratuitamente. Selecione o capítulo que você quer ver e dê o play.
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '32px 24px', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.4rem', fontWeight: 900 }}>
              3
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
              Assista em Alta Definição
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Aproveite áudio dublado em português, qualidade Full HD e streaming ultra rápido em qualquer tela.
            </p>
          </div>
        </div>

        {/* Dispositivos Compatíveis */}
        <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-xl)', padding: '40px 32px', marginBottom: '48px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '32px' }}>
            Dispositivos Compatíveis
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', color: '#10B981' }}>
                <Smartphone size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>Celular e Tablet</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.4 }}>Compatível com Android e iPhone diretamente pelo navegador.</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', color: '#10B981' }}>
                <Tv size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>Smart TV</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.4 }}>Assista na tela grande pelo navegador de qualquer Smart TV.</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', color: '#10B981' }}>
                <Laptop size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>Computador e Notebook</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.4 }}>Carregamento ultra rápido no Chrome, Edge, Firefox ou Safari.</p>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link 
              to="/series" 
              className="btn btn-primary"
              style={{ padding: '12px 32px', fontSize: '1rem', background: 'linear-gradient(135deg, #10B981, #059669)', gap: '8px' }}
            >
              <Play size={18} fill="currentColor" /> Começar a Assistir Agora Grátis
            </Link>
          </div>
        </div>

        {/* Anúncio AdSense Central */}
        <AdBanner 
          slot="5000000002" 
          style={{ margin: '30px auto' }} 
          label="PUBLICIDADE" 
        />

        {/* Perguntas Frequentes (FAQ) */}
        <div style={{ maxWidth: '820px', margin: '0 auto 48px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
              Dúvidas Frequentes
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>Tudo o que você precisa saber sobre nosso streaming gratuito</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqList.map((item, idx) => (
              <div key={idx} style={{ background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <HelpCircle size={18} style={{ color: '#10B981' }} />
                  {item.q}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, paddingLeft: '26px' }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Anúncio AdSense Inferior */}
        <AdBanner 
          slot="5000000003" 
          style={{ margin: '30px auto 40px' }} 
          label="PUBLICIDADE" 
        />
      </div>
    </div>
  );
}
