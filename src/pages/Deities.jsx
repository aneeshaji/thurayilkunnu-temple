import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Crown, Sun, Volume2 } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
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
    const { t, i18n } = useTranslation();
    const isML = i18n.language === 'ml';
    const [activeChant, setActiveChant] = useState(null);

    const deitiesData = [
        {
            id: 'subramanya',
            name: t('deities.list.subramanya.name'),
            subtitle: isML ? 'വേൽമുരുകൻ · ദേവസേനാപതി' : 'The Lord of Vel & Supreme Commander',
            description: t('deities.list.subramanya.desc'),
            image: '/images/deities/subramanya.jpg',
            main: true,
            badge: isML ? 'പ്രധാന പ്രതിഷ്ഠ' : 'Presiding Sanctum Deity',
            mantra: 'Om Saravanabhavaya Namaha ॐ',
            attributes: isML ? ['ദിവ്യമായ വേൽ', 'മയിൽ വാഹനം', 'വിഘ്നനാശകൻ'] : ['Sacred Golden Vel', 'Divine Peacock Vahana', 'Dispeller of Obstacles']
        },
        {
            id: 'ganapathy',
            name: t('deities.list.ganapathy.name'),
            subtitle: isML ? 'വിഘ്നേശ്വരൻ · സർവ്വാഭീഷ്ട വരദായകൻ' : 'The Lord of Beginnings',
            description: t('deities.list.ganapathy.desc'),
            image: '/images/deities/ganapathy.jpg',
            main: false,
            badge: isML ? 'ഉപദേവത' : 'Upadevatha',
            mantra: 'Om Gam Ganapataye Namaha ॐ',
            attributes: isML ? ['തടസ്സനിവാരകൻ', 'ജ്ഞാനസ്വരൂപൻ', 'പ്രഥമപൂജിതൻ'] : ['Remover of Obstacles', 'God of Wisdom', 'First Worshipped']
        },
        {
            id: 'bhagavathy',
            name: t('deities.list.bhagavathy.name'),
            subtitle: isML ? 'ജഗന്മാതാവ് · സർവ്വമംഗളകാരിണി' : 'The Divine Mother Goddess',
            description: t('deities.list.bhagavathy.desc'),
            image: '/images/deities/bhagavathy.jpg',
            main: false,
            badge: isML ? 'ഉപദേവത' : 'Upadevatha',
            mantra: 'Om Shri Durgayai Namaha ॐ',
            attributes: isML ? ['പരാശക്തി', 'അഭയവരദായിനി', 'കൃപാകടാക്ഷം'] : ['Supreme Energy', 'Fierce Protector', 'Bestower of Grace']
        },
        {
            id: 'sivan',
            name: t('deities.list.sivan.name'),
            subtitle: isML ? 'മഹാദേവൻ · സംഹാരരുദ്രൻ' : 'The Supreme Yogi & Destroyer',
            description: t('deities.list.sivan.desc'),
            image: '/images/deities/sivan.jpg',
            main: false,
            badge: isML ? 'ഉപദേവത' : 'Upadevatha',
            mantra: 'Om Namah Shivaya ॐ',
            attributes: isML ? ['ത്രിശൂലധാരി', 'നടരാജമൂർത്തി', 'മൃത്യുഞ്ജയൻ'] : ['Trident (Trishul) Bearer', 'Lord of Dance', 'Embodiment of Time']
        },
        {
            id: 'nagaraja',
            name: t('deities.list.nagaraja.name'),
            subtitle: isML ? 'നാഗരാജാവ് · സർപ്പദോഷ നിവാരകൻ' : 'The Serpent King',
            description: t('deities.list.nagaraja.desc'),
            image: '/images/deities/nagaraja.jpg',
            main: false,
            badge: isML ? 'ഉപദേവത' : 'Upadevatha',
            mantra: 'Om Nagarajaya Namaha ॐ',
            attributes: isML ? ['ഐശ്വര്യദായകൻ', 'ഭൂമിപാലകൻ', 'സന്താനസൗഭാഗ്യം'] : ['Protector of Wealth', 'Guardian of Earth', 'Granter of Progeny']
        }
    ];

    const triggerChant = (id) => {
        setActiveChant(id);
        setTimeout(() => setActiveChant(null), 3000);
    };

    return (
        <div className={`deities-page ${isML ? 'lang-ml' : ''}`}>
            {/* ---- LUXURY INNER PAGE HERO ---- */}
            <PageHero
                title={t('deities.page_title')}
                subtitle={t('deities.page_intro')}
                badge={isML ? 'പുണ്യ സന്നിധികൾ' : 'Sacred Sanctum Presences'}
                bgImage="/images/banners/banner_deities.jpg"
                currentPage={t('deities.page_title')}
            />

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
                                                title={isML ? "മന്ത്ര ജപം" : "Chant Sacred Mantra"}
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
                                                    {isML ? '✨ അനുഗ്രഹം ലഭിച്ചു!' : '✨ Blessed!'}
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
