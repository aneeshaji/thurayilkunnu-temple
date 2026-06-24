import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, BookOpen, Award, Phone, Clock, MapPin, ChevronRight, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Banner from '../components/Banner';
import '../styles/Home.css';

// --- FRAMER MOTION VARIANTS ---
const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
};

const fadeInUp = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    show: { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        transition: { type: 'spring', stiffness: 45, damping: 15, mass: 1 } 
    }
};

const slideLeft = {
    hidden: { opacity: 0, x: -80, rotate: -3 },
    show: { 
        opacity: 1, 
        x: 0, 
        rotate: 0, 
        transition: { type: 'spring', stiffness: 50, damping: 20 } 
    }
};

const slideRight = {
    hidden: { opacity: 0, x: 80, rotate: 3 },
    show: { 
        opacity: 1, 
        x: 0, 
        rotate: 0, 
        transition: { type: 'spring', stiffness: 50, damping: 20 } 
    }
};

const Home = () => {
    const { t } = useTranslation();

    const offerings = [
        { icon: <Sparkles size={36} />, title: t('home.offerings.ganapathy_homam'), desc: t('home.offerings.ganapathy_homam_desc') },
        { icon: <Heart size={36} />, title: t('home.offerings.vazhipadu'), desc: t('home.offerings.vazhipadu_desc') },
        { icon: <BookOpen size={36} />, title: t('home.offerings.thulabharam'), desc: t('home.offerings.thulabharam_desc') },
        { icon: <Award size={36} />, title: t('home.offerings.special_poojas'), desc: t('home.offerings.special_poojas_desc') },
    ];

    return (
        <div className="home-page">
            <Banner />

            {/* ---- WELCOME SECTION ---- */}
            <motion.section 
                className="home-section welcome-section"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
            >
                <div className="home-container">
                    <div className="welcome-grid">
                        <motion.div className="welcome-image-side" variants={slideLeft}>
                            <div className="image-frame">
                                <img src="/images/banners/banner2.jpg" alt="Temple" />
                                <motion.div 
                                    className="image-badge"
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Star size={16} fill="currentColor" />
                                    <span>Est. 1952</span>
                                </motion.div>
                            </div>
                        </motion.div>
                        
                        <motion.div className="welcome-text-side" variants={slideRight}>
                            <span className="label">{t('home.welcome_subtitle')}</span>
                            <h2 className="heading-lg">{t('home.welcome_title')}</h2>
                            <div className="accent-line"></div>
                            <p className="body-text">{t('home.welcome_desc1')}</p>
                            <p className="body-text">{t('home.welcome_desc2')}</p>
                            <div className="welcome-info-chips">
                                <div className="info-chip">
                                    <Clock size={16} />
                                    <span>05:00 AM – 10:30 AM & 05:30 PM – 08:00 PM</span>
                                </div>
                                <div className="info-chip">
                                    <MapPin size={16} />
                                    <span>{t('home.location_chip')}</span>
                                </div>
                            </div>
                            <Link to="/about" className="cta-btn primary">
                                {t('home.learn_more')} <ChevronRight size={18} />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* ---- STATS STRIP ---- */}
            <motion.div 
                className="stats-strip"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
            >
                <div className="home-container stats-row">
                    {[
                        { num: '70+', label: t('home.stats.heritage') },
                        { num: '500+', label: t('home.stats.devotees') },
                        { num: '12+', label: t('home.stats.festivals') },
                        { num: '1952', label: t('home.stats.established') },
                    ].map((s, i) => (
                        <motion.div className="stat-item" key={i} variants={fadeInUp}>
                            <span className="stat-num">{s.num}</span>
                            <span className="stat-lbl">{s.label}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* ---- OFFERINGS SECTION ---- */}
            <motion.section 
                className="home-section offerings-section"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
            >
                <div className="home-container">
                    <motion.div className="section-header" variants={fadeInUp}>
                        <span className="label">{t('home.offerings.section_label')}</span>
                        <h2 className="heading-lg">{t('home.offerings.title')}</h2>
                        <div className="accent-line centered"></div>
                        <p className="body-text centered-text">{t('home.offerings.desc')}</p>
                    </motion.div>
                    
                    <div className="offerings-grid">
                        {offerings.map((item, i) => (
                            <motion.div className="offering-card" key={i} variants={fadeInUp}>
                                <motion.div 
                                    className="offering-icon-wrap"
                                    whileHover={{ scale: 1.1, rotate: 5, backgroundColor: '#F89B29', color: '#fff' }}
                                >
                                    {item.icon}
                                </motion.div>
                                <h3 className="offering-title">{item.title}</h3>
                                <p className="offering-desc">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                    
                    <motion.div className="section-footer" variants={fadeInUp}>
                        <Link to="/offerings" className="cta-btn outline">
                            {t('home.offerings.view_all')} <ChevronRight size={18} />
                        </Link>
                    </motion.div>
                </div>
            </motion.section>

            {/* ---- QUOTE SECTION ---- */}
            <motion.section 
                className="quote-section"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <div className="quote-bg-overlay"></div>
                <div className="home-container quote-inner">
                    <motion.div 
                        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} 
                        transition={{ duration: 2.5, repeat: Infinity }}
                    >
                        <Sparkles size={40} className="quote-sparkle" />
                    </motion.div>
                    <blockquote className="quote-text">
                        "{t('home.quote.mantra')}"
                    </blockquote>
                    <cite className="quote-cite">— {t('home.quote.blessing')}</cite>
                </div>
            </motion.section>

            {/* ---- TIMINGS + CONTACT ---- */}
            <motion.section 
                className="home-section"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
            >
                <div className="home-container timings-contact-grid">
                    <motion.div className="timings-card" variants={slideLeft}>
                        <div className="card-header-badge">
                            <Clock size={20} />
                            <span>{t('home.timings.card_badge')}</span>
                        </div>
                        <h3 className="heading-md">{t('home.timings.title')}</h3>
                        <div className="accent-line"></div>
                        <div className="timing-row">
                            <span className="timing-period">
                                <span className="timing-dot morning"></span>
                                {t('home.timings.morning')}
                            </span>
                            <span className="timing-hrs">05:00 AM – 10:30 AM</span>
                        </div>
                        <div className="timing-row">
                            <span className="timing-period">
                                <span className="timing-dot evening"></span>
                                {t('home.timings.evening')}
                            </span>
                            <span className="timing-hrs">05:30 PM – 08:00 PM</span>
                        </div>
                    </motion.div>

                    <motion.div className="contact-card" variants={slideRight}>
                        <div className="card-header-badge">
                            <Phone size={20} />
                            <span>{t('home.closing.card_badge')}</span>
                        </div>
                        <h3 className="heading-md">{t('home.closing.questions')}</h3>
                        <div className="accent-line"></div>
                        <p className="body-text">{t('home.closing.office_desc')}</p>
                        <motion.a 
                            href="tel:+919400788358" 
                            className="phone-link"
                            whileHover={{ x: 10, color: '#F89B29' }}
                        >
                            +91 94007 88358
                        </motion.a>
                        <Link to="/contact" className="cta-btn primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
                            {t('home.closing.visit_donate')} <ChevronRight size={18} />
                        </Link>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default Home;
