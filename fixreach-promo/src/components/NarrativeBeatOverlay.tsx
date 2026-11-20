import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

type Beat = {
  title: string;
  detail: string;
  visual: 'repair' | 'queue' | 'race' | 'quote' | 'price' | 'store' | 'social' | 'ad' | 'target' | 'city' | 'route' | 'radius' | 'bridge' | 'chat' | 'phone' | 'lock' | 'margin' | 'bars' | 'shield' | 'link';
  accent: string;
};

// 20 visual beats, aligned to the supplied 97.32s Hindi voiceover/SRT.
// The six chapter scenes remain the visual backbone; this layer changes the evidence on screen every 5s.
const BEATS: Beat[] = [
  {title:'SURAT APPLIANCE REPAIR',detail:'AC • FRIDGE • WASHING MACHINE',visual:'repair',accent:'#F97316'},
  {title:'ONE CUSTOMER REQUEST',detail:'A real repair enquiry enters the system',visual:'queue',accent:'#F97316'},
  {title:'FIVE TECHNICIANS. ONE LEAD.',detail:'Everyone races for the same customer',visual:'race',accent:'#EF4444'},
  {title:'THE PRICE-RACE STARTS',detail:'The customer compares competing quotes',visual:'quote',accent:'#EF4444'},
  {title:'₹200 UNDERCUT',detail:'Same repair. Lower quote. Less margin.',visual:'price',accent:'#EF4444'},
  {title:'THE SHOP BOARD IS NOT ENOUGH',detail:'Customers are already scrolling on their phones',visual:'store',accent:'#F97316'},
  {title:'INSTAGRAM + FACEBOOK',detail:'A local repair ad appears inside the feed',visual:'social',accent:'#A78BFA'},
  {title:'HYPER-LOCAL TARGETING',detail:'Smart technicians focus on nearby repair demand',visual:'target',accent:'#10B981'},
  {title:'NOT THE WHOLE OF SURAT',detail:'Do not pay to reach people outside your service area',visual:'city',accent:'#F97316'},
  {title:'VARACHHA → VESU',detail:'One distant enquiry can burn fuel and technician time',visual:'route',accent:'#EF4444'},
  {title:'A 5–10 KM SERVICE ZONE',detail:'Focus the campaign around your actual shop',visual:'radius',accent:'#10B981'},
  {title:'NO LEAD MIDDLEMAN',detail:'The customer reaches your shop directly',visual:'bridge',accent:'#10B981'},
  {title:'WHATSAPP OR DIRECT CALL',detail:'Two direct ways to contact your repair desk',visual:'chat',accent:'#10B981'},
  {title:'NO FIVE-WAY BARGAINING',detail:'No shared pool of technicians quoting against each other',visual:'phone',accent:'#10B981'},
  {title:'EVERY ENQUIRY IS EXCLUSIVE',detail:'The enquiry belongs to your business—not a lead pool',visual:'lock',accent:'#10B981'},
  {title:'SIMPLE REPAIR MATH',detail:'Start with the margin left after one completed repair',visual:'margin',accent:'#10B981'},
  {title:'ONE REPAIR CAN OFFSET AD SPEND',detail:'Protect your service rate instead of racing to the bottom',visual:'bars',accent:'#10B981'},
  {title:'WANT TO SEE THE SYSTEM?',detail:'The next step is to understand the local enquiry flow',visual:'shield',accent:'#10B981'},
  {title:'LINK IN BIO',detail:'Tap the link and explore how the system works',visual:'link',accent:'#F97316'},
  {title:'TAP TO EXPLORE',detail:'FixReach • local repair enquiries, direct to your shop',visual:'link',accent:'#F97316'},
];

const BeatGlyph: React.FC<{kind: Beat['visual']; accent: string}> = ({kind, accent}) => {
  const stroke = accent;
  const common = {fill:'none',stroke,strokeWidth:5,strokeLinecap:'round' as const,strokeLinejoin:'round' as const};
  switch (kind) {
    case 'repair':
      return <svg viewBox="0 0 160 100" width="150" height="94"><rect x="35" y="8" width="90" height="84" rx="12" {...common}/><path d="M55 28h50M55 43h32M55 65h50" {...common}/><circle cx="108" cy="43" r="7" fill={stroke}/></svg>;
    case 'queue':
    case 'race':
      return <svg viewBox="0 0 160 100" width="150" height="94"><path d="M80 18V38M20 78L80 38 140 78M20 78H140" {...common}/>{[20,50,80,110,140].map((x,i)=><g key={x}><circle cx={x} cy="78" r="9" fill={i===2?stroke:'#0B0F19'} stroke={stroke} strokeWidth="4"/></g>)}<circle cx="80" cy="18" r="10" fill={stroke}/></svg>;
    case 'quote':
    case 'price':
      return <svg viewBox="0 0 160 100" width="150" height="94"><rect x="12" y="12" width="136" height="32" rx="8" {...common}/><rect x="12" y="56" width="136" height="32" rx="8" {...common}/><path d="M28 28h48M28 72h34" {...common}/><path d="M108 22l10 10m0-10l-10 10" {...common}/></svg>;
    case 'store':
      return <svg viewBox="0 0 160 100" width="150" height="94"><path d="M22 42L80 10l58 32M34 42v48h92V42M68 90V59h25v31" {...common}/><path d="M45 54h12m46 0h12" {...common}/></svg>;
    case 'social':
    case 'ad':
      return <svg viewBox="0 0 160 100" width="150" height="94"><rect x="10" y="8" width="42" height="84" rx="8" {...common}/><rect x="59" y="8" width="42" height="84" rx="8" {...common}/><rect x="108" y="8" width="42" height="84" rx="8" {...common}/><path d="M19 32h24M68 32h24M117 32h24M19 47h24M68 47h24M117 47h24" {...common}/></svg>;
    case 'target':
    case 'radius':
      return <svg viewBox="0 0 160 100" width="150" height="94"><circle cx="80" cy="50" r="40" {...common}/><circle cx="80" cy="50" r="25" {...common}/><circle cx="80" cy="50" r="8" fill={stroke}/><path d="M80 2v18M80 80v18M32 50h18M110 50h18" {...common}/></svg>;
    case 'city':
      return <svg viewBox="0 0 160 100" width="150" height="94"><path d="M15 75h130M28 75V40h28v35M66 75V20h30v55M104 75V48h28v27" {...common}/><path d="M18 14L142 88" stroke="#EF4444" strokeWidth="5" strokeDasharray="8 8" fill="none"/><circle cx="18" cy="14" r="7" fill={stroke}/><circle cx="142" cy="88" r="7" fill={stroke}/></svg>;
    case 'route':
      return <svg viewBox="0 0 160 100" width="150" height="94"><path d="M18 28C45 8 70 18 82 43S115 75 142 72" fill="none" stroke="#EF4444" strokeWidth="5" strokeDasharray="8 7"/><circle cx="18" cy="28" r="8" fill="#EF4444"/><circle cx="142" cy="72" r="8" fill="#EF4444"/><text x="18" y="13" fill="#FCA5A5" fontSize="10" fontWeight="800">VARACHHA</text><text x="142" y="91" fill="#FCA5A5" fontSize="10" fontWeight="800" textAnchor="end">VESU</text></svg>;
    case 'bridge':
    case 'chat':
      return <svg viewBox="0 0 160 100" width="150" height="94"><path d="M12 18h136v58H78l-25 18V76H12z" {...common}/><path d="M34 38h92M34 56h62" {...common}/></svg>;
    case 'phone':
      return <svg viewBox="0 0 160 100" width="150" height="94"><rect x="52" y="4" width="56" height="92" rx="12" {...common}/><path d="M68 17h24M72 81h16" {...common}/><path d="M73 44q8-16 16 0l-6 8q8 12 16 6" {...common}/></svg>;
    case 'lock':
    case 'shield':
      return <svg viewBox="0 0 160 100" width="150" height="94"><path d="M80 8l45 16v27q-4 29-45 43Q39 80 35 51V24z" {...common}/><path d="M58 51l15 15 30-34" {...common}/></svg>;
    case 'margin':
    case 'bars':
      return <svg viewBox="0 0 160 100" width="150" height="94"><path d="M14 88h132" {...common}/><rect x="28" y="52" width="24" height="36" rx="4" fill={stroke}/><rect x="68" y="34" width="24" height="54" rx="4" fill={stroke}/><rect x="108" y="12" width="24" height="76" rx="4" fill={stroke}/></svg>;
    case 'link':
      return <svg viewBox="0 0 160 100" width="150" height="94"><path d="M66 62l-9 9a22 22 0 0 1-31-31l20-20a22 22 0 0 1 31 0M94 38l9-9a22 22 0 0 1 31 31l-20 20a22 22 0 0 1-31 0M58 50h44" {...common}/></svg>;
  }
};

export const NarrativeBeatOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const beatFrames = 150;
  const index = Math.min(BEATS.length - 1, Math.floor(frame / beatFrames));
  const beat = BEATS[index];
  const previousBeat = index > 0 ? BEATS[index - 1] : null;
  const start = index * beatFrames;
  const localFrame = frame - start;
  // Reveal one card at a time. A crossfade of two full text panels caused ghosted,
  // unreadable headlines at every five-second boundary.
  const opacity = interpolate(localFrame, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // Crossfade the evidence glyph only. Headlines swap cleanly to avoid text ghosting.
  const glyphBlend = interpolate(localFrame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const offsetY = (1 - opacity) * 10;

  return (
    <div style={{position:'absolute',inset:0,pointerEvents:'none',fontFamily:'Inter,Arial,sans-serif',overflow:'hidden'}}>
      <div style={{position:'absolute',left:54,right:54,top:'68.5%',height:154,boxSizing:'border-box',display:'flex',alignItems:'center',gap:24,padding:'18px 26px',borderRadius:22,border:'1px solid '+beat.accent+'88',borderLeft:'7px solid '+beat.accent,background:'linear-gradient(105deg,rgba(7,15,27,.97),rgba(17,27,42,.92))',boxShadow:'0 18px 48px rgba(0,0,0,.32),0 0 34px '+beat.accent+'18',opacity,transform:'translateY('+offsetY+'px)',willChange:'opacity,transform'}}>
        <div style={{width:72,flex:'0 0 72px',height:72,borderRadius:16,display:'flex',alignItems:'center',justifyContent:'center',background:beat.accent+'18',border:'1px solid '+beat.accent+'66',color:beat.accent,fontSize:24,fontWeight:950}}>{String(index+1).padStart(2,'0')}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:15,fontWeight:950,letterSpacing:2,color:beat.accent}}>SURAT / SERVICE DISPATCH · {String(index+1).padStart(2,'0')} OF 20</div>
          <div style={{fontSize:29,lineHeight:1.1,fontWeight:950,color:'#F8FAFC',marginTop:8,letterSpacing:-.4}}>{beat.title}</div>
          <div style={{fontSize:18,lineHeight:1.2,fontWeight:750,color:'#AEBBCB',marginTop:7}}>{beat.detail}</div>
        </div>
        <div style={{width:154,flex:'0 0 154px',height:104,position:'relative',borderLeft:'1px solid #334155',paddingLeft:14,boxSizing:'border-box'}}>
          {previousBeat && <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',opacity:1-glyphBlend}}><BeatGlyph kind={previousBeat.visual} accent={previousBeat.accent}/></div>}
          <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',opacity:previousBeat?glyphBlend:1}}><BeatGlyph kind={beat.visual} accent={beat.accent}/></div>
        </div>
      </div>
    </div>
  );
};
