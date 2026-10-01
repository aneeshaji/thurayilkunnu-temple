import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.svg';
import '../styles/Logo.css';

const Logo = ({ className = '', scrolled = false }) => {
  const { i18n } = useTranslation();
  const isML = i18n.language?.startsWith('ml');

  return (
    <div className={`temple-brand-logo ${scrolled ? 'scrolled' : ''} ${isML ? 'lang-ml' : ''} ${className}`}>
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
          {isML ? 'തുറയിൽക്കുന്ന്' : 'THURAYILKUNNU'}
        </span>
        <span className="logo-brand-descriptor">
          {isML ? 'ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം' : 'SREE SUBRAMANYA SWAMI TEMPLE'}
        </span>
      </div>
    </div>
  );
};

export default Logo;