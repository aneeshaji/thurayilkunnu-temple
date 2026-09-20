import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    History,
    Award,
    MapPin,
    Star,
    Sparkles,
    ChevronRight,
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
    ExternalLink
} from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
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
        id: 'panmana',
        nameEn: 'Panmana Ashram & Chattampi Swamikal Samadhi',
        nameMl: 'പന്മന ആശ്രമം & ചട്ടമ്പിസ്വാമികൾ സമാധി',
        distanceEn: '12 km South (20 mins)',
        distanceMl: '12 കി.മീ തെക്ക് (20 മിനിറ്റ്)',
        deityEn: 'Bhattarakasramam & Shiva Sanctum',
        deityMl: 'ഭട്ടാരകാശ്രമം & ശിവസന്നിധി',
        descEn: 'The sacred mahasamadhi sthalam of great philosopher and reformer Sri Vidyadhiraja Chattampi Swamikal, offering deep meditative serenity.',
        descMl: 'മഹാതപസ്വിയും സാമൂഹ്യപരിഷ്കർത്താവുമായ ശ്രീ വിദ്യാധിരാജ ചട്ടമ്പിസ്വാമികളുടെ സമാധി മണ്ഡപം. ശാന്തസുന്ദരമായ അന്തരീക്ഷം.',
        mapUrl: 'https://maps.google.com/?q=Panmana+Ashram'
    },
    {
        id: 'pullanthara',
        nameEn: 'Pullanthara Sree Mahaganapathy Temple',
        nameMl: 'പുള്ളന്തറ ശ്രീ മഹാഗണപതി ക്ഷേത്രം',
        distanceEn: 'Adjacent · Thurayilkunnu (Walking distance)',
        distanceMl: 'സമീപം · തുറയിൽക്കുന്ന് (നടക്കാൻ ദൂരം)',
        deityEn: 'Lord Mahaganapathy (Vighneshwara)',
        deityMl: 'ശ്രീ മഹാഗണപതി (വിഘ്നേശ്വരൻ)',
        descEn: 'A revered Ganapathy temple within the Thurayilkunnu precinct at Maru South, Ayanivelikulangara. Devotees traditionally seek Ganapathy blessings here before proceeding for Subramanya Swami darshan.',
        descMl: 'തുറയിൽക്കുന്ന് മരു സൗത്ത്, അയനിവേലിക്കുളങ്ങര ഗ്രാമത്തിൽ സ്ഥിതിചെയ്യുന്ന ഗണപതി ക്ഷേത്രം. സുബ്രഹ്മണ്യ സ്വാമി ദർശനത്തിന് മുൻപ് ഭക്തർ ഗണപതി ആശീർവാദം തേടി ഇവിടെ എത്തുന്നു.',
        mapUrl: 'https://share.google/Ey1UbVoY73DBsI2d2'
    }
];

const About = () => {
    const { t, i18n } = useTranslation();
    const isML = i18n.language === 'ml';

    return (
        <div className="about-page">
            <SEO 
                title={t('about.title')} 
                description={t('about.hero_badge')}
            />
            {/* ---- LUXURY INNER PAGE HERO ---- */}
            <PageHero
                title={t('about.title')}
                subtitle={t('about.hero_subtitle') || "A sacred hillock sanctuary established in 1952, consecrated in strict accordance with authentic Kerala tantric traditions."}
                badge={t('about.hero_badge')}
                bgImage="/images/banners/banner_about.jpg"
                currentPage={t('about.title')}
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
                            
                            <div className="about-quick-stats">
                                <div className="quick-stat-pill">
                                    <ShieldCheck size={18} className="stat-pill-icon" />
                                    <span>{isML ? '1952-ൽ പ്രതിഷ്ഠിതം' : 'Consecrated in 1952'}</span>
                                </div>
                                <div className="quick-stat-pill">
                                    <Sun size={18} className="stat-pill-icon" />
                                    <span>{isML ? 'കേരളീയ താന്ത്രിക വിധികൾ' : 'Tantric Kerala Traditions'}</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div className="image-side" variants={slideRight}>
                            <motion.div
                                className="about-image-wrapper shine-hover"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.4 }}
                            >
                                <img src="/images/gallery/temple_exterior.jpg" alt="Temple History" />
                                <motion.div
                                    className="floating-stat"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    <span className="stat-value">70+</span>
                                    <span className="stat-label">{isML ? 'വർഷത്തെ മഹത്വം' : 'Years of Glory'}</span>
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
                                <img src="/images/gallery/subramanya_sanctum.jpg" alt="Temple Legend" />
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
                                <img src="/images/gallery/chuttuvilakku_night.jpg" alt="Architecture Details" />
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
                        <motion.div className="spiritual-head-card royal" variants={fadeInUp} whileHover={{ y: -5 }}>
                            <div className="spiritual-card-badge">{isML ? 'തന്ത്രി' : 'Tantric Head'}</div>
                            <h4 className="spiritual-role">{t('administration.tantri_role')}</h4>
                            <h3 className="spiritual-name">{t('administration.tantri_name')}</h3>
                            <p className="spiritual-desc">{t('administration.tantri_desc')}</p>
                        </motion.div>

                        <motion.div className="spiritual-head-card" variants={fadeInUp} whileHover={{ y: -5 }}>
                            <div className="spiritual-card-badge gold">{isML ? 'മേൽശാന്തി' : 'Chief Sanctum Priest'}</div>
                            <h4 className="spiritual-role">{t('administration.melsanthi_role')}</h4>
                            <h3 className="spiritual-name">{t('administration.melsanthi_name')}</h3>
                            <p className="spiritual-desc">{t('administration.melsanthi_desc')}</p>
                        </motion.div>
                    </div>

                    {/* Devaswom Trust Executive Committee */}
                    <div className="admin-subgroup-title" style={{ marginTop: '3.5rem' }}>
                        <Building size={18} />
                        <h3>{t('administration.board_title')}</h3>
                    </div>

                    <div className="executive-board-grid">
                        <motion.div className="exec-member-card" variants={fadeInUp} whileHover={{ y: -4 }}>
                            <div className="member-avatar">
                                <UserCheck size={22} />
                            </div>
                            <span className="member-role">{t('administration.president_role')}</span>
                            <h4 className="member-name">{t('administration.president_name')}</h4>
                            <span className="member-term">{isML ? 'ദേവസ്വം ബോർഡ്' : 'Devaswom Board'}</span>
                        </motion.div>

                        <motion.div className="exec-member-card" variants={fadeInUp} whileHover={{ y: -4 }}>
                            <div className="member-avatar">
                                <UserCheck size={22} />
                            </div>
                            <span className="member-role">{t('administration.secretary_role')}</span>
                            <h4 className="member-name">{t('administration.secretary_name')}</h4>
                            <span className="member-term">{isML ? 'ഭരണവിഭാഗം' : 'Administration'}</span>
                        </motion.div>

                        <motion.div className="exec-member-card" variants={fadeInUp} whileHover={{ y: -4 }}>
                            <div className="member-avatar">
                                <UserCheck size={22} />
                            </div>
                            <span className="member-role">{t('administration.treasurer_role')}</span>
                            <h4 className="member-name">{t('administration.treasurer_name')}</h4>
                            <span className="member-term">{isML ? 'ധനകാര്യ വിഭാഗം' : 'Finance & Accounts'}</span>
                        </motion.div>

                        <motion.div className="exec-member-card" variants={fadeInUp} whileHover={{ y: -4 }}>
                            <div className="member-avatar">
                                <UserCheck size={22} />
                            </div>
                            <span className="member-role">{t('administration.vp_role')}</span>
                            <h4 className="member-name">{t('administration.vp_name')}</h4>
                            <span className="member-term">{isML ? 'എക്സിക്യൂട്ടീവ്' : 'Executive'}</span>
                        </motion.div>

                        <motion.div className="exec-member-card" variants={fadeInUp} whileHover={{ y: -4 }}>
                            <div className="member-avatar">
                                <UserCheck size={22} />
                            </div>
                            <span className="member-role">{t('administration.joint_sec_role')}</span>
                            <h4 className="member-name">{t('administration.joint_sec_name')}</h4>
                            <span className="member-term">{isML ? 'എക്സിക്യൂട്ടീവ്' : 'Executive'}</span>
                        </motion.div>
                    </div>

                    {/* Trust Registration & Office Hours Info Strip */}
                    <motion.div className="trust-legal-card" variants={fadeInUp}>
                        <div className="trust-legal-head">
                            <ShieldCheck size={24} className="trust-icon" />
                            <div>
                                <h4>{t('administration.trust_reg_title')}</h4>
                                <p>{t('administration.trust_reg_desc')}</p>
                            </div>
                        </div>
                        <div className="trust-legal-foot">
                            <div className="office-hours-tag">
                                <Clock size={16} />
                                <span>{t('administration.office_hours')}</span>
                            </div>
                            <a href="tel:+917994342205" className="office-call-btn">
                                <Phone size={15} /> Call Office
                            </a>
                        </div>
                    </motion.div>
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
                                : 'Devotees visiting Thurayilkunnu Sree Subramanya Swami Temple can also complete their sacred pilgrimage with these renowned holy shrines in and around Karunagappally.'}
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
                                to="/donations"
                                className="btn-solid"
                                style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', color: '#FFFFFF' }}
                            >
                                <Heart size={18} /> {t('navbar.donations')}
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
