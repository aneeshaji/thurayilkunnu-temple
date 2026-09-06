import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Sparkles, Compass, ArrowLeft, Heart, Sun } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import '../styles/NotFound.css';

const NotFound = () => {
    const { t } = useTranslation();

    return (
        <div className="not-found-page">
            <div className="not-found-container">
                <motion.div
                    className="not-found-card shine-hover"
                    initial={{ opacity: 0, scale: 0.92, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Glowing Sacred Emblem */}
                    <motion.div
                        className="not-found-emblem-halo"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    >
                        <div className="emblem-inner">ॐ</div>
                    </motion.div>

                    <span className="not-found-badge">
                        <Compass size={15} /> 404 — Sacred Sanctuary Error
                    </span>

                    <h1 className="not-found-num">404</h1>
                    <h2 className="not-found-title">Path Not Found</h2>

                    <p className="not-found-desc">
                        The page you are looking for has moved or does not exist in our temple archives. May Lord Subramanya Swamy guide your steps back to serenity.
                    </p>

                    {/* Quick navigation buttons */}
                    <div className="not-found-actions">
                        <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
                            <Link to="/" className="not-found-btn primary">
                                <Home size={18} />
                                <span>Return to Sanctum Home</span>
                            </Link>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
                            <Link to="/offerings" className="not-found-btn secondary">
                                <Heart size={18} />
                                <span>View Offerings & Poojas</span>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Helpful quick links */}
                    <div className="not-found-quick-links">
                        <Link to="/deities" className="quick-nav-pill">
                            <Sun size={14} /> Deities
                        </Link>
                        <Link to="/festivals" className="quick-nav-pill">
                            <Sparkles size={14} /> Festivals
                        </Link>
                        <Link to="/about" className="quick-nav-pill">
                            <Compass size={14} /> History
                        </Link>
                        <Link to="/contact" className="quick-nav-pill">
                            <ArrowLeft size={14} /> Contact
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;
