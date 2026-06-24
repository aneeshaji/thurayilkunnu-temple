import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';

// ── 1. Route-change scroll reset (invisible) ──────────────────────────────
export function RouteScrollReset() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [pathname]);
    return null;
}

// ── 2. Floating "Back to Top" button ─────────────────────────────────────
export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 350);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <>
            <button
                id="scroll-to-top-btn"
                onClick={scrollUp}
                aria-label="Back to top"
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    zIndex: 9999,
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, var(--primary, #722F37), var(--gold, #F89B29))',
                    color: '#fff',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.85)',
                    pointerEvents: visible ? 'auto' : 'none',
                    transition: 'opacity 0.35s ease, transform 0.35s ease',
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.08)';
                    e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.35)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.85)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)';
                }}
            >
                <ChevronUp size={22} strokeWidth={2.5} />
            </button>
        </>
    );
}
