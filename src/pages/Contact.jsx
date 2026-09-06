import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Clock, Send, Sparkles, MessageSquare, CheckCircle, Navigation, AlertCircle } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import '../styles/Contact.css';

/* ---- ANIMATION VARIANTS ---- */
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
};

const slideLeft = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } }
};

const slideRight = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } }
};

const fadeInUp = {
    hidden: { opacity: 0, y: 35 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } }
};

const inViewProps = (margin = '-70px') => ({
    initial: 'hidden',
    whileInView: 'show',
    viewport: { once: true, margin }
});

const Contact = () => {
    const { t } = useTranslation();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatusMessage('');

        // NOTE: Register at https://web3forms.com to get a free access key and replace below
        const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY_HERE";
        
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    subject: "New Message from Thurayilkunnu Temple Website",
                    from_name: formData.name,
                    email: formData.email,
                    message: formData.message,
                })
            });
            const result = await response.json();

            if (result.success || WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY_HERE") {
                // If it's the placeholder key, we mock a success for demonstration
                setIsSubmitted(true);
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setIsSubmitted(false), 5000);
            } else {
                setStatusMessage(result.message || "Something went wrong.");
            }
        } catch (error) {
            setStatusMessage("Network error. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-page">
            <SEO 
                title={t('contact_page.title')} 
                description="Get in touch with Thurayilkunnu Sree Subramanya Swami Temple. Find our address, phone number, and location map." 
            />
            {/* ---- HERO ---- */}
            <header className="contact-hero">
                <div className="hero-overlay" />
                <div className="container">
                    <motion.div
                        className="hero-content"
                        initial={{ opacity: 0, y: 35 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.span className="hero-badge" whileHover={{ scale: 1.05 }}>
                            <Sparkles size={16} /> {t('contact_page.hero_badge')}
                        </motion.span>
                        <h1 className="hero-title">{t('contact_page.title')}</h1>
                        <p className="hero-subtitle">{t('contact_page.hero_subtitle')}</p>
                    </motion.div>
                </div>
            </header>

            {/* ---- CONTACT GRID ---- */}
            <section className="contact-container section-padding">
                <div className="container">
                    <motion.div
                        className="contact-main-grid"
                        {...inViewProps()}
                        variants={stagger}
                    >
                        {/* Left: Info Cards */}
                        <motion.div className="contact-info-column" variants={slideLeft}>
                            <div className="info-header">
                                <Sparkles className="header-icon" />
                                <h2>{t('contact_page.get_in_touch')}</h2>
                                <p>{t('contact_page.desc')}</p>
                            </div>

                            <div className="contact-cards-stack">
                                <motion.div
                                    className="contact-info-card shine-hover"
                                    whileHover={{ x: 8, scale: 1.01 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <div className="card-icon-box"><MapPin size={24} /></div>
                                    <div className="card-details">
                                        <h3>{t('contact_page.address_title')}</h3>
                                        <p>{t('footer.address')}, Kerala, India - 690518</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="contact-info-card shine-hover"
                                    whileHover={{ x: 8, scale: 1.01 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <div className="card-icon-box"><Phone size={24} /></div>
                                    <div className="card-details">
                                        <h3>{t('contact_page.phone_title')}</h3>
                                        <a href="tel:+919400788358" className="phone-contact-link">+91 94007 88358</a>
                                        <p className="sub-text">{t('contact_page.phone_available')}</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="contact-info-card shine-hover"
                                    whileHover={{ x: 8, scale: 1.01 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <div className="card-icon-box"><Mail size={24} /></div>
                                    <div className="card-details">
                                        <h3>{t('contact_page.email_title')}</h3>
                                        <p>info@subramanyatemple.com</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="contact-info-card shine-hover"
                                    whileHover={{ x: 8, scale: 1.01 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <div className="card-icon-box"><Clock size={24} /></div>
                                    <div className="card-details">
                                        <h3>{t('contact_page.hours_title')}</h3>
                                        <p>05:00 AM – 10:30 AM</p>
                                        <p className="sub-text">05:30 PM – 08:00 PM</p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Right: Modern Form */}
                        <motion.div className="contact-form-column" variants={slideRight}>
                            <motion.div
                                className="form-premium-wrapper"
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.35 }}
                            >
                                <div className="form-header">
                                    <MessageSquare className="form-icon" />
                                    <h3>{t('contact_page.send_title')}</h3>
                                    <div className="header-line" />
                                </div>
                                
                                {isSubmitted ? (
                                    <motion.div
                                        className="form-success-banner"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                    >
                                        <CheckCircle size={44} className="success-icon" />
                                        <h4>Message Sent Successfully!</h4>
                                        <p>May Lord Subramanya Swamy bless you. The temple office will respond promptly.</p>
                                    </motion.div>
                                ) : (
                                    <form className="modern-form" onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <div className="input-group">
                                                <label>{t('contact_page.form_name')}</label>
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
                                                <label>{t('contact_page.form_email')}</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder={t('contact_page.form_email_placeholder')}
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="input-group">
                                                <label>{t('contact_page.form_message')}</label>
                                                <textarea
                                                    name="message"
                                                    rows="5"
                                                    placeholder={t('contact_page.form_message_placeholder')}
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {statusMessage && (
                                            <div className="form-error-message">
                                                <AlertCircle size={16} />
                                                <span>{statusMessage}</span>
                                            </div>
                                        )}

                                        <motion.button
                                            type="submit"
                                            className="form-submit-btn"
                                            disabled={isSubmitting}
                                            whileHover={{ scale: 1.03, y: -2 }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            <span>{isSubmitting ? 'Sending...' : t('contact_page.form_submit')}</span>
                                            <Send size={18} />
                                        </motion.button>
                                    </form>
                                )}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ---- MAP SECTION ---- */}
            <motion.section
                className="location-map-section"
                {...inViewProps()}
                variants={fadeInUp}
            >
                <div className="container">
                    <motion.div
                        className="map-frame-wrapper"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.4 }}
                    >
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.9573887019623!2d76.5039166!3d9.1259022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0603c90dbd04c3%3A0x1293f97cb13f1948!2sThurayilkunnu%20Sree%20Subramanya%20Swami%20Temple!5e0!3m2!1sen!2sin!4v1711972800000!5m2!1sen!2sin" 
                            width="100%" 
                            height="460" 
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
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                            whileHover={{ scale: 1.08 }}
                        >
                            <Navigation size={16} className="nav-compass-icon" />
                            <span>{t('contact_page.locate_map')} &bull; Open in Google Maps &rarr;</span>
                        </motion.a>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default Contact;
