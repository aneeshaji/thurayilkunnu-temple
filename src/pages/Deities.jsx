import { useTranslation } from 'react-i18next';
import '../styles/Deities.css';

const Deities = () => {
    const { t } = useTranslation();

    const deitiesData = [
        {
            name: t('deities.list.subramanya.name'),
            description: t('deities.list.subramanya.desc'),
            image: 'https://images.unsplash.com/photo-1582556511674-6028540c4974?q=80&w=2070&auto=format&fit=crop',
            main: true
        },
        {
            name: t('deities.list.ganapathy.name'),
            description: t('deities.list.ganapathy.desc'),
            image: 'https://images.unsplash.com/photo-1563204900-58971f1f129c?q=80&w=2070&auto=format&fit=crop',
            main: false
        },
        {
            name: t('deities.list.ayyappan.name'),
            description: t('deities.list.ayyappan.desc'),
            image: 'https://plus.unsplash.com/premium_photo-1678297270385-e2e0327fb189?q=80&w=2070&auto=format&fit=crop',
            main: false
        },
        {
            name: t('deities.list.nagaraja.name'),
            description: t('deities.list.nagaraja.desc'),
            image: 'https://images.unsplash.com/photo-1634547488053-a554287c800c?q=80&w=1974&auto=format&fit=crop',
            main: false
        }
    ];

    return (
        <div className="deities-page page-content">
            <div className="container">
                <h1 className="page-title">{t('deities.page_title')}</h1>
                <p className="page-intro">
                    {t('deities.page_intro')}
                </p>

                <div className="deities-grid">
                    {deitiesData.map((deity, index) => (
                        <div key={index} className={`deity-card ${deity.main ? 'main-deity' : ''}`}>
                            <div className="deity-image-wrapper">
                                <img src={deity.image} alt={deity.name} className="deity-image" />
                            </div>
                            <div className="deity-info">
                                <h2>{deity.name}</h2>
                                <p>{deity.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Deities;
