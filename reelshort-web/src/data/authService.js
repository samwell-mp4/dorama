/**
 * Authentication and User Management Service
 * Suporta contas de clientes VIP, painel de administração e persistência local.
 */

const STORAGE_USERS_KEY = 'dramaflix_users_v1';
const STORAGE_SESSION_KEY = 'dramaflix_session_v1';

// Usuários iniciais padrão
const INITIAL_USERS = [
  {
    id: 'admin_1',
    name: 'Administrador Doramas Dublados',
    email: 'admin@doramasdublados.com',
    password: 'admin123',
    role: 'admin',
    isVIP: true,
    status: 'active',
    plan: 'VIP Anual Ilimitado',
    createdAt: new Date().toISOString()
  },
  {
    id: 'user_1',
    name: 'Cliente VIP Demo',
    email: 'cliente@teste.com',
    password: '123456',
    role: 'user',
    isVIP: true,
    status: 'active',
    plan: 'VIP R$ 5,00',
    createdAt: new Date().toISOString()
  }
];

function initUsers() {
  try {
    const existing = localStorage.getItem(STORAGE_USERS_KEY);
    if (!existing) {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(INITIAL_USERS));
    }
  } catch (e) {
    console.error('Error initializing users:', e);
  }
}

// Inicializar na carga
initUsers();

export const authService = {
  // Obter todos os usuários (Admin)
  getAllUsers: () => {
    try {
      const data = localStorage.getItem(STORAGE_USERS_KEY);
      return data ? JSON.parse(data) : INITIAL_USERS;
    } catch (e) {
      return INITIAL_USERS;
    }
  },

  // Criar novo usuário (Admin)
  createUser: ({ name, email, password, role = 'user', isVIP = true, status = 'active' }) => {
    try {
      const users = authService.getAllUsers();
      
      const cleanEmail = email.trim().toLowerCase();
      // Verificar se já existe usuário com o mesmo e-mail / telefone
      if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
        return { success: false, error: 'Já existe um usuário com este e-mail ou WhatsApp.' };
      }

      const newUser = {
        id: 'user_' + Date.now(),
        name: name.trim() || 'Usuário VIP',
        email: cleanEmail,
        password: password.trim(),
        role,
        isVIP,
        status,
        plan: isVIP ? 'VIP R$ 5,00' : 'Gratuito',
        createdAt: new Date().toISOString()
      };

      const updated = [newUser, ...users];
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('usersChanged'));
      return { success: true, user: newUser };
    } catch (e) {
      return { success: false, error: 'Erro ao salvar novo usuário.' };
    }
  },

  // Atualizar status (Ativar / Bloquear)
  toggleUserStatus: (id) => {
    try {
      const users = authService.getAllUsers();
      const user = users.find(u => u.id === id);
      if (!user) return { success: false, error: 'Usuário não encontrado' };

      user.status = user.status === 'active' ? 'blocked' : 'active';
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
      window.dispatchEvent(new Event('usersChanged'));
      return { success: true, user };
    } catch (e) {
      return { success: false, error: 'Erro ao alterar status.' };
    }
  },

  // Excluir usuário
  deleteUser: (id) => {
    try {
      const users = authService.getAllUsers();
      if (id === 'admin_1') {
        return { success: false, error: 'Não é permitido excluir o administrador principal.' };
      }

      const updated = users.filter(u => u.id !== id);
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('usersChanged'));
      return { success: true };
    } catch (e) {
      return { success: false, error: 'Erro ao excluir usuário.' };
    }
  },

  // Efetuar login
  login: (emailOrPhone, password) => {
    try {
      const users = authService.getAllUsers();
      const cleanInput = (emailOrPhone || '').trim().toLowerCase();
      const cleanPass = (password || '').trim();

      const user = users.find(
        u => (
          u.email.toLowerCase() === cleanInput || 
          (u.id === 'admin_1' && (cleanInput === 'admin@dramaflix.com' || cleanInput === 'admin@doramasdublados.com')) ||
          u.email.replace(/\D/g, '') === cleanInput.replace(/\D/g, '')
        ) && u.password === cleanPass
      );

      if (!user) {
        return { success: false, error: 'E-mail/WhatsApp ou senha incorretos.' };
      }

      if (user.status === 'blocked') {
        return { 
          success: false, 
          error: 'Sua conta está inativa ou bloqueada. Entre em contato no WhatsApp (31) 98886-8362 para regularizar sua licença.' 
        };
      }

      // Salvar sessão ativa
      const session = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVIP: user.isVIP,
        plan: user.plan,
        loginAt: Date.now()
      };

      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
      window.dispatchEvent(new Event('authChange'));
      return { success: true, user: session };
    } catch (e) {
      return { success: false, error: 'Erro no processo de login.' };
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem(STORAGE_SESSION_KEY);
    window.dispatchEvent(new Event('authChange'));
  },

  // Obter sessão atual
  getCurrentUser: () => {
    try {
      const data = localStorage.getItem(STORAGE_SESSION_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  // Verificações rápidas
  isAuthenticated: () => {
    return authService.getCurrentUser() !== null;
  },

  isVIP: () => {
    const user = authService.getCurrentUser();
    return Boolean(user && user.isVIP);
  },

  isAdmin: () => {
    const user = authService.getCurrentUser();
    return Boolean(user && user.role === 'admin');
  }
};
