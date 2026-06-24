import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Heart, CreditCard, Clock, Info, ChevronRight, Tag } from 'lucide-react';
import '../styles/Offerings.css';

const Offerings = () => {
    const { t } = useTranslation();

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

    const offeringsData = [
        { name: t('offerings_page.list.pushpanjali.name'), price: '₹20', description: t('offerings_page.list.pushpanjali.desc'), icon: <Heart size={20} /> },
        { name: t('offerings_page.list.muttarukkal.name'), price: '₹30', description: t('offerings_page.list.muttarukkal.desc'), icon: <Sparkles size={20} /> },
        { name: t('offerings_page.list.payasam.name'), price: '₹150', description: t('offerings_page.list.payasam.desc'), icon: <Tag size={20} /> },
        { name: t('offerings_page.list.homam.name'), price: '₹350', description: t('offerings_page.list.homam.desc'), icon: <Sparkles size={20} /> },
        { name: t('offerings_page.list.shatrusamhara.name'), price: '₹50', description: t('offerings_page.list.shatrusamhara.desc'), icon: <Heart size={20} /> },
        { name: t('offerings_page.list.thulabharam.name'), price: 'Variable', description: t('offerings_page.list.thulabharam.desc'), icon: <CreditCard size={20} /> },
        { name: t('offerings_page.list.panchamrutham.name'), price: '₹100', description: t('offerings_page.list.panchamrutham.desc'), icon: <Tag size={20} /> },
        { name: t('offerings_page.list.bhasmabhishekam.name'), price: '₹50', description: t('offerings_page.list.bhasmabhishekam.desc'), icon: <Sparkles size={20} /> },
        { name: t('offerings_page.list.palabhishekam.name'), price: '₹50', description: t('offerings_page.list.palabhishekam.desc'), icon: <Sparkles size={20} /> },
        { name: t('offerings_page.list.chuttuvilakku.name'), price: '₹500', description: t('offerings_page.list.chuttuvilakku.desc'), icon: <Sparkles size={20} /> },
        { name: t('offerings_page.list.vidyarambham.name'), price: '₹200', description: t('offerings_page.list.vidyarambham.desc'), icon: <Heart size={20} /> },
        { name: t('offerings_page.list.annadanam.name'), price: '₹1000+', description: t('offerings_page.list.annadanam.desc'), icon: <Heart size={20} /> }
    ];

    return (
        <div className="offerings-page">
            {/* ---- HERO ---- */}
            <div className="offerings-hero">
                <div className="hero-overlay"></div>
                <div className="container">
                    <div className="hero-content reveal from-bottom">
                        <span className="hero-badge">Divine Grace</span>
                        <h1 className="hero-title">{t('offerings_page.title')}</h1>
                        <p className="hero-subtitle">{t('offerings_page.intro')}</p>
                    </div>
                </div>
            </div>

            {/* ---- OFFERINGS GRID ---- */}
            <section className="offerings-container section-padding">
                <div className="container">
                    <div className="offerings-grid">
                        {offeringsData.map((offering, index) => (
                            <div key={index} className={`offering-card reveal from-bottom delay-${index % 4}`}>
                                <div className="card-top">
                                    <div className="card-icon-circle">{offering.icon}</div>
                                    <span className="price-tag">{offering.price}</span>
                                </div>
                                <div className="card-body">
                                    <h3 className="offering-name">{offering.name}</h3>
                                    <p className="offering-desc">{offering.description}</p>
                                </div>
                                <div className="card-action">
                                    <span>Learn Ritual <ChevronRight size={16} /></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---- INFO SECTION ---- */}
            <section className="booking-info-section reveal from-bottom">
                <div className="container">
                    <div className="info-card">
                        <div className="info-grid">
                            <div className="info-text">
                                <div className="info-badge">
                                    <Info size={16} />
                                    <span>Vazhipadu Counter</span>
                                </div>
                                <h2>{t('offerings_page.booking_title')}</h2>
                                <p>{t('offerings_page.booking_desc')}</p>
                                <div className="time-chips">
                                    <div className="time-chip">
                                        <Clock size={16} />
                                        <span>Morning: 05:00 AM – 10:30 AM</span>
                                    </div>
                                    <div className="time-chip">
                                        <Clock size={16} />
                                        <span>Evening: 05:30 PM – 08:00 PM</span>
                                    </div>
                                </div>
                            </div>
                            <div className="info-visual">
                                <div className="visual-circle primary"></div>
                                <div className="visual-circle gold"></div>
                                <Sparkles className="floating-sparkle s1" />
                                <Sparkles className="floating-sparkle s2" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Offerings;
