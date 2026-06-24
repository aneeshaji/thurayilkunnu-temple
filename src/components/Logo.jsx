import React from 'react';
import { Sparkles } from 'lucide-react';
import logo from '../assets/logo.svg';

const Logo = ({ className = '', style = {}, scrolled = false }) => {
  // Logo text should be white on hero, and primary color when scrolled
  const textColor = scrolled ? 'var(--primary, #722F37)' : '#ffffff';
  const subTextColor = scrolled ? 'var(--text-light, #718096)' : 'rgba(255,255,255,0.8)';

  return (
    <div className={`premium-logo ${className}`} style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      cursor: 'pointer',
      transition: 'all 0.4s ease',
      ...style
    }}>
      <div className="logo-symbol-wrapper" style={{
        position: 'relative',
        width: scrolled ? '38px' : '45px',
        height: scrolled ? '38px' : '45px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.4s ease'
      }}>
        <div className="logo-ring" style={{
            position: 'absolute',
            inset: '-2px',
            border: '2px solid var(--gold, #F89B29)',
            borderRadius: '50%',
            opacity: 0.3,
            animation: 'pulseRing 4s infinite'
        }}></div>
        <img
          src={logo}
          alt="Temple Icon"
          style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'relative', zIndex: 2 }}
        />
      </div>

      <div className="logo-text-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        {/* Top micro-label: Thurayilkunnu */}
        <span style={{
            fontSize: scrolled ? '0.55rem' : '0.62rem',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            color: 'var(--gold, #F89B29)',
            fontWeight: '700',
            transition: 'all 0.4s ease',
            whiteSpace: 'nowrap'
        }}>
            Thurayilkunnu
        </span>

        {/* Main bold line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{
                fontFamily: 'var(--serif, "Playfair Display")',
                fontWeight: '900',
                fontSize: scrolled ? '1.05rem' : '1.3rem',
                color: textColor,
                letterSpacing: '-0.3px',
                lineHeight: '1',
                transition: 'all 0.4s ease',
                textShadow: scrolled ? 'none' : '0 2px 4px rgba(0,0,0,0.2)',
                whiteSpace: 'nowrap'
            }}>
                Sree Subramanya
            </span>
            {!scrolled && <Sparkles size={13} color="#F89B29" style={{ flexShrink: 0 }} />}
        </div>

        {/* Bottom subtitle */}
        <span style={{
            fontSize: scrolled ? '0.58rem' : '0.68rem',
            textTransform: 'uppercase',
            letterSpacing: '4.5px',
            color: subTextColor,
            fontWeight: '700',
            marginTop: '1px',
            transition: 'all 0.4s ease',
            whiteSpace: 'nowrap'
        }}>
            Swami Temple
        </span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulseRing {
            0% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.1); opacity: 0.1; }
            100% { transform: scale(1); opacity: 0.3; }
        }
      `}} />
    </div>
  );
};

export default Logo;
