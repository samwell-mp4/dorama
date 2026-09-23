import React, { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import './whatsapp.css';

export default function WhatsAppWidget() {
  const [showBubble, setShowBubble] = useState(true);

  const phoneNumber = '5531988868362';
  const message = encodeURIComponent('Olá! Gostaria de tirar dúvidas / adquirir a licença VIP do Doramas Dublados por R$ 5,00.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <aside className="whatsapp-floating-widget" aria-label="Suporte WhatsApp Oficial">
      {showBubble && (
        <div className="whatsapp-bubble" role="status">
          <button 
            className="whatsapp-bubble-close" 
            onClick={() => setShowBubble(false)}
            aria-label="Fechar mensagem de suporte"
          >
            <X size={14} />
          </button>
          <div className="whatsapp-bubble-text">
            <strong>Atendimento WhatsApp</strong>
            Liberar Acesso VIP por R$ 5,00 ou tirar dúvidas? Fale conosco!
          </div>
        </div>
      )}

      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-btn"
        aria-label="Conversar no WhatsApp 31 98886-8362"
      >
        <span className="whatsapp-badge">1</span>
        {/* Ícone Oficial WhatsApp em SVG */}
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.16C10.57 20.16 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16ZM16.56 14.39C16.31 14.27 15.1 13.67 14.87 13.58C14.65 13.5 14.49 13.46 14.32 13.71C14.16 13.96 13.69 14.51 13.54 14.68C13.4 14.84 13.25 14.86 13 14.74C12.75 14.62 11.94 14.35 10.98 13.49C10.23 12.82 9.72 11.99 9.58 11.74C9.43 11.49 9.56 11.36 9.69 11.23C9.8 11.12 9.94 10.94 10.06 10.8C10.18 10.66 10.23 10.56 10.31 10.39C10.39 10.23 10.35 10.08 10.29 9.96C10.23 9.84 9.74 8.64 9.54 8.14C9.34 7.66 9.14 7.72 8.99 7.71C8.85 7.71 8.69 7.7 8.52 7.7C8.36 7.7 8.09 7.76 7.86 8.01C7.64 8.25 7 8.85 7 10.07C7 11.29 7.89 12.47 8.01 12.63C8.13 12.79 9.75 15.29 12.24 16.36C12.83 16.62 13.29 16.77 13.65 16.89C14.25 17.08 14.79 17.05 15.22 16.99C15.7 16.92 16.69 16.39 16.9 15.8C17.11 15.21 17.11 14.7 17.05 14.6C16.99 14.5 16.82 14.45 16.56 14.39Z" />
        </svg>
      </a>
    </aside>
  );
}
