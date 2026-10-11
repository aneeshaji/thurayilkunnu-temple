import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    History,
    Award,
    MapPin,
    Star,
    Sparkles,
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    ShieldCheck,
    Sun,
    Clock,
    Users,
    UserCheck,
    Heart,
    Building,
    Phone,
    Calendar,
    Flame,
    CameraOff,
    VolumeX,
    Check,
    AlertTriangle,
    Compass,
    Navigation,
    ExternalLink,
    Home,
    X,
    // FileText, // unused while the "View Official Notice" button is disabled
    MessageCircle
} from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { committeeData } from '../data/committeeData';
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

const NEARBY_SHRINES = [
    {
        id: 'ochira',
        nameEn: 'Ochira Parabrahma Temple',
        nameMl: 'ഓച്ചിറ പരബ്രഹ്മ ക്ഷേത്രം',
        distanceEn: '9 km North (15 mins)',
        distanceMl: '9 കി.മീ വടക്ക് (15 മിനിറ്റ്)',
        deityEn: 'Lord Parabrahma (Formless Omkaram)',
        deityMl: 'പരബ്രഹ്മം (ഓംകാരം)',
        descEn: 'The renowned Dakshina Kasi of Kerala with no sanctum structure or idol, representing the omnipresent cosmic consciousness.',
        descMl: 'ദക്ഷിണ കാശി എന്നറിയപ്പെടുന്ന പുണ്യക്ഷേത്രം. ശ്രീകോവിലോ വിഗ്രഹമോ ഇല്ലാതെ പ്രകൃതിയെയും പരബ്രഹ്മത്തെയും ആരാധിക്കുന്ന അപൂർവ്വ പുണ്യഭൂമി.',
        mapUrl: 'https://maps.google.com/?q=Ochira+Parabrahma+Temple'
    },
    {
        id: 'amritapuri',
        nameEn: 'Mata Amritanandamayi Ashram (Amritapuri)',
        nameMl: 'മാതാ അമൃതാനന്ദമയി മഠം (അമൃതപുരി)',
        distanceEn: '10 km West (20 mins)',
        distanceMl: '10 കി.മീ പടിഞ്ഞാറ് (20 മിനിറ്റ്)',
        deityEn: 'Spiritual Sanctuary & Meditation',
        deityMl: 'ആത്മീയ സാധനാ കേന്ദ്രം',
        descEn: 'World-renowned coastal spiritual haven on the backwaters of Vallikavu, drawing seekers worldwide for peace and meditation.',
        descMl: 'വള്ളിക്കാവിലെ കായലോരത്ത് സ്ഥിതിചെയ്യുന്ന അന്താരാഷ്ട്ര ആത്മീയ കേന്ദ്രം. ലോകമെമ്പാടുമുള്ള ഭക്തർ ധ്യാനത്തിനും ആത്മശാന്തിക്കുമായി എത്തിച്ചേരുന്നു.',
        mapUrl: 'https://maps.google.com/?q=Amritapuri+Ashram+Vallikavu'
    },
    {
        id: 'sasthamkotta',
        nameEn: 'Sasthamkotta Sree Dharma Sastha Temple',
        nameMl: 'ശാസ്താംകോട്ട ശ്രീ ധർമ്മശാസ്താ ക്ഷേത്രം',
        distanceEn: '14 km East (25 mins)',
        distanceMl: '14 കി.മീ കിഴക്ക് (25 മിനിറ്റ്)',
        deityEn: 'Lord Dharma Sastha (Ayyappa)',
        deityMl: 'ശ്രീ ധർമ്മശാസ്താവ് (അയ്യപ്പൻ)',
        descEn: 'Surrounded on three sides by Kerala’s largest freshwater lake, this legendary hill shrine is famous for holy monkey troops (Vanara sena).',
        descMl: 'കേരളത്തിലെ ഏറ്റവും വലിയ ശുദ്ധജല തടാകത്താൽ ചുറ്റപ്പെട്ട പുരാതന ശാസ്താക്ഷേത്രം. വാനരസേനയും പ്രകൃതിഭംഗിയും ഇവിടുത്തെ പ്രത്യേകതയാണ്.',
        mapUrl: 'https://maps.google.com/?q=Sasthamkotta+Sree+Dharma+Sastha+Temple'
    },
    {
        id: 'pullanthara',
        nameEn: 'Pullanthara Sree Mahaganapathy Temple',
        nameMl: 'പുള്ളന്തറ ശ്രീ മഹാഗണപതി ക്ഷേത്രം',
        distanceEn: 'Adjacent · Thurayilkunnu (Walking distance)',
        distanceMl: 'സമീപം · തുറയിൽക്കുന്ന് (നടക്കാൻ ദൂരം)',
        deityEn: 'Lord Mahaganapathy (Vighneshwara)',
        deityMl: 'ശ്രീ മഹാഗണപതി (വിഘ്നേശ്വരൻ)',
        descEn: 'A revered Ganapathy temple within the Thurayilkunnu precinct at Maru South, Ayanivelikulangara. Devotees traditionally seek Ganapathy blessings here before proceeding for Subrahmanya Swami darshan.',
        descMl: 'തുറയിൽക്കുന്ന് മരു സൗത്ത്, അയനിവേലിക്കുളങ്ങര ഗ്രാമത്തിൽ സ്ഥിതിചെയ്യുന്ന ഗണപതി ക്ഷേത്രം. സുബ്രഹ്മണ്യ സ്വാമി ദർശനത്തിന് മുൻപ് ഭക്തർ ഗണപതി ആശീർവാദം തേടി ഇവിടെ എത്തുന്നു.',
        mapUrl: 'https://share.google/Ey1UbVoY73DBsI2d2'
    },
    {
        id: 'kattilmekkathil',
        nameEn: 'Kattil Mekkathil Devi Temple',
        nameMl: 'കട്ടിൽ മെക്കത്തിൽ ദേവീ ക്ഷേത്രം',
        distanceEn: 'Nearby · Karunagappally',
        distanceMl: 'സമീപം · കരുനാഗപ്പള്ളി',
        deityEn: 'Goddess Devi (Bhagavathi)',
        deityMl: 'ശ്രീ ദേവീ ഭഗവതി',
        descEn: 'A well-known Devi temple in the Karunagappally region where devotees seek the blessings of the Divine Mother.',
        descMl: 'കരുനാഗപ്പള്ളി പ്രദേശത്തുള്ള പ്രസിദ്ധമായ ദേവീക്ഷേത്രം. ഭഗവതീ അനുഗ്രഹം തേടി ഭക്തർ എത്തിച്ചേരുന്നു.',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Kattil+Mekkathil+Devi+Temple'
    },
    {
        id: 'padanayarkulangara',
        nameEn: 'Padanayarkulangara Mahadevar Temple',
        nameMl: 'പടനായർകുളങ്ങര മഹാദേവർ ക്ഷേത്രം',
        distanceEn: 'Nearby · Karunagappally',
        distanceMl: 'സമീപം · കരുനാഗപ്പള്ളി',
        deityEn: 'Lord Shiva (Mahadeva)',
        deityMl: 'ശ്രീ മഹാദേവൻ',
        descEn: 'An ancient Shiva temple at Padanayarkulangara, revered by devotees of the surrounding region.',
        descMl: 'പടനായർകുളങ്ങരയിലുള്ള പുരാതനമായ ശിവക്ഷേത്രം. സമീപ പ്രദേശങ്ങളിലെ ഭക്തർക്ക് ഇഷ്ടപ്പെട്ട ആരാധനാകേന്ദ്രം.',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Padanayarkulangara+Mahadevar+Temple'
    },
    {
        id: 'cheriazheekal',
        nameEn: 'Cheriazheekal Kashi Vishwanadha & Devi Temples',
        nameMl: 'ചെറിയഴീക്കൽ കാശീ വിശ്വനാഥ & ദേവീ ക്ഷേത്രങ്ങൾ',
        distanceEn: 'Nearby · Karunagappally',
        distanceMl: 'സമീപം · കരുനാഗപ്പള്ളി',
        deityEn: 'Lord Shiva (Kashi Vishwanadha) & Devi',
        deityMl: 'ശ്രീ കാശീ വിശ്വനാഥൻ & ദേവി',
        descEn: 'Twin shrines dedicated to Lord Shiva and Devi, known for their traditional Kerala temple architecture and serene atmosphere.',
        descMl: 'ശിവനും ദേവിയും പ്രതിഷ്ഠകളായ ക്ഷേത്രങ്ങൾ. പരമ്പരാഗത കേരളീയ ശൈലിയിലുള്ള നിർമ്മാണവും ശാന്തമായ അന്തരീക്ഷവും പ്രസിദ്ധം.',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Cheriazheekal+Kashi+Vishwanadha+Temple'
    },
    {
        id: 'mookkumpuzha',
        nameEn: 'Sree Mookkumpuzha Temple',
        nameMl: 'ശ്രീ മൂക്കുമ്പുഴ ക്ഷേത്രം',
        distanceEn: 'Nearby · Karunagappally',
        distanceMl: 'സമീപം · കരുനാഗപ്പള്ളി',
        deityEn: 'Local Village Deity',
        deityMl: 'ഗ്രാമദേവത',
        descEn: 'A local shrine in the Karunagappally area, an important centre of worship for the surrounding community.',
        descMl: 'കരുനാഗപ്പള്ളി പ്രദേശത്തുള്ള ഒരു പ്രാദേശിക ക്ഷേത്രം. സമീപ ഗ്രാമങ്ങളിലെ ഭക്തരുടെ പ്രധാന ആരാധനാകേന്ദ്രം.',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sree+Mookkumpuzha+Temple'
    }
];

const About = () => {
    const { t, i18n } = useTranslation();
    const isML = i18n.language === 'ml';
    // Poster modal temporarily disabled along with the "View Official Notice" button.
    // Restore these two lines to bring the official-notice modal back.
    // const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
    const [activeHistoryImg, setActiveHistoryImg] = useState(0);

    const historyImages = [
        {
            src: '/images/gallery/temple_night_dwajam.jpg',
            captionEn: 'Lord Subrahmanya Swami – Sanctum Darshan with Sacred Vel & Mayil',
            captionMl: 'ദീപം തെളിഞ്ഞ രാവിലെ ക്ഷേത്ര സന്നിധിയും പ്രകാശമാനമായ കൊടിമരവും'
        },
        {
            src: '/images/gallery/chuttuvilakku_night.jpg',
            captionEn: 'Chuttuvilakku – Temple Lamps Glowing in the Evening Prayer',
            captionMl: 'ദേവ സന്നിധിയിൽ ദീപ്‌തിമാനമായ ചുറ്റുവിളക്കുകൾ'
        },
        {
            src: '/images/gallery/pongala_deepasthambham.jpg',
            captionEn: 'Devotees Offering Pongala Ritual at Deepasthambham',
            captionMl: 'ദീപസ്തംഭത്തിന് മുന്നിലെ ഭക്തിസാന്ദ്രമായ പൊങ്കാല സമർപ്പണം'
        },
        {
            src: '/images/gallery/thurayilkunnu_pongala_wide.jpg',
            captionEn: 'Sahasra Pongala Mahotsavam – A Sea of Devotion',
            captionMl: 'സഹസ്ര പൊങ്കാല മഹോത്സവ കാഴ്ച്ചകൾ – ഭക്തജനസമുദ്രം'
        },
        {
            src: '/images/gallery/kavadi_procession.jpg',
            captionEn: 'Annual Festival Devotee Gathering & Divine Procession',
            captionMl: 'ഉത്സവദിനങ്ങളിലെ ഭക്തജന സംഗമം'
        },
        {
            src: '/images/gallery/temple_festive_decor.jpg',
            captionEn: 'Temple Adorned with Festive Decorations for Skanda Shashti',
            captionMl: 'സ്കന്ദഷഷ്ഠി ആഘോഷ ദിനത്തിൽ ഒരുങ്ങിനിൽക്കുന്ന ക്ഷേത്ര സന്നിധി'
        }
    ];

    const nextHistoryImg = (e) => {
        e.stopPropagation();
        setActiveHistoryImg((prev) => (prev + 1) % historyImages.length);
    };

    const prevHistoryImg = (e) => {
        e.stopPropagation();
        setActiveHistoryImg((prev) => (prev - 1 + historyImages.length) % historyImages.length);
    };

    return (
        <div className="about-page">
            <SEO 
                title={t('about.title')} 
                description={t('about.seo_description')}
                url="/about"
            />
            {/* ---- LUXURY INNER PAGE HERO ---- */}
            <PageHero
                title={t('about.title')}
                subtitle={t('about.hero_subtitle') || "A sacred hillock sanctuary consecrated in strict accordance with authentic Kerala tantric traditions."}
                badge={t('about.hero_badge')}
                bgImage="/images/banners/banner_about.jpg"
                currentPage={t('navbar.about')}
            />

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
                            <p className="description-text">{t('about.history_p3')}</p>
                        </motion.div>

                        <motion.div className="image-side" variants={slideRight}>
                            <div className="about-photo-slider">
                                <div className="about-photo-slider__track">
                                    {historyImages.map((img, idx) => (
                                        <motion.div
                                            key={idx}
                                            className={`about-photo-slide ${idx === activeHistoryImg ? 'active' : ''}`}
                                            animate={{ opacity: idx === activeHistoryImg ? 1 : 0 }}
                                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                                        >
                                            <img
                                                src={img.src}
                                                alt={img.captionEn}
                                                loading={idx === 0 ? 'eager' : 'lazy'}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                                {/* Caption */}
                                <div className="about-photo-caption">
                                    <span>{isML ? historyImages[activeHistoryImg].captionMl : historyImages[activeHistoryImg].captionEn}</span>
                                </div>
                                {/* Nav Arrows */}
                                <button className="about-photo-arrow prev" onClick={prevHistoryImg} aria-label="Previous image">
                                    <ChevronLeft size={20} />
                                </button>
                                <button className="about-photo-arrow next" onClick={nextHistoryImg} aria-label="Next image">
                                    <ChevronRight size={20} />
                                </button>
                                {/* Dots */}
                                <div className="about-photo-dots">
                                    {historyImages.map((_, idx) => (
                                        <button
                                            key={idx}
                                            className={`about-photo-dot ${idx === activeHistoryImg ? 'active' : ''}`}
                                            onClick={(e) => { e.stopPropagation(); setActiveHistoryImg(idx); }}
                                            aria-label={`Go to image ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                                {/* 70+ floating stat */}
                                <motion.div
                                    className="floating-stat"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    <span className="stat-value">70+</span>
                                    <span className="stat-label">{isML ? 'വർഷത്തെ മഹത്വം' : 'Years of Glory'}</span>
                                </motion.div>
                            </div>
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
                                <img src="/images/gallery/subrahmanya_sanctum.jpg" alt="Temple Legend" />
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
                                <img src="/images/gallery/pooja_ritual_1.jpg" alt="Temple Architecture" />
                                <div className="overlay-card">
                                    <MapPin size={24} />
                                    <p>{t('about.arch_location')}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* ---- DAILY POOJA TIMETABLE (പൂജാ സമയക്രമം) ---- */}
            <motion.section
                id="timetable"
                className="about-content-section alt-bg section-padding"
                {...inViewProps()}
                variants={stagger}
            >
                <div className="container">
                    <div className="section-head text-center">
                        <span className="section-label" style={{ justifyContent: 'center' }}>
                            <Clock size={18} />
                            <span>{t('pooja_schedule.badge')}</span>
                        </span>
                        <h2 className="heading-secondary">{t('pooja_schedule.title')}</h2>
                        <p className="description-text" style={{ maxWidth: '750px', margin: '0 auto 2.5rem' }}>
                            {t('pooja_schedule.subtitle')}
                        </p>
                    </div>

                    <div className="timetable-cards-grid">
                        {/* Morning Timetable */}
                        <motion.div className="timetable-session-card" variants={fadeInUp}>
                            <div className="session-card-header morning">
                                <Sun size={22} />
                                <h3>{t('pooja_schedule.morning_session')}</h3>
                            </div>
                            <div className="timeline-events-list">
                                {(t('pooja_schedule.events', { returnObjects: true }) || []).slice(0, 5).map((evt, idx) => (
                                    <div key={idx} className="timeline-event-item">
                                        <div className="event-time-badge">{evt.time}</div>
                                        <div className="event-details">
                                            <h4 className="event-name">{evt.name}</h4>
                                            <p className="event-desc">{evt.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Evening Timetable */}
                        <motion.div className="timetable-session-card" variants={fadeInUp}>
                            <div className="session-card-header evening">
                                <Flame size={22} />
                                <h3>{t('pooja_schedule.evening_session')}</h3>
                            </div>
                            <div className="timeline-events-list">
                                {(t('pooja_schedule.events', { returnObjects: true }) || []).slice(5).map((evt, idx) => (
                                    <div key={idx} className="timeline-event-item">
                                        <div className="event-time-badge evening-time">{evt.time}</div>
                                        <div className="event-details">
                                            <h4 className="event-name">{evt.name}</h4>
                                            <p className="event-desc">{evt.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Special Auspicious Days Strip */}
                    <motion.div className="special-days-strip" variants={fadeInUp}>
                        <div className="special-days-icon">
                            <Sparkles size={24} />
                        </div>
                        <div className="special-days-info">
                            <h4>{t('pooja_schedule.special_days_title')}</h4>
                            <p>{t('pooja_schedule.special_days_desc')}</p>
                        </div>
                        <Link to="/festivals" className="special-days-link">
                            <span>{isML ? 'ഉത്സവങ്ങൾ' : 'Festivals'}</span> <ChevronRight size={16} />
                        </Link>
                    </motion.div>
                </div>
            </motion.section>

            {/* ---- TEMPLE DRESS CODE & CODE OF CONDUCT (ആചാരങ്ങൾ) ---- */}
            <motion.section
                id="dresscode"
                className="about-content-section section-padding"
                {...inViewProps()}
                variants={stagger}
            >
                <div className="container">
                    <div className="section-head text-center">
                        <span className="section-label" style={{ justifyContent: 'center' }}>
                            <ShieldCheck size={18} />
                            <span>{t('dress_code.badge')}</span>
                        </span>
                        <h2 className="heading-secondary">{t('dress_code.title')}</h2>
                        <p className="description-text" style={{ maxWidth: '750px', margin: '0 auto 2.5rem' }}>
                            {t('dress_code.subtitle')}
                        </p>
                    </div>

                    <div className="dress-code-grid">
                        {/* Male Devotees Card */}
                        <motion.div className="dress-card shine-hover" variants={fadeInUp} whileHover={{ y: -6 }}>
                            <div className="dress-card-badge gents">{isML ? 'പുരുഷന്മാർ' : 'Men / പുരുഷന്മാർ'}</div>
                            <h3 className="dress-card-title">{t('dress_code.gents_title')}</h3>
                            <ul className="dress-rules-list">
                                <li>
                                    <Check size={16} className="rule-check" />
                                    <span>{t('dress_code.gents_rule1')}</span>
                                </li>
                                <li>
                                    <Check size={16} className="rule-check" />
                                    <span>{t('dress_code.gents_rule2')}</span>
                                </li>
                                <li className="warning-rule">
                                    <AlertTriangle size={16} className="rule-warn" />
                                    <span>{t('dress_code.gents_rule3')}</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Female Devotees Card */}
                        <motion.div className="dress-card shine-hover" variants={fadeInUp} whileHover={{ y: -6 }}>
                            <div className="dress-card-badge ladies">{isML ? 'സ്ത്രീകൾ' : 'Women / സ്ത്രീകൾ'}</div>
                            <h3 className="dress-card-title">{t('dress_code.ladies_title')}</h3>
                            <ul className="dress-rules-list">
                                <li>
                                    <Check size={16} className="rule-check" />
                                    <span>{t('dress_code.ladies_rule1')}</span>
                                </li>
                                <li className="warning-rule">
                                    <AlertTriangle size={16} className="rule-warn" />
                                    <span>{t('dress_code.ladies_rule2')}</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Sanctum Decorum Card */}
                        <motion.div className="dress-card decorum shine-hover" variants={fadeInUp} whileHover={{ y: -6 }}>
                            <div className="dress-card-badge decorum-badge">{isML ? 'ശുദ്ധി & ആചാരം' : 'Purity & Decorum'}</div>
                            <h3 className="dress-card-title">{t('dress_code.sanctum_title')}</h3>
                            <div className="decorum-rules-list">
                                <div className="decorum-item">
                                    <div className="decorum-icon">
                                        <ShieldCheck size={18} />
                                    </div>
                                    <div>
                                        <strong>{t('dress_code.rule_footwear')}</strong>
                                        <p>{t('dress_code.rule_footwear_desc')}</p>
                                    </div>
                                </div>
                                <div className="decorum-item">
                                    <div className="decorum-icon">
                                        <CameraOff size={18} />
                                    </div>
                                    <div>
                                        <strong>{t('dress_code.rule_mobile')}</strong>
                                        <p>{t('dress_code.rule_mobile_desc')}</p>
                                    </div>
                                </div>
                                <div className="decorum-item">
                                    <div className="decorum-icon">
                                        <VolumeX size={18} />
                                    </div>
                                    <div>
                                        <strong>{t('dress_code.rule_silence')}</strong>
                                        <p>{t('dress_code.rule_silence_desc')}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* ---- TEMPLE ADMINISTRATION & OFFICE BEARERS (ഭരണസമിതി) ---- */}
            <motion.section
                id="administration"
                className="about-content-section alt-bg section-padding"
                {...inViewProps()}
                variants={stagger}
            >
                <div className="container">
                    <div className="section-head text-center">
                        <span className="section-label" style={{ justifyContent: 'center' }}>
                            <Users size={18} />
                            <span>{t('administration.badge')}</span>
                        </span>
                        <h2 className="heading-secondary">{t('administration.title')}</h2>
                        <p className="description-text" style={{ maxWidth: '750px', margin: '0 auto 2.5rem' }}>
                            {t('administration.subtitle')}
                        </p>
                    </div>

                    {/* Spiritual Guardians (Tantri & Melsanthi) */}
                    <div className="admin-subgroup-title">
                        <Sparkles size={18} />
                        <h3>{t('administration.spiritual_title')}</h3>
                    </div>

                    <div className="spiritual-heads-grid">
                        {/* Tantri Card */}
                        <motion.div className="spiritual-head-card tantri-card" variants={fadeInUp} whileHover={{ y: -5 }}>
                            <div className="spiritual-card-topbar">
                                <div className="spiritual-card-badge">
                                    <Sparkles size={13} />
                                    <span>{isML ? 'തന്ത്രി' : 'Tantric Head'}</span>
                                </div>
                            </div>
                            <div className="spiritual-content-flex">
                                <div className="spiritual-avatar-box">
                                    <img
                                        src="/images/committee/tantri.jpg"
                                        alt={isML ? 'ബ്രഹ്മശ്രീ വി.പി. ഉണ്ണികൃഷ്ണൻ — ക്ഷേത്രം തന്ത്രി' : 'Brahmasree V.P. Unnikrishnan — Temple Thantri'}
                                        className="spiritual-avatar-img"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="spiritual-info">
                                    <h4 className="spiritual-role">{t('administration.tantri_role')}</h4>
                                    <h3 className="spiritual-name">{t('administration.tantri_name')}</h3>
                                    <p className="spiritual-desc">{t('administration.tantri_desc')}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Melshanthi Card — Sri Anil Gokulam Shanthi */}
                        <motion.div className="spiritual-head-card melsanthi-card" variants={fadeInUp} whileHover={{ y: -5 }}>
                            <div className="spiritual-card-topbar">
                                <div className="spiritual-card-badge gold">
                                    <Sparkles size={13} />
                                    <span>{isML ? 'ക്ഷേത്രം മേൽശാന്തി' : 'Temple Melshanthi'}</span>
                                </div>
                            </div>
                            <div className="spiritual-content-flex">
                                <div className="spiritual-avatar-box">
                                    <img
                                        src="/images/committee/melshanthi.jpg"
                                        alt={isML ? 'ശ്രീ അനിൽ ഗോകുലം ശാന്തി — ക്ഷേത്രം മേൽശാന്തി' : 'Sri Anil Gokulam Shanthi — Temple Melshanthi'}
                                        className="spiritual-avatar-img"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="spiritual-info">
                                    <h4 className="spiritual-role">{t('administration.melsanthi_role')}</h4>
                                    <h3 className="spiritual-name">{t('administration.melsanthi_name')}</h3>
                                    <p className="spiritual-desc">{t('administration.melsanthi_desc')}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Temple Administrative Committee (ക്ഷേത്രഭരണ സമിതി) */}
                    <div className="admin-committee-section" style={{ marginTop: '4rem' }}>
                        <div className="admin-section-header">
                            <div>
                                <div className="admin-subgroup-title" style={{ marginBottom: '0.35rem' }}>
                                    <Building size={19} />
                                    <h3>{isML ? 'ക്ഷേത്രഭരണ സമിതി' : 'Temple Administrative Committee'}</h3>
                                </div>
                                <p className="admin-section-sub">
                                    {isML 
                                        ? 'തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്ര ഭരണസമിതി ഭാരവാഹികളും അംഗങ്ങളും'
                                        : 'Governing council and committee members of Thurayilkunnu Sree Subrahmanya Swami Temple'}
                                </p>
                            </div>
                        </div>

                        {/* Executive Leadership Grid (3 Leaders) */}
                        <div className="modern-leadership-grid">
                            {committeeData.officeBearers.map((bearer) => (
                                <motion.div
                                    key={bearer.id}
                                    className="modern-leader-card"
                                    variants={fadeInUp}
                                    whileHover={{ y: -4 }}
                                >
                                    <span className="leader-role-tag">
                                        {isML ? bearer.designationMl : bearer.designationEn}
                                    </span>

                                    <div className="leader-avatar-wrapper">
                                        <img
                                            src={bearer.image}
                                            alt={isML ? bearer.nameMl : bearer.nameEn}
                                            className="leader-avatar-img"
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                if (e.target.nextSibling) {
                                                    e.target.nextSibling.style.display = 'flex';
                                                }
                                            }}
                                        />
                                        <div className="leader-avatar-fallback" style={{ display: 'none' }}>
                                            <UserCheck size={32} />
                                        </div>
                                    </div>

                                    <h4 className="leader-name">
                                        {isML ? bearer.nameMl : bearer.nameEn}
                                    </h4>
                                    
                                    <div className="leader-residence">
                                        <Home size={13} />
                                        <span>{isML ? bearer.houseMl : bearer.houseEn}</span>
                                    </div>

                                    <div className="leader-contact-row">
                                        <a 
                                            href={`tel:+91${bearer.phone}`} 
                                            className="leader-call-btn" 
                                            title={`Call ${isML ? bearer.nameMl : bearer.nameEn}`}
                                        >
                                            <Phone size={13} />
                                            <span>{bearer.phone.replace(/(\d{5})(\d{5})/, '$1 $2')}</span>
                                        </a>
                                        <a 
                                            href={`https://wa.me/91${bearer.phone}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="leader-wa-btn"
                                            title="WhatsApp"
                                            aria-label="WhatsApp"
                                        >
                                            <MessageCircle size={14} />
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Committee Members Subsection */}
                        <div className="admin-subgroup-title" style={{ marginTop: '3.5rem', marginBottom: '1.5rem' }}>
                            <Users size={20} />
                            <h3>{isML ? 'കമ്മിറ്റി അംഗങ്ങൾ' : 'Committee Members'}</h3>
                        </div>

                        {/* Committee Members Grid (9 Members - 3x3 Symmetrical) */}
                        <div className="modern-members-grid">
                            {committeeData.members.map((member) => (
                                <motion.div
                                    key={member.id}
                                    className="modern-member-card"
                                    variants={fadeInUp}
                                    whileHover={{ y: -4 }}
                                >
                                    <div className="member-avatar-wrapper">
                                        <img
                                            src={member.image}
                                            alt={isML ? member.nameMl : member.nameEn}
                                            className="member-avatar-img"
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                if (e.target.nextSibling) {
                                                    e.target.nextSibling.style.display = 'flex';
                                                }
                                            }}
                                        />
                                        <div className="member-avatar-fallback" style={{ display: 'none' }}>
                                            <UserCheck size={26} />
                                        </div>
                                    </div>
                                    
                                    <div className="member-details">
                                        <h4 className="member-name">{isML ? member.nameMl : member.nameEn}</h4>
                                        <div className="member-residence">
                                            <Home size={13} />
                                            <span>{isML ? member.houseMl : member.houseEn}</span>
                                        </div>
                                    </div>

                                    <div className="member-contact-row">
                                        <a 
                                            href={`tel:+91${member.phone}`} 
                                            className="member-call-btn" 
                                            title={`Call ${isML ? member.nameMl : member.nameEn}`}
                                        >
                                            <Phone size={12} />
                                            <span>{member.phone.replace(/(\d{5})(\d{5})/, '$1 $2')}</span>
                                        </a>
                                        <a 
                                            href={`https://wa.me/91${member.phone}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="member-wa-btn"
                                            title="WhatsApp"
                                            aria-label="WhatsApp"
                                        >
                                            <MessageCircle size={13} />
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Notice Lightbox Modal — disabled with the "View Official Notice" button.
                        Restore the useState line above and uncomment this block to bring it back.
                    {isPosterModalOpen && (
                        <div className="poster-modal-overlay" onClick={() => setIsPosterModalOpen(false)}>
                            <div className="poster-modal-dialog" onClick={(e) => e.stopPropagation()}>
                                <div className="poster-modal-header">
                                    <div>
                                        <h3 className="poster-modal-title">{t('administration.notice_modal_title')}</h3>
                                        <p className="poster-modal-sub">{t('administration.notice_modal_sub')}</p>
                                    </div>
                                    <button
                                        type="button"
                                        className="poster-modal-close"
                                        onClick={() => setIsPosterModalOpen(false)}
                                        aria-label="Close"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                                <div className="poster-modal-body">
                                    <img
                                        src={committeeData.posterImage}
                                        alt="Official Temple Administrative Committee Announcement"
                                        className="poster-modal-img"
                                    />
                                </div>
                                <div className="poster-modal-footer">
                                    <a
                                        href={committeeData.posterImage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="poster-download-btn"
                                    >
                                        <ExternalLink size={15} />
                                        <span>{isML ? 'പൂർണ്ണ രൂപത്തിൽ തുറക്കുക' : 'Open Full Image'}</span>
                                    </a>
                                    <button
                                        type="button"
                                        className="poster-close-action"
                                        onClick={() => setIsPosterModalOpen(false)}
                                    >
                                        {t('administration.close_notice')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )} */}



                </div>
            </motion.section>

            {/* ---- NEARBY PILGRIMAGE CIRCUIT (സമീപ തീർത്ഥാടന കേന്ദ്രങ്ങൾ) ---- */}
            <motion.section
                id="pilgrimage-circuit"
                className="about-content-section section-padding"
                {...inViewProps()}
                variants={stagger}
            >
                <div className="container">
                    <div className="section-head text-center">
                        <span className="section-label" style={{ justifyContent: 'center' }}>
                            <Compass size={18} />
                            <span>{isML ? 'തീർത്ഥാടന പാത' : 'Pilgrimage Circuit'}</span>
                        </span>
                        <h2 className="heading-secondary">
                            {isML ? 'കരുനാഗപ്പള്ളിയിലെ സമീപ പുണ്യക്ഷേത്രങ്ങൾ' : 'Nearby Sacred Shrines & Spiritual Spots'}
                        </h2>
                        <p className="description-text" style={{ maxWidth: '750px', margin: '0 auto 2.5rem' }}>
                            {isML
                                ? 'തുറയിൽകുന്ന് സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്ര ദർശനത്തോടൊപ്പം സന്ദർശിക്കാവുന്ന കരുനാഗപ്പള്ളിയിലെയും സമീപപ്രദേശങ്ങളിലെയും പ്രധാന പുണ്യകേന്ദ്രങ്ങൾ.'
                                : 'Devotees visiting Thurayilkunnu Sree Subrahmanya Swami Temple can also complete their sacred pilgrimage with these renowned holy shrines in and around Karunagappally.'}
                        </p>
                    </div>

                    <div className="pilgrimage-grid">
                        {NEARBY_SHRINES.map((shrine) => (
                            <motion.div
                                key={shrine.id}
                                className="pilgrimage-card shine-hover"
                                variants={fadeInUp}
                                whileHover={{ y: -6 }}
                            >
                                <div className="pilgrimage-card-header">
                                    <span className="pilgrimage-dist-badge">
                                        <Navigation size={13} />
                                        <span>{isML ? shrine.distanceMl : shrine.distanceEn}</span>
                                    </span>
                                    <span className="pilgrimage-deity-badge">{isML ? shrine.deityMl : shrine.deityEn}</span>
                                </div>
                                <h3 className="pilgrimage-shrine-name">{isML ? shrine.nameMl : shrine.nameEn}</h3>
                                <p className="pilgrimage-shrine-desc">{isML ? shrine.descMl : shrine.descEn}</p>
                                <a
                                    href={shrine.mapUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="pilgrimage-route-btn"
                                >
                                    <span>{isML ? 'റൂട്ട് മാപ്പ് കാണാം' : 'View on Google Maps'}</span>
                                    <ExternalLink size={15} />
                                </a>
                            </motion.div>
                        ))}
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
                        <div className="cta-buttons" style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link
                                to="/offerings"
                                className="btn-solid"
                                style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', color: '#FFFFFF' }}
                            >
                                <Flame size={18} /> {t('navbar.online_pooja')}
                            </Link>
                            <Link
                                to="/contact"
                                className="btn-solid"
                            >
                                {t('about.cta_btn')} <ChevronRight size={18} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default About;
