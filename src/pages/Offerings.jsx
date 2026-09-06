import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Heart, CreditCard, Clock, Info, ChevronRight, Tag, Flame, CheckCircle, X, MessageCircle } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
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
    const { t } = useTranslation();
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedOffering, setSelectedOffering] = useState(null);

    const offeringsData = [
        { id: 1, category: 'daily', name: t('offerings_page.list.pushpanjali.name'), price: '₹20', description: t('offerings_page.list.pushpanjali.desc'), icon: <Heart size={20} />, image: '/images/offerings/archana_pushpanjali.jpg', benefit: 'Daily peace, health, and family prosperity' },
        { id: 2, category: 'special', name: t('offerings_page.list.muttarukkal.name'), price: '₹30', description: t('offerings_page.list.muttarukkal.desc'), icon: <Sparkles size={20} />, image: '/images/offerings/ganapathy_homam.jpg', benefit: 'Removal of astrological obstacles and evil eye' },
        { id: 3, category: 'prasadam', name: t('offerings_page.list.payasam.name'), price: '₹150', description: t('offerings_page.list.payasam.desc'), icon: <Tag size={20} />, image: '/images/offerings/archana_pushpanjali.jpg', benefit: 'Sacred sweet nectar offered for thanksgiving' },
        { id: 4, category: 'homam', name: t('offerings_page.list.homam.name'), price: '₹350', description: t('offerings_page.list.homam.desc'), icon: <Flame size={20} />, image: '/images/offerings/ganapathy_homam.jpg', benefit: 'Auspicious fire ritual invoking Lord Ganesha' },
        { id: 5, category: 'special', name: t('offerings_page.list.shatrusamhara.name'), price: '₹50', description: t('offerings_page.list.shatrusamhara.desc'), icon: <Heart size={20} />, image: '/images/offerings/palabhishekam.jpg', benefit: 'Protection against negative forces and fear' },
        { id: 6, category: 'special', name: t('offerings_page.list.thulabharam.name'), price: 'Variable', description: t('offerings_page.list.thulabharam.desc'), icon: <CreditCard size={20} />, image: '/images/offerings/thulabharam.jpg', benefit: 'Sacred weight offering in fulfilment of vows' },
        { id: 7, category: 'prasadam', name: t('offerings_page.list.panchamrutham.name'), price: '₹100', description: t('offerings_page.list.panchamrutham.desc'), icon: <Tag size={20} />, image: '/images/offerings/palabhishekam.jpg', benefit: 'Divine 5-ingredient fruit offering for good health' },
        { id: 8, category: 'abhishekam', name: t('offerings_page.list.bhasmabhishekam.name'), price: '₹50', description: t('offerings_page.list.bhasmabhishekam.desc'), icon: <Sparkles size={20} />, image: '/images/offerings/palabhishekam.jpg', benefit: 'Sacred ash shower on the sanctum idol' },
        { id: 9, category: 'abhishekam', name: t('offerings_page.list.palabhishekam.name'), price: '₹50', description: t('offerings_page.list.palabhishekam.desc'), icon: <Sparkles size={20} />, image: '/images/offerings/palabhishekam.jpg', benefit: 'Pure milk bath cleansing the soul and mind' },
        { id: 10, category: 'special', name: t('offerings_page.list.chuttuvilakku.name'), price: '₹500', description: t('offerings_page.list.chuttuvilakku.desc'), icon: <Sparkles size={20} />, image: '/images/offerings/archana_pushpanjali.jpg', benefit: 'Lighting up hundreds of oil lamps around the temple' },
        { id: 11, category: 'daily', name: t('offerings_page.list.vidyarambham.name'), price: '₹200', description: t('offerings_page.list.vidyarambham.desc'), icon: <Heart size={20} />, image: '/images/offerings/archana_pushpanjali.jpg', benefit: 'Blessings for children education and intellect' },
        { id: 12, category: 'special', name: t('offerings_page.list.annadanam.name'), price: '₹1000+', description: t('offerings_page.list.annadanam.desc'), icon: <Heart size={20} />, image: '/images/offerings/ganapathy_homam.jpg', benefit: 'Feeding hundreds of devotees — highest charity' }
    ];

    const categories = [
        { key: 'all', label: 'All Offerings' },
        { key: 'daily', label: 'Daily Poojas' },
        { key: 'abhishekam', label: 'Abhishekam' },
        { key: 'homam', label: 'Homam & Fire' },
        { key: 'special', label: 'Special Vows' }
    ];

    const filteredOfferings = activeFilter === 'all'
        ? offeringsData
        : offeringsData.filter(o => o.category === activeFilter);

    // Close modal on escape key
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedOffering(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleWhatsAppBooking = (offering) => {
        const phoneNumber = "+919400788358";
        const message = `Swami Saranam, I would like to book the following offering at the temple:
*Offering:* ${offering.name}
*Price:* ${offering.price}

Please let me know the available dates and payment details.`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="offerings-page">
            <SEO 
                title={t('offerings_page.title')} 
                description="Book poojas, vazhipadu, and special offerings at Thurayilkunnu Sree Subramanya Swami Temple."
            />
            {/* ---- HERO ---- */}
            <header className="offerings-hero">
                <div className="hero-overlay" />
                <div className="container">
                    <motion.div
                        className="hero-content"
                        initial={{ opacity: 0, y: 35 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.span className="hero-badge" whileHover={{ scale: 1.05 }}>
                            <Sparkles size={16} /> Sacred Offerings
                        </motion.span>
                        <h1 className="hero-title">{t('offerings_page.title')}</h1>
                        <p className="hero-subtitle">{t('offerings_page.intro')}</p>
                    </motion.div>
                </div>
            </header>

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
                                {cat.label}
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
                                    onClick={() => setSelectedOffering(offering)}
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
                                        <span className="price-tag">{offering.price}</span>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="offering-name">{offering.name}</h3>
                                        <p className="offering-desc">{offering.description}</p>
                                    </div>
                                    <div className="card-action">
                                        <span>Ritual Details <ChevronRight size={16} /></span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* ---- MODAL POPUP FOR OFFERING DETAILS ---- */}
            <AnimatePresence>
                {selectedOffering && (
                    <motion.div
                        className="offering-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedOffering(null)}
                    >
                        <motion.div
                            className="offering-modal-box"
                            initial={{ scale: 0.9, y: 30, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 30, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="modal-close-btn"
                                onClick={() => setSelectedOffering(null)}
                            >
                                <X size={22} />
                            </button>

                            <div className="modal-header">
                                <div className="modal-icon-halo">
                                    {selectedOffering.icon}
                                </div>
                                <div>
                                    <span className="modal-tag">Vazhipadu Offering</span>
                                    <h2>{selectedOffering.name}</h2>
                                    <span className="modal-price">{selectedOffering.price}</span>
                                </div>
                            </div>

                            <div className="modal-body">
                                <p className="modal-description">{selectedOffering.description}</p>
                                
                                <div className="modal-benefit-box">
                                    <CheckCircle size={20} className="benefit-icon" />
                                    <div>
                                        <strong>Spiritual Benefit</strong>
                                        <p>{selectedOffering.benefit}</p>
                                    </div>
                                </div>

                                <div className="modal-timing-strip">
                                    <Clock size={16} />
                                    <span>Performed daily at sanctum during morning & evening pooja hours</span>
                                </div>
                            </div>

                            <div className="modal-footer" style={{ display: 'flex', gap: '10px' }}>
                                <button
                                    onClick={() => handleWhatsAppBooking(selectedOffering)}
                                    className="modal-book-btn"
                                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#25D366', color: '#fff', border: 'none', cursor: 'pointer' }}
                                >
                                    <MessageCircle size={18} />
                                    <span>Book via WhatsApp</span>
                                </button>
                                <a
                                    href="/contact"
                                    className="modal-book-btn"
                                    onClick={() => setSelectedOffering(null)}
                                    style={{ flex: 1 }}
                                >
                                    <span>Contact Office</span>
                                    <ChevronRight size={16} />
                                </a>
                            </div>
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
                                    <span>Vazhipadu Counter</span>
                                </div>
                                <h2>{t('offerings_page.booking_title')}</h2>
                                <p>{t('offerings_page.booking_desc')}</p>
                                <div className="time-chips">
                                    <motion.div className="time-chip" whileHover={{ scale: 1.03 }}>
                                        <Clock size={16} />
                                        <span>Morning: 05:00 AM – 10:30 AM</span>
                                    </motion.div>
                                    <motion.div className="time-chip" whileHover={{ scale: 1.03 }}>
                                        <Clock size={16} />
                                        <span>Evening: 05:30 PM – 08:00 PM</span>
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
