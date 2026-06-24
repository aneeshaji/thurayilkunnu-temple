import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/Banner.css';

const Banner = () => {
    // Perfectly matching the requested standard modern structural layout
    const slides = [
        {
            url: '/images/banners/banner1.jpg',
            badge: 'DIVINE PRESENCE AND BLESSINGS',
            title1: 'Thurayilkunnu',
            title2: 'Sree Subramanya',
            title3: 'Swami Temple',
            desc: 'A sanctuary of peace and divine grace, preserving centuries of traditional worship and religious excellence.'
        },
        {
            url: '/images/banners/banner2.jpg',
            badge: 'ANCIENT HERITAGE OF WORSHIP',
            title1: 'Sacred Abode Of',
            title2: 'Lord Murugan',
            title3: 'The Divine Protector',
            desc: 'Experience pure spiritual energy and rich cultural heritage handed down through devoted generations.'
        },
        {
            url: '/images/banners/banner3.jpg',
            badge: 'EXPERIENCE TRUE SPIRITUALITY',
            title1: 'A Temple With',
            title2: 'Timeless',
            title3: 'Traditions',
            desc: 'Join us in our daily poojas and celebrate the divine festivals honoring the ultimate warrior deity.'
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 6500);
        return () => clearInterval(timer);
    }, [slides.length]);

    const prevSlide = () => setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
    const nextSlide = () => setCurrentIndex((currentIndex + 1) % slides.length);

    return (
        <div className="perfect-banner-wrapper">
            {slides.map((slide, idx) => (
                <div key={idx} className={`perfect-slide ${idx === currentIndex ? 'active' : ''}`}>
                    <div className="perfect-bg" style={{ backgroundImage: `url(${slide.url})` }}></div>
                    <div className="perfect-overlay">
                        <div className="container" style={{ textAlign: "left" }}>
                            <div className="perfect-content">
                                <div className="perfect-badge">
                                    {slide.badge}
                                </div>
                                
                                <h1 className="perfect-title">
                                    {slide.title1} <br />
                                    <span className="perfect-highlight">{slide.title2}</span> <br />
                                    {slide.title3}
                                </h1>
                                
                                <p className="perfect-desc">
                                    {slide.desc}
                                </p>
                                
                                <div className="perfect-actions">
                                    <Link to="/offerings" className="perfect-btn-solid">
                                        SACRED OFFERINGS
                                    </Link>
                                    <Link to="/about" className="perfect-btn-outline">
                                        EXPLORE HISTORY
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <button className="perfect-arrow perfect-left" onClick={prevSlide} aria-label="Previous">
                <ChevronLeft size={28} />
            </button>
            <button className="perfect-arrow perfect-right" onClick={nextSlide} aria-label="Next">
                <ChevronRight size={28} />
            </button>
        </div>
    );
};

export default Banner;
