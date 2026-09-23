import React, { useState, useEffect } from 'react';
import { X, Crown, CheckCircle, MessageCircle, LogIn, Lock, ArrowRight } from 'lucide-react';
import { authService } from '../../data/authService';
import './authModal.css';

export default function VIPPaywallModal({ isOpen, onClose, onSuccess, initialTab = 'buy' }) {
  const [tab, setTab] = useState(initialTab); // 'buy' | 'login'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTab(initialTab);
    setError('');
  }, [initialTab, isOpen]);

  // Fechar com tecla ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const whatsappNumber = '5531988868362';
  const whatsappMessage = encodeURIComponent('Olá! Quero comprar minha licença VIP do Doramas Dublados por R$ 5,00 para liberar o acesso a todas as séries.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = authService.login(email, password);
    setLoading(false);

    if (result.success) {
      if (onSuccess) onSuccess(result.user);
      onClose();
    } else {
      setError(result.error || 'Credenciais inválidas.');
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="vip-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="vip-modal-close" onClick={onClose} aria-label="Fechar">
          <X size={20} />
        </button>

        <div className="vip-modal-header">
          <div className="vip-crown-badge">
            <Crown size={32} />
          </div>
          <h2 className="vip-modal-title">Acesso Exclusivo VIP</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Para assistir aos episódios completos em HD, adquira sua licença oficial.
          </p>
          <div className="vip-price-tag">
            R$ 5,00 <span>/ licença de acesso total</span>
          </div>
        </div>

        <div className="vip-tabs-nav">
          <button 
            className={`vip-tab-btn ${tab === 'buy' ? 'active' : ''}`}
            onClick={() => setTab('buy')}
          >
            Comprar Licença
          </button>
          <button 
            className={`vip-tab-btn ${tab === 'login' ? 'active' : ''}`}
            onClick={() => setTab('login')}
          >
            Já Tenho Conta
          </button>
        </div>

        <div className="vip-modal-body">
          {tab === 'buy' ? (
            <div>
              <ul className="vip-benefits-list">
                <li className="vip-benefit-item">
                  <CheckCircle size={18} /> Acesso a mais de 140 séries e mini-dramas completos
                </li>
                <li className="vip-benefit-item">
                  <CheckCircle size={18} /> Todos os episódios dublados em Português-BR
                </li>
                <li className="vip-benefit-item">
                  <CheckCircle size={18} /> Resolução Full HD / 4K sem travamentos
                </li>
                <li className="vip-benefit-item">
                  <CheckCircle size={18} /> Liberação instantânea da sua senha pelo WhatsApp
                </li>
              </ul>

              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-whatsapp-buy"
              >
                <MessageCircle size={22} fill="currentColor" /> Comprar no WhatsApp por R$ 5,00
              </a>

              <div className="whatsapp-support-hint">
                Atendimento via WhatsApp Oficial: <strong>(31) 98886-8362</strong>
                <br />
                <span style={{ fontSize: '0.78rem', opacity: 0.7 }}>Pagamento via PIX com ativação em menos de 2 minutos.</span>
              </div>
            </div>
          ) : (
            <form className="auth-form" onSubmit={handleLoginSubmit}>
              {error && <div className="auth-alert-error">{error}</div>}

              <div className="auth-field">
                <label>E-mail ou WhatsApp cadastrado</label>
                <input
                  type="text"
                  className="auth-input"
                  placeholder="ex: seuemail@email.com ou 31988868362"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="auth-field">
                <label>Senha de Acesso</label>
                <input
                  type="password"
                  className="auth-input"
                  placeholder="Sua senha fornecida"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={loading}
                style={{ width: '100%', marginTop: 'var(--space-8)' }}
              >
                <LogIn size={18} /> {loading ? 'Entrando...' : 'Entrar e Assistir Agora'}
              </button>

              <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Não tem uma conta ainda? </span>
                <button 
                  type="button" 
                  onClick={() => setTab('buy')} 
                  style={{ color: 'var(--accent-coral)', fontWeight: 600, textDecoration: 'underline' }}
                >
                  Adquira por R$ 5,00
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
