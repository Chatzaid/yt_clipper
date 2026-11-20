import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const Scene6CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - 5, fps, config: {damping: 16, stiffness: 95}});
  const ticket = spring({frame: frame - 18, fps, config: {damping: 17, stiffness: 100}});
  const route = interpolate(frame, [42, 82], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const button = spring({frame: frame - 48, fps, config: {damping: 14, stiffness: 125}});
  const badge = spring({frame: frame - 70, fps, config: {damping: 16, stiffness: 110}});
  const pulse = 1 + interpolate(frame, [80, 110], [0, 0.012], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) * Math.sin(frame / 6);

  return (
    <AbsoluteFill style={{background:'#080D16', color:'#F8FAFC', fontFamily:'Inter,Arial,sans-serif', alignItems:'center', justifyContent:'center', overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,opacity:.12,backgroundImage:'linear-gradient(rgba(148,163,184,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,.12) 1px,transparent 1px)',backgroundSize:'72px 72px'}}/>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 44%,rgba(249,115,22,.13),transparent 56%),radial-gradient(ellipse at 50% 72%,rgba(16,185,129,.14),transparent 52%)'}}/>

      <div style={{width:880,maxWidth:'88%',display:'flex',flexDirection:'column',alignItems:'center',gap:24,transform:'translateY(-86px)',opacity:enter}}>
        <div style={{display:'flex',alignItems:'center',gap:18}}>
          <div style={{width:78,height:78,borderRadius:20,display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(145deg,#F97316,#FB923C)',color:'#111827',fontSize:52,fontWeight:1000}}>F</div>
          <div>
            <div style={{fontSize:64,fontWeight:1000,letterSpacing:-3,lineHeight:1}}>FIX<span style={{color:'#F97316'}}>REACH</span></div>
            <div style={{fontSize:19,fontWeight:900,letterSpacing:3,color:'#94A3B8',marginTop:9}}>LOCAL REPAIR LEADS · SURAT</div>
          </div>
        </div>

        <div style={{width:'100%',boxSizing:'border-box',position:'relative',padding:'34px 42px 38px',border:'1px solid #475569',borderRadius:28,background:'linear-gradient(145deg,rgba(20,31,47,.98),rgba(8,15,27,.98))',boxShadow:'0 26px 76px rgba(0,0,0,.44),0 0 42px rgba(249,115,22,.08)',opacity:ticket,transform:'translateY('+(1-ticket)*28+'px) scale('+(0.97+ticket*.03)+')'}}>
          <div style={{position:'absolute',left:0,top:28,bottom:28,width:7,borderRadius:'0 7px 7px 0',background:'#F97316'}}/>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:18,paddingBottom:18,borderBottom:'1px dashed #526176'}}>
            <div style={{fontSize:17,fontWeight:950,letterSpacing:2,color:'#FDBA74'}}>FIXREACH / SERVICE DISPATCH</div>
            <div style={{fontSize:14,fontWeight:950,letterSpacing:1.4,color:'#6EE7B7',border:'1px solid #10B98188',borderRadius:8,padding:'7px 11px',background:'#064E3B55'}}>FIELD NOTE 06</div>
          </div>

          <div style={{fontSize:42,lineHeight:1.08,fontWeight:1000,letterSpacing:-1.2,textAlign:'center',margin:'26px auto 20px',maxWidth:720}}>
            SEE HOW LOCAL ENQUIRIES <span style={{color:'#34D399'}}>REACH YOUR SHOP</span>
          </div>

          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:18,margin:'0 auto 25px',maxWidth:720}}>
            <div style={{width:220,minHeight:72,boxSizing:'border-box',display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid #64748B',borderRadius:14,background:'#111D2B',fontSize:18,fontWeight:950,letterSpacing:1.2}}>CUSTOMER</div>
            <svg width="250" height="76" viewBox="0 0 250 76" style={{flex:'0 0 250px',overflow:'visible'}}>
              <path d="M8 38H232" fill="none" stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeDasharray="224" strokeDashoffset={224*(1-route)}/>
              <path d="M212 20L234 38L212 56" fill="none" stroke="#6EE7B7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity={route}/>
              <circle cx={8+216*route} cy="38" r="7" fill="#A7F3D0" opacity={route}/>
            </svg>
            <div style={{width:220,minHeight:72,boxSizing:'border-box',display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid #10B981',borderRadius:14,background:'#0B2B24',fontSize:18,fontWeight:950,letterSpacing:1.2,color:'#A7F3D0'}}>YOUR SHOP</div>
          </div>

          <div style={{height:2,background:'linear-gradient(90deg,transparent,#526176,transparent)',marginBottom:24}}/>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:20}}>
            <div style={{width:690,height:104,borderRadius:18,display:'flex',alignItems:'center',justifyContent:'center',gap:18,background:'#10B981',color:'#052E24',fontSize:39,fontWeight:1000,letterSpacing:.5,transform:'scale('+(pulse*button)+')',boxShadow:'0 12px 34px rgba(16,185,129,.24)'}}>
              CLICK LINK IN BIO
              <svg width="34" height="34" viewBox="0 0 34 34"><path d="M17 4V27M7 17L17 27L27 17" fill="none" stroke="#052E24" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <div style={{display:'flex',justifyContent:'center',marginTop:18,opacity:badge}}>
            <div style={{padding:'10px 18px',borderRadius:10,border:'1px solid #10B98188',background:'#052E24',color:'#A7F3D0',fontSize:17,fontWeight:950,letterSpacing:1.2}}>DIRECT-TO-SHOP ENQUIRIES</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
