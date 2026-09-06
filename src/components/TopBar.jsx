import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Globe, Sparkles, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { getDarshanStatus } from '../utils/darshanStatus';
import '../styles/TopBar.css';

const TopBar = () => {
    const { i18n, t } = useTranslation();
    const [darshanStatus, setDarshanStatus] = useState(getDarshanStatus);

    useEffect(() => {
        const tick = setInterval(() => setDarshanStatus(getDarshanStatus()), 60000);
        return () => clearInterval(tick);
    }, []);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <header className="top-bar">
            <div className="top-bar-container">
                {/* Left: Location & Daily Darshan Status */}
                <div className="top-bar-left">
                    <div className={`top-bar-badge ${darshanStatus.open ? 'top-bar-badge--open' : 'top-bar-badge--closed'}`}>
                        <span className={`live-status-dot ${darshanStatus.open ? 'dot--open' : 'dot--closed'}`} />
                        <span className={`live-status-text ${darshanStatus.open ? 'text--open' : 'text--closed'}`}>
                            {darshanStatus.shortLabel}
                        </span>
                    </div>
                    <span className="top-bar-item location-item">
                        <MapPin size={13} className="top-icon gold-icon" />
                        <span>Thurayilkunnu, Alumkadavu, Karunagappally, Kerala</span>
                    </span>
                </div>

                {/* Center: Auspicious Ticker Banner */}
                <div className="top-bar-center">
                    <span className="sacred-sparkle"><Sparkles size={12} /></span>
                    <span className="ticker-text">Morning: 05:00 AM – 10:30 AM &nbsp;|&nbsp; Evening: 05:30 PM – 08:00 PM</span>
                    <span className="sacred-sparkle"><Sparkles size={12} /></span>
                </div>

                {/* Right: Phone & Modern Language Switcher */}
                <div className="top-bar-right">
                    <a href="tel:+919400788358" className="top-bar-item phone-item">
                        <Phone size={13} className="top-icon gold-icon" />
                        <span>+91 94007 88358</span>
                    </a>

                    <div className="top-bar-divider" />

                    <div className="top-lang-toggle">
                        <Globe size={13} className="globe-icon" />
                        <div className="lang-pill-container">
                            <button
                                className={`lang-toggle-btn ${i18n.language === 'en' ? 'active' : ''}`}
                                onClick={() => changeLanguage('en')}
                            >
                                English
                            </button>
                            <button
                                className={`lang-toggle-btn ${i18n.language === 'ml' ? 'active' : ''}`}
                                onClick={() => changeLanguage('ml')}
                            >
                                മലയാളം
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopBar;
