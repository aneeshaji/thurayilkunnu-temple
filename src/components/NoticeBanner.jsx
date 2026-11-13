import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Sparkles, X, ChevronRight, Volume2, Calendar } from 'lucide-react';
import NoticeModal from './NoticeModal';
import '../styles/NoticeBoard.css';

const TEMPLE_NOTICES = [
    {
        id: 'skanda-purana-sathram-2026',
        tag_en: 'Next Major Festival',
        tag_ml: 'അടുത്ത പ്രധാന ഉത്സവം',
        tagType: 'gold',
        urgent: true,
        timings: true,
        date_en: '22 – 27 December 2026 (1202 Dhanu 07 – 12)',
        date_ml: '2026 ഡിസംബർ 22 മുതൽ 27 വരെ (1202 ധനു 07 - 12)',
        title_en: '4th Skanda Purana Vichara Sathram',
        title_ml: 'നാലാമത് സ്കന്ദപുരാണ വിചാര സത്രം',
        desc_en: 'Devotees wishing to sponsor morning breakfast (Prabhatha Bhojanam) or dinner (Rathri Bhojanam), or contribute rice, vegetables, groceries, and pooja offerings in advance are cordially requested to contact the Devaswom Office at 9072722205.',
        desc_ml: 'നാലാമത് സ്കന്ദപുരാണ വിചാര സത്രത്തോടനുബന്ധിച്ച് പ്രഭാതഭക്ഷണം, രാത്രിഭക്ഷണം എന്നിവ സ്പോൺസർ ചെയ്യുവാൻ ഉദ്ദേശിക്കുന്ന ഭക്തജനങ്ങളും അരി, പച്ചക്കറി, പലവ്യഞ്ജനങ്ങൾ, പൂജാ ദ്രവ്യങ്ങൾ തുടങ്ങിയവ മുൻകൂറായി സമർപ്പിക്കുവാൻ ആഗ്രഹിക്കുന്ന ഭക്തജനങ്ങളും എത്രയും പെട്ടെന്ന് ദേവസ്വം ഓഫീസുമായോ 9072722205 എന്ന നമ്പരിലോ ബന്ധപ്പെടുക.',
        timings_en: '6-day sacred Skanda Purana recitation, divine discourses, and daily Annadanam.',
        timings_ml: '6 ദിവസം നീണ്ടുനിൽക്കുന്ന സ്കന്ദപുരാണ പാരായണം, ആത്മീയ പ്രഭാഷണങ്ങൾ, ഭക്തിസാന്ദ്രമായ അന്നദാനം.',
        posterImage: '/images/festivals/skanda_purana_sathram_2026_poster.jpg',
        helpline: '9072722205',
        actionLink: '/festivals',
        actionText_en: 'View Festival Details',
        actionText_ml: 'ഉത്സവ വിവരങ്ങൾ കാണുക'
    }
];

const NoticeBanner = () => {
    const { t, i18n } = useTranslation();
    const isMl = i18n.language === 'ml';

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDismissed, setIsDismissed] = useState(() => {
        try {
            return sessionStorage.getItem('notice_banner_dismissed') === 'true';
        } catch {
            return false;
        }
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Sync banner height
    useEffect(() => {
        if (isDismissed) {
            document.documentElement.style.setProperty('--notice-banner-height', '0px');
        } else {
            document.documentElement.style.setProperty('--notice-banner-height', '36px');
        }
    }, [isDismissed]);

    // Auto cycle active notice every 6 seconds
    useEffect(() => {
        if (isDismissed || TEMPLE_NOTICES.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % TEMPLE_NOTICES.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [isDismissed]);

    const handleDismiss = () => {
        setIsDismissed(true);
        sessionStorage.setItem('notice_banner_dismissed', 'true');
        document.documentElement.style.setProperty('--notice-banner-height', '0px');
    };

    const currentNotice = TEMPLE_NOTICES[currentIndex] || TEMPLE_NOTICES[0];

    return (
        <>
            {/* Top Announcement Bar */}
            <aside aria-label="Temple Announcements">
                <AnimatePresence>
                    {!isDismissed && (
                        <motion.div
                            className={`notice-banner-strip ${isMl ? 'lang-ml' : ''}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="notice-banner-container">
                                {/* Left Badge */}
                                <div className="notice-banner-badge" onClick={() => setIsModalOpen(true)}>
                                    <span className="notice-bell-pulse">
                                        <Bell size={13} />
                                    </span>
                                    <span className="notice-badge-text">
                                        {t('notices.banner_badge')}
                                    </span>
                                </div>

                                {/* Center Scrolling Text with AnimatePresence */}
                                <div className="notice-banner-ticker" onClick={() => setIsModalOpen(true)}>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentNotice.id + (isMl ? '-ml' : '-en')}
                                            className="ticker-slide"
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -12 }}
                                            transition={{ duration: 0.35 }}
                                        >
                                            <span className="ticker-highlight">
                                                {isMl ? currentNotice.tag_ml : currentNotice.tag_en}:
                                            </span>
                                            <span className="ticker-headline">
                                                {isMl ? currentNotice.title_ml : currentNotice.title_en}
                                            </span>
                                            <span className="ticker-date-chip">
                                                <Calendar size={11} />
                                                {isMl ? currentNotice.date_ml : currentNotice.date_en}
                                            </span>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Right Actions */}
                                <div className="notice-banner-actions">
                                    <button
                                        className="notice-view-all-btn"
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        <span>{t('notices.view_all')}</span>
                                        <ChevronRight size={13} />
                                    </button>

                                    <button
                                        className="notice-dismiss-btn"
                                        onClick={handleDismiss}
                                        aria-label={isMl ? "അറിയിപ്പ് ബാർ മാറ്റുക" : "Dismiss notice bar"}
                                        title={isMl ? "മാറ്റുക" : "Dismiss"}
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </aside>

            {/* Reopen Floating Notice Bell Pill if dismissed */}
            {isDismissed && (
                <button
                    className="reopen-notice-bell-btn"
                    onClick={() => setIsModalOpen(true)}
                    title={t('notices.modal_title')}
                    aria-label="Open Temple Notice Board"
                >
                    <Bell size={15} />
                    <span className="bell-badge-count">{TEMPLE_NOTICES.length}</span>
                    <span className="reopen-label">{t('notices.short_label')}</span>
                </button>
            )}

            {/* Notice Board Full Modal */}
            <NoticeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                notices={TEMPLE_NOTICES}
            />
        </>
    );
};

export default NoticeBanner;
