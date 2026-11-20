import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const spendDays = ['DAY 01', 'DAY 02', 'DAY 03'];

export const Scene5ROI: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const receipt = spring({
    frame: frame - 10,
    fps,
    config: { damping: 16, stiffness: 92, mass: 0.9 },
  });
  const bridge = interpolate(frame, [42, 72], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const note = spring({
    frame: frame - 116,
    fps,
    config: { damping: 18, stiffness: 110 },
  });

  return (
    <AbsoluteFill
      style={{
        background: '#0B0F19',
        color: '#F9FAFB',
        fontFamily: 'Inter, Arial, sans-serif',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 52%, rgba(16,185,129,.13), transparent 58%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.12,
          backgroundImage:
            'linear-gradient(rgba(148,163,184,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.12) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 112,
          left: 78,
          right: 78,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#94A3B8',
          fontSize: 19,
          fontWeight: 850,
          letterSpacing: 2,
        }}
      >
        <span>FIXREACH / REPAIR ECONOMICS</span>
        <span>FIELD NOTE 05</span>
      </div>

      <div
        style={{
          width: '100%',
          maxWidth: 960,
          padding: 40,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 25,
          position: 'relative',
          transform: 'translateY(-190px)',
        }}
      >
        <div
          style={{
            fontSize: 49,
            lineHeight: 1.12,
            fontWeight: 950,
            letterSpacing: -1.8,
            textAlign: 'center',
          }}
        >
          ONE REPAIR MARGIN
          <br />
          <span style={{ color: '#34D399' }}>CAN OFFSET DAYS OF ADS</span>
        </div>

        <div
          style={{
            width: 760,
            maxWidth: '100%',
            minHeight: 220,
            boxSizing: 'border-box',
            padding: '28px 32px',
            border: '2px solid #475569',
            borderRadius: 22,
            background:
              'linear-gradient(145deg, rgba(30,41,59,.98), rgba(15,23,42,.98))',
            boxShadow: '0 22px 65px rgba(0,0,0,.34)',
            opacity: receipt,
            transform:
              'translateY(' + ((1 - receipt) * 34) + 'px) scale(' +
              (0.97 + receipt * 0.03) + ')',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: 18,
              borderBottom: '1px dashed #64748B',
            }}
          >
            <span
              style={{
                color: '#FDBA74',
                fontSize: 18,
                fontWeight: 950,
                letterSpacing: 2,
              }}
            >
              SERVICE WORK ORDER
            </span>
            <span
              style={{
                border: '1px solid #10B981',
                borderRadius: 7,
                padding: '7px 10px',
                color: '#6EE7B7',
                fontSize: 15,
                fontWeight: 900,
                letterSpacing: 1,
              }}
            >
              ILLUSTRATIVE
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 20,
              paddingTop: 23,
            }}
          >
            <div>
              <div
                style={{
                  color: '#94A3B8',
                  fontSize: 17,
                  fontWeight: 850,
                  letterSpacing: 2,
                }}
              >
                VALUE CREATED BY
              </div>
              <div
                style={{
                  color: '#F8FAFC',
                  fontSize: 34,
                  lineHeight: 1.12,
                  fontWeight: 950,
                  marginTop: 8,
                }}
              >
                ONE COMPLETED REPAIR
              </div>
              <div
                style={{
                  color: '#A7F3D0',
                  fontSize: 21,
                  fontWeight: 800,
                  marginTop: 9,
                }}
              >
                The job's contribution margin
              </div>
            </div>
            <div
              style={{
                width: 92,
                height: 92,
                flex: '0 0 92px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 18,
                background: '#064E3B',
                border: '1px solid #10B981',
                color: '#6EE7B7',
                fontSize: 43,
                fontWeight: 950,
              }}
            >
              01
            </div>
          </div>
          <div
            style={{
              height: 6,
              marginTop: 24,
              borderRadius: 6,
              background:
                'linear-gradient(90deg, #F97316 0%, #FB923C 42%, #10B981 100%)',
              transform: 'scaleX(' + receipt + ')',
              transformOrigin: 'left center',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            width: '100%',
            justifyContent: 'center',
            opacity: bridge,
            transform: 'translateY(' + ((1 - bridge) * 10) + 'px)',
          }}
        >
          <div
            style={{
              height: 2,
              width: 100,
              background: 'linear-gradient(90deg, transparent, #10B981)',
            }}
          />
          <div
            style={{
              color: '#6EE7B7',
              fontSize: 20,
              fontWeight: 950,
              letterSpacing: 1.4,
              whiteSpace: 'nowrap',
            }}
          >
            CAN HELP OFFSET
          </div>
          <div
            style={{
              height: 2,
              width: 100,
              background: 'linear-gradient(90deg, #10B981, transparent)',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            width: '100%',
            gap: 16,
          }}
        >
          {spendDays.map((day, index) => {
            const reveal = spring({
              frame: frame - 76 - index * 12,
              fps,
              config: { damping: 17, stiffness: 105 },
            });
            return (
              <div
                key={day}
                style={{
                  flex: 1,
                  minWidth: 0,
                  minHeight: 190,
                  boxSizing: 'border-box',
                  padding: '22px 17px',
                  borderRadius: 17,
                  border: '1px solid #334155',
                  borderTop: '5px solid #10B981',
                  background: 'rgba(15,23,42,.92)',
                  opacity: reveal,
                  transform:
                    'translateY(' + ((1 - reveal) * 24) + 'px) scale(' +
                    (0.97 + reveal * 0.03) + ')',
                }}
              >
                <div
                  style={{
                    color: '#6EE7B7',
                    fontSize: 17,
                    fontWeight: 950,
                    letterSpacing: 1.4,
                  }}
                >
                  {day}
                </div>
                <div
                  style={{
                    height: 7,
                    borderRadius: 7,
                    marginTop: 22,
                    background: '#1E293B',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 7,
                      background: '#10B981',
                      transform: 'scaleX(' + reveal + ')',
                      transformOrigin: 'left center',
                    }}
                  />
                </div>
                <div
                  style={{
                    color: '#F8FAFC',
                    fontSize: 22,
                    fontWeight: 950,
                    marginTop: 20,
                  }}
                >
                  AD SPEND
                </div>
                <div
                  style={{
                    color: '#94A3B8',
                    fontSize: 16,
                    lineHeight: 1.3,
                    fontWeight: 650,
                    marginTop: 7,
                  }}
                >
                  Daily campaign cost
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            color: '#94A3B8',
            fontSize: 16,
            lineHeight: 1.3,
            fontWeight: 750,
            letterSpacing: 0.5,
            textAlign: 'center',
            opacity: note,
          }}
        >
          ILLUSTRATIVE ONLY · ACTUAL REPAIR MARGINS AND AD COSTS VARY
        </div>
      </div>
    </AbsoluteFill>
  );
};
