import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene2Flow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // The bargaining quote follows its spoken line, then clears before the social-feed story begins.
  const quoteIn = interpolate(frame, [159, 177], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const quoteOut = interpolate(frame, [230, 250], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const quote = Math.min(quoteIn, quoteOut);
  const feed = spring({
    frame: frame - 252,
    fps,
    config: { damping: 18, stiffness: 72 },
  });
  // A neutral feed skeleton bridges the spoken "people are scrolling" line to the sponsored ad reveal.
  const feedSkeleton = interpolate(frame, [252, 268, 435, 450], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const route = interpolate(frame, [270, 324], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const adReveal = spring({
    frame: frame - 435,
    fps,
    config: { damping: 16, stiffness: 105 },
  });
  const callReveal = interpolate(frame, [510, 538], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pulse = 1 + callReveal * 0.028 * Math.sin(frame / 5);

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
          opacity: 0.14,
          backgroundImage:
            'linear-gradient(rgba(148,163,184,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.13) 1px, transparent 1px)',
          backgroundSize: '76px 76px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 52%, rgba(249,115,22,.15), transparent 58%), radial-gradient(ellipse at 78% 70%, rgba(16,185,129,.08), transparent 44%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 250,
          left: 60,
          right: 60,
          textAlign: 'center',
          color: '#FB923C',
          fontSize: 34,
          fontWeight: 950,
          letterSpacing: 2.4,
        }}
      >
        THE PRICE RACE
      </div>
      <div
        style={{
          position: 'absolute',
          top: 300,
          left: 80,
          right: 80,
          textAlign: 'center',
          color: '#94A3B8',
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: 2,
        }}
      >
        ONE CUSTOMER · FIVE QUOTES · LOWER MARGINS
      </div>

      {/* A paper-like customer message makes the ₹200 undercut feel tangible. */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '51%',
          width: 820,
          maxWidth: '84%',
          boxSizing: 'border-box',
          padding: '34px 42px 38px',
          border: '2px solid #EF4444',
          borderRadius: 22,
          background: 'linear-gradient(145deg, #1B2432, #111827)',
          boxShadow: '0 28px 80px rgba(0,0,0,.48), 0 0 42px rgba(239,68,68,.12)',
          opacity: quote,
          transform:
            'translate(-50%, -50%) translateY(' + ((1 - quote) * 34) + 'px) scale(' +
            (0.97 + quote * 0.03) + ')',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 18,
            paddingBottom: 18,
            borderBottom: '1px dashed #64748B',
          }}
        >
          <div style={{ color: '#FCA5A5', fontSize: 19, fontWeight: 950, letterSpacing: 2 }}>
            CUSTOMER MESSAGE / PRICE UNDERCUT
          </div>
          <div
            style={{
              flex: '0 0 auto',
              padding: '8px 12px',
              border: '2px solid #EF4444',
              borderRadius: 9,
              color: '#FCA5A5',
              background: '#451A1A',
              fontSize: 16,
              fontWeight: 950,
              letterSpacing: 1,
              transform: 'rotate(-4deg)',
            }}
          >
            RATE CUT
          </div>
        </div>
        <div
          style={{
            marginTop: 30,
            fontSize: 43,
            lineHeight: 1.2,
            fontWeight: 900,
            textAlign: 'center',
          }}
        >
          “Bhaiya, doosre wale ne toh
          <span style={{ color: '#F87171' }}> ₹200 kam </span>
          bola hai!”
        </div>
        <div
          style={{
            marginTop: 28,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 14,
            color: '#FCA5A5',
            fontSize: 19,
            fontWeight: 900,
            letterSpacing: 1.5,
          }}
        >
          <span style={{ width: 54, height: 2, background: '#EF4444' }} />
          THE SAME JOB. A LOWER QUOTE.
          <span style={{ width: 54, height: 2, background: '#EF4444' }} />
        </div>
      </div>

      {/* The next beat shows how a local ad moves from a social feed to a direct call. */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '52%',
          width: 850,
          maxWidth: '88%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          opacity: feed,
          transform:
            'translate(-50%, -50%) translateY(' + ((1 - feed) * 42) + 'px) scale(' +
            (0.98 + feed * 0.02) + ')',
        }}
      >
        <div
          style={{
            width: 218,
            minHeight: 300,
            flex: '0 0 218px',
            boxSizing: 'border-box',
            padding: 20,
            border: '2px solid #F97316',
            borderRadius: 22,
            background: 'linear-gradient(160deg, #202B3C, #111827)',
            boxShadow: '0 18px 50px rgba(249,115,22,.12)',
            textAlign: 'center',
          }}
        >
          <div style={{ color: '#FDBA74', fontSize: 15, fontWeight: 950, letterSpacing: 1.5 }}>
            LOCAL REPAIR SHOP
          </div>
          <svg viewBox="0 0 180 150" width="100%" style={{ marginTop: 18 }}>
            <path d="M18 66 L90 18 L162 66" fill="none" stroke="#F97316" strokeWidth="9" />
            <rect x="32" y="64" width="116" height="70" rx="9" fill="#172338" stroke="#F97316" strokeWidth="6" />
            <rect x="75" y="91" width="32" height="43" rx="4" fill="#0B0F19" stroke="#FDBA74" strokeWidth="4" />
            <rect x="43" y="80" width="24" height="20" rx="3" fill="#10B981" />
            <rect x="113" y="80" width="24" height="20" rx="3" fill="#10B981" />
          </svg>
          <div style={{ marginTop: 14, fontSize: 23, fontWeight: 950 }}>SURAT</div>
          <div style={{ marginTop: 7, color: '#9CA3AF', fontSize: 15, fontWeight: 800 }}>
            AC · FRIDGE · WASHING MACHINE
          </div>
        </div>

        <svg width="100" height="90" viewBox="0 0 100 90" style={{ flex: '0 0 100px', overflow: 'visible' }}>
          <path
            d="M5 45 H88 M70 26 L90 45 L70 64"
            fill="none"
            stroke="#10B981"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="130"
            strokeDashoffset={130 * (1 - route)}
          />
          <circle cx={5 + 80 * route} cy="45" r="7" fill="#6EE7B7" />
        </svg>

        <div
          style={{
            width: 420,
            height: 600,
            flex: '0 0 420px',
            boxSizing: 'border-box',
            padding: 18,
            border: '8px solid #E5E7EB',
            borderRadius: 46,
            background: '#101827',
            position: 'relative',
            boxShadow: '0 22px 64px rgba(0,0,0,.5), 0 0 42px rgba(16,185,129,.12)',
          }}
        >
          <div style={{ width: 88, height: 9, borderRadius: 9, background: '#6B7280', margin: '0 auto 18px' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 23, fontWeight: 950 }}>Social Feed</div>
            <div style={{ display: 'flex', gap: 7 }}>
              <span style={{ background: '#D946EF', padding: '5px 8px', borderRadius: 7, fontSize: 15, fontWeight: 950 }}>IG</span>
              <span style={{ background: '#2563EB', padding: '5px 8px', borderRadius: 7, fontSize: 15, fontWeight: 950 }}>f</span>
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              top: 110,
              left: 18,
              right: 18,
              height: 365,
              zIndex: 2,
              boxSizing: 'border-box',
              padding: 16,
              border: '1px solid #334155',
              borderRadius: 18,
              background: '#1F2937',
              opacity: feedSkeleton,
              transform: 'translateY(' + ((1 - feedSkeleton) * 12) + 'px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 16, background: '#475569' }} />
              <div style={{ flex: 1 }}>
                <div style={{ height: 10, width: '48%', borderRadius: 6, background: '#64748B' }} />
                <div style={{ height: 8, width: '32%', marginTop: 7, borderRadius: 6, background: '#475569' }} />
              </div>
            </div>
            <div
              style={{
                height: 145,
                marginTop: 18,
                borderRadius: 13,
                background: 'linear-gradient(135deg, #2A4054, #111827)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ width: 60, height: 60, borderRadius: 30, border: '3px solid #475569', opacity: 0.55 }} />
            </div>
            <div style={{ height: 10, width: '82%', marginTop: 18, borderRadius: 6, background: '#64748B' }} />
            <div style={{ height: 8, width: '58%', marginTop: 10, borderRadius: 6, background: '#475569' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 18 }}>
              <div style={{ height: 8, width: 58, borderRadius: 6, background: '#334155' }} />
              <div style={{ height: 8, width: 58, borderRadius: 6, background: '#334155' }} />
              <div style={{ height: 8, width: 58, borderRadius: 6, background: '#334155' }} />
            </div>
            <div style={{ position: 'absolute', left: 16, right: 16, bottom: 12, color: '#94A3B8', fontSize: 12, fontWeight: 900, letterSpacing: 1.2, textAlign: 'center' }}>
              SCROLLING LOCAL POSTS
            </div>
          </div>
          <div
            style={{
              padding: 17,
              border: '1px solid #334155',
              borderRadius: 18,
              background: '#1F2937',
              position: 'relative',
              zIndex: 1,
              opacity: adReveal,
              transform: 'translateY(' + ((1 - adReveal) * 18) + 'px)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <b style={{ fontSize: 18 }}>Surat Repair Pro</b>
              <span style={{ color: '#6EE7B7', fontSize: 13, fontWeight: 900 }}>SPONSORED</span>
            </div>
            <div style={{ marginTop: 4, fontSize: 14, color: '#9CA3AF' }}>Local service · Surat</div>
            <div
              style={{
                height: 145,
                marginTop: 15,
                borderRadius: 13,
                background: 'linear-gradient(135deg, #2A4054, #111827)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 58,
              }}
            >
              ❄️
            </div>
            <div style={{ marginTop: 14, fontSize: 23, fontWeight: 950 }}>AC / FRIDGE NOT COOLING?</div>
            <div style={{ marginTop: 5, fontSize: 16, color: '#D1D5DB' }}>Book a local home-service visit</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 5px 17px', color: '#9CA3AF', fontSize: 14 }}>
            <span>♥ Like</span><span>◉ Comment</span><span>↗ Share</span>
          </div>
          <div
            style={{
              opacity: callReveal,
              transform: 'scale(' + pulse + ')',
              background: '#10B981',
              borderRadius: 15,
              padding: '16px 12px',
              textAlign: 'center',
              color: '#052E24',
              fontSize: 25,
              fontWeight: 950,
              boxShadow: '0 0 30px rgba(16,185,129,.55)',
            }}
          >
            CALL THE SHOP
          </div>
        </div>
      </div>

    </AbsoluteFill>
  );
};
