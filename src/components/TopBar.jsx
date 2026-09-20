import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Globe, Sparkles, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { getDarshanStatus } from '../utils/darshanStatus';
import '../styles/TopBar.css';

const TopBar = () => {
    const { i18n } = useTranslation();
    const isML = i18n.language === 'ml';
    const [, setTick] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setTick((t) => t + 1), 60000);
        return () => clearInterval(interval);
    }, []);

    const darshanStatus = getDarshanStatus(i18n.language);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <header className={`top-bar ${isML ? 'lang-ml' : ''}`}>
            <div className="top-bar-container">
                {/* Left: Location & Daily Darshan Status */}
                <div className="top-bar-left">
                    <Link
                        to="/about#timetable"
                        className={`top-bar-badge ${darshanStatus.open ? 'top-bar-badge--open' : 'top-bar-badge--closed'}`}
                        title={isML ? 'പൂജാ സമയക്രമം കാണുക' : 'View Daily Pooja Timetable'}
                        style={{ textDecoration: 'none' }}
                    >
                        <span className={`live-status-dot ${darshanStatus.open ? 'dot--open' : 'dot--closed'}`} />
                        <span className={`live-status-text ${darshanStatus.open ? 'text--open' : 'text--closed'}`}>
                            {darshanStatus.shortLabel}
                        </span>
                    </Link>
                    <span className="top-bar-item location-item">
                        <MapPin size={13} className="top-icon gold-icon" />
                        <span>{isML ? 'തുറയിൽകുന്ന്, മരു: സൗത്ത്, കരുനാഗപ്പള്ളി, കേരളം' : 'Thurayilkunnu, Maru: South, Karunagappally, Kerala'}</span>
                    </span>
                </div>

                {/* Center: Auspicious Ticker Banner */}
                <div className="top-bar-center">
                    <span className="sacred-sparkle"><Sparkles size={12} /></span>
                    <span className="ticker-text">
                        {isML ? 'രാവിലെ: 05:00 – 10:30 | വൈകിട്ട്: 05:30 – 08:00' : 'Morning: 05:00 AM – 10:30 AM | Evening: 05:30 PM – 08:00 PM'}
                    </span>
                    <span className="sacred-sparkle"><Sparkles size={12} /></span>
                </div>

                {/* Right: Phone & Modern Language Switcher */}
                <div className="top-bar-right">
                    <div className="top-phone-group">
                        <a href="tel:+917994342205" className="top-bar-item phone-item" title="Call: 79943 42205">
                            <Phone size={13} className="top-icon gold-icon" />
                            <span>79943 42205</span>
                        </a>
                        <span className="top-phone-sep hide-sm">/</span>
                        <a href="tel:+919072722205" className="top-bar-item phone-item second-phone hide-sm" title="Call: 90727 22205">
                            <span>90727 22205</span>
                        </a>
                    </div>

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
