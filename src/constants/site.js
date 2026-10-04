export const SITE_URL = 'https://thurayilkunnutemple.com';
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

export const SOCIAL_LINKS = [
    'https://www.facebook.com/thurayilkunnutemple',
    'https://www.instagram.com/thurayilkunnutemple'
];

export const buildTempleSchema = ({ image, description, alternateName } = {}) => ({
    '@context': 'https://schema.org',
    '@type': 'HinduTemple',
    '@id': `${SITE_URL}/#temple`,
    name: 'Thurayilkunnu Sree Subramanya Swami Temple',
    alternateName: alternateName || 'തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം',
    description: description || 'An ancient temple dedicated to Lord Subramanya (Murugan) at Karunagappally, Kerala, serving devotees for generations with traditional rituals and spiritual grace.',
    url: SITE_URL,
    image: image || `${SITE_URL}/og-image.jpg`,
    telephone: PHONE_PRIMARY,
    email: CONTACT_EMAIL,
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
