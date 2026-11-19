import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const proofPoints = [
  {
    number: '01',
    title: 'LOCAL REACH',
    detail: 'Show up inside your service radius',
  },
  {
    number: '02',
    title: 'DIRECT CONTACT',
    detail: 'WhatsApp messages and calls to your shop',
  },
  {
    number: '03',
    title: 'RATE PROTECTED',
    detail: 'Win on service — not the cheapest quote',
  },
];

export const Scene6CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({
    frame: frame - 4,
    fps,
    config: { damping: 18, stiffness: 82, mass: 0.9 },
  });
  const headline = spring({
    frame: frame - 14,
    fps,
    config: { damping: 16, stiffness: 110 },
  });
  const buttonPulse =
    1 + Math.max(0, interpolate(frame, [58, 82], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })) * 0.012 * Math.sin(frame / 7);

  return (
    <AbsoluteFill
      style={{
        background: '#080D16',
        color: '#F8FAFC',
        fontFamily: 'Inter, Arial, sans-serif',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.18,
          backgroundImage:
            'linear-gradient(rgba(148,163,184,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.12) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 52%, rgba(249,115,22,.16), transparent 58%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 20,
          top: 190,
          color: '#F8FAFC',
          opacity: 0.035,
          fontSize: 520,
          lineHeight: 0.9,
          fontWeight: 950,
          letterSpacing: -30,
        }}
      >
        06
      </div>

      <div
        style={{
          position: 'absolute',
          top: 88,
          left: 82,
          right: 82,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            color: '#CBD5E1',
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: 3,
          }}
        >
          FIXREACH <span style={{ color: '#F97316' }}>/</span> FIELD GROWTH
        </div>
        <div
          style={{
            color: '#94A3B8',
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: 2,
          }}
        >
          SURAT · 06 / 06
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 148,
          left: 82,
          right: 82,
          height: 4,
          background: '#253246',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, #F97316 0%, #F97316 72%, #10B981 100%)',
            boxShadow: '0 0 18px rgba(249,115,22,.55)',
            transformOrigin: 'left center',
            transform: 'scaleX(' + interpolate(frame, [0, 34], [0.08, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }) + ')',
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 248,
          width: 860,
          height: 1040,
          boxSizing: 'border-box',
          padding: 52,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: '2px solid #344256',
          borderRadius: 30,
          background:
            'linear-gradient(145deg, rgba(20,31,48,.98), rgba(10,16,27,.98) 72%)',
          boxShadow:
            '0 35px 100px rgba(0,0,0,.5), 0 0 60px rgba(249,115,22,.10)',
          transform:
            'translateX(-50%) translateY(' + ((1 - entrance) * 32) + 'px) scale(' +
            (0.965 + entrance * 0.035) + ')',
          opacity: entrance,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 30,
            bottom: 30,
            width: 8,
            borderRadius: '0 8px 8px 0',
            background: 'linear-gradient(180deg, #F97316, #FB923C 58%, #10B981)',
            boxShadow: '0 0 24px rgba(249,115,22,.4)',
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px dashed #475569',
            paddingBottom: 26,
          }}
        >
          <div>
            <div
              style={{
                color: '#F97316',
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: 3,
              }}
            >
              SERVICE GROWTH / WORK ORDER
            </div>
            <div
              style={{
                color: '#94A3B8',
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: 2,
                marginTop: 8,
              }}
            >
              A BETTER WAY TO WIN LOCAL WORK
            </div>
          </div>
          <div
            style={{
              border: '1px solid #10B981',
              color: '#6EE7B7',
              borderRadius: 8,
              padding: '10px 13px',
              fontSize: 17,
              fontWeight: 900,
              letterSpacing: 1,
            }}
          >
            READY
          </div>
        </div>

        <div>
          <div
            style={{
              color: '#F8FAFC',
              fontSize: 78,
              lineHeight: 0.98,
              fontWeight: 950,
              letterSpacing: -3,
              opacity: headline,
              transform: 'translateY(' + ((1 - headline) * 20) + 'px)',
            }}
          >
            MORE LOCAL
            <br />
            <span style={{ color: '#F97316' }}>ENQUIRIES.</span>
          </div>
          <div
            style={{
              marginTop: 24,
              maxWidth: 700,
              color: '#CBD5E1',
              fontSize: 27,
              lineHeight: 1.35,
              fontWeight: 650,
            }}
          >
            Keep your service rate. Own the customer conversation.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {proofPoints.map((point, index) => {
            const reveal = spring({
              frame: frame - 28 - index * 11,
              fps,
              config: { damping: 17, stiffness: 105 },
            });
            return (
              <div
                key={point.number}
                style={{
                  minHeight: 96,
                  boxSizing: 'border-box',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  padding: '15px 20px',
                  borderRadius: 14,
                  border: '1px solid #334155',
                  borderLeft: '5px solid ' + (index === 2 ? '#10B981' : '#F97316'),
                  background: 'rgba(30,41,59,.68)',
                  opacity: reveal,
                  transform: 'translateX(' + ((1 - reveal) * 24) + 'px)',
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    flex: '0 0 48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    background: index === 2 ? '#064E3B' : '#431F12',
                    color: index === 2 ? '#6EE7B7' : '#FDBA74',
                    fontSize: 19,
                    fontWeight: 950,
                  }}
                >
                  {point.number}
                </div>
                <div>
                  <div
                    style={{
                      color: '#F8FAFC',
                      fontSize: 23,
                      lineHeight: 1.1,
                      fontWeight: 950,
                      letterSpacing: 1.5,
                    }}
                  >
                    {point.title}
                  </div>
                  <div
                    style={{
                      color: '#AEBBCC',
                      fontSize: 18,
                      lineHeight: 1.25,
                      fontWeight: 600,
                      marginTop: 7,
                    }}
                  >
                    {point.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            transform: 'scale(' + buttonPulse + ')',
            minHeight: 94,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 30px',
            boxSizing: 'border-box',
            borderRadius: 16,
            background: '#10B981',
            color: '#052E24',
            boxShadow: '0 12px 36px rgba(16,185,129,.24)',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 17,
                fontWeight: 900,
                letterSpacing: 2,
                opacity: 0.78,
              }}
            >
              NEXT STEP
            </div>
            <div style={{ fontSize: 34, fontWeight: 950, marginTop: 3 }}>
              SEE HOW IT WORKS
            </div>
          </div>
          <div style={{ fontSize: 48, fontWeight: 900 }}>→</div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px dashed #475569',
            paddingTop: 22,
            color: '#94A3B8',
            fontSize: 17,
            fontWeight: 850,
            letterSpacing: 1.6,
          }}
        >
          <span>CLICK THE LINK IN BIO</span>
          <span style={{ color: '#FDBA74' }}>BINA RATE KAM KIYE</span>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 455,
          left: 82,
          right: 82,
          display: 'flex',
          justifyContent: 'space-between',
          color: '#64748B',
          fontSize: 16,
          fontWeight: 800,
          letterSpacing: 2,
        }}
      >
        <span>LOCAL ADS · DIRECT ENQUIRIES</span>
        <span>FIXREACH / SURAT</span>
      </div>
    </AbsoluteFill>
  );
};
