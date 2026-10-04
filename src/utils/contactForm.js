/**
 * Web3Forms access key is supplied at build time so it is never committed.
 * Sign up free at https://web3forms.com and add the key to a local .env file:
 *
 *   VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
 *
 * Without a key the contact form falls back to opening the visitor's mail
 * client with the message pre-filled, so the form never silently fails.
 */
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const CONTACT_EMAIL = 'info@thurayilkunnutemple.com';

export const isEmailConfigured = Boolean(ACCESS_KEY);

const buildFallbackMailto = ({ name, phone, subject, message }) => {
    const body = [
        `Name: ${name}`,
        `Phone: ${phone || 'Not provided'}`,
        `Inquiry: ${subject || 'General Inquiry'}`,
        '',
        message,
        '',
        'Sent via Thurayilkunnu Temple Website'
    ].join('\n');

    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`[${subject || 'General Inquiry'}] ${name}`)}&body=${encodeURIComponent(body)}`;
};

export const sendContactEmail = async (formData) => {
    if (!ACCESS_KEY) {
        window.location.href = buildFallbackMailto(formData);
        return { ok: true, fallback: true };
    }

    try {
        const response = await fetch(WEB3FORMS_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                access_key: ACCESS_KEY,
                subject: `[${formData.subject || 'General Inquiry'}] ${formData.name}`,
                name: formData.name,
                phone: formData.phone || 'Not provided',
                message: formData.message,
                from_name: formData.name,
                replyto: formData.email || undefined,
                botcheck: ''
            })
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            return {
                ok: false,
                error: result?.message || 'Unable to send your message right now. Please try again or call the temple office.'
            };
        }

        return { ok: true };
    } catch {
        return {
            ok: false,
            error: 'Network error while sending. Please check your connection and try again, or call the temple office.'
        };
    }
};
