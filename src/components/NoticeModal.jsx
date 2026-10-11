import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Bell, ChevronRight, Phone, Sparkles, MapPin, AlertCircle, Eye, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/NoticeBoard.css';

const NoticeModal = ({ isOpen, onClose, notices }) => {
    const { t, i18n } = useTranslation();
    const isMl = i18n.language === 'ml';
    const [enlargedPoster, setEnlargedPoster] = useState(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="notice-modal-backdrop" onClick={onClose}>
                <motion.div
                    className="notice-modal-card"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                >
                    {/* Header */}
                    <div className="notice-modal-header">
                        <div className="notice-modal-title-group">
                            <span className="notice-modal-icon-badge">
                                <Bell size={18} />
                            </span>
                            <div>
                                <h3>{t('notices.modal_title')}</h3>
                                <p className="notice-modal-subtitle">
                                    <MapPin size={12} /> Thurayilkunnu Sree Subrahmanya Swami Temple
                                </p>
                            </div>
                        </div>
                        <button className="notice-modal-close" onClick={onClose} aria-label="Close Notice Board">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Notice Items List */}
                    <div className="notice-modal-body">
                        {notices.map((notice) => (
                            <article key={notice.id} className={`notice-item-card ${notice.urgent ? 'urgent' : ''}`}>
                                <div className="notice-item-top">
                                    <span className={`notice-tag ${notice.tagType || 'info'}`}>
                                        <Sparkles size={12} />
                                        {isMl ? notice.tag_ml : notice.tag_en}
                                    </span>
                                    <span className="notice-date">
                                        <Calendar size={13} />
                                        {isMl ? notice.date_ml : notice.date_en}
                                    </span>
                                </div>

                                <h4 className="notice-item-title">
                                    {isMl ? notice.title_ml : notice.title_en}
                                </h4>

                                <p className="notice-item-desc">
                                    {isMl ? notice.desc_ml : notice.desc_en}
                                </p>

                                {notice.posterImage && (
                                    <div 
                                        className="notice-poster-card"
                                        onClick={() => setEnlargedPoster(notice.posterImage)}
                                        title={isMl ? "പോസ്റ്റർ വലുതാക്കി കാണാൻ ക്ലിക്ക് ചെയ്യുക" : "Click to view full poster"}
                                    >
                                        <div className="notice-poster-thumb-wrap">
                                            <img 
                                                src={notice.posterImage} 
                                                alt={isMl ? notice.title_ml : notice.title_en} 
                                                className="notice-poster-thumb"
                                            />
                                            <div className="notice-poster-zoom-pill">
                                                <Eye size={12} />
                                                <span>{isMl ? 'പോസ്റ്റർ കാണുക' : 'View Circular'}</span>
                                            </div>
                                        </div>
                                        <div className="notice-poster-meta">
                                            <span className="notice-poster-title">
                                                {isMl ? 'ഔദ്യോഗിക നോട്ടീസ് / സർക്കുലർ' : 'Official Festival Circular'}
                                            </span>
                                            <span className="notice-poster-hint">
                                                {isMl ? 'ക്ലിക്ക് ചെയ്ത് പൂർണ്ണ വലുപ്പത്തിൽ കാണുക' : 'Click to expand full size'}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {notice.timings && (
                                    <div className="notice-timings-chip">
                                        ⏰ <strong>{isMl ? 'സമയം:' : 'Timings:'}</strong> {isMl ? notice.timings_ml : notice.timings_en}
                                    </div>
                                )}

                                <div className="notice-action-row">
                                    {notice.helpline && (
                                        <a 
                                            href={`tel:+91${notice.helpline}`} 
                                            className="notice-card-call-btn"
                                            title={`Call Devaswom: ${notice.helpline}`}
                                        >
                                            <Phone size={13} />
                                            <span>{notice.helpline}</span>
                                        </a>
                                    )}
                                    {notice.actionLink && (
                                        <Link to={notice.actionLink} className="notice-action-link" onClick={onClose}>
                                            <span>{isMl ? notice.actionText_ml : notice.actionText_en}</span>
                                            <ChevronRight size={14} />
                                        </Link>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Footer / Helpline */}
                    <div className="notice-modal-footer">
                        <div className="notice-footer-help">
                            <AlertCircle size={14} className="help-icon" />
                            <span>{t('notices.helpline_note')}</span>
                        </div>
                        <a href="tel:+919072722205" className="notice-call-btn" title="Call Devaswom Office">
                            <Phone size={13} />
                            <span>+91 90727 22205</span>
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Lightbox for notice poster */}
            {enlargedPoster && (
                <div className="notice-lightbox-overlay" onClick={() => setEnlargedPoster(null)}>
                    <div className="notice-lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button 
                            className="notice-lightbox-close" 
                            onClick={() => setEnlargedPoster(null)}
                            aria-label="Close poster view"
                        >
                            <X size={20} />
                        </button>
                        <img 
                            src={enlargedPoster} 
                            alt="Festival Poster Full" 
                            className="notice-lightbox-img"
                        />
                        <div className="notice-lightbox-bar">
                            <a 
                                href={enlargedPoster} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="notice-lightbox-open-link"
                            >
                                <ExternalLink size={14} />
                                <span>{isMl ? 'പൂർണ്ണ രൂപത്തിൽ തുറക്കുക' : 'Open in New Tab'}</span>
                            </a>
                            <a 
                                href="tel:+919072722205" 
                                className="notice-lightbox-call"
                            >
                                <Phone size={14} />
                                <span>{isMl ? 'വിളിക്കുക: 9072722205' : 'Call 9072722205'}</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default NoticeModal;

