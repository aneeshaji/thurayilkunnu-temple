import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Image as ImageIcon, Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '../components/PageHero';
import SEO from '../components/SEO';
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
        'Festivals': { en: 'Festivals', ml: 'ഉത്സവങ്ങൾ' },
        'Rituals': { en: 'Rituals', ml: 'പൂജകളും ആചാരങ്ങളും' },
        'Architecture': { en: 'Temple & Sanctum', ml: 'ക്ഷേത്ര ദർശനം' },
        'Deity': { en: 'Deity', ml: 'തിരുവിഗ്രഹം' }
    };

    const galleryImages = [
        {
            id: 1,
            url: '/images/gallery/temple_night_dwajam.jpg',
            title: 'Thurayilkunnu Temple Illuminated at Night — Sacred Dwajasthambham',
            titleMl: 'തുറയിൽക്കുന്ന് ക്ഷേത്രദർശനം — ദീപപ്രഭയിൽ കൊടിമരവും നടപ്പന്തലും',
            category: 'Architecture'
        },
        {
            id: 2,
            url: '/images/gallery/chenda_melam_entrance.jpg',
            title: 'Traditional Chenda Melam at Temple Entrance Arch',
            titleMl: 'ക്ഷേത്ര കവാടത്തിൽ ഭക്തിനിർഭരമായ ചെണ്ടമേളം',
            category: 'Festivals'
        },
        {
            id: 3,
            url: '/images/gallery/nilavilakku_deepam_tiers.jpg',
            title: 'Sacred Nilavilakku Deepa Altar with Floral Offerings',
            titleMl: 'ദീപപ്രഭയിൽ നിലവിളക്കുകളും പുഷ്പാർച്ചനയും',
            category: 'Rituals'
        },
        {
            id: 4,
            url: '/images/gallery/hamsa_ratham_procession.jpg',
            title: 'Illuminated Hamsa Ratham (Swan Chariot) Festival Procession',
            titleMl: 'ദീപപ്രഭയിൽ അന്നവാഹന (ഹംസ) രഥഘോഷയാത്ര',
            category: 'Festivals'
        },
        {
            id: 5,
            url: '/images/gallery/subramanya_vigraham.jpg',
            title: 'Presiding Sanctum Deity — Lord Murugan with Vel & Peacock',
            titleMl: 'ശ്രീ സുബ്രഹ്മണ്യസ്വാമി തിരുവിഗ്രഹം — വേലും ദിവ്യമയിലും',
            category: 'Deity'
        },
        {
            id: 6,
            url: '/images/gallery/vilakku_pooja_ritual.jpg',
            title: 'Sacred Vilakku Pooja & Deeparadhana by Devotees',
            titleMl: 'ഭക്തജന സമർപ്പണമായ വിശുദ്ധ വിളക്കുപൂജയും പുഷ്പാർച്ചനയും',
            category: 'Rituals'
        },
        {
            id: 7,
            url: '/images/gallery/gajarajan_deepasthambham.jpg',
            title: 'Majestic Caparisoned Elephant at Sacred Deepasthambham',
            titleMl: 'ദീപസ്തംഭ സന്നിധിയിൽ ഗജവീരന്റെ സാന്നിധ്യം',
            category: 'Festivals'
        },
        {
            id: 8,
            url: '/images/gallery/illuminated_chariot_ratham.jpg',
            title: 'Illuminated Festival Chariot (Ratham) with Holy Vigraham',
            titleMl: 'ദീപാലങ്കാരങ്ങളാൽ പ്രഭാപൂരിതമായ രഥം',
            category: 'Festivals'
        },
        {
            id: 9,
            url: '/images/gallery/deepam_lamp_pyramid.jpg',
            title: 'Sacred Deepa Gopuram — Multi-tier Oil Lamp Offering',
            titleMl: 'ദീപഗോപുര സമർപ്പണവും നിലവിളക്കുകളും',
            category: 'Rituals'
        },
        {
            id: 10,
            url: '/images/gallery/night_elephant_ezhunnullathu.jpg',
            title: 'Grand Nighttime Elephant Ezhunnullathu with Nettipattam',
            titleMl: 'ദീപാലങ്കാരങ്ങളുടെ അകമ്പടിയോടെ രാത്രി ആനയെഴുന്നള്ളിപ്പ്',
            category: 'Festivals'
        },
        {
            id: 11,
            url: '/images/gallery/kombu_pattu_ensemble.jpg',
            title: 'Sacred Kombu Pattu & Temple Percussion Ensemble',
            titleMl: 'ക്ഷേത്രോത്സവത്തിന് നാദവിസ്മയമേകുന്ന കൊമ്പ് പറ്റും മേളവും',
            category: 'Festivals'
        },
        {
            id: 12,
            url: '/images/gallery/chenda_melam_artists.jpg',
            title: 'Vibrant Melam Performance by Traditional Percussionists',
            titleMl: 'മേളപ്രമാണിമാരുടെ താളവിസ്മയം തീർക്കുന്ന ചെണ്ടമേളം',
            category: 'Festivals'
        },
        {
            id: 13,
            url: '/images/gallery/ratham_night_procession.jpg',
            title: 'Night Ratham Procession with Devotees',
            titleMl: 'ഭക്തജന പങ്കാളിത്തത്തോടെ രാത്രി രഥഘോഷയാത്ര',
            category: 'Festivals'
        },
        {
            id: 14,
            url: '/images/gallery/thurayilkunnu_pongala_wide.jpg',
            title: 'Thurayilkunnu Mahotsavam — Sahasra Pongala Offering',
            titleMl: 'തുറയിൽക്കുന്ന് മഹോത്സവം — സഹസ്ര പൊങ്കാല നിവേദ്യം',
            category: 'Festivals'
        },
        {
            id: 15,
            url: '/images/gallery/pooja_ritual_1.jpg',
            title: 'Sacred Pooja Ritual in Temple Mandapam',
            titleMl: 'ക്ഷേത്ര മണ്ഡപത്തിലെ ദിവ്യ പൂജാ ചടങ്ങ്',
            category: 'Rituals'
        },
        {
            id: 16,
            url: '/images/gallery/elephant_ezhunnullathu.jpg',
            title: 'Grand Elephant Ezhunnullathu & Festive Procession',
            titleMl: 'ആനയെഴുന്നള്ളിപ്പും ഉത്സവ ഘോഷയാത്രയും',
            category: 'Festivals'
        },
        {
            id: 17,
            url: '/images/gallery/festival_night_procession.jpg',
            title: 'Night Procession Welcomed with Nilavilakku',
            titleMl: 'നിലവിളക്കോടെ രാത്രി ഉത്സവ വരവേൽപ്പ്',
            category: 'Festivals'
        },
        {
            id: 18,
            url: '/images/gallery/pongala_deepasthambham.jpg',
            title: 'Devotees Offering Pongala near Deepasthambham',
            titleMl: 'ദീപസ്തംഭ സന്നിധിയിൽ ഭക്തജനങ്ങളുടെ പൊങ്കാലയർപ്പണം',
            category: 'Festivals'
        },
        {
            id: 19,
            url: '/images/gallery/pongala_pookalam_ritual.jpg',
            title: 'Auspicious Floral Kolam & Festival Offerings',
            titleMl: 'മഹോത്സവ പൂക്കളവും പൂജാദ്രവ്യങ്ങളും',
            category: 'Rituals'
        },
        {
            id: 20,
            url: '/images/gallery/festival_devotees_1.jpg',
            title: 'Devotees Offering Prayers at Annual Festival',
            titleMl: 'ഉത്സവ വേളയിൽ ക്ഷേത്ര സന്നിധിയിൽ ഭക്തജന പ്രാർത്ഥന',
            category: 'Festivals'
        },
        {
            id: 21,
            url: '/images/gallery/deity_procession_1.jpg',
            title: 'Auspicious Deity Vigrahams & Holy Offerings',
            titleMl: 'ദിവ്യ വിഗ്രഹങ്ങളും വിശുദ്ധ നിവേദ്യങ്ങളും',
            category: 'Rituals'
        }
    ];

    const filterCategories = ['All', 'Festivals', 'Rituals', 'Architecture', 'Deity'];

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
            <SEO
                title={t('gallery.hero_title')}
                description={t('gallery.hero_subtitle')}
                url="/gallery"
                image="/images/gallery/temple_night_dwajam.jpg"
            />
            {/* ---- LUXURY INNER PAGE HERO ---- */}
            <PageHero
                title={t('gallery.hero_title')}
                subtitle={t('gallery.hero_subtitle')}
                badge={t('gallery.hero_badge')}
                bgImage="/images/banners/banner_gallery_v4.jpg"
                currentPage={t('navbar.gallery')}
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
