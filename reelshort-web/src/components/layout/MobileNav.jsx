import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Film, Tv, Bookmark } from 'lucide-react';

export default function MobileNav() {
  return (
    <nav className="mobile-bottom-nav" aria-label="Navegação mobile inferior">
      <NavLink 
        to="/" 
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
        end
      >
        <Home size={22} />
        <span>Início</span>
      </NavLink>

      <NavLink 
        to="/buscar" 
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <Search size={22} />
        <span>Buscar</span>
      </NavLink>

      <NavLink 
        to="/filmes" 
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <Film size={22} />
        <span>Filmes</span>
      </NavLink>

      <NavLink 
        to="/series" 
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <Tv size={22} />
        <span>Séries</span>
      </NavLink>

      <NavLink 
        to="/minha-lista" 
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <Bookmark size={22} />
        <span>Minha Lista</span>
      </NavLink>
    </nav>
  );
}
