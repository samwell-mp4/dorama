import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import MobileNav from './MobileNav';
import Footer from './Footer';
import WhatsAppWidget from '../common/WhatsAppWidget';
import './layout.css';

export default function AppLayout() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content-area">
        <TopHeader />
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
        <Footer />
        <MobileNav />
        <WhatsAppWidget />
      </div>
    </div>
  );
}

