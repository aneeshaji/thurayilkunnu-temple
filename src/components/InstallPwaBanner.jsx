import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, Sparkles, Share, PlusSquare } from 'lucide-react';
import '../styles/InstallPwaBanner.css';

const InstallPwaBanner = () => {
    const { t, i18n } = useTranslation();
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showBanner, setShowBanner] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [showIOSGuide, setShowIOSGuide] = useState(false);

    useEffect(() => {
        // Check if user previously dismissed in this session
        const dismissed = sessionStorage.getItem('pwa_banner_dismissed');
        if (dismissed) return;

        // Check if already in standalone/installed mode
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
        if (isStandalone) return;

        // Detect iOS
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIosDevice = /iphone|ipad|ipod/.test(userAgent) && !window.MSStream;
        setIsIOS(isIosDevice);

        // Listen for Chrome/Edge/Android beforeinstallprompt
        const handleBeforeInstall = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowBanner(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstall);

        // For iOS devices, show install helper if not standalone
        if (isIosDevice && !isStandalone) {
            const timer = setTimeout(() => {
                setShowBanner(true);
            }, 3000);
            return () => clearTimeout(timer);
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
        };
    }, []);

    const handleInstallClick = async () => {
        if (isIOS) {
            setShowIOSGuide(true);
            return;
        }

        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setShowBanner(false);
        }
        setDeferredPrompt(null);
    };

    const handleDismiss = () => {
        setShowBanner(false);
        sessionStorage.setItem('pwa_banner_dismissed', 'true');
    };

    if (!showBanner) return null;

    return (
        <aside aria-label="Install Temple App">
            <AnimatePresence>
                <motion.div
                    className="pwa-install-banner"
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 80, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                >
                    <div className="pwa-banner-content">
                        <div className="pwa-icon-holder">
                            <img src="/favicon.svg" alt="Thurayilkunnu Temple App" className="pwa-temple-emblem" />
                            <span className="pwa-sparkle-badge"><Sparkles size={10} /></span>
                        </div>

                        <div className="pwa-text-block">
                            <h4 className="pwa-title">{t('pwa.title')}</h4>
                            <p className="pwa-desc">{t('pwa.desc')}</p>
                        </div>

                        <div className="pwa-action-group">
                            <button
                                className="pwa-install-btn"
                                onClick={handleInstallClick}
                                aria-label="Install Temple App"
                            >
                                <Download size={14} />
                                <span>{t('pwa.install_btn')}</span>
                            </button>
                            <button
                                className="pwa-close-btn"
                                onClick={handleDismiss}
                                aria-label="Dismiss banner"
                                title="Dismiss"
                            >
                                <X size={15} />
                            </button>
                        </div>
                    </div>

                    {/* iOS Safari Installation Instruction Dropdown */}
                    {showIOSGuide && (
                        <motion.div
                            className="pwa-ios-guide"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <p className="ios-guide-step">
                                1. Tap the <strong>Share</strong> button <Share size={13} className="ios-icon" /> at the bottom of Safari.
                            </p>
                            <p className="ios-guide-step">
                                2. Scroll and tap <strong>Add to Home Screen</strong> <PlusSquare size={13} className="ios-icon" />.
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>
        </aside>
    );
};

export default InstallPwaBanner;
