import React from 'react';
import logo from '../assets/logo.svg';
import '../styles/Logo.css';

const Logo = ({ className = '', scrolled = false }) => {
  return (
    <div className={`temple-brand-logo ${scrolled ? 'scrolled' : ''} ${className}`}>
      {/* Sacred Vel Emblem in Glowing Halo Badge */}
      <div className="logo-emblem-badge">
        <img
          src={logo}
          alt="Temple Sacred Emblem"
          className="logo-emblem-img"
        />
      </div>

      {/* Regal Typography Block */}
      <div className="logo-text-block">
        {/* Main Title in Royal Serif with Golden Tint */}
        <div className="logo-title-row">
          <span className="logo-title-main">
            THURAYILKUNNU
          </span>
          <span className="logo-title-sree">
            SREE
          </span>
        </div>

        {/* Subtitle in Glowing Nilavilakku Brass */}
        <span className="logo-subtitle">
          SUBRAMANYA SWAMI TEMPLE
        </span>

        {/* Sacred Murugan Chant Micro-Pill (hidden on mobile and scrolled) */}
        <span className="logo-chant-tag">
          ✦ HARO HARA &bull; HARA HARA ✦
        </span>
      </div>
    </div>
  );
};

export default Logo;