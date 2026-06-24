import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Book, History, Award, MapPin, Star, Sparkles, ChevronRight } from 'lucide-react';
import '../styles/About.css';

const About = () => {
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
            { threshold: 0.15 }
        );
        document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="about-page">
            {/* ---- SIMPLE HERO ---- */}
            <div className="about-hero">
                <div className="hero-overlay"></div>
                <div className="container">
                    <div className="hero-content reveal from-bottom">
                        <span className="hero-badge"><Sparkles size={16} /> {t('about.hero_badge')}</span>
                        <h1 className="hero-title">{t('about.title')}</h1>
                        <div className="hero-accent"></div>
                    </div>
                </div>
            </div>

            {/* ---- HISTORY SECTION ---- */}
            <section className="about-content-section section-padding">
                <div className="container">
                    <div className="content-grid">
                        <div className="text-side reveal from-left">
                            <div className="section-label">
                                <History size={18} />
                                <span>{t('about.history_title')}</span>
                            </div>
                            <h2 className="heading-secondary">{t('about.history_heading')}</h2>
                            <p className="description-text">{t('about.history_p1')}</p>
                            <p className="description-text">{t('about.history_p2')}</p>
                        </div>
                        <div className="image-side reveal from-right">
                            <div className="about-image-wrapper">
                                <img src="/images/banners/banner1.jpg" alt="Temple History" />
                                <div className="floating-stat">
                                    <span className="stat-value">70+</span>
                                    <span className="stat-label">Years of Glory</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---- LEGEND SECTION ---- */}
            <section className="about-content-section alt-bg section-padding">
                <div className="container">
                    <div className="content-grid reverse">
                        <div className="text-side reveal from-right">
                            <div className="section-label">
                                <Sparkles size={18} />
                                <span>{t('about.legend_title')}</span>
                            </div>
                            <h2 className="heading-secondary">{t('about.legend_heading')}</h2>
                            <p className="description-text">{t('about.legend_p1')}</p>
                            <div className="quote-box">
                                <p>"{t('about.legend_quote')}"</p>
                            </div>
                        </div>
                        <div className="image-side reveal from-left">
                            <div className="about-image-wrapper">
                                <img src="/images/banners/banner3.jpg" alt="Temple Legend" />
                            </div>
                            <div className="corner-decor"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---- ARCHITECTURE SECTION ---- */}
            <section className="about-content-section section-padding">
                <div className="container">
                    <div className="content-grid">
                        <div className="text-side reveal from-left">
                            <div className="section-label">
                                <Award size={18} />
                                <span>{t('about.architecture_title')}</span>
                            </div>
                            <h2 className="heading-secondary">{t('about.architecture_heading')}</h2>
                            <p className="description-text">{t('about.architecture_p1')}</p>
                            <ul className="feature-list">
                                <li><Star size={16} /> <span>{t('about.arch_feat1')}</span></li>
                                <li><Star size={16} /> <span>{t('about.arch_feat2')}</span></li>
                                <li><Star size={16} /> <span>{t('about.arch_feat3')}</span></li>
                            </ul>
                        </div>
                        <div className="image-side reveal from-right">
                            <div className="about-image-wrapper grid-collage">
                                <img src="/images/banners/banner2.jpg" alt="Architecture Details" />
                                <div className="overlay-card">
                                    <MapPin size={24} />
                                    <p>{t('about.arch_location')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---- CTA SECTION ---- */}
            <section className="about-cta">
                <div className="container reveal from-bottom">
                    <div className="cta-box">
                        <h3>{t('about.cta_title')}</h3>
                        <p>{t('about.cta_desc')}</p>
                        <div className="cta-buttons">
                            <a href="/contact" className="btn-solid">{t('about.cta_btn')} <ChevronRight size={18} /></a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
