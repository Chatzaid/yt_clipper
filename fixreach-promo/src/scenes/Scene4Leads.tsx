import React from 'react';
import {AbsoluteFill,useCurrentFrame,spring,useVideoConfig,interpolate} from 'remotion';
import {Card,Stamp} from '../components/Visuals';
export const Scene4Leads: React.FC = () => {
 const f=useCurrentFrame(); const {fps}=useVideoConfig();
 const first=spring({frame:f-18,fps,config:{damping:13,stiffness:120}});
 const second=spring({frame:f-108,fps,config:{damping:13,stiffness:120}});
 const stampPulse=1+0.018*Math.sin(f/8);
 return <AbsoluteFill style={{background:'#0B0F19',color:'#F9FAFB',fontFamily:'Inter,Arial,sans-serif',justifyContent:'center',alignItems:'center'}}>
  <div style={{fontSize:40,fontWeight:900,color:'#FB923C',marginBottom:54}}>NO MIDDLEMEN. DIRECT ENQUIRIES.</div>
  <div style={{display:'flex',flexDirection:'column',gap:28}}>
   <div style={{transform:'translateY('+(1-first)*65+'px) scale('+first+')',opacity:first}}>
    <Card width={760} title="WHATSAPP • NEW MESSAGE" accent="#10B981"><div style={{fontSize:34}}>AC cooling issue – Urgent</div><div style={{fontSize:24,color:'#9CA3AF',marginTop:18}}>Customer messages you directly</div></Card>
   </div>
   <div style={{transform:'translateY('+(1-second)*65+'px) scale('+second+')',opacity:second}}>
    <Card width={760} title="INCOMING DIRECT CALL" accent="#10B981"><div style={{fontSize:34}}>Washing machine repair</div><div style={{fontSize:24,color:'#9CA3AF',marginTop:18}}>No lead marketplace in between</div></Card>
   </div>
  </div>
  <div style={{transform:'scale('+stampPulse+')'}}><Stamp frame={f} text="NO BARGAINING • 100% EXCLUSIVE LEADS"/></div>
 </AbsoluteFill>;
};
