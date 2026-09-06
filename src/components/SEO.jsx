import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEO = ({ title, description, keywords, image, url, schema }) => {
    const { i18n } = useTranslation();
    
    const siteName = "Thurayilkunnu Sree Subramanya Swami Temple";
    const defaultDescription = "Ancient seat of divinity in Karunagappally, Kerala. Home to Lord Subramanya, offering spiritual grace, traditional poojas, and grand festivals.";
    const BASE_DOMAIN = "https://thurayilkunnutemple.technobyteinnovations.in";
    const defaultImage = `${BASE_DOMAIN}/og-image.jpg`;
    const defaultKeywords = "Thurayilkunnu Temple, Subramanya Swami, Karunagappally, Kerala Temple, Murugan, Thaipusam, Hindu Temple";

    const finalTitle = title ? `${title} | ${siteName}` : siteName;
    const finalDescription = description || defaultDescription;
    const finalImage = image ? (image.startsWith('http') ? image : `${BASE_DOMAIN}${image}`) : defaultImage;
    const finalKeywords = keywords || defaultKeywords;
    const currentUrl = url ? `${BASE_DOMAIN}${url}` : BASE_DOMAIN;

    // Default Organization / HinduTemple Schema
    const baseSchema = {
        "@context": "https://schema.org",
        "@type": "HinduTemple",
        "name": siteName,
        "image": defaultImage,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Thurayilkunnu, Alumkadavu",
            "addressLocality": "Karunagappally",
            "addressRegion": "Kerala",
            "postalCode": "690573",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "9.0559",
            "longitude": "76.5356"
        },
        "url": BASE_DOMAIN,
        "telephone": "+919400788358",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "05:00",
                "closes": "10:30"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "17:30",
                "closes": "20:00"
            }
        ]
    };

    const finalSchema = schema || baseSchema;

    return (
        <Helmet>
            <html lang={i18n.language} />
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            <meta name="keywords" content={finalKeywords} />

            {/* Open Graph / Facebook / WhatsApp */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={finalImage} />
            <meta property="og:image:secure_url" content={finalImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={currentUrl} />
            <meta property="twitter:title" content={finalTitle} />
            <meta property="twitter:description" content={finalDescription} />
            <meta property="twitter:image" content={finalImage} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(finalSchema)}
            </script>
        </Helmet>
    );
};

export default SEO;
