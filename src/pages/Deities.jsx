import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Crown, Sun, Volume2 } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import '../styles/Deities.css';

/* ---- ANIMATION VARIANTS ---- */
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } }
};

const cardVariant = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const inViewProps = (margin = '-70px') => ({
    initial: 'hidden',
    whileInView: 'show',
    viewport: { once: true, margin }
});

const Deities = () => {
    const { t } = useTranslation();
    const [activeChant, setActiveChant] = useState(null);

    const deitiesData = [
        {
            id: 'subramanya',
            name: t('deities.list.subramanya.name'),
            subtitle: 'The Lord of Vel & Supreme Commander',
            description: t('deities.list.subramanya.desc'),
            image: '/images/deities/subramanya.jpg',
            main: true,
            badge: 'Presiding Sanctum Deity',
            mantra: 'Om Saravanabhavaya Namaha ॐ',
            attributes: ['Sacred Golden Vel', 'Divine Peacock Vahana', 'Dispeller of Obstacles']
        },
        {
            id: 'ganapathy',
            name: t('deities.list.ganapathy.name'),
            subtitle: 'The Lord of Beginnings',
            description: t('deities.list.ganapathy.desc'),
            image: '/images/deities/ganapathy.jpg',
            main: false,
            badge: 'Upadevatha',
            mantra: 'Om Gam Ganapataye Namaha ॐ',
            attributes: ['Remover of Obstacles', 'God of Wisdom', 'First Worshipped']
        },
        {
            id: 'bhagavathy',
            name: t('deities.list.bhagavathy.name'),
            subtitle: 'The Divine Mother Goddess',
            description: t('deities.list.bhagavathy.desc'),
            image: '/images/deities/bhagavathy.jpg',
            main: false,
            badge: 'Upadevatha',
            mantra: 'Om Shri Durgayai Namaha ॐ',
            attributes: ['Supreme Energy', 'Fierce Protector', 'Bestower of Grace']
        },
        {
            id: 'sivan',
            name: t('deities.list.sivan.name'),
            subtitle: 'The Supreme Yogi & Destroyer',
            description: t('deities.list.sivan.desc'),
            image: '/images/deities/sivan.jpg',
            main: false,
            badge: 'Upadevatha',
            mantra: 'Om Namah Shivaya ॐ',
            attributes: ['Trident (Trishul) Bearer', 'Lord of Dance', 'Embodiment of Time']
        },
        {
            id: 'nagaraja',
            name: t('deities.list.nagaraja.name'),
            subtitle: 'The Serpent King',
            description: t('deities.list.nagaraja.desc'),
            image: '/images/deities/palani_murugan.jpg',
            main: false,
            badge: 'Upadevatha',
            mantra: 'Om Nagarajaya Namaha ॐ',
            attributes: ['Protector of Wealth', 'Guardian of Earth', 'Granter of Progeny']
        }
    ];

    const triggerChant = (id) => {
        setActiveChant(id);
        setTimeout(() => setActiveChant(null), 3000);
    };

    return (
        <div className="deities-page">
            {/* ---- HERO (Standardized with other pages) ---- */}
            <header className="deities-hero">
                <div className="hero-overlay" />
                <div className="container">
                    <motion.div
                        className="hero-content"
                        initial={{ opacity: 0, y: 35 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.span className="hero-badge" whileHover={{ scale: 1.05 }}>
                            <Sparkles size={16} /> Sacred Sanctum Presences
                        </motion.span>
                        <h1 className="hero-title">{t('deities.page_title')}</h1>
                        <p className="hero-subtitle">{t('deities.page_intro')}</p>
                    </motion.div>
                </div>
            </header>

            {/* ---- DEITIES GRID SECTION ---- */}
            <section className="deities-container section-padding">
                <div className="container">
                    <motion.div
                        className="deities-grid"
                        variants={stagger}
                        {...inViewProps()}
                    >
                        {deitiesData.map((deity) => (
                            <motion.article
                                key={deity.id}
                                className={`deity-card ${deity.main ? 'main-deity' : ''} shine-hover`}
                                variants={cardVariant}
                                whileHover={{ y: -8, scale: 1.01 }}
                                transition={{ duration: 0.35 }}
                            >
                                <div className="deity-image-wrapper">
                                    <img src={deity.image} alt={deity.name} className="deity-image" />
                                    <div className="deity-badge-holder">
                                        <span className="deity-sanctum-badge">
                                            {deity.main ? <Crown size={14} /> : <Sun size={14} />}
                                            {deity.badge}
                                        </span>
                                    </div>
                                    <div className="deity-img-aura" />
                                </div>

                                <div className="deity-info">
                                    <div className="deity-info-inner">
                                        <h2 className="deity-heading">{deity.name}</h2>
                                        <span className="deity-subtitle">{deity.subtitle}</span>
                                        <p className="deity-desc">{deity.description}</p>

                                        <div className="deity-attributes-list">
                                            {deity.attributes.map((attr, i) => (
                                                <span key={i} className="attribute-tag">
                                                    ✦ {attr}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mantra-strip">
                                            <button
                                                className={`mantra-pill ${activeChant === deity.id ? 'active' : ''}`}
                                                onClick={() => triggerChant(deity.id)}
                                                title="Chant Sacred Mantra"
                                            >
                                                <Volume2 size={16} className="mantra-sound-icon" />
                                                <span>{deity.mantra}</span>
                                            </button>
                                            {activeChant === deity.id && (
                                                <motion.span
                                                    className="chant-blessing-popup"
                                                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    exit={{ opacity: 0 }}
                                                >
                                                    ✨ Blessed!
                                                </motion.span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Deities;
