import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Star, Calendar, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { NAKSHATRAS } from '../utils/nakshatras';
import '../styles/NakshatraRecommender.css';

const NakshatraRecommender = ({ onSelectOffering }) => {
  const { i18n } = useTranslation();
  const isML = i18n.language === 'ml';

  // Default to Karthika (Lord Murugan's sacred star)
  const [selectedStarId, setSelectedStarId] = useState('karthika');

  const selectedStar = NAKSHATRAS.find((s) => s.id === selectedStarId) || NAKSHATRAS[2];

  const handleBookClick = () => {
    if (onSelectOffering && selectedStar) {
      onSelectOffering(selectedStar.recommendedOfferingId, selectedStar.id);
    }
  };

  return (
    <section className="nakshatra-recommender-section" id="nakshatra-finder">
      <div className="nakshatra-card-wrapper">
        <div className="nakshatra-glow-orb" aria-hidden="true" />
        
        {/* Header */}
        <div className="nakshatra-header">
          <div className="nakshatra-badge">
            <Sparkles size={16} className="nakshatra-sparkle-icon" />
            <span>{isML ? 'ജ്യോതിഷ വഴിപാട് മാർഗ്ഗദർശി' : 'Astrological Star Guide'}</span>
          </div>
          <h2 className="nakshatra-title">
            {isML ? 'നിങ്ങളുടെ ജന്മനക്ഷത്ര വഴിപാട് കണ്ടെത്താം' : 'Find Your Nakshatra Birth Star Vazhipadu'}
          </h2>
          <p className="nakshatra-subtitle">
            {isML
              ? 'നിങ്ങളുടെയോ കുടുംബാംഗങ്ങളുടെയോ മലയാള ജന്മനക്ഷത്രം തിരഞ്ഞെടുത്ത്, മുരുകന്റെയും ഉപദേവതകളുടെയും വിശേഷ വഴിപാടുകൾ അറിയൂ.'
              : 'Select your Malayalam birth star to view recommended rituals, sanctum deities, and auspicious blessings.'}
          </p>
        </div>

        {/* Controls: Selector Dropdown & Quick Star Chips */}
        <div className="nakshatra-selection-bar">
          <div className="star-select-box">
            <label htmlFor="nakshatra-select" className="star-select-label">
              <Star size={16} className="star-icon" />
              <span>{isML ? 'ജന്മനക്ഷത്രം തിരഞ്ഞെടുക്കുക:' : 'Select Your Birth Star:'}</span>
            </label>
            <select
              id="nakshatra-select"
              value={selectedStarId}
              onChange={(e) => setSelectedStarId(e.target.value)}
              className="star-dropdown"
            >
              {NAKSHATRAS.map((star) => (
                <option key={star.id} value={star.id}>
                  {star.ml} — {star.en}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Popular Star Pills */}
          <div className="popular-stars-strip">
            <span className="popular-label">{isML ? 'പ്രധാന നക്ഷത്രങ്ങൾ:' : 'Quick Select:'}</span>
            {['karthika', 'pooyam', 'vishakam', 'aayilyam', 'uthrattathi', 'rohini'].map((id) => {
              const s = NAKSHATRAS.find((item) => item.id === id);
              if (!s) return null;
              const isActive = s.id === selectedStarId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedStarId(s.id)}
                  className={`quick-star-btn ${isActive ? 'active' : ''}`}
                >
                  {isML ? s.ml : s.en.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Recommendation Result Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedStar.id}
            className="nakshatra-result-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div className="result-grid">
              {/* Left: Star Badge & Deity */}
              <div className="result-deity-pane">
                <div className="star-symbol-circle">
                  <span className="star-char">{selectedStar.ml.charAt(0)}</span>
                </div>
                <div className="star-title-group">
                  <span className="star-tag">{isML ? 'ജന്മനക്ഷത്രം' : 'Birth Star'}</span>
                  <h3 className="selected-star-name">
                    {isML ? selectedStar.ml : selectedStar.en}
                  </h3>
                  <div className="presiding-deity">
                    <ShieldCheck size={16} className="deity-icon" />
                    <span>{isML ? selectedStar.deityMl : selectedStar.deityEn}</span>
                  </div>
                </div>
              </div>

              {/* Center: Recommended Vazhipadu & Significance */}
              <div className="result-offering-pane">
                <div className="offering-pill">
                  <Heart size={14} className="heart-icon" />
                  <span>{isML ? 'നിർദ്ദേശിച്ച വിശേഷ വഴിപാട്' : 'Recommended Sanctum Vazhipadu'}</span>
                </div>
                <h4 className="recommended-offering-name">
                  {isML ? selectedStar.offeringNameMl : selectedStar.offeringNameEn}
                </h4>
                <p className="offering-significance">
                  {isML ? selectedStar.significanceMl : selectedStar.significanceEn}
                </p>
              </div>

              {/* Right: 1-Click Action CTA */}
              <div className="result-action-pane">
                <button
                  type="button"
                  onClick={handleBookClick}
                  className="book-recommended-btn"
                >
                  <span>{isML ? 'ഈ വഴിപാട് ബുക്ക് ചെയ്യാം' : 'Book This Offering'}</span>
                  <ArrowRight size={18} />
                </button>
                <span className="action-hint">
                  <Calendar size={13} />
                  <span>{isML ? 'ജന്മനാളിലെ പൂജ മുൻകൂട്ടി ബുക്ക് ചെയ്യാം' : 'Pre-book for your birthday'}</span>
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default NakshatraRecommender;
