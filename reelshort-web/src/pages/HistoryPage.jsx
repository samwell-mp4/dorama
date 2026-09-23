import React, { useState, useEffect } from 'react';
import { getContinueWatching } from '../data/dataLayer';
import HorizontalCard from '../components/media/HorizontalCard';
import SEOHead from '../components/seo/SEOHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { History, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getContinueWatching());
  }, []);

  return (
    <div className="history-view" style={{ padding: 'var(--space-32) 0 var(--space-64)' }}>
      <SEOHead
        title="Histórico de Reprodução"
        description="Continue assistindo seus doramas e séries de onde parou no Doramas Dublados."
      />

      <div className="cinematic-container">
        <Breadcrumbs items={[{ name: 'Histórico', url: '/historico' }]} />

        <div style={{ marginBottom: 'var(--space-32)' }}>
          <h1 style={{ fontSize: '2.4rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <History style={{ color: 'var(--accent-coral)' }} /> Histórico de Reprodução
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Retome a reprodução de onde você parou.
          </p>
        </div>

        {history.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-20)' }}>
            {history.map((item) => (
              <HorizontalCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', maxWidth: '440px', margin: '0 auto' }}>
            <AlertCircle size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
            <h3>Nenhum histórico recente</h3>
            <p style={{ marginTop: '8px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Você ainda não começou a assistir nenhum episódio.
            </p>
            <Link to="/" className="btn btn-primary">
              Descobrir Séries
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
