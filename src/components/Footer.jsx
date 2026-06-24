import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Logo from './Logo.jsx';
import '../styles/Footer.css';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Column 1: Brand & Socials */}
                <div className="footer-section">
                    <Logo variant="dark" style={{ height: '70px', marginBottom: '1.5rem' }} />
                    <p className="footer-description">
                        {t('footer.description')}
                    </p>
                    <div className="social-icons">
                        <a href="https://facebook.com" className="social-icon" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><Facebook size={18} /></a>
                        <a href="https://instagram.com" className="social-icon" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><Instagram size={18} /></a>
                        <a href="https://youtube.com" className="social-icon" aria-label="Youtube" target="_blank" rel="noopener noreferrer"><Youtube size={18} /></a>
                    </div>
                </div>

                {/* Column 2: Navigation */}
                <div className="footer-section">
                    <h4>{t('footer.navigation')}</h4>
                    <ul>
                        <li><Link to="/">{t('navbar.home')}</Link></li>
                        <li><Link to="/about">{t('navbar.about')}</Link></li>
                        <li><Link to="/offerings">{t('navbar.offerings')}</Link></li>
                        <li><Link to="/deities">{t('navbar.deities')}</Link></li>
                        <li><Link to="/contact">{t('navbar.contact')}</Link></li>
                    </ul>
                </div>

                {/* Column 3: Services */}
                <div className="footer-section">
                    <h4>{t('footer.services.title')}</h4>
                    <ul>
                        <li><Link to="/offerings">{t('footer.services.pooja_booking')}</Link></li>
                        <li><Link to="/contact">{t('footer.services.location_map')}</Link></li>
                        <li><Link to="/festivals">{t('footer.services.festivals')}</Link></li>
                        <li><Link to="/about">{t('footer.services.support')}</Link></li>
                    </ul>
                </div>

                {/* Column 4: Reach Us */}
                <div className="footer-section">
                    <h4>{t('footer.reach_us')}</h4>
                    <p><MapPin size={18} style={{ marginRight: '12px', color: 'var(--color-secondary)', flexShrink: 0 }} /> {t('footer.address')}</p>
                    <p><Phone size={18} style={{ marginRight: '12px', color: 'var(--color-secondary)', flexShrink: 0 }} /> +91 94007 88358</p>
                    <p><Mail size={18} style={{ marginRight: '12px', color: 'var(--color-secondary)', flexShrink: 0 }} /> info@subramanyatemple.org</p>
                </div>
            </div>

            <div className="footer-bottom container">
                <p>&copy; {new Date().getFullYear()} Thurayilkunnu Sree Subramanya Swami Temple. {t('footer.all_rights')}</p>
                <p>{t('footer.developed_by')}</p>
            </div>
        </footer>
    );
};

export default Footer;
