import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Sparkles, Send, Clock, Heart, ShieldCheck, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Logo from './Logo.jsx';
import '../styles/Footer.css';

const Footer = () => {
    const { t } = useTranslation();
    const [subscriberEmail, setSubscriberEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (subscriberEmail) {
            setIsSubscribed(true);
            setTimeout(() => {
                setIsSubscribed(false);
                setSubscriberEmail('');
            }, 3500);
        }
    };

    return (
        <footer className="footer modern-footer">
            {/* Top Auspicious Blessing Ribbon */}
            <div className="footer-blessing-ribbon">
                <div className="container blessing-inner">
                    <div className="blessing-left">
                        <span className="blessing-sparkle"><Sparkles size={16} /></span>
                        <span className="blessing-quote">"സർവ്വത്ര സുഖിനോ ഭവന്തു — May Divine Blessings & Peace Encompass All"</span>
                    </div>
                    <div className="blessing-right">
                        <span className="temple-trust-tag">
                            <ShieldCheck size={14} /> Registered Temple Trust Est. 1952
                        </span>
                    </div>
                </div>
            </div>

            <div className="footer-container">
                {/* Column 1: Brand, Description & Socials */}
                <div className="footer-section brand-col">
                    <Logo className="footer-logo" />
                    <p className="footer-description">
                        {t('footer.description')}
                    </p>

                    <div className="footer-darshan-card">
                        <div className="darshan-card-head">
                            <Clock size={15} className="darshan-icon" />
                            <span>Daily Sanctum Darshan</span>
                        </div>
                        <p className="darshan-times">
                            <strong>Morning:</strong> 05:00 AM – 10:30 AM<br />
                            <strong>Evening:</strong> 05:30 PM – 08:00 PM
                        </p>
                    </div>

                    <div className="social-icons-wrapper">
                        <span className="social-label">Devotee Channels</span>
                        <div className="social-icons">
                            <a href="https://facebook.com" className="social-icon" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                                <Facebook size={16} />
                            </a>
                            <a href="https://instagram.com" className="social-icon" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                                <Instagram size={16} />
                            </a>
                            <a href="https://youtube.com" className="social-icon" aria-label="Youtube" target="_blank" rel="noopener noreferrer">
                                <Youtube size={16} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Column 2: Navigation Links */}
                <div className="footer-section">
                    <h4 className="section-title">{t('footer.navigation')}</h4>
                    <ul className="footer-nav-list">
                        <li><Link to="/"><ChevronRight size={14} className="link-arrow" /> {t('navbar.home')}</Link></li>
                        <li><Link to="/about"><ChevronRight size={14} className="link-arrow" /> {t('navbar.about')}</Link></li>
                        <li><Link to="/deities"><ChevronRight size={14} className="link-arrow" /> {t('navbar.deities')}</Link></li>
                        <li><Link to="/festivals"><ChevronRight size={14} className="link-arrow" /> {t('navbar.festivals')}</Link></li>
                        <li><Link to="/offerings"><ChevronRight size={14} className="link-arrow" /> {t('navbar.offerings')}</Link></li>
                        <li><Link to="/gallery"><ChevronRight size={14} className="link-arrow" /> {t('navbar.gallery')}</Link></li>
                        <li><Link to="/contact"><ChevronRight size={14} className="link-arrow" /> {t('navbar.contact')}</Link></li>
                    </ul>
                </div>

                {/* Column 3: Sacred Sevas & Offerings */}
                <div className="footer-section">
                    <h4 className="section-title">Sacred Vazhipadus</h4>
                    <ul className="footer-nav-list">
                        <li><Link to="/offerings"><ChevronRight size={14} className="link-arrow" /> Ganapathy Homam</Link></li>
                        <li><Link to="/offerings"><ChevronRight size={14} className="link-arrow" /> Subramanya Pushpanjali</Link></li>
                        <li><Link to="/offerings"><ChevronRight size={14} className="link-arrow" /> Chuttuvilakku Deepam</Link></li>
                        <li><Link to="/offerings"><ChevronRight size={14} className="link-arrow" /> Annadanam Contribution</Link></li>
                        <li><Link to="/offerings"><ChevronRight size={14} className="link-arrow" /> Palabhishekam & Bhasmam</Link></li>
                        <li><Link to="/festivals"><ChevronRight size={14} className="link-arrow" /> Thaipusam Mahotsavam</Link></li>
                    </ul>
                </div>

                {/* Column 4: Newsletter & Direct Contact */}
                <div className="footer-section contact-col">
                    <h4 className="section-title">Devotee Newsletter</h4>
                    <p className="newsletter-desc">
                        Subscribe for festival dates, auspicious thithi alerts, and temple announcements.
                    </p>

                    {isSubscribed ? (
                        <div className="newsletter-success">
                            <Sparkles size={16} />
                            <span>Subscribed! May Lord Murugan bless you.</span>
                        </div>
                    ) : (
                        <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
                            <input
                                type="email"
                                placeholder="Enter email address..."
                                value={subscriberEmail}
                                onChange={(e) => setSubscriberEmail(e.target.value)}
                                required
                            />
                            <button type="submit" aria-label="Subscribe" className="subscribe-btn">
                                <Send size={15} />
                            </button>
                        </form>
                    )}

                    <div className="footer-contact-details">
                        <p className="contact-line">
                            <MapPin size={15} className="contact-icon" />
                            <span>{t('footer.address')}, Kerala, India - 690518</span>
                        </p>
                        <p className="contact-line">
                            <Phone size={15} className="contact-icon" />
                            <a href="tel:+919400788358">+91 94007 88358</a>
                        </p>
                        <p className="contact-line">
                            <Mail size={15} className="contact-icon" />
                            <a href="mailto:info@subramanyatemple.org">info@subramanyatemple.org</a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright Strip */}
            <div className="footer-bottom">
                <div className="footer-bottom-container">
                    <p className="copy-text">
                        Copyright &copy; {new Date().getFullYear()} - Thurayilkunnu Sree Subramanya Swami Temple Devaswom. All Rights Reserved.
                    </p>
                    <div className="powered-by-wrapper">
                        <span>Sponsored & Powered by: </span>
                        <a href="https://technobyteinnovations.com" target="_blank" rel="noopener noreferrer" className="powered-by-link">
                            TechnobyteInnovations
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
