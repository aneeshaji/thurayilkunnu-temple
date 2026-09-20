import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Sparkles, Home } from 'lucide-react';
import '../styles/PageHero.css';

/**
 * Shared cinematic hero for all inner pages
 * @param {Object} props
 * @param {string} props.title - Page H1 title
 * @param {string} props.subtitle - Page descriptive subtitle
 * @param {string} props.badge - Pill badge label
 * @param {React.ReactNode} [props.badgeIcon] - Custom icon for badge (defaults to Sparkles)
 * @param {string} props.bgImage - Background image URL (e.g. /images/gallery/temple_exterior.jpg)
 * @param {string} [props.currentPage] - Breadcrumb current page name
 * @param {React.ReactNode} [props.children] - Optional extra content
 * @param {string} [props.className] - Optional extra class
 */
const PageHero = ({
    title,
    subtitle,
    badge,
    badgeIcon,
    bgImage,
    currentPage,
    children,
    className = ''
}) => {
    const { t } = useTranslation();

    return (
        <header
            className={`page-hero ${className}`}
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {/* Background zoom layer */}
            <div
                className="page-hero-bg"
                style={{ backgroundImage: `url(${bgImage})` }}
                aria-hidden="true"
            />

            {/* Cinematic multi-layer overlay with gold ambient flare */}
            <div className="page-hero-overlay" aria-hidden="true" />

            {/* Ambient floating gold orbs */}
            <div className="hero-orb hero-orb-1" aria-hidden="true" />
            <div className="hero-orb hero-orb-2" aria-hidden="true" />

            <div className="container page-hero-inner">
                <motion.div
                    className="page-hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Breadcrumb Trail */}
                    <div className="hero-breadcrumb">
                        <Link to="/" className="bc-home" title={t('navbar.home')}>
                            <Home size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                            <span>{t('navbar.home')}</span>
                        </Link>
                        <span className="bc-sep">/</span>
                        <span className="bc-current">{currentPage || title}</span>
                    </div>

                    {/* Badge Pill */}
                    {badge && (
                        <motion.span
                            className="hero-badge"
                            whileHover={{ scale: 1.04, y: -2 }}
                            transition={{ duration: 0.2 }}
                        >
                            {badgeIcon || <Sparkles size={14} />}
                            <span>{badge}</span>
                        </motion.span>
                    )}

                    {/* Main Title */}
                    <h1 className="hero-title">{title}</h1>

                    {/* Golden Accent Divider */}
                    <div className="hero-accent-line" aria-hidden="true">
                        <span className="line-bar" />
                        <span className="line-dot" />
                        <span className="line-thin" />
                    </div>

                    {/* Subtitle */}
                    {subtitle && <p className="hero-subtitle">{subtitle}</p>}

                    {/* Optional extra children (e.g. quick actions) */}
                    {children && <div className="hero-actions">{children}</div>}
                </motion.div>
            </div>

            {/* Subtle sacred bottom curve divider */}
            <div className="page-hero-wave" aria-hidden="true">
                <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
                    <path
                        d="M0,0 C320,45 680,60 1080,45 C1240,38 1360,20 1440,0 L1440,60 L0,60 Z"
                        fill="var(--color-bg-main, #FAFAF9)"
                    />
                </svg>
            </div>
        </header>
    );
};

export default PageHero;
