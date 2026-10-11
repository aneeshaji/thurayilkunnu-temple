import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { SITE_URL, TEMPLE_NAME_EN, TEMPLE_NAME_ML, buildTempleSchema } from '../constants/site';

const SEO = ({
    title,
    description,
    keywords,
    image,
    url = '',
    schema,
    breadcrumbs,
    faqs,
    noIndex = false
}) => {
    const { i18n } = useTranslation();

    const siteName = TEMPLE_NAME_EN;
    const defaultDescription = "Ancient seat of divinity in Karunagappally, Kerala. Dedicated to Lord Subrahmanya (Murugan), offering spiritual grace, traditional tantric poojas, daily Panchangam, and grand festivals like Thaipusam & Skanda Shashti.";
    const defaultImage = `${SITE_URL}/og-image.jpg?v=5`;
    const defaultKeywords = "Thurayilkunnu Temple, Thurayilkunnu Sree Subrahmanya Swami Temple, Murugan Temple Kerala, Karunagappally Temple, Lord Subrahmanya, Thaipusam Mahotsavam, Skanda Shashti, Kavadiyattam, vazhipadu booking, Kerala Hindu temple, Alumkadavu";

    const finalTitle = title ? `${title} | ${siteName}` : `${siteName} | Karunagappally, Kerala`;
    const finalDescription = description || defaultDescription;
    const finalImage = image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : defaultImage;
    const finalKeywords = keywords || defaultKeywords;

    const isML = Boolean(i18n.language?.startsWith('ml'));
    const cleanPath = url === '/' || !url ? '' : (url.startsWith('/') ? url : `/${url}`);
    const baseUrl = `${SITE_URL}${cleanPath}`;

    // Standard canonical URL
    const canonicalUrl = isML ? `${baseUrl}?lng=ml` : baseUrl;
    const enUrl = `${baseUrl}?lng=en`;
    const mlUrl = `${baseUrl}?lng=ml`;
    const defaultUrl = baseUrl || `${SITE_URL}/`;

    // Build schemas collection
    const schemas = [];

    // Main schema (or custom passed schema)
    if (schema) {
        if (Array.isArray(schema)) {
            schemas.push(...schema);
        } else {
            schemas.push(schema);
        }
    } else {
        schemas.push(buildTempleSchema({
            image: finalImage,
            description: finalDescription,
            alternateName: isML ? TEMPLE_NAME_EN : TEMPLE_NAME_ML
        }));
    }

    // Breadcrumb schema
    if (breadcrumbs && breadcrumbs.length > 0) {
        const breadcrumbItems = [
            { name: isML ? 'ഹോം' : 'Home', url: '/' },
            ...breadcrumbs
        ];
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbItems.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
                item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`
            }))
        });
    }

    // FAQ schema
    if (faqs && faqs.length > 0) {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.a
                }
            }))
        });
    }

    return (
        <Helmet>
            <html lang={isML ? 'ml' : 'en'} />
            <title>{finalTitle}</title>
            <link rel="canonical" href={canonicalUrl} />
            <meta name="description" content={finalDescription} />
            <meta name="keywords" content={finalKeywords} />
            <meta name="robots" content={noIndex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />

            {/* Hreflang alternates */}
            <link rel="alternate" hrefLang="en" href={enUrl} />
            <link rel="alternate" hrefLang="ml" href={mlUrl} />
            <link rel="alternate" hrefLang="x-default" href={defaultUrl} />

            {/* Open Graph / Facebook / WhatsApp */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonicalUrl} />
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
            <link rel="image_src" href={finalImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@thurayilkunnutemple" />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={finalImage} />
            <meta name="twitter:image:alt" content={isML ? TEMPLE_NAME_ML : siteName} />

            {/* Structured Data (Schema.org) */}
            {schemas.map((s, idx) => (
                <script key={idx} type="application/ld+json">
                    {JSON.stringify(s)}
                </script>
            ))}
        </Helmet>
    );
};

export default SEO;
