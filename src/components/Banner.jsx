import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, Sparkles, Calendar, ArrowRight, Sun, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { getDarshanStatus } from '../utils/darshanStatus';
import '../styles/Banner.css';

const Banner = () => {
    const { t } = useTranslation();

    const slides = [
        {
            url: '/images/banners/banner1.jpg',
            tag: 'Divine Abode in Karunagappally, Kerala',
            title: 'Sacred Sanctuary of',
            highlight: 'Lord Murugan',
            desc: 'Immerse in decades of divine spiritual grace, traditional Kerala tantric rituals, and serene sanctuary peace.'
        },
        {
            url: '/images/banners/banner2.jpg',
            tag: 'Sanctum Sanctorum Blessings',
            title: 'Seat of Divine Child',
            highlight: 'Balamurugan',
            desc: 'Experience the pure bliss and divine protection of Balamurugan in our traditional sanctum courtyard.'
        },
        {
            url: '/images/banners/banner3.jpg',
            tag: 'Ancient Seat of Spiritual Wisdom',
            title: 'Experience Timeless',
            highlight: 'Spiritual Grace',
            desc: 'Join thousands of devoted souls in daily poojas, sacred vazhipadu offerings, and grand Thaipusam celebrations.'
        },
        {
            url: '/images/banners/banner4.jpg',
            tag: 'Vazhipadu & Special Offerings',
            title: 'Seek Blessings &',
            highlight: 'Divine Peace',
            desc: 'Perform Ganapathy Homam, Subramanya Pooja, and special vazhipadus for health, prosperity, and peace.'
        },
        {
            url: '/images/banners/banner5.jpg',
            tag: 'Auspicious Upadevatha Shrines',
            title: 'Blessings of Lord',
            highlight: 'Mahaganapathy',
            desc: 'Seek holy blessings at the ancient shrines of Lord Ganapathy, Bhagavathy, and Nagadevathas.'
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [darshanStatus, setDarshanStatus] = useState(getDarshanStatus);

    useEffect(() => {
        const tick = setInterval(() => setDarshanStatus(getDarshanStatus()), 60000);
        return () => clearInterval(tick);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 7000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const prevSlide = () => setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
    const nextSlide = () => setCurrentIndex((currentIndex + 1) % slides.length);

    return (
        <header className="sanctuary-hero">
            {/* Ambient Animated Gold Dust & Glowing Embers */}
            <div className="ambient-particles">
                <div className="particle p1" />
                <div className="particle p2" />
                <div className="particle p3" />
                <div className="particle p4" />
                <div className="ember-spark e1" />
                <div className="ember-spark e2" />
                <div className="ember-spark e3" />
                <div className="ember-spark e4" />
            </div>

            {/* Background Slideshow with Zoom & Fade */}
            <div className="hero-slider">
                {slides.map((slide, idx) => (
                    <div
                        key={idx}
                        className={`hero-slide-bg ${idx === currentIndex ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${slide.url})` }}
                    />
                ))}
                <div className="hero-overlay" />
            </div>

            {/* Slide Progress Bar */}
            <div className="hero-progress-bar">
                <div key={currentIndex} className="hero-progress-fill" />
            </div>

            {/* Main Hero Content Grid */}
            <div className="hero-container">
                <div className="hero-content">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -24 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Eyebrow Pill */}
                            <motion.div
                                className="hero-badge-pill"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Sparkles size={14} className="badge-sparkle" />
                                <span>{slides[currentIndex].tag}</span>
                            </motion.div>

                            {/* Headline with Royal Cinzel Serif */}
                            <h1 className="hero-main-title">
                                {slides[currentIndex].title}{' '}
                                <span className="hero-gold-text">{slides[currentIndex].highlight}</span>
                            </h1>

                            <p className="hero-subtitle">
                                {slides[currentIndex].desc}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Action Buttons */}
                    <div className="hero-cta-group">
                        <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
                            <Link to="/offerings" className="hero-btn-primary">
                                <span>Book Online Pooja</span>
                                <ArrowRight size={17} />
                            </Link>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
                            <Link to="/about" className="hero-btn-glass">
                                <span>Explore History</span>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Live Darshan Status Glass Card */}
                <motion.div
                    className="hero-glass-card"
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -6 }}
                >
                    <div className="glass-card-header">
                        <div className="status-indicator">
                            <span className={`pulse-dot ${darshanStatus.open ? 'pulse-dot--open' : 'pulse-dot--closed'}`} />
                            <div>
                                <span className={`status-label ${darshanStatus.open ? 'status-label--open' : 'status-label--closed'}`}>
                                    {darshanStatus.label}
                                </span>
                                <span className="status-sub">{darshanStatus.sub}</span>
                            </div>
                        </div>
                        <span className="est-tag">Est. 1952</span>
                    </div>

                    <div className="glass-card-body">
                        <div className="info-row">
                            <div className="info-icon-box">
                                <Sun size={18} />
                            </div>
                            <div>
                                <strong>Morning Pooja Hours</strong>
                                <p>05:00 AM – 10:30 AM</p>
                            </div>
                        </div>

                        <div className="info-divider" />

                        <div className="info-row">
                            <div className="info-icon-box">
                                <Flame size={18} />
                            </div>
                            <div>
                                <strong>Evening Deeparadhana</strong>
                                <p>05:30 PM – 08:00 PM</p>
                            </div>
                        </div>

                        <div className="info-divider" />

                        <div className="info-row">
                            <div className="info-icon-box">
                                <MapPin size={18} />
                            </div>
                            <div>
                                <strong>Location</strong>
                                <p>Thurayilkunnu, Alumkadavu, Karunagappally</p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card-footer">
                        <Link to="/contact" className="quick-directions-link">
                            View Directions & Location Map &rarr;
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Slider Navigation & Indicators */}
            <div className="hero-nav-bar">
                <div className="hero-slide-controls">
                    <button className="nav-arrow" onClick={prevSlide} aria-label="Previous slide">
                        <ChevronLeft size={20} />
                    </button>

                    <div className="nav-dots">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                className={`nav-dot ${idx === currentIndex ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(idx)}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>

                    <button className="nav-arrow" onClick={nextSlide} aria-label="Next slide">
                        <ChevronRight size={20} />
                    </button>
                </div>

                <div className="scroll-indicator">
                    <span className="scroll-text">Scroll to Explore</span>
                    <span className="scroll-bar"></span>
                </div>
            </div>
        </header>
    );
};

export default Banner;
