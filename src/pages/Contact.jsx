import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Clock, Send, Sparkles, MessageSquare } from 'lucide-react';
import '../styles/Contact.css';

const Contact = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    }
                });
            },
            { threshold: 0.1 }
        );
        document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(t('contact_page.form_success'));
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="contact-page">
            {/* ---- HERO ---- */}
            <div className="contact-hero">
                <div className="hero-overlay"></div>
                <div className="container">
                    <div className="hero-content reveal from-bottom">
                        <span className="hero-badge">{t('contact_page.hero_badge')}</span>
                        <h1 className="hero-title">{t('contact_page.title')}</h1>
                        <p className="hero-subtitle">{t('contact_page.hero_subtitle')}</p>
                    </div>
                </div>
            </div>

            {/* ---- CONTACT GRID ---- */}
            <section className="contact-container section-padding">
                <div className="container">
                    <div className="contact-main-grid">
                        
                        {/* Left: Info Cards */}
                        <div className="contact-info-column reveal from-left">
                            <div className="info-header">
                                <Sparkles className="header-icon" />
                                <h2>{t('contact_page.get_in_touch')}</h2>
                                <p>{t('contact_page.desc')}</p>
                            </div>

                            <div className="contact-cards-stack">
                                <div className="contact-info-card">
                                    <div className="card-icon-box"><MapPin size={24} /></div>
                                    <div className="card-details">
                                        <h3>{t('contact_page.address_title')}</h3>
                                        <p>{t('footer.address')}, Kerala, India - 690518</p>
                                    </div>
                                </div>

                                <div className="contact-info-card">
                                    <div className="card-icon-box"><Phone size={24} /></div>
                                    <div className="card-details">
                                        <h3>{t('contact_page.phone_title')}</h3>
                                        <p>+91 94007 88358</p>
                                        <p className="sub-text">{t('contact_page.phone_available')}</p>
                                    </div>
                                </div>

                                <div className="contact-info-card">
                                    <div className="card-icon-box"><Mail size={24} /></div>
                                    <div className="card-details">
                                        <h3>{t('contact_page.email_title')}</h3>
                                        <p>info@subramanyatemple.com</p>
                                    </div>
                                </div>

                                <div className="contact-info-card">
                                    <div className="card-icon-box"><Clock size={24} /></div>
                                    <div className="card-details">
                                        <h3>{t('contact_page.hours_title')}</h3>
                                        <p>05:00 AM – 10:30 AM</p>
                                        <p className="sub-text">05:30 PM – 08:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Modern Form */}
                        <div className="contact-form-column reveal from-right">
                            <div className="form-premium-wrapper">
                                <div className="form-header">
                                    <MessageSquare className="form-icon" />
                                    <h3>{t('contact_page.send_title')}</h3>
                                    <div className="header-line"></div>
                                </div>
                                
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
                                            <div className="input-focus-bg"></div>
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
                                            <div className="input-focus-bg"></div>
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
                                            ></textarea>
                                            <div className="input-focus-bg"></div>
                                        </div>
                                    </div>

                                    <button type="submit" className="form-submit-btn">
                                        <span>{t('contact_page.form_submit')}</span>
                                        <Send size={18} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---- MAP SECTION ---- */}
            <section className="location-map-section reveal from-bottom">
                <div className="container">
                    <div className="map-frame-wrapper">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15764.557406240217!2d76.53610217112003!3d9.005315480838188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b060f9e98e3b3fb%3A0x7d0a64e292025e1a!2sThurayilkunnu%2C%20Kerala!5e0!3m2!1sen!2sin!4v1711972800000!5m2!1sen!2sin" 
                            width="100%" 
                            height="450" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Temple Location Map"
                        ></iframe>
                        <div className="map-overlay-badge">
                            <MapPin size={16} />
                            <span>{t('contact_page.locate_map')}</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
