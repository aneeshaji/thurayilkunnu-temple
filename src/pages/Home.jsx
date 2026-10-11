import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, BookOpen, Award, Clock, MapPin, ChevronRight, Phone, Quote, Calendar, ArrowRight, ShieldCheck, Sun, Bell, Flame, Eye, ExternalLink, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import Banner from '../components/Banner';
import PanchangamWidget from '../components/PanchangamWidget';
import '../styles/Home.css';

/* ---- MOTION ANIMATION VARIANTS ---- */
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } }
};

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } }
};

const slideLeft = {
    hidden: { opacity: 0, x: -54 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const slideRight = {
    hidden: { opacity: 0, x: 54 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const inViewProps = (margin = '-70px') => ({
    initial: 'hidden',
    whileInView: 'show',
    viewport: { once: true, margin }
});

/* ---- FESTIVAL COUNTDOWN ---- */
const UPCOMING_FESTIVALS = [
    { 
        name: 'Skanda Sashti Mahotsavam', 
        nameMl: 'സ്കന്ദഷഷ്ടി മഹോത്സവം', 
        date: new Date('2026-11-15T05:00:00+05:30'), 
        tag: 'Next Grand Festival (1202 Thulam 29)',
        tagMl: 'അടുത്ത മഹാ ഉത്സവം (1202 തുലാം 29)'
    },
    { 
        name: 'Thrikarthika Deepotsavam', 
        nameMl: 'തൃക്കാർത്തിക ദീപോത്സവം', 
        date: new Date('2026-11-24'), 
        tag: 'Deepa Festival',
        tagMl: 'ദീപോത്സവം'
    },
    { 
        name: 'Skanda Purana Yajnam', 
        nameMl: 'സ്കന്ദ പുരാണ യജ്ഞം', 
        date: new Date('2026-12-28'), 
        tag: 'Sacred Yajnam',
        tagMl: 'വിശേഷാൽ പുണ്യ യജ്ഞം'
    },
    { 
        name: 'Thaipusam Kavadi Mahotsavam', 
        nameMl: 'തൈപ്പൂയം കാവടി മഹോത്സവം', 
        date: new Date('2027-02-07'), 
        tag: 'Grand Annual',
        tagMl: 'വാർഷിക കാവടിയാട്ടം'
    },
    { 
        name: 'Uthrattathi Mahotsavam', 
        nameMl: 'ഉത്രട്ടാതി മഹോത്സവം', 
        date: new Date('2027-02-20'), 
        tag: 'Premier Annual Festival',
        tagMl: 'പ്രധാന വാർഷിക മഹോത്സവം'
    },
    { 
        name: 'Vishu Kani Darshan', 
        nameMl: 'വിഷു കണി ദർശനം', 
        date: new Date('2027-04-14'), 
        tag: 'Kerala New Year',
        tagMl: 'വിഷുക്കണി ദർശനം'
    },
];

const FestivalCountdown = () => {
    const { i18n } = useTranslation();
    const isML = i18n.language === 'ml';
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
    const nextFestival = UPCOMING_FESTIVALS.find(f => f.date > new Date()) || UPCOMING_FESTIVALS[0];

    useEffect(() => {
        const tick = () => {
            const diff = nextFestival.date - new Date();
            if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 }); return; }
            setTimeLeft({
                days: Math.floor(diff / 86400000),
                hours: Math.floor((diff % 86400000) / 3600000),
                mins: Math.floor((diff % 3600000) / 60000),
                secs: Math.floor((diff % 60000) / 1000),
            });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [nextFestival]);

    if (!nextFestival) return null;

    return (
        <motion.div
            className="festival-countdown-band"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
        >
            <div className="countdown-band-inner">
                <div className="countdown-left">
                    <motion.span className="countdown-bell" animate={{ rotate: [0, 15, -15, 10, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}>
                        <Bell size={18} />
                    </motion.span>
                    <div className="countdown-festival-info">
                        <span className="countdown-tag">{isML ? nextFestival.tagMl : nextFestival.tag}</span>
                        <strong className="countdown-name">{isML ? nextFestival.nameMl : nextFestival.name}</strong>
                    </div>
                </div>

                <div className="countdown-timer">
                    {[
                        { val: timeLeft.days, label: isML ? 'ദിവസം' : 'Days' },
                        { val: timeLeft.hours, label: isML ? 'മണിക്കൂർ' : 'Hrs' },
                        { val: timeLeft.mins, label: isML ? 'മിനിറ്റ്' : 'Min' },
                        { val: timeLeft.secs, label: isML ? 'സെക്കൻഡ്' : 'Sec' },
                    ].map(({ val, label }, i) => (
                        <React.Fragment key={label}>
                            <div className="countdown-unit">
                                <motion.span
                                    className="countdown-val"
                                    key={val}
                                    initial={{ y: -8, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {String(val).padStart(2, '0')}
                                </motion.span>
                                <span className="countdown-label">{label}</span>
                            </div>
                            {i < 3 && <span className="countdown-sep">:</span>}
                        </React.Fragment>
                    ))}
                </div>

                <Link to="/festivals" className="countdown-cta-btn">
                    <span>{isML ? 'ഉത്സവങ്ങൾ' : 'All Festivals'}</span>
                    <ChevronRight size={15} />
                </Link>
            </div>
        </motion.div>
    );
};

/* ---- ANIMATED COUNT-UP ---- */
const useCountUp = (target, duration = 1800) => {
    const [value, setValue] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        let raf;
        let start;
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                const tick = (ts) => {
                    if (start === undefined) start = ts;
                    const p = Math.min((ts - start) / duration, 1);
                    setValue(Math.floor(p * target));
                    if (p < 1) raf = requestAnimationFrame(tick);
                };
                raf = requestAnimationFrame(tick);
                observer.disconnect();
            },
            { threshold: 0.4 }
        );

        observer.observe(el);
        return () => {
            observer.disconnect();
            if (raf) cancelAnimationFrame(raf);
        };
    }, [target, duration]);

    return [ref, value];
};

const CountStat = ({ target, suffix = '' }) => {
    const [ref, value] = useCountUp(target);
    return (
        <span className="stat-number" ref={ref}>
            {value}{suffix}
        </span>
    );
};

/* ---- SECTION HEADER ---- */
const SectionHead = ({ eyebrow, title, desc, to, isML }) => (
    <div className="sanctuary-section-head">
        <div className="head-content">
            <span className="sanctuary-eyebrow">
                <span className="eyebrow-line"></span>
                {eyebrow}
                <span className="eyebrow-line"></span>
            </span>
            <h2 className="sanctuary-title">{title}</h2>
            {desc && <p className="sanctuary-desc">{desc}</p>}
        </div>
        {to && (
            <Link to={to} className="sanctuary-link-btn">
                <span>{isML ? 'എല്ലാം കാണുക' : 'View All'}</span> <ChevronRight size={16} />
            </Link>
        )}
    </div>
);

const Home = () => {
    const { t, i18n } = useTranslation();
    const isML = i18n.language?.startsWith('ml');
    const [activePosterModal, setActivePosterModal] = useState(null);

    const offerings = [
        { 
            image: '/images/offerings/ganapathy_homam.jpg', 
            badge: isML ? 'നിത്യ ഹോമം' : 'Daily Homam',
            title: isML ? 'ഗണപതി ഹോമം' : 'Ganapathy Homam',
            desc: isML 
                ? 'ഐശ്വര്യത്തിനും തടസ്സനിവാരണത്തിനും ഭഗവാൻ ഗണപതിയുടെ ദിവ്യ അനുഗ്രഹം തേടി നടത്തുന്ന പുണ്യ ഹോമം.'
                : 'Sacred fire ritual invoking divine blessings of Lord Ganapathy for prosperity and removal of obstacles.',
            price: '₹250',
            deity: isML ? 'ഗണപതി ഭഗവാൻ' : 'Lord Ganapathy',
            accent: '#D97706',
            num: '01'
        },
        { 
            image: '/images/offerings/archana_pushpanjali.jpg', 
            badge: isML ? 'നിത്യ അർച്ചന' : 'Daily Archana',
            title: isML ? 'അർച്ചന / പുഷ്പാഞ്ജലി' : 'Archana / Pushpanjali',
            desc: isML 
                ? 'ആത്മശാന്തിക്കും കുടുംബ സമൃദ്ധിക്കും ദൈവിക കൃപ തേടി നടത്തുന്ന പുഷ്പ അർച്ചന.'
                : 'Sacred floral archana invoking divine grace for mental peace, health and family prosperity.',
            price: '₹15',
            deity: isML ? 'ശ്രീ സുബ്രഹ്മണ്യസ്വാമി' : 'Lord Murugan',
            accent: '#B45309',
            num: '02'
        },
        { 
            image: '/images/offerings/palabhishekam.jpg', 
            badge: isML ? 'പ്രത്യേക അഭിഷേകം' : 'Holy Abhishekam',
            title: isML ? 'പാലഭിഷേകം' : 'Palabhishekam',
            desc: isML 
                ? 'ശ്രീ സുബ്രഹ്മണ്യ സ്വാമിക്ക് പവിത്ര ക്ഷീരാഭിഷേകം. ആദ്ധ്യാത്മിക ശുദ്ധിക്കും ആന്തരിക ശാന്തിക്കും ഉത്തമം.'
                : 'Holy milk oblation to Lord Murugan for divine blessings, spiritual purity and inner peace.',
            price: '₹125',
            deity: isML ? 'ശ്രീ സുബ്രഹ്മണ്യസ്വാമി' : 'Lord Murugan',
            accent: '#92400E',
            num: '03'
        },
        { 
            image: '/images/gallery/kavadi_procession.jpg', 
            badge: isML ? 'വിശേഷ പൂജ' : 'Special Pooja',
            title: isML ? 'സ്കന്ദ കാവടി പൂജ' : 'Skanda Kavadi Pooja',
            desc: isML 
                ? 'ഭക്തർ ഭാരം വഹിച്ച് നടത്തുന്ന ദൈവ സേവ. ഭഗവാൻ സുബ്രഹ്മണ്യന്റെ അനുഗ്രഹം ലഭിക്കാൻ ഇത് ഉത്തമം.'
                : 'A sacred act of devotion where devotees carry the kavadi to seek the grace and blessings of Lord Skanda.',
            price: '₹40',
            deity: isML ? 'ശ്രീ സ്കന്ദൻ' : 'Lord Skanda',
            accent: '#78350F',
            num: '04'
        }
    ];

    const stats = [
        { num: 50, suffix: '+', label: t('home.stats.heritage') },
        { num: 100, suffix: '+', label: t('home.stats.devotees') },
        { num: 10, suffix: '+', label: t('home.stats.festivals') }
    ];

    const festivals = [
        { 
            name: isML ? 'സ്കന്ദഷഷ്ടി മഹോത്സവം' : 'Skanda Shashti Mahotsavam', 
            date: isML ? '2026 നവംബർ 15 (1202 തുലാം 29)' : '15 November 2026 (1202 Thulam 29)', 
            desc: isML 
                ? 'ഷഷ്ടി പൂജ, ക്ഷേത്രാലങ്കാരം, ചെണ്ടമേളം എന്നിവ ഭഗവാന് സമർപ്പിക്കാം. ദേവസ്വം ഓഫീസ്: 9072722205.' 
                : 'Special Shashti Pooja, Temple Decoration, and Chenda Melam dedication. Office: 9072722205.', 
            image: '/images/festivals/skanda_sashti_2026_poster.jpg' 
        },
        { 
            name: isML ? 'ഉത്രട്ടാതി തിരുമഹോത്സവം' : 'Annual Uthrattathi Mahotsavam', 
            date: isML ? 'കുംഭം (ഫെബ്രുവരി - മാർച്ച്)' : 'Kumbham (February – March)', 
            desc: isML 
                ? 'തുറയിൽക്കുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രത്തിലെ പ്രധാന വാർഷിക തിരുമഹോത്സവവും തുറയിൽക്കുന്ന് പൊങ്കാലയും.' 
                : 'Grand 10-day annual temple festival and auspicious Thurayilkunnu Pongala.', 
            image: '/images/festivals/thurayilkunnu_pongala_wide.jpg' 
        },
        { name: t('festivals_page.list.skanda_purana_yajnam.name'), date: t('festivals_page.list.skanda_purana_yajnam.date'), desc: t('festivals_page.list.skanda_purana_yajnam.desc'), image: '/images/gallery/festival_devotees_1.jpg' },
        { name: t('festivals_page.list.thaipusam.name'), date: t('festivals_page.list.thaipusam.date'), desc: t('festivals_page.list.thaipusam.desc'), image: '/images/gallery/deity_procession_1.jpg' },
        { name: t('festivals_page.list.thrikarthika.name'), date: t('festivals_page.list.thrikarthika.date'), desc: t('festivals_page.list.thrikarthika.desc'), image: '/images/festivals/thrikarthika.jpg' }
    ];

    const deities = [
        { name: t('deities.list.subrahmanya.name'), desc: t('deities.list.subrahmanya.desc'), image: '/images/deities/subrahmanya.jpg', featured: true, badge: isML ? 'പ്രധാന പ്രതിഷ്ഠ' : 'Presiding Deity' },
        { name: t('deities.list.ganapathy.name'), desc: t('deities.list.ganapathy.desc'), image: '/images/deities/ganapathy.jpg', featured: false },
        { name: t('deities.list.bhagavathy.name'), desc: t('deities.list.bhagavathy.desc'), image: '/images/deities/bhagavathy.jpg', featured: false },
        { name: t('deities.list.sivan.name'), desc: t('deities.list.sivan.desc'), image: '/images/deities/sivan.jpg', featured: false },
        { name: t('deities.list.nagaraja.name'), desc: t('deities.list.nagaraja.desc'), image: '/images/deities/nagaraja.jpg', featured: false }
    ];

    return (
        <div className={`sanctuary-home-page ${isML ? 'lang-ml' : ''}`}>
            <SEO
                title={isML ? 'തുറയിൽക്കുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം' : 'Thurayilkunnu Sree Subrahmanya Swami Temple'}
                description={isML
                    ? 'തുറയിൽക്കുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം, കരുനാഗപ്പള്ളി. നിത്യ പൂജകൾ, വഴിപാടുകൾ, സ്കന്ദഷഷ്ടി മഹോത്സവം, ഉത്രട്ടാതി ഉത്സവം എന്നിവയുടെ വിവരങ്ങൾ.'
                    : 'Thurayilkunnu Sree Subrahmanya Swami Temple at Karunagappally, Kerala — an ancient temple dedicated to Lord Subrahmanya (Murugan). Daily Panchangam, traditional poojas, and grand festivals including Skanda Shashti Mahotsavam and Uthrattathi.'}
                url="/"
            />
            <Banner />
            <FestivalCountdown />

            {/* ---- UPCOMING MAJOR EVENT SPOTLIGHT (SKANDA SHASHTI MAHOTSAVAM) ---- */}
            <motion.section 
                className="sanctuary-section event-spotlight-section" 
                {...inViewProps()} 
                variants={fadeInUp}
            >
                <div className="sanctuary-container">
                    <div className="event-proclamation-card">
                        {/* Top Ornamental Header Band */}
                        <div className="proclamation-header-band">
                            <div className="proclamation-eyebrow">
                                <span className="proclamation-gold-sparkle">✦</span>
                                <span className="proclamation-eyebrow-text">
                                    {isML ? 'അടുത്ത പ്രധാന ഉത്സവം • 1202 തുലാം 29' : 'Next Major Festival • 1202 Thulam 29'}
                                </span>
                                <span className="proclamation-gold-sparkle">✦</span>
                            </div>
                            <div className="proclamation-date-chip">
                                <Calendar size={14} className="proclamation-cal-icon" />
                                <span>{isML ? '2026 നവംബർ 15 ഞായറാഴ്ച' : 'Sunday, 15 November 2026'}</span>
                            </div>
                        </div>

                        <div className="proclamation-main-grid">
                            {/* Left Side: Devotional Details */}
                            <div className="proclamation-copy-col">
                                <span className="proclamation-temple-name">
                                    {isML ? 'ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം തുറയിൽക്കുന്ന്' : 'Thurayilkunnu Sree Subrahmanya Swami Temple'}
                                </span>
                                <h2 className="proclamation-title">
                                    {isML ? 'സ്കന്ദഷഷ്ടി മഹോത്സവം' : 'Skanda Shashti Mahotsavam'}
                                    <span className="proclamation-year-accent"> 2026</span>
                                </h2>
                                <p className="proclamation-lead">
                                    {isML 
                                        ? 'അന്നേ ദിവസം ഷഷ്ടി പൂജ, ക്ഷേത്രാലങ്കാരം, ചെണ്ടമേളം തുടങ്ങിയവ ഭഗവാന് നേർച്ചയായി സമർപ്പിക്കുവാൻ ആഗ്രഹിക്കുന്ന ഭക്തജനങ്ങൾ എത്രയും വേഗം ദേവസ്വം ഓഫീസുമായോ താഴെക്കാണുന്ന നമ്പരിലോ ബന്ധപ്പെടുക.'
                                        : 'Devotees wishing to dedicate sacred Shashti Pooja, Temple Illumination & Floral Decoration (Kshethralankaram), and Chenda Melam to the Lord are cordially invited to contact the Devaswom Office.'}
                                </p>

                                {/* Sacred Dedications 4-Box Grid */}
                                <div className="proclamation-dedications-grid">
                                    <div className="dedication-tile">
                                        <span className="dedication-symbol">🪔</span>
                                        <div className="dedication-text">
                                            <strong>{isML ? 'ഷഷ്ടി പൂജ' : 'Shashti Pooja'}</strong>
                                            <span>{isML ? 'വിശേഷാൽ അർച്ചന' : 'Sacred Archana'}</span>
                                        </div>
                                    </div>
                                    <div className="dedication-tile">
                                        <span className="dedication-symbol">🌺</span>
                                        <div className="dedication-text">
                                            <strong>{isML ? 'ക്ഷേത്രാലങ്കാരം' : 'Kshethralankaram'}</strong>
                                            <span>{isML ? 'ദീപ-പുഷ്പാലങ്കാരം' : 'Illumination & Florals'}</span>
                                        </div>
                                    </div>
                                    <div className="dedication-tile">
                                        <span className="dedication-symbol">🥁</span>
                                        <div className="dedication-text">
                                            <strong>{isML ? 'ചെണ്ടമേളം' : 'Chenda Melam'}</strong>
                                            <span>{isML ? 'മേള സമർപ്പണം' : 'Traditional Ensemble'}</span>
                                        </div>
                                    </div>
                                    <div className="dedication-tile">
                                        <span className="dedication-symbol">🕉️</span>
                                        <div className="dedication-text">
                                            <strong>{isML ? 'വ്രതാനുഷ്ഠാനം' : 'Shashti Vratam'}</strong>
                                            <span>{isML ? 'ഉപവാസ പ്രാർത്ഥന' : 'Devotional Fasting'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons Row */}
                                <div className="proclamation-actions-group">
                                    <a href="tel:+919072722205" className="proclamation-call-btn">
                                        <Phone size={15} />
                                        <span>{isML ? 'വിളിക്കുക: 9072722205' : 'Call: 90727 22205'}</span>
                                    </a>

                                    <button 
                                        type="button" 
                                        className="proclamation-circular-btn"
                                        onClick={() => setActivePosterModal('/images/festivals/skanda_sashti_2026_poster.jpg')}
                                    >
                                        <Eye size={15} />
                                        <span>{isML ? 'പൂർണ്ണ അറിയിപ്പ് കാണുക' : 'View Full Poster'}</span>
                                    </button>

                                    <Link to="/festivals" className="proclamation-calendar-link">
                                        <span>{isML ? 'ഉത്സവ കലണ്ടർ' : 'Festival Calendar'}</span>
                                        <ChevronRight size={14} />
                                    </Link>
                                </div>
                            </div>

                            {/* Right Side: Uncropped Framed Poster */}
                            <div className="proclamation-poster-col">
                                <div 
                                    className="proclamation-poster-easel"
                                    onClick={() => setActivePosterModal('/images/festivals/skanda_sashti_2026_poster.jpg')}
                                    role="button"
                                    tabIndex={0}
                                    title={isML ? 'പോസ്റ്റർ പൂർണ്ണ രൂപത്തിൽ കാണാൻ ക്ലിക്ക് ചെയ്യുക' : 'Click to view full poster'}
                                >
                                    <div className="poster-brass-matting">
                                        <img 
                                            src="/images/festivals/skanda_sashti_2026_poster.jpg" 
                                            alt="Skanda Shashti Mahotsavam 2026 Official Circular" 
                                            className="proclamation-poster-image"
                                        />
                                        <div className="poster-click-lens-badge">
                                            <Eye size={13} />
                                            <span>{isML ? 'വലുതാക്കി കാണുക' : 'Click to Enlarge'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* ---- WELCOME & HERITAGE ---- */}
            <motion.section className="sanctuary-section welcome-heritage" {...inViewProps()} variants={stagger}>
                <div className="sanctuary-container heritage-grid">
                    <motion.div className="heritage-copy" variants={slideLeft}>
                        <span className="sanctuary-eyebrow">{t('home.welcome_subtitle')}</span>
                        <h2 className="heritage-heading">{t('home.welcome_title')}</h2>
                        <p className="heritage-lead">{t('home.welcome_desc1')}</p>
                        <p className="heritage-body">{t('home.welcome_desc2')}</p>
                        
                        <div className="heritage-features-row">
                            <span className="heritage-chip"><Sun size={15} /> {isML ? 'രാവിലെ പൂജ 05:00 AM – 10:30 AM' : 'Morning Pooja 05:00 AM – 10:30 AM'}</span>
                            <span className="heritage-chip"><ShieldCheck size={15} /> {isML ? 'പരമ്പരാഗത താന്ത്രിക വിധികൾ' : 'Traditional Tantric Rituals'}</span>
                        </div>

                        <div className="heritage-cta">
                            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
                                <Link to="/about" className="gold-pill-btn">
                                    <span>{t('home.learn_more')}</span>
                                    <ArrowRight size={17} />
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div className="heritage-frame-wrapper" variants={slideRight}>
                        <motion.div
                            className="arch-photo-frame"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.5 }}
                        >
                            <img src="/images/banners/banner2.jpg" alt="Thurayilkunnu Sree Subrahmanya Swami Temple Sanctum" />
                            <div className="arch-badge">
                                <span>{isML ? '✦ ദിവ്യ കൃപയുടെ സങ്കേതം' : '✦ Seat of Divine Grace'}</span>
                            </div>
                        </motion.div>
                        <blockquote className="heritage-pull-quote">
                            "{t('home.quote.blessing')}"
                        </blockquote>
                    </motion.div>
                </div>
            </motion.section>

            {/* ---- STATS COUNTER STRIP ---- */}
            <motion.section className="sanctuary-stats-band" {...inViewProps('-50px')} variants={stagger}>
                <div className="sanctuary-container stats-grid">
                    {stats.map((s, i) => (
                        <motion.div className="stat-card" key={i} variants={fadeInUp} whileHover={{ y: -4 }}>
                            <CountStat target={s.num} suffix={s.suffix} />
                            <span className="stat-label">{s.label}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* ---- OFFERINGS & VAZHIPADU ---- */}
            <motion.section className="sanctuary-section vazhipadu-section" {...inViewProps()} variants={stagger}>
                <div className="sanctuary-container">
                    <SectionHead
                        eyebrow={isML ? 'ക്ഷേത്ര വഴിപാടുകൾ' : 'Sacred Offerings'}
                        title={isML ? 'തിരഞ്ഞെടുത്ത വഴിപാടുകൾ' : 'Featured Vazhipadus'}
                        desc={isML ? 'ശ്രദ്ധേയമായ ക്ഷേത്ര വഴിപാടുകൾ – ഭക്തർക്ക് ദൈവ കൃപ ലഭിക്കുവാൻ.' : 'Participate in the sacred rituals of Thurayilkunnu Temple and seek divine blessings.'}
                        to="/offerings"
                        isML={isML}
                    />

                    <div className="vazhipadu-panoramic-grid">
                        {offerings.map((o, i) => (
                            <motion.article
                                className="vazhipadu-immersive-card"
                                key={i}
                                variants={fadeInUp}
                                whileHover={{ scale: 1.025, zIndex: 2 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                style={{ '--card-accent': o.accent }}
                            >
                                {/* Full bleed image */}
                                <div className="vzp-image-layer">
                                    <img src={o.image} alt={o.title} loading="lazy" />
                                    <div className="vzp-overlay-gradient" />
                                    <div className="vzp-shimmer-strip" />
                                </div>

                                {/* Top badges row */}
                                <div className="vzp-top-row">
                                    <span className="vzp-num-badge">{o.num}</span>
                                    <span className="vzp-price-tag">{o.price}</span>
                                </div>

                                {/* Bottom content panel */}
                                <div className="vzp-content-panel">
                                    <span className="vzp-ritual-type">
                                        <Flame size={11} />
                                        {o.badge}
                                    </span>
                                    <span className="vzp-deity-label">✦ {o.deity}</span>
                                    <h3 className="vzp-title">{o.title}</h3>
                                    <p className="vzp-desc">{o.desc}</p>
                                    <Link to="/offerings" className="vzp-book-btn">
                                        <span>{isML ? 'വഴിപാട് ബുക്ക് ചെയ്യൂ' : 'Book Offering'}</span>
                                        <ChevronRight size={14} />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ---- FESTIVALS & RITUALS ---- */}
            <motion.section className="sanctuary-section festivals-section" {...inViewProps()} variants={stagger}>
                <div className="sanctuary-container">
                    <SectionHead
                        eyebrow={isML ? 'വാർഷിക ആഘോഷങ്ങൾ' : 'Annual Celebrations'}
                        title={t('festivals_page.title')}
                        to="/festivals"
                        isML={isML}
                    />

                    <div className="festivals-cards-grid">
                        {festivals.map((f, i) => (
                            <motion.div
                                className="festival-card-item"
                                key={i}
                                variants={fadeInUp}
                                whileHover={{ y: -8, scale: 1.02 }}
                            >
                                <div className="festival-image-holder">
                                    <img src={f.image} alt={f.name} loading="lazy" />
                                    <span className="festival-date-badge">
                                        <Calendar size={13} /> {f.date}
                                    </span>
                                </div>
                                <div className="festival-info">
                                    <h3>{f.name}</h3>
                                    <p>{f.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ---- DIVINE PRESENCES (DEITIES) ---- */}
            <motion.section className="sanctuary-section deities-section" {...inViewProps()} variants={stagger}>
                <div className="sanctuary-container">
                    <SectionHead
                        eyebrow={isML ? 'ദിവ്യ സാന്നിധ്യങ്ങൾ' : 'Divine Presence'}
                        title={t('deities.page_title')}
                        to="/deities"
                        isML={isML}
                    />

                    <div className="deities-cards-grid">
                        {deities.map((d, i) => (
                            <motion.div
                                className={`deity-card-item ${d.featured ? 'featured' : ''}`}
                                key={i}
                                variants={fadeInUp}
                                whileHover={{ y: -8, scale: 1.02 }}
                            >
                                <div className="deity-image-holder">
                                    <img src={d.image} alt={d.name} loading="lazy" />
                                    {d.featured && <span className="deity-badge">{d.badge}</span>}
                                </div>
                                <div className="deity-info">
                                    <h3>{d.name}</h3>
                                    <p>{d.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ---- SACRED CHANT MANTRA BAND ---- */}
            <motion.section className="sacred-mantra-band" {...inViewProps()} variants={fadeInUp}>
                <div className="mantra-container">
                    <motion.div
                        className="mantra-emblem"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                        ✦
                    </motion.div>
                    <h2 className="mantra-heading">"{t('home.quote.mantra')}"</h2>
                    <cite className="mantra-credit">— {t('home.quote.blessing')}</cite>
                </div>
            </motion.section>

            {/* ---- DAILY PANCHANGAM ---- */}
            <PanchangamWidget />

            {/* ---- SANCTUM TIMINGS & LOCATION BAND ---- */}
            <motion.section className="sanctuary-section timings-section" {...inViewProps()} variants={stagger}>
                <div className="sanctuary-container timings-grid">
                    <motion.div className="timing-info-card" variants={slideLeft} whileHover={{ y: -4 }}>
                        <div className="card-tag">
                            <Clock size={16} /> {t('home.timings.card_badge')}
                        </div>
                        <h2>{t('home.timings.title')}</h2>
                        <div className="schedule-list">
                            <div className="schedule-item">
                                <span className="period-label morning-dot">{t('home.timings.morning')}</span>
                                <span className="period-hours">05:00 AM – 10:30 AM</span>
                            </div>
                            <div className="schedule-item">
                                <span className="period-label evening-dot">{t('home.timings.evening')}</span>
                                <span className="period-hours">05:30 PM – 08:00 PM</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div className="timing-info-card" variants={slideRight} whileHover={{ y: -4 }}>
                        <div className="card-tag">
                            <Phone size={16} /> {t('home.closing.card_badge')}
                        </div>
                        <h2>{t('home.closing.questions')}</h2>
                        <p>{t('home.closing.office_desc')}</p>
                        <a href="tel:+917994342205" className="phone-number-btn">+91 79943 42205</a>
                        <Link to="/contact" className="gold-pill-btn">
                            <span>{t('navbar.contact')}</span>
                            <ArrowRight size={17} />
                        </Link>
                    </motion.div>
                </div>
            </motion.section>

            {/* ---- POSTER LIGHTBOX MODAL ---- */}
            <AnimatePresence>
                {activePosterModal && (
                    <motion.div 
                        className="poster-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActivePosterModal(null)}
                    >
                        <motion.div 
                            className="poster-modal-dialog"
                            initial={{ scale: 0.94, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.94, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{ maxWidth: '640px' }}
                        >
                            <div className="poster-modal-header">
                                <div>
                                    <h3 className="poster-modal-title">
                                        {isML ? 'സ്കന്ദഷഷ്ടി മഹോത്സവം 2026 — ഔദ്യോഗിക അറിയിപ്പ്' : 'Skanda Shashti Mahotsavam 2026 — Official Circular'}
                                    </h3>
                                    <p className="poster-modal-sub">
                                        {isML ? 'തുറയിൽക്കുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം • 2026 നവംബർ 15 (1202 തുലാം 29)' : 'Thurayilkunnu Sree Subrahmanya Swami Temple • 15 Nov 2026'}
                                    </p>
                                </div>
                                <button 
                                    type="button" 
                                    className="poster-modal-close"
                                    onClick={() => setActivePosterModal(null)}
                                    aria-label="Close"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="poster-modal-body" style={{ textAlign: 'center', background: '#0C0A09', padding: '1rem' }}>
                                <img 
                                    src={activePosterModal} 
                                    alt="Skanda Shashti Mahotsavam Announcement" 
                                    className="poster-modal-img" 
                                    style={{ maxHeight: '72vh', width: 'auto', maxWidth: '100%', objectFit: 'contain', borderRadius: '12px' }}
                                />
                            </div>
                            <div className="poster-modal-footer">
                                <a 
                                    href="tel:+919072722205"
                                    className="spotlight-btn-call"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Phone size={15} />
                                    <span>{isML ? 'വിളിക്കുക: 9072722205' : 'Call 9072722205'}</span>
                                </a>
                                <a 
                                    href={activePosterModal} 
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
                                    onClick={() => setActivePosterModal(null)}
                                >
                                    {isML ? 'അടയ്ക്കുക' : 'Close'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Home;