import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Sparkles, X, ChevronRight, Volume2, Calendar } from 'lucide-react';
import NoticeModal from './NoticeModal';
import '../styles/NoticeBoard.css';

const TEMPLE_NOTICES = [
    {
        id: 'skanda-sasthi-2026',
        tag_en: 'Next Major Festival',
        tag_ml: 'അടുത്ത പ്രധാന ഉത്സവം',
        tagType: 'gold',
        urgent: true,
        timings: true,
        date_en: '15 November 2026, Sunday (1202 Thulam 29)',
        date_ml: '2026 നവംബർ 15 ഞായറാഴ്ച (1202 തുലാം 29)',
        title_en: 'Skanda Shashti Mahotsavam',
        title_ml: 'സ്കന്ദഷഷ്ടി മഹോത്സവം',
        desc_en: 'Devotees wishing to offer Shashti Pooja, Temple Decoration (Kshethralankaram), Chenda Melam, etc. as sacred offerings are requested to contact the Devaswom Office immediately at 9072722205.',
        desc_ml: 'അന്നേ ദിവസം ഷഷ്ടി പൂജ, ക്ഷേത്രാലങ്കാരം, ചെണ്ടമേളം തുടങ്ങിയവ ഭഗവാന് നേർച്ചയായി സമർപ്പിക്കുവാൻ ആഗ്രഹിക്കുന്ന ഭക്തജനങ്ങൾ എത്രയും വേഗം ദേവസ്വം ഓഫീസുമായോ 9072722205 എന്ന നമ്പരിലോ ബന്ധപ്പെടുക.',
        timings_en: 'Special Shashti Pooja, Chenda Melam & Kshethralankaram throughout the auspicious day.',
        timings_ml: 'വിശേഷാൽ ഷഷ്ടി പൂജ, ചെണ്ടമേളം, ക്ഷേത്രാലങ്കാരം എന്നിവ അന്നേ ദിവസം ഭക്തിപൂർവ്വം നടക്കുന്നു.',
        posterImage: '/images/festivals/skanda_sashti_2026_poster.jpg',
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
