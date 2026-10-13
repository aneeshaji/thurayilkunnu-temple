export const SITE_URL = 'https://thurayilkunnutemple.com';
export const TEMPLE_NAME_EN = 'Thurayilkunnu Sree Subrahmanya Swami Temple';
export const TEMPLE_NAME_ML = 'തുറയിൽക്കുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം';
export const CONTACT_EMAIL = 'info@thurayilkunnutemple.com';
export const PHONE_PRIMARY = '+917994342205';
export const PHONE_SECONDARY = '+919072722205';

export const TEMPLE_ADDRESS = {
    streetAddress: 'Thurayilkunnu, Maru South, Alumkadavu P.O.',
    addressLocality: 'Karunagappally',
    addressRegion: 'Kerala',
    postalCode: '690573',
    addressCountry: 'IN'
};

export const TEMPLE_GEO = {
    latitude: '9.1258969',
    longitude: '76.5064915'
};

export const OPENING_HOURS = [
    {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '05:00',
        closes: '10:30'
    },
    {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '17:30',
        closes: '20:00'
    }
];

export const FACEBOOK_URL = 'https://www.facebook.com/thurayilkunnutemple/';
export const INSTAGRAM_URL = 'https://www.instagram.com/thurayilkunnutemple/';

export const SOCIAL_LINKS = [
    FACEBOOK_URL,
    INSTAGRAM_URL
];

export const MAPS_URL = 'https://maps.google.com/?q=9.1258969,76.5064915';
export const SITE_BRAND_NAME = 'Thurayilkunnu Temple';

export const buildWebSiteSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_BRAND_NAME,
    alternateName: [
        TEMPLE_NAME_EN,
        'തുറയിൽക്കുന്ന് ക്ഷേത്രം',
        'തുറയിൽക്കുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം',
        'Thurayilkunnu'
    ],
    url: `${SITE_URL}/`
});

export const buildSiteNavigationSchema = (isML = false) => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Main Navigation',
    itemListElement: [
        {
            '@type': 'SiteNavigationElement',
            position: 1,
            name: isML ? 'ക്ഷേത്ര ചരിത്രം' : 'History & Heritage',
            description: 'Sacred history and spiritual heritage of the temple',
            url: `${SITE_URL}/about`
        },
        {
            '@type': 'SiteNavigationElement',
            position: 2,
            name: isML ? 'ഉത്സവങ്ങൾ' : 'Festivals',
            description: 'Thaipusam Mahotsavam and Skanda Shashti celebrations',
            url: `${SITE_URL}/festivals`
        },
        {
            '@type': 'SiteNavigationElement',
            position: 3,
            name: isML ? 'വഴിപാടുകൾ' : 'Offerings & Vazhipadu',
            description: 'Traditional poojas, archana and vazhipadu booking',
            url: `${SITE_URL}/offerings`
        },
        {
            '@type': 'SiteNavigationElement',
            position: 4,
            name: isML ? 'പ്രതിഷ്ഠകൾ' : 'Deities',
            description: 'Lord Subrahmanya Swami and Upadevathas',
            url: `${SITE_URL}/deities`
        },
        {
            '@type': 'SiteNavigationElement',
            position: 5,
            name: isML ? 'ദർശന സമയവും വിവരങ്ങളും' : 'Darshan Timings & Contact',
            description: 'Temple opening hours, location and administration contact',
            url: `${SITE_URL}/contact`
        }
    ]
});

export const buildTempleSchema = ({ image, description, alternateName } = {}) => ({
    '@context': 'https://schema.org',
    '@type': 'HinduTemple',
    '@id': `${SITE_URL}/#temple`,
    name: TEMPLE_NAME_EN,
    alternateName: alternateName || TEMPLE_NAME_ML,
    description: description || 'An ancient Hindu temple dedicated to Lord Subrahmanya (Murugan) at Karunagappally, Kerala, renowned for its spiritual aura, daily traditional poojas, and grand festivals like Thaipusam and Skanda Shashti.',
    url: SITE_URL,
    image: image || `${SITE_URL}/og-image.jpg?v=5`,
    telephone: PHONE_PRIMARY,
    email: CONTACT_EMAIL,
    priceRange: '₹',
    publicAccess: true,
    hasMap: MAPS_URL,
    address: {
        '@type': 'PostalAddress',
        ...TEMPLE_ADDRESS
    },
    geo: {
        '@type': 'GeoCoordinates',
        ...TEMPLE_GEO
    },
    openingHoursSpecification: OPENING_HOURS,
    sameAs: SOCIAL_LINKS
});

export const buildBreadcrumbSchema = (items = []) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`
    }))
});

export const buildFaqSchema = (faqs = []) => ({
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

export const buildEventSchema = ({ name, description, startDate, endDate, image, url }) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    startDate,
    endDate: endDate || startDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
        '@type': 'Place',
        name: TEMPLE_NAME_EN,
        address: {
            '@type': 'PostalAddress',
            ...TEMPLE_ADDRESS
        }
    },
    image: image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : `${SITE_URL}/og-image.jpg?v=5`,
    organizer: {
        '@type': 'Organization',
        name: TEMPLE_NAME_EN,
        url: SITE_URL
    },
    url: url ? (url.startsWith('http') ? url : `${SITE_URL}${url}`) : SITE_URL
});
