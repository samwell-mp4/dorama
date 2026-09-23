import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop - Garante que qualquer navegação entre páginas
 * (especialmente ao abrir séries ou detalhes no celular)
 * inicie sempre no topo da página (Y: 0).
 */
export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Resetar scroll de todas as camadas de overflow
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }

    const mainArea = document.querySelector('.main-content-area');
    if (mainArea) {
      mainArea.scrollTop = 0;
    }
  }, [pathname, search]);

  return null;
}
