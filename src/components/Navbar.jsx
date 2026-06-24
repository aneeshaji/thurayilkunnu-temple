import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import '../styles/Navbar.css';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const isML = i18n.language === 'ml';
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav id="navbar" className={`navbar premium-navbar ${scrolled ? 'scrolled' : ''} ${isML ? 'lang-ml' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo-link">
          <Logo className="navbar-logo" scrolled={scrolled} />
        </Link>

        <div className="nav-group">
          <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
            <li className="nav-item"><Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>{t('navbar.home')}</Link></li>
            <li className="nav-item"><Link to="/about" className="nav-link" onClick={() => setIsOpen(false)}>{t('navbar.about')}</Link></li>
            <li className="nav-item"><Link to="/festivals" className="nav-link" onClick={() => setIsOpen(false)}>{t('navbar.festivals')}</Link></li>
            <li className="nav-item"><Link to="/offerings" className="nav-link" onClick={() => setIsOpen(false)}>{t('navbar.offerings')}</Link></li>
            <li className="nav-item"><Link to="/gallery" className="nav-link" onClick={() => setIsOpen(false)}>{t('navbar.gallery')}</Link></li>
            <li className="nav-item"><Link to="/contact" className="nav-link" onClick={() => setIsOpen(false)}>{t('navbar.contact')}</Link></li>
          </ul>

          <div className="nav-cta">
            {scrolled && (
              <div className="navbar-lang-switcher">
                <Globe size={13} className="lang-globe-icon" />
                <button
                  className={`navbar-lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
                  onClick={() => i18n.changeLanguage('en')}
                >EN</button>
                <span className="navbar-lang-divider">/</span>
                <button
                  className={`navbar-lang-btn ${i18n.language === 'ml' ? 'active' : ''}`}
                  onClick={() => i18n.changeLanguage('ml')}
                >ML</button>
              </div>
            )}
            <Link to="/offerings" className="cta-button">{t('navbar.online_pooja')}</Link>
          </div>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
