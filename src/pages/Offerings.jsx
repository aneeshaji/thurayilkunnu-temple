import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Heart, CreditCard, Clock, Info, ChevronRight, Tag, Flame, CheckCircle, CheckCircle2, X, MessageCircle, Calendar, User, Star, AlertCircle, Printer } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import NakshatraRecommender from '../components/NakshatraRecommender';
import { NAKSHATRAS } from '../utils/nakshatras';
import '../styles/Offerings.css';

/* ---- ANIMATION VARIANTS ---- */
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

const cardVariant = {
    hidden: { opacity: 0, y: 35, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }
};

const inViewProps = (margin = '-60px') => ({
    initial: 'hidden',
    whileInView: 'show',
    viewport: { once: true, margin }
});

const Offerings = () => {
    const { t, i18n } = useTranslation();
    const isML = i18n.language === 'ml';
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedOffering, setSelectedOffering] = useState(null);
    const [bookingReceipt, setBookingReceipt] = useState(null);

    // Devotee Booking Details
    const [devoteeName, setDevoteeName] = useState('');
    const [devoteeStar, setDevoteeStar] = useState('');
    const [poojaDate, setPoojaDate] = useState('');
    const [gotram, setGotram] = useState('');
    const [phone, setPhone] = useState('');
    const [prasadamMode, setPrasadamMode] = useState('counter');
    const [formError, setFormError] = useState('');

    const offeringsData = [
        { id: 1, category: 'daily', name: t('offerings_page.list.pushpanjali.name'), price: '₹20', description: t('offerings_page.list.pushpanjali.desc'), icon: <Heart size={20} />, image: '/images/offerings/archana_pushpanjali.jpg', benefit: 'Daily peace, health, and family prosperity', benefitMl: 'മനസ്സമാധാനം, ആരോഗ്യം, കുടുംബ ഐശ്വര്യം' },
        { id: 2, category: 'special', name: t('offerings_page.list.muttarukkal.name'), price: '₹30', description: t('offerings_page.list.muttarukkal.desc'), icon: <Sparkles size={20} />, image: '/images/offerings/ganapathy_homam.jpg', benefit: 'Removal of astrological obstacles and evil eye', benefitMl: 'ദൃഷ്ടിദോഷ നിവാരണം, ഗ്രഹപ്പിഴ തടസ്സങ്ങൾ നീങ്ങൽ' },
        { id: 3, category: 'prasadam', name: t('offerings_page.list.payasam.name'), price: '₹150', description: t('offerings_page.list.payasam.desc'), icon: <Tag size={20} />, image: '/images/offerings/archana_pushpanjali.jpg', benefit: 'Sacred sweet nectar offered for thanksgiving', benefitMl: 'കാര്യസിദ്ധി, ആഗ്രഹസാഫല്യം, മംഗളാനുഭവങ്ങൾ' },
        { id: 4, category: 'homam', name: t('offerings_page.list.homam.name'), price: '₹350', description: t('offerings_page.list.homam.desc'), icon: <Flame size={20} />, image: '/images/offerings/ganapathy_homam.jpg', benefit: 'Auspicious fire ritual invoking Lord Ganesha', benefitMl: 'വിഘ്നനിവാരണം, സർവ്വകാര്യ വിജയം, ഗൃഹൈശ്വര്യം' },
        { id: 5, category: 'special', name: t('offerings_page.list.shatrusamhara.name'), price: '₹50', description: t('offerings_page.list.shatrusamhara.desc'), icon: <Heart size={20} />, image: '/images/offerings/palabhishekam.jpg', benefit: 'Protection against negative forces and fear', benefitMl: 'ശത്രുദോഷ ശമനം, ഭയനിവാരണം, ദുരിതമുക്തി' },
        { id: 6, category: 'special', name: t('offerings_page.list.thulabharam.name'), price: 'Variable', priceMl: 'നിശ്ചയിച്ച നിരക്കിൽ', description: t('offerings_page.list.thulabharam.desc'), icon: <CreditCard size={20} />, image: '/images/offerings/thulabharam.jpg', benefit: 'Sacred weight offering in fulfilment of vows', benefitMl: 'നേർച്ച പൂർത്തീകരണം, ആയുരാരോഗ്യ സൗഖ്യം' },
        { id: 7, category: 'prasadam', name: t('offerings_page.list.panchamrutham.name'), price: '₹100', description: t('offerings_page.list.panchamrutham.desc'), icon: <Tag size={20} />, image: '/images/offerings/palabhishekam.jpg', benefit: 'Divine 5-ingredient fruit offering for good health', benefitMl: 'ഉദരരോഗ ശമനം, ശാരീരിക സൗഖ്യം, ആയുർവർദ്ധന' },
        { id: 8, category: 'abhishekam', name: t('offerings_page.list.bhasmabhishekam.name'), price: '₹50', description: t('offerings_page.list.bhasmabhishekam.desc'), icon: <Sparkles size={20} />, image: '/images/offerings/palabhishekam.jpg', benefit: 'Sacred ash shower on the sanctum idol', benefitMl: 'പാപമോചനം, ആത്മീയ ശുദ്ധി, ഭക്തിവർദ്ധന' },
        { id: 9, category: 'abhishekam', name: t('offerings_page.list.palabhishekam.name'), price: '₹50', description: t('offerings_page.list.palabhishekam.desc'), icon: <Sparkles size={20} />, image: '/images/offerings/palabhishekam.jpg', benefit: 'Pure milk bath cleansing the soul and mind', benefitMl: 'മാനസിക ശാന്തി, സർവ്വദോഷ ശമനം, ഐശ്വര്യം' },
        { id: 10, category: 'special', name: t('offerings_page.list.chuttuvilakku.name'), price: '₹500', description: t('offerings_page.list.chuttuvilakku.desc'), icon: <Sparkles size={20} />, image: '/images/offerings/archana_pushpanjali.jpg', benefit: 'Lighting up hundreds of oil lamps around the temple', benefitMl: 'കുടുംബ ഐശ്വര്യം, അന്ധകാര നിവാരണം, പ്രകാശമയ ജീവിതം' },
        { id: 11, category: 'daily', name: t('offerings_page.list.vidyarambham.name'), price: '₹200', description: t('offerings_page.list.vidyarambham.desc'), icon: <Heart size={20} />, image: '/images/offerings/archana_pushpanjali.jpg', benefit: 'Blessings for children education and intellect', benefitMl: 'വിദ്യാഭിവൃദ്ധി, ബുദ്ധിശക്തി, ഏകാഗ്രത' },
        { id: 12, category: 'special', name: t('offerings_page.list.annadanam.name'), price: '₹1000+', description: t('offerings_page.list.annadanam.desc'), icon: <Heart size={20} />, image: '/images/offerings/ganapathy_homam.jpg', benefit: 'Feeding hundreds of devotees — highest charity', benefitMl: 'മഹാപുണ്യം, അന്നദാതാവിന് സർവ്വസമൃദ്ധി' }
    ];

    const categories = [
        { key: 'all', label: 'All Offerings', labelMl: 'എല്ലാ വഴിപാടുകളും' },
        { key: 'daily', label: 'Daily Poojas', labelMl: 'നിത്യ പൂജകൾ' },
        { key: 'abhishekam', label: 'Abhishekam', labelMl: 'അഭിഷേകങ്ങൾ' },
        { key: 'homam', label: 'Homam & Fire', labelMl: 'ഹോമങ്ങൾ' },
        { key: 'special', label: 'Special Vows', labelMl: 'പ്രത്യേക നേർച്ചകൾ' }
    ];

    const filteredOfferings = activeFilter === 'all'
        ? offeringsData
        : offeringsData.filter(o => o.category === activeFilter);

    const handleOpenOffering = (offering) => {
        setSelectedOffering(offering);
        setDevoteeName('');
        setDevoteeStar('');
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setPoojaDate(tomorrow.toISOString().split('T')[0]);
        setGotram('');
        setPhone('');
        setPrasadamMode('counter');
        setFormError('');
        setBookingReceipt(null);
    };

    const handleSelectFromNakshatra = (offeringId, starId) => {
        const found = offeringsData.find(o => o.id === offeringId) || offeringsData[0];
        setSelectedOffering(found);
        setDevoteeName('');
        setDevoteeStar(starId);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setPoojaDate(tomorrow.toISOString().split('T')[0]);
        setGotram('');
        setPhone('');
        setPrasadamMode('counter');
        setFormError('');
        setBookingReceipt(null);
    };

    // Close modal on escape key
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSelectedOffering(null);
                setBookingReceipt(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleConfirmBooking = (e) => {
        if (e) e.preventDefault();
        if (!devoteeName.trim() || !devoteeStar || !poojaDate) {
            setFormError(t('vazhipadu_booking.validation_alert'));
            return;
        }
        setFormError('');

        const starObj = NAKSHATRAS.find(s => s.id === devoteeStar);
        const starText = starObj ? `${starObj.en} (${starObj.ml})` : devoteeStar;
        const phoneNumber = "+917994342205";
        const prasadamText = prasadamMode === 'postal' ? t('vazhipadu_booking.mode_postal') : t('vazhipadu_booking.mode_counter');

        const tokenNum = `TK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        setBookingReceipt({
            token: tokenNum,
            offeringName: selectedOffering.name,
            offeringPrice: selectedOffering.price,
            devoteeName: devoteeName.trim(),
            starText,
            poojaDate,
            gotram: gotram.trim() || (isML ? 'രേഖപ്പെടുത്തിയിട്ടില്ല' : 'Not specified'),
            phone: phone.trim() || (isML ? 'നൽകിയിട്ടില്ല' : 'Not provided'),
            prasadamMode,
            prasadamText,
            timestamp: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
        });

        const effectivePrice = (isML && selectedOffering.priceMl) ? selectedOffering.priceMl : selectedOffering.price;

        const message = isML ? `സ്വാമി ശരണം 🙏
തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രത്തിൽ താഴെ പറയുന്ന വഴിപാട് ബുക്ക് ചെയ്യാൻ ആഗ്രഹിക്കുന്നു:

• *ടോക്കൺ നമ്പർ:* #${tokenNum}
• *വഴിപാട്:* ${selectedOffering.name}
• *തുക:* ${effectivePrice}
• *ഭക്തന്റെ പേര്:* ${devoteeName.trim()}
• *ജന്മനക്ഷത്രം:* ${starText}
• *പൂജാ തീയതി:* ${poojaDate}
• *ഗോത്രം / വീട്ടുപേര്:* ${gotram.trim() || 'രേഖപ്പെടുത്തിയിട്ടില്ല'}
• *ഫോൺ നമ്പർ:* ${phone.trim() || 'നൽകിയിട്ടില്ല'}
• *പ്രസാദ വിതരണം:* ${prasadamText}

ദയവായി ബുക്കിംഗ് സ്ഥിരീകരിക്കുവാൻ അഭ്യർത്ഥിക്കുന്നു. നന്ദി!`
        : `Swami Saranam 🙏
I would like to book the following Vazhipadu at Thurayilkunnu Sree Subramanya Swami Temple:

• *Token Reference:* #${tokenNum}
• *Offering:* ${selectedOffering.name}
• *Price:* ${selectedOffering.price}
• *Devotee Name:* ${devoteeName.trim()}
• *Janma Nakshatram:* ${starText}
• *Pooja Date:* ${poojaDate}
• *Gotram / House:* ${gotram.trim() || 'Not specified'}
• *Phone Number:* ${phone.trim() || 'Not provided'}
• *Prasadam Delivery:* ${prasadamText}

Please confirm my booking. Thank you!`;

        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="offerings-page">
            <SEO 
                title={t('offerings_page.title')} 
                description={isML ? 'തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രത്തിലെ നിത്യപൂജകളും വിശേഷാൽ വഴിപാടുകളും ഓൺലൈനായി ബുക്ക് ചെയ്യാം.' : 'Book poojas, vazhipadu, and special offerings at Thurayilkunnu Sree Subramanya Swami Temple.'}
            />
            {/* ---- LUXURY INNER PAGE HERO ---- */}
            <PageHero
                title={t('offerings_page.title')}
                subtitle={t('offerings_page.intro')}
                badge={isML ? 'വിശുദ്ധ വഴിപാടുകൾ' : 'Sacred Offerings'}
                bgImage="/images/banners/banner_offerings.jpg"
                currentPage={t('offerings_page.title')}
            />

            {/* ---- NAKSHATRA (STAR) VAZHIPADU RECOMMENDER ---- */}
            <NakshatraRecommender onSelectOffering={handleSelectFromNakshatra} />

            {/* ---- FILTER BAR & OFFERINGS GRID ---- */}
            <section className="offerings-container section-padding">
                <div className="container">
                    {/* Category Filter Tabs */}
                    <div className="offerings-filter-tabs">
                        {categories.map((cat) => (
                            <button
                                key={cat.key}
                                className={`filter-tab-btn ${activeFilter === cat.key ? 'active' : ''}`}
                                onClick={() => setActiveFilter(cat.key)}
                            >
                                {isML ? (cat.labelMl || cat.label) : cat.label}
                                {activeFilter === cat.key && (
                                    <motion.div
                                        className="active-tab-glow"
                                        layoutId="activeFilterGlow"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Grid of offerings */}
                    <motion.div
                        className="offerings-grid"
                        variants={stagger}
                        initial="hidden"
                        animate="show"
                        key={activeFilter}
                    >
                        <AnimatePresence>
                            {filteredOfferings.map((offering) => (
                                <motion.div
                                    key={offering.id}
                                    className="offering-card shine-hover"
                                    variants={cardVariant}
                                    layout
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={() => handleOpenOffering(offering)}
                                >
                                    {offering.image && (
                                        <div className="offering-card-img-holder">
                                            <img src={offering.image} alt={offering.name} loading="lazy" />
                                        </div>
                                    )}
                                    <div className="card-top">
                                        <motion.div
                                            className="card-icon-circle"
                                            whileHover={{ rotate: 15, scale: 1.1 }}
                                        >
                                            {offering.icon}
                                        </motion.div>
                                        <span className="price-tag">{isML && offering.priceMl ? offering.priceMl : offering.price}</span>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="offering-name">{offering.name}</h3>
                                        <p className="offering-desc">{offering.description}</p>
                                    </div>
                                    <div className="card-action">
                                        <span>{isML ? 'വിവരങ്ങളും ബുക്കിംഗും' : 'Ritual & Booking Details'} <ChevronRight size={16} /></span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* ---- RICH DEVOTEE BOOKING MODAL & DIGITAL RECEIPT ---- */}
            <AnimatePresence>
                {selectedOffering && (
                    <motion.div
                        className="offering-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => {
                            setSelectedOffering(null);
                            setBookingReceipt(null);
                        }}
                    >
                        <motion.div
                            className="offering-modal-box devotee-booking-modal"
                            initial={{ scale: 0.9, y: 30, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 30, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="modal-close-btn"
                                onClick={() => {
                                    setSelectedOffering(null);
                                    setBookingReceipt(null);
                                }}
                                aria-label={isML ? "അടയ്ക്കുക" : "Close modal"}
                            >
                                <X size={22} />
                            </button>

                            {bookingReceipt ? (
                                /* ---- DIGITAL TOKEN RECEIPT VIEW ---- */
                                <div className="digital-receipt-view">
                                    <div className="receipt-success-badge">
                                        <CheckCircle2 size={24} className="receipt-check-icon" />
                                        <span>{isML ? 'വഴിപാട് ബുക്കിംഗ് ടോക്കൺ തയ്യാറായി' : 'Vazhipadu Booking Token Generated'}</span>
                                    </div>

                                    <div className="sacred-token-slip" id="sacred-vazhipadu-slip">
                                        <div className="slip-temple-heading">
                                            <div className="slip-om-symbol">ॐ</div>
                                            <h4>തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം</h4>
                                            <p>Thurayilkunnu Sree Subramanya Swami Temple, Karunagappally</p>
                                            <div className="slip-token-row">
                                                <span className="slip-token-label">{isML ? 'ടോക്കൺ നമ്പർ' : 'Token Reference No:'}</span>
                                                <span className="slip-token-number">#{bookingReceipt.token}</span>
                                            </div>
                                        </div>

                                        <div className="slip-details-grid">
                                            <div className="slip-item">
                                                <span className="slip-lbl">{isML ? 'വഴിപാട്' : 'Offering'}:</span>
                                                <strong className="slip-val highlight">{bookingReceipt.offeringName}</strong>
                                            </div>
                                            <div className="slip-item">
                                                <span className="slip-lbl">{isML ? 'തുക' : 'Offering Fee'}:</span>
                                                <strong className="slip-val">{bookingReceipt.offeringPrice}</strong>
                                            </div>
                                            <div className="slip-item">
                                                <span className="slip-lbl">{isML ? 'ഭക്തന്റെ പേര്' : 'Devotee Name'}:</span>
                                                <strong className="slip-val">{bookingReceipt.devoteeName}</strong>
                                            </div>
                                            <div className="slip-item">
                                                <span className="slip-lbl">{isML ? 'ജന്മനക്ഷത്രം' : 'Birth Star'}:</span>
                                                <strong className="slip-val">{bookingReceipt.starText}</strong>
                                            </div>
                                            <div className="slip-item">
                                                <span className="slip-lbl">{isML ? 'പൂജാ തീയതി' : 'Pooja Date'}:</span>
                                                <strong className="slip-val">{bookingReceipt.poojaDate}</strong>
                                            </div>
                                            <div className="slip-item">
                                                <span className="slip-lbl">{isML ? 'ഗോത്രം / വീട്' : 'Gotram'}:</span>
                                                <strong className="slip-val">{bookingReceipt.gotram}</strong>
                                            </div>
                                            <div className="slip-item full-width">
                                                <span className="slip-lbl">{isML ? 'പ്രസാദ വിതരണം' : 'Prasadam Mode'}:</span>
                                                <strong className="slip-val">{bookingReceipt.prasadamText}</strong>
                                            </div>
                                        </div>

                                        <div className="slip-footer-note">
                                            <Sparkles size={14} className="slip-sparkle" />
                                            <span>
                                                {isML
                                                    ? 'ക്ഷേത്ര കൗണ്ടറിൽ ഈ ടോക്കൺ നമ്പർ കാണിച്ച് പ്രസാദം കൈപ്പറ്റാവുന്നതാണ്. പ്രാർത്ഥനകൾ ഫലപ്രദമാകട്ടെ!'
                                                    : 'Present this digital token reference at the temple counter to collect your sacred prasadam.'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="receipt-actions">
                                        <button
                                            type="button"
                                            className="receipt-btn print-btn"
                                            onClick={() => window.print()}
                                        >
                                            <Printer size={16} />
                                            <span>{isML ? 'ടോക്കൺ പ്രിന്റ് / Save' : 'Print / Save Token'}</span>
                                        </button>
                                        <button
                                            type="button"
                                            className="receipt-btn done-btn"
                                            onClick={() => {
                                                setSelectedOffering(null);
                                                setBookingReceipt(null);
                                            }}
                                        >
                                            <span>{isML ? 'പൂർത്തിയായി (Done)' : 'Done & Close'}</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* ---- STANDARD BOOKING FORM VIEW ---- */
                                <>
                                    <div className="modal-header">
                                        <div className="modal-icon-halo">
                                            {selectedOffering.icon}
                                        </div>
                                        <div>
                                            <span className="modal-tag">{t('vazhipadu_booking.modal_title')}</span>
                                            <h2>{selectedOffering.name}</h2>
                                            <span className="modal-price">{selectedOffering.price}</span>
                                        </div>
                                    </div>

                                    <div className="modal-body">
                                        <div className="modal-benefit-box">
                                            <CheckCircle size={20} className="benefit-icon" />
                                            <div>
                                                <strong>{t('vazhipadu_booking.benefit')}</strong>
                                                <p>{isML && selectedOffering.benefitMl ? selectedOffering.benefitMl : selectedOffering.benefit}</p>
                                            </div>
                                        </div>

                                        {/* Devotee details form */}
                                        <form onSubmit={handleConfirmBooking} className="devotee-booking-form">
                                            {formError && (
                                                <div className="booking-error-badge">
                                                    <AlertCircle size={16} />
                                                    <span>{formError}</span>
                                                </div>
                                            )}

                                            <div className="modal-form-grid">
                                                <div className="modal-form-group">
                                                    <label htmlFor="devoteeName">
                                                        <User size={14} /> {t('vazhipadu_booking.devotee_name')} *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="devoteeName"
                                                        required
                                                        value={devoteeName}
                                                        onChange={(e) => setDevoteeName(e.target.value)}
                                                        placeholder={t('vazhipadu_booking.devotee_name_placeholder')}
                                                    />
                                                </div>

                                                <div className="modal-form-group">
                                                    <label htmlFor="devoteeStar">
                                                        <Star size={14} /> {t('vazhipadu_booking.nakshatram')} *
                                                    </label>
                                                    <select
                                                        id="devoteeStar"
                                                        required
                                                        value={devoteeStar}
                                                        onChange={(e) => setDevoteeStar(e.target.value)}
                                                    >
                                                        <option value="">-- {t('vazhipadu_booking.nakshatram_select')} --</option>
                                                        {NAKSHATRAS.map((s) => (
                                                            <option key={s.id} value={s.id}>
                                                                {isML ? `${s.ml} (${s.en})` : `${s.en} - ${s.ml}`}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="modal-form-group">
                                                    <label htmlFor="poojaDate">
                                                        <Calendar size={14} /> {t('vazhipadu_booking.pooja_date')} *
                                                    </label>
                                                    <input
                                                        type="date"
                                                        id="poojaDate"
                                                        required
                                                        min={new Date().toISOString().split('T')[0]}
                                                        value={poojaDate}
                                                        onChange={(e) => setPoojaDate(e.target.value)}
                                                    />
                                                </div>

                                                <div className="modal-form-group">
                                                    <label htmlFor="gotram">
                                                        {t('vazhipadu_booking.gotram')}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="gotram"
                                                        value={gotram}
                                                        onChange={(e) => setGotram(e.target.value)}
                                                        placeholder={t('vazhipadu_booking.gotram_placeholder')}
                                                    />
                                                </div>

                                                <div className="modal-form-group full-width">
                                                    <label htmlFor="phone">
                                                        {t('vazhipadu_booking.phone')}
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        placeholder={t('vazhipadu_booking.phone_placeholder')}
                                                    />
                                                </div>

                                                <div className="modal-form-group full-width">
                                                    <label>{t('vazhipadu_booking.prasadam_mode')}</label>
                                                    <div className="prasadam-mode-options">
                                                        <label className={`mode-card ${prasadamMode === 'counter' ? 'active' : ''}`}>
                                                            <input
                                                                type="radio"
                                                                name="prasadamMode"
                                                                value="counter"
                                                                checked={prasadamMode === 'counter'}
                                                                onChange={() => setPrasadamMode('counter')}
                                                            />
                                                            <span>{t('vazhipadu_booking.mode_counter')}</span>
                                                        </label>
                                                        <label className={`mode-card ${prasadamMode === 'postal' ? 'active' : ''}`}>
                                                            <input
                                                                type="radio"
                                                                name="prasadamMode"
                                                                value="postal"
                                                                checked={prasadamMode === 'postal'}
                                                                onChange={() => setPrasadamMode('postal')}
                                                            />
                                                            <span>{t('vazhipadu_booking.mode_postal')}</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="modal-timing-strip">
                                                <Clock size={16} />
                                                <span>{t('vazhipadu_booking.timing_note')}</span>
                                            </div>

                                            <div className="modal-footer">
                                                <button
                                                    type="submit"
                                                    className="modal-book-btn whatsapp-submit-btn"
                                                >
                                                    <MessageCircle size={18} />
                                                    <span>{t('vazhipadu_booking.submit_whatsapp')}</span>
                                                </button>
                                                <a
                                                    href="/contact"
                                                    className="modal-contact-link"
                                                    onClick={() => setSelectedOffering(null)}
                                                >
                                                    <span>{t('vazhipadu_booking.contact_office')}</span>
                                                    <ChevronRight size={16} />
                                                </a>
                                            </div>
                                        </form>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ---- INFO SECTION ---- */}
            <motion.section
                className="booking-info-section"
                {...inViewProps()}
                variants={cardVariant}
            >
                <div className="container">
                    <motion.div
                        className="info-card"
                        whileHover={{ y: -4 }}
                    >
                        <div className="info-grid">
                            <div className="info-text">
                                <div className="info-badge">
                                    <Info size={16} />
                                    <span>{isML ? 'വഴിപാട് കൗണ്ടർ' : 'Vazhipadu Counter'}</span>
                                </div>
                                <h2>{t('offerings_page.booking_title')}</h2>
                                <p>{t('offerings_page.booking_desc')}</p>
                                <div className="time-chips">
                                    <motion.div className="time-chip" whileHover={{ scale: 1.03 }}>
                                        <Clock size={16} />
                                        <span>{isML ? 'രാവിലെ: 05:00 AM – 10:30 AM' : 'Morning: 05:00 AM – 10:30 AM'}</span>
                                    </motion.div>
                                    <motion.div className="time-chip" whileHover={{ scale: 1.03 }}>
                                        <Clock size={16} />
                                        <span>{isML ? 'വൈകുന്നേരം: 05:30 PM – 08:00 PM' : 'Evening: 05:30 PM – 08:00 PM'}</span>
                                    </motion.div>
                                </div>
                            </div>
                            <div className="info-visual">
                                <div className="visual-circle primary" />
                                <div className="visual-circle gold" />
                                <Sparkles className="floating-sparkle s1" />
                                <Sparkles className="floating-sparkle s2" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default Offerings;
