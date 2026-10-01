import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import NoticeBanner from './components/NoticeBanner';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTopButton, { RouteScrollReset } from './components/ScrollToTop';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Deities = lazy(() => import('./pages/Deities'));
const Festivals = lazy(() => import('./pages/Festivals'));
const Offerings = lazy(() => import('./pages/Offerings'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const Donations = lazy(() => import('./pages/Donations'));
const NotFound = lazy(() => import('./pages/NotFound'));

function RouteLoadingFallback() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0D0805'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid rgba(217, 119, 6, 0.2)',
        borderTopColor: '#D97706',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function App() {
  return (
    <>
      <RouteScrollReset />
      <NoticeBanner />
      <TopBar />
      <Navbar />
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/deities" element={<Deities />} />
          <Route path="/festivals" element={<Festivals />} />
          <Route path="/offerings" element={<Offerings />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}

export default App;
