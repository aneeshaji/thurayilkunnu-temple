import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin, Sparkles, Send, Clock, ChevronRight, MapPinned } from 'lucide-react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Logo from './Logo.jsx';
import { sendContactEmail } from '../utils/contactForm';
import { CONTACT_EMAIL, PHONE_PRIMARY, PHONE_SECONDARY } from '../constants/site';
import '../styles/Footer.css';

const Footer = () => {
    const { t, i18n } = useTranslation();
    const isML = i18n.language === 'ml';
    const [subscriberEmail, setSubscriberEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subscribeError, setSubscribeError] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!subscriberEmail) return;

        setSubscribeError('');
        setIsSubscribing(true);

        const result = await sendContactEmail({
            name: subscriberEmail,
            email: subscriberEmail,
            phone: '',
            subject: 'Newsletter Subscription',
            message: isML
                ? `തുറയിൽകുന്ന് ക്ഷേത്ര വാർത്താപത്രികയിലേക്ക് സബ്‌സ്‌ക്രൈബ് ചെയ്യാൻ ആഗ്രഹിച്ചു:\n\nഇമെയിൽ: ${subscriberEmail}\n\nവിശേഷ ദിവസങ്ങളും അറിയിപ്പുകളും ലഭ്യമാക്കാൻ ദയവായി ചേർക്കുക.`
                : `Please add this devotee to the Thurayilkunnu Temple mailing list for festival announcements and auspicious thithi alerts.\n\nEmail: ${subscriberEmail}`
        });

        setIsSubscribing(false);

        if (!result.ok) {
            setSubscribeError(result.error);
            return;
        }

        setIsSubscribed(true);
        setSubscriberEmail('');
        setTimeout(() => setIsSubscribed(false), 5000);
    };

    return (
        <footer className="footer modern-footer">
            {/* Top Auspicious Blessing Ribbon */}
            <div className="footer-blessing-ribbon">
                <div className="container blessing-inner">
                    <div className="blessing-left">
                        <span className="blessing-sparkle"><Sparkles size={16} /></span>
                        <span className="blessing-quote">
                            {isML 
                                ? '"സർവ്വത്ര സുഖിനോ ഭവന്തു — ലോകത്തിന് മുഴുവൻ ശാന്തിയും ഐശ്വര്യവും ഭവിക്കട്ടെ"'
                                : '"സർവ്വത്ര സുഖിനോ ഭവന്തു — May Divine Blessings & Peace Encompass All"'}
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
                            <span>{isML ? 'നിത്യ ദർശന സമയം' : 'Daily Sanctum Darshan'}</span>
                        </div>
                        <p className="darshan-times">
                            <strong>{isML ? 'രാവിലെ:' : 'Morning:'}</strong> 05:00 AM – 10:30 AM<br />
                            <strong>{isML ? 'വൈകുന്നേരം:' : 'Evening:'}</strong> 05:30 PM – 08:00 PM
                        </p>
                    </div>

                    <div className="social-icons-wrapper">
                        <span className="social-label">{isML ? 'ഭക്തജന ചാനലുകൾ' : 'Devotee Channels'}</span>
                        <div className="social-icons">
                            <a href="https://www.facebook.com/thurayilkunnutemple" className="social-icon" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                                <Facebook size={16} />
                            </a>
                            <a href="https://www.instagram.com/thurayilkunnutemple" className="social-icon" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                                <Instagram size={16} />
                            </a>
                            <a href="https://maps.app.goo.gl/nf1ogELnNM7MpmC46" className="social-icon social-icon--gmb" aria-label="Google Business Profile" target="_blank" rel="noopener noreferrer">
                                <MapPinned size={16} />
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
                        <li><Link to="/about#timetable"><ChevronRight size={14} className="link-arrow" /> {isML ? 'നിത്യ പൂജാക്രമം' : 'Daily Timetable'}</Link></li>
                        <li><Link to="/about#administration"><ChevronRight size={14} className="link-arrow" /> {isML ? 'ക്ഷേത്ര ഭരണസമിതി' : 'Temple Administration'}</Link></li>
                        <li><Link to="/offerings"><ChevronRight size={14} className="link-arrow" /> {t('navbar.offerings')}</Link></li>
                        <li><Link to="/contact"><ChevronRight size={14} className="link-arrow" /> {t('navbar.contact')}</Link></li>
                    </ul>
                </div>

                {/* Column 3: Sacred Sevas & Offerings */}
                <div className="footer-section">
                    <h4 className="section-title">{isML ? 'വിശേഷാൽ വഴിപാടുകൾ' : 'Sacred Vazhipadus'}</h4>
                    <ul className="footer-nav-list">
                        <li><Link to="/offerings"><ChevronRight size={14} className="link-arrow" /> {isML ? 'ഗണപതി ഹോമം' : 'Ganapathy Homam'}</Link></li>
                        <li><Link to="/offerings"><ChevronRight size={14} className="link-arrow" /> {isML ? 'സുബ്രഹ്മണ്യ പുഷ്പാഞ്ജലി' : 'Subramanya Pushpanjali'}</Link></li>
                        <li><Link to="/offerings"><ChevronRight size={14} className="link-arrow" /> {isML ? 'അന്നദാനം സമർപ്പണം' : 'Annadanam Samarpanam'}</Link></li>
                        <li><Link to="/offerings"><ChevronRight size={14} className="link-arrow" /> {isML ? 'പാലഭിഷേകവും ഭസ്മവും' : 'Palabhishekam & Bhasmam'}</Link></li>
                        <li><Link to="/festivals"><ChevronRight size={14} className="link-arrow" /> {isML ? 'തൈപ്പൂയ മഹോത്സവം' : 'Thaipusam Mahotsavam'}</Link></li>
                    </ul>
                </div>

                {/* Column 4: Newsletter & Direct Contact */}
                <div className="footer-section contact-col">
                    <h4 className="section-title">{isML ? 'ഭക്തജന വാർത്താപത്രിക' : 'Devotee Newsletter'}</h4>
                    <p className="newsletter-desc">
                        {isML 
                            ? 'ഉത്സവ തീയതികൾ, തിഥി അറിയിപ്പുകൾ, ക്ഷേത്ര വിവരങ്ങൾ അറിയാൻ സബ്‌സ്‌ക്രൈബ് ചെയ്യുക.'
                            : 'Subscribe for festival dates, auspicious thithi alerts, and temple announcements.'}
                    </p>

                    {isSubscribed ? (
                        <motion.div
                            className="newsletter-success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Sparkles size={16} />
                            <span>{isML ? 'സബ്‌സ്‌ക്രൈബ് ചെയ്തിരിക്കുന്നു — ഭഗവാൻ മുരുകന്റെ അനുഗ്രഹം ഉണ്ടാകട്ടെ! 🙏' : 'Subscribed — may Lord Murugan bless you! 🙏'}</span>
                        </motion.div>
                    ) : (
                        <>
                            <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
                                <input
                                    type="email"
                                    placeholder={isML ? 'ഇമെയിൽ വിലാസം നൽകുക...' : 'Enter email address...'}
                                    value={subscriberEmail}
                                    onChange={(e) => setSubscriberEmail(e.target.value)}
                                    required
                                />
                                <button
                                    type="submit"
                                    aria-label={isML ? 'സബ്‌സ്‌ക്രൈബ്' : 'Subscribe'}
                                    className="subscribe-btn"
                                    disabled={isSubscribing}
                                >
                                    <Send size={15} />
                                </button>
                            </form>
                            {subscribeError && <p className="newsletter-error" role="alert">{subscribeError}</p>}
                        </>
                    )}

                    <div className="footer-contact-details">
                        <p className="contact-line">
                            <MapPin size={15} className="contact-icon" />
                            <span>{t('footer.address')}</span>
                        </p>
                        <p className="contact-line">
                            <Phone size={15} className="contact-icon" />
                            <span>
                                <a href={`tel:${PHONE_PRIMARY}`}>+91 79943 42205</a>, <a href={`tel:${PHONE_SECONDARY}`}>+91 90727 22205</a>
                            </span>
                        </p>
                        <p className="contact-line">
                            <Mail size={15} className="contact-icon" />
                            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright Strip */}
            <div className="footer-bottom">
                <div className="footer-bottom-container">
                    <p className="copy-text">
                        {isML
                            ? `പകർപ്പവകാശം © ${new Date().getFullYear()} - തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്ര ദേവസ്വം. സർവ്വ അവകാശങ്ങളും നിക്ഷിപ്തം.`
                            : `Copyright © ${new Date().getFullYear()} - Thurayilkunnu Sree Subramanya Swami Temple Devaswom. All Rights Reserved.`}
                    </p>
                    <div className="footer-legal-links">
                        <Link to="/privacy-policy">{isML ? 'സ്വകാര്യതാ നയം' : 'Privacy Policy'}</Link>
                        <span className="legal-sep">·</span>
                        <Link to="/terms-of-service">{isML ? 'സേവന നിബന്ധനകൾ' : 'Terms of Service'}</Link>
                    </div>
                    <div className="powered-by-wrapper">
                        <span>{isML ? 'സാങ്കേതിക സഹായം: ' : 'Sponsored & Powered by: '}</span>
                        <a href="https://technobyteinnovations.in/" target="_blank" rel="noopener noreferrer" className="powered-by-link">
                            TechnobyteInnovations
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
