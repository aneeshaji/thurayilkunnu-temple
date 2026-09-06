import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Star, Sparkles, ChevronRight, Clock, Flame, Bell } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import '../styles/Festivals.css';

/* ---- ANIMATION VARIANTS ---- */
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } }
};

const cardVariant = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } }
};

const inViewProps = (margin = '-70px') => ({
    initial: 'hidden',
    whileInView: 'show',
    viewport: { once: true, margin }
});

const Festivals = () => {
    const { t } = useTranslation();

    const festivalsData = [
        {
            id: 1,
            name: t('festivals_page.list.thaipusam.name'),
            date: t('festivals_page.list.thaipusam.date'),
            tag: 'Grand Annual Festival',
            description: t('festivals_page.list.thaipusam.desc'),
            image: '/images/festivals/thaipusam.jpg',
            icon: <Flame size={24} />,
            highlights: ['Kavadi Procession', 'Palabhishekam', 'Grand Annadanam']
        },
        {
            id: 2,
            name: t('festivals_page.list.skanda.name'),
            date: t('festivals_page.list.skanda.date'),
            tag: '6 Sacred Days of Soorasamharam',
            description: t('festivals_page.list.skanda.desc'),
            image: '/images/festivals/skanda_sashti.jpg',
            icon: <Star size={24} />,
            highlights: ['Soorasamharam Ritual', 'Special Subramanya Pooja', 'Fasting & Vows']
        },
        {
            id: 3,
            name: t('festivals_page.list.vishu.name'),
            date: t('festivals_page.list.vishu.date'),
            tag: 'Kerala New Year & Auspicious Dawn',
            description: t('festivals_page.list.vishu.desc'),
            image: '/images/festivals/vishu.jpg',
            icon: <Calendar size={24} />,
            highlights: ['Vishukkani Darshan', 'Vishukkaineettam', 'Special Nirmalyam']
        },
        {
            id: 4,
            name: t('festivals_page.list.thrikarthika.name'),
            date: t('festivals_page.list.thrikarthika.date'),
            tag: 'The Festival of Lights',
            description: t('festivals_page.list.thrikarthika.desc'),
            image: '/images/festivals/thrikarthika.jpg',
            icon: <Sparkles size={24} />,
            highlights: ['Chuttuvilakku Lighting', 'Karthika Deepam', 'Bhagavathy Darshan']
        },
        {
            id: 5,
            name: t('festivals_page.list.uthrattathi.name'),
            date: t('festivals_page.list.uthrattathi.date'),
            tag: 'Auspicious Rituals & Parayeduppu',
            description: t('festivals_page.list.uthrattathi.desc'),
            image: '/images/festivals/uthrattathi.jpg',
            icon: <Bell size={24} />,
            highlights: ['Special Poojas', 'Parayeduppu', 'Traditional Melam']
        }
    ];

    return (
        <div className="festivals-page">
            <SEO 
                title={t('festivals_page.title')} 
                description="Experience the vibrant and spiritual festivals at Thurayilkunnu Sree Subramanya Swami Temple."
            />
            {/* ---- HERO ---- */}
            <header className="festivals-hero">
                <div className="hero-overlay" />
                <div className="container">
                    <motion.div
                        className="hero-content"
                        initial={{ opacity: 0, y: 35 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.span className="hero-badge" whileHover={{ scale: 1.05 }}>
                            <Sparkles size={16} /> Divine Celebrations
                        </motion.span>
                        <h1 className="hero-title">{t('festivals_page.title')}</h1>
                        <p className="hero-subtitle">{t('festivals_page.intro')}</p>
                    </motion.div>
                </div>
            </header>

            {/* ---- FESTIVALS TIMELINE/GRID ---- */}
            <section className="festivals-container section-padding">
                <div className="container">
                    <motion.div
                        className="festivals-grid"
                        variants={stagger}
                        {...inViewProps()}
                    >
                        {festivalsData.map((festival) => (
                            <motion.article
                                key={festival.id}
                                className="festival-card shine-hover"
                                variants={cardVariant}
                                whileHover={{ y: -10, scale: 1.015 }}
                                transition={{ duration: 0.35 }}
                            >
                                <div className="card-image-wrap">
                                    <img src={festival.image} alt={festival.name} />
                                    <div className="date-overlay">
                                        <Clock size={15} />
                                        <span>{festival.date}</span>
                                    </div>
                                    <span className="festival-card-tag">{festival.tag}</span>
                                </div>
                                <div className="card-content">
                                    <motion.div
                                        className="card-icon"
                                        whileHover={{ rotate: 20, scale: 1.15 }}
                                    >
                                        {festival.icon}
                                    </motion.div>
                                    <h2 className="card-title">{festival.name}</h2>
                                    <p className="card-description">{festival.description}</p>
                                    
                                    <div className="festival-highlights">
                                        {festival.highlights.map((item, idx) => (
                                            <span key={idx} className="highlight-pill">
                                                ✦ {item}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="card-footer">
                                        <a href="/contact" className="learn-more">
                                            <span>Festival Darshan Timings</span>
                                            <ChevronRight size={16} />
                                        </a>
                                    </div>
                                </div>
                                <div className="card-glow" />
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ---- INFO STRIP ---- */}
            <motion.div
                className="festival-info-strip"
                {...inViewProps()}
                variants={cardVariant}
            >
                <div className="container strip-inner">
                    <div className="info-block">
                        <motion.div
                            className="strip-icon-circle"
                            whileHover={{ rotate: 15, scale: 1.1 }}
                        >
                            <Calendar className="info-icon" size={28} />
                        </motion.div>
                        <div>
                            <h4>Planning a Temple Visit?</h4>
                            <p>Contact the temple office for festival mahotsavam schedules and special vazhipadu reservations.</p>
                        </div>
                    </div>
                    <motion.a
                        href="/contact"
                        className="strip-btn"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span>Contact Temple Office</span>
                        <ChevronRight size={16} />
                    </motion.a>
                </div>
            </motion.div>
        </div>
    );
};

export default Festivals;
