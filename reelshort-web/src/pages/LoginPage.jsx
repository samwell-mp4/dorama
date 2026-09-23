import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LogIn, MessageCircle, Crown, Lock, ArrowLeft, PlayCircle } from 'lucide-react';
import { authService } from '../data/authService';
import SEOHead from '../components/seo/SEOHead';
import '../components/auth/authModal.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || '/';

  // Se já estiver logado, redirecionar
  useEffect(() => {
    if (authService.isAuthenticated()) {
      if (authService.isAdmin()) {
        navigate('/admin');
      } else {
        navigate(redirectTo);
      }
    }
  }, [navigate, redirectTo]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = authService.login(email, password);
    setLoading(false);

    if (result.success) {
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(redirectTo);
      }
    } else {
      setError(result.error);
    }
  };

  const whatsappUrl = 'https://wa.me/5531988868362?text=' + encodeURIComponent('Olá! Quero comprar minha licença VIP do Doramas Dublados por R$ 5,00 para ter acesso a todas as séries.');

  return (
    <div style={{ minHeight: 'calc(100vh - var(--topbar-height) - 100px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-40) var(--space-20)' }}>
      <SEOHead 
        title="Entrar na Conta — Doramas Dublados VIP"
        description="Acesse sua conta VIP do Doramas Dublados para assistir a séries e doramas completos em HD."
      />

      <div style={{ width: '100%', maxWidth: '460px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-32)', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-28)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px' }}>
            <PlayCircle size={32} style={{ color: 'var(--accent-coral)' }} />
            <span>DORAMAS <span style={{ color: 'var(--accent-coral)' }}>DUBLADOS</span></span>
          </div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: '8px' }}>Área do Assinante</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Digite seus dados para liberar a reprodução de todas as séries.
          </p>
        </div>

        {error && <div className="auth-alert-error" style={{ marginBottom: 'var(--space-16)' }}>{error}</div>}

        <form onSubmit={handleLogin} className="auth-form">
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
            <label>Senha</label>
            <input
              type="password"
              className="auth-input"
              placeholder="Sua senha de acesso"
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
            <LogIn size={18} /> {loading ? 'Entrando...' : 'Entrar na Plataforma'}
          </button>
        </form>

        <div style={{ margin: 'var(--space-24) 0', position: 'relative', textAlign: 'center' }}>
          <div style={{ height: '1px', background: 'var(--glass-border)' }} />
          <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'var(--bg-surface-elevated)', padding: '0 12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            OU
          </span>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-12)' }}>
            Ainda não tem a sua licença VIP de R$ 5,00?
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-buy"
            style={{ fontSize: '0.95rem' }}
          >
            <MessageCircle size={20} fill="currentColor" /> Adquirir Licença no WhatsApp
          </a>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '10px' }}>
            Suporte e Liberação Rápida: <strong>(31) 98886-8362</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
