import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Search, Sparkles, PlayCircle, LogIn, LogOut, ShieldCheck, User, X } from 'lucide-react';
import { authService } from '../../data/authService';
import VIPPaywallModal from '../auth/VIPPaywallModal';

export default function TopHeader() {
  const [query, setQuery] = useState('');
  const [user, setUser] = useState(authService.getCurrentUser());
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleAuthChange = () => {
      setUser(authService.getCurrentUser());
    };
    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  // Fechar gaveta de busca mobile ao mudar de rota
  useEffect(() => {
    setIsMobileSearchOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(query.trim())}`);
      setIsMobileSearchOpen(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <>
      <header className="topbar">
        <div className="topbar-left">
          <Link to="/" className="brand-logo" aria-label="Doramas Dublados Home">
            <PlayCircle size={28} className="brand-logo-accent" />
            <span>DORAMAS <span className="brand-logo-accent">DUBLADOS</span></span>
          </Link>
        </div>

        {/* Busca Desktop (oculta em mobile < 768px para evitar overflow) */}
        <form className="global-search-form desktop-search-form" onSubmit={handleSearchSubmit}>
          <Search size={18} className="global-search-icon" />
          <input
            type="text"
            className="global-search-input"
            placeholder="Pesquise filmes, séries, atores..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Campo de busca global"
          />
        </form>

        <div className="topbar-right">
          {/* Botão de Toggle de Busca Mobile */}
          <button 
            type="button"
            className={`mobile-search-toggle-btn ${isMobileSearchOpen ? 'active' : ''}`}
            onClick={() => setIsMobileSearchOpen(prev => !prev)}
            aria-label={isMobileSearchOpen ? "Fechar busca" : "Abrir busca"}
          >
            {isMobileSearchOpen ? <X size={20} /> : <Search size={20} />}
          </button>

          {/* Badge VIP Desktop */}
          <button 
            className="vip-badge-header badge badge-vip"
            onClick={() => setIsPaywallOpen(true)}
            style={{ cursor: 'pointer' }}
          >
            <Sparkles size={14} /> VIP R$ 5,00
          </button>

          {/* Badge VIP Mobile Compacto */}
          <button 
            className="vip-badge-mobile"
            onClick={() => setIsPaywallOpen(true)}
            aria-label="Assinar VIP R$ 5,00"
          >
            <Sparkles size={13} />
            <span>VIP R$ 5</span>
          </button>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {user.role === 'admin' ? (
                <Link to="/admin" className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.82rem', gap: '6px', minHeight: '34px' }}>
                  <ShieldCheck size={16} style={{ color: 'var(--accent-coral)' }} /> 
                  <span className="hide-on-mobile">Painel Admin</span>
                </Link>
              ) : (
                <div className="profile-avatar-btn">
                  <div className="profile-avatar-img">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hide-on-mobile" style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user.name.split(' ')[0]}</span>
                  <span className="badge badge-vip" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>VIP</span>
                </div>
              )}

              <button 
                onClick={handleLogout} 
                className="btn-icon" 
                title="Sair da conta" 
                aria-label="Sair"
                style={{ width: '34px', height: '34px' }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="btn btn-secondary"
              style={{ padding: '6px 14px', fontSize: '0.85rem', minHeight: '36px', gap: '6px' }}
            >
              <LogIn size={16} /> Entrar
            </Link>
          )}
        </div>
      </header>

      {/* Gaveta de Busca Mobile (100% de largura, sem qualquer scroll horizontal) */}
      <div className={`mobile-search-drawer ${isMobileSearchOpen ? 'open' : ''}`}>
        <form className="mobile-search-form" onSubmit={handleSearchSubmit}>
          <Search size={18} className="mobile-search-icon" />
          <input
            type="text"
            className="mobile-search-input"
            placeholder="Buscar séries, doramas, atores..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Campo de busca mobile"
            autoFocus={isMobileSearchOpen}
          />
          {query && (
            <button 
              type="button" 
              className="mobile-search-clear" 
              onClick={() => setQuery('')}
              aria-label="Limpar busca"
            >
              <X size={15} />
            </button>
          )}
        </form>
      </div>

      {/* Modal de Pagamento VIP com WhatsApp 31988868362 */}
      <VIPPaywallModal
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
        onSuccess={() => setIsPaywallOpen(false)}
      />
    </>
  );
}
