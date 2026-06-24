import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Star, Sparkles, ChevronRight, Clock } from 'lucide-react';
import '../styles/Festivals.css';

const Festivals = () => {
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

    const festivalsData = [
        {
            name: t('festivals_page.list.thaipusam.name'),
            date: t('festivals_page.list.thaipusam.date'),
            description: t('festivals_page.list.thaipusam.desc'),
            image: '/images/banners/banner1.jpg',
            icon: <Sparkles size={24} />
        },
        {
            name: t('festivals_page.list.skanda.name'),
            date: t('festivals_page.list.skanda.date'),
            description: t('festivals_page.list.skanda.desc'),
            image: '/images/banners/banner2.jpg',
            icon: <Star size={24} />
        },
        {
            name: t('festivals_page.list.vishu.name'),
            date: t('festivals_page.list.vishu.date'),
            description: t('festivals_page.list.vishu.desc'),
            image: '/images/banners/banner3.jpg',
            icon: <Calendar size={24} />
        },
        {
            name: t('festivals_page.list.thrikarthika.name'),
            date: t('festivals_page.list.thrikarthika.date'),
            description: t('festivals_page.list.thrikarthika.desc'),
            image: '/images/banners/banner1.jpg',
            icon: <Sparkles size={24} />
        }
    ];

    return (
        <div className="festivals-page">
            {/* ---- HERO ---- */}
            <div className="festivals-hero">
                <div className="hero-overlay"></div>
                <div className="container">
                    <div className="hero-content reveal from-bottom">
                        <span className="hero-badge">Divine Celebrations</span>
                        <h1 className="hero-title">{t('festivals_page.title')}</h1>
                        <p className="hero-subtitle">{t('festivals_page.intro')}</p>
                    </div>
                </div>
            </div>

            {/* ---- FESTIVALS TIMELINE/GRID ---- */}
            <section className="festivals-container section-padding">
                <div className="container">
                    <div className="festivals-grid">
                        {festivalsData.map((festival, index) => (
                            <div key={index} className={`festival-card reveal from-bottom delay-${index % 4}`}>
                                <div className="card-image-wrap">
                                    <img src={festival.image} alt={festival.name} />
                                    <div className="date-overlay">
                                        <Clock size={16} />
                                        <span>{festival.date}</span>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <div className="card-icon">{festival.icon}</div>
                                    <h2 className="card-title">{festival.name}</h2>
                                    <p className="card-description">{festival.description}</p>
                                    <div className="card-footer">
                                        <span className="learn-more">Festival Details <ChevronRight size={16} /></span>
                                    </div>
                                </div>
                                <div className="card-glow"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---- INFO STRIP ---- */}
            <div className="festival-info-strip reveal from-bottom">
                <div className="container strip-inner">
                    <div className="info-block">
                        <Calendar className="info-icon" />
                        <div>
                            <h4>Planning a Visit?</h4>
                            <p>Contact the temple office for specific festival dates and grand pooja timings.</p>
                        </div>
                    </div>
                    <a href="/contact" className="strip-btn">Temple Office</a>
                </div>
            </div>
        </div>
    );
};

export default Festivals;
