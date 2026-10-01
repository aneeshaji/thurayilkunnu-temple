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
    const isML = i18n.language?.startsWith('ml');
    const [, setTick] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setTick((t) => t + 1), 60000);
        return () => clearInterval(interval);
    }, []);

    const darshanStatus = getDarshanStatus(i18n.language);
    const statusText = isML 
        ? (darshanStatus.open ? 'നട തുറന്നു' : 'നട അടച്ചു') 
        : (darshanStatus.open ? 'Darshan Open' : 'Darshan Closed');

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <header className={`top-bar ${isML ? 'lang-ml' : ''}`}>
            <div className="top-bar-container">
                {/* Left: Live Darshan Status Pill & Temple Location */}
                <div className="top-bar-left">
                    <Link
                        to="/about#timetable"
                        className={`top-bar-badge ${darshanStatus.open ? 'top-bar-badge--open' : 'top-bar-badge--closed'}`}
                        title={darshanStatus.timing ? `${statusText} (${darshanStatus.timing})` : statusText}
                        style={{ textDecoration: 'none' }}
                    >
                        <span className={`live-status-dot ${darshanStatus.open ? 'dot--open' : 'dot--closed'}`} />
                        <span className="live-status-text">
                            {statusText}
                        </span>
                    </Link>

                    <div className="top-bar-vdivider" />

                    <span 
                        className="top-bar-item location-item"
                        title={isML ? 'തുറയിൽകുന്ന്, കരുനാഗപ്പള്ളി - 690573' : 'Thurayilkunnu, Karunagappally - 690573'}
                    >
                        <MapPin size={12} className="top-icon gold-icon" />
                        <span className="location-text">
                            {isML ? 'തുറയിൽകുന്ന്, കരുനാഗപ്പള്ളി - 690573' : 'Thurayilkunnu, Karunagappally - 690573'}
                        </span>
                    </span>
                </div>

                {/* Center: Clean Sacred Pooja Timings */}
                <div className="top-bar-center">
                    <Clock size={12} className="ticker-clock-icon" />
                    <span className="ticker-text">
                        {isML ? 'പൂജാ സമയം: 05:00 – 10:30 AM • 05:30 – 08:00 PM' : 'Darshan: 05:00 – 10:30 AM • 05:30 – 08:00 PM'}
                    </span>
                </div>

                {/* Right: Helpline & Modern Language Switcher */}
                <div className="top-bar-right">
                    <div className="top-phone-group">
                        <a href="tel:+917994342205" className="top-bar-item phone-item" title="Devaswom Office: 79943 42205">
                            <Phone size={12} className="top-icon gold-icon" />
                            <span>79943 42205</span>
                        </a>
                        <span className="top-phone-sep hide-sm">/</span>
                        <a href="tel:+919072722205" className="top-bar-item phone-item second-phone hide-sm" title="Alternative: 90727 22205">
                            <span>90727 22205</span>
                        </a>
                    </div>

                    <div className="top-bar-vdivider" />

                    <div className="top-lang-toggle">
                        <Globe size={12} className="globe-icon" />
                        <div className="lang-pill-container" role="group" aria-label="Language selection">
                            <button
                                type="button"
                                className={`lang-toggle-btn ${i18n.language?.startsWith('en') ? 'active' : ''}`}
                                onClick={() => changeLanguage('en')}
                            >
                                English
                            </button>
                            <button
                                type="button"
                                className={`lang-toggle-btn ${i18n.language?.startsWith('ml') ? 'active' : ''}`}
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
