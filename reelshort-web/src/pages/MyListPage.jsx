import React, { useState, useEffect } from 'react';
import { getMyList } from '../data/dataLayer';
import MediaCard from '../components/media/MediaCard';
import SEOHead from '../components/seo/SEOHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { Bookmark, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MyListPage() {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(getMyList());
  }, []);

  return (
    <div className="mylist-view" style={{ padding: 'var(--space-32) 0 var(--space-64)' }}>
      <SEOHead
        title="Minha Lista — Títulos Salvos"
        description="Sua lista personalizada de doramas e séries para assistir no Doramas Dublados."
      />

      <div className="cinematic-container">
        <Breadcrumbs items={[{ name: 'Minha Lista', url: '/minha-lista' }]} />

        <div style={{ marginBottom: 'var(--space-32)' }}>
          <h1 style={{ fontSize: '2.4rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Bookmark style={{ color: 'var(--accent-coral)' }} /> Minha Lista
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Títulos que você salvou para assistir quando quiser.
          </p>
        </div>

        {list.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 'var(--space-20)' }}>
            {list.map((item) => (
              <MediaCard key={item.id} rawMedia={item} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', maxWidth: '440px', margin: '0 auto' }}>
            <AlertCircle size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
            <h3>Sua lista está vazia</h3>
            <p style={{ marginTop: '8px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Navegue pelas séries e filmes e clique no botão "+" para adicionar à sua lista.
            </p>
            <Link to="/" className="btn btn-primary">
              Explorar Catálogo
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
