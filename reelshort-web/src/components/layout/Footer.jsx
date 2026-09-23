import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle } from 'lucide-react';

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
              A melhor e mais completa plataforma de doramas, mini-dramas e séries exclusivas dubladas em português com qualidade cinematográfica.
            </p>
          </div>

          <div className="footer-column">
            <h4>Navegar</h4>
            <ul className="footer-links">
              <li><Link to="/series">Todas as Séries</Link></li>
              <li><Link to="/top-10">Top 10 Melhores</Link></li>
              <li><Link to="/em-alta">Em Alta</Link></li>
              <li><Link to="/lancamentos">Lançamentos</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Gêneros Populares</h4>
            <ul className="footer-links">
              <li><Link to="/generos/romance">Romance & Amor</Link></li>
              <li><Link to="/generos/drama">Drama Familiar</Link></li>
              <li><Link to="/generos/ceo">CEO & Vingança</Link></li>
              <li><Link to="/generos/fantasia">Fantasia & Ação</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Blog & Guias</h4>
            <ul className="footer-links">
              <li><Link to="/blog">Blog dos Doramas</Link></li>
              <li><Link to="/blog/melhores-doramas-dublados-2026">Top Doramas 2026</Link></li>
              <li><Link to="/blog/o-que-sao-mini-dramas-onde-assistir">O Que São Mini-Dramas</Link></li>
              <li><Link to="/blog/doramas-de-ceo-e-vinganca">Séries de CEO</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Institucional</h4>
            <ul className="footer-links">
              <li><Link to="/como-assistir">Como Assistir</Link></li>
              <li><Link to="/login">Área do Assinante</Link></li>
              <li><Link to="/termos">Termos de Uso</Link></li>
              <li><Link to="/privacidade">Privacidade</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Doramas Dublados. Todos os direitos reservados.</p>
          <p>Experiência cinematográfica premium para streaming de doramas dublados.</p>
        </div>
      </div>
    </footer>
  );
}
