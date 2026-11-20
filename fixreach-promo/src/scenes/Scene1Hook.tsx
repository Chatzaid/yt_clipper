import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Pulse} from '../components/Visuals';

const TECHS = [
  {label: 'T01', angle: -150, color: '#F97316'},
  {label: 'T02', angle: -78, color: '#FB923C'},
  {label: 'T03', angle: -6, color: '#EF4444'},
  {label: 'T04', angle: 66, color: '#F87171'},
  {label: 'T05', angle: 138, color: '#FDBA74'},
];

const RingRoadDispatch: React.FC<{frame: number}> = ({frame}) => {
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - 46, fps, config: {damping: 18, stiffness: 92}});
  const roadFlow = interpolate(frame, [76, 300], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const centerPulse = 1 + 0.055 * Math.sin(frame / 7);

  return (
    <div
      style={{
        position: 'absolute',
        top: 650,
        left: '50%',
        width: 900,
        height: 480,
        maxWidth: '88%',
        transform: 'translateX(-50%) translateY(' + ((1 - enter) * 26) + 'px) scale(' + (0.985 + enter * 0.015) + ')',
        opacity: enter,
        borderRadius: 30,
        border: '2px solid #334155',
        background: 'linear-gradient(145deg, #08121F, #0C1929)',
        boxShadow: '0 24px 70px rgba(0,0,0,.38), 0 0 42px rgba(249,115,22,.08)',
        overflow: 'hidden',
      }}
    >
      <div style={{position: 'absolute', left: 30, right: 30, top: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{fontSize: 20, fontWeight: 950, letterSpacing: 2.4, color: '#FDBA74'}}>RING ROAD / SURAT</div>
        <div style={{padding: '8px 13px', borderRadius: 9, border: '1px solid #EF444488', background: '#451A1A88', color: '#FCA5A5', fontSize: 15, fontWeight: 950, letterSpacing: 1}}>
          SHARED ×5
        </div>
      </div>

      <svg width="900" height="480" viewBox="0 0 900 480" style={{position: 'absolute', inset: 0}}>
        <defs>
          <radialGradient id="dispatch-glow">
            <stop offset="0%" stopColor="#EF4444" stopOpacity=".24" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d="M0 250 H900 M450 70 V430" stroke="#1E293B" strokeWidth="2" strokeDasharray="7 17" opacity=".65" />
        <ellipse cx="450" cy="255" rx="342" ry="148" fill="none" stroke="#263548" strokeWidth="62" />
        <ellipse cx="450" cy="255" rx="342" ry="148" fill="none" stroke="#64748B" strokeWidth="2" strokeDasharray="16 18" strokeDashoffset={-frame * 2.2} opacity=".8" />
        <ellipse cx="450" cy="255" rx="307" ry="113" fill="none" stroke="#F97316" strokeWidth="2" strokeDasharray="7 24" strokeDashoffset={frame * 1.7} opacity=".38" />

        {TECHS.map((tech, index) => {
          const angle = (tech.angle + frame * (0.13 + index * 0.008)) * Math.PI / 180;
          const x = 450 + 342 * Math.cos(angle);
          const y = 255 + 148 * Math.sin(angle);
          const pulse = (frame * 0.022 + index * 0.19) % 1;
          const px = x + (450 - x) * pulse;
          const py = y + (255 - y) * pulse;
          const glow = 0.52 + 0.32 * Math.sin(frame / 6 + index);
          const routeOpacity = 0.2 + roadFlow * 0.42;

          return (
            <g key={tech.label}>
              <line x1={x} y1={y} x2="450" y2="255" stroke={tech.color} strokeWidth="3" strokeDasharray="7 13" opacity={routeOpacity} />
              <circle cx={px} cy={py} r="7" fill={tech.color} opacity=".95" />
              <circle cx={x} cy={y} r="34" fill={tech.color} opacity=".09" />
              <rect x={x - 31} y={y - 22} width="62" height="44" rx="12" fill="#111D2B" stroke={tech.color} strokeWidth="3" />
              <text x={x} y={y + 7} textAnchor="middle" fill="#F8FAFC" fontSize="17" fontWeight="900">{tech.label}</text>
              <circle cx={x} cy={y} r="42" fill="none" stroke={tech.color} strokeWidth="2" opacity={glow * .45} />
            </g>
          );
        })}

        <circle cx="450" cy="255" r={76 * centerPulse} fill="url(#dispatch-glow)" />
        <circle cx="450" cy="255" r="55" fill="#3B1118" stroke="#EF4444" strokeWidth="4" />
        <rect x="428" y="230" width="44" height="48" rx="7" fill="#111827" stroke="#FCA5A5" strokeWidth="2.5" />
        <path d="M437 242h26 M437 251h26 M437 260h18" stroke="#FCA5A5" strokeWidth="3" strokeLinecap="round" />
        <text x="450" y="300" textAnchor="middle" fill="#FCA5A5" fontSize="13" fontWeight="950" letterSpacing="1.5">ONE LEAD</text>
      </svg>

      <div style={{position: 'absolute', left: 30, right: 30, bottom: 17, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{fontSize: 18, fontWeight: 950, letterSpacing: 1.4, color: '#FCA5A5'}}>FIVE ROUTES. ONE CUSTOMER.</div>
        <div style={{fontSize: 12, fontWeight: 800, letterSpacing: 1.2, color: '#64748B'}}>SCHEMATIC / NOT TO SCALE</div>
      </div>
    </div>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const header = spring({frame: frame - 4, fps, config: {damping: 16, stiffness: 120}});
  const request = spring({frame: frame - 18, fps, config: {damping: 15, stiffness: 110}});

  return (
    <AbsoluteFill
      style={{
        background: '#0B0F19',
        color: '#F9FAFB',
        fontFamily: 'Inter, Arial, sans-serif',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 36%, rgba(249,115,22,.15), transparent 48%), radial-gradient(ellipse at 50% 74%, rgba(239,68,68,.08), transparent 52%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
          backgroundImage: 'linear-gradient(rgba(148,163,184,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.16) 1px, transparent 1px)',
          backgroundSize: '84px 84px',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 220,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: header,
          transform: 'translateY(' + ((1 - header) * 22) + 'px)',
        }}
      >
        <div style={{color: '#FDBA74', fontSize: 24, fontWeight: 950, letterSpacing: 4}}>
          FIXREACH / FIELD DISPATCH
        </div>
        <div style={{marginTop: 18, color: '#F8FAFC', fontSize: 56, lineHeight: 1, fontWeight: 950, letterSpacing: -1.8}}>
          ONE CUSTOMER. FIVE TECHS.
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 405,
          left: '50%',
          width: 850,
          maxWidth: '90%',
          minHeight: 210,
          boxSizing: 'border-box',
          padding: '26px 30px',
          border: '2px solid #F97316',
          borderRadius: 24,
          background: 'linear-gradient(145deg, rgba(31,41,55,.98), rgba(15,23,42,.98))',
          boxShadow: '0 24px 70px rgba(0,0,0,.42), 0 0 42px rgba(249,115,22,.13)',
          opacity: request,
          transform: 'translateX(-50%) translateY(' + ((1 - request) * 30) + 'px) scale(' + (0.97 + request * 0.03) + ')',
        }}
      >
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 18, paddingBottom: 17, borderBottom: '1px dashed #64748B'}}>
          <div style={{color: '#FDBA74', fontSize: 19, fontWeight: 950, letterSpacing: 2}}>
            INCOMING REPAIR REQUEST / 001
          </div>
          <div style={{flex: '0 0 auto', border: '2px solid #EF4444', borderRadius: 9, padding: '8px 12px', background: '#451A1A', color: '#FCA5A5', fontSize: 17, fontWeight: 950, letterSpacing: 1}}>
            SHARED ×5
          </div>
        </div>
        <div style={{marginTop: 22, fontSize: 48, lineHeight: 1.05, fontWeight: 950, letterSpacing: -1.2}}>
          FRIDGE NOT COOLING
        </div>
        <div style={{marginTop: 12, color: '#94A3B8', fontSize: 21, fontWeight: 850, letterSpacing: 2}}>
          RING ROAD / SURAT
        </div>
      </div>

      <RingRoadDispatch frame={frame} />
      <Pulse frame={frame} />
    </AbsoluteFill>
  );
};
