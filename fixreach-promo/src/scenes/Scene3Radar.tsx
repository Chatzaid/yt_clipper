import React from 'react';
import {AbsoluteFill,useCurrentFrame,spring,useVideoConfig,interpolate} from 'remotion';
import {Card,MapPin,RadarRings} from '../components/Visuals';
export const Scene3Radar: React.FC = () => {
 const f=useCurrentFrame(); const {fps}=useVideoConfig();
 const zoom=spring({frame:f-135,fps,config:{damping:18,stiffness:55}});
 return <AbsoluteFill style={{background:'#0B0F19',color:'#F9FAFB',fontFamily:'Inter,Arial,sans-serif',justifyContent:'center',alignItems:'center'}}>
  <div style={{fontSize:38,fontWeight:900,color:'#FB923C',marginBottom:65}}>SURAT • HYPER-LOCAL TARGETING</div>
  <div style={{width:820,height:780,position:'relative',border:'2px solid #1F2937',borderRadius:36,background:'linear-gradient(135deg,#111827,#0B0F19)',overflow:'hidden',transform:`scale(${interpolate(f,[135,190],[1,1.08],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})})`}}>
   <svg width="820" height="780" viewBox="0 0 820 780" style={{position:'absolute'}}><path d="M80 130 L740 180 M40 340 L770 300 M110 570 L700 490 M210 50 L250 720 M510 20 L460 760" stroke="#263244" strokeWidth="12" fill="none"/><path d="M190 240 Q400 320 650 590" stroke="#EF4444" strokeWidth="8" strokeDasharray="18 16" fill="none"/></svg>
   <div style={{position:'absolute',left:100,top:175}}><MapPin label="VARACHHA" color="#EF4444"/></div><div style={{position:'absolute',right:95,bottom:120}}><MapPin label="VESU" color="#EF4444"/></div>
   <div style={{position:'absolute',top:330,left:260}}><Card title="Petrol + Time Loss ❌" accent="#EF4444"><div style={{fontSize:24}}>Long-distance low-intent trip</div></Card></div>
   <div style={{position:'absolute',left:'50%',top:'50%',transform:`translate(-50%,-50%) scale(${zoom})`}}><RadarRings frame={f}/><div style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)'}}><MapPin label="YOUR SHOP" color="#F97316"/></div></div>
  </div><div style={{marginTop:42,fontSize:34,fontWeight:900,color:'#FB923C'}}>HYPER-LOCAL: 5 KM – 10 KM RADIUS</div>
 </AbsoluteFill>;
};
