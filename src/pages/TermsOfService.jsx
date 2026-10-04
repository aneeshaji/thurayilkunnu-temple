import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, CheckCircle, AlertCircle, Ban, Scale, ChevronRight } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import '../styles/LegalPages.css';

const TermsOfService = () => {
    const { i18n } = useTranslation();
    const isML = i18n.language === 'ml';

    const lastUpdated = 'October 2025';

    const sections = [
        {
            icon: <CheckCircle size={22} />,
            titleEn: 'Acceptance of Terms',
            titleMl: 'നിബന്ധനകൾ സ്വീകരിക്കൽ',
            contentEn: `By accessing and using this website (thurayilkunnu.in or its hosted equivalent), you agree to be bound by these Terms of Service. If you do not agree, please do not use this website.

This website is operated by Thurayilkunnu Sree Subramanya Swami Temple Devaswom, a registered religious and charitable institution in Karunagappally, Kerala, India.`,
            contentMl: `ഈ വെബ്‌സൈറ്റ് ആക്‌സസ് ചെയ്ത് ഉപയോഗിക്കുന്നതിലൂടെ, ഈ സേവന നിബന്ധനകൾ അനുസരിക്കാൻ നിങ്ങൾ സമ്മതിക്കുന്നു. നിങ്ങൾ സമ്മതിക്കുന്നില്ലെങ്കിൽ, ദയവായി ഈ വെബ്‌സൈറ്റ് ഉപയോഗിക്കരുത്.`,
        },
        {
            icon: <FileText size={22} />,
            titleEn: 'Use of This Website',
            titleMl: 'വെബ്‌സൈറ്റ് ഉപയോഗം',
            contentEn: `This website is intended solely for:

• Providing information about the temple, its deities, festivals, and timings.
• Facilitating vazhipadu (offering) inquiries and WhatsApp-based booking requests.
• Accepting donation information and coordinating contributions.
• Sharing temple announcements, events, and devotee newsletters.

You agree not to use this website for any unlawful purpose or in any way that could harm the temple's reputation or disrupt its religious mission.`,
            contentMl: `ഈ വെബ്‌സൈറ്റ് ഇനിപ്പറയുന്നവ മാത്രം ഉദ്ദേശിക്കുന്നു:

• ക്ഷേത്രം, ദേവതകൾ, ഉത്സവങ്ങൾ, സമയക്രമം എന്നിവയെ കുറിച്ചുള്ള വിവരങ്ങൾ.
• വഴിപാട് അന്വേഷണങ്ങളും വാട്‌സ്ആപ്പ് ബുക്കിംഗ് അഭ്യർത്ഥനകളും.
• സംഭാവനാ വിവരങ്ങൾ സ്വീകരിക്കൽ.
• ക്ഷേത്ര അറിയിപ്പുകളും ഭക്തജന വാർത്തകളും.`,
        },
        {
            icon: <AlertCircle size={22} />,
            titleEn: 'Vazhipadu Booking Terms',
            titleMl: 'വഴിപാട് ബുക്കിംഗ് നിബന്ധനകൾ',
            contentEn: `When making a vazhipadu booking through this website:

• **Booking confirmation** is subject to availability and temple schedule. Submission of a form does not guarantee performance on the requested date.
• **Payment** for vazhipadus must be made at the temple counter or via designated bank/UPI transfer before the ritual is performed.
• **Sankalpa details** (name, star, gotram) must be accurate — the temple is not responsible for errors in information provided.
• **Cancellations** must be communicated at least 24 hours prior. Refund policy is governed by temple administration guidelines.
• **Prasadam delivery** via speed post is subject to postal service availability and is dispatched within 3–5 working days after the ritual.`,
            contentMl: `ഈ വെബ്‌സൈറ്റ് വഴി വഴിപാട് ബുക്ക് ചെയ്യുമ്പോൾ:

• **ബുക്കിംഗ് സ്ഥിരീകരണം** ലഭ്യതയും ക്ഷേത്ര ഷെഡ്യൂളും അനുസരിച്ചാണ്. ഫോം സമർപ്പിക്കുന്നത് ആവശ്യപ്പെടുന്ന തിയ്യതിയിൽ ചടങ്ങ് ഉറപ്പ് നൽകുന്നില്ല.
• **പേയ്‌മെന്റ്** ക്ഷേത്ര കൗണ്ടറിൽ അല്ലെങ്കിൽ ബാങ്ക്/UPI ട്രാൻസ്ഫർ വഴി ചടങ്ങിന് മുമ്പ് ചെയ്യണം.
• **സങ്കൽപ്പ വിവരങ്ങൾ** (പേര്, നക്ഷത്രം, ഗോത്രം) കൃത്യമായിരിക്കണം.`,
        },
        {
            icon: <Ban size={22} />,
            titleEn: 'Prohibited Activities',
            titleMl: 'നിരോധിത പ്രവർത്തനങ്ങൾ',
            contentEn: `Users must not:

• Scrape, copy, or reproduce website content without written permission.
• Submit false, misleading, or fraudulent information in booking or contact forms.
• Attempt to disrupt, hack, or overload the website's infrastructure.
• Use this website for commercial advertising or solicitation without consent.
• Impersonate temple staff or create confusion about official communications.`,
            contentMl: `ഉപയോക്താക്കൾ ഇനിപ്പറയുന്നവ ചെയ്യരുത്:

• എഴുത്ത് അനുമതി ഇല്ലാതെ വെബ്‌സൈറ്റ് ഉള്ളടക്കം പകർത്തുകയോ പുനർനിർമ്മിക്കുകയോ ചെയ്യരുത്.
• ബുക്കിംഗ് ഫോമുകളിൽ തെറ്റായ വിവരങ്ങൾ നൽകരുത്.
• വെബ്‌സൈറ്റ് ഹാക്ക് ചെയ്യാനോ തടസ്സപ്പെടുത്താനോ ശ്രമിക്കരുത്.
• ക്ഷേത്ര ജീവനക്കാരെ ആൾ മാറി ഉപയോഗിക്കരുത്.`,
        },
        {
            icon: <Scale size={22} />,
            titleEn: 'Disclaimer & Liability',
            titleMl: 'നിരാകരണം & ബാധ്യത',
            contentEn: `• The content on this website is provided for informational and devotional purposes only.
• Festival dates, pooja timings, and event schedules are subject to change without notice. Please contact the temple directly to confirm.
• We are not liable for any direct, indirect, or consequential damages arising from the use of this website.
• External links to third-party sites (WhatsApp, Google Maps, etc.) are provided for convenience; we do not endorse or take responsibility for their content.

**Governing Law:** These terms are governed by the laws of Kerala, India. Any disputes shall be subject to the jurisdiction of courts in Kollam District, Kerala.`,
            contentMl: `• ഈ വെബ്‌സൈറ്റിലെ ഉള്ളടക്കം വിവര ആവശ്യങ്ങൾക്ക് മാത്രം.
• ഉത്സവ തിയ്യതികൾ, പൂജ സമയക്രമം മുൻ‌കൂർ അറിയിപ്പ് കൂടാതെ മാറ്റപ്പെടാം. ക്ഷേത്രവുമായി നേരിട്ട് ബന്ധപ്പെടുക.
• **ഭരിക്കുന്ന നിയമം:** ഈ നിബന്ധനകൾ കേരളത്തിലെ നിയമങ്ങൾ അനുസരിച്ചാണ്. തർക്കങ്ങൾ കൊല്ലം ജില്ലയിലെ കോടതി അധികാര പരിധിക്ക് വിധേയം.`,
        },
    ];

    return (
        <div className="legal-page">
            <SEO
                title="Terms of Service — Thurayilkunnu Temple"
                description="Terms of Service for Thurayilkunnu Sree Subramanya Swami Temple website. Understand the conditions governing use of our website and services."
                url="/terms-of-service"
            />

            {/* Hero */}
            <div className="legal-hero terms-hero">
                <div className="legal-hero-overlay" />
                <div className="container legal-hero-inner">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="legal-breadcrumb">
                            <Link to="/">Home</Link>
                            <ChevronRight size={14} />
                            <span>{isML ? 'സേവന നിബന്ധനകൾ' : 'Terms of Service'}</span>
                        </div>
                        <div className="legal-hero-badge">
                            <FileText size={18} />
                            <span>{isML ? 'ഉപയോഗ നിബന്ധനകൾ' : 'Usage Terms'}</span>
                        </div>
                        <h1 className="legal-hero-title">
                            {isML ? 'സേവന നിബന്ധനകൾ' : 'Terms of Service'}
                        </h1>
                        <p className="legal-hero-subtitle">
                            {isML
                                ? 'തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്ര ദേവസ്വം'
                                : 'Thurayilkunnu Sree Subramanya Swami Temple Devaswom'}
                        </p>
                        <p className="legal-updated">
                            {isML ? `അവസാനം അപ്ഡേറ്റ് ചെയ്തത്: ${lastUpdated}` : `Last Updated: ${lastUpdated}`}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="legal-content-wrapper">
                <div className="container legal-content">
                    <div className="legal-intro-box">
                        <p>
                            {isML
                                ? 'ദയവായി ഈ നിബന്ധനകൾ ശ്രദ്ധാപൂർവ്വം വായിക്കുക. ഈ വെബ്‌സൈറ്റ് ഉപയോഗിക്കുന്നതിലൂടെ, ഈ നിബന്ധനകൾ നിങ്ങൾ അംഗീകരിക്കുന്നു.'
                                : 'Please read these Terms carefully. By using this website to browse temple information, book vazhipadus, or make donations, you agree to these terms.'}
                        </p>
                    </div>

                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            className="legal-section"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.5, delay: index * 0.07 }}
                        >
                            <div className="legal-section-header">
                                <div className="legal-section-icon">{section.icon}</div>
                                <h2>{isML ? section.titleMl : section.titleEn}</h2>
                            </div>
                            <div className="legal-section-body">
                                {(isML ? (section.contentMl || section.contentEn) : section.contentEn)
                                    .split('\n')
                                    .map((line, i) => {
                                        const trimmed = line.trim();
                                        if (!trimmed) return null;
                                        const formatted = trimmed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                                        return (
                                            <p
                                                key={i}
                                                dangerouslySetInnerHTML={{ __html: formatted }}
                                                className={trimmed.startsWith('•') ? 'legal-bullet' : ''}
                                            />
                                        );
                                    })}
                            </div>
                        </motion.div>
                    ))}

                    <div className="legal-footer-note">
                        <p>
                            {isML
                                ? 'ഈ നിബന്ധനകളിൽ ചോദ്യങ്ങൾ ഉണ്ടെങ്കിൽ ഞങ്ങളെ ബന്ധപ്പെടുക: '
                                : 'For questions about these Terms, contact us at: '}
                            <a href="mailto:info@subramanyatemple.org">info@subramanyatemple.org</a>
                        </p>
                        <Link to="/privacy-policy" className="legal-cross-link">
                            {isML ? 'സ്വകാര്യതാ നയം വായിക്കുക →' : 'Read our Privacy Policy →'}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
