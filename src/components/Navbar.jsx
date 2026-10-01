import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronRight, Phone, Heart } from 'lucide-react';
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background body scroll and listen for Escape key when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeMenu();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Close drawer on route change or hash navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  const navLinks = [
    { path: '/', label: t('navbar.home') },
    { path: '/about', label: t('navbar.about') },
    { path: '/festivals', label: t('navbar.festivals') },
    { path: '/offerings', label: t('navbar.offerings') },
    { path: '/deities', label: t('navbar.deities') },
    { path: '/gallery', label: t('navbar.gallery') },
    { path: '/contact', label: t('navbar.contact') }
  ];

  return (
    <nav id="navbar" className={`navbar modern-navbar ${scrolled ? 'scrolled' : ''} ${isML ? 'lang-ml' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo-link" onClick={closeMenu} aria-label="Thurayilkunnu Temple Home">
          <Logo className="navbar-logo" scrolled={scrolled} />
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-group">
          <ul className="nav-menu">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path} className="nav-item">
                  <Link
                    to={link.path}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                  >
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
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to="/offerings" className="cta-button shine-hover">
                <Heart size={15} className="cta-heart-icon" />
                <span>{t('navbar.online_pooja')}</span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Mobile Header Action Group (Language Toggle + Hamburger) */}
        <div className="mobile-header-actions">
          {/* Sleek single-tap language switcher */}
          <button
            type="button"
            className="mobile-lang-toggle-btn"
            onClick={() => i18n.changeLanguage(currentLang === 'en' ? 'ml' : 'en')}
            aria-label={currentLang === 'en' ? 'മലയാളത്തിലേക്ക് മാറ്റുക' : 'Switch to English'}
            title={currentLang === 'en' ? 'മലയാളത്തിലേക്ക് മാറ്റുക' : 'Switch to English'}
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

      {/* Mobile Glass Drawer rendered via React Portal directly into body */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mobile-drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={closeMenu}
            >
              <motion.div
                className={`mobile-drawer-panel ${isML ? 'lang-ml' : ''}`}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Sticky Header with Brand and Prominent Close Button */}
                <div className="drawer-header">
                  <div className="drawer-header-brand" onClick={closeMenu}>
                    <Logo scrolled={true} />
                  </div>
                  <button
                    type="button"
                    className="drawer-close-btn"
                    onClick={closeMenu}
                    aria-label={isML ? 'മെനു അടയ്ക്കുക' : 'Close menu'}
                    title={isML ? 'അടയ്ക്കുക' : 'Close'}
                  >
                    <X size={22} />
                  </button>
                </div>

                <div className="drawer-scroll-body">
                  {/* Live Darshan Status Card */}
                  <div className="drawer-darshan-card">
                    <Link to="/about#timetable" className="drawer-darshan-link" onClick={closeMenu}>
                      <span className={`live-status-dot ${darshanStatus.open ? 'dot--open' : 'dot--closed'}`} />
                      <div className="drawer-darshan-info">
                        <span className="drawer-darshan-status">{darshanStatusText}</span>
                        <span className="drawer-darshan-timing">
                          {darshanStatus.open
                            ? (isML ? 'പ്രഭാത / സന്ധ്യാ ദർശനം' : 'Darshan Active Now')
                            : (darshanStatus.timing || (isML ? 'വൈകിട്ട് 05:30 ന് തുറക്കും' : 'Opens at 05:30 PM'))}
                        </span>
                      </div>
                      <ChevronRight size={15} className="drawer-darshan-arrow" />
                    </Link>
                  </div>

                  {/* Top Language Card - Prominently Visible Immediately */}
                  <div className="drawer-top-lang-card">
                    <div className="drawer-top-lang-label">
                      <Globe size={15} className="drawer-globe-icon" />
                      <span>{isML ? 'ഭാഷ തിരഞ്ഞെടുക്കുക' : 'Choose Language'}</span>
                    </div>
                    <div className="drawer-top-lang-pills">
                      <button
                        type="button"
                        className={`drawer-top-lang-btn ${currentLang === 'en' ? 'active' : ''}`}
                        onClick={() => i18n.changeLanguage('en')}
                      >
                        <span>English</span>
                        {currentLang === 'en' && <span className="lang-check">✓</span>}
                      </button>
                      <button
                        type="button"
                        className={`drawer-top-lang-btn ${currentLang === 'ml' ? 'active' : ''}`}
                        onClick={() => i18n.changeLanguage('ml')}
                      >
                        <span>മലയാളം</span>
                        {currentLang === 'ml' && <span className="lang-check">✓</span>}
                      </button>
                    </div>
                  </div>

                  {/* Navigation Links with explicit onClick closeMenu */}
                  <div className="drawer-links-stack">
                    {navLinks.map((link, idx) => (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.035 }}
                      >
                        <Link
                          to={link.path}
                          className={`drawer-link ${location.pathname === link.path ? 'active' : ''}`}
                          onClick={closeMenu}
                        >
                          <span>{link.label}</span>
                          <ChevronRight size={16} className="drawer-arrow" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick Devotee Shortcuts */}
                  <div className="drawer-quick-chips">
                    <Link to="/about#timetable" className="drawer-chip-link" onClick={closeMenu}>
                      <span>⏱ {isML ? 'പൂജാ സമയം' : 'Timings'}</span>
                    </Link>
                    <Link to="/about#dresscode" className="drawer-chip-link" onClick={closeMenu}>
                      <span>🪔 {isML ? 'ആചാരങ്ങൾ' : 'Dress Code'}</span>
                    </Link>
                    <Link to="/offerings#nakshatra-finder" className="drawer-chip-link" onClick={closeMenu}>
                      <span>⭐ {isML ? 'ജന്മനക്ഷത്രം' : 'Star Finder'}</span>
                    </Link>
                  </div>

                  {/* Drawer Footer with CTA & Contact */}
                  <div className="drawer-footer">
                    <Link to="/offerings" className="drawer-cta-btn" onClick={closeMenu}>
                      <Heart size={16} />
                      <span>{t('navbar.online_pooja')}</span>
                    </Link>

                    <a href="tel:+917994342205" className="drawer-phone-link" onClick={closeMenu}>
                      <Phone size={15} />
                      <span>+91 79943 42205</span>
                    </a>
                  </div>
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
