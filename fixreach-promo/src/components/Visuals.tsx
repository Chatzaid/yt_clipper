import React from 'react';
import {interpolate} from 'remotion';

export const Card: React.FC<{title: string; accent?: string; width?: number; children?: React.ReactNode}> = ({
  title, accent = '#F97316', width = 760, children,
}) => (
  <div style={{
    width,
    background: '#111827',
    border: '2px solid ' + accent,
    borderRadius: 28,
    padding: 36,
    boxShadow: '0 18px 60px ' + accent + '22',
  }}>
    <div style={{fontSize: 28, color: accent, fontWeight: 900, marginBottom: 24}}>{title}</div>
    {children}
  </div>
);

export const Technician: React.FC<{color: string; label: string}> = ({color, label}) => (
  <div style={{width: 110, height: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
    <svg width="70" height="80" viewBox="0 0 70 80">
      <circle cx="35" cy="15" r="13" fill={color}/>
      <path d="M12 72 Q12 34 35 34 Q58 34 58 72Z" fill={color}/>
    </svg>
    <div style={{fontSize: 15, color: '#9CA3AF', fontWeight: 800}}>{label}</div>
  </div>
);

export const Pulse: React.FC<{frame: number}> = ({frame}) => (
  <div style={{position: 'absolute', top: 120, right: 110, width: 14, height: 14, borderRadius: 20, background: '#F97316', boxShadow: '0 0 ' + (12 + Math.abs(Math.sin(frame / 5)) * 24) + 'px #F97316'}}/>
);

export const MapPin: React.FC<{label: string; color: string}> = ({label, color}) => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <div style={{width: 24, height: 24, borderRadius: 20, background: color, boxShadow: '0 0 25px ' + color}}/>
    <div style={{marginTop: 12, fontSize: 21, fontWeight: 900, color}}>{label}</div>
  </div>
);

export const RadarRings: React.FC<{frame: number}> = ({frame}) => {
  const scale = 1 + (frame % 45) / 45 * 0.8;
  return <div style={{width: 330, height: 330, border: '4px solid #F97316', borderRadius: 300, transform: 'translate(-50%,-50%) scale(' + scale + ')', opacity: interpolate(frame % 45, [0, 45], [0.9, 0.2]), boxShadow: '0 0 40px #F9731688'}}/>;
};

export const Stamp: React.FC<{frame: number; text: string}> = ({frame, text}) => (
  <div style={{marginTop: 100, border: '5px solid #10B981', borderRadius: 18, padding: '25px 42px', fontSize: 38, fontWeight: 900, color: '#10B981', transform: 'rotate(-2deg) scale(' + interpolate(frame, [30, 60], [0.75, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) + ')'}}>{text}</div>
);

export const Phone: React.FC = () => <div style={{width: 260, height: 480, border: '8px solid #F9FAFB', borderRadius: 38, background: '#111827'}}/>;
