import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Users, 
  Crown, 
  DollarSign, 
  UserCheck, 
  UserX, 
  Plus, 
  Search, 
  Trash2, 
  Copy, 
  Check, 
  LogOut, 
  X,
  Lock,
  MessageSquare
} from 'lucide-react';
import { authService } from '../../data/authService';
import SEOHead from '../../components/seo/SEOHead';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import './admin.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(authService.isAdmin());
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  // Modal de Criar Usuário
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newStatus, setNewStatus] = useState('active');
  const [modalError, setModalError] = useState('');

  // Login de Admin (se não estiver logado)
  const [adminEmail, setAdminEmail] = useState('admin@doramasdublados.com');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');

  const loadUsers = () => {
    setUsers(authService.getAllUsers());
  };

  useEffect(() => {
    setIsAdminLoggedIn(authService.isAdmin());
    loadUsers();

    const handleAuthChange = () => {
      setIsAdminLoggedIn(authService.isAdmin());
      loadUsers();
    };

    window.addEventListener('authChange', handleAuthChange);
    window.addEventListener('usersChanged', loadUsers);
    return () => {
      window.removeEventListener('authChange', handleAuthChange);
      window.removeEventListener('usersChanged', loadUsers);
    };
  }, []);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const result = authService.login(adminEmail, adminPassword);
    if (result.success && result.user.role === 'admin') {
      setIsAdminLoggedIn(true);
      loadUsers();
    } else {
      setLoginError('Credenciais de administrador inválidas.');
    }
  };

  const handleLogout = () => {
    authService.logout();
    setIsAdminLoggedIn(false);
    navigate('/');
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    setModalError('');

    if (!newEmail.trim() || !newPassword.trim()) {
      setModalError('Preencha o E-mail/WhatsApp e a Senha.');
      return;
    }

    const result = authService.createUser({
      name: newName,
      email: newEmail,
      password: newPassword,
      role: 'user',
      isVIP: true,
      status: newStatus
    });

    if (result.success) {
      setIsModalOpen(false);
      setNewName('');
      setNewEmail('');
      setNewPassword('');
      loadUsers();
    } else {
      setModalError(result.error);
    }
  };

  const handleToggleStatus = (id) => {
    authService.toggleUserStatus(id);
    loadUsers();
  };

  const handleDeleteUser = (id, name) => {
    if (window.confirm(`Tem certeza que deseja excluir o usuário "${name}"?`)) {
      authService.deleteUser(id);
      loadUsers();
    }
  };

  const handleCopyAccess = (user) => {
    const text = `🎬 *SEUS DADOS DE ACESSO AO DORAMAS DUBLADOS VIP:*\n\n` +
                 `👤 *Nome:* ${user.name}\n` +
                 `🔑 *Login:* ${user.email}\n` +
                 `🔒 *Senha:* ${user.password}\n` +
                 `🌐 *Acesse em:* ${window.location.origin}/login\n\n` +
                 `_Aproveite todo o catálogo de séries e doramas sem limites!_`;
    navigator.clipboard?.writeText(text);
    setCopiedId(user.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Se não for admin, exibir tela de autenticação administrativa
  if (!isAdminLoggedIn) {
    return (
      <div style={{ minHeight: 'calc(100vh - 120px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <SEOHead title="Acesso Administrativo — Doramas Dublados" description="Painel restrito de gerenciamento." />
        <div style={{ width: '100%', maxWidth: '440px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-xl)', padding: '32px', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--accent-subtle)', color: 'var(--accent-coral)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Lock size={32} />
          </div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>Painel do Administrador</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
            Área restrita para criação e controle de licenças VIP.
          </p>

          {loginError && <div className="auth-alert-error" style={{ marginBottom: '16px' }}>{loginError}</div>}

          <form onSubmit={handleAdminLogin} className="auth-form" style={{ textAlign: 'left' }}>
            <div className="auth-field">
              <label>E-mail do Administrador</label>
              <input
                type="email"
                className="auth-input"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
              />
            </div>
            <div className="auth-field">
              <label>Senha de Administrador</label>
              <input
                type="password"
                className="auth-input"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '12px' }}>
              <ShieldCheck size={18} /> Acessar Painel
            </button>
          </form>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '20px' }}>
            Padrão inicial do sistema: <strong>admin@doramasdublados.com</strong> / <strong>admin123</strong>
          </p>
        </div>
      </div>
    );
  }

  // Métricas do Dashboard
  const clientUsers = users.filter(u => u.role !== 'admin');
  const activeVIPs = clientUsers.filter(u => u.isVIP && u.status === 'active');
  const blockedUsers = clientUsers.filter(u => u.status === 'blocked');
  const totalRevenue = activeVIPs.length * 5; // R$ 5,00 por licença

  // Filtro de pesquisa
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-dashboard-view">
      <SEOHead title="Dashboard de Administração — Doramas Dublados" description="Gerenciamento de usuários e licenças VIP." />

      <div className="cinematic-container">
        <Breadcrumbs items={[{ name: 'Painel Admin', url: '/admin' }]} />

        {/* Top Header Row */}
        <div className="admin-header-row">
          <div className="admin-title-box">
            <h1>
              <ShieldCheck style={{ color: 'var(--accent-coral)' }} /> Painel de Administração
            </h1>
            <p>Gerencie o cadastro de clientes, licenças de R$ 5,00 e permissões de acesso.</p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
              <Plus size={18} /> Novo Usuário VIP
            </button>
            <button className="btn btn-secondary" onClick={handleLogout}>
              <LogOut size={16} /> Sair
            </button>
          </div>
        </div>

        {/* KPI Metrics Grid */}
        <div className="admin-metrics-grid">
          <div className="metric-card">
            <div className="metric-icon-box metric-icon-gold">
              <Crown size={26} />
            </div>
            <div className="metric-info">
              <h3>{activeVIPs.length}</h3>
              <span>Clientes VIP Ativos</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box metric-icon-green">
              <DollarSign size={26} />
            </div>
            <div className="metric-info">
              <h3>R$ {totalRevenue.toFixed(2).replace('.', ',')}</h3>
              <span>Faturamento Total (R$ 5/licença)</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box metric-icon-blue">
              <Users size={26} />
            </div>
            <div className="metric-info">
              <h3>{users.length}</h3>
              <span>Total de Contas</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box metric-icon-coral">
              <UserX size={26} />
            </div>
            <div className="metric-info">
              <h3>{blockedUsers.length}</h3>
              <span>Contas Bloqueadas</span>
            </div>
          </div>
        </div>

        {/* Search & Action Bar */}
        <div className="admin-action-bar">
          <div className="admin-search-box">
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="admin-search-input"
              placeholder="Pesquisar por nome, WhatsApp ou e-mail..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Exibindo {filteredUsers.length} usuário(s)
          </span>
        </div>

        {/* Users Table */}
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Usuário / Nome</th>
                <th>Login / Contato</th>
                <th>Plano</th>
                <th>Status</th>
                <th>Data Cadastro</th>
                <th style={{ textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => {
                const isAdmin = u.role === 'admin';
                return (
                  <tr key={u.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: '#fff' }}>{u.name}</div>
                      {isAdmin && <span className="badge badge-accent" style={{ fontSize: '0.68rem', marginTop: '2px' }}>Admin</span>}
                    </td>
                    <td>
                      <div style={{ fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{u.email}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Senha: {u.password}</div>
                    </td>
                    <td>
                      <span className="badge badge-vip">{u.plan || 'VIP R$ 5,00'}</span>
                    </td>
                    <td>
                      <span className={`status-badge ${u.status === 'active' ? 'active' : 'blocked'}`}>
                        {u.status === 'active' ? 'Ativo' : 'Bloqueado'}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      {new Date(u.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td>
                      <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                        {/* Botão de Copiar Dados para WhatsApp */}
                        <button
                          className="btn-table-action btn-secondary"
                          onClick={() => handleCopyAccess(u)}
                          title="Copiar dados para enviar no WhatsApp"
                        >
                          {copiedId === u.id ? <Check size={14} style={{ color: '#10B981' }} /> : <Copy size={14} />}
                          {copiedId === u.id ? 'Copiado!' : 'Copiar Acesso'}
                        </button>

                        {/* Alternar Status (Ativo / Bloqueado) */}
                        {!isAdmin && (
                          <button
                            className="btn-table-action btn-secondary"
                            onClick={() => handleToggleStatus(u.id)}
                            style={{ color: u.status === 'active' ? '#F87171' : '#34D399' }}
                            title={u.status === 'active' ? 'Bloquear usuário' : 'Ativar usuário'}
                          >
                            {u.status === 'active' ? <UserX size={14} /> : <UserCheck size={14} />}
                            {u.status === 'active' ? 'Bloquear' : 'Ativar'}
                          </button>
                        )}

                        {/* Excluir */}
                        {!isAdmin && (
                          <button
                            className="btn-table-action btn-secondary"
                            onClick={() => handleDeleteUser(u.id, u.name)}
                            style={{ color: '#F87171' }}
                            title="Excluir usuário"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Cadastro de Novo Usuário */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="vip-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <button className="vip-modal-close" onClick={() => setIsModalOpen(false)}>
              <X size={20} />
            </button>

            <div className="vip-modal-header" style={{ padding: '24px 20px 16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-subtle)', color: 'var(--accent-coral)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <Plus size={24} />
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Novo Usuário VIP</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Cadastre o cliente que comprou a licença pelo WhatsApp.
              </p>
            </div>

            <div className="vip-modal-body">
              {modalError && <div className="auth-alert-error" style={{ marginBottom: '14px' }}>{modalError}</div>}

              <form onSubmit={handleCreateUser} className="auth-form">
                <div className="auth-field">
                  <label>Nome do Cliente</label>
                  <input
                    type="text"
                    className="auth-input"
                    placeholder="ex: João da Silva"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                  />
                </div>

                <div className="auth-field">
                  <label>WhatsApp ou E-mail (Login)</label>
                  <input
                    type="text"
                    className="auth-input"
                    placeholder="ex: 31988868362 ou joao@gmail.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="auth-field">
                  <label>Senha de Acesso</label>
                  <input
                    type="text"
                    className="auth-input"
                    placeholder="ex: 123456 ou vip2026"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="auth-field">
                  <label>Status Inicial</label>
                  <select
                    className="auth-input"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="active" style={{ background: '#11111D' }}>Ativo (Liberado)</option>
                    <option value="blocked" style={{ background: '#11111D' }}>Bloqueado (Pendente)</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                  <Plus size={18} /> Salvar e Liberar Acesso VIP
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
