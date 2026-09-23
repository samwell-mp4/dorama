import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Navegação em trilha" style={{ marginBottom: 'var(--space-20)' }}>
      <ol style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px', 
        listStyle: 'none', 
        fontSize: '0.85rem', 
        color: 'var(--text-muted)',
        flexWrap: 'wrap'
      }}>
        <li>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
            <Home size={14} /> Início
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ChevronRight size={14} style={{ opacity: 0.5 }} />
              {isLast ? (
                <span style={{ color: '#fff', fontWeight: 600 }}>{item.name}</span>
              ) : (
                <Link to={item.url} style={{ color: 'var(--text-secondary)' }}>
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
