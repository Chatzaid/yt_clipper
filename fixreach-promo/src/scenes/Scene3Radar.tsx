import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {MapPin} from '../components/Visuals';

export const Scene3Radar: React.FC = () => {
  const f = useCurrentFrame();
  // Follow the spoken order: local targeting, the cross-city example, then the useful radius.
  // Phase handoffs are deliberately non-overlapping: never show two map stories at once.
  const localIntro = interpolate(f, [0, 18, 185, 193], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const crossCity = interpolate(f, [193, 205, 455, 463], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const serviceZone = interpolate(f, [463, 475, 635], [0, 1, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const sweep = (f * 1.35) % 360;
  const pulse = 1 + 0.035 * Math.sin(f / 7);

  return (
    <AbsoluteFill style={{background: '#0B0F19', color: '#F9FAFB', fontFamily: 'Inter, Arial, sans-serif', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 52%, #F9731618, transparent 58%)'}} />
      <div style={{fontSize: 38, fontWeight: 900, color: '#FB923C', marginBottom: 48, letterSpacing: 1.2}}>
        SURAT • HYPER-LOCAL TARGETING
      </div>

      <div style={{width: 820, height: 780, position: 'relative', border: '2px solid #263244', borderRadius: 32, background: 'linear-gradient(145deg, #111D2B, #0B111C)', overflow: 'hidden', boxShadow: '0 0 80px #F9731618'}}>
        <svg width="820" height="780" viewBox="0 0 820 780" style={{position: 'absolute', inset: 0}}>
          <defs>
            <pattern id="street-grid" width="78" height="78" patternUnits="userSpaceOnUse">
              <path d="M 78 0 L 0 0 0 78" fill="none" stroke="#243244" strokeWidth="2" />
            </pattern>
          </defs>
          <rect width="820" height="780" fill="url(#street-grid)" />
          <path d="M-30 180 C180 220 240 90 430 145 S680 245 860 190 M-40 560 C140 470 260 650 420 560 S660 430 860 520 M180 -30 C230 160 130 290 220 430 S300 630 250 820 M610 -30 C540 170 690 300 600 460 S550 650 620 820" fill="none" stroke="#34465A" strokeWidth="13" opacity=".55" />
          <path d="M-30 180 C180 220 240 90 430 145 S680 245 860 190 M-40 560 C140 470 260 650 420 560 S660 430 860 520" fill="none" stroke="#60758B" strokeWidth="2" strokeDasharray="7 13" opacity=".45" />
        </svg>

        {/* Introduce local targeting before showing the city-wide travel problem. */}
        <div style={{position: 'absolute', inset: 0, opacity: localIntro}}>
          <div style={{position: 'absolute', top: 30, left: 0, right: 0, textAlign: 'center', color: '#A7F3D0', fontSize: 24, fontWeight: 900, letterSpacing: 2}}>
            FIND CUSTOMERS NEAR THE SHOP
          </div>
          <svg width="820" height="780" viewBox="0 0 820 780">
            <circle cx="410" cy="390" r="230" fill="#10B9810B" stroke="#10B981" strokeWidth="4" strokeDasharray="12 12" />
            <circle cx="410" cy="390" r="150" fill="#10B98112" stroke="#34D399" strokeWidth="3" />
            <path d="M410 390 L410 160" stroke="#34D399" strokeWidth="5" strokeDasharray="9 10" transform={'rotate(' + sweep + ' 410 390)'} opacity=".8" />
            {[[260,270],[560,300],[300,545],[565,525]].map(([x,y],i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="12" fill="#34D399" />
                <circle cx={x} cy={y} r="25" fill="none" stroke="#34D399" strokeWidth="2" opacity=".5" />
              </g>
            ))}
          </svg>
          <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', filter: 'drop-shadow(0 0 22px #10B98188)'}}>
            <MapPin label="YOUR SHOP" color="#10B981" />
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 38, textAlign: 'center', color: '#A7F3D0', fontSize: 21, fontWeight: 800}}>
            HIGH-INTENT CUSTOMERS • LESS WASTED TRAVEL
          </div>
        </div>

        {/* The Varachha-to-Vesu trip appears during that exact voiceover line. */}
        <div style={{position: 'absolute', inset: 0, opacity: crossCity}}>
          <div style={{position: 'absolute', top: 30, left: 0, right: 0, textAlign: 'center', color: '#FCA5A5', fontSize: 25, fontWeight: 900, letterSpacing: 1.5}}>
            TARGETING THE WHOLE CITY
          </div>
          <svg width="820" height="780" viewBox="0 0 820 780">
            <path d="M180 245 C285 180 480 360 650 535" fill="none" stroke="#EF4444" strokeWidth="9" strokeDasharray="18 14" strokeLinecap="round" />
            <circle cx="180" cy="245" r="23" fill="#EF4444" stroke="#FEE2E2" strokeWidth="5" />
            <circle cx="650" cy="535" r="23" fill="#EF4444" stroke="#FEE2E2" strokeWidth="5" />
            <path d="M610 515 L650 535 L612 554" fill="none" stroke="#FCA5A5" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{position: 'absolute', left: 88, top: 175}}><MapPin label="VARACHHA" color="#F87171" /></div>
          <div style={{position: 'absolute', right: 70, bottom: 155}}><MapPin label="VESU" color="#F87171" /></div>
          <div style={{position: 'absolute', left: '50%', bottom: 118, transform: 'translateX(-50%)', background: '#3B1118', border: '2px solid #EF4444', borderRadius: 18, padding: '15px 24px', color: '#FECACA', fontSize: 23, fontWeight: 900, whiteSpace: 'nowrap'}}>
            PETROL + TIME LOSS
          </div>
        </div>

        {/* Finish with a clearly labelled shop-centred service radius. */}
        <div style={{position: 'absolute', inset: 0, opacity: serviceZone}}>
          <div style={{position: 'absolute', top: 25, left: 0, right: 0, textAlign: 'center', color: '#A7F3D0', fontSize: 25, fontWeight: 900, letterSpacing: 1.5}}>
            SET A REALISTIC SERVICE AREA
          </div>
          <svg width="820" height="780" viewBox="0 0 820 780">
            <circle cx="410" cy="390" r={290 * pulse} fill="#10B98108" stroke="#10B981" strokeWidth="5" strokeDasharray="16 12" />
            <circle cx="410" cy="390" r={150 * pulse} fill="#10B98116" stroke="#34D399" strokeWidth="4" />
            {[[265,270],[570,295],[280,555],[565,535]].map(([x,y],i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="11" fill="#34D399" />
                <circle cx={x} cy={y} r="24" fill="none" stroke="#34D399" strokeWidth="2" opacity=".55" />
              </g>
            ))}
          </svg>
          <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', filter: 'drop-shadow(0 0 22px #10B98188)'}}>
            <MapPin label="YOUR SHOP" color="#10B981" />
          </div>
          <div style={{position: 'absolute', left: 40, top: 245, background: '#0B2B24', border: '2px solid #34D399', borderRadius: 14, padding: '10px 16px', color: '#A7F3D0', fontSize: 22, fontWeight: 900}}>
            5 KM CORE
          </div>
          <div style={{position: 'absolute', right: 35, top: 495, background: '#0B2B24', border: '2px solid #10B981', borderRadius: 14, padding: '10px 16px', color: '#A7F3D0', fontSize: 22, fontWeight: 900}}>
            10 KM LIMIT
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 26, textAlign: 'center', color: '#9CA3AF', fontSize: 17, fontWeight: 700}}>
            SCHEMATIC ONLY • SET THE RADIUS FROM YOUR SHOP LOCATION
          </div>
        </div>
      </div>

      <div style={{marginTop: 34, fontSize: 31, fontWeight: 900, color: '#FB923C', letterSpacing: 0.6}}>
        TARGET THE SERVICE ZONE — NOT THE WHOLE CITY
      </div>
    </AbsoluteFill>
  );
};
