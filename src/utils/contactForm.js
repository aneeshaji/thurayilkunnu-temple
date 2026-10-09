/**
 * Contact submissions are sent to the site's contact endpoint (/api/contact),
 * which relays devotee enquiries to info@thurayilkunnutemple.com.
 *
 * In production (cPanel/LiteSpeed), this routes to /api/contact.php.
 * In local dev, Vite handles this to verify form flows cleanly.
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
                error: result?.message || 'Unable to send your message right now. Please try again or call the temple office.',
                mailto: buildFallbackMailto(formData)
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
