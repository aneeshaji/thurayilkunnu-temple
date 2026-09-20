import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    MapPin, Phone, Mail, Clock, Send, Sparkles, MessageSquare,
    CheckCircle, Navigation, MessageCircle, HelpCircle, Shield, Compass
} from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import '../styles/Contact.css';

/* ---- ANIMATION VARIANTS ---- */
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
};

const slideLeft = {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const slideRight = {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const inViewProps = (margin = '-50px') => ({
    initial: 'hidden',
    whileInView: 'show',
    viewport: { once: true, margin }
});

const Contact = () => {
    const { t, i18n } = useTranslation();
    const isML = i18n.language === 'ml';
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
    });

    const topicChips = [
        { key: 'Pooja Booking', labelEn: 'Pooja Booking', labelMl: 'പൂജ ബുക്കിംഗ്' },
        { key: 'Darshan Timings', labelEn: 'Darshan Timings', labelMl: 'ദർശന സമയം' },
        { key: 'Annadanam', labelEn: 'Annadanam', labelMl: 'അന്നദാനം' },
        { key: 'Vazhipadu Query', labelEn: 'Vazhipadu Query', labelMl: 'വഴിപാട് വിവരങ്ങൾ' },
        { key: 'General Inquiry', labelEn: 'General Inquiry', labelMl: 'പൊതുവായ അന്വേഷണം' }
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectTopic = (topicKey) => {
        setFormData({ ...formData, subject: topicKey });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const phoneNumber = '+917994342205';
        const waMessage = `🙏 *Message from Temple Devotee*

• *Name:* ${formData.name}
• *Phone:* ${formData.phone || 'Not provided'}
• *Inquiry:* ${formData.subject || 'General Inquiry'}

*Message:*
${formData.message}

_Sent via Thurayilkunnu Temple Website_`;

        setIsSubmitted(true);
        setIsSubmitting(false);

        setTimeout(() => {
            window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(waMessage)}`, '_blank');
            setFormData({ name: '', phone: '', subject: 'General Inquiry', message: '' });
            setTimeout(() => setIsSubmitted(false), 5000);
        }, 800);
    };

    return (
        <div className="contact-page">
            <SEO 
                title={t('contact_page.title')} 
                description="Get in touch with Thurayilkunnu Sree Subramanya Swami Temple. Find our address, phone number, and location map." 
            />

            {/* ---- LUXURY INNER PAGE HERO ---- */}
            <PageHero
                title={t('contact_page.title')}
                subtitle={t('contact_page.hero_subtitle')}
                badge={t('contact_page.hero_badge')}
                bgImage="/images/banners/banner_contact.jpg"
                currentPage={t('contact_page.title')}
            />

            {/* ---- CONTACT GRID ---- */}
            <section className="contact-container section-padding">
                <div className="container">
                    {/* Quick WhatsApp Assistance Banner */}
                    <motion.div
                        className="contact-wa-banner"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="wa-banner-content">
                            <div className="wa-icon-bubble">
                                <MessageCircle size={28} />
                            </div>
                            <div className="wa-banner-text">
                                <h3>{isML ? 'തത്സമയ വിവരങ്ങൾ അറിയണോ?' : 'Need Instant Temple Information?'}</h3>
                                <p>{isML ? 'പൂജാ സമയങ്ങളും ദർശന വിവരങ്ങളും അറിയാൻ ക്ഷേത്ര ദേവസ്വം ഓഫീസുമായി വാട്സാപ്പിൽ ബന്ധപ്പെടുക.' : 'Connect directly with the Temple Devaswom office on WhatsApp for pooja schedules & darshan details.'}</p>
                            </div>
                        </div>
                        <a
                            href="https://wa.me/917994342205?text=Namaste%20Swami%2C%20I%20would%20like%20to%20know%20more%20about%20temple%20darshan%20and%20poojas."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="wa-banner-btn"
                        >
                            <span>{isML ? 'വാട്സാപ്പിൽ ബന്ധപ്പെടുക' : 'Chat on WhatsApp'}</span>
                            <Send size={16} />
                        </a>
                    </motion.div>

                    <motion.div
                        className="contact-main-grid"
                        {...inViewProps()}
                        variants={stagger}
                    >
                        {/* Left: Info Cards */}
                        <motion.div className="contact-info-column" variants={slideLeft}>
                            <div className="info-header">
                                <div className="info-pill-badge">
                                    <Sparkles size={14} />
                                    <span>{isML ? 'ഭക്തജന സേവനം' : 'Devotee Assistance'}</span>
                                </div>
                                <h2>{t('contact_page.get_in_touch')}</h2>
                                <p>{t('contact_page.desc')}</p>
                            </div>

                            <div className="contact-cards-stack">
                                <motion.div
                                    className="contact-info-card shine-hover"
                                    whileHover={{ x: 6, scale: 1.01 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <div className="card-icon-box"><MapPin size={24} /></div>
                                    <div className="card-details">
                                        <h3>{t('contact_page.address_title')}</h3>
                                        <p>Thurayilkunnu, Maru: South, Karunagappally, Kollam, Kerala - 690573</p>
                                        <span className="card-sub-highlight">{isML ? 'കരുനാഗപ്പള്ളി ടൗണിന് സമീപം' : 'Near Karunagappally Town'}</span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="contact-info-card shine-hover"
                                    whileHover={{ x: 6, scale: 1.01 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <div className="card-icon-box"><Phone size={24} /></div>
                                    <div className="card-details">
                                        <h3>{t('contact_page.phone_title')}</h3>
                                        <div className="contact-phone-links">
                                            <a href="tel:+917994342205" className="phone-contact-link">+91 79943 42205</a>
                                            <span className="phone-sep-slash">/</span>
                                            <a href="tel:+919072722205" className="phone-contact-link">+91 90727 22205</a>
                                        </div>
                                        <p className="sub-text">{t('contact_page.phone_available')}</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="contact-info-card shine-hover"
                                    whileHover={{ x: 6, scale: 1.01 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <div className="card-icon-box"><Mail size={24} /></div>
                                    <div className="card-details">
                                        <h3>{t('contact_page.email_title')}</h3>
                                        <p className="email-text">info@subramanyatemple.com</p>
                                        <p className="sub-text">{isML ? 'ദേവസ്വം ട്രസ്റ്റ് ഔദ്യോഗിക ആവശ്യങ്ങൾക്ക്' : 'For official trust correspondence'}</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="contact-info-card shine-hover"
                                    whileHover={{ x: 6, scale: 1.01 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <div className="card-icon-box"><Clock size={24} /></div>
                                    <div className="card-details">
                                        <h3>{t('contact_page.hours_title')}</h3>
                                        <div className="timing-pills-row">
                                            <span className="timing-pill">{isML ? 'രാവിലെ: 05:00 AM – 10:30 AM' : 'Morning: 05:00 AM – 10:30 AM'}</span>
                                            <span className="timing-pill">{isML ? 'വൈകിട്ട്: 05:30 PM – 08:00 PM' : 'Evening: 05:30 PM – 08:00 PM'}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Right: Modern Temple Inquiry Form */}
                        <motion.div className="contact-form-column" variants={slideRight}>
                            <motion.div
                                className="form-premium-wrapper"
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.35 }}
                            >
                                <div className="form-header">
                                    <div className="form-icon-wrap">
                                        <MessageSquare size={22} />
                                    </div>
                                    <div>
                                        <h3>{t('contact_page.send_title')}</h3>
                                        <p className="form-header-desc">{isML ? 'നിങ്ങളുടെ അന്വേഷണങ്ങൾ ക്ഷേത്ര ഭാരവാഹികൾക്ക് നേരിട്ട് അയക്കുക' : 'Send your enquiry directly to temple officials'}</p>
                                    </div>
                                </div>

                                {/* Quick Topic Selection */}
                                <div className="topic-selector-wrap">
                                    <label className="field-label-sm">{isML ? 'വിഷയം തിരഞ്ഞെടുക്കുക' : 'Select Purpose'}</label>
                                    <div className="topic-chips-row">
                                        {topicChips.map((topic) => (
                                            <button
                                                key={topic.key}
                                                type="button"
                                                className={`topic-chip ${formData.subject === topic.key ? 'active' : ''}`}
                                                onClick={() => handleSelectTopic(topic.key)}
                                            >
                                                {isML ? topic.labelMl : topic.labelEn}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                {isSubmitted ? (
                                    <motion.div
                                        className="form-success-banner"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                    >
                                        <CheckCircle size={44} className="success-icon" />
                                        <h4>{isML ? 'സന്ദേശം വിജയകരമായി അയച്ചു!' : 'Message Sent Successfully!'}</h4>
                                        <p>{isML ? 'ശ്രീ സുബ്രഹ്മണ്യസ്വാമിയുടെ അനുഗ്രഹം ഉണ്ടാകട്ടെ. ക്ഷേത്ര ഓഫീസിൽ നിന്ന് ഉടൻ ബന്ധപ്പെടുന്നതാണ്.' : 'May Lord Subramanya Swamy bless you. The temple office will respond promptly.'}</p>
                                    </motion.div>
                                ) : (
                                    <form className="modern-form" onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <div className="input-group">
                                                <label>{t('contact_page.form_name')} *</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder={t('contact_page.form_name_placeholder')}
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="input-group">
                                                <label>{isML ? 'ഫോൺ / വാട്സാപ്പ് നമ്പർ' : 'Phone / WhatsApp Number'}</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="+91 98765 43210"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="input-group">
                                                <label>{t('contact_page.form_message')} *</label>
                                                <textarea
                                                    name="message"
                                                    rows="4"
                                                    placeholder={t('contact_page.form_message_placeholder')}
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <motion.button
                                            type="submit"
                                            className="form-submit-btn"
                                            disabled={isSubmitting}
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Send size={18} />
                                            <span>{isSubmitting ? (isML ? 'വാട്സാപ്പ് തുറക്കുന്നു...' : 'Opening WhatsApp...') : (isML ? 'വാട്സാപ്പിലൂടെ സന്ദേശം അയക്കുക' : 'Send Message via WhatsApp')}</span>
                                        </motion.button>
                                    </form>
                                )}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ---- MAP & TRAVEL DIRECTIONS SECTION ---- */}
            <motion.section
                className="location-map-section"
                {...inViewProps()}
                variants={fadeInUp}
            >
                <div className="container">
                    <div className="map-section-header">
                        <div className="info-pill-badge">
                            <Compass size={14} />
                            <span>{isML ? 'യാത്രാ സഹായി' : 'Pilgrimage Guide'}</span>
                        </div>
                        <h2>{isML ? 'ക്ഷേത്രത്തിലേക്ക് എങ്ങനെ എത്തിച്ചേരാം' : 'How to Reach the Temple'}</h2>
                        <p>{isML ? 'മരു സൗത്തിലെ തുറയിൽക്കുന്ന് കുന്നിൻമുകളിൽ സ്ഥിതിചെയ്യുന്ന ക്ഷേത്രത്തിലേക്ക് കരുനാഗപ്പള്ളി ടൗണിൽ നിന്നും എളുപ്പത്തിൽ എത്തിച്ചേരാം.' : 'Located on the sacred Thurayilkunnu hillock in Maru South, easily reachable from Karunagappally town.'}</p>
                    </div>

                    <div className="travel-directions-grid">
                        <div className="travel-card">
                            <h4>{isML ? 'ട്രെയിൻ മാർഗ്ഗം' : 'By Train'}</h4>
                            <p><strong>{isML ? 'കരുനാഗപ്പള്ളി റെയിൽവേ സ്റ്റേഷൻ (KPY)' : 'Karunagappally Railway Station (KPY)'}</strong>{isML ? ' ആണ് ഏറ്റവും അടുത്തുള്ള റെയിൽവേ സ്റ്റേഷൻ. തിരുവനന്തപുരത്തു നിന്നും എറണാകുളത്തു നിന്നുമുള്ള ട്രെയിനുകൾ ഇവിടെ നിർത്തുന്നു. സ്റ്റേഷനിൽ നിന്ന് ഓട്ടോ / ടാക്സി ലഭ്യമാണ്.' : ' is the nearest station, just a short auto/taxi ride away. Regular trains connect from Trivandrum and Ernakulam.'}</p>
                        </div>
                        <div className="travel-card">
                            <h4>{isML ? 'ബസ്സ് മാർഗ്ഗം' : 'By Bus'}</h4>
                            <p>{isML ? 'ഏറ്റവും അടുത്തുള്ള പ്രധാന ബസ് സ്റ്റേഷൻ ' : 'Nearest major stop is '}<strong>{isML ? 'കരുനാഗപ്പള്ളി കെ.എസ്.ആർ.ടി.സി ബസ് സ്റ്റാൻഡ്' : 'Karunagappally KSRTC Bus Stand'}</strong>{isML ? ' ആണ്. അവിടെനിന്നും മരു സൗത്ത് / തുറയിൽക്കുന്ന് ഭാഗത്തേക്ക് ലോക്കൽ ബസുകളും ഓട്ടോറിക്ഷകളും ലഭ്യമാണ്.' : '. Regular local services and autos operate to Maru South / Thurayilkunnu.'}</p>
                        </div>
                        <div className="travel-card">
                            <h4>{isML ? 'വിമാന മാർഗ്ഗം' : 'By Air'}</h4>
                            <p>{isML ? 'കൊച്ചി അന്താരാഷ്ട്ര വിമാനത്താവളം (COK) ~90 കി.മീ, തിരുവനന്തപുരം അന്താരാഷ്ട്ര വിമാനത്താവളം (TRV) ~85 കി.മീ. ഇരു വിമാനത്താവളങ്ങളിൽ നിന്നും ടാക്സി സർവീസുകൾ ലഭ്യമാണ്.' : 'Cochin International Airport (COK) ~90 km, Trivandrum International Airport (TRV) ~85 km. Taxis available from both airports.'}</p>
                        </div>
                    </div>

                    <motion.div
                        className="map-frame-wrapper"
                        whileHover={{ scale: 1.005 }}
                        transition={{ duration: 0.4 }}
                    >
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.9573887019623!2d76.5039166!3d9.1259022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0603c90dbd04c3%3A0x1293f97cb13f1948!2sThurayilkunnu%20Sree%20Subramanya%20Swami%20Temple!5e0!3m2!1sen!2sin!4v1711972800000!5m2!1sen!2sin" 
                            width="100%" 
                            height="440" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Thurayilkunnu Sree Subramanya Swami Temple Location Map"
                        />
                        <motion.a
                            href="https://maps.app.goo.gl/nf1ogELnNM7MpmC46"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="map-overlay-badge"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                            whileHover={{ scale: 1.06 }}
                        >
                            <Navigation size={16} className="nav-compass-icon" />
                            <span>{t('contact_page.locate_map')} &bull; {isML ? 'ഗൂഗിൾ മാപ്പിൽ തുറക്കുക →' : 'Open in Google Maps →'}</span>
                        </motion.a>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default Contact;

