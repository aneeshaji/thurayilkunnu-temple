import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image as ImageIcon, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/Gallery.css';

const Gallery = () => {
    const { t } = useTranslation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

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

    const galleryImages = [
        { url: '/images/banners/banner1.jpg', title: 'Main Temple Sanctum', category: 'Shrine' },
        { url: '/images/banners/banner2.jpg', title: 'Lord Murugan Idol', category: 'Deity' },
        { url: '/images/banners/banner3.jpg', title: 'Temple Architecture', category: 'Exterior' },
        { url: '/images/banners/banner1.jpg', title: 'Festival Celebration', category: 'Event' },
        { url: '/images/banners/banner2.jpg', title: 'Evening Deeparadhana', category: 'Ritual' },
        { url: '/images/banners/banner3.jpg', title: 'Morning Ganapathy Homam', category: 'Ritual' },
        { url: '/images/banners/banner1.jpg', title: 'Skanda Sashti Festival', category: 'Event' },
        { url: '/images/banners/banner2.jpg', title: 'Ancient Wood Carvings', category: 'Art' },
    ];

    const openLightbox = (index) => {
        setSelectedImage(galleryImages[index]);
        setCurrentIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    const nextImage = (e) => {
        e.stopPropagation();
        const nextIdx = (currentIndex + 1) % galleryImages.length;
        setCurrentIndex(nextIdx);
        setSelectedImage(galleryImages[nextIdx]);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        const prevIdx = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        setCurrentIndex(prevIdx);
        setSelectedImage(galleryImages[prevIdx]);
    };

    return (
        <div className="gallery-page">
            {/* ---- HERO ---- */}
            <div className="gallery-hero">
                <div className="hero-overlay"></div>
                <div className="container">
                    <div className="hero-content reveal from-bottom">
                        <span className="hero-badge">{t('gallery.hero_badge')}</span>
                        <h1 className="hero-title">{t('gallery.hero_title')}</h1>
                        <p className="hero-subtitle">{t('gallery.hero_subtitle')}</p>
                    </div>
                </div>
            </div>

            {/* ---- GALLERY GRID ---- */}
            <section className="gallery-container section-padding">
                <div className="container">
                    <div className="gallery-grid">
                        {galleryImages.map((image, index) => (
                            <div 
                                key={index} 
                                className={`gallery-item reveal from-bottom delay-${index % 4}`}
                                onClick={() => openLightbox(index)}
                            >
                                <div className="gallery-img-wrap">
                                    <img src={image.url} alt={image.title} loading="lazy" />
                                    <div className="img-overlay">
                                        <Maximize2 className="zoom-icon" size={24} />
                                        <div className="img-info">
                                            <span className="img-category">{image.category}</span>
                                            <h3 className="img-title">{image.title}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---- LIGHTBOX ---- */}
            {selectedImage && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <button className="lightbox-close" onClick={closeLightbox}><X size={32} /></button>
                    <button className="lightbox-nav prev" onClick={prevImage}><ChevronLeft size={48} /></button>
                    <button className="lightbox-nav next" onClick={nextImage}><ChevronRight size={48} /></button>
                    
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImage.url} alt={selectedImage.title} />
                        <div className="lightbox-caption">
                            <h3>{selectedImage.title}</h3>
                            <p>{selectedImage.category}</p>
                        </div>
                    </div>
                </div>
            )}
            
            {/* ---- FOOTER INFO ---- */}
            <div className="gallery-footer reveal from-bottom">
                <div className="container footer-box">
                    <ImageIcon size={40} className="footer-icon" />
                    <h2>{t('gallery.footer_title')}</h2>
                    <p>{t('gallery.footer_desc')}</p>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
