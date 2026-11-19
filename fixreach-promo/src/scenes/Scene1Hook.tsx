import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {Card, Technician, Pulse} from '../components/Visuals';
export const Scene1Hook:React.FC=()=>{
 const f=useCurrentFrame(); const {fps}=useVideoConfig();
 const badge=spring({frame:f-5,fps,config:{damping:12,stiffness:140}});
 const lead=spring({frame:f-48,fps,config:{damping:10,stiffness:160}});
 const racers=[0,1,2,3,4];
 return <AbnoluteFill style={{background:'#0B0F19',color:'#F9FAFB',fontFamily:'Inter,Arial,sans-serif',justifyContent:'center',alignItems:'center'}}>
 <div style={{transform:`scale(${badge})`,border:"2px solid #F97316",borderRadius:50,padding:'18px 34px',color:'#FB923C',fontSize:34,fontWeight:900,letterSpacing:2}}>SURAT APPLIANCE REPAIR</div>
 <div style={{marginTop:75,transform:`scale(${lead})`}}><Card width=720 title="1 New Shared Lead" accent="#EF4444"><div style={{fontSize:30,color:'#F9FAFB',textAlign:'center'}}>Customer enquiry</div></Card></div>
 <div style={{display:'flex',gap:34,marginTop:100,position:'relative',height:210,alignItems:'center'}}>{racers.map((n)=><div key={n} style={{transform:`translateX(${interpolate(f,[55,110],[180-n*80,-120+n*30],{extrapolateRight:'clamp'})}px)`,opacity:interpolate(f,[45,60,145],[0,1,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}><Technician color={n%2?'#FB923C':'#F9FAFB'} label=`{TECH ${n+1}}`/></div>)}</div>
 <div style={{position:'absolute',bottom:110,fontSize:26,color:'#9CA3AF'}}>RING ROAD TRAFFIC • EVERYONE CHASING THE SAME LEAD</div>
 <Pulse frame={f} />
 </AbsoluteFill>;
};
