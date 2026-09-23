import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Film, 
  Tv, 
  Flame, 
  Sparkles, 
  Bookmark, 
  History, 
  Search, 
  Settings, 
  User,
  BookOpen,
  Trophy
} from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="desktop-sidebar" aria-label="Navegação lateral principal">
      <div className="sidebar-nav-group">
        <NavLink 
          to="/" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          end
        >
          <div className="sidebar-link-icon"><Home size={20} /></div>
          <span className="sidebar-link-text">Início</span>
        </NavLink>

        <NavLink 
          to="/filmes" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <div className="sidebar-link-icon"><Film size={20} /></div>
          <span className="sidebar-link-text">Filmes</span>
        </NavLink>

        <NavLink 
          to="/series" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <div className="sidebar-link-icon"><Tv size={20} /></div>
          <span className="sidebar-link-text">Séries</span>
        </NavLink>

        <NavLink 
          to="/em-alta" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <div className="sidebar-link-icon"><Flame size={20} /></div>
          <span className="sidebar-link-text">Em Alta</span>
        </NavLink>

        <NavLink 
          to="/lancamentos" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <div className="sidebar-link-icon"><Sparkles size={20} /></div>
          <span className="sidebar-link-text">Lançamentos</span>
        </NavLink>

        <NavLink 
          to="/top-10" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <div className="sidebar-link-icon"><Trophy size={20} /></div>
          <span className="sidebar-link-text">Top 10</span>
        </NavLink>

        <NavLink 
          to="/blog" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <div className="sidebar-link-icon"><BookOpen size={20} /></div>
          <span className="sidebar-link-text">Blog</span>
        </NavLink>

        <div className="sidebar-divider" />

        <NavLink 
          to="/minha-lista" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <div className="sidebar-link-icon"><Bookmark size={20} /></div>
          <span className="sidebar-link-text">Minha Lista</span>
        </NavLink>

        <NavLink 
          to="/historico" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <div className="sidebar-link-icon"><History size={20} /></div>
          <span className="sidebar-link-text">Histórico</span>
        </NavLink>
      </div>

      <div className="sidebar-nav-group">
        <NavLink 
          to="/buscar" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <div className="sidebar-link-icon"><Search size={20} /></div>
          <span className="sidebar-link-text">Busca</span>
        </NavLink>

        <NavLink 
          to="/configuracoes" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <div className="sidebar-link-icon"><Settings size={20} /></div>
          <span className="sidebar-link-text">Configurações</span>
        </NavLink>

        <NavLink 
          to="/minha-lista" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <div className="sidebar-link-icon"><User size={20} /></div>
          <span className="sidebar-link-text">Perfil</span>
        </NavLink>
      </div>
    </aside>
  );
}
