import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calendar, Star, Sparkles, ChevronRight, Clock, Flame, Bell, Eye, ExternalLink, X, Phone, Heart, ShieldCheck } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import '../styles/Festivals.css';

/* ---- ANIMATION VARIANTS ---- */
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
};

const cardVariant = {
    hidden: { opacity: 0, y: 35, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const inViewProps = (margin = '-60px') => ({
    initial: 'hidden',
    whileInView: 'show',
    viewport: { once: true, margin }
});

const Festivals = () => {
    const { t, i18n } = useTranslation();
    const isML = i18n.language?.startsWith('ml');
    const [activePosterModal, setActivePosterModal] = useState(null);

    const festivalsData = [
        {
            id: 1,
            name: isML ? 'ഉത്രട്ടാതി തിരുമഹോത്സവം' : 'Annual Uthrattathi Mahotsavam',
            date: isML ? 'കുംഭം (ഫെബ്രുവരി - മാർച്ച്)' : 'Kumbham (February – March)',
            tag: isML ? 'പ്രധാന വാർഷിക തിരുമഹോത്സവം ✦ തുറയിൽക്കുന്ന് പൊങ്കാല' : 'Grand Annual Festival ✦ Thurayilkunnu Pongala',
            description: isML
                ? 'തുറയിൽക്കുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രത്തിലെ 10 ദിവസം നീണ്ടുനിൽക്കുന്ന ഉത്രട്ടാതി തിരുമഹോത്സവം. തൃക്കൊടിയേറ്റ്, തങ്കഅങ്കി-തങ്കവേൽ രഥഘോഷയാത്രകൾ, കഥകളി, കാവടി അഭിഷേകം, തുറയിൽക്കുന്ന് പൊങ്കാല, പള്ളിവേട്ട, പഞ്ചവാദ്യം, ഗംഭീര പകൽക്കാഴ്ച, തിരുആറാട്ട് എന്നിവയോടെ ഭക്തിസാന്ദ്രമായി കൊണ്ടാടുന്നു.'
                : 'The 10-day grand annual Uthrattathi festival celebrated with Kodiyettu, Thanka Anki & Thanka Vel Ratha Ghoshayathra, Kathakali, Kavadi Abhishekam, Thurayilkunnu Pongala, Pallivetta, Panchavadyam, Pakalkkazhcha, and Arattu.',
            image: '/images/festivals/thurayilkunnu_pongala_wide.jpg',
            icon: <Bell size={24} />,
            highlights: isML 
                ? ['തൃക്കൊടിയേറ്റ്', 'തങ്കഅങ്കി രഥഘോഷയാത്ര', 'തുറയിൽക്കുന്ന് പൊങ്കാല', 'മേജർസെറ്റ് കഥകളി', 'സ്കന്ദകാവടി അഭിഷേകം', 'തിരുആറാട്ട്'] 
                : ['Kodiyettu', 'Thanka Anki Procession', 'Thurayilkunnu Pongala', 'Major Set Kathakali', 'Skanda Kavadi', 'Thiru Aarattu']
        },
        {
            id: 2,
            name: t('festivals_page.list.skanda_purana_yajnam.name'),
            date: t('festivals_page.list.skanda_purana_yajnam.date'),
            tag: isML ? 'പുണ്യ പുരാണ പാരായണവും യജ്ഞവും' : 'Sacred Fire Ritual & Purana Parayanam',
            description: t('festivals_page.list.skanda_purana_yajnam.desc'),
            image: '/images/gallery/festival_devotees_1.jpg',
            icon: <Flame size={24} />,
            highlights: isML ? ['സ്കന്ദപുരാണ പാരായണം', 'പുണ്യ ഹോമം', 'ഭക്തജന അനുഗ്രഹം'] : ['Skanda Purana Parayanam', 'Sacred Homam', 'Devotee Blessings']
        },
        {
            id: 3,
            name: t('festivals_page.list.thaipusam.name'),
            date: t('festivals_page.list.thaipusam.date'),
            tag: isML ? 'മഹാ കാവടിയാട്ട മഹോത്സവം' : 'Grand Annual Festival',
            description: t('festivals_page.list.thaipusam.desc'),
            image: '/images/gallery/deity_procession_1.jpg',
            icon: <Star size={24} />,
            highlights: isML ? ['കാവടി ഘോഷയാത്ര', 'പാലഭിഷേകം', 'മഹാ അന്നദാനം'] : ['Kavadi Procession', 'Palabhishekam', 'Grand Annadanam']
        },
        {
            id: 4,
            name: t('festivals_page.list.skanda.name'),
            date: t('festivals_page.list.skanda.date'),
            tag: isML ? 'ശൂരസംഹാരവും വ്രതാനുഷ്ഠാനങ്ങളും' : '6 Sacred Days of Soorasamharam',
            description: t('festivals_page.list.skanda.desc'),
            image: '/images/gallery/festival_gathering_1.jpg',
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

    const mahotsavamHighlights = [
        { icon: '🚩', ml: 'തൃക്കൊടിയേറ്റ്', en: 'Thrikkodiyettu (Sacred Flag Hoisting)' },
        { icon: '✨', ml: 'തങ്കഅങ്കി രഥഘോഷയാത്ര', en: 'Thanka Anki Chariot Procession' },
        { icon: '🎭', ml: 'മേജർസെറ്റ് കഥകളി', en: 'Major-Set Kathakali Performance' },
        { icon: '🔱', ml: 'തങ്കവേൽ രഥഘോഷയാത്ര', en: 'Thanka Vel Chariot Procession' },
        { icon: '🦚', ml: 'കാവടി അഭിഷേകം', en: 'Kavadi Abhishekam' },
        { icon: '🍛', ml: 'കൺണിസദ്യ, കലാപരിപാടികൾ', en: 'Kannisadya & Cultural Programs' },
        { icon: '🥁', ml: 'സേവ, പള്ളിവേട്ട, പഞ്ചവാദ്യം', en: 'Seva, Pallivetta & Panchavadyam' },
        { icon: '🐘', ml: 'ഗംഭീര പകൽക്കാഴ്ച', en: 'Grand Daytime Pageantry (Pakalkkazhcha)' },
        { icon: '🌊', ml: 'തിരുആറാട്ട്, തൃക്കൊടിയിറക്ക്', en: 'Holy Thiru Aarattu & Flag Lowering' }
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

            {/* ---- TEMPLE SPIRITUAL AUTHORITIES ---- */}
            <section className="temple-authorities-section" style={{ padding: '2rem 0', background: 'rgba(20, 16, 13, 0.6)', borderBottom: '1px solid rgba(217, 119, 6, 0.2)' }}>
                <div className="container">
                    <div className="authorities-heading-row" style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                        <span style={{ color: '#FCD34D', fontSize: '0.78rem', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>
                            {isML ? 'ആത്മീയ നേതൃത്വം' : 'Spiritual Leadership'}
                        </span>
                        <h3 style={{ color: '#FFFFFF', fontSize: '1.25rem', margin: '4px 0 0' }}>
                            {isML ? 'ക്ഷേത്രം തന്ത്രിയും മേൽശാന്തിയും' : 'Temple Thantri & Melshanthi'}
                        </h3>
                    </div>
                    <div className="spotlight-authorities-strip" style={{ justifyContent: 'center', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <div className="authority-chip">
                            <img src="/images/committee/tantri.jpg" alt="Thantri" className="authority-thumb" />
                            <div>
                                <span className="authority-role">{isML ? 'ക്ഷേത്രം തന്ത്രി' : 'Temple Thantri'}</span>
                                <strong className="authority-name">{isML ? 'ബ്രഹ്മശ്രീ വി.പി. ഉണ്ണികൃഷ്ണൻ' : 'Brahmasree V.P. Unnikrishnan'}</strong>
                            </div>
                        </div>
                        <div className="authority-chip">
                            <img src="/images/committee/melshanthi.jpg" alt="Melshanthi" className="authority-thumb" />
                            <div>
                                <span className="authority-role">{isML ? 'ക്ഷേത്രം മേൽശാന്തി' : 'Temple Melshanthi'}</span>
                                <strong className="authority-name">{isML ? 'ശ്രീ അനിൽ ഗോകുലം ശാന്തി' : 'Sri Anil Gokulam Shanthi'}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---- OTHER FESTIVALS TIMELINE/GRID ---- */}
            <section className="festivals-container section-padding">
                <div className="container">
                    <div className="section-head text-center" style={{ marginBottom: '3rem' }}>
                        <span className="section-label" style={{ justifyContent: 'center' }}>
                            <Calendar size={18} />
                            <span>{isML ? 'വാർഷിക ഉത്സവ കലണ്ടർ' : 'Annual Festival Calendar'}</span>
                        </span>
                        <h2 className="heading-secondary">
                            {isML ? 'തുറയിൽക്കുന്ന് ക്ഷേത്രത്തിലെ പ്രധാന ഉത്സവങ്ങൾ' : 'Sacred Festivals at Thurayilkunnu'}
                        </h2>
                    </div>

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
                                whileHover={{ y: -8, scale: 1.015 }}
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
                                    <h3 className="card-title">{festival.name}</h3>
                                    <p className="card-description">{festival.description}</p>
                                    
                                    <div className="festival-highlights">
                                        {festival.highlights.map((item, idx) => (
                                            <span key={idx} className="highlight-pill">
                                                ✦ {item}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="card-footer">
                                        <Link to="/offerings" className="learn-more">
                                            <span>{isML ? 'വിശേഷാൽ വഴിപാടുകൾ' : 'Special Offerings'}</span>
                                            <ChevronRight size={16} />
                                        </Link>
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
                            <h4>{isML ? 'ഉത്സവ ദർശനം ആസൂത്രണം ചെയ്യുകയാണോ?' : 'Planning a Festival Visit?'}</h4>
                            <p>{isML ? 'ഉത്സവ സമയക്രമങ്ങൾക്കും പൊങ്കാല, പ്രത്യേക പൂജ ബുക്കിംഗിനുമായി ക്ഷേത്ര ഓഫീസുമായി ബന്ധപ്പെടുക.' : 'Contact the temple office for festival mahotsavam schedules, Pongala, and special vazhipadu reservations.'}</p>
                        </div>
                    </div>
                    <motion.a
                        href="tel:+917994342205"
                        className="strip-btn"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Phone size={16} />
                        <span>{isML ? '79943 42205 വിളിക്കുക' : 'Call 79943 42205'}</span>
                    </motion.a>
                </div>
            </motion.div>

            {/* ---- LIGHTBOX MODAL FOR OFFICIAL CIRCULARS ---- */}
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
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{ maxWidth: '640px' }}
                        >
                            <div className="poster-modal-header">
                                <div>
                                    <h3 className="poster-modal-title">
                                        {isML ? 'ഉത്രട്ടാതി മഹോത്സവം 2026 — ഔദ്യോഗിക അറിയിപ്പ്' : 'Uthrattathi Mahotsavam 2026 — Official Circular'}
                                    </h3>
                                    <p className="poster-modal-sub">
                                        {isML ? 'തുറയിൽക്കുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം' : 'Thurayilkunnu Sree Subramanya Swami Temple'}
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
                                    alt="Official Mahotsavam Announcement" 
                                    className="poster-modal-img" 
                                    style={{ maxHeight: '72vh', width: 'auto', objectFit: 'contain', borderRadius: '12px' }}
                                />
                            </div>
                            <div className="poster-modal-footer">
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

export default Festivals;
