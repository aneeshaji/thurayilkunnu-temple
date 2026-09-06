import React, { useState, useEffect, useCallback } from 'react';
import { getDailyPanchang } from 'panchang-ts';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Star, Clock, ChevronLeft, ChevronRight, MapPin, Calendar, Loader, RotateCcw } from 'lucide-react';
import '../styles/PanchangamWidget.css';

/* ─── Temple coordinates: Karunagappally, Kerala ─── */
const LOCATION = { latitude: 9.0281, longitude: 76.5365, elevation: 5 };
const TIMEZONE = 330; // IST = UTC+5:30

/* ─── Malayalam & English Translation Mappings ─── */

const ML_MONTHS = [
    'ജനുവരി', 'ഫെബ്രുവരി', 'മാർച്ച്', 'ഏപ്രിൽ', 'മേയ്', 'ജൂൺ',
    'ജൂലൈ', 'ഓഗസ്റ്റ്', 'സെപ്റ്റംബർ', 'ഒക്ടോബർ', 'നവംബർ', 'ഡിസംബർ'
];

const ML_DAYS_SHORT = ['ഞായർ', 'തിങ്കൾ', 'ചൊവ്വ', 'ബുധൻ', 'വ്യാഴം', 'വെള്ളി', 'ശനി'];

const NAKSHATRA_ML = {
    ashwini: 'അശ്വതി', asvini: 'അശ്വതി',
    bharani: 'ഭരണി',
    krittika: 'കാർത്തിക', kritika: 'കാർത്തിക',
    rohini: 'രോഹിണി',
    mrigashira: 'മകയിരം', mrigashirsha: 'മകയിരം',
    ardra: 'തിരുവാതിര', arudra: 'തിരുവാതിര',
    punarvasu: 'പുണർതം',
    pushya: 'പൂയം', pushyami: 'പൂയം',
    ashlesha: 'ആയില്യം', aslesha: 'ആയില്യം',
    magha: 'മകം', makha: 'മകം',
    purvaphalguni: 'പൂരം', poorvaphalguni: 'പൂരം',
    uttaraphalguni: 'ഉത്രം', utharaphalguni: 'ഉത്രം',
    hasta: 'അത്തം', hastha: 'അത്തം',
    chitra: 'ചിത്തിര',
    swati: 'ചോതി', swathi: 'ചോതി',
    vishakha: 'വിശാഖം',
    anuradha: 'അനിഴം',
    jyeshtha: 'തൃക്കേട്ട', jyeshta: 'തൃക്കേട്ട',
    mula: 'മൂലം', moola: 'മൂലം',
    purvaashadha: 'പൂരാടം', poorvashadha: 'പൂരാടം', purvashada: 'പൂരാടം',
    uttaraashadha: 'ഉത്രാടം', uthrashadha: 'ഉത്രാടം', uttarashada: 'ഉത്രാടം',
    shravana: 'തിരുവോണം', sravana: 'തിരുവോണം',
    dhanishta: 'അവിട്ടം', dhanishtha: 'അവിട്ടം',
    shatabhisha: 'ചതയം', shatataraka: 'ചതയം',
    purvabhadrapada: 'പൂരുരുട്ടാതി', poorvabhadra: 'പൂരുരുട്ടാതി',
    uttarabhadrapada: 'ഉത്രട്ടാതി', uthrabhadra: 'ഉത്രട്ടാതി',
    revati: 'രേവതി', revathi: 'രേവതി'
};

const TITHI_BASE_ML = {
    pratipada: 'പ്രഥമ', prathama: 'പ്രഥമ',
    dwitiya: 'ദ്വിതീയ',
    tritiya: 'തൃതീയ',
    chaturthi: 'ചതുർത്ഥി',
    panchami: 'പഞ്ചമി',
    shashthi: 'ഷഷ്ഠി', shashti: 'ഷഷ്ഠി',
    saptami: 'സപ്തമി',
    ashtami: 'അഷ്ടമി',
    navami: 'നവമി',
    dashami: 'ദശമി',
    ekadashi: 'ഏകാദശി',
    dwadashi: 'ദ്വാദശി',
    trayodashi: 'ത്രയോദശി',
    chaturdashi: 'ചതുർദ്ദശി',
    purnima: 'പൗർണ്ണമി', poornima: 'പൗർണ്ണമി',
    amavasya: 'അമാവാസി'
};

const WEEKDAY_NAMES = {
    en: {
        0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday',
        shaniwara: 'Saturday', shaniwar: 'Saturday',
        shukravara: 'Friday', shukravar: 'Friday',
        guruvara: 'Thursday', guruwar: 'Thursday', brihaspatiwar: 'Thursday',
        budhavara: 'Wednesday', budhwar: 'Wednesday',
        mangalavara: 'Tuesday', mangalwar: 'Tuesday',
        somavara: 'Monday', somwar: 'Monday',
        ravivara: 'Sunday', raviwar: 'Sunday'
    },
    ml: {
        0: 'ഞായറാഴ്ച', 1: 'തിങ്കളാഴ്ച', 2: 'ചൊവ്വാഴ്ച', 3: 'ബുധനാഴ്ച', 4: 'വ്യാഴാഴ്ച', 5: 'വെള്ളിയാഴ്ച', 6: 'ശനിയാഴ്ച',
        shaniwara: 'ശനിയാഴ്ച', shaniwar: 'ശനിയാഴ്ച',
        shukravara: 'വെള്ളിയാഴ്ച', shukravar: 'വെള്ളിയാഴ്ച',
        guruvara: 'വ്യാഴാഴ്ച', guruwar: 'വ്യാഴാഴ്ച', brihaspatiwar: 'വ്യാഴാഴ്ച',
        budhavara: 'ബുധനാഴ്ച', budhwar: 'ബുധനാഴ്ച',
        mangalavara: 'ചൊവ്വാഴ്ച', mangalwar: 'ചൊവ്വാഴ്ച',
        somavara: 'തിങ്കളാഴ്ച', somwar: 'തിങ്കളാഴ്ച',
        ravivara: 'ഞായറാഴ്ച', raviwar: 'ഞായറാഴ്ച'
    }
};

const YOGA_ML = {
    vishkambha: 'വിഷ്കംഭം', priti: 'പ്രീതി', ayushman: 'ആയുഷ്മാൻ',
    saubhagya: 'സൗഭാഗ്യം', shobhana: 'ശോഭനം', atiganda: 'അതിഗണ്ഡം',
    sukarma: 'സുകർമ്മം', dhriti: 'ധൃതി', shula: 'ശൂലം',
    ganda: 'ഗണ്ഡം', vriddhi: 'വൃദ്ധി', dhruva: 'ധ്രുവം',
    vyaghata: 'വ്യാഘാതം', harshana: 'ഹർഷണം', vajra: 'വജ്രം',
    siddhi: 'സിദ്ധി', vyatipata: 'വ്യതീപാതം', variyana: 'വരീയാൻ',
    parigha: 'പരിഘം', shiva: 'ശിവം', siddha: 'സിദ്ധം',
    sadhya: 'സാധ്യം', shubha: 'ശുഭം', shukla: 'ശുക്ലം',
    brahma: 'ബ്രഹ്മം', indra: 'ഇന്ദ്രം', vaidhriti: 'വൈധൃതി'
};

const KARANA_ML = {
    bava: 'ബവം', balava: 'ബാലവം', kaulava: 'കൗലവം',
    taitila: 'തൈതിലം', gara: 'ഗരജം', vanija: 'വണിജം',
    vishti: 'വിഷ്ടി (ഭദ്ര)', shakuni: 'ശകുനി',
    chatushpada: 'ചതുഷ്പാദം', naga: 'നാഗം', kintughna: 'കിംസ്തുഘ്നം'
};

/* ─── Helpers ─── */

const cleanKey = (str) => (str || '').toLowerCase().replace(/[^a-z]/g, '');

const getLocalizedWeekday = (vara, date, isMl) => {
    const lang = isMl ? 'ml' : 'en';
    if (vara?.name) {
        const k = cleanKey(vara.name);
        if (WEEKDAY_NAMES[lang][k]) return WEEKDAY_NAMES[lang][k];
    }
    const dayIndex = date.getDay();
    return WEEKDAY_NAMES[lang][dayIndex] || vara?.englishName || vara?.name || '—';
};

const getLocalizedNakshatra = (nakshatra, isMl) => {
    if (!nakshatra) return '—';
    const rawName = nakshatra.englishName || nakshatra.name || '';
    if (!isMl) return rawName || '—';
    const k = cleanKey(rawName);
    return NAKSHATRA_ML[k] || rawName || '—';
};

const getLocalizedTithi = (tithi, isMl) => {
    if (!tithi) return '—';
    const rawName = tithi.englishName || tithi.name || '';
    if (!isMl) return rawName || '—';

    const pakshaLower = (tithi.paksha || '').toLowerCase();
    const isShukla = pakshaLower === 'shukla' || rawName.toLowerCase().includes('shukla');
    const isKrishna = pakshaLower === 'krishna' || rawName.toLowerCase().includes('krishna');

    const cleaned = cleanKey(rawName).replace('shukla', '').replace('krishna', '');
    const baseMl = TITHI_BASE_ML[cleaned] || rawName;

    if (baseMl === 'പൗർണ്ണമി' || baseMl === 'അമാവാസി') return baseMl;
    if (isShukla) return `വെളുത്ത ${baseMl}`;
    if (isKrishna) return `കറുത്ത ${baseMl}`;
    return baseMl;
};

const getLocalizedYoga = (yoga, isMl) => {
    if (!yoga) return '—';
    const raw = yoga.englishName || yoga.name || '';
    if (!isMl) return raw || '—';
    const k = cleanKey(raw);
    return YOGA_ML[k] || raw || '—';
};

const getLocalizedKarana = (karana, isMl) => {
    if (!karana) return '—';
    const raw = karana.englishName || karana.name || '';
    if (!isMl) return raw || '—';
    const k = cleanKey(raw);
    return KARANA_ML[k] || raw || '—';
};

/* ─── Format 12-hour string in IST ─── */
const fmt12 = (d) => {
    if (!d || !(d instanceof Date) || isNaN(d.getTime())) return null;
    return d.toLocaleTimeString('en-IN', {
        hour: '2-digit', minute: '2-digit', hour12: true,
        timeZone: 'Asia/Kolkata'
    });
};

const fmtISOLocal = (isoStr) => {
    if (!isoStr) return null;
    const d = new Date(isoStr);
    return isNaN(d.getTime()) ? null : fmt12(d);
};

const fmtDate = (d, isMl) => {
    if (isMl) {
        const dayName = ML_DAYS_SHORT[d.getDay()];
        const monthName = ML_MONTHS[d.getMonth()];
        const dayNum = String(d.getDate()).padStart(2, '0');
        const year = d.getFullYear();
        return `${dayNum} ${monthName} ${year}, ${dayName}`;
    }
    return d.toLocaleDateString('en-IN', {
        weekday: 'short', day: '2-digit', month: 'short', year: 'numeric'
    });
};

const localMidnight = () => {
    const n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate());
};

const addDays = (d, n) => {
    const r = new Date(d);
    r.setDate(r.getDate() + n);
    return r;
};

const PanchangamWidget = () => {
    const { t, i18n } = useTranslation();
    const isMl = i18n.language === 'ml';

    const [date, setDate] = useState(localMidnight);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const compute = useCallback((d) => {
        setLoading(true);
        setError(null);
        try {
            const result = getDailyPanchang(d, LOCATION, { timezone: TIMEZONE });
            if (!result) throw new Error('No data returned for this date');
            setData(result);
        } catch (e) {
            console.error('Panchang error:', e);
            setError(t('panchangam.error'));
        } finally {
            setLoading(false);
        }
    }, [t]);

    useEffect(() => { compute(date); }, [date, compute]);

    const isToday = date.toDateString() === localMidnight().toDateString();

    /* ─── Extract values ─── */
    const tithi     = data?.angas?.tithis?.[0];
    const nakshatra = data?.angas?.nakshatras?.[0];
    const yoga      = data?.angas?.yogas?.[0];
    const karana    = data?.angas?.karanas?.[0];
    const vara      = data?.angas?.vara;

    const sunrise   = data?.sun?.riseLocal ? fmtISOLocal(data.sun.riseLocal) : fmt12(data?.sun?.rise);
    const sunset    = data?.sun?.setLocal  ? fmtISOLocal(data.sun.setLocal)  : fmt12(data?.sun?.set);

    const rahu      = data?.inauspicious?.rahuKalam;
    const yama      = data?.inauspicious?.yamaganda;
    const rahuStart = rahu?.startLocal ? fmtISOLocal(rahu.startLocal) : fmt12(rahu?.start);
    const rahuEnd   = rahu?.endLocal   ? fmtISOLocal(rahu.endLocal)   : fmt12(rahu?.end);
    const yamStart  = yama?.startLocal ? fmtISOLocal(yama.startLocal) : fmt12(yama?.start);
    const yamEnd    = yama?.endLocal   ? fmtISOLocal(yama.endLocal)   : fmt12(yama?.end);

    const pakshaLower = (tithi?.paksha || '').toLowerCase();
    const pakshaDisplay = pakshaLower === 'shukla'
        ? t('panchangam.shukla_paksha')
        : pakshaLower === 'krishna'
            ? t('panchangam.krishna_paksha')
            : '—';

    const TimeBlock = ({ label, start, end, warn }) => (
        <div className={`pw-time-item${warn ? ' rahu' : ''}`}>
            <span className="pw-time-label">{label}</span>
            <span className="pw-time-value">{start ?? '—'}</span>
            {start && end && <span className="pw-time-end">– {end}</span>}
        </div>
    );

    return (
        <section className="panchangam-section">
            <div className="container">
                <div className="panchangam-header">
                    <motion.span
                        className="panchangam-badge"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Calendar size={14} /> {t('panchangam.badge')}
                    </motion.span>
                    <motion.h2
                        className="panchangam-title"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        {t('panchangam.title')}
                    </motion.h2>
                    <motion.p
                        className="panchangam-subtitle"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        {t('panchangam.subtitle')}
                    </motion.p>
                </div>

                <motion.div
                    className="panchangam-widget"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* ── Top Bar: Title & Today Indicator ── */}
                    <div className="pw-top-bar">
                        <div className="pw-temple-badge">
                            <div className="pw-temple-icon">
                                <Sun size={18} />
                            </div>
                            <div>
                                <h3 className="pw-card-title">{t('panchangam.badge')}</h3>
                                <span className="pw-location"><MapPin size={12} /> {t('panchangam.temple_loc')}</span>
                            </div>
                        </div>

                        <div className="pw-today-control">
                            {isToday ? (
                                <div className="pw-today-status">
                                    <span className="pw-pulse-dot"></span>
                                    <span>{t('panchangam.today')}</span>
                                </div>
                            ) : (
                                <button
                                    className="pw-today-action-btn"
                                    onClick={() => setDate(localMidnight())}
                                    title="Reset to today"
                                >
                                    <RotateCcw size={13} />
                                    <span>{t('panchangam.today')}</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* ── Date Navigator Row ── */}
                    <div className="pw-date-navigator">
                        <button
                            className="pw-nav-btn prev"
                            onClick={() => setDate(d => addDays(d, -1))}
                            aria-label="Previous day"
                            title="Previous day"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div className="pw-date-display-box">
                            <Calendar size={15} className="pw-calendar-icon" />
                            <span className="pw-date-text">{fmtDate(date, isMl)}</span>
                        </div>
                        <button
                            className="pw-nav-btn next"
                            onClick={() => setDate(d => addDays(d, 1))}
                            aria-label="Next day"
                            title="Next day"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    {/* ── Body ── */}
                    <AnimatePresence mode="wait">
                        {loading && (
                            <motion.div key="loading" className="pw-loading"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <Loader size={20} className="pw-spin" /> {t('panchangam.computing')}
                            </motion.div>
                        )}

                        {error && !loading && (
                            <motion.div key="error" className="pw-loading"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                style={{ color: '#fca5a5', flexDirection: 'column', gap: '8px' }}>
                                <span>{error}</span>
                                <button className="pw-today-action-btn" onClick={() => compute(date)}>
                                    {t('panchangam.retry')}
                                </button>
                            </motion.div>
                        )}

                        {data && !loading && !error && (
                            <motion.div key={date.toDateString() + (isMl ? '-ml' : '-en')}
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>

                                {/* 6-cell Panchanga grid */}
                                <div className="pw-grid">
                                    <div className="pw-item">
                                        <span className="pw-label"><Moon size={12} /> {t('panchangam.tithi')}</span>
                                        <span className="pw-value">{getLocalizedTithi(tithi, isMl)}</span>
                                    </div>
                                    <div className="pw-item">
                                        <span className="pw-label"><Star size={12} /> {t('panchangam.nakshatra')}</span>
                                        <span className="pw-value">{getLocalizedNakshatra(nakshatra, isMl)}</span>
                                    </div>
                                    <div className="pw-item">
                                        <span className="pw-label"><Sun size={12} /> {t('panchangam.yoga')}</span>
                                        <span className="pw-value">{getLocalizedYoga(yoga, isMl)}</span>
                                    </div>
                                    <div className="pw-item">
                                        <span className="pw-label"><Moon size={12} /> {t('panchangam.karana')}</span>
                                        <span className="pw-value">{getLocalizedKarana(karana, isMl)}</span>
                                    </div>
                                    <div className="pw-item">
                                        <span className="pw-label"><Calendar size={12} /> {t('panchangam.weekday')}</span>
                                        <span className="pw-value">{getLocalizedWeekday(vara, date, isMl)}</span>
                                    </div>
                                    <div className="pw-item">
                                        <span className="pw-label"><Clock size={12} /> {t('panchangam.paksha')}</span>
                                        <span className="pw-value">{pakshaDisplay}</span>
                                    </div>
                                </div>

                                {/* ── Sunrise / Sunset / Rahu strip ── */}
                                <div className="pw-time-strip">
                                    <TimeBlock label={`🌅 ${t('panchangam.sunrise')}`}     start={sunrise}   />
                                    <TimeBlock label={`🌇 ${t('panchangam.sunset')}`}      start={sunset}    />
                                    <TimeBlock label={`⚠ ${t('panchangam.rahu_kalam')}`}   start={rahuStart} end={rahuEnd} warn />
                                    <TimeBlock label={`⚠ ${t('panchangam.yamagandam')}`}   start={yamStart}  end={yamEnd}  warn />
                                </div>
                                <div className="pw-note-wrapper">
                                    <p className="pw-rahu-note">
                                        {t('panchangam.rahu_note')}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default PanchangamWidget;
