import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, BookOpen, Award, Clock, MapPin, ChevronRight, Phone, Quote, Calendar, ArrowRight, ShieldCheck, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
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
const SectionHead = ({ eyebrow, title, desc, to }) => (
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
                <span>View All</span> <ChevronRight size={16} />
            </Link>
        )}
    </div>
);

const Home = () => {
    const { t } = useTranslation();

    const offerings = [
        { 
            image: '/images/offerings/ganapathy_homam.jpg', 
            badge: 'Daily Homam',
            title: t('home.offerings.ganapathy_homam'), 
            desc: t('home.offerings.ganapathy_homam_desc') 
        },
        { 
            image: '/images/offerings/archana_pushpanjali.jpg', 
            badge: 'Daily Archana',
            title: t('home.offerings.vazhipadu'), 
            desc: t('home.offerings.vazhipadu_desc') 
        },
        { 
            image: '/images/offerings/thulabharam.jpg', 
            badge: 'Sacred Vow',
            title: t('home.offerings.thulabharam'), 
            desc: t('home.offerings.thulabharam_desc') 
        },
        { 
            image: '/images/offerings/palabhishekam.jpg', 
            badge: 'Special Bath',
            title: t('home.offerings.special_poojas'), 
            desc: t('home.offerings.special_poojas_desc') 
        }
    ];

    const stats = [
        { num: 70, suffix: '+', label: t('home.stats.heritage') },
        { num: 500, suffix: '+', label: t('home.stats.devotees') },
        { num: 12, suffix: '+', label: t('home.stats.festivals') },
        { num: 1952, suffix: '', label: t('home.stats.established') }
    ];

    const festivals = [
        { name: t('festivals_page.list.thaipusam.name'), date: t('festivals_page.list.thaipusam.date'), desc: t('festivals_page.list.thaipusam.desc'), image: '/images/festivals/thaipusam.jpg' },
        { name: t('festivals_page.list.skanda.name'), date: t('festivals_page.list.skanda.date'), desc: t('festivals_page.list.skanda.desc'), image: '/images/festivals/skanda_sashti.jpg' },
        { name: t('festivals_page.list.vishu.name'), date: t('festivals_page.list.vishu.date'), desc: t('festivals_page.list.vishu.desc'), image: '/images/festivals/vishu.jpg' },
        { name: t('festivals_page.list.thrikarthika.name'), date: t('festivals_page.list.thrikarthika.date'), desc: t('festivals_page.list.thrikarthika.desc'), image: '/images/festivals/thrikarthika.jpg' },
        { name: t('festivals_page.list.uthrattathi.name'), date: t('festivals_page.list.uthrattathi.date'), desc: t('festivals_page.list.uthrattathi.desc'), image: '/images/festivals/uthrattathi.jpg' }
    ];

    const deities = [
        { name: t('deities.list.subramanya.name'), desc: t('deities.list.subramanya.desc'), image: '/images/deities/subramanya.jpg', featured: true, badge: 'Presiding Deity' },
        { name: t('deities.list.ganapathy.name'), desc: t('deities.list.ganapathy.desc'), image: '/images/deities/ganapathy.jpg', featured: false },
        { name: t('deities.list.bhagavathy.name'), desc: t('deities.list.bhagavathy.desc'), image: '/images/deities/bhagavathy.jpg', featured: false },
        { name: t('deities.list.sivan.name'), desc: t('deities.list.sivan.desc'), image: '/images/deities/sivan.jpg', featured: false },
        { name: t('deities.list.nagaraja.name'), desc: t('deities.list.nagaraja.desc'), image: '/images/deities/palani_murugan.jpg', featured: false }
    ];

    const testimonials = [
        { name: t('home.testimonials.list.r1.name'), location: t('home.testimonials.list.r1.location'), quote: t('home.testimonials.list.r1.quote'), tint: '#0F766E' },
        { name: t('home.testimonials.list.r2.name'), location: t('home.testimonials.list.r2.location'), quote: t('home.testimonials.list.r2.quote'), tint: '#D9A62E' },
        { name: t('home.testimonials.list.r3.name'), location: t('home.testimonials.list.r3.location'), quote: t('home.testimonials.list.r3.quote'), tint: '#B8860B' }
    ];

    const initials = (name) =>
        name.split(' ').map((w) => w[0]).slice(0, 2).join('');

    return (
        <div className="sanctuary-home-page">
            <SEO />
            <Banner />

            {/* ---- WELCOME & HERITAGE ---- */}
            <motion.section className="sanctuary-section welcome-heritage" {...inViewProps()} variants={stagger}>
                <div className="sanctuary-container heritage-grid">
                    <motion.div className="heritage-copy" variants={slideLeft}>
                        <span className="sanctuary-eyebrow">{t('home.welcome_subtitle')}</span>
                        <h2 className="heritage-heading">{t('home.welcome_title')}</h2>
                        <p className="heritage-lead">{t('home.welcome_desc1')}</p>
                        <p className="heritage-body">{t('home.welcome_desc2')}</p>
                        
                        <div className="heritage-features-row">
                            <span className="heritage-chip"><Sun size={15} /> Morning Pooja 05:00 AM – 10:30 AM</span>
                            <span className="heritage-chip"><ShieldCheck size={15} /> Traditional Tantric Rituals</span>
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
                            <img src="/images/banners/banner2.jpg" alt="Thurayilkunnu Sree Subramanya Swami Temple Sanctum" />
                            <div className="arch-badge">
                                <span>✦ Seat of Divine Grace</span>
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
            <motion.section className="sanctuary-section offerings-section" {...inViewProps()} variants={stagger}>
                <div className="sanctuary-container">
                    <SectionHead
                        eyebrow={t('home.offerings.section_label')}
                        title={t('home.offerings.title')}
                        desc={t('home.offerings.desc')}
                        to="/offerings"
                    />

                    <div className="offering-cards-grid">
                        {offerings.map((o, i) => (
                            <motion.article
                                className="offering-glass-card"
                                key={i}
                                variants={fadeInUp}
                                whileHover={{ y: -8 }}
                                transition={{ duration: 0.35 }}
                            >
                                <div className="offering-image-holder">
                                    <img src={o.image} alt={o.title} loading="lazy" />
                                    {o.badge && (
                                        <span className="offering-type-badge">
                                            <Sparkles size={11} />
                                            {o.badge}
                                        </span>
                                    )}
                                </div>
                                <div className="offering-info">
                                    <h3>{o.title}</h3>
                                    <p>{o.desc}</p>
                                    <Link to="/offerings" className="offering-card-btn">
                                        <span>{t('home.offerings.card_link')}</span>
                                        <ChevronRight size={15} />
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
                        eyebrow="Annual Celebrations"
                        title={t('festivals_page.title')}
                        to="/festivals"
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
                        eyebrow="Divine Presence"
                        title={t('deities.page_title')}
                        to="/deities"
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
                        <a href="tel:+919400788358" className="phone-number-btn">+91 94007 88358</a>
                        <Link to="/contact" className="gold-pill-btn">
                            <span>{t('home.closing.visit_donate')}</span>
                            <ArrowRight size={17} />
                        </Link>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default Home;