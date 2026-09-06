import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Sparkles, ChevronRight, Phone, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import '../styles/Navbar.css';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isML = i18n.language === 'ml';
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

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
        <Link to="/" className="navbar-logo-link" aria-label="Thurayilkunnu Temple Home">
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

        {/* Mobile Hamburger Toggle */}
        <button
          className="menu-toggle-btn"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Glass Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="mobile-drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="drawer-header">
                <Logo scrolled={true} />
                <button
                  className="drawer-close-btn"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="drawer-links-stack">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06 }}
                  >
                    <Link
                      to={link.path}
                      className={`drawer-link ${location.pathname === link.path ? 'active' : ''}`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight size={16} className="drawer-arrow" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="drawer-footer">
                {/* Mobile Drawer Language Switcher */}
                <div className="drawer-lang-row">
                  <Globe size={14} className="drawer-globe" />
                  <div className="drawer-lang-pills">
                    <button
                      className={`drawer-lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
                      onClick={() => i18n.changeLanguage('en')}
                    >
                      English
                    </button>
                    <button
                      className={`drawer-lang-btn ${i18n.language === 'ml' ? 'active' : ''}`}
                      onClick={() => i18n.changeLanguage('ml')}
                    >
                      മലയാളം
                    </button>
                  </div>
                </div>

                <Link to="/offerings" className="drawer-cta-btn">
                  <Heart size={16} />
                  <span>{t('navbar.online_pooja')}</span>
                </Link>

                <a href="tel:+919400788358" className="drawer-phone-link">
                  <Phone size={15} />
                  <span>+91 94007 88358</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
