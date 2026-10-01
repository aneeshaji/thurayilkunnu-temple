import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Image as ImageIcon, Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '../components/PageHero';
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
    const { t, i18n } = useTranslation();
    const isML = i18n.language === 'ml';
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeFilter, setActiveFilter] = useState('All');

    const categoryLabels = {
        'All': { en: 'All', ml: 'എല്ലാം' },
        'Shrine': { en: 'Shrine', ml: 'ശ്രീകോവിൽ' },
        'Deity': { en: 'Deity', ml: 'ദേവതകൾ' },
        'Festivals': { en: 'Festivals', ml: 'ഉത്സവങ്ങൾ' },
        'Rituals': { en: 'Rituals', ml: 'പൂജകളും ആചാരങ്ങളും' },
        'Architecture': { en: 'Architecture', ml: 'ശില്പഭംഗി' }
    };

    const galleryImages = [
        { id: 1, url: '/images/gallery/temple_exterior.jpg', title: 'Thurayilkunnu Temple — Morning Darshan', titleMl: 'തുറയിൽകുന്ന് ക്ഷേത്രം — പ്രഭാത ദർശനം', category: 'Architecture' },
        { id: 2, url: '/images/gallery/murugan_peacock.jpg', title: 'Lord Murugan on Sacred Peacock', titleMl: 'മയിൽവാഹനനായ ശ്രീ സുബ്രഹ്മണ്യസ്വാമി', category: 'Deity' },
        { id: 3, url: '/images/gallery/balamurugan_sanctum.jpg', title: 'Child Balamurugan Sanctum', titleMl: 'ശ്രീ ബാലമുരുകൻ സന്നിധി', category: 'Shrine' },
        { id: 4, url: '/images/gallery/chuttuvilakku_night.jpg', title: 'Chuttuvilakku — Temple Lit by a Thousand Lamps', titleMl: 'ചുറ്റുവിളക്ക് ദീപപ്രഭയിൽ പ്രഭാപൂരിതമായ ശ്രീകോവിൽ', category: 'Rituals' },
        { id: 5, url: '/images/gallery/kavadi_procession.jpg', title: 'Thaipusam Kavadi Mahotsavam Procession', titleMl: 'തൈപ്പൂയ കാവടിയാട്ടം ഘോഷയാത്ര', category: 'Festivals' },
        { id: 6, url: '/images/gallery/palani_murugan.jpg', title: 'Lord Murugan at Sunset Hill Temple', titleMl: 'സന്ധ്യാസമയത്ത് ശ്രീ മുരുകൻ സന്നിധി', category: 'Shrine' },
        { id: 7, url: '/images/gallery/peacock_rays.jpg', title: 'Peacock Feather Rays Motif', titleMl: 'മയിൽപ്പീലി പ്രഭാവലയം', category: 'Rituals' },
        { id: 8, url: '/images/gallery/peacock_portrait.jpg', title: 'Majestic Peacock Vahana Portrait', titleMl: 'ദിവ്യ മയിൽ വാഹനം', category: 'Architecture' },
        { id: 9, url: '/images/gallery/ganapathy_shrine.jpg', title: 'Lord Ganapathy Shrine', titleMl: 'ശ്രീ മഹാഗണപതി ഉപദേവ സന്നിധി', category: 'Deity' },
        { id: 10, url: '/images/gallery/bhagavathy_shrine.jpg', title: 'Goddess Bhagavathy Shrine', titleMl: 'ദുർഗ്ഗാ ഭഗവതി സന്നിധി', category: 'Shrine' },
        { id: 11, url: '/images/gallery/nagaraja_shrine.jpg', title: 'Nagaraja Sarpa Kavu — Sacred Serpent Shrine', titleMl: 'നാഗരാജാവ് സർപ്പക്കാവ് സന്നിധി', category: 'Deity' },
        { id: 12, url: '/images/gallery/peacock_diya_decor.jpg', title: 'Chuttuvilakku & Deeparadhana', titleMl: 'ചുറ്റുവിളക്കും ദീപാരാധനയും', category: 'Rituals' },
        { id: 13, url: '/images/festivals/thaipusam.jpg', title: 'Grand Thaipusam Mahotsavam', titleMl: 'മഹാ തൈപ്പൂയ മഹോത്സവം', category: 'Festivals' },
        { id: 14, url: '/images/festivals/skanda_sashti.jpg', title: 'Skanda Sashti Celebrations', titleMl: 'സ്കന്ദ ഷഷ്ഠി വ്രതാഘോഷം', category: 'Festivals' },
        { id: 15, url: '/images/gallery/pooja_ritual_1.jpg', title: 'Sacred Pooja Ritual — Colourful Pookalam', titleMl: 'ദിവ്യ പൂജാ ചടങ്ങ് — വർണ്ണ പൂക്കളം', category: 'Rituals' },
        { id: 16, url: '/images/gallery/festival_devotees_1.jpg', title: 'Devotees at Festival Ceremony', titleMl: 'ഉത്സവ ചടങ്ങിൽ ഭക്തരും ആരാധകരും', category: 'Festivals' },
        { id: 17, url: '/images/gallery/deity_procession_1.jpg', title: 'Deity Procession with Sacred Incense', titleMl: 'ദേവ ഘോഷയാത്രയും ധൂപാർച്ചനയും', category: 'Festivals' },
        { id: 18, url: '/images/gallery/festival_gathering_1.jpg', title: 'Grand Festival — Devotees in Prayer', titleMl: 'മഹോത്സവ ഭക്ത സംഗമം — ഭജനവും ആരാധനയും', category: 'Festivals' },
        { id: 19, url: '/images/gallery/subramanya_vigraham.jpg', title: 'Presiding Sanctum Deity — Lord Murugan with Vel & Peacock', titleMl: 'ശ്രീ സുബ്രഹ്മണ്യസ്വാമി തിരുവിഗ്രഹം — വേലും ദിവ്യമയിലും', category: 'Deity' },
        { id: 20, url: '/images/gallery/temple_night_dwajam.jpg', title: 'Thurayilkunnu Temple Illuminated at Night — Sacred Dwajasthambham', titleMl: 'തുറയിൽക്കുന്ന് ക്ഷേത്രദർശനം — ദീപപ്രഭയിൽ കൊടിമരവും നടപ്പന്തലും', category: 'Architecture' },
        { id: 21, url: '/images/gallery/thurayilkunnu_pongala_wide.jpg', title: 'Thurayilkunnu Mahotsavam — Sacred Pongala Offering', titleMl: 'തുറയിൽക്കുന്ന് മഹോത്സവം — പുണ്യ പൊങ്കാല നിവേദ്യം', category: 'Festivals' },
        { id: 22, url: '/images/gallery/pongala_deepasthambham.jpg', title: 'Devotees Offering Pongala near Deepasthambham', titleMl: 'ദീപസ്തംഭ സന്നിധിയിൽ ഭക്തജനങ്ങളുടെ പൊങ്കാലയർപ്പണം', category: 'Festivals' },
        { id: 23, url: '/images/gallery/pongala_pookalam_ritual.jpg', title: 'Auspicious Floral Kolam & Festival Offerings', titleMl: 'മഹോത്സവ പൂക്കളവും പൂജാദ്രവ്യങ്ങളും', category: 'Rituals' },
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

    return (
        <div className="gallery-page">
            {/* ---- LUXURY INNER PAGE HERO ---- */}
            <PageHero
                title={t('gallery.hero_title')}
                subtitle={t('gallery.hero_subtitle')}
                badge={t('gallery.hero_badge')}
                bgImage="/images/banners/banner_gallery.jpg"
                currentPage={t('gallery.hero_title')}
            />


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
                                {isML ? (categoryLabels[cat]?.ml || cat) : (categoryLabels[cat]?.en || cat)}
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
                                                <span className="img-category">{isML ? (categoryLabels[image.category]?.ml || image.category) : image.category}</span>
                                                <h3 className="img-title">{isML && image.titleMl ? image.titleMl : image.title}</h3>
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
                            aria-label={isML ? "ചിത്രം അടയ്ക്കുക" : "Close lightbox"}
                        >
                            <X size={26} />
                        </motion.button>

                        <motion.button
                            className="lightbox-nav prev"
                            onClick={prevImage}
                            whileHover={{ scale: 1.15, x: -4 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={isML ? "മുമ്പത്തെ ചിത്രം" : "Previous image"}
                        >
                            <ChevronLeft size={36} />
                        </motion.button>

                        <motion.button
                            className="lightbox-nav next"
                            onClick={nextImage}
                            whileHover={{ scale: 1.15, x: 4 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={isML ? "അടുത്ത ചിത്രം" : "Next image"}
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
                            <img src={selectedImage.url} alt={isML && selectedImage.titleMl ? selectedImage.titleMl : selectedImage.title} />
                            <div className="lightbox-caption">
                                <h3>{isML && selectedImage.titleMl ? selectedImage.titleMl : selectedImage.title}</h3>
                                <p>{isML ? (categoryLabels[selectedImage.category]?.ml || selectedImage.category) : selectedImage.category}</p>
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
