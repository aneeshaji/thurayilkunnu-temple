import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronRight, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { getDarshanStatus } from '../utils/darshanStatus';
import Logo from './Logo';
import '../styles/Navbar.css';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isML = i18n.language?.startsWith('ml');
  const currentLang = isML ? 'ml' : 'en';
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const darshanStatus = getDarshanStatus(i18n.language);
  const darshanStatusText = isML
    ? (darshanStatus.open ? 'നട തുറന്നു' : 'നട അടച്ചു')
    : (darshanStatus.open ? 'Darshan Open' : 'Darshan Closed');

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => { if (e.key === 'Escape') closeMenu(); };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => { setIsOpen(false); }, [location.pathname, location.hash]);

  const navLinks = [
    { path: '/',          label: t('navbar.home') },
    { path: '/about',     label: t('navbar.about') },
    { path: '/festivals', label: t('navbar.festivals') },
    { path: '/offerings', label: t('navbar.offerings') },
    { path: '/deities',   label: t('navbar.deities') },
    { path: '/gallery',   label: t('navbar.gallery') },
    { path: '/contact',   label: t('navbar.contact') },
  ];

  return (
    <nav id="navbar" className={`navbar modern-navbar ${scrolled ? 'scrolled' : ''} ${isML ? 'lang-ml' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo-link" onClick={closeMenu} aria-label="Thurayilkunnu Temple Home">
          <Logo className="navbar-logo" scrolled={scrolled} />
        </Link>

        <div className="nav-group">
          <ul className="nav-menu">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path} className="nav-item">
                  <Link to={link.path} className={`nav-link ${isActive ? 'active' : ''}`}>
                    <span>{link.label}</span>
                    {isActive && (
                      <motion.div
                        className="active-nav-indicator"
                        layoutId="activeNavIndicator"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="nav-cta">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link to="/offerings" className="cta-button shine-hover">
                <Heart size={15} className="cta-heart-icon" />
                <span>{t('navbar.online_pooja')}</span>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="mobile-header-actions">
          <button
            type="button"
            className="mobile-lang-toggle-btn"
            onClick={() => i18n.changeLanguage(currentLang === 'en' ? 'ml' : 'en')}
            aria-label={currentLang === 'en' ? 'Switch to Malayalam' : 'Switch to English'}
          >
            <Globe size={13} className="mobile-lang-globe" />
            <span>{currentLang === 'en' ? 'മലയാളം' : 'ENG'}</span>
          </button>
          <button
            type="button"
            className="menu-toggle-btn"
            onClick={toggleMenu}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mobile-drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
            >
              <motion.div
                className={`mobile-drawer-panel ${isML ? 'lang-ml' : ''}`}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 340 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="drawer-header">
                  <div className="drawer-header-brand" onClick={closeMenu}>
                    <Logo scrolled={true} />
                  </div>
                  <button type="button" className="drawer-close-btn" onClick={closeMenu} aria-label="Close menu">
                    <X size={20} />
                  </button>
                </div>

                <Link to="/about#timetable" className="drawer-status-strip" onClick={closeMenu}>
                  <span className={`live-status-dot ${darshanStatus.open ? 'dot--open' : 'dot--closed'}`} />
                  <span className="drawer-status-label">{darshanStatusText}</span>
                  {darshanStatus.timing && (
                    <span className="drawer-status-timing">&middot; {darshanStatus.timing}</span>
                  )}
                  <ChevronRight size={13} className="drawer-status-arrow" />
                </Link>

                <nav className="drawer-nav">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                    >
                      <Link
                        to={link.path}
                        className={`drawer-link ${location.pathname === link.path ? 'active' : ''}`}
                        onClick={closeMenu}
                      >
                        <span>{link.label}</span>
                        <ChevronRight size={15} className="drawer-arrow" />
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="drawer-bottom">
                  <Link to="/offerings" className="drawer-cta-btn" onClick={closeMenu}>
                    <Heart size={16} />
                    <span>{t('navbar.online_pooja')}</span>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </nav>
  );
};

export default Navbar;
