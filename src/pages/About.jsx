import React from 'react';
import { useTranslation } from 'react-i18next';
import { History, Award, MapPin, Star, Sparkles, ChevronRight, CheckCircle2, ShieldCheck, Sun } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import '../styles/About.css';

/* ---- ANIMATION VARIANTS ---- */
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } }
};

const fadeInUp = {
    hidden: { opacity: 0, y: 45 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const slideLeft = {
    hidden: { opacity: 0, x: -60 },
    show: { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } }
};

const slideRight = {
    hidden: { opacity: 0, x: 60 },
    show: { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.92 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } }
};

const inViewProps = (margin = '-80px') => ({
    initial: 'hidden',
    whileInView: 'show',
    viewport: { once: true, margin }
});

const About = () => {
    const { t } = useTranslation();

    return (
        <div className="about-page">
            <SEO 
                title={t('about.title')} 
                description={t('about.hero_badge')}
            />
            {/* ---- HERO ---- */}
            <header className="about-hero">
                <div className="hero-overlay" />
                <div className="container">
                    <motion.div
                        className="hero-content"
                        initial={{ opacity: 0, y: 35 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.span
                            className="hero-badge"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Sparkles size={16} /> {t('about.hero_badge')}
                        </motion.span>
                        <h1 className="hero-title">{t('about.title')}</h1>
                        <motion.div
                            className="hero-accent"
                            initial={{ width: 0 }}
                            animate={{ width: 80 }}
                            transition={{ duration: 1, delay: 0.3 }}
                        />
                    </motion.div>
                </div>
            </header>

            {/* ---- HISTORY SECTION ---- */}
            <motion.section
                className="about-content-section section-padding"
                {...inViewProps()}
                variants={stagger}
            >
                <div className="container">
                    <div className="content-grid">
                        <motion.div className="text-side" variants={slideLeft}>
                            <div className="section-label">
                                <History size={18} />
                                <span>{t('about.history_title')}</span>
                            </div>
                            <h2 className="heading-secondary">{t('about.history_heading')}</h2>
                            <p className="description-text">{t('about.history_p1')}</p>
                            <p className="description-text">{t('about.history_p2')}</p>
                            
                            <div className="about-quick-stats">
                                <div className="quick-stat-pill">
                                    <ShieldCheck size={18} className="stat-pill-icon" />
                                    <span>Consecrated in 1952</span>
                                </div>
                                <div className="quick-stat-pill">
                                    <Sun size={18} className="stat-pill-icon" />
                                    <span>Tantric Kerala Traditions</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div className="image-side" variants={slideRight}>
                            <motion.div
                                className="about-image-wrapper shine-hover"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.4 }}
                            >
                                <img src="/images/banners/banner1.jpg" alt="Temple History" />
                                <motion.div
                                    className="floating-stat"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    <span className="stat-value">70+</span>
                                    <span className="stat-label">Years of Glory</span>
                                </motion.div>
                            </motion.div>
                            <div className="corner-decor" />
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* ---- LEGEND SECTION ---- */}
            <motion.section
                className="about-content-section alt-bg section-padding"
                {...inViewProps()}
                variants={stagger}
            >
                <div className="container">
                    <div className="content-grid reverse">
                        <motion.div className="text-side" variants={slideRight}>
                            <div className="section-label">
                                <Sparkles size={18} />
                                <span>{t('about.legend_title')}</span>
                            </div>
                            <h2 className="heading-secondary">{t('about.legend_heading')}</h2>
                            <p className="description-text">{t('about.legend_p1')}</p>
                            
                            <motion.div
                                className="quote-box"
                                variants={scaleIn}
                                whileHover={{ scale: 1.01, borderColor: 'rgba(217, 119, 6, 0.6)' }}
                            >
                                <p>"{t('about.legend_quote')}"</p>
                            </motion.div>
                        </motion.div>

                        <motion.div className="image-side" variants={slideLeft}>
                            <motion.div
                                className="about-image-wrapper shine-hover"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.4 }}
                            >
                                <img src="/images/banners/banner3.jpg" alt="Temple Legend" />
                            </motion.div>
                            <div className="corner-decor" />
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* ---- ARCHITECTURE SECTION ---- */}
            <motion.section
                className="about-content-section section-padding"
                {...inViewProps()}
                variants={stagger}
            >
                <div className="container">
                    <div className="content-grid">
                        <motion.div className="text-side" variants={slideLeft}>
                            <div className="section-label">
                                <Award size={18} />
                                <span>{t('about.architecture_title')}</span>
                            </div>
                            <h2 className="heading-secondary">{t('about.architecture_heading')}</h2>
                            <p className="description-text">{t('about.architecture_p1')}</p>
                            
                            <ul className="feature-list">
                                <motion.li variants={fadeInUp} whileHover={{ x: 6 }}>
                                    <Star size={16} /> <span>{t('about.arch_feat1')}</span>
                                </motion.li>
                                <motion.li variants={fadeInUp} whileHover={{ x: 6 }}>
                                    <Star size={16} /> <span>{t('about.arch_feat2')}</span>
                                </motion.li>
                                <motion.li variants={fadeInUp} whileHover={{ x: 6 }}>
                                    <Star size={16} /> <span>{t('about.arch_feat3')}</span>
                                </motion.li>
                            </ul>
                        </motion.div>

                        <motion.div className="image-side" variants={slideRight}>
                            <motion.div
                                className="about-image-wrapper grid-collage shine-hover"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.4 }}
                            >
                                <img src="/images/banners/banner2.jpg" alt="Architecture Details" />
                                <div className="overlay-card">
                                    <MapPin size={24} />
                                    <p>{t('about.arch_location')}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* ---- CTA SECTION ---- */}
            <motion.section className="about-cta" {...inViewProps()} variants={fadeInUp}>
                <div className="container">
                    <motion.div
                        className="cta-box"
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.35 }}
                    >
                        <h3>{t('about.cta_title')}</h3>
                        <p>{t('about.cta_desc')}</p>
                        <div className="cta-buttons">
                            <motion.a
                                href="/contact"
                                className="btn-solid"
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {t('about.cta_btn')} <ChevronRight size={18} />
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default About;
