import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { SITE_URL, TEMPLE_NAME_EN, TEMPLE_NAME_ML, buildTempleSchema } from '../constants/site';

const SEO = ({ title, description, keywords, image, url, schema, noIndex = false }) => {
    const { i18n } = useTranslation();

    const siteName = TEMPLE_NAME_EN;
    const defaultDescription = "Ancient seat of divinity in Karunagappally, Kerala. Home to Lord Subrahmanya, offering spiritual grace, traditional poojas, and grand festivals.";
    const defaultImage = `${SITE_URL}/og-image.jpg`;
    const defaultKeywords = "Thurayilkunnu Temple, Subrahmanya Swami, Karunagappally, Kerala Temple, Murugan, Thaipusam, Hindu Temple";

    const finalTitle = title ? `${title} | ${siteName}` : siteName;
    const finalDescription = description || defaultDescription;
    const finalImage = image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : defaultImage;
    const finalKeywords = keywords || defaultKeywords;

    const isML = Boolean(i18n.language?.startsWith('ml'));
    const baseUrl = `${SITE_URL}${url || ''}`;

    const withLang = (lang) => `${baseUrl}?lng=${lang}`;
    const currentUrl = withLang(isML ? 'ml' : 'en');

    const finalSchema = schema || buildTempleSchema({
        image: defaultImage,
        description: defaultDescription,
        alternateName: isML ? TEMPLE_NAME_EN : TEMPLE_NAME_ML
    });

    return (
        <Helmet>
            <html lang={i18n.language} />
            <title>{finalTitle}</title>
            <link rel="canonical" href={currentUrl} />
            <meta name="description" content={finalDescription} />
            <meta name="keywords" content={finalKeywords} />
            <meta name="robots" content={noIndex ? 'noindex, follow' : 'index, follow'} />

            {/* Hreflang — must mirror the alternates in sitemap.xml */}
            <link rel="alternate" hrefLang="en" href={withLang('en')} />
            <link rel="alternate" hrefLang="ml" href={withLang('ml')} />
            <link rel="alternate" hrefLang="x-default" href={withLang('en')} />

            {/* Open Graph / Facebook / WhatsApp */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={finalImage} />
            <meta property="og:image:secure_url" content={finalImage} />
            <meta property="og:image:type" content="image/jpeg" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={isML ? TEMPLE_NAME_ML : siteName} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content={isML ? 'ml_IN' : 'en_IN'} />
            <meta property="og:locale:alternate" content={isML ? 'en_IN' : 'ml_IN'} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@thurayilkunnutemple" />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={finalImage} />
            <meta name="twitter:image:alt" content={isML ? TEMPLE_NAME_ML : siteName} />

            {/* Structured Data */}
            <script type="application/ld+json">{JSON.stringify(finalSchema)}</script>
        </Helmet>
    );
};

export default SEO;
