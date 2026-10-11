import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, CreditCard, Clock, Info, ChevronRight, Tag, Flame, CheckCircle, CheckCircle2, X, MessageCircle, Calendar, User, Star, AlertCircle, Printer, ExternalLink, Phone } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import NakshatraRecommender from '../components/NakshatraRecommender';
import { NAKSHATRAS } from '../utils/nakshatras';
import '../styles/Offerings.css';

/* ---- ANIMATION VARIANTS ---- */
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

const cardVariant = {
    hidden: { opacity: 0, y: 35, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }
};

const inViewProps = (margin = '-60px') => ({
    initial: 'hidden',
    whileInView: 'show',
    viewport: { once: true, margin }
});

/* ---- ONLINE BOOKING PAUSED ----
 * Vazhipadu (offering) booking is not available on the website for the time
 * being. Offerings are listed for reference only and devotees are asked to
 * visit the temple office to book. Set this to `true` to bring the whole
 * booking modal (form, receipt, WhatsApp handoff) back online.
 */
const BOOKING_ENABLED = false;

const Offerings = () => {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language?.startsWith('ml') ? 'ml' : 'en';
    const isML = currentLang === 'ml';
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedOffering, setSelectedOffering] = useState(null);
    const [bookingReceipt, setBookingReceipt] = useState(null);

    // Devotee Booking Details
    const [devoteeName, setDevoteeName] = useState('');
    const [devoteeStar, setDevoteeStar] = useState('');
    const [poojaDate, setPoojaDate] = useState('');
    const [gotram, setGotram] = useState('');
    const [phone, setPhone] = useState('');
    const [prasadamMode, setPrasadamMode] = useState('counter');
    const [formError, setFormError] = useState('');

    // "Booking not available for now" toast, shown when a Book button is clicked
    const [pendingOffering, setPendingOffering] = useState(null);

    const offeringsData = [
        // ── ARCHANA / DAILY ──
        {
            id: 1,
            category: 'daily',
            nameEn: 'Archana',
            nameMl: 'അർച്ചന',
            name: isML ? 'അർച്ചന' : 'Archana',
            price: '₹15',
            descEn: 'Sacred chanting of the divine names of Lord Subrahmanya for blessings.',
            descMl: 'ഭഗവാൻ സുബ്രഹ്മണ്യന്റെ നാമങ്ങൾ ജപിച്ചു നടത്തുന്ന പൂജ.',
            description: isML ? 'ഭഗവാൻ സുബ്രഹ്മണ്യന്റെ നാമങ്ങൾ ജപിച്ചു നടത്തുന്ന പൂജ.' : 'Sacred chanting of the divine names of Lord Subrahmanya for blessings.',
            icon: <Heart size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Peace, health and spiritual growth',
            benefitMl: 'മനസ്സമാധാനം, ആരോഗ്യം, ആത്മീയ വളർച്ച'
        },
        {
            id: 2,
            category: 'abhishekam',
            nameEn: 'Jaladhara',
            nameMl: 'ജലധാര',
            name: isML ? 'ജലധാര' : 'Jaladhara',
            price: '₹15',
            descEn: 'Continuous stream of sacred water poured over the deity for purification.',
            descMl: 'ദേവനു വേണ്ടി പവിത്ര ജലം ധാരയായി അർപ്പിക്കുന്ന അഭിഷേകം.',
            description: isML ? 'ദേവനു വേണ്ടി പവിത്ര ജലം ധാരയായി അർപ്പിക്കുന്ന അഭിഷേകം.' : 'Continuous stream of sacred water poured over the deity for purification.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/palabhishekam.jpg',
            benefit: 'Purification and removal of sins',
            benefitMl: 'പാപമോചനം, ദോഷ ശമനം, ശുദ്ധി'
        },
        {
            id: 3,
            category: 'abhishekam',
            nameEn: 'Panneer Abhishekam',
            nameMl: 'പന്നീർ അഭിഷേകം',
            name: isML ? 'പന്നീർ അഭിഷേകം' : 'Panneer Abhishekam',
            price: '₹15',
            descEn: 'Rose water anointing of the deity for grace and fragrance.',
            descMl: 'ഗുലാബ്‌ ജലം ഉപയോഗിച്ചു ദേവനെ അഭിഷേകം ചെയ്യുന്ന ചടങ്ങ്.',
            description: isML ? 'ഗുലാബ്‌ ജലം ഉപയോഗിച്ചു ദേവനെ അഭിഷേകം ചെയ്യുന്ന ചടങ്ങ്.' : 'Rose water anointing of the deity for grace and fragrance.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/palabhishekam.jpg',
            benefit: 'Beauty, prosperity and divine grace',
            benefitMl: 'സൗന്ദര്യം, ഐശ്വര്യം, ദൈവകൃപ'
        },
        {
            id: 4,
            category: 'abhishekam',
            nameEn: 'Kiri Abhishekam',
            nameMl: 'കിരി അഭിഷേകം',
            name: isML ? 'കിരി അഭിഷേകം' : 'Kiri Abhishekam',
            price: '₹15',
            descEn: 'Tender coconut water anointing for cool divine blessings.',
            descMl: 'ഇളനീർ ഉപയോഗിച്ചുള്ള ദേവ അഭിഷേകം.',
            description: isML ? 'ഇളനീർ ഉപയോഗിച്ചുള്ള ദേവ അഭിഷേകം.' : 'Tender coconut water anointing for cool divine blessings.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/palabhishekam.jpg',
            benefit: 'Health, coolness and divine favour',
            benefitMl: 'ആരോഗ്യം, ശീതളത, ദൈവ അനുഗ്രഹം'
        },
        {
            id: 5,
            category: 'abhishekam',
            nameEn: 'Panchaabhishekam',
            nameMl: 'പഞ്ചഭിഷേകം',
            name: isML ? 'പഞ്ചഭിഷേകം' : 'Panchaabhishekam',
            price: '₹60',
            priceMl: '(20-ൽ ഒന്ന്) ₹60',
            descEn: 'Five-fold sacred liquid anointment with milk, curd, ghee, honey and sugar.',
            descMl: 'പാൽ, തൈര്, നെയ്യ്, തേൻ, ശർക്കര എന്നിവ ഉപയോഗിച്ചുള്ള പഞ്ചഭിഷേകം.',
            description: isML ? 'പാൽ, തൈര്, നെയ്യ്, തേൻ, ശർക്കര എന്നിവ ഉപയോഗിച്ചുള്ള പഞ്ചഭിഷേകം.' : 'Five-fold sacred liquid anointment with milk, curd, ghee, honey and sugar.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/palabhishekam.jpg',
            benefit: 'Fulfilment of all wishes and complete wellbeing',
            benefitMl: 'സർവ്വ കാര്യ സിദ്ധി, ഐശ്വര്യ വൃദ്ധി'
        },
        {
            id: 6,
            category: 'abhishekam',
            nameEn: 'Bhasmabhishekam',
            nameMl: 'ഭസ്മഭിഷേകം',
            name: isML ? 'ഭസ്മഭിഷേകം' : 'Bhasmabhishekam',
            price: '₹30',
            descEn: 'Sacred ash anointing for spiritual purity, health, and serenity.',
            descMl: 'ആരോഗ്യത്തിനും ആത്മീയ ശുദ്ധിക്കും വേണ്ടിയുള്ള ഭസ്മഭിഷേകം.',
            description: isML ? 'ആരോഗ്യത്തിനും ആത്മീയ ശുദ്ധിക്കും വേണ്ടിയുള്ള ഭസ്മഭിഷേകം.' : 'Sacred ash anointing for spiritual purity, health, and serenity.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/palabhishekam.jpg',
            benefit: 'Spiritual purity and removal of sins',
            benefitMl: 'പാപമോചനം, ആത്മീയ ശുദ്ധി, ഭക്തിവർദ്ധന'
        },
        {
            id: 7,
            category: 'daily',
            nameEn: 'Narunna Mala',
            nameMl: 'നറുങ്ങ മാല',
            name: isML ? 'നറുങ്ങ മാല' : 'Narunna Mala',
            price: '₹20',
            descEn: 'Fragrant flower garland offered to the deity for auspiciousness.',
            descMl: 'ദേവനു സുഗന്ധ പുഷ്പ മാല അർപ്പിക്കുന്ന വഴിപാട്.',
            description: isML ? 'ദേവനു സുഗന്ധ പുഷ്പ മാല അർപ്പിക്കുന്ന വഴിപാട്.' : 'Fragrant flower garland offered to the deity for auspiciousness.',
            icon: <Heart size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Auspiciousness and divine blessings',
            benefitMl: 'മംഗളം, ദൈവ അനുഗ്രഹം'
        },
        {
            id: 8,
            category: 'daily',
            nameEn: 'Pushpanjali',
            nameMl: 'പുഷ്പഞ്ജലി',
            name: isML ? 'പുഷ്പഞ്ജലി' : 'Pushpanjali',
            price: '₹25',
            descEn: 'Offering of flowers and mantras for mental peace and prosperity.',
            descMl: 'മനോശാന്തിക്കായി പൂക്കളും മന്ത്രങ്ങളും സമർപ്പിക്കുന്നു.',
            description: isML ? 'മനോശാന്തിക്കായി പൂക്കളും മന്ത്രങ്ങളും സമർപ്പിക്കുന്നു.' : 'Offering of flowers and mantras for mental peace and prosperity.',
            icon: <Heart size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Peace, health and family prosperity',
            benefitMl: 'മനസ്സമാധാനം, ആരോഗ്യം, കുടുംബ ഐശ്വര്യം'
        },
        {
            id: 9,
            category: 'daily',
            nameEn: 'Madusudhana Archana',
            nameMl: 'മദ്ദൂദ്ദകർച്ചന',
            name: isML ? 'മദ്ദൂദ്ദകർച്ചന' : 'Madusudhana Archana',
            price: '₹30',
            descEn: 'Special archana invoking divine protection and blessings.',
            descMl: 'ദൈവ സംരക്ഷണത്തിനും അനുഗ്രഹത്തിനുമുള്ള പ്രത്യേക അർച്ചന.',
            description: isML ? 'ദൈവ സംരക്ഷണത്തിനും അനുഗ്രഹത്തിനുമുള്ള പ്രത്യേക അർച്ചന.' : 'Special archana invoking divine protection and blessings.',
            icon: <Heart size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Divine protection and blessings',
            benefitMl: 'ദൈവ സംരക്ഷണം, ആത്മീയ ഉന്നതി'
        },
        {
            id: 10,
            category: 'daily',
            nameEn: 'Sree Kavacha Manthrarchana',
            nameMl: 'ശ്രീ കവച മന്ത്രർച്ചന',
            name: isML ? 'ശ്രീ കവച മന്ത്രർച്ചന' : 'Sree Kavacha Manthrarchana',
            price: '₹30',
            descEn: 'Protective mantra archana for shielding from evil and adversity.',
            descMl: 'ദോഷങ്ങളിൽ നിന്ന് സംരക്ഷണം നൽകുന്ന കവച മന്ത്ര അർച്ചന.',
            description: isML ? 'ദോഷങ്ങളിൽ നിന്ന് സംരക്ഷണം നൽകുന്ന കവച മന്ത്ര അർച്ചന.' : 'Protective mantra archana for shielding from evil and adversity.',
            icon: <Heart size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Protection from evil and hardships',
            benefitMl: 'ദോഷ ശമനം, ശത്രുദോഷ നിവാരണം'
        },
        {
            id: 11,
            category: 'daily',
            nameEn: 'Subrahmanya Kavacha Manthrarchana',
            nameMl: 'സുബ്രഹ്മണ്യ കവച മന്ത്രർച്ചന',
            name: isML ? 'സുബ്രഹ്മണ്യ കവച മന്ത്രർച്ചന' : 'Subrahmanya Kavacha Manthrarchana',
            price: '₹30',
            descEn: 'Lord Subrahmanya protective mantra archana for devotees.',
            descMl: 'ശ്രീ സുബ്രഹ്മണ്യ ഭഗവാന്റെ കവച മന്ത്ര അർച്ചന.',
            description: isML ? 'ശ്രീ സുബ്രഹ്മണ്യ ഭഗവാന്റെ കവച മന്ത്ര അർച്ചന.' : 'Lord Subrahmanya protective mantra archana for devotees.',
            icon: <Heart size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: "Subrahmanya's divine shield and grace",
            benefitMl: 'ദൈവ കൃപ, ദോഷ ശമനം, ഐശ്വര്യം'
        },
        {
            id: 12,
            category: 'daily',
            nameEn: 'Koora Jantha Archana',
            nameMl: 'കൂര ജന്ത അർച്ചന',
            name: isML ? 'കൂര ജന്ത അർച്ചന' : 'Koora Jantha Archana',
            price: '₹30',
            descEn: 'Special archana for removal of planetary afflictions and karmic debts.',
            descMl: 'ഗ്രഹദോഷ നിവാരണത്തിനുള്ള വിശേഷ അർച്ചന.',
            description: isML ? 'ഗ്രഹദോഷ നിവാരണത്തിനുള്ള വിശേഷ അർച്ചന.' : 'Special archana for removal of planetary afflictions and karmic debts.',
            icon: <Heart size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Removal of planetary afflictions',
            benefitMl: 'ഗ്രഹദോഷ ശമനം, ജന്മദോഷ നിവാരണം'
        },
        {
            id: 13,
            category: 'daily',
            nameEn: 'Vidya Thadagal Manthrarchana',
            nameMl: 'വിദ്യ തടഗ്ഗൽ മന്ത്രർച്ചന',
            name: isML ? 'വിദ്യ തടഗ്ഗൽ മന്ത്രർച്ചന' : 'Vidya Thadagal Manthrarchana',
            price: '₹30',
            descEn: 'Mantra archana for clearing obstacles in education and learning.',
            descMl: 'വിദ്യാർജ്ജനത്തിലെ തടസ്സങ്ങൾ നീക്കുന്ന മന്ത്ര അർച്ചന.',
            description: isML ? 'വിദ്യാർജ്ജനത്തിലെ തടസ്സങ്ങൾ നീക്കുന്ന മന്ത്ര അർച്ചന.' : 'Mantra archana for clearing obstacles in education and learning.',
            icon: <Heart size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Success in education and learning',
            benefitMl: 'വിദ്യ, ബുദ്ധിശക്തി, ഏകാഗ്രത'
        },
        {
            id: 14,
            category: 'daily',
            nameEn: 'Subrahmanya Moola Manthrarchana',
            nameMl: 'സുബ്രഹ്മണ്യ മൂല മന്ത്രർച്ചന',
            name: isML ? 'സുബ്രഹ്മണ്യ മൂല മന്ത്രർച്ചന' : 'Subrahmanya Moola Manthrarchana',
            price: '₹30',
            descEn: 'Root mantra archana of Lord Subrahmanya for powerful divine blessings.',
            descMl: 'ശ്രീ സുബ്രഹ്മണ്യ ഭഗവാന്റെ മൂലമന്ത്ര അർച്ചന.',
            description: isML ? 'ശ്രീ സുബ്രഹ്മണ്യ ഭഗവാന്റെ മൂലമന്ത്ര അർച്ചന.' : 'Root mantra archana of Lord Subrahmanya for powerful divine blessings.',
            icon: <Heart size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Supreme divine blessings of Lord Subrahmanya',
            benefitMl: 'ദൈവ കൃപ, കാര്യ സിദ്ധി, ദോഷ ശമനം'
        },
        {
            id: 15,
            category: 'daily',
            nameEn: 'Ashtothara Manthrarchana',
            nameMl: 'അഷ്ടോത്തര മന്ത്രർച്ചന',
            name: isML ? 'അഷ്ടോത്തര മന്ത്രർച്ചന' : 'Ashtothara Manthrarchana',
            price: '₹30',
            descEn: '108-name mantra archana of Lord Subrahmanya for complete wellbeing.',
            descMl: 'ഭഗവാൻ സുബ്രഹ്മണ്യന്റെ 108 നാമ മന്ത്ര അർച്ചന.',
            description: isML ? 'ഭഗവാൻ സുബ്രഹ്മണ്യന്റെ 108 നാമ മന്ത്ര അർച്ചന.' : '108-name mantra archana of Lord Subrahmanya for complete wellbeing.',
            icon: <Heart size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Complete wellbeing and divine blessings',
            benefitMl: 'സർവ്വ ഐശ്വര്യം, ദൈവ കൃപ'
        },
        {
            id: 16,
            category: 'daily',
            nameEn: 'Ahora Manthrarchana',
            nameMl: 'അഹോര മന്ത്രർച്ചന',
            name: isML ? 'അഹോര മന്ത്രർച്ചന' : 'Ahora Manthrarchana',
            price: '₹30',
            descEn: 'Day-long continuous mantra archana for sustained divine grace.',
            descMl: 'ദിവസം മുഴുവൻ നടത്തുന്ന മന്ത്ര അർച്ചന.',
            description: isML ? 'ദിവസം മുഴുവൻ നടത്തുന്ന മന്ത്ര അർച്ചന.' : 'Day-long continuous mantra archana for sustained divine grace.',
            icon: <Heart size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Continuous divine grace throughout the day',
            benefitMl: 'ദൈവ അനുഗ്രഹം, ദോഷ ശമനം'
        },
        {
            id: 17,
            category: 'daily',
            nameEn: 'Neelakanda Shukla Manthrarchana',
            nameMl: 'നീലകണ്ഠ ശുക്ല മന്ത്രർച്ചന',
            name: isML ? 'നീലകണ്ഠ ശുക്ല മന്ത്രർച്ചന' : 'Neelakanda Shukla Manthrarchana',
            price: '₹50',
            descEn: 'Powerful Neelakanda mantra archana for healing and protection.',
            descMl: 'രോഗശമനത്തിനും സംരക്ഷണത്തിനുമുള്ള നീലകണ്ഠ ശുക്ല മന്ത്ര അർച്ചന.',
            description: isML ? 'രോഗശമനത്തിനും സംരക്ഷണത്തിനുമുള്ള നീലകണ്ഠ ശുക്ല മന്ത്ര അർച്ചന.' : 'Powerful Neelakanda mantra archana for healing and protection.',
            icon: <Heart size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Healing, protection and divine grace',
            benefitMl: 'രോഗ ശമനം, ദോഷ നിവാരണം'
        },
        {
            id: 18,
            category: 'daily',
            nameEn: 'Subrahmanya Sahasranama Archana',
            nameMl: 'സുബ്രഹ്മണ്യ സഹസ്രനാമർച്ചന',
            name: isML ? 'സുബ്രഹ്മണ്യ സഹസ്രനാമർച്ചന' : 'Subrahmanya Sahasranama Archana',
            price: '₹50',
            descEn: '1000-name archana of Lord Subrahmanya for supreme blessings.',
            descMl: 'ഭഗവാൻ സുബ്രഹ്മണ്യന്റെ 1000 നാമ അർച്ചന.',
            description: isML ? 'ഭഗവാൻ സുബ്രഹ്മണ്യന്റെ 1000 നാമ അർച്ചന.' : '1000-name archana of Lord Subrahmanya for supreme blessings.',
            icon: <Heart size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Supreme divine blessings of Lord Subrahmanya',
            benefitMl: 'സർവ്വ ദോഷ ശമനം, ആത്മ ഉന്നതി'
        },
        {
            id: 19,
            category: 'daily',
            nameEn: 'Swarna Vaan Archana',
            nameMl: 'സ്വർണ്ണ വൻ അർച്ചന',
            name: isML ? 'സ്വർണ്ണ വൻ അർച്ചന' : 'Swarna Vaan Archana',
            price: '₹50',
            descEn: 'Golden archana for prosperity, success and auspiciousness.',
            descMl: 'ഐശ്വര്യം, വിജയം, മംഗളം എന്നിവക്കുള്ള സ്വർണ്ണ അർച്ചന.',
            description: isML ? 'ഐശ്വര്യം, വിജയം, മംഗളം എന്നിവക്കുള്ള സ്വർണ്ണ അർച്ചന.' : 'Golden archana for prosperity, success and auspiciousness.',
            icon: <Heart size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Prosperity, success and auspiciousness',
            benefitMl: 'ഐശ്വര്യം, കാര്യ സിദ്ധി, വിജയം'
        },
        {
            id: 20,
            category: 'daily',
            nameEn: 'Mruthyunjaya Manthrarchana',
            nameMl: 'മൃതൂഞ്ജ മന്ത്രർച്ചന',
            name: isML ? 'മൃതൂഞ്ജ മന്ത്രർച്ചന' : 'Mruthyunjaya Manthrarchana',
            price: '₹50',
            descEn: 'Powerful death-conquering mantra archana for health and longevity.',
            descMl: 'ആരോഗ്യത്തിനും ദീർഘായുസ്സിനുമുള്ള മൃതൂഞ്ജ മന്ത്ര അർച്ചന.',
            description: isML ? 'ആരോഗ്യത്തിനും ദീർഘായുസ്സിനുമുള്ള മൃതൂഞ്ജ മന്ത്ര അർച്ചന.' : 'Powerful death-conquering mantra archana for health and longevity.',
            icon: <Heart size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Good health and long life',
            benefitMl: 'ആരോഗ്യം, ദീർഘായുസ്സ്, ആത്മ ശക്തി'
        },
        {
            id: 21,
            category: 'daily',
            nameEn: 'Sreya Sahodara Manthrarchana',
            nameMl: 'ശ്രേയ സഹോദ മന്ത്രർച്ചന',
            name: isML ? 'ശ്രേയ സഹോദ മന്ത്രർച്ചന' : 'Sreya Sahodara Manthrarchana',
            price: '₹60',
            descEn: 'Sibling harmony mantra archana for family peace and unity.',
            descMl: 'കുടുംബ ഐക്യത്തിനും സഹോദര സൗഹൃദത്തിനുമുള്ള മന്ത്ര അർച്ചന.',
            description: isML ? 'കുടുംബ ഐക്യത്തിനും സഹോദര സൗഹൃദത്തിനുമുള്ള മന്ത്ര അർച്ചന.' : 'Sibling harmony mantra archana for family peace and unity.',
            icon: <Heart size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Family unity and sibling harmony',
            benefitMl: 'കുടുംബ ഐക്യം, സഹോദര ഭ്രാതൃഭാവം'
        },
        // ── PUSHPANJALI ──
        {
            id: 22,
            category: 'daily',
            nameEn: 'Mruthyunjaya Pushpanjali',
            nameMl: 'മൃതൂഞ്ജ പുഷ്പഞ്ജലി',
            name: isML ? 'മൃതൂഞ്ജ പുഷ്പഞ്ജലി' : 'Mruthyunjaya Pushpanjali',
            price: '₹30',
            descEn: 'Mruthyunjaya flower offering for health and freedom from disease.',
            descMl: 'ആരോഗ്യത്തിനും രോഗ മുക്തിക്കുമുള്ള പുഷ്പഞ്ജലി.',
            description: isML ? 'ആരോഗ്യത്തിനും രോഗ മുക്തിക്കുമുള്ള പുഷ്പഞ്ജലി.' : 'Mruthyunjaya flower offering for health and freedom from disease.',
            icon: <Heart size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Health and freedom from disease',
            benefitMl: 'രോഗ ശമനം, ആരോഗ്യ വൃദ്ധി'
        },
        {
            id: 23,
            category: 'daily',
            nameEn: 'Ekaika Pushpanjali',
            nameMl: 'ഐകൈക പുഷ്പഞ്ജലി',
            name: isML ? 'ഐകൈക പുഷ്പഞ്ജലി' : 'Ekaika Pushpanjali',
            price: '₹30',
            descEn: 'Individual flower offering for personal blessings and wish fulfilment.',
            descMl: 'ആഗ്രഹ സാഫല്യത്തിനുള്ള ഏകൈക പുഷ്പഞ്ജലി.',
            description: isML ? 'ആഗ്രഹ സാഫല്യത്തിനുള്ള ഏകൈക പുഷ്പഞ്ജലി.' : 'Individual flower offering for personal blessings and wish fulfilment.',
            icon: <Heart size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Personal blessings and wish fulfilment',
            benefitMl: 'ആഗ്രഹ സാഫല്യം, ദൈവ അനുഗ്രഹം'
        },
        {
            id: 24,
            category: 'daily',
            nameEn: 'Shatru Samhara Pushpanjali',
            nameMl: 'ശ്ശേട്ടൻ സൂക്ഷ്ണ പുഷ്പഞ്ജലി',
            name: isML ? 'ശ്ശേട്ടൻ സൂക്ഷ്ണ പുഷ്പഞ്ജലി' : 'Shatru Samhara Pushpanjali',
            price: '₹30',
            descEn: 'Powerful pushpanjali for divine protection against enemies and negativity.',
            descMl: 'ശത്രുദോഷ ശമനത്തിനുള്ള വിശേഷ പുഷ്പഞ്ജലി.',
            description: isML ? 'ശത്രുദോഷ ശമനത്തിനുള്ള വിശേഷ പുഷ്പഞ്ജലി.' : 'Powerful pushpanjali for divine protection against enemies and negativity.',
            icon: <Heart size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Protection from enemies and negative forces',
            benefitMl: 'ശത്രുദോഷ ശമനം, ഭയ നിവാരണം'
        },
        {
            id: 25,
            category: 'daily',
            nameEn: 'Vidyatan Pushpanjali',
            nameMl: 'വിദ്യ ടൻ പുഷ്പഞ്ജലി',
            name: isML ? 'വിദ്യ ടൻ പുഷ്പഞ്ജലി' : 'Vidyatan Pushpanjali',
            price: '₹30',
            descEn: 'Flower offering for educational success and academic excellence.',
            descMl: 'വിദ്യ, ഏകാഗ്രത, ജ്ഞാനം ഇവക്കുള്ള പുഷ്പഞ്ജലി.',
            description: isML ? 'വിദ്യ, ഏകാഗ്രത, ജ്ഞാനം ഇവക്കുള്ള പുഷ്പഞ്ജലി.' : 'Flower offering for educational success and academic excellence.',
            icon: <Heart size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Educational success and academic excellence',
            benefitMl: 'വിദ്യ, ഏകാഗ്രത, ജ്ഞാനം'
        },
        {
            id: 26,
            category: 'daily',
            nameEn: 'Swarna Pushpanjali',
            nameMl: 'സ്വർണ്ണ പുഷ്പഞ്ജലി',
            name: isML ? 'സ്വർണ്ണ പുഷ്പഞ്ജലി' : 'Swarna Pushpanjali',
            price: '₹30',
            descEn: 'Golden flower offering for wealth, abundance and prosperity.',
            descMl: 'ഐശ്വര്യം, സമൃദ്ധി, ധനലാഭം ഇവക്കുള്ള സ്വർണ്ണ പുഷ്പഞ്ജലി.',
            description: isML ? 'ഐശ്വര്യം, സമൃദ്ധി, ധനലാഭം ഇവക്കുള്ള സ്വർണ്ണ പുഷ്പഞ്ജലി.' : 'Golden flower offering for wealth, abundance and prosperity.',
            icon: <Heart size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Wealth, abundance and prosperity',
            benefitMl: 'ഐശ്വര്യം, ധന ലാഭം, കുടുംബ ഐക്യം'
        },
        {
            id: 27,
            category: 'daily',
            nameEn: 'Kaigga Pushpanjali',
            nameMl: 'കൈഗ്ഗ പുഷ്പഞ്ജലി',
            name: isML ? 'കൈഗ്ഗ പുഷ്പഞ്ജലി' : 'Kaigga Pushpanjali',
            price: '₹30',
            descEn: 'Auspicious pushpanjali for all-round divine grace.',
            descMl: 'സർവ്വ ഐശ്വര്യത്തിനുള്ള പ്രത്യേക പുഷ്പഞ്ജലി.',
            description: isML ? 'സർവ്വ ഐശ്വര്യത്തിനുള്ള പ്രത്യേക പുഷ്പഞ്ജലി.' : 'Auspicious pushpanjali for all-round divine grace.',
            icon: <Heart size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'All-round divine grace and auspiciousness',
            benefitMl: 'ദൈവ കൃപ, മംഗളം, ഐശ്വര്യം'
        },
        // ── SPECIAL ──
        {
            id: 28,
            category: 'special',
            nameEn: 'Ganapathy Pooja',
            nameMl: 'ഗണപതി പൂജ',
            name: isML ? 'ഗണപതി പൂജ' : 'Ganapathy Pooja',
            price: '₹50',
            descEn: 'Special pooja for Lord Ganesha to remove obstacles and grant new beginnings.',
            descMl: 'തടസ്സ നിവാരണത്തിനും പുതിയ ആരംഭത്തിനും ഗണപതി പൂജ.',
            description: isML ? 'തടസ്സ നിവാരണത്തിനും പുതിയ ആരംഭത്തിനും ഗണപതി പൂജ.' : 'Special pooja for Lord Ganesha to remove obstacles and grant new beginnings.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/ganapathy_homam.jpg',
            benefit: 'Obstacle removal and auspicious new beginnings',
            benefitMl: 'വിഘ്ന നിവാരണം, കാര്യ സിദ്ധി'
        },
        {
            id: 29,
            category: 'special',
            nameEn: 'Niranjanana Vilakku',
            nameMl: 'നീരഞ്ജന വിളക്ക്',
            name: isML ? 'നീരഞ്ജന വിളക്ക്' : 'Niranjanana Vilakku',
            price: '₹20',
            priceMl: 'നൂലിക്ക + ₹20',
            descEn: 'Sacred lamp offering for light, prosperity and divine grace.',
            descMl: 'ദൈവ അനുഗ്രഹത്തിനും ഐശ്വര്യത്തിനും ദീപ നിവേദ്യം.',
            description: isML ? 'ദൈവ അനുഗ്രഹത്തിനും ഐശ്വര്യത്തിനും ദീപ നിവേദ്യം.' : 'Sacred lamp offering for light, prosperity and divine grace.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Light, prosperity and divine grace',
            benefitMl: 'ദൈവ കൃപ, ഐശ്വര്യം, ആരോഗ്യം'
        },
        {
            id: 30,
            category: 'special',
            nameEn: 'Poonool',
            nameMl: 'പൂണ്ണൂൾ',
            name: isML ? 'പൂണ്ണൂൾ' : 'Poonool',
            price: '₹60',
            priceMl: '(20-ൽ ഒന്ന്) ₹60',
            descEn: 'Sacred thread offering for purity, discipline and spiritual merit.',
            descMl: 'ആത്മ ശുദ്ധിക്കും ഭക്തി ഫലത്തിനും പൂണ്ണൂൾ നിവേദ്യം.',
            description: isML ? 'ആത്മ ശുദ്ധിക്കും ഭക്തി ഫലത്തിനും പൂണ്ണൂൾ നിവേദ്യം.' : 'Sacred thread offering for purity, discipline and spiritual merit.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Spiritual purity and sacred merit',
            benefitMl: 'ആത്മ ശുദ്ധി, ഭക്തി ഫലം'
        },
        {
            id: 31,
            category: 'special',
            nameEn: 'Ney Vilakku',
            nameMl: 'നെയ്യ് വിളക്ക്',
            name: isML ? 'നെയ്യ് വിളക്ക്' : 'Ney Vilakku',
            price: '₹60',
            priceMl: '(20-ൽ ഒന്ന്) ₹60',
            descEn: 'Pure ghee lamp offering for radiance, knowledge and prosperity.',
            descMl: 'ജ്ഞാനത്തിനും ഐശ്വര്യത്തിനും ശുദ്ധ നെയ്യ് ദീപ അർപ്പണം.',
            description: isML ? 'ജ്ഞാനത്തിനും ഐശ്വര്യത്തിനും ശുദ്ധ നെയ്യ് ദീപ അർപ്പണം.' : 'Pure ghee lamp offering for radiance, knowledge and prosperity.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Knowledge, radiance and prosperity',
            benefitMl: 'ജ്ഞാനം, ഐശ്വര്യം, ദോഷ ശമനം'
        },
        // ── POOJA / ABHISHEKAM ──
        {
            id: 32,
            category: 'special',
            nameEn: 'Aayilyam Pooja',
            nameMl: 'ആയില്യം പൂജ',
            name: isML ? 'ആയില്യം പൂജ' : 'Aayilyam Pooja',
            price: '₹50',
            descEn: 'Special pooja on Ayilyam nakshatra day for serpent blessings.',
            descMl: 'ആയില്യം നക്ഷത്ര ദിനത്തിൽ നടത്തുന്ന വിശേഷ പൂജ.',
            description: isML ? 'ആയില്യം നക്ഷത്ര ദിനത്തിൽ നടത്തുന്ന വിശേഷ പൂജ.' : 'Special pooja on Ayilyam nakshatra day for serpent blessings.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Serpent deity blessings and family welfare',
            benefitMl: 'സർപ്പ ദോഷ ശമനം, കുടുംബ ഐശ്വര്യം'
        },
        {
            id: 33,
            category: 'special',
            nameEn: 'Gurupoo Pooja',
            nameMl: 'ഗുരുപൂ പൂജ',
            name: isML ? 'ഗുരുപൂ പൂജ' : 'Gurupoo Pooja',
            price: '₹50',
            descEn: 'Pooja for Guru blessings, wisdom and academic success.',
            descMl: 'ജ്ഞാനം, ഗുരു കൃപ, പഠന വിജയം ഇവക്കുള്ള ഗുരുപൂ പൂജ.',
            description: isML ? 'ജ്ഞാനം, ഗുരു കൃപ, പഠന വിജയം ഇവക്കുള്ള ഗുരുപൂ പൂജ.' : 'Pooja for Guru blessings, wisdom and academic success.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Guru blessings and academic success',
            benefitMl: 'ഗുരു കൃപ, ജ്ഞാനം, വിദ്യ'
        },
        {
            id: 34,
            category: 'special',
            nameEn: 'Sheebu Pooja',
            nameMl: 'ശ്ലൈ്‌ബ്ദ്ദ പൂജ',
            name: isML ? 'ശ്ലൈ്‌ബ്ദ്ദ പൂജ' : 'Sheebu Pooja',
            price: '₹50',
            descEn: 'Auspicious pooja for peace and divine blessings.',
            descMl: 'ദൈവ അനുഗ്രഹത്തിനുള്ള ഐശ്വര്യ പൂജ.',
            description: isML ? 'ദൈവ അനുഗ്രഹത്തിനുള്ള ഐശ്വര്യ പൂജ.' : 'Auspicious pooja for peace and divine blessings.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Peace and divine blessings',
            benefitMl: 'ദൈവ കൃപ, മനശ്ശാന്തി, ഐശ്വര്യം'
        },
        {
            id: 35,
            category: 'special',
            nameEn: 'Vahanappoo Pooja',
            nameMl: 'വാഹനപ്പൂ പൂജ',
            name: isML ? 'വാഹനപ്പൂ പൂജ' : 'Vahanappoo Pooja',
            price: '₹50',
            descEn: 'Vehicle pooja for safety and accident-free travel.',
            descMl: 'യാത്ര സുരക്ഷക്കും വാഹന ദോഷ ശമനത്തിനും വഴിപാട്.',
            description: isML ? 'യാത്ര സുരക്ഷക്കും വാഹന ദോഷ ശമനത്തിനും വഴിപാട്.' : 'Vehicle pooja for safety and accident-free travel.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Vehicle safety and accident-free travel',
            benefitMl: 'വാഹന സുരക്ഷ, ദോഷ ശമനം'
        },
        {
            id: 36,
            category: 'special',
            nameEn: 'Tu Vilere',
            nameMl: 'ടൂ വിലേര്',
            name: isML ? 'ടൂ വിലേര്' : 'Tu Vilere',
            price: '₹100',
            descEn: 'Special lamp offering for divine light and blessings.',
            descMl: 'ദൈവ അനുഗ്രഹത്തിനും ഐശ്വര്യത്തിനുമുള്ള ദീപ ചടങ്ങ്.',
            description: isML ? 'ദൈവ അനുഗ്രഹത്തിനും ഐശ്വര്യത്തിനുമുള്ള ദീപ ചടങ്ങ്.' : 'Special lamp offering for divine light and blessings.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Divine light and blessings',
            benefitMl: 'ദൈവ കൃപ, ഐശ്വര്യം'
        },
        {
            id: 37,
            category: 'abhishekam',
            nameEn: 'Ksheera Vilere',
            nameMl: 'ക്ഷീര വിലേര്',
            name: isML ? 'ക്ഷീര വിലേര്' : 'Ksheera Vilere',
            price: '₹150',
            descEn: 'Milk-based special ritual offering for prosperity and grace.',
            descMl: 'ഐശ്വര്യത്തിനും ദൈവ കൃപക്കും ക്ഷീര ചടങ്ങ്.',
            description: isML ? 'ഐശ്വര്യത്തിനും ദൈവ കൃപക്കും ക്ഷീര ചടങ്ങ്.' : 'Milk-based special ritual offering for prosperity and grace.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/palabhishekam.jpg',
            benefit: 'Prosperity and divine grace',
            benefitMl: 'ഐശ്വര്യം, ദൈവ കൃപ, ആരോഗ്യം'
        },
        {
            id: 38,
            category: 'abhishekam',
            nameEn: 'Pala Pooja',
            nameMl: 'പാല പൂജ',
            name: isML ? 'പാല പൂജ' : 'Pala Pooja',
            price: '₹100',
            descEn: 'Sacred milk pooja for blessings and spiritual merit.',
            descMl: 'പാൽ ഉപയോഗിച്ചുള്ള ആചരണ പൂജ.',
            description: isML ? 'പാൽ ഉപയോഗിച്ചുള്ള ആചരണ പൂജ.' : 'Sacred milk pooja for blessings and spiritual merit.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/palabhishekam.jpg',
            benefit: 'Blessings and spiritual merit',
            benefitMl: 'ദൈവ കൃപ, ആത്മ ശുദ്ധി'
        },
        {
            id: 39,
            category: 'abhishekam',
            nameEn: 'Subrahmanya Pooja',
            nameMl: 'സുബ്രഹ്മണ്യ പൂജ',
            name: isML ? 'സുബ്രഹ്മണ്യ പൂജ' : 'Subrahmanya Pooja',
            price: '₹125',
            descEn: 'Special pooja dedicated to Lord Subrahmanya for comprehensive blessings.',
            descMl: 'ഭഗവാൻ സുബ്രഹ്മണ്യനു സമർപ്പിക്കുന്ന വിശേഷ പൂജ.',
            description: isML ? 'ഭഗവാൻ സുബ്രഹ്മണ്യനു സമർപ്പിക്കുന്ന വിശേഷ പൂജ.' : 'Special pooja dedicated to Lord Subrahmanya for comprehensive blessings.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Complete divine blessings of Lord Subrahmanya',
            benefitMl: 'സർവ്വ ദൈവ കൃപ, കാര്യ സിദ്ധി'
        },
        {
            id: 40,
            category: 'special',
            nameEn: 'Bharakali Pooja',
            nameMl: 'ഭദ്രകാളി പൂജ',
            name: isML ? 'ഭദ്രകാളി പൂജ' : 'Bharakali Pooja',
            price: '₹250',
            descEn: 'Powerful Bhadrakali pooja for protection and removal of negative forces.',
            descMl: 'ശ്രേഷ്ഠ ഭദ്രകാളി ദേവിക്ക് നടത്തുന്ന ദോഷ ശമന പൂജ.',
            description: isML ? 'ശ്രേഷ്ഠ ഭദ്രകാളി ദേവിക്ക് നടത്തുന്ന ദോഷ ശമന പൂജ.' : 'Powerful Bhadrakali pooja for protection and removal of negative forces.',
            icon: <Flame size={20} />,
            image: '/images/offerings/ganapathy_homam.jpg',
            benefit: 'Protection and removal of negative forces',
            benefitMl: 'ദോഷ ശമനം, ശത്രു നിവാരണം, ഐശ്വര്യം'
        },
        {
            id: 41,
            category: 'special',
            nameEn: 'Thudum Olam',
            nameMl: 'തുടും ഒലം',
            price: '₹500',
            priceMl: '(വിശേഷ ദിവസം ₹125)',
            descEn: 'Special percussion offering on auspicious occasions.',
            descMl: 'വിശേഷ ദിവസങ്ങളിൽ ആചരണ തുടും ഒലം.',
            description: isML ? 'വിശേഷ ദിവസങ്ങളിൽ ആചരണ തുടും ഒലം.' : 'Special percussion offering on auspicious occasions.',
            name: isML ? 'തുടും ഒലം' : 'Thudum Olam',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Auspiciousness on special occasions',
            benefitMl: 'മംഗളം, ദൈവ കൃപ'
        },
        {
            id: 42,
            category: 'special',
            nameEn: 'Second Kavadi Pooja',
            nameMl: 'സ്കന്ദ കാവടി പൂജ',
            name: isML ? 'സ്കന്ദ കാവടി പൂജ' : 'Skanda Kavadi Pooja',
            price: '₹40',
            descEn: 'Sacred Kavadi pooja offered to Lord Subrahmanya.',
            descMl: 'ഭഗവാൻ സ്കന്ദനു സമർപ്പിക്കുന്ന കാവടി പൂജ.',
            description: isML ? 'ഭഗവാൻ സ്കന്ദനു സമർപ്പിക്കുന്ന കാവടി പൂജ.' : 'Sacred Kavadi pooja offered to Lord Subrahmanya.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Divine grace and fulfilment of vows',
            benefitMl: 'ദൈവ കൃപ, നേർച്ച ഫലം'
        },
        {
            id: 43,
            category: 'special',
            nameEn: 'Kaadu Payasam',
            nameMl: 'കാടു പായസം',
            name: isML ? 'കാടു പായസം' : 'Kaadu Payasam',
            price: '₹60',
            descEn: 'Forest honey payasam offering for wish fulfilment.',
            descMl: 'ആഗ്രഹ സാഫല്യത്തിനുള്ള വനതേൻ പായസ നിവേദ്യം.',
            description: isML ? 'ആഗ്രഹ സാഫല്യത്തിനുള്ള വനതേൻ പായസ നിവേദ്യം.' : 'Forest honey payasam offering for wish fulfilment.',
            icon: <Tag size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Wish fulfilment and prosperity',
            benefitMl: 'ആഗ്രഹ സാഫല്യം, ഐശ്വര്യം'
        },
        {
            id: 44,
            category: 'special',
            nameEn: 'Kadupaayasam',
            nameMl: 'കടുപ്പായസം',
            name: isML ? 'കടുപ്പായസം' : 'Kadupaayasam',
            price: '₹100',
            descEn: 'Special thick payasam offering for divine grace.',
            descMl: 'ദൈവ കൃപക്കുള്ള ഘന പായസ നിവേദ്യം.',
            description: isML ? 'ദൈവ കൃപക്കുള്ള ഘന പായസ നിവേദ്യം.' : 'Special thick payasam offering for divine grace.',
            icon: <Tag size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Divine grace and prosperity',
            benefitMl: 'ദൈവ കൃപ, ഐശ്വര്യം'
        },
        {
            id: 45,
            category: 'special',
            nameEn: 'Paloda Payasam',
            nameMl: 'പൽഒദ പായസം',
            name: isML ? 'പൽഒദ പായസം' : 'Paloda Payasam',
            price: '₹75',
            descEn: 'Sacred milk-based payasam offering to the deity.',
            descMl: 'ദേവനു സമർപ്പിക്കുന്ന പൽഒദ പായസ നിവേദ്യം.',
            description: isML ? 'ദേവനു സമർപ്പിക്കുന്ന പൽഒദ പായസ നിവേദ്യം.' : 'Sacred milk-based payasam offering to the deity.',
            icon: <Tag size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Divine grace and wellbeing',
            benefitMl: 'ദൈവ കൃപ, ആരോഗ്യം'
        },
        {
            id: 46,
            category: 'prasadam',
            nameEn: 'Chevvoth Payasam',
            nameMl: 'ചെവ്വൊഥ് പായസം',
            name: isML ? 'ചെവ്വൊഥ് പായസം' : 'Chevvoth Payasam',
            price: '₹150',
            descEn: 'Traditional payasam offered on auspicious days for blessings.',
            descMl: 'ശുഭ ദിനങ്ങളിൽ അർപ്പിക്കുന്ന ആചരണ പായസ നിവേദ്യം.',
            description: isML ? 'ശുഭ ദിനങ്ങളിൽ അർപ്പിക്കുന്ന ആചരണ പായസ നിവേദ്യം.' : 'Traditional payasam offered on auspicious days for blessings.',
            icon: <Tag size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Auspicious blessings and prosperity',
            benefitMl: 'ഐശ്വര്യം, ദൈവ കൃപ'
        },
        {
            id: 47,
            category: 'special',
            nameEn: 'Nettipattam',
            nameMl: 'നെറ്റിപ്പട്ടം',
            name: isML ? 'നെറ്റിപ്പട്ടം' : 'Nettipattam',
            price: '₹100',
            descEn: 'Elephant headgear offering symbolising grandeur and divine blessings.',
            descMl: 'ഗജ ആഭരണം, ആഡ്യത്വം, ദൈവ കൃപ ഇവക്കുള്ള ആചരണം.',
            description: isML ? 'ഗജ ആഭരണം, ആഡ്യത്വം, ദൈവ കൃപ ഇവക്കുള്ള ആചരണം.' : 'Elephant headgear offering symbolising grandeur and divine blessings.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Grandeur and divine blessings',
            benefitMl: 'ഐശ്വര്യം, ദൈവ കൃപ'
        },
        {
            id: 48,
            category: 'prasadam',
            nameEn: 'Ksheera Pooja Payasam',
            nameMl: 'ക്ഷേത്ര നിവേദ്യ പായസം',
            name: isML ? 'ക്ഷേത്ര നിവേദ്യ പായസം' : 'Ksheera Pooja Payasam',
            price: '₹100',
            descEn: 'Temple-prepared sacred payasam prasadam for devotees.',
            descMl: 'ക്ഷേത്രത്തിൽ തയ്യാറാക്കുന്ന നിവേദ്യ പായസ പ്രസാദം.',
            description: isML ? 'ക്ഷേത്രത്തിൽ തയ്യാറാക്കുന്ന നിവേദ്യ പായസ പ്രസാദം.' : 'Temple-prepared sacred payasam prasadam for devotees.',
            icon: <Tag size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Sacred prasadam and blessings',
            benefitMl: 'ദൈവ കൃപ, ഐശ്വര്യം'
        },
        {
            id: 49,
            category: 'prasadam',
            nameEn: 'Panchamrutham',
            nameMl: 'പഞ്ചാമൃതം',
            name: isML ? 'പഞ്ചാമൃതം' : 'Panchamrutham',
            price: '₹100',
            descEn: 'Divine five-ingredient sacred fruit nectar pleasing to Lord Subrahmanya.',
            descMl: 'അഞ്ച് മധുരവസ്തുക്കൾ ചേർത്തുള്ള വിശിഷ്ട നിവേദ്യം.',
            description: isML ? 'അഞ്ച് മധുരവസ്തുക്കൾ ചേർത്തുള്ള വിശിഷ്ട നിവേദ്യം.' : 'Divine five-ingredient sacred fruit nectar pleasing to Lord Subrahmanya.',
            icon: <Tag size={20} />,
            image: '/images/offerings/palabhishekam.jpg',
            benefit: 'Divine 5-ingredient fruit offering for good health',
            benefitMl: 'ഉദരരോഗ ശമനം, ശാരീരിക സൗഖ്യം, ആയുർവർദ്ധന'
        },
        {
            id: 50,
            category: 'prasadam',
            nameEn: 'Ksheeradasam Panchaamrutham',
            nameMl: 'ക്ഷേരദസം പഞ്ചാമൃതം',
            name: isML ? 'ക്ഷേരദസം പഞ്ചാമൃതം' : 'Ksheeradasam Panchaamrutham',
            price: '₹75',
            descEn: 'Milk-based panchamrutham for health and divine grace.',
            descMl: 'ആരോഗ്യത്തിനും ദൈവ കൃപക്കും ക്ഷേരദ പഞ്ചാമൃതം.',
            description: isML ? 'ആരോഗ്യത്തിനും ദൈവ കൃപക്കും ക്ഷേരദ പഞ്ചാമൃതം.' : 'Milk-based panchamrutham for health and divine grace.',
            icon: <Tag size={20} />,
            image: '/images/offerings/palabhishekam.jpg',
            benefit: 'Health and divine grace',
            benefitMl: 'ആരോഗ്യം, ദൈവ കൃപ'
        },
        {
            id: 51,
            category: 'prasadam',
            nameEn: 'Nenthu Payasam',
            nameMl: 'നെന്ത്ര പായസം',
            name: isML ? 'നെന്ത്ര പായസം' : 'Nenthu Payasam',
            price: '₹100',
            descEn: 'Banana payasam offering for wish fulfilment and auspiciousness.',
            descMl: 'ആഗ്രഹ സാഫല്യത്തിനും മംഗളത്തിനും നേന്ത്ര പായസ നിവേദ്യം.',
            description: isML ? 'ആഗ്രഹ സാഫല്യത്തിനും മംഗളത്തിനും നേന്ത്ര പായസ നിവേദ്യം.' : 'Banana payasam offering for wish fulfilment and auspiciousness.',
            icon: <Tag size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Wish fulfilment and auspiciousness',
            benefitMl: 'ആഗ്രഹ സാഫല്യം, ഐശ്വര്യം'
        },
        {
            id: 52,
            category: 'prasadam',
            nameEn: 'Ksheeri Dassam Payasam',
            nameMl: 'ക്ഷേരിദസം പഞ്ചാമൃതം',
            name: isML ? 'ക്ഷേരിദസം പഞ്ചാമൃതം' : 'Ksheeri Dassam Payasam',
            price: '₹75',
            descEn: 'Sacred payasam offering for health and devotion.',
            descMl: 'ഭക്തിക്കും ആരോഗ്യത്തിനും ക്ഷേരി ദസം പായസ നിവേദ്യം.',
            description: isML ? 'ഭക്തിക്കും ആരോഗ്യത്തിനും ക്ഷേരി ദസം പായസ നിവേദ്യം.' : 'Sacred payasam offering for health and devotion.',
            icon: <Tag size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Health and devotion',
            benefitMl: 'ആരോഗ്യം, ഭക്തി ഫലം'
        },
        {
            id: 53,
            category: 'prasadam',
            nameEn: 'Pancha Malai',
            nameMl: 'പഞ്ചമൃദ',
            name: isML ? 'പഞ്ചമൃദ' : 'Pancha Malai',
            price: '₹100',
            descEn: 'Five sacred materials offering for divine blessings.',
            descMl: 'ദൈവ കൃപക്കുള്ള പഞ്ച ദ്രവ്യ നിവേദ്യം.',
            description: isML ? 'ദൈവ കൃപക്കുള്ള പഞ്ച ദ്രവ്യ നിവേദ്യം.' : 'Five sacred materials offering for divine blessings.',
            icon: <Tag size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Complete divine blessings',
            benefitMl: 'ദൈവ കൃപ, ആരോഗ്യം, ഐശ്വര്യം'
        },
        {
            id: 54,
            category: 'prasadam',
            nameEn: 'Ksheeri Dassam Panchamrutham',
            nameMl: 'ക്ഷേരിദസം പഞ്ചാമൃതം',
            name: isML ? 'ക്ഷേരിദസം പഞ്ചാമൃതം (2nd)' : 'Ksheeri Dassam Panchamrutham',
            price: '₹75',
            descEn: 'A wholesome panchamrutham offering.',
            descMl: 'ദൈവ കൃപക്കും ഭക്തിക്കും ക്ഷേരി ദസം പഞ്ചാമൃതം.',
            description: isML ? 'ദൈവ കൃപക്കും ഭക്തിക്കും ക്ഷേരി ദസം പഞ്ചാമൃതം.' : 'A wholesome panchamrutham offering.',
            icon: <Tag size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Divine grace and devotion',
            benefitMl: 'ദൈവ കൃപ, ഭക്തി ഫലം'
        },
        {
            id: 55,
            category: 'prasadam',
            nameEn: 'Panchamrutham Abhishekam',
            nameMl: 'പഞ്ചാമൃത അഭിഷേകം',
            name: isML ? 'പഞ്ചാമൃത അഭിഷേകം' : 'Panchamrutham Abhishekam',
            price: '₹500',
            descEn: 'Grand five-liquid anointment ritual for supreme blessings.',
            descMl: 'അഞ്ച് ദ്രവ്യ അഭിഷേകത്തിലൂടെ ദേവനോടുള്ള ഭക്തി.',
            description: isML ? 'അഞ്ച് ദ്രവ്യ അഭിഷേകത്തിലൂടെ ദേവനോടുള്ള ഭക്തി.' : 'Grand five-liquid anointment ritual for supreme blessings.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/palabhishekam.jpg',
            benefit: 'Supreme blessings and complete wellbeing',
            benefitMl: 'ദൈവ കൃപ, ദോഷ ശമനം, ഐശ്വര്യം'
        },
        {
            id: 56,
            category: 'special',
            nameEn: 'Ella Deepam',
            nameMl: 'ഏല്ല ദീപം',
            name: isML ? 'ഏല്ല ദീപം' : 'Ella Deepam',
            price: '₹200',
            descEn: 'Cardamom-scented lamp offering for auspiciousness.',
            descMl: 'ഏലക്ക സുഗന്ധ ദീപ അർപ്പണം.',
            description: isML ? 'ഏലക്ക സുഗന്ധ ദീപ അർപ്പണം.' : 'Cardamom-scented lamp offering for auspiciousness.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Auspiciousness and fragrant blessings',
            benefitMl: 'ദൈവ കൃപ, ഐശ്വര്യം, മംഗളം'
        },
        // ── HOMAM ──
        {
            id: 57,
            category: 'homam',
            nameEn: 'Ganapathy Homam',
            nameMl: 'ഗണപതി ഹോമം',
            name: isML ? 'ഗണപതി ഹോമം' : 'Ganapathy Homam',
            price: '₹250',
            descEn: 'Auspicious fire ritual invoking Lord Ganesha for obstacle removal.',
            descMl: 'തടസ്സ നിവാരണത്തിനുള്ള ഗണപതി ഹോമം.',
            description: isML ? 'തടസ്സ നിവാരണത്തിനുള്ള ഗണപതി ഹോമം.' : 'Auspicious fire ritual invoking Lord Ganesha for obstacle removal.',
            icon: <Flame size={20} />,
            image: '/images/offerings/ganapathy_homam.jpg',
            benefit: 'Obstacle removal and new beginnings',
            benefitMl: 'വിഘ്ന നിവാരണം, ഗൃഹ ഐശ്വര്യം'
        },
        {
            id: 58,
            category: 'homam',
            nameEn: 'Vishnu Sahasranama Ganapathi Homam',
            nameMl: 'വിഷ്ണു സഹസ്ര ഗണപതി ഹോമം',
            name: isML ? 'വിഷ്ണു സഹസ്ര ഗണപതി ഹോമം' : 'Vishnu Sahasranama Ganapathi Homam',
            price: '₹50',
            descEn: 'Combined Vishnu sahasranama and Ganapathi homam for divine grace.',
            descMl: 'ദൈവ കൃപക്കുള്ള വിഷ്ണു സഹസ്ര ഗണപതി ഹോമം.',
            description: isML ? 'ദൈവ കൃപക്കുള്ള വിഷ്ണു സഹസ്ര ഗണപതി ഹോമം.' : 'Combined Vishnu sahasranama and Ganapathi homam for divine grace.',
            icon: <Flame size={20} />,
            image: '/images/offerings/ganapathy_homam.jpg',
            benefit: 'Combined divine blessings',
            benefitMl: 'ദൈവ കൃപ, ഐശ്വര്യം'
        },
        {
            id: 59,
            category: 'homam',
            nameEn: 'Arkkaya Homam / Ganapathi Homam',
            nameMl: 'അർക്കായ ഹോമം / ഗണപതി ഹോമം',
            name: isML ? 'അർക്കായ ഹോമം / ഗണപതി ഹോമം' : 'Arkkaya Homam / Ganapathi Homam',
            price: '₹2000',
            descEn: 'Grand Arkkaya homam combined with Ganapathi homam for major blessings.',
            descMl: 'സർവ്വ ദോഷ ശമനത്തിനും ഐശ്വര്യ വൃദ്ധിക്കും നടത്തുന്ന ഹോമം.',
            description: isML ? 'സർവ്വ ദോഷ ശമനത്തിനും ഐശ്വര്യ വൃദ്ധിക്കും നടത്തുന്ന ഹോമം.' : 'Grand Arkkaya homam combined with Ganapathi homam for major blessings.',
            icon: <Flame size={20} />,
            image: '/images/offerings/ganapathy_homam.jpg',
            benefit: 'Major blessings and prosperity',
            benefitMl: 'ദോഷ ശമനം, ഐശ്വര്യ വൃദ്ധി'
        },
        {
            id: 60,
            category: 'homam',
            nameEn: 'Ullnnyam Nidra Homam',
            nameMl: 'ഉള്ളിന്യം നിദ്ര ഹോമം',
            name: isML ? 'ഉള്ളിന്യം നിദ്ര ഹോമം' : 'Ullnnyam Nidra Homam',
            price: '₹100',
            priceMl: '(10 ഏള്ള) ₹100',
            descEn: 'Special homam for removing sleep disorders and mental distress.',
            descMl: 'ഉറക്കക്കുറവ്, മാനസിക ദോഷ ശമനത്തിനുള്ള ഹോമം.',
            description: isML ? 'ഉറക്കക്കുറവ്, മാനസിക ദോഷ ശമനത്തിനുള്ള ഹോമം.' : 'Special homam for removing sleep disorders and mental distress.',
            icon: <Flame size={20} />,
            image: '/images/offerings/ganapathy_homam.jpg',
            benefit: 'Relief from sleep disorders and mental distress',
            benefitMl: 'ഉറക്ക ദോഷ ശമനം, മനശ്ശാന്തി'
        },
        // ── SPECIAL POOJAS / NERCHAS ──
        {
            id: 61,
            category: 'special',
            nameEn: 'Moksha',
            nameMl: 'മോക്ഷ',
            name: isML ? 'മോക്ഷ' : 'Moksha',
            price: '₹150',
            descEn: 'Sacred offering for liberation and ultimate spiritual peace.',
            descMl: 'മോക്ഷ ലബ്ധിക്കും ആത്മ ശാന്തിക്കുമുള്ള വഴിപാട്.',
            description: isML ? 'മോക്ഷ ലബ്ധിക്കും ആത്മ ശാന്തിക്കുമുള്ള വഴിപാട്.' : 'Sacred offering for liberation and ultimate spiritual peace.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Liberation and spiritual peace',
            benefitMl: 'ആത്മ ശാന്തി, മോക്ഷ ലബ്ധി'
        },
        {
            id: 62,
            category: 'special',
            nameEn: 'Oru Nanam Pooja',
            nameMl: 'ഒരു നാനം പൂജ',
            name: isML ? 'ഒരു നാനം പൂജ' : 'Oru Nanam Pooja',
            price: '₹500',
            descEn: 'Special full-day pooja for comprehensive divine blessings.',
            descMl: 'ദൈവ കൃപക്കായി ഒരു ദിവസം മുഴുവൻ പ്രത്യേക പൂജ.',
            description: isML ? 'ദൈവ കൃപക്കായി ഒരു ദിവസം മുഴുവൻ പ്രത്യേക പൂജ.' : 'Special full-day pooja for comprehensive divine blessings.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Comprehensive divine blessings',
            benefitMl: 'ദൈവ കൃപ, കാര്യ സിദ്ധി'
        },
        {
            id: 63,
            category: 'special',
            nameEn: 'Nithu Pooja',
            nameMl: 'നിത്ര പൂജ',
            name: isML ? 'നിത്ര പൂജ' : 'Nithu Pooja',
            price: '₹1500',
            descEn: 'Grand special pooja for fulfilment of major wishes.',
            descMl: 'പ്രധാന ആഗ്രഹ സാഫല്യത്തിനുള്ള ഗ്രാൻഡ് പൂജ.',
            description: isML ? 'പ്രധാന ആഗ്രഹ സാഫല്യത്തിനുള്ള ഗ്രാൻഡ് പൂജ.' : 'Grand special pooja for fulfilment of major wishes.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Fulfilment of major wishes',
            benefitMl: 'ആഗ്രഹ സാഫല്യം, ദൈവ കൃപ'
        },
        {
            id: 64,
            category: 'special',
            nameEn: 'Muzhu Pooja',
            nameMl: 'മൂഴ പൂജ',
            name: isML ? 'മൂഴ പൂജ' : 'Muzhu Pooja',
            price: '₹1500',
            descEn: 'Complete pooja rituals for overall divine blessings.',
            descMl: 'ദൈവ കൃപക്കുള്ള സമ്പൂർണ്ണ പൂജ.',
            description: isML ? 'ദൈവ കൃപക്കുള്ള സമ്പൂർണ്ണ പൂജ.' : 'Complete pooja rituals for overall divine blessings.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Overall divine blessings',
            benefitMl: 'സർവ്വ ദൈവ കൃപ, ഐശ്വര്യം'
        },
        {
            id: 65,
            category: 'special',
            nameEn: 'Muzhunalpattham',
            nameMl: 'മൂഴുനൽ പട്ടം',
            name: isML ? 'മൂഴുനൽ പട്ടം' : 'Muzhunalpattham',
            price: '₹750',
            descEn: 'Special elaborate offering for supreme divine blessings.',
            descMl: 'ദൈവ കൃപക്കുള്ള വിശദ ഭക്തി ആചരണം.',
            description: isML ? 'ദൈവ കൃപക്കുള്ള വിശദ ഭക്തി ആചരണം.' : 'Special elaborate offering for supreme divine blessings.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Supreme divine blessings',
            benefitMl: 'ദൈവ കൃപ, കാര്യ സിദ്ധി'
        },
        {
            id: 66,
            category: 'special',
            nameEn: 'Bhagavat Harayanam',
            nameMl: 'ഭാഗവത ഹരായണം',
            name: isML ? 'ഭാഗവത ഹരായണം' : 'Bhagavat Harayanam',
            price: '₹1000',
            descEn: 'Srimad Bhagavata recitation for spiritual merit and divine blessings.',
            descMl: 'ആത്മ ഉന്നതിക്കും ദൈവ കൃപക്കും ഭാഗവത ഹരായണം.',
            description: isML ? 'ആത്മ ഉന്നതിക്കും ദൈവ കൃപക്കും ഭാഗവത ഹരായണം.' : 'Srimad Bhagavata recitation for spiritual merit and divine blessings.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Spiritual merit and divine blessings',
            benefitMl: 'ആത്മ ഉന്നതി, ദൈവ കൃപ, ഐശ്വര്യം'
        },
        {
            id: 67,
            category: 'special',
            nameEn: 'Annaprasham',
            nameMl: 'അന്നപ്രാശനം',
            name: isML ? 'അന്നപ്രാശനം' : 'Annaprasham',
            price: '₹250',
            descEn: 'Sacred first rice-feeding ceremony for infants at the temple.',
            descMl: 'ശിശുക്കൾക്കുള്ള ദൈവ അനുഗ്രഹ കൂടിയ ആദ്യ അന്നദാന ചടങ്ങ്.',
            description: isML ? 'ശിശുക്കൾക്കുള്ള ദൈവ അനുഗ്രഹ കൂടിയ ആദ്യ അന്നദാന ചടങ്ങ്.' : 'Sacred first rice-feeding ceremony for infants at the temple.',
            icon: <Heart size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Healthy growth and blessings for infants',
            benefitMl: 'ശിശു ആരോഗ്യം, ദൈവ കൃപ, ദീർഘായുസ്സ്'
        },
        {
            id: 68,
            category: 'special',
            nameEn: 'Thulabharam',
            nameMl: 'തുലാഭാരം',
            name: isML ? 'തുലാഭാരം' : 'Thulabharam',
            price: '₹100',
            descEn: "Offering one's weight in jaggery, banana, sugar or coconut in fulfilment of vows.",
            descMl: 'ശർക്കര, കദളിപ്പഴം തുടങ്ങിയ വസ്തുക്കൾ തൂക്കി നൽകുന്ന പുണ്യ നേർച്ച.',
            description: isML ? 'ശർക്കര, കദളിപ്പഴം തുടങ്ങിയ വസ്തുക്കൾ തൂക്കി നൽകുന്ന പുണ്യ നേർച്ച.' : "Offering one's weight in jaggery, banana, sugar or coconut in fulfilment of vows.",
            icon: <CreditCard size={20} />,
            image: '/images/offerings/thulabharam.jpg',
            benefit: 'Sacred weight offering in fulfilment of vows',
            benefitMl: 'നേർച്ച പൂർത്തീകരണം, ആയുരാരോഗ്യ സൗഖ്യം'
        },
        {
            id: 69,
            category: 'special',
            nameEn: 'Vel Pooja',
            nameMl: 'വേൽ പൂജ',
            name: isML ? 'വേൽ പൂജ' : 'Vel Pooja',
            price: '₹25',
            descEn: 'Sacred spear (Vel) pooja of Lord Subrahmanya for victory and blessings.',
            descMl: 'ഭഗവാൻ സ്കന്ദന്റെ ശ്രീ വേൽ അർച്ചന, കാര്യ സിദ്ധി.',
            description: isML ? 'ഭഗവാൻ സ്കന്ദന്റെ ശ്രീ വേൽ അർച്ചന, കാര്യ സിദ്ധി.' : 'Sacred spear (Vel) pooja of Lord Subrahmanya for victory and blessings.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Victory and divine blessings',
            benefitMl: 'കാര്യ സിദ്ധി, ദൈവ കൃപ'
        },
        {
            id: 70,
            category: 'special',
            nameEn: 'Moonnu Paravantpad',
            nameMl: 'മൂന്ന് പരാവന്തപ്പാട്',
            name: isML ? 'മൂന്ന് പരാവന്തപ്പാട്' : 'Moonnu Paravantpad',
            price: '₹125',
            descEn: 'Three-time circumambulation offering for special divine grace.',
            descMl: 'ദൈവ കൃപക്കായി മൂന്ന് തവണ പ്രദക്ഷിണ നിവേദ്യം.',
            description: isML ? 'ദൈവ കൃപക്കായി മൂന്ന് തവണ പ്രദക്ഷിണ നിവേദ്യം.' : 'Three-time circumambulation offering for special divine grace.',
            icon: <Sparkles size={20} />,
            image: '/images/offerings/archana_pushpanjali.jpg',
            benefit: 'Special divine grace',
            benefitMl: 'ദൈവ കൃപ, ദോഷ ശമനം'
        },
        {
            id: 71,
            category: 'homam',
            nameEn: 'Mruthyunjaya Homam',
            nameMl: 'മൃതൂഞ്ജ ഹോമം',
            name: isML ? 'മൃതൂഞ്ജ ഹോമം' : 'Mruthyunjaya Homam',
            price: '₹400',
            descEn: 'Powerful fire ritual for health, longevity and overcoming disease.',
            descMl: 'ആരോഗ്യം, ദീർഘായുസ്സ്, രോഗ ശമനം ഇവക്കുള്ള ഹോമം.',
            description: isML ? 'ആരോഗ്യം, ദീർഘായുസ്സ്, രോഗ ശമനം ഇവക്കുള്ള ഹോമം.' : 'Powerful fire ritual for health, longevity and overcoming disease.',
            icon: <Flame size={20} />,
            image: '/images/offerings/ganapathy_homam.jpg',
            benefit: 'Health, longevity and recovery from illness',
            benefitMl: 'ആരോഗ്യം, ദീർഘായുസ്സ്, രോഗ മുക്തി'
        },
    ];

    const categories = [
        { key: 'all', label: 'All Offerings', labelMl: 'എല്ലാ വഴിപാടുകളും' },
        { key: 'daily', label: 'Daily Poojas', labelMl: 'നിത്യ പൂജകൾ' },
        { key: 'abhishekam', label: 'Abhishekam', labelMl: 'അഭിഷേകങ്ങൾ' },
        { key: 'homam', label: 'Homam & Fire', labelMl: 'ഹോമങ്ങൾ' },
        { key: 'special', label: 'Special Vows', labelMl: 'പ്രത്യേക നേർച്ചകൾ' },
        { key: 'prasadam', label: 'Prasadam', labelMl: 'പ്രസാദം' }
    ];

    const filteredOfferings = activeFilter === 'all'
        ? offeringsData
        : offeringsData.filter(o => o.category === activeFilter);

    const handleOpenOffering = (offering) => {
        if (!BOOKING_ENABLED) return;
        setPendingOffering(null);
        setSelectedOffering(offering);
        setDevoteeName('');
        setDevoteeStar('');
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setPoojaDate(tomorrow.toISOString().split('T')[0]);
        setGotram('');
        setPhone('');
        setPrasadamMode('counter');
        setFormError('');
        setBookingReceipt(null);
    };

    // While online booking is paused, a Book click shows the "not available" message
    // instead of the booking modal. It closes on Escape or after 7 seconds.
    const handleBookClick = (offering) => {
        if (BOOKING_ENABLED) {
            handleOpenOffering(offering);
            return;
        }

        setPendingOffering(offering);
    };

    const handleClosePending = () => setPendingOffering(null);

    const handleSelectFromNakshatra = (offeringId, starId) => {
        if (!BOOKING_ENABLED) {
            const found = offeringsData.find(o => o.id === offeringId);
            if (found) setPendingOffering(found);
            return;
        }
        const found = offeringsData.find(o => o.id === offeringId) || offeringsData[0];
        setSelectedOffering(found);
        setDevoteeName('');
        setDevoteeStar(starId);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setPoojaDate(tomorrow.toISOString().split('T')[0]);
        setGotram('');
        setPhone('');
        setPrasadamMode('counter');
        setFormError('');
        setBookingReceipt(null);
    };

    // Close modal on escape key
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSelectedOffering(null);
                setBookingReceipt(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleConfirmBooking = (e) => {
        if (e) e.preventDefault();
        if (!devoteeName.trim() || !devoteeStar || !poojaDate) {
            setFormError(t('vazhipadu_booking.validation_alert'));
            return;
        }
        setFormError('');

        const starObj = NAKSHATRAS.find(s => s.id === devoteeStar);
        const starText = starObj ? `${starObj.en} (${starObj.ml})` : devoteeStar;
        const phoneNumber = "+917994342205";
        const prasadamText = prasadamMode === 'postal' ? t('vazhipadu_booking.mode_postal') : t('vazhipadu_booking.mode_counter');

        const tokenNum = `TK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        const resolvedOfferingName = isML 
            ? (selectedOffering.nameMl || selectedOffering.name) 
            : (selectedOffering.nameEn || selectedOffering.name);
        const resolvedPrice = isML && selectedOffering.priceMl ? selectedOffering.priceMl : selectedOffering.price;

        setBookingReceipt({
            token: tokenNum,
            offeringName: resolvedOfferingName,
            offeringPrice: resolvedPrice,
            devoteeName: devoteeName.trim(),
            starText,
            poojaDate,
            gotram: gotram.trim() || (isML ? 'രേഖപ്പെടുത്തിയിട്ടില്ല' : 'Not specified'),
            phone: phone.trim() || (isML ? 'നൽകിയിട്ടില്ല' : 'Not provided'),
            prasadamMode,
            prasadamText,
            timestamp: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
        });

        const message = isML ? `സ്വാമി ശരണം 🙏
തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രത്തിൽ താഴെ പറയുന്ന വഴിപാട് ബുക്ക് ചെയ്യാൻ ആഗ്രഹിക്കുന്നു:

• *ടോക്കൺ നമ്പർ:* #${tokenNum}
• *വഴിപാട്:* ${resolvedOfferingName}
• *തുക:* ${resolvedPrice}
• *ഭക്തന്റെ പേര്:* ${devoteeName.trim()}
• *ജന്മനക്ഷത്രം:* ${starText}
• *പൂജാ തീയതി:* ${poojaDate}
• *ഗോത്രം / വീട്ടുപേര്:* ${gotram.trim() || 'രേഖപ്പെടുത്തിയിട്ടില്ല'}
• *ഫോൺ നമ്പർ:* ${phone.trim() || 'നൽകിയിട്ടില്ല'}
• *പ്രസാദ വിതരണം:* ${prasadamText}

ദയവായി ബുക്കിംഗ് സ്ഥിരീകരിക്കുവാൻ അഭ്യർത്ഥിക്കുന്നു. നന്ദി!`
        : `Swami Saranam 🙏
I would like to book the following Vazhipadu at Thurayilkunnu Sree Subrahmanya Swami Temple:

• *Token Reference:* #${tokenNum}
• *Offering:* ${resolvedOfferingName}
• *Price:* ${resolvedPrice}
• *Devotee Name:* ${devoteeName.trim()}
• *Janma Nakshatram:* ${starText}
• *Pooja Date:* ${poojaDate}
• *Gotram / House:* ${gotram.trim() || 'Not specified'}
• *Phone Number:* ${phone.trim() || 'Not provided'}
• *Prasadam Delivery:* ${prasadamText}

Please confirm my booking. Thank you!`;

        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    // Auto-dismiss the "booking not available" message and close it on Escape
    useEffect(() => {
        if (!pendingOffering) return undefined;

        const timer = setTimeout(() => setPendingOffering(null), 7000);
        const onKeyDown = (e) => {
            if (e.key === 'Escape') setPendingOffering(null);
        };
        window.addEventListener('keydown', onKeyDown);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [pendingOffering]);

    return (
        <div className="offerings-page">
            {/* ---- "BOOKING NOT AVAILABLE" MESSAGE ---- */}
            {pendingOffering && (
                <div className="booking-unavailable-overlay" onClick={handleClosePending}>
                    <div
                        className="booking-unavailable-dialog"
                        role="alertdialog"
                        aria-modal="true"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="booking-unavailable-close"
                            onClick={handleClosePending}
                            aria-label="Close"
                        >
                            <X size={20} />
                        </button>

                        <div className="booking-unavailable-icon">
                            <Info size={26} />
                        </div>

                        <h3 className="booking-unavailable-title">
                            {isML ? 'ബുക്കിംഗ് ഇപ്പോൾ ലഭ്യമല്ല' : 'Booking Not Available For Now'}
                        </h3>

                        <p className="booking-unavailable-offering">
                            {isML
                                ? (pendingOffering.nameMl || pendingOffering.name)
                                : (pendingOffering.nameEn || pendingOffering.name)}
                        </p>

                        <p className="booking-unavailable-text">
                            {isML
                                ? 'ഓൺലൈൻ വഴിപാട് ബുക്കിംഗ് ഇപ്പോൾ ലഭ്യമല്ല. വഴിപാടുകൾ ബുക്ക് ചെയ്യാൻ ക്ഷേത്ര ഓഫീസിൽ സന്ദർശിക്കുക. ഓൺലൈൻ ബുക്കിംഗ് ഉടൻ ലഭ്യമാകും.'
                                : 'Online vazhipadu booking is not available at the moment. To book offerings (Vazhipadukal), please visit the temple office. Online booking will be added soon.'}
                        </p>

                        <div className="booking-unavailable-actions">
                            <Link className="booking-unavailable-primary" to="/contact">
                                {isML ? 'ഓഫീസിലേക്ക് ബന്ധപ്പെടുക' : 'Contact Temple Office'}
                            </Link>
                            <button
                                type="button"
                                className="booking-unavailable-secondary"
                                onClick={handleClosePending}
                            >
                                {isML ? 'അടയ്ക്കുക' : 'Close'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <SEO 
                title={t('offerings_page.title')} 
                description={isML ? 'തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രത്തിലെ നിത്യപൂജകളും വിശേഷാൽ വഴിപാടുകളും. വഴിപാട് ബുക്ക് ചെയ്യാൻ ക്ഷേത്ര ഓഫീസിലേക്ക് വരാവുന്നു.' : 'Explore poojas, vazhipadu, and special offerings at Thurayilkunnu Sree Subrahmanya Swami Temple. Visit the temple office to book vazhipadu.'}
                url="/offerings"
            />
            {/* ---- LUXURY INNER PAGE HERO ---- */}
            <PageHero
                title={t('offerings_page.title')}
                subtitle={t('offerings_page.intro')}
                badge={isML ? 'വിശുദ്ധ വഴിപാടുകൾ' : 'Sacred Offerings'}
                bgImage="/images/banners/banner_offerings.jpg"
                currentPage={t('navbar.offerings')}
            />

            {/* ---- BOOKING UNAVAILABLE NOTICE (shown while BOOKING_ENABLED is false) ---- */}
            {!BOOKING_ENABLED && (
                <div className="container">
                    <div className="booking-pending-notice" role="status">
                        <Info size={18} />
                        <div className="booking-pending-text">
                            <strong>
                                {isML ? 'ഓൺലൈൻ വഴിപാട് ബുക്കിംഗ് ഉടൻ ലഭ്യമാകും' : 'Online Vazhipadu Booking Coming Soon'}
                            </strong>
                            <span>
                                {isML
                                    ? 'ഇപ്പോൾ വഴിപാടുകൾ വിവരമായി മാത്രം ലിസ്റ്റ് ചെയ്തിരിക്കുന്നു. വഴിപാട് (വഴിപാടുകൾ) ബുക്ക് ചെയ്യാൻ ക്ഷേത്ര ഓഫീസിൽ സന്ദർശിക്കുക.'
                                    : 'For now, offerings are listed here for reference only. To book offerings (Vazhipadukal), please visit the temple office.'}
                            </span>
                        </div>
                        <Link className="booking-pending-contact" to="/contact">
                            {isML ? 'ഓഫീസിലേക്ക് ബന്ധപ്പെടുക' : 'Contact Office'}
                        </Link>
                    </div>
                </div>
            )}

            {/* ---- NAKSHATRA (STAR) VAZHIPADU RECOMMENDER ---- */}
            <NakshatraRecommender onSelectOffering={handleSelectFromNakshatra} />

            {/* ---- UPCOMING FESTIVAL VAZHIPADU DEDICATION BANNER ---- */}
            <section className="festival-vazhipadu-highlight-section" style={{ padding: '0 0 1.5rem', background: '#FAF8F5' }}>
                <div className="container">
                    <div style={{
                        background: 'linear-gradient(135deg, #1C1917 0%, #16120F 100%)',
                        border: '1.5px solid rgba(217, 119, 6, 0.45)',
                        borderRadius: '20px',
                        padding: '1.5rem 1.8rem',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '20px',
                        flexWrap: 'wrap'
                    }}>
                        <div style={{ flex: '1 1 500px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <span style={{
                                    background: 'linear-gradient(135deg, #FCD34D, #F59E0B)',
                                    color: '#0C0A09',
                                    fontSize: '0.74rem',
                                    fontWeight: '800',
                                    padding: '3px 10px',
                                    borderRadius: '20px',
                                    textTransform: 'uppercase'
                                }}>
                                    {isML ? 'പ്രത്യേക നേർച്ച ക്ഷണം' : 'Special Festival Offering'}
                                </span>
                                <span style={{ color: '#FDE68A', fontSize: '0.78rem', fontWeight: '700' }}>
                                    {isML ? '2026 നവംബർ 15 (1202 തുലാം 29)' : '15 November 2026 (1202 Thulam 29)'}
                                </span>
                            </div>
                            <h3 style={{
                                color: '#FFFFFF',
                                fontSize: '1.3rem',
                                fontWeight: '800',
                                margin: '0 0 6px',
                                fontFamily: "'Cinzel', 'Noto Sans Malayalam', serif"
                            }}>
                                {isML ? 'സ്കന്ദഷഷ്ടി മഹോത്സവം — നേർച്ച സമർപ്പണങ്ങൾ' : 'Skanda Shashti Mahotsavam — Offerings Dedication'}
                            </h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.88)', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>
                                {isML 
                                    ? 'അന്നേ ദിവസം ഷഷ്ടി പൂജ, ക്ഷേത്രാലങ്കാരം, ചെണ്ടമേളം തുടങ്ങിയവ ഭഗവാന് നേർച്ചയായി സമർപ്പിക്കുവാൻ ആഗ്രഹിക്കുന്ന ഭക്തജനങ്ങൾ എത്രയും വേഗം ദേവസ്വം ഓഫീസുമായോ (9072722205) ബന്ധപ്പെടുക.'
                                    : 'Devotees wishing to dedicate Shashti Pooja, Kshethralankaram (Floral & Illumination Decor), Chenda Melam, etc. are requested to contact Devaswom: 9072722205.'}
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                            <a 
                                href="tel:+919072722205"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    background: 'linear-gradient(135deg, #10B981, #059669)',
                                    color: '#FFFFFF',
                                    padding: '9px 18px',
                                    borderRadius: '50px',
                                    fontWeight: '800',
                                    fontSize: '0.84rem',
                                    textDecoration: 'none'
                                }}
                            >
                                <Phone size={15} />
                                <span>{isML ? 'വിളിക്കുക: 9072722205' : 'Call 9072722205'}</span>
                            </a>
                            <Link 
                                to="/festivals"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(252, 211, 77, 0.4)',
                                    color: '#FDE68A',
                                    padding: '9px 16px',
                                    borderRadius: '50px',
                                    fontWeight: '700',
                                    fontSize: '0.84rem',
                                    textDecoration: 'none'
                                }}
                            >
                                <span>{isML ? 'വിവരങ്ങൾ' : 'Details'}</span>
                                <ChevronRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---- FILTER BAR & OFFERINGS GRID ---- */}
            <section className="offerings-container section-padding">
                <div className="container">
                    {/* Category Filter Tabs */}
                    <div className="offerings-filter-tabs">
                        {categories.map((cat) => (
                            <button
                                key={cat.key}
                                className={`filter-tab-btn ${activeFilter === cat.key ? 'active' : ''}`}
                                onClick={() => setActiveFilter(cat.key)}
                            >
                                {isML ? (cat.labelMl || cat.label) : cat.label}
                                {activeFilter === cat.key && (
                                    <motion.div
                                        className="active-tab-glow"
                                        layoutId="activeFilterGlow"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Grid of offerings */}
                    <motion.div
                        className="offerings-grid"
                        variants={stagger}
                        initial="hidden"
                        animate="show"
                        key={activeFilter}
                    >
                        <AnimatePresence>
                            {filteredOfferings.map((offering) => {
                                const catAccents = {
                                    daily:      { bg: '#FEF3C7', border: '#F59E0B', text: '#92400E', iconBg: 'linear-gradient(135deg, #F59E0B, #D97706)' },
                                    abhishekam: { bg: '#EDE9FE', border: '#8B5CF6', text: '#5B21B6', iconBg: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' },
                                    homam:      { bg: '#FEE2E2', border: '#EF4444', text: '#991B1B', iconBg: 'linear-gradient(135deg, #EF4444, #DC2626)' },
                                    special:    { bg: '#D1FAE5', border: '#10B981', text: '#065F46', iconBg: 'linear-gradient(135deg, #10B981, #059669)' },
                                    prasadam:   { bg: '#FFE4E6', border: '#F43F5E', text: '#9F1239', iconBg: 'linear-gradient(135deg, #F43F5E, #E11D48)' },
                                };
                                const catBadges = {
                                    daily:      isML ? 'നിത്യ വഴിപാട്'   : 'Daily Offering',
                                    abhishekam: isML ? 'അഭിഷേകം'         : 'Abhishekam',
                                    homam:      isML ? 'ഹോമം'             : 'Homam',
                                    special:    isML ? 'വിശേഷ നേർച്ച'    : 'Special Vow',
                                    prasadam:   isML ? 'പ്രസാദം'          : 'Prasadam',
                                };
                                const accent = catAccents[offering.category] || catAccents.daily;
                                return (
                                <motion.article
                                    key={offering.id}
                                    className="offering-list-card"
                                    variants={cardVariant}
                                    layout
                                    whileHover={{ y: -4, boxShadow: `0 16px 40px -8px ${accent.border}30` }}
                                    transition={{ duration: 0.3 }}
                                    onClick={() => handleBookClick(offering)}
                                    style={{ cursor: 'pointer', '--cat-accent': accent.border, '--cat-bg': accent.bg, '--cat-text': accent.text }}
                                >
                                    {/* Icon circle */}
                                    <div className="olc-icon-circle" style={{ background: accent.iconBg }}>
                                        {React.cloneElement(offering.icon, { size: 22, color: '#fff' })}
                                    </div>

                                    {/* Content */}
                                    <div className="olc-content">
                                        <div className="olc-top-row">
                                            <span className="olc-cat-chip" style={{ background: accent.bg, color: accent.text, borderColor: accent.border }}>
                                                {catBadges[offering.category]}
                                            </span>
                                            <span className="olc-price">{isML && offering.priceMl ? offering.priceMl : offering.price}</span>
                                        </div>
                                        <h3 className="olc-name">{isML ? (offering.nameMl || offering.name) : (offering.nameEn || offering.name)}</h3>
                                        <p className="olc-desc">{isML ? (offering.descMl || offering.description) : (offering.descEn || offering.description)}</p>
                                        <div className="olc-bottom-row">
                                            <span className="olc-benefit-chip">
                                                <Star size={11} />
                                                {isML ? (offering.benefitMl || offering.benefit) : offering.benefit}
                                            </span>
<button className="olc-book-btn" onClick={(e) => { e.stopPropagation(); handleBookClick(offering); }}>
                                                <span>{isML ? 'ബുക്ക്' : 'Book'}</span>
                                                <ChevronRight size={13} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.article>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* ---- RICH DEVOTEE BOOKING MODAL & DIGITAL RECEIPT (disabled while BOOKING_ENABLED is false) ---- */}
            {BOOKING_ENABLED && (
            <AnimatePresence>
                {selectedOffering && (
                    <motion.div
                        className="offering-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => {
                            setSelectedOffering(null);
                            setBookingReceipt(null);
                        }}
                    >
                        <motion.div
                            className="offering-modal-box devotee-booking-modal"
                            initial={{ scale: 0.9, y: 30, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 30, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="modal-close-btn"
                                onClick={() => {
                                    setSelectedOffering(null);
                                    setBookingReceipt(null);
                                }}
                                aria-label={isML ? "അടയ്ക്കുക" : "Close modal"}
                            >
                                <X size={22} />
                            </button>

                            {bookingReceipt ? (
                                /* ---- DIGITAL TOKEN RECEIPT VIEW ---- */
                                <div className="digital-receipt-view">
                                    <div className="receipt-success-badge">
                                        <CheckCircle2 size={24} className="receipt-check-icon" />
                                        <span>{isML ? 'വഴിപാട് ബുക്കിംഗ് ടോക്കൺ തയ്യാറായി' : 'Vazhipadu Booking Token Generated'}</span>
                                    </div>

                                    <div className="sacred-token-slip" id="sacred-vazhipadu-slip">
                                        <div className="slip-temple-heading">
                                            <div className="slip-om-symbol">ॐ</div>
                                            <h4>തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം</h4>
                                            <p>Thurayilkunnu Sree Subrahmanya Swami Temple, Karunagappally</p>
                                            <div className="slip-token-row">
                                                <span className="slip-token-label">{isML ? 'ടോക്കൺ നമ്പർ' : 'Token Reference No:'}</span>
                                                <span className="slip-token-number">#{bookingReceipt.token}</span>
                                            </div>
                                        </div>

                                        <div className="slip-details-grid">
                                            <div className="slip-item">
                                                <span className="slip-lbl">{isML ? 'വഴിപാട്' : 'Offering'}:</span>
                                                <strong className="slip-val highlight">{bookingReceipt.offeringName}</strong>
                                            </div>
                                            <div className="slip-item">
                                                <span className="slip-lbl">{isML ? 'തുക' : 'Offering Fee'}:</span>
                                                <strong className="slip-val">{bookingReceipt.offeringPrice}</strong>
                                            </div>
                                            <div className="slip-item">
                                                <span className="slip-lbl">{isML ? 'ഭക്തന്റെ പേര്' : 'Devotee Name'}:</span>
                                                <strong className="slip-val">{bookingReceipt.devoteeName}</strong>
                                            </div>
                                            <div className="slip-item">
                                                <span className="slip-lbl">{isML ? 'ജന്മനക്ഷത്രം' : 'Birth Star'}:</span>
                                                <strong className="slip-val">{bookingReceipt.starText}</strong>
                                            </div>
                                            <div className="slip-item">
                                                <span className="slip-lbl">{isML ? 'പൂജാ തീയതി' : 'Pooja Date'}:</span>
                                                <strong className="slip-val">{bookingReceipt.poojaDate}</strong>
                                            </div>
                                            <div className="slip-item">
                                                <span className="slip-lbl">{isML ? 'ഗോത്രം / വീട്' : 'Gotram'}:</span>
                                                <strong className="slip-val">{bookingReceipt.gotram}</strong>
                                            </div>
                                            <div className="slip-item full-width">
                                                <span className="slip-lbl">{isML ? 'പ്രസാദ വിതരണം' : 'Prasadam Mode'}:</span>
                                                <strong className="slip-val">{bookingReceipt.prasadamText}</strong>
                                            </div>
                                        </div>

                                        <div className="slip-footer-note">
                                            <Sparkles size={14} className="slip-sparkle" />
                                            <span>
                                                {isML
                                                    ? 'ക്ഷേത്ര കൗണ്ടറിൽ ഈ ടോക്കൺ നമ്പർ കാണിച്ച് പ്രസാദം കൈപ്പറ്റാവുന്നതാണ്. പ്രാർത്ഥനകൾ ഫലപ്രദമാകട്ടെ!'
                                                    : 'Present this digital token reference at the temple counter to collect your sacred prasadam.'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="receipt-actions">
                                        <button
                                            type="button"
                                            className="receipt-btn print-btn"
                                            onClick={() => window.print()}
                                        >
                                            <Printer size={16} />
                                            <span>{isML ? 'ടോക്കൺ പ്രിന്റ് / Save' : 'Print / Save Token'}</span>
                                        </button>
                                        <button
                                            type="button"
                                            className="receipt-btn done-btn"
                                            onClick={() => {
                                                setSelectedOffering(null);
                                                setBookingReceipt(null);
                                            }}
                                        >
                                            <span>{isML ? 'പൂർത്തിയായി (Done)' : 'Done & Close'}</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* ---- STANDARD BOOKING FORM VIEW ---- */
                                <>
                                    <div className="modal-header">
                                        <div className="modal-icon-halo">
                                            {selectedOffering.icon}
                                        </div>
                                        <div>
                                            <span className="modal-tag">{t('vazhipadu_booking.modal_title')}</span>
                                            <h2>{isML ? (selectedOffering.nameMl || selectedOffering.name) : (selectedOffering.nameEn || selectedOffering.name)}</h2>
                                            <span className="modal-price">{isML && selectedOffering.priceMl ? selectedOffering.priceMl : selectedOffering.price}</span>
                                        </div>
                                    </div>

                                    <div className="modal-body">
                                        <div className="modal-benefit-box">
                                            <CheckCircle size={20} className="benefit-icon" />
                                            <div>
                                                <strong>{t('vazhipadu_booking.benefit')}</strong>
                                                <p>{isML && selectedOffering.benefitMl ? selectedOffering.benefitMl : selectedOffering.benefit}</p>
                                            </div>
                                        </div>

                                        {/* Devotee details form */}
                                        <form onSubmit={handleConfirmBooking} className="devotee-booking-form">
                                            {formError && (
                                                <div className="booking-error-badge">
                                                    <AlertCircle size={16} />
                                                    <span>{formError}</span>
                                                </div>
                                            )}

                                            <div className="modal-form-grid">
                                                <div className="modal-form-group">
                                                    <label htmlFor="devoteeName">
                                                        <User size={14} /> {t('vazhipadu_booking.devotee_name')} *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="devoteeName"
                                                        required
                                                        value={devoteeName}
                                                        onChange={(e) => setDevoteeName(e.target.value)}
                                                        placeholder={t('vazhipadu_booking.devotee_name_placeholder')}
                                                    />
                                                </div>

                                                <div className="modal-form-group">
                                                    <label htmlFor="devoteeStar">
                                                        <Star size={14} /> {t('vazhipadu_booking.nakshatram')} *
                                                    </label>
                                                    <select
                                                        id="devoteeStar"
                                                        required
                                                        value={devoteeStar}
                                                        onChange={(e) => setDevoteeStar(e.target.value)}
                                                    >
                                                        <option value="">-- {t('vazhipadu_booking.nakshatram_select')} --</option>
                                                        {NAKSHATRAS.map((s) => (
                                                            <option key={s.id} value={s.id}>
                                                                {isML ? `${s.ml} (${s.en})` : `${s.en} - ${s.ml}`}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="modal-form-group">
                                                    <label htmlFor="poojaDate">
                                                        <Calendar size={14} /> {t('vazhipadu_booking.pooja_date')} *
                                                    </label>
                                                    <input
                                                        type="date"
                                                        id="poojaDate"
                                                        required
                                                        min={new Date().toISOString().split('T')[0]}
                                                        value={poojaDate}
                                                        onChange={(e) => setPoojaDate(e.target.value)}
                                                    />
                                                </div>

                                                <div className="modal-form-group">
                                                    <label htmlFor="gotram">
                                                        {t('vazhipadu_booking.gotram')}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="gotram"
                                                        value={gotram}
                                                        onChange={(e) => setGotram(e.target.value)}
                                                        placeholder={t('vazhipadu_booking.gotram_placeholder')}
                                                    />
                                                </div>

                                                <div className="modal-form-group full-width">
                                                    <label htmlFor="phone">
                                                        {t('vazhipadu_booking.phone')}
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        placeholder={t('vazhipadu_booking.phone_placeholder')}
                                                    />
                                                </div>

                                                <div className="modal-form-group full-width">
                                                    <label>{t('vazhipadu_booking.prasadam_mode')}</label>
                                                    <div className="prasadam-mode-options">
                                                        <label className={`mode-card ${prasadamMode === 'counter' ? 'active' : ''}`}>
                                                            <input
                                                                type="radio"
                                                                name="prasadamMode"
                                                                value="counter"
                                                                checked={prasadamMode === 'counter'}
                                                                onChange={() => setPrasadamMode('counter')}
                                                            />
                                                            <span>{t('vazhipadu_booking.mode_counter')}</span>
                                                        </label>
                                                        <label className={`mode-card ${prasadamMode === 'postal' ? 'active' : ''}`}>
                                                            <input
                                                                type="radio"
                                                                name="prasadamMode"
                                                                value="postal"
                                                                checked={prasadamMode === 'postal'}
                                                                onChange={() => setPrasadamMode('postal')}
                                                            />
                                                            <span>{t('vazhipadu_booking.mode_postal')}</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="modal-timing-strip">
                                                <Clock size={16} />
                                                <span>{t('vazhipadu_booking.timing_note')}</span>
                                            </div>

                                            <div className="modal-footer">
                                                <button
                                                    type="submit"
                                                    className="modal-book-btn whatsapp-submit-btn"
                                                >
                                                    <MessageCircle size={18} />
                                                    <span>{t('vazhipadu_booking.submit_whatsapp')}</span>
                                                </button>
                                                <a
                                                    href="/contact"
                                                    className="modal-contact-link"
                                                    onClick={() => setSelectedOffering(null)}
                                                >
                                                    <span>{t('vazhipadu_booking.contact_office')}</span>
                                                    <ChevronRight size={16} />
                                                </a>
                                            </div>
                                        </form>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            )}

            {/* ---- INFO SECTION ---- */}
            <motion.section
                className="booking-info-section"
                {...inViewProps()}
                variants={cardVariant}
            >
                <div className="container">
                    <motion.div
                        className="info-card"
                        whileHover={{ y: -4 }}
                    >
                        <div className="info-grid">
                            <div className="info-text">
                                <div className="info-badge">
                                    <Info size={16} />
                                    <span>{isML ? 'വഴിപാട് കൗണ്ടർ' : 'Vazhipadu Counter'}</span>
                                </div>
                                <h2>{isML ? 'ഓഫീസിലേക്ക് വഴിപാട് ബുക്ക് ചെയ്യുക' : 'Book Vazhipadu at the Temple Office'}</h2>
                                <p>
                                    {isML
                                        ? 'ഓൺലൈൻ ബുക്കിംഗ് ഉടൻ ലഭ്യമാകും. ഇപ്പോൾ വഴിപാട് ബുക്ക് ചെയ്യേണ്ടതിന് ക്ഷേത്ര ഓഫീസിൽ സന്ദർശിക്കുക. ഗണപതി ഹോമം പോലുള്ള വിശേഷ പൂജകൾക്ക് കുറഞ്ഞത് ഒരു ദിവസം മുമ്പ് അറിയിപ്പിക്കണം.'
                                        : 'Online booking will be available soon. For now, please visit the temple office to book vazhipadu. Special poojas such as Ganapathy Homam should be notified at least one day in advance.'}
                                </p>
                                <div className="time-chips">
                                    <motion.div className="time-chip" whileHover={{ scale: 1.03 }}>
                                        <Clock size={16} />
                                        <span>{isML ? 'രാവിലെ: 05:00 AM – 10:30 AM' : 'Morning: 05:00 AM – 10:30 AM'}</span>
                                    </motion.div>
                                    <motion.div className="time-chip" whileHover={{ scale: 1.03 }}>
                                        <Clock size={16} />
                                        <span>{isML ? 'വൈകുന്നേരം: 05:30 PM – 08:00 PM' : 'Evening: 05:30 PM – 08:00 PM'}</span>
                                    </motion.div>
                                </div>
                            </div>
                            <div className="info-visual">
                                <div className="visual-circle primary" />
                                <div className="visual-circle gold" />
                                <Sparkles className="floating-sparkle s1" />
                                <Sparkles className="floating-sparkle s2" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default Offerings;
