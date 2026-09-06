import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Bell, ChevronRight, Phone, Heart, Sparkles, MapPin, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/NoticeBoard.css';

const NoticeModal = ({ isOpen, onClose, notices }) => {
    const { t, i18n } = useTranslation();
    const isMl = i18n.language === 'ml';

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
                                    <MapPin size={12} /> Thurayilkunnu Sree Subramanya Swami Temple
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

                                {notice.timings && (
                                    <div className="notice-timings-chip">
                                        ⏰ <strong>{isMl ? 'സമയം:' : 'Timings:'}</strong> {isMl ? notice.timings_ml : notice.timings_en}
                                    </div>
                                )}

                                {notice.actionLink && (
                                    <div className="notice-action-row">
                                        <Link to={notice.actionLink} className="notice-action-link" onClick={onClose}>
                                            <span>{isMl ? notice.actionText_ml : notice.actionText_en}</span>
                                            <ChevronRight size={14} />
                                        </Link>
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>

                    {/* Footer / Helpline */}
                    <div className="notice-modal-footer">
                        <div className="notice-footer-help">
                            <AlertCircle size={14} className="help-icon" />
                            <span>{t('notices.helpline_note')}</span>
                        </div>
                        <a href="tel:+919400788358" className="notice-call-btn">
                            <Phone size={13} />
                            <span>+91 94007 88358</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default NoticeModal;
