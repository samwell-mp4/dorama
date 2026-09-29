import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, MapPin, Tv, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="cinematic-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="brand-logo">
              <PlayCircle size={26} className="brand-logo-accent" />
              <span>DORAMAS <span className="brand-logo-accent">DUBLADOS</span></span>
            </Link>
            <p>
              A melhor e mais completa plataforma de novelas e doramas asiáticos dublados em português. Assista a centenas de mini-dramas e séries completas 100% grátis com qualidade cinematográfica.
            </p>
            <div style={{ marginTop: '16px' }}>
              <Link 
                to="/mapa-do-site" 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  color: '#10B981', 
                  fontSize: '0.9rem', 
                  fontWeight: 700, 
                  textDecoration: 'none',
                  background: 'rgba(16, 185, 129, 0.1)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: '1px solid rgba(16, 185, 129, 0.2)'
                }}
              >
                <MapPin size={15} /> Ver Mapa do Site Completo
              </Link>
            </div>
          </div>

          <div className="footer-column">
            <h4>Assistir Online</h4>
            <ul className="footer-links">
              <li><Link to="/assistir-doramas-gratis">Assistir Doramas Grátis</Link></li>
              <li><Link to="/dorama-assistir-online">Dorama Assistir Online</Link></li>
              <li><Link to="/doramas-online-dublado">Doramas Online Dublado</Link></li>
              <li><Link to="/dorama-assistir-online-dublado">Dorama Assistir Online Dublado</Link></li>
              <li><Link to="/dorama-online-gratis">Dorama Online Grátis</Link></li>
              <li><Link to="/doramas-online-de-graca">Doramas Online de Graça</Link></li>
              <li><Link to="/dorama-dublado-assistir-online">Dorama Dublado Assistir Online</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Portais & Sites</h4>
            <ul className="footer-links">
              <li><Link to="/doramas-online">Doramas Online</Link></li>
              <li><Link to="/dorama-online-site">Dorama Online Site</Link></li>
              <li><Link to="/doramas-online-site">Doramas Online Site</Link></li>
              <li><Link to="/dorama-sites">Melhores Dorama Sites</Link></li>
              <li><Link to="/kdrama-online">K-Drama Online</Link></li>
              <li><Link to="/meu-dorama">Portal Meu Dorama</Link></li>
              <li><Link to="/app-para-assistir-doramas-gratis">App Doramas Grátis</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Gêneros & Destaques</h4>
            <ul className="footer-links">
              <li><Link to="/doramas-love">Doramas Love (Romance)</Link></li>
              <li><Link to="/doramas-mais-assistidos">Doramas Mais Assistidos</Link></li>
              <li><Link to="/dorama-novo">Dorama Novo / Lançamentos</Link></li>
              <li><Link to="/doramas-coreanos">Doramas Coreanos</Link></li>
              <li><Link to="/doramas-netflix">Doramas Estilo Netflix</Link></li>
              <li><Link to="/doramas-de-vinganca">Doramas de Vingança</Link></li>
              <li><Link to="/doramas-ceo-e-bilionario">Doramas de CEO & Bilionário</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Links & Blog</h4>
            <ul className="footer-links">
              <li><Link to="/blog">Blog dos Doramas</Link></li>
              <li><Link to="/top-10">Ranking Top 10</Link></li>
              <li><Link to="/como-assistir">Como Assistir Grátis</Link></li>
              <li><Link to="/mapa-do-site">Mapa do Site (Diretório)</Link></li>
              <li><Link to="/login">Painel do Usuário</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Doramas Dublados. Todos os direitos reservados. 100% Grátis e Dublado em Português.</p>
          <p>
            <Link to="/mapa-do-site" style={{ color: 'var(--text-muted)', textDecoration: 'none', marginRight: '14px' }}>Mapa do Site</Link>
            <Link to="/como-assistir" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Guia de Streaming</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
