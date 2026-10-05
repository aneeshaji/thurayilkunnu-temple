/**
 * Contact submissions are sent to the site's own Nodemailer endpoint, which
 * relays them to info@thurayilkunnutemple.com over Gmail SMTP. The server
 * lives in /server and is deployed separately, so no SMTP credentials or
 * third-party keys are ever exposed in the browser bundle.
 *
 * Override the path only if the endpoint is mounted elsewhere:
 *   VITE_CONTACT_API_URL=/api/contact
 */
const API_URL = import.meta.env.VITE_CONTACT_API_URL || '/api/contact';

const CONTACT_EMAIL = 'info@thurayilkunnutemple.com';

const buildFallbackMailto = ({ name, email, phone, subject, message }) => {
    const body = [
        `Name: ${name}`,
        `Email: ${email || 'Not provided'}`,
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
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                subject: formData.subject,
                message: formData.message,
                botcheck: ''
            })
        });

        let result = {};
        try {
            result = await response.json();
        } catch {
            result = {};
        }

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
            error: 'Could not reach the temple server. You can send this message using your own email app instead.',
            mailto: buildFallbackMailto(formData)
        };
    }
};
