import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Volume2, VolumeX, Play, Pause, Sparkles, Bell, X } from 'lucide-react';
import '../styles/BhaktiAudioPlayer.css';

/**
 * BhaktiAmbientAudioPlayer
 * Generates a peaceful temple bell and tanpura drone soundscape using Web Audio API.
 * Completely self-contained, 0 dependencies, zero external network requests, instant playback.
 */
const BhaktiAudioPlayer = () => {
    const { i18n } = useTranslation();
    const isML = i18n.language === 'ml';

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    const audioCtxRef = useRef(null);
    const masterGainRef = useRef(null);
    const timerRef = useRef(null);

    // Initialize Web Audio Context on demand
    const initAudio = () => {
        if (!audioCtxRef.current) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtxRef.current = new AudioContext();
            masterGainRef.current = audioCtxRef.current.createGain();
            masterGainRef.current.gain.value = 0.12; // gentle, non-intrusive ambient level
            masterGainRef.current.connect(audioCtxRef.current.destination);
        }
        if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
        }
    };

    // Play a gentle sacred temple bell tone (harmonics with long exponential decay)
    const playTempleBell = (freq = 528) => {
        if (!audioCtxRef.current || !masterGainRef.current) return;
        const ctx = audioCtxRef.current;
        const now = ctx.currentTime;

        // Fundamental + harmonics for rich metallic bell resonance
        const harmonics = [
            { mult: 1.0, gain: 0.5 },
            { mult: 2.76, gain: 0.2 },
            { mult: 5.4, gain: 0.1 },
            { mult: 8.9, gain: 0.05 }
        ];

        harmonics.forEach(({ mult, gain }) => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq * mult, now);

            // Strike and long natural decay (approx 3.5s)
            g.gain.setValueAtTime(0, now);
            g.gain.linearRampToValueAtTime(gain, now + 0.015);
            g.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

            osc.connect(g);
            g.connect(masterGainRef.current);

            osc.start(now);
            osc.stop(now + 4.0);
        });
    };

    // Play sacred Tanpura/Nadaswaram ambient root note
    const playTanpuraNote = (freq = 216) => {
        if (!audioCtxRef.current || !masterGainRef.current) return;
        const ctx = audioCtxRef.current;
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const g = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(0.08, now + 0.5);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

        osc.connect(g);
        g.connect(masterGainRef.current);

        osc.start(now);
        osc.stop(now + 4.8);
    };

    // Ambient loop sequence (Sa, Pa, High Sa bells at peaceful intervals)
    const startAmbientLoop = () => {
        const bellPitches = [396, 528, 432, 639, 528];
        let step = 0;

        const playNextCycle = () => {
            const pitch = bellPitches[step % bellPitches.length];
            playTempleBell(pitch);

            // Occasional warm tanpura root tone
            if (step % 2 === 0) {
                playTanpuraNote(216); // Om/Sa drone
            }

            step++;
            // Next chime after 3.2 seconds
            timerRef.current = setTimeout(playNextCycle, 3400);
        };

        playNextCycle();
    };

    const stopAmbientLoop = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    const togglePlay = () => {
        if (isPlaying) {
            stopAmbientLoop();
            setIsPlaying(false);
        } else {
            initAudio();
            startAmbientLoop();
            setIsPlaying(true);
        }
    };

    const toggleMute = (e) => {
        e.stopPropagation();
        if (!masterGainRef.current) return;
        if (isMuted) {
            masterGainRef.current.gain.value = 0.12;
            setIsMuted(false);
        } else {
            masterGainRef.current.gain.value = 0;
            setIsMuted(true);
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopAmbientLoop();
            if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
                audioCtxRef.current.close();
            }
        };
    }, []);

    if (isDismissed) {
        return (
            <aside className="bhakti-min-container">
                <button
                    type="button"
                    className={`bhakti-min-bell-btn ${isPlaying ? 'playing' : ''}`}
                    onClick={() => setIsDismissed(false)}
                    title={isML ? 'ക്ഷേത്ര മണിനാദം കേൾക്കാം' : 'Sanctum Chimes'}
                    aria-label={isML ? 'ക്ഷേത്ര മണിനാദം കേൾക്കാം' : 'Sanctum Chimes'}
                >
                    <Bell size={16} />
                    {isPlaying && <span className="bell-active-ring" />}
                </button>
            </aside>
        );
    }

    return (
        <aside className={`bhakti-player-container ${isPlaying ? 'playing' : ''}`}>
            <div className="bhakti-player-pill">
                {/* Visualizer Equalizer bars */}
                <div className="equalizer-bars" aria-hidden="true">
                    <span className={`eq-bar bar-1 ${isPlaying && !isMuted ? 'animate' : ''}`} />
                    <span className={`eq-bar bar-2 ${isPlaying && !isMuted ? 'animate' : ''}`} />
                    <span className={`eq-bar bar-3 ${isPlaying && !isMuted ? 'animate' : ''}`} />
                </div>

                <div className="bhakti-title-wrapper">
                    <span className="bhakti-mini-tag">
                        <Sparkles size={11} className="sparkle-gold" />
                        <span>{isML ? 'നാദധ്വനി' : 'Sanctum Chimes'}</span>
                    </span>
                    <span className="bhakti-label">
                        {isML ? 'ക്ഷേത്ര മണിനാദം' : 'Temple Chimes'}
                    </span>
                </div>

                {/* Play/Pause Button */}
                <button
                    type="button"
                    className="bhakti-ctrl-btn play-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                    }}
                    title={isPlaying ? (isML ? 'താൽക്കാലികമായി നിർത്തുക' : 'Pause Chimes') : (isML ? 'മണിനാദം കേൾക്കാം' : 'Play Sacred Temple Chimes')}
                    aria-label={isPlaying ? (isML ? 'താൽക്കാലികമായി നിർത്തുക' : 'Pause Chimes') : (isML ? 'മണിനാദം കേൾക്കാം' : 'Play Sacred Temple Chimes')}
                >
                    {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                </button>

                {/* Mute/Unmute */}
                {isPlaying && (
                    <button
                        type="button"
                        className="bhakti-ctrl-btn mute-btn"
                        onClick={toggleMute}
                        title={isMuted ? (isML ? 'ശബ്ദം ഓൺ ചെയ്യുക' : 'Unmute') : (isML ? 'നിശ്ശബ്ദമാക്കുക' : 'Mute')}
                        aria-label={isMuted ? (isML ? 'ശബ്ദം ഓൺ ചെയ്യുക' : 'Unmute') : (isML ? 'നിശ്ശബ്ദമാക്കുക' : 'Mute')}
                    >
                        {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                    </button>
                )}

                {/* Close/Minimize Pill */}
                <button
                    type="button"
                    className="bhakti-ctrl-btn dismiss-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsDismissed(true);
                    }}
                    title={isML ? 'ചുരുക്കുക' : 'Minimize player'}
                    aria-label={isML ? 'ചുരുക്കുക' : 'Minimize player'}
                >
                    <X size={13} />
                </button>
            </div>
        </aside>
    );
};

export default BhaktiAudioPlayer;
