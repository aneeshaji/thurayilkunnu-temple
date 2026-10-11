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
            name: isML ? 'സ്കന്ദഷഷ്ടി മഹോത്സവം' : 'Skanda Shashti Mahotsavam',
            date: isML ? '2026 നവംബർ 15 ഞായറാഴ്ച (1202 തുലാം 29)' : '15 November 2026, Sunday (1202 Thulam 29)',
            tag: isML ? '✦ 2026 ലെ അടുത്ത പ്രധാന ഉത്സവം — നവംബർ 15' : '✦ Next Major Festival 2026 — 15 November',
            description: isML 
                ? 'തുറയിൽക്കുന്ന് ക്ഷേത്രത്തിലെ 2026 ലെ പ്രധാന ഉത്സവം. അന്നേ ദിവസം ഷഷ്ടി പൂജ, ക്ഷേത്രാലങ്കാരം, ചെണ്ടമേളം തുടങ്ങിയവ ഭഗവാന് നേർച്ചയായി സമർപ്പിക്കാം. ദേവസ്വം ഓഫീസ്: 9072722205.'
                : 'Major temple festival of 2026 at Thurayilkunnu. Devotees are invited to sponsor Shashti Pooja, Temple Illumination & Floral Decoration, and Chenda Melam. Office: 9072722205.',
            image: '/images/festivals/skanda_sashti_2026_poster.jpg',
            icon: <Sparkles size={24} />,
            highlights: isML ? ['ഷഷ്ടി പൂജ', 'ക്ഷേത്രാലങ്കാരം', 'ചെണ്ടമേളം സമർപ്പണം', 'വ്രതാനുഷ്ഠാനങ്ങൾ'] : ['Shashti Pooja', 'Temple Decoration', 'Chenda Melam', 'Fasting & Vows'],
            posterImage: '/images/festivals/skanda_sashti_2026_poster.jpg'
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

    /* ---- SHASTI DAYS 2026 ----
     * `major: true` highlights 15 November (Skanda Sasthi), the year's major festival.
     */
    const shastiDays2026 = [
        { month: 'January', monthMl: 'ജനുവരി', day: '24', weekday: 'Saturday', weekdayMl: 'ശനി' },
        { month: 'February', monthMl: 'ഫെബ്രുവരി', day: '23', weekday: 'Monday', weekdayMl: 'തിങ്കൾ' },
        { month: 'March', monthMl: 'മാർച്ച്', day: '24', weekday: 'Tuesday', weekdayMl: 'ചൊവ്വ' },
        { month: 'April', monthMl: 'ഏപ്രിൽ', day: '22', weekday: 'Wednesday', weekdayMl: 'ബുധൻ' },
        { month: 'May', monthMl: 'മെയ്', day: '21', weekday: 'Thursday', weekdayMl: 'വ്യാഴം' },
        { month: 'June', monthMl: 'ജൂൺ', day: '20', weekday: 'Saturday', weekdayMl: 'ശനി' },
        { month: 'July', monthMl: 'ജൂലൈ', day: '19', weekday: 'Sunday', weekdayMl: 'ഞായർ' },
        { month: 'August', monthMl: 'ആഗസ്റ്റ്', day: '18', weekday: 'Tuesday', weekdayMl: 'ചൊവ്വ' },
        { month: 'September', monthMl: 'സെപ്റ്റംബർ', day: '17', weekday: 'Thursday', weekdayMl: 'വ്യാഴം' },
        { month: 'October', monthMl: 'ഒക്ടോബർ', day: '16', weekday: 'Friday', weekdayMl: 'വെള്ളി' },
        {
            month: 'November',
            monthMl: 'നവംബർ',
            day: '15',
            weekday: 'Sunday',
            weekdayMl: 'ഞായർ',
            major: true,
            noteEn: 'Skanda Sasthi — Major Festival',
            noteMl: 'സ്കന്ദ ഷഷ്ഠി — പ്രധാന ഉത്സവം'
        },
        { month: 'December', monthMl: 'ഡിസംബർ', day: '15', weekday: 'Tuesday', weekdayMl: 'ചൊവ്വ' }
    ];

    return (
        <div className={`festivals-page ${isML ? 'lang-ml' : ''}`}>
            <SEO 
                title={t('festivals_page.title')} 
                description="Experience the vibrant and spiritual festivals at Thurayilkunnu Sree Subrahmanya Swami Temple."
                url="/festivals"
            />
            {/* ---- LUXURY INNER PAGE HERO ---- */}
            <PageHero
                title={t('festivals_page.title')}
                subtitle={t('festivals_page.intro')}
                badge="Divine Celebrations"
                bgImage="/images/banners/banner_festivals.jpg"
                currentPage={t('navbar.festivals')}
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

            {/* ---- 2026 NEXT MAJOR FESTIVAL SPOTLIGHT (SKANDA SHASHTI MAHOTSAVAM) ---- */}
            <section className="mahotsavam-spotlight-section">
                <div className="container">
                    <motion.div 
                        className="mahotsavam-spotlight-card"
                        {...inViewProps()}
                        variants={cardVariant}
                    >
                        <div className="spotlight-top-badge-row">
                            <span className="spotlight-gold-badge">
                                <Sparkles size={14} />
                                <span>{isML ? '2026 ലെ അടുത്ത മഹാ ഉത്സവം' : 'Next Major Festival 2026'}</span>
                            </span>
                            <span className="spotlight-dates-badge">
                                <Calendar size={14} />
                                <span>{isML ? '2026 നവംബർ 15 ഞായറാഴ്ച (1202 തുലാം 29)' : '15 November 2026, Sunday (1202 Thulam 29)'}</span>
                            </span>
                        </div>

                        <div className="spotlight-grid">
                            <div className="spotlight-info-col">
                                <span className="spotlight-subtitle">
                                    {isML ? 'ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം തുറയിൽകുന്ന്' : 'Thurayilkunnu Sree Subrahmanya Swami Temple'}
                                </span>
                                <h2 className="spotlight-title">
                                    {isML ? 'സ്കന്ദഷഷ്ടി മഹോത്സവം' : 'Skanda Shashti Mahotsavam'}
                                </h2>
                                <p className="spotlight-address">
                                    {isML ? 'കരുനാഗപ്പള്ളി, കൊല്ലം • ക്ഷേത്ര ഓഫീസ്: 9072722205' : 'Karunagappally, Kollam • Temple Office: 9072722205'}
                                </p>

                                <div className="pongala-highlight-box" style={{ background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.28) 0%, rgba(180, 83, 9, 0.16) 100%)', borderColor: '#FCD34D' }}>
                                    <div className="pongala-badge" style={{ background: '#D97706' }}>
                                        <Flame size={13} />
                                        <span>{isML ? 'വിശേഷാൽ നേർച്ച സമർപ്പണങ്ങൾ' : 'Special Offerings Dedication'}</span>
                                    </div>
                                    <p style={{ color: '#FFFFFF', margin: '10px 0 0', lineHeight: 1.65, fontSize: '0.92rem' }}>
                                        {isML 
                                            ? 'അന്നേ ദിവസം ഷഷ്ടി പൂജ, ക്ഷേത്രാലങ്കാരം, ചെണ്ടമേളം തുടങ്ങിയവ ഭഗവാന് നേർച്ചയായി സമർപ്പിക്കുവാൻ ആഗ്രഹിക്കുന്ന ഭക്തജനങ്ങൾ എത്രയും വേഗം ദേവസ്വം ഓഫീസുമായോ താഴെക്കാണുന്ന നമ്പരിലോ ബന്ധപ്പെടുക.'
                                            : 'Devotees wishing to offer Shashti Pooja, Kshethralankaram (Temple Floral & Illumination Decor), Chenda Melam, etc. are requested to contact the Devaswom Office immediately.'}
                                    </p>
                                </div>

                                <div className="spotlight-actions">
                                    <a href="tel:+919072722205" className="spotlight-action-btn primary">
                                        <Phone size={15} />
                                        <span>{isML ? 'വിളിക്കുക: 9072722205' : 'Call Devaswom: 9072722205'}</span>
                                    </a>
                                    <button 
                                        type="button" 
                                        className="spotlight-action-btn secondary"
                                        onClick={() => setActivePosterModal('/images/festivals/skanda_sashti_2026_poster.jpg')}
                                    >
                                        <Eye size={15} />
                                        <span>{isML ? 'ഔദ്യോഗിക നോട്ടീസ് കാണുക' : 'View Official Circular'}</span>
                                    </button>
                                    <Link to="/offerings" className="spotlight-action-btn gold-link">
                                        <Heart size={15} />
                                        <span>{isML ? 'വഴിപാടുകൾ' : 'Offerings'}</span>
                                    </Link>
                                </div>
                            </div>

                            <div 
                                className="spotlight-poster-frame" 
                                onClick={() => setActivePosterModal('/images/festivals/skanda_sashti_2026_poster.jpg')}
                                role="button"
                                tabIndex={0}
                                title={isML ? 'പോസ്റ്റർ വലുതാക്കി കാണാൻ ക്ലിക്ക് ചെയ്യുക' : 'Click to view full poster'}
                            >
                                <img 
                                    src="/images/festivals/skanda_sashti_2026_poster.jpg" 
                                    alt="Skanda Shashti Mahotsavam Poster" 
                                    className="spotlight-poster-img" 
                                    style={{ width: '100%', height: 'auto', maxHeight: '480px', objectFit: 'cover' }}
                                />
                                <div className="spotlight-zoom-hint">
                                    <Eye size={13} />
                                    <span>{isML ? 'പോസ്റ്റർ വലുതാക്കി കാണുക' : 'Click to View Full Poster'}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
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

                                    <div className="card-footer" style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                                        {festival.posterImage && (
                                            <button 
                                                type="button" 
                                                className="learn-more"
                                                onClick={() => setActivePosterModal(festival.posterImage)}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                            >
                                                <Eye size={15} />
                                                <span>{isML ? 'അറിയിപ്പ് കാണുക' : 'View Circular'}</span>
                                            </button>
                                        )}
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

            {/* ---- SHASTI DAYS 2026 CALENDAR ---- */}
            <section className="festivals-container section-padding shasti-section">
                <div className="container">
                    <div className="section-head text-center" style={{ marginBottom: '3rem' }}>
                        <span className="section-label" style={{ justifyContent: 'center' }}>
                            <Calendar size={18} />
                            <span>{isML ? '2026 ശഷ്ഠി ദിവസങ്ങൾ' : 'Shasti Days 2026'}</span>
                        </span>
                        <h2 className="heading-secondary">
                            {isML ? 'ശ്രീ സുബ്രഹ്മണ്യ ഷഷ്ഠി പൂജാ ദിവസങ്ങൾ' : 'Subrahmanya Sashti Pooja Days'}
                        </h2>
                        <p className="shasti-intro">
                            {isML
                                ? '2026 ലെ ശ്രീ സുബ്രഹ്മണ്യ സ്വാമിക്കുള്ള ശഷ്ഠി ദിവസങ്ങൾ. നവംബർ 15, ഞായർ — സ്കന്ദ ഷഷ്ഠി ആണ് ആസംവർഷത്തിലെ പ്രധാന ഉത്സവം.'
                                : 'All Shasti days for Sri Subrahmanya Swami in 2026. November 15, Sunday — Skanda Sasthi is the major festival of the year.'}
                        </p>
                    </div>

                    <motion.ul
                        className="shasti-grid"
                        variants={stagger}
                        {...inViewProps()}
                    >
                        {shastiDays2026.map((d) => (
                            <motion.li
                                key={`${d.month}-${d.day}`}
                                className={`shasti-item ${d.major ? 'shasti-major' : ''}`}
                                variants={cardVariant}
                                whileHover={{ y: -6, scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <span className="shasti-day">
                                    {d.day}
                                </span>
                                <span className="shasti-month">
                                    {isML ? d.monthMl : d.month}
                                </span>
                                <span className="shasti-weekday">
                                    {isML ? d.weekdayMl : d.weekday}
                                </span>
                                {d.major && (
                                    <span className="shasti-badge">
                                        <Star size={13} />
                                        {isML ? d.noteMl : d.noteEn}
                                    </span>
                                )}
                            </motion.li>
                        ))}
                    </motion.ul>

                    <p className="shasti-footnote">
                        {isML
                            ? 'ദിവസങ്ങൾ ക്ഷേത്ര ഓഫീസിന്റെ ഔദ്യോഗിക കലണ്ടരനുസരിച്ചാണ്. പൂജാ സമയവും ചടങ്ങുകൾക്കും മാറ്റാവുന്നതാണെങ്കിൽ ഓഫീസിനെ ബന്ധപ്പെടുക.'
                            : 'Dates follow the official temple office calendar. Timings and rituals may be adjusted — please confirm with the temple office.'}
                    </p>
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
