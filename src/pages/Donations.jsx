import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Heart,
  Sparkles,
  Copy,
  Check,
  Building,
  QrCode,
  ShieldCheck,
  ChevronRight,
  Send,
  Phone,
  Gift,
  Flame,
  Award,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import '../styles/Donations.css';

/* ---- ANIMATION VARIANTS ---- */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 35 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const inViewProps = (margin = '-60px') => ({
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, margin }
});

const Donations = () => {
  const { t, i18n } = useTranslation();
  const isML = i18n.language === 'ml';
  const [copiedField, setCopiedField] = useState(null);
  const [selectedCause, setSelectedCause] = useState('annadanam');
  const [customAmount, setCustomAmount] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    utr: '',
    address: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const bankDetails = {
    accName: t('donations_page.bank_card.acc_name_val'),
    accNo: t('donations_page.bank_card.acc_no_val'),
    bank: t('donations_page.bank_card.bank_name_val'),
    branch: t('donations_page.bank_card.branch_val'),
    ifsc: t('donations_page.bank_card.ifsc_val'),
    accType: t('donations_page.bank_card.acc_type_val')
  };

  const upiId = t('donations_page.upi_card.upi_id_val');

  const causesList = [
    {
      key: 'annadanam',
      title: t('donations_page.causes.annadanam.name'),
      desc: t('donations_page.causes.annadanam.desc'),
      suggested: t('donations_page.causes.annadanam.amount'),
      icon: <Gift className="cause-icon" size={24} />,
      color: '#f59e0b'
    },
    {
      key: 'renovation',
      title: t('donations_page.causes.renovation.name'),
      desc: t('donations_page.causes.renovation.desc'),
      suggested: t('donations_page.causes.renovation.amount'),
      icon: <Building className="cause-icon" size={24} />,
      color: '#d97706'
    },
    {
      key: 'nithya_pooja',
      title: t('donations_page.causes.nithya_pooja.name'),
      desc: t('donations_page.causes.nithya_pooja.desc'),
      suggested: t('donations_page.causes.nithya_pooja.amount'),
      icon: <Flame className="cause-icon" size={24} />,
      color: '#ef4444'
    },
    {
      key: 'chuttuvilakku',
      title: t('donations_page.causes.chuttuvilakku.name'),
      desc: t('donations_page.causes.chuttuvilakku.desc'),
      suggested: t('donations_page.causes.chuttuvilakku.amount'),
      icon: <Sparkles className="cause-icon" size={24} />,
      color: '#10b981'
    }
  ];

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReceiptSubmit = (e) => {
    e.preventDefault();
    const activeCauseObj = causesList.find((c) => c.key === selectedCause);
    const causeName = activeCauseObj ? activeCauseObj.title : selectedCause;

    const phoneNumber = '+917994342205';
    const message = `Swami Saranam 🙏
I have made a sacred donation to Thurayilkunnu Sree Subramanya Swami Temple:

• Name: ${formData.name || 'Devotee'}
• Cause: ${causeName}
• Amount: ₹${customAmount || 'Contribution'}
• Transaction UTR / Ref: ${formData.utr || 'Direct Transfer'}
• Phone: ${formData.phone || 'Not provided'}
• Postal Address: ${formData.address || 'Direct Collection'}

Please verify and dispatch official receipt / temple prasadam. Thank you!`;

    setSubmitted(true);
    setTimeout(() => {
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
      setSubmitted(false);
    }, 1200);
  };

  return (
    <div className="donations-page">
      <SEO
        title={t('donations_page.title')}
        description={t('donations_page.subtitle')}
      />

      {/* ---- LUXURY INNER PAGE HERO ---- */}
      <PageHero
        title={t('donations_page.title')}
        subtitle={t('donations_page.subtitle')}
        badge={t('donations_page.hero_badge')}
        bgImage="/images/banners/banner_donations.jpg"
        currentPage={t('donations_page.title')}
      />


      {/* ---- INTRO STRIP ---- */}
      <section className="donations-intro-strip">
        <div className="container">
          <div className="intro-card">
            <p className="intro-text">
              "{t('donations_page.intro')}"
            </p>
            <div className="trust-cert-tag">
              <ShieldCheck size={16} />
              <span>{isML ? 'രജിസ്റ്റർ ചെയ്ത മത-ധർമ്മസ്ഥാപനം (സ്ഥാപിതം 1952)' : 'Registered Religious & Charitable Trust (Est. 1952)'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---- CAUSES / SEVAS ---- */}
      <section className="causes-section section-padding">
        <div className="container">
          <div className="section-head text-center">
            <span className="section-eyebrow">
              <span className="eyebrow-line"></span>
              {t('donations_page.causes_title')}
              <span className="eyebrow-line"></span>
            </span>
            <h2 className="section-heading">{t('donations_page.causes_subtitle')}</h2>
          </div>

          <motion.div
            className="causes-grid"
            variants={stagger}
            {...inViewProps()}
          >
            {causesList.map((cause) => {
              const isSelected = selectedCause === cause.key;
              return (
                <motion.div
                  key={cause.key}
                  className={`cause-card shine-hover ${isSelected ? 'selected' : ''}`}
                  variants={fadeInUp}
                  whileHover={{ y: -6, scale: 1.02 }}
                  onClick={() => setSelectedCause(cause.key)}
                >
                  <div className="cause-card-top">
                    <div className="cause-icon-box" style={{ background: `${cause.color}20`, color: cause.color }}>
                      {cause.icon}
                    </div>
                    {isSelected && (
                      <span className="selected-pill">
                        <Check size={14} /> {isML ? 'തിരഞ്ഞെടുത്തു' : 'Selected'}
                      </span>
                    )}
                  </div>
                  <h3 className="cause-title">{cause.title}</h3>
                  <p className="cause-desc">{cause.desc}</p>
                  <div className="cause-amount-box">
                    <span className="amount-label">{isML ? 'നിർദ്ദേശിച്ച തുക:' : 'Suggested:'}</span>
                    <span className="amount-val">{cause.suggested}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ---- BANK DETAILS & UPI CARDS ---- */}
      <section className="payment-channels-section section-padding alt-bg">
        <div className="container">
          <div className="payment-channels-grid">
            {/* Direct Bank Transfer Card */}
            <motion.div
              className="payment-card bank-transfer-card"
              {...inViewProps()}
              variants={fadeInUp}
            >
              <div className="card-header">
                <div className="header-icon-circle bank">
                  <Building size={24} />
                </div>
                <div>
                  <h3>{t('donations_page.bank_card.title')}</h3>
                  <p>{t('donations_page.bank_card.subtitle')}</p>
                </div>
              </div>

              <div className="bank-fields-list">
                <div className="bank-field-row">
                  <span className="field-label">{t('donations_page.bank_card.acc_name')}:</span>
                  <strong className="field-value">{bankDetails.accName}</strong>
                </div>

                <div className="bank-field-row highlight">
                  <div>
                    <span className="field-label">{t('donations_page.bank_card.acc_no')}:</span>
                    <strong className="field-value monospace">{bankDetails.accNo}</strong>
                  </div>
                  <button
                    type="button"
                    className={`copy-btn ${copiedField === 'accNo' ? 'copied' : ''}`}
                    onClick={() => handleCopy(bankDetails.accNo, 'accNo')}
                    aria-label="Copy Account Number"
                  >
                    {copiedField === 'accNo' ? (
                      <>
                        <Check size={14} /> {t('donations_page.bank_card.copied')}
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> {t('donations_page.bank_card.copy')}
                      </>
                    )}
                  </button>
                </div>

                <div className="bank-field-row highlight">
                  <div>
                    <span className="field-label">{t('donations_page.bank_card.ifsc')}:</span>
                    <strong className="field-value monospace">{bankDetails.ifsc}</strong>
                  </div>
                  <button
                    type="button"
                    className={`copy-btn ${copiedField === 'ifsc' ? 'copied' : ''}`}
                    onClick={() => handleCopy(bankDetails.ifsc, 'ifsc')}
                    aria-label="Copy IFSC Code"
                  >
                    {copiedField === 'ifsc' ? (
                      <>
                        <Check size={14} /> {t('donations_page.bank_card.copied')}
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> {t('donations_page.bank_card.copy')}
                      </>
                    )}
                  </button>
                </div>

                <div className="bank-field-row">
                  <span className="field-label">{t('donations_page.bank_card.bank_name')}:</span>
                  <span className="field-value">{bankDetails.bank}</span>
                </div>

                <div className="bank-field-row">
                  <span className="field-label">{t('donations_page.bank_card.branch')}:</span>
                  <span className="field-value">{bankDetails.branch}</span>
                </div>

                <div className="bank-field-row">
                  <span className="field-label">{t('donations_page.bank_card.acc_type')}:</span>
                  <span className="field-value">{bankDetails.accType}</span>
                </div>
              </div>

              <div className="security-guarantee">
                <ShieldCheck size={16} />
                <span>{isML ? 'ക്ഷേത്ര ട്രസ്റ്റിന്റെ നേരിട്ടുള്ള ബാങ്ക് അക്കൗണ്ട്' : 'Verified Direct Temple Trust Bank Account'}</span>
              </div>
            </motion.div>

            {/* Instant UPI & QR Code Card */}
            <motion.div
              className="payment-card upi-card"
              {...inViewProps()}
              variants={fadeInUp}
            >
              <div className="card-header">
                <div className="header-icon-circle upi">
                  <QrCode size={24} />
                </div>
                <div>
                  <h3>{t('donations_page.upi_card.title')}</h3>
                  <p>{t('donations_page.upi_card.subtitle')}</p>
                </div>
              </div>

              <div className="upi-qr-display-box">
                {/* SVG-based clean modern QR code mockup with Temple Om emblem */}
                <div className="qr-box-inner">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                      `upi://pay?pa=${upiId}&pn=Thurayilkunnu+Temple+Trust&cu=INR`
                    )}`}
                    alt="Temple UPI QR Code"
                    className="upi-qr-image"
                    loading="lazy"
                  />
                  <div className="qr-corner top-left"></div>
                  <div className="qr-corner top-right"></div>
                  <div className="qr-corner bottom-left"></div>
                  <div className="qr-corner bottom-right"></div>
                </div>

                <div className="supported-apps-strip">
                  <span className="app-badge">GPay</span>
                  <span className="app-badge">PhonePe</span>
                  <span className="app-badge">Paytm</span>
                  <span className="app-badge">BHIM</span>
                  <span className="app-badge">Any UPI</span>
                </div>
              </div>

              <div className="upi-id-bar">
                <div className="upi-id-left">
                  <span className="upi-label">{t('donations_page.upi_card.upi_id_label')}</span>
                  <strong className="upi-val">{upiId}</strong>
                </div>
                <button
                  type="button"
                  className={`copy-btn primary ${copiedField === 'upiId' ? 'copied' : ''}`}
                  onClick={() => handleCopy(upiId, 'upiId')}
                  aria-label="Copy UPI ID"
                >
                  {copiedField === 'upiId' ? (
                    <>
                      <Check size={14} /> {t('donations_page.bank_card.copied')}
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> {t('donations_page.bank_card.copy')}
                    </>
                  )}
                </button>
              </div>

              <p className="upi-note">{t('donations_page.upi_card.note')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---- RECEIPT CONFIRMATION FORM ---- */}
      <section className="receipt-section section-padding">
        <div className="container">
          <motion.div
            className="receipt-form-wrapper"
            {...inViewProps()}
            variants={fadeInUp}
          >
            <div className="receipt-form-head text-center">
              <div className="form-icon-pill">
                <Sparkles size={16} /> Temple Receipt & Prasadam
              </div>
              <h2>{t('donations_page.receipt_form.title')}</h2>
              <p>{t('donations_page.receipt_form.subtitle')}</p>
            </div>

            <form onSubmit={handleReceiptSubmit} className="receipt-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">{t('donations_page.receipt_form.name')} *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder={isML ? 'ഭക്തന്റെ പൂർണ്ണ നാമം' : 'Sri / Smt. Devotee Name'}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">{t('donations_page.receipt_form.phone')} *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cause">{t('donations_page.receipt_form.cause')} *</label>
                  <select
                    id="cause"
                    name="cause"
                    value={selectedCause}
                    onChange={(e) => setSelectedCause(e.target.value)}
                  >
                    {causesList.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="amount">{t('donations_page.receipt_form.amount')} *</label>
                  <div className="amount-input-holder">
                    <span className="currency-prefix">₹</span>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      required
                      min="10"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="e.g. 1001"
                    />
                  </div>
                  <div className="quick-amount-tags">
                    {['501', '1001', '2501', '5001'].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        className={`quick-amt-btn ${customAmount === amt ? 'active' : ''}`}
                        onClick={() => setCustomAmount(amt)}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="utr">{t('donations_page.receipt_form.utr')}</label>
                  <input
                    type="text"
                    id="utr"
                    name="utr"
                    value={formData.utr}
                    onChange={handleFormChange}
                    placeholder={isML ? '12-അക്ക UPI റഫറൻസ് നമ്പർ / IMPS UTR' : '12-digit UPI Ref ID / IMPS UTR (e.g., 4038XXXXXXXX)'}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="address">{t('donations_page.receipt_form.address')}</label>
                  <textarea
                    id="address"
                    name="address"
                    rows="2"
                    value={formData.address}
                    onChange={handleFormChange}
                    placeholder={isML ? 'വീട്ടുപേര്, റോഡ്, തപാൽ ഓഫീസ്, പിൻകോഡ് (പ്രസാദം അയക്കാൻ)' : 'House name, Street, Post Office, PIN code (to dispatch sacred Prasadam)'}
                  />
                </div>
              </div>

              <div className="form-submit-row">
                <button type="submit" className="submit-receipt-btn shine-hover" disabled={submitted}>
                  {submitted ? (
                    <>
                      <CheckCircle size={18} /> {isML ? 'വിവരങ്ങൾ രേഖപ്പെടുത്തുന്നു...' : 'Recording Contribution...'}
                    </>
                  ) : (
                    <>
                      <Send size={18} /> {t('donations_page.receipt_form.submit')}
                    </>
                  )}
                </button>
              </div>

              <p className="form-disclaimer text-center">
                {t('donations_page.receipt_form.footer_note')}
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Donations;
