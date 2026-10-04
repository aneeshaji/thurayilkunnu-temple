import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Eye, Lock, Phone, Mail, ChevronRight } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import '../styles/LegalPages.css';

const PrivacyPolicy = () => {
    const { i18n } = useTranslation();
    const isML = i18n.language === 'ml';

    const lastUpdated = 'October 2025';

    const sections = [
        {
            icon: <Eye size={22} />,
            titleEn: 'Information We Collect',
            titleMl: 'ഞങ്ങൾ ശേഖരിക്കുന്ന വിവരങ്ങൾ',
            contentEn: `When you use our online vazhipadu booking or newsletter subscription services, we may collect:
            
• **Devotee Name** — provided voluntarily for sankalpa (prayer invocation) purposes.
• **Janma Nakshatram (Birth Star)** — used solely for ritual personalization.
• **Gotram / Family Name** — optional, used for sankalpa.
• **WhatsApp / Phone Number** — used to send booking confirmations and prasadam coordination.
• **Email Address** — collected only if you subscribe to our devotee newsletter.
• **Pooja Date Preference** — for scheduling ritual performance.

We do NOT collect payment card details. All donations are processed directly via bank transfer or UPI.`,
            contentMl: `ഞങ്ങളുടെ ഓൺലൈൻ വഴിപാട് ബുക്കിംഗ് അല്ലെങ്കിൽ വാർത്താ സബ്‌സ്‌ക്രിപ്ഷൻ സേവനങ്ങൾ ഉപയോഗിക്കുമ്പോൾ, ഞങ്ങൾ ഇനിപ്പറയുന്ന വിവരങ്ങൾ ശേഖരിക്കാം:

• **ഭക്തൻ്റെ പേര്** — സങ്കൽപ്പ ആവശ്യങ്ങൾക്കായി സ്വമേധയാ നൽകുന്നത്.
• **ജന്മ നക്ഷത്രം** — ആരാധനാ വ്യക്തിഗതവൽക്കരണത്തിനായി മാത്രം.
• **ഗോത്രം / കുടുംബ നാമം** — ഐച്ഛികം, സങ്കൽപ്പത്തിനായി.
• **വാട്‌സ്ആപ്പ് / ഫോൺ നമ്പർ** — ബുക്കിംഗ് സ്ഥിരീകരണത്തിനും പ്രസാദ ഏകോപനത്തിനും.
• **ഇ-മെയിൽ** — ഭക്തജന വാർത്താ സബ്‌സ്‌ക്രിപ്‌ഷനിൽ ചേർന്നാൽ മാത്രം.
• **പൂജ തിയ്യതി** — ചടങ്ങ് ഷെഡ്യൂൾ ചെയ്യാൻ.`,
        },
        {
            icon: <Shield size={22} />,
            titleEn: 'How We Use Your Information',
            titleMl: 'ഞങ്ങൾ നിങ്ങളുടെ വിവരങ്ങൾ എങ്ങനെ ഉപയോഗിക്കുന്നു',
            contentEn: `Your information is used solely for:

• Performing the requested vazhipadu/pooja ritual at the sanctum with correct sankalpa.
• Coordinating prasadam collection or speed-post delivery.
• Sending festival announcements and temple news (newsletter subscribers only).
• Responding to inquiries submitted via the contact form.

We do NOT use your data for advertising, profiling, or commercial marketing of any kind.`,
            contentMl: `നിങ്ങളുടെ വിവരങ്ങൾ ഇനിപ്പറയുന്ന ആവശ്യങ്ങൾക്ക് മാത്രം ഉപയോഗിക്കുന്നു:

• ശരിയായ സങ്കൽപ്പത്തോടെ ആവശ്യപ്പെടുന്ന വഴിപാട്/പൂജ ചടങ്ങ് നടത്തൽ.
• പ്രസാദ ശേഖരണം അല്ലെങ്കിൽ സ്പീഡ് പോസ്റ്റ് ഡെലിവറി ഏകോപനം.
• ഉത്സവ അറിയിപ്പുകളും ക്ഷേത്ര വാർത്തകളും (വാർത്താ സബ്‌സ്‌ക്രൈബർമാർക്ക് മാത്രം).
• കോൺടാക്ട് ഫോം വഴി ലഭിക്കുന്ന അന്വേഷണങ്ങൾക്ക് മറുപടി നൽകൽ.`,
        },
        {
            icon: <Lock size={22} />,
            titleEn: 'Data Security & Retention',
            titleMl: 'ഡാറ്റ സുരക്ഷ & സൂക്ഷിപ്പ്',
            contentEn: `• Booking requests are transmitted via WhatsApp and handled only by temple office staff.
• No personal data is stored in any third-party database on our servers.
• Email newsletter data is handled through secure channels and never shared.
• We retain contact information only as long as necessary for the stated purpose.
• You may request deletion of your data at any time by contacting us directly.`,
            contentMl: `• ബുക്കിംഗ് അഭ്യർത്ഥനകൾ വാട്‌സ്ആപ്പ് വഴി അയയ്‌ക്കുകയും ക്ഷേത്ര ഓഫീസ് ജീവനക്കാർ മാത്രം കൈകാര്യം ചെയ്യുകയും ചെയ്യുന്നു.
• ഒരു മൂന്നാം കക്ഷി ഡേറ്റാബേസിലും വ്യക്തിഗത ഡേറ്റ സൂക്ഷിക്കുന്നില്ല.
• ഇ-മെയിൽ ഡേറ്റ സുരക്ഷിതമായ ചാനലുകളിലൂടെ കൈകാര്യം ചെയ്യുകയും ഒരിക്കലും പങ്കിടുകയോ വിൽക്കുകയോ ചെയ്യില്ല.
• ആവശ്യമായ കാലത്തേക്ക് മാത്രം ഡേറ്റ സൂക്ഷിക്കുന്നു.`,
        },
        {
            icon: <Phone size={22} />,
            titleEn: 'Third-Party Services',
            titleMl: 'മൂന്നാം കക്ഷി സേവനങ്ങൾ',
            contentEn: `Our website may use the following third-party services:

• **WhatsApp (Meta)** — Booking confirmations are sent via WhatsApp. Meta's privacy policy governs their data handling.
• **Google Maps** — Temple location and nearby temples are displayed using Google Maps embeds.
• **i18next** — Language translation library (no data collection).

We are not responsible for the privacy practices of third-party services linked from our site.`,
            contentMl: `ഞങ്ങളുടെ വെബ്‌സൈറ്റ് ഇനിപ്പറയുന്ന മൂന്നാം കക്ഷി സേവനങ്ങൾ ഉപയോഗിക്കാം:

• **WhatsApp (Meta)** — ബുക്കിംഗ് സ്ഥിരീകരണങ്ങൾ വാട്‌സ്ആപ്പ് വഴി അയക്കുന്നു. Meta-യുടെ സ്വകാര്യതാ നയം ബാധകം.
• **Google Maps** — ക്ഷേത്ര സ്ഥാനം Google Maps എംബെഡ് ഉപയോഗിച്ച് കാണിക്കുന്നു.`,
        },
        {
            icon: <Mail size={22} />,
            titleEn: 'Your Rights & Contact',
            titleMl: 'നിങ്ങളുടെ അവകാശങ്ങളും ബന്ധപ്പെടൽ വിവരങ്ങളും',
            contentEn: `You have the right to:

• **Access** — Request a copy of personal data we hold about you.
• **Correction** — Request correction of any inaccurate information.
• **Deletion** — Request deletion of your data at any time.
• **Opt-out** — Unsubscribe from newsletter communications at any time.

To exercise any of these rights, contact us at:

📞 +91 79943 42205 | +91 90727 22205
📧 info@subramanyatemple.org`,
            contentMl: `നിങ്ങൾക്ക് ഇനിപ്പറയുന്ന അവകാശങ്ങൾ ഉണ്ട്:

• **ആക്‌സസ്** — ഞങ്ങൾ കൈവശം വയ്ക്കുന്ന ഡേറ്റ ആവശ്യപ്പെടാം.
• **തിരുത്തൽ** — തെറ്റായ വിവരങ്ങൾ തിരുത്താൻ ആവശ്യപ്പെടാം.
• **ഇല്ലാതാക്കൽ** — ഏത് സമയത്തും ഡേറ്റ ഇല്ലാതാക്കാൻ ആവശ്യപ്പെടാം.

ബന്ധപ്പെടൽ: 📞 +91 79943 42205 | 📧 info@subramanyatemple.org`,
        },
    ];

    return (
        <div className="legal-page">
            <SEO
                title="Privacy Policy — Thurayilkunnu Temple"
                description="Privacy Policy of Thurayilkunnu Sree Subramanya Swami Temple. Learn how we collect, use and protect your personal information."
                url="/privacy-policy"
            />

            {/* Hero */}
            <div className="legal-hero">
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
                            <span>{isML ? 'സ്വകാര്യതാ നയം' : 'Privacy Policy'}</span>
                        </div>
                        <div className="legal-hero-badge">
                            <Shield size={18} />
                            <span>{isML ? 'ഡേറ്റ സംരക്ഷണം' : 'Data Protection'}</span>
                        </div>
                        <h1 className="legal-hero-title">
                            {isML ? 'സ്വകാര്യതാ നയം' : 'Privacy Policy'}
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
                                ? 'ഭഗവാൻ സുബ്രഹ്മണ്യന്റെ ഭക്തരുടെ സ്വകാര്യതയും വിശ്വാസവും ഞങ്ങൾ ആദരിക്കുന്നു. ഈ സ്വകാര്യതാ നയം, ഈ വെബ്‌സൈറ്റ് ഉപയോഗിക്കുമ്പോൾ നിങ്ങളുടെ ഡേറ്റ ഞങ്ങൾ എങ്ങനെ കൈകാര്യം ചെയ്യുന്നു എന്ന് വ്യക്തമാക്കുന്നു.'
                                : 'We respect the privacy and trust of all devotees of Lord Subramanya. This Privacy Policy explains how we handle your data when you use this website for vazhipadu bookings, donations, or information queries.'}
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
                                        // Bold text with **
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
                                ? 'ഈ നയത്തിൽ മാറ്റങ്ങൾ വരുത്തിയാൽ ഈ പേജിൽ അറിയിക്കും. തുടർന്ന് ഈ വെബ്‌സൈറ്റ് ഉപയോഗിക്കുന്നത് പുതിയ നയം അംഗീകരിക്കുന്നതായി കണക്കാക്കും.'
                                : 'We may update this policy periodically. Continued use of this website after changes constitutes acceptance of the revised policy. For questions, reach us at '}
                            {!isML && <a href="mailto:info@subramanyatemple.org">info@subramanyatemple.org</a>}
                            {isML && <a href="mailto:info@subramanyatemple.org"> info@subramanyatemple.org</a>}
                        </p>
                        <Link to="/terms-of-service" className="legal-cross-link">
                            {isML ? 'സേവന നിബന്ധനകൾ വായിക്കുക →' : 'Read our Terms of Service →'}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
