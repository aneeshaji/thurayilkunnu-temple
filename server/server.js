require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');

const app = express();

app.set('trust proxy', 1);
app.disable('x-powered-by');

app.use(express.json({ limit: '32kb' }));
app.use(express.urlencoded({ extended: false, limit: '32kb' }));

const PORT = process.env.PORT || 3000;
const TO_EMAIL = process.env.MAIL_TO || 'info@thurayilkunnutemple.com';
const FROM_EMAIL = process.env.MAIL_FROM || TO_EMAIL;
const FROM_NAME = process.env.MAIL_FROM_NAME || 'Thurayilkunnu Temple Website';
const SUBJECT_PREFIX = process.env.MAIL_SUBJECT_PREFIX || '[Temple Enquiry]';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_SECURE = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === 'true'
    : SMTP_PORT === 465;
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined
});

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: Number(process.env.RATE_LIMIT_MAX || 8),
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many messages sent. Please try again later or call the temple office.' }
});

const clean = (value, max) => String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

const escapeHtml = (value) => value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

app.get('/health', (req, res) => {
    res.json({
        ok: true,
        smtpConfigured: Boolean(SMTP_USER && SMTP_PASS)
    });
});

const handleContact = async (req, res) => {
    const name = clean(req.body.name, 120);
    const email = clean(req.body.email, 160);
    const phone = clean(req.body.phone, 40);
    const inquiry = clean(req.body.subject, 160);
    const message = String(req.body.message ?? '').trim().slice(0, 5000);

    if (req.body.botcheck) {
        return res.json({ success: true });
    }

    if (!name || !message) {
        return res.status(400).json({ success: false, message: 'Please provide your name and message.' });
    }

    if (email && !isEmail(email)) {
        return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    if (!SMTP_USER || !SMTP_PASS) {
        console.error('[contact] SMTP credentials are not configured on the server.');
        return res.status(503).json({ success: false, message: 'Email service is not configured yet. Please call the temple office.' });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeInquiry = escapeHtml(inquiry || 'General Inquiry');

    try {
        await transporter.sendMail({
            from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
            to: TO_EMAIL,
            replyTo: email || undefined,
            subject: `${SUBJECT_PREFIX} ${inquiry || 'General Inquiry'} — ${name}`,
            text: [
                `Name: ${name}`,
                `Email: ${email || 'Not provided'}`,
                `Phone: ${phone || 'Not provided'}`,
                `Inquiry: ${inquiry || 'General Inquiry'}`,
                '',
                message,
                '',
                'Sent via Thurayilkunnu Temple Website'
            ].join('\n'),
            html: `
                <div style="font-family:Segoe UI,Arial,sans-serif;font-size:15px;color:#1c1917;line-height:1.6">
                    <h2 style="margin:0 0 14px;color:#7c2d12">New enquiry from the temple website</h2>
                    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;margin-bottom:16px">
                        <tr><td style="color:#78716c"><strong>Name</strong></td><td>${safeName}</td></tr>
                        <tr><td style="color:#78716c"><strong>Email</strong></td><td>${safeEmail || 'Not provided'}</td></tr>
                        <tr><td style="color:#78716c"><strong>Phone</strong></td><td>${safePhone || 'Not provided'}</td></tr>
                        <tr><td style="color:#78716c"><strong>Inquiry</strong></td><td>${safeInquiry}</td></tr>
                    </table>
                    <div style="white-space:pre-wrap;background:#fafaf9;border:1px solid #e7e5e4;border-radius:8px;padding:14px">${escapeHtml(message)}</div>
                    <p style="margin-top:16px;color:#78716c;font-size:13px">Sent via Thurayilkunnu Temple Website</p>
                </div>`
        });

        return res.json({ success: true });
    } catch (error) {
        console.error('[contact] sendMail failed:', error && error.message);
        return res.status(502).json({ success: false, message: 'Unable to send your message right now. Please try again or call the temple office.' });
    }
};

app.post('/contact', limiter, handleContact);
app.post('/', limiter, handleContact);

app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Not found' });
});

app.listen(PORT, () => {
    console.log(`[contact] server listening on port ${PORT}`);
    if (!SMTP_USER || !SMTP_PASS) {
        console.warn('[contact] SMTP_USER / SMTP_PASS are not set. Submissions will fail until they are configured.');
    }
});
