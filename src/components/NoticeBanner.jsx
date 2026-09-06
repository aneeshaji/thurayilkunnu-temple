import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Sparkles, X, ChevronRight, Volume2, Calendar } from 'lucide-react';
import NoticeModal from './NoticeModal';
import '../styles/NoticeBoard.css';

export const TEMPLE_NOTICES = [
    {
        id: 'skanda-sashti-2026',
        tag_en: 'Upcoming Festival',
        tag_ml: 'വിശേഷാൽ ഉത്സവം',
        tagType: 'gold',
        urgent: true,
        date_en: 'Nov 2026',
        date_ml: 'നവംബർ 2026',
        title_en: 'Skanda Sashti Mahotsavam & Special Palabhishekam',
        title_ml: 'സ്കന്ദ ഷഷ്ഠി മഹോത്സവവും വിശേഷാൽ അഭിഷേകങ്ങളും',
        desc_en: 'Devotees observe 6-day fasting for Lord Subramanya. Special Kavadi processions, Palabhishekam & Annadanam bookings are now open at the temple office.',
        desc_ml: 'ഭഗവാൻ സുബ്രഹ്മണ്യന്റെ തിരുമുമ്പിൽ 6 ദിവസത്തെ വ്രതാനുഷ്ഠാനങ്ങളും വിശേഷാൽ കാവടിയാട്ടവും നടക്കുന്നു. പyearsാലഭിഷേകം, അന്നദാനം എന്നിവ ബുക്കിംഗ് ആരംഭിച്ചു.',
        timings_en: 'Morning Nirmalyam 05:00 AM & Deeparadhana 06:45 PM',
        timings_ml: 'നിർമ്മാല്യ ദർശനം രാവിലെ 05:00 & ദീപാരാധന വൈകിട്ട് 06:45',
        actionLink: '/offerings',
        actionText_en: 'Book Pooja Online',
        actionText_ml: 'പൂജ ബുക്ക് ചെയ്യുക'
    },
    {
        id: 'pradosham-shiva',
        tag_en: 'Monthly Pooja',
        tag_ml: 'മാസപൂജ',
        tagType: 'amber',
        urgent: false,
        date_en: 'Every Trayodashi',
        date_ml: 'എല്ലാ ത്രയോദശിയും',
        title_en: 'Pradosha Sandhya Pooja & Mrityunjaya Homam',
        title_ml: 'പ്രദോഷ സന്ധ്യാപൂജയും മൃത്യുഞ്ജയ ഹോമവും',
        desc_en: 'Special evening Abhishekam and Mrityunjaya Archana conducted at the Lord Shiva (Mahadeva) shrine during Pradosha Sandhya.',
        desc_ml: 'പ്രദോഷ സന്ധ്യയിൽ ശ്രീ മഹാദേവന്റെ സന്നിധിയിൽ വിശേഷാൽ അഭിഷേകവും മൃത്യുഞ്ജയ അർച്ചനയും ദീപാരാധനയും നടക്കുന്നു.',
        timings_en: 'Evening 05:30 PM – 07:30 PM',
        timings_ml: 'വൈകിട്ട് 05:30 മുതൽ 07:30 വരെ',
        actionLink: '/offerings',
        actionText_en: 'View Shiva Offerings',
        actionText_ml: 'ശിവ വഴിപാടുകൾ കാണുക'
    },
    {
        id: 'chuttuvilakku-samarpanam',
        tag_en: 'Temple Renovation',
        tag_ml: 'ക്ഷേത്ര വികസനം',
        tagType: 'teal',
        urgent: false,
        date_en: 'Ongoing Drive',
        date_ml: 'നിലവിൽ തുടരുന്നു',
        title_en: 'Brass Chuttuvilakku & Sanctum Samarpanam',
        title_ml: 'പിച്ചള ചുറ്റുവിളക്ക് സമർപ്പണവും ക്ഷേത്ര നവീകരണവും',
        desc_en: 'Devotees wishing to sponsor traditional brass lamps (Chuttuvilakku) or contribute to sanctum preservation may contact the Devaswom office.',
        desc_ml: 'ക്ഷേത്രത്തിൽ ചുറ്റുവിളക്ക് സമർപ്പിക്കാനും ക്ഷേത്ര നവീകരണ ഫണ്ടിലേക്ക് സംഭാവന നൽകാനും ആഗ്രഹിക്കുന്ന ഭക്തർ ദേവസ്വം ഓഫീസുമായി ബന്ധപ്പെടുക.',
        timings_en: 'Office Hours: 08:00 AM – 06:00 PM',
        timings_ml: 'ഓഫീസ് സമയം: രാവിലെ 08:00 മുതൽ വൈകിട്ട് 06:00 വരെ',
        actionLink: '/contact',
        actionText_en: 'Contact Temple Office',
        actionText_ml: 'ഓഫീസുമായി ബന്ധപ്പെടുക'
    }
];

const NoticeBanner = () => {
    const { t, i18n } = useTranslation();
    const isMl = i18n.language === 'ml';

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDismissed, setIsDismissed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Check session dismissal
    useEffect(() => {
        const dismissed = sessionStorage.getItem('notice_banner_dismissed');
        if (dismissed === 'true') {
            setIsDismissed(true);
            document.documentElement.style.setProperty('--notice-banner-height', '0px');
        } else {
            document.documentElement.style.setProperty('--notice-banner-height', '36px');
        }
    }, []);

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
                            className="notice-banner-strip"
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
                                        aria-label="Dismiss notice bar"
                                        title="Dismiss"
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
