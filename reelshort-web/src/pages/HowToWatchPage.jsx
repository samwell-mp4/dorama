import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Smartphone, 
  Tv, 
  Laptop, 
  MessageCircle, 
  Crown, 
  ShieldCheck, 
  Zap, 
  HelpCircle 
} from 'lucide-react';
import SEOHead, { buildBreadcrumbSchema } from '../components/seo/SEOHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import '../styles/blog.css';

export default function HowToWatchPage() {
  const breadcrumbs = [
    { name: 'Início', url: '/' },
    { name: 'Como Assistir', url: '/como-assistir' }
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);

  const faqList = [
    {
      q: 'O que está incluído na licença VIP de R$ 5,00?',
      a: 'Acesso total e irrestrito a todos os doramas, mini-dramas e séries do catálogo com episódios completos, dublagem em português e reprodução em alta definição (HD/4K).'
    },
    {
      q: 'O valor de R$ 5,00 é mensal ou pagamento único?',
      a: 'É pagamento único! Você não terá surpresas na fatura do cartão nem renovações automáticas indesejadas.'
    },
    {
      q: 'Quanto tempo demora para liberar o acesso após o Pix?',
      a: 'A ativação é praticamente imediata. Assim que o atendente recebe o comprovante no WhatsApp (31 98886-8362), seu login e senha são gerados e enviados na mesma hora.'
    },
    {
      q: 'Posso assistir em mais de um aparelho?',
      a: 'Sim, você pode se conectar no seu smartphone, tablet, computador ou navegador da Smart TV.'
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

  const whatsappUrl = 'https://wa.me/5531988868362?text=' + encodeURIComponent('Olá! Vi a página Como Assistir e quero liberar minha licença VIP de R$ 5,00 agora.');

  return (
    <div className="how-to-watch-view">
      <SEOHead
        title="Como Assistir Doramas Dublados — Guia Passo a Passo e Ativação VIP"
        description="Aprenda como assistir a doramas e mini-dramas dublados em português em qualquer dispositivo. Libere sua licença VIP por apenas R$ 5,00 no WhatsApp oficial."
        canonicalUrl="https://doramasdublados.online/como-assistir"
        schemaJson={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbSchema, faqSchema]
        }}
      />

      <div className="cinematic-container">
        <Breadcrumbs items={breadcrumbs} />

        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}>
          <span className="blog-badge">
            <Zap size={14} /> GUIA OFICIAL DE STREAMING
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', marginBottom: '16px' }}>
            Como Assistir a Todos os Doramas Dublados
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Tenha acesso instantâneo a centenas de capítulos dublados em alta definição no seu smartphone, computador ou Smart TV com suporte humanizado e ativação em menos de 2 minutos.
          </p>
        </div>

        {/* 3 Passos Simples */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '56px' }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '32px 24px', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(229, 9, 20, 0.1)', color: 'var(--accent-coral)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.4rem', fontWeight: 900 }}>
              1
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
              Chame no WhatsApp
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Clique no botão oficial e envie uma mensagem para o número <strong>(31) 98886-8362</strong> solicitando sua liberação VIP.
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '32px 24px', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(255, 75, 43, 0.1)', color: 'var(--accent-coral)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.4rem', fontWeight: 900 }}>
              2
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
              Pix de R$ 5,00
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Faça a contribuição única de R$ 5,00 via Pix com segurança total. Sem mensalidades e sem cadastro de cartão.
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '32px 24px', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.4rem', fontWeight: 900 }}>
              3
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
              Login Imediato
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Receba seus dados de acesso (e-mail e senha) e entre na página <strong>/login</strong> para maratonar à vontade!
            </p>
          </div>
        </div>

        {/* Compatibilidade de Dispositivos */}
        <section style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-xl)', padding: '40px', marginBottom: '56px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', textAlign: 'center', marginBottom: '32px' }}>
            Compatível com Todos os Seus Aparelhos
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <Smartphone size={32} style={{ color: 'var(--accent-coral)', flexShrink: 0 }} />
              <div>
                <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '6px' }}>Celulares & Tablets</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  Perfeito para telas verticais e navegação por toque em Android e iPhone.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <Tv size={32} style={{ color: 'var(--accent-coral)', flexShrink: 0 }} />
              <div>
                <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '6px' }}>Smart TVs</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  Assista no navegador integrado da sua TV Samsung, LG, Android TV ou Chromecast.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <Laptop size={32} style={{ color: 'var(--accent-coral)', flexShrink: 0 }} />
              <div>
                <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '6px' }}>Computadores</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  Compatível com Chrome, Edge, Safari, Firefox e Opera em alta definição.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section style={{ maxWidth: '820px', margin: '0 auto 56px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', textAlign: 'center', marginBottom: '24px' }}>
            Perguntas Frequentes
          </h2>

          <div className="faq-list">
            {faqList.map((item, idx) => (
              <div key={idx} className="faq-item" style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                  {item.q}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5 }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <section className="article-vip-cta">
          <Crown size={40} style={{ color: 'var(--accent-coral)', marginBottom: '12px' }} />
          <h3>Pronto Para Começar a Maratonar?</h3>
          <p>
            Clique no botão abaixo, fale com a equipe no WhatsApp oficial e tenha seu acesso liberado agora mesmo por apenas R$ 5,00.
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
        </section>
      </div>
    </div>
  );
}
