import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Star, Sparkles, ChevronRight, Clock, Flame, Bell } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
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
    const { t, i18n } = useTranslation();
    const isML = i18n.language === 'ml';

    const festivalsData = [
        {
            id: 1,
            name: t('festivals_page.list.uthrattathi.name'),
            date: t('festivals_page.list.uthrattathi.date'),
            tag: isML ? 'പ്രധാന വാർഷിക മഹോത്സവം ✦ ക്ഷേത്രോത്സവം' : 'Premier Annual Festival ✦ Temple Mahotsavam',
            description: t('festivals_page.list.uthrattathi.desc'),
            image: '/images/festivals/uthrattathi.jpg',
            icon: <Bell size={24} />,
            highlights: isML ? ['വിശേഷാൽ പൂജകൾ', 'പറയെടുപ്പ്', 'പഞ്ചവാദ്യവും മേളവും'] : ['Special Poojas', 'Parayeduppu', 'Panchavadyam & Grand Melam']
        },
        {
            id: 2,
            name: t('festivals_page.list.skanda_purana_yajnam.name'),
            date: t('festivals_page.list.skanda_purana_yajnam.date'),
            tag: isML ? 'പുണ്യ പുരാണ പാരായണവും യജ്ഞവും' : 'Sacred Fire Ritual & Purana Parayanam',
            description: t('festivals_page.list.skanda_purana_yajnam.desc'),
            image: '/images/festivals/skanda_sashti.jpg',
            icon: <Flame size={24} />,
            highlights: isML ? ['സ്കന്ദപുരാണ പാരായണം', 'പുണ്യ ഹോമം', 'ഭക്തജന അനുഗ്രഹം'] : ['Skanda Purana Parayanam', 'Sacred Homam', 'Devotee Blessings']
        },
        {
            id: 3,
            name: t('festivals_page.list.thaipusam.name'),
            date: t('festivals_page.list.thaipusam.date'),
            tag: isML ? 'മഹാ കാവടിയാട്ട മഹോത്സവം' : 'Grand Annual Festival',
            description: t('festivals_page.list.thaipusam.desc'),
            image: '/images/festivals/thaipusam.jpg',
            icon: <Star size={24} />,
            highlights: isML ? ['കാവടി ഘോഷയാത്ര', 'പാലഭിഷേകം', 'മഹാ അന്നദാനം'] : ['Kavadi Procession', 'Palabhishekam', 'Grand Annadanam']
        },
        {
            id: 4,
            name: t('festivals_page.list.skanda.name'),
            date: t('festivals_page.list.skanda.date'),
            tag: isML ? 'ശൂരസംഹാരവും വ്രതാനുഷ്ഠാനങ്ങളും' : '6 Sacred Days of Soorasamharam',
            description: t('festivals_page.list.skanda.desc'),
            image: '/images/festivals/skanda_sashti.jpg',
            icon: <Sparkles size={24} />,
            highlights: isML ? ['ശൂരസംഹാരം', 'സുബ്രഹ്മണ്യ പൂജ', 'ഷഷ്ഠി വ്രതം'] : ['Soorasamharam Ritual', 'Special Subramanya Pooja', 'Fasting & Vows']
        },
        {
            id: 5,
            name: t('festivals_page.list.vishu.name'),
            date: t('festivals_page.list.vishu.date'),
            tag: isML ? 'ഐശ്വര്യപൂർണ്ണമായ പുതുവർഷ പ്രഭാതം' : 'Kerala New Year & Auspicious Dawn',
            description: t('festivals_page.list.vishu.desc'),
            image: '/images/festivals/vishu.jpg',
            icon: <Calendar size={24} />,
            highlights: isML ? ['വിഷുക്കണി ദർശനം', 'വിഷുക്കൈനീട്ടം', 'വിശേഷാൽ നിർമ്മാല്യം'] : ['Vishukkani Darshan', 'Vishukkaineettam', 'Special Nirmalyam']
        },
        {
            id: 6,
            name: t('festivals_page.list.thrikarthika.name'),
            date: t('festivals_page.list.thrikarthika.date'),
            tag: isML ? 'ദീപോത്സവം' : 'The Festival of Lights',
            description: t('festivals_page.list.thrikarthika.desc'),
            image: '/images/festivals/thrikarthika.jpg',
            icon: <Sparkles size={24} />,
            highlights: isML ? ['ചുറ്റുവിളക്ക് തെളിക്കൽ', 'കാർത്തിക ദീപം', 'ഭഗവതി ദർശനം'] : ['Chuttuvilakku Lighting', 'Karthika Deepam', 'Bhagavathy Darshan']
        }
    ];

    return (
        <div className={`festivals-page ${isML ? 'lang-ml' : ''}`}>
            <SEO 
                title={t('festivals_page.title')} 
                description="Experience the vibrant and spiritual festivals at Thurayilkunnu Sree Subramanya Swami Temple."
            />
            {/* ---- LUXURY INNER PAGE HERO ---- */}
            <PageHero
                title={t('festivals_page.title')}
                subtitle={t('festivals_page.intro')}
                badge="Divine Celebrations"
                bgImage="/images/banners/banner_festivals.jpg"
                currentPage={t('festivals_page.title')}
            />

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
                                            <span>{isML ? 'ഉത്സവ ദർശന സമയം' : 'Festival Darshan Timings'}</span>
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
                            <h4>{isML ? 'ക്ഷേത്ര ദർശനം ആസൂത്രണം ചെയ്യുകയാണോ?' : 'Planning a Temple Visit?'}</h4>
                            <p>{isML ? 'ഉത്സവ സമയക്രമങ്ങൾക്കും വിശേഷാൽ വഴിപാട് ബുക്കിംഗിനുമായി ക്ഷേത്ര ഓഫീസുമായി ബന്ധപ്പെടുക.' : 'Contact the temple office for festival mahotsavam schedules and special vazhipadu reservations.'}</p>
                        </div>
                    </div>
                    <motion.a
                        href="/contact"
                        className="strip-btn"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span>{isML ? 'ക്ഷേത്ര ഓഫീസുമായി ബന്ധപ്പെടുക' : 'Contact Temple Office'}</span>
                        <ChevronRight size={16} />
                    </motion.a>
                </div>
            </motion.div>
        </div>
    );
};

export default Festivals;
