import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Technician, Pulse } from '../components/Visuals';

const branchX = [75, 250, 425, 600, 775];

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame() * (420 / 250);
  const { fps } = useVideoConfig();

  const header = spring({
    frame: frame - 4,
    fps,
    config: { damping: 16, stiffness: 120 },
  });
  const request = spring({
    frame: frame - 18,
    fps,
    config: { damping: 15, stiffness: 110 },
  });
  const footer = spring({
    frame: frame - 142,
    fps,
    config: { damping: 16, stiffness: 120 },
  });

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
          background:
            'radial-gradient(ellipse at 50% 36%, rgba(249,115,22,.15), transparent 48%), radial-gradient(ellipse at 50% 74%, rgba(239,68,68,.08), transparent 52%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
          backgroundImage:
            'linear-gradient(rgba(148,163,184,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.16) 1px, transparent 1px)',
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
        <div
          style={{
            color: '#FDBA74',
            fontSize: 24,
            fontWeight: 950,
            letterSpacing: 4,
          }}
        >
          FIXREACH / FIELD DISPATCH
        </div>
        <div
          style={{
            marginTop: 18,
            color: '#F8FAFC',
            fontSize: 56,
            lineHeight: 1,
            fontWeight: 950,
            letterSpacing: -1.8,
          }}
        >
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
          transform:
            'translateX(-50%) translateY(' + ((1 - request) * 30) + 'px) scale(' +
            (0.97 + request * 0.03) + ')',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 18,
            paddingBottom: 17,
            borderBottom: '1px dashed #64748B',
          }}
        >
          <div
            style={{
              color: '#FDBA74',
              fontSize: 19,
              fontWeight: 950,
              letterSpacing: 2,
            }}
          >
            INCOMING REPAIR REQUEST / 001
          </div>
          <div
            style={{
              flex: '0 0 auto',
              border: '2px solid #EF4444',
              borderRadius: 9,
              padding: '8px 12px',
              background: '#451A1A',
              color: '#FCA5A5',
              fontSize: 17,
              fontWeight: 950,
              letterSpacing: 1,
            }}
          >
            SHARED ×5
          </div>
        </div>
        <div
          style={{
            marginTop: 22,
            fontSize: 48,
            lineHeight: 1.05,
            fontWeight: 950,
            letterSpacing: -1.2,
          }}
        >
          FRIDGE NOT COOLING
        </div>
        <div
          style={{
            marginTop: 12,
            color: '#94A3B8',
            fontSize: 21,
            fontWeight: 850,
            letterSpacing: 2,
          }}
        >
          RING ROAD / SURAT
        </div>
      </div>

      <svg
        width="850"
        height="190"
        viewBox="0 0 850 190"
        style={{
          position: 'absolute',
          top: 645,
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: '90%',
          overflow: 'visible',
        }}
      >
        {branchX.map((x, index) => {
          const length = 160 + Math.abs(425 - x);
          const routeProgress = interpolate(
            frame,
            [54 + index * 7, 84 + index * 7],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
          );
          return (
            <g key={x}>
              <path
                d={'M425 0 V36 H' + x + ' V160'}
                fill="none"
                stroke="#F97316"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={length}
                strokeDashoffset={length * (1 - routeProgress)}
              />
              <circle cx={x} cy="160" r="8" fill="#F97316" opacity={routeProgress} />
            </g>
          );
        })}
      </svg>

      <div
        style={{
          position: 'absolute',
          top: 835,
          left: '50%',
          width: 850,
          maxWidth: '92%',
          display: 'flex',
          justifyContent: 'space-between',
          transform: 'translateX(-50%)',
        }}
      >
        {branchX.map((x, index) => {
          const reveal = spring({
            frame: frame - 84 - index * 7,
            fps,
            config: { damping: 16, stiffness: 115 },
          });
          const color = index % 2 === 0 ? '#F9FAFB' : '#FDBA74';
          return (
            <div
              key={x}
              style={{
                width: 150,
                minHeight: 170,
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 6px',
                border: '1px solid #7F2D1D',
                borderTop: '4px solid #F97316',
                borderRadius: 16,
                background: 'rgba(17,24,39,.96)',
                boxShadow: '0 14px 34px rgba(0,0,0,.28)',
                opacity: reveal,
                transform:
                  'translateY(' + ((1 - reveal) * 22 + 3 * Math.sin(frame / 5 + index)) +
                  'px) scale(' + (0.95 + reveal * 0.05) + ')',
              }}
            >
              <Technician color={color} label={'TECH 0' + (index + 1)} />
              <div
                style={{
                  marginTop: 4,
                  color: '#FCA5A5',
                  fontSize: 12,
                  fontWeight: 950,
                  letterSpacing: 1.2,
                }}
              >
                SAME REQUEST
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 420,
          textAlign: 'center',
          opacity: footer,
          transform: 'translateY(' + ((1 - footer) * 18) + 'px)',
          color: '#CBD5E1',
          fontSize: 27,
          fontWeight: 900,
          letterSpacing: 1.5,
        }}
      >
        RING ROAD TRAFFIC / EVERYONE CHASING THE SAME LEAD
      </div>
      <Pulse frame={frame} />
    </AbsoluteFill>
  );
};
