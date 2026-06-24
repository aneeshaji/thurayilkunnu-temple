import { Phone, MapPin, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../styles/TopBar.css';

const TopBar = () => {
    const { i18n, t } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="top-bar">
            <div className="top-bar-container">
                <div className="top-bar-left">
                    <span className="top-bar-item">
                        <MapPin size={14} className="icon" />
                        {t('footer.address').split(',')[0]}, Kerala
                    </span>
                </div>
                <div className="top-bar-right">
                    <span className="top-bar-item">
                        < Phone size={14} className="icon" />
                        +91 94007 88358
                    </span>
                    <span className="top-bar-divider">|</span>
                    <div className="top-bar-item language-switcher">
                        <Globe size={14} className="icon" />
                        <button
                            className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
                            onClick={() => changeLanguage('en')}
                        >
                            EN
                        </button>
                        <span className="lang-divider">/</span>
                        <button
                            className={`lang-btn ${i18n.language === 'ml' ? 'active' : ''}`}
                            onClick={() => changeLanguage('ml')}
                        >
                            ML
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
