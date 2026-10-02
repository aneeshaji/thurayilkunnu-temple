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
          alt="Temple Sacred Vel Emblem"
          className="logo-emblem-img"
        />
      </div>

      {/* Modern Architectural Typography Block */}
      <div className="logo-text-block">
        <span className="logo-brand-primary">
          THURAYILKUNNU
        </span>
        <span className="logo-brand-descriptor">
          SREE SUBRAMANYA SWAMI TEMPLE
        </span>
      </div>
    </div>
  );
};

export default Logo;