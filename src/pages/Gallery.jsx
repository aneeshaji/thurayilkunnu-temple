import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Image as ImageIcon, Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Gallery.css';

/* ---- ANIMATION VARIANTS ---- */
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

const itemVariant = {
    hidden: { opacity: 0, scale: 0.92, y: 30 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }
};

const Gallery = () => {
    const { t } = useTranslation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeFilter, setActiveFilter] = useState('All');

    const galleryImages = [
        { id: 1, url: '/images/gallery/murugan_peacock.jpg', title: 'Lord Murugan on Sacred Peacock', category: 'Deity' },
        { id: 2, url: '/images/gallery/balamurugan_sanctum.jpg', title: 'Child Balamurugan Sanctum', category: 'Shrine' },
        { id: 3, url: '/images/gallery/palani_murugan.jpg', title: 'Lord Murugan at Sunset Hill Temple', category: 'Shrine' },
        { id: 4, url: '/images/gallery/peacock_rays.jpg', title: 'Peacock Feather Rays Motif', category: 'Festivals' },
        { id: 5, url: '/images/gallery/peacock_portrait.jpg', title: 'Majestic Peacock Vahana Portrait', category: 'Architecture' },
        { id: 6, url: '/images/gallery/ganapathy_shrine.jpg', title: 'Lord Ganapathy Shrine', category: 'Deity' },
        { id: 7, url: '/images/gallery/bhagavathy_shrine.jpg', title: 'Goddess Bhagavathy Shrine', category: 'Shrine' },
        { id: 8, url: '/images/gallery/peacock_diya_decor.jpg', title: 'Chuttuvilakku & Deeparadhana', category: 'Rituals' },
        { id: 9, url: '/images/festivals/thaipusam.jpg', title: 'Grand Thaipusam Mahotsavam', category: 'Festivals' },
        { id: 10, url: '/images/festivals/skanda_sashti.jpg', title: 'Skanda Sashti Celebrations', category: 'Festivals' }
    ];

    const filterCategories = ['All', 'Shrine', 'Deity', 'Festivals', 'Rituals', 'Architecture'];

    const filteredImages = activeFilter === 'All'
        ? galleryImages
        : galleryImages.filter(img => img.category === activeFilter);

    // Lock body scroll while lightbox is open
    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [selectedImage]);

    // Keyboard navigation in lightbox
    useEffect(() => {
        if (!selectedImage) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    const openLightbox = (image, index) => {
        setSelectedImage(image);
        setCurrentIndex(index);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    const nextImage = (e) => {
        if (e) e.stopPropagation();
        const nextIdx = (currentIndex + 1) % filteredImages.length;
        setCurrentIndex(nextIdx);
        setSelectedImage(filteredImages[nextIdx]);
    };

    const prevImage = (e) => {
        if (e) e.stopPropagation();
        const prevIdx = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        setCurrentIndex(prevIdx);
        setSelectedImage(filteredImages[prevIdx]);
    };

    return (
        <div className="gallery-page">
            {/* ---- HERO ---- */}
            <header className="gallery-hero">
                <div className="hero-overlay" />
                <div className="container">
                    <motion.div
                        className="hero-content"
                        initial={{ opacity: 0, y: 35 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.span className="hero-badge" whileHover={{ scale: 1.05 }}>
                            <Sparkles size={16} /> {t('gallery.hero_badge')}
                        </motion.span>
                        <h1 className="hero-title">{t('gallery.hero_title')}</h1>
                        <p className="hero-subtitle">{t('gallery.hero_subtitle')}</p>
                    </motion.div>
                </div>
            </header>

            {/* ---- GALLERY SECTION WITH CATEGORY FILTER ---- */}
            <section className="gallery-container section-padding">
                <div className="container">
                    {/* Category Filter Pills */}
                    <div className="gallery-filter-tabs">
                        {filterCategories.map((cat) => (
                            <button
                                key={cat}
                                className={`gallery-tab-btn ${activeFilter === cat ? 'active' : ''}`}
                                onClick={() => setActiveFilter(cat)}
                            >
                                {cat}
                                {activeFilter === cat && (
                                    <motion.div
                                        className="gallery-tab-glow"
                                        layoutId="galleryTabGlow"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Mosaic Grid */}
                    <motion.div
                        className="gallery-grid"
                        variants={stagger}
                        initial="hidden"
                        animate="show"
                        key={activeFilter}
                    >
                        <AnimatePresence>
                            {filteredImages.map((image, index) => (
                                <motion.div
                                    key={image.id}
                                    className="gallery-item shine-hover"
                                    variants={itemVariant}
                                    layout
                                    whileHover={{ y: -6, scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={() => openLightbox(image, index)}
                                >
                                    <div className="gallery-img-wrap">
                                        <img src={image.url} alt={image.title} loading="lazy" />
                                        <div className="img-overlay">
                                            <motion.div
                                                className="zoom-icon-box"
                                                whileHover={{ scale: 1.2, rotate: 90 }}
                                            >
                                                <Maximize2 className="zoom-icon" size={22} />
                                            </motion.div>
                                            <div className="img-info">
                                                <span className="img-category">{image.category}</span>
                                                <h3 className="img-title">{image.title}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* ---- SPRING LIGHTBOX ---- */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="lightbox-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                    >
                        <motion.button
                            className="lightbox-close"
                            onClick={closeLightbox}
                            whileHover={{ scale: 1.15, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Close lightbox"
                        >
                            <X size={26} />
                        </motion.button>

                        <motion.button
                            className="lightbox-nav prev"
                            onClick={prevImage}
                            whileHover={{ scale: 1.15, x: -4 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={36} />
                        </motion.button>

                        <motion.button
                            className="lightbox-nav next"
                            onClick={nextImage}
                            whileHover={{ scale: 1.15, x: 4 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Next image"
                        >
                            <ChevronRight size={36} />
                        </motion.button>

                        <motion.div
                            className="lightbox-content"
                            initial={{ scale: 0.88, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.88, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={selectedImage.url} alt={selectedImage.title} />
                            <div className="lightbox-caption">
                                <h3>{selectedImage.title}</h3>
                                <p>{selectedImage.category}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ---- FOOTER INFO ---- */}
            <div className="gallery-footer">
                <div className="container">
                    <motion.div
                        className="footer-box"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <ImageIcon size={44} className="footer-icon" />
                        <h2>{t('gallery.footer_title')}</h2>
                        <p>{t('gallery.footer_desc')}</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
