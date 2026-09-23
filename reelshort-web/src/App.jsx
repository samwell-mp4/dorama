import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AppLayout from './components/layout/AppLayout';
import Home from './Home';
import MediaDetails from './pages/MediaDetails';
import Player from './Player';
import SearchPage from './pages/SearchPage';
import CatalogPage from './pages/CatalogPage';
import MyListPage from './pages/MyListPage';
import HistoryPage from './pages/HistoryPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import Top10Page from './pages/Top10Page';
import HowToWatchPage from './pages/HowToWatchPage';
import ScrollToTop from './components/common/ScrollToTop';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<AppLayout />}>
            {/* Home Principal */}
            <Route path="/" element={<Home />} />

            {/* Rotas de Catálogo & Categorias */}
            <Route path="/filmes" element={<CatalogPage categoryType="movie" />} />
            <Route path="/series" element={<CatalogPage categoryType="series" />} />
            <Route path="/em-alta" element={<CatalogPage categoryType="trending" />} />
            <Route path="/lancamentos" element={<CatalogPage categoryType="new" />} />
            <Route path="/generos/:genre" element={<CatalogPage categoryType="genre" />} />

            {/* Hubs de Conteúdo SEO & Blog */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/top-10" element={<Top10Page />} />
            <Route path="/como-assistir" element={<HowToWatchPage />} />

            {/* Busca & Listas do Usuário */}
            <Route path="/buscar" element={<SearchPage />} />
            <Route path="/minha-lista" element={<MyListPage />} />
            <Route path="/historico" element={<HistoryPage />} />

            {/* Autenticação & Painel Administrativo */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminDashboard />} />

            {/* Rotas Oficiais Limpas com Slugs */}
            {/* 1. Página de Detalhes da Série/Filme */}
            <Route path="/series/:slug" element={<MediaDetails />} />
            <Route path="/filmes/:slug" element={<MediaDetails />} />

            {/* 2. Player de Vídeo para Episódios */}
            <Route path="/series/:slug/*" element={<Player />} />
            <Route path="/filmes/:slug/*" element={<Player />} />
            <Route path="/assistir/:slug/*" element={<Player />} />

            {/* Compatibilidade com Rotas Legadas */}
            <Route path="/drama/:bookId/:filteredTitle" element={<MediaDetails />} />
            <Route path="/play/:bookId/:episodeNum/:filteredTitle/:chapterId" element={<Player />} />
            <Route path="/play/*" element={<Player />} />

            {/* Página 404 de Fallback */}
            <Route 
              path="*" 
              element={
                <div style={{ textAlign: 'center', padding: '120px 20px' }}>
                  <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>404</h1>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                    A página ou título que você está procurando não foi encontrada.
                  </p>
                  <a href="/" className="btn btn-primary">Voltar para o Início</a>
                </div>
              } 
            />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
