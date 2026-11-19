import React from 'react';
import {AbsoluteFill,useCurrentFrame,spring,useVideoConfig} from 'remotion';
import {Card,Stamp} from '../components/Visuals';
export const Scene4Leads: React.FC = () => {
 const f=useCurrentFrame(); const {fps}=useVideoConfig();
 const enter=spring({frame:f-18,fps,config:{damping:13,stiffness:120}});
 return <AbsoluteFill style={{background:'#0B0F19',color:'#F9FAFB',fontFamily:'Inter,Arial,sans-serif',justifyContent:'center',alignItems:'center'}}>
  <div style={{fontSize:40,fontWeight:900,color:'#FB923C',marginBottom:54}}>NO MIDDLEMEN. DIRECT ENQUIRIES.</div>
  <div style={{display:'flex',flexDirection:'column',gap:28,transform:`scale(${enter})`}}>
   <Card width={760} title="WHATSAPP • NEW MESSAGE" accent="#10B981"><div style={{fontSize:34}}>AC cooling issue – Urgent</div><div style={{fontSize:24,color:'#9CA3AF',marginTop:18}}>Customer messages you directly</div></Card>
   <Card width={760} title="INCOMING DIRECT CALL" accent="#10B981"><div style={{fontSize:34}}>Washing machine repair</div><div style={{fontSize:24,color:'#9CA3AF',marginTop:18}}>No lead marketplace in between</div></Card>
  </div>
  <Stamp frame={f} text="NO BARGAINING • 100% EXCLUSIVE LEADS"/>
 </AbsoluteFill>;
};
