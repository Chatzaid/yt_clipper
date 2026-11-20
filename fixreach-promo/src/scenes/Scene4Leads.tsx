import React from 'react';
import {AbsoluteFill,interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';

export const Scene4Leads:React.FC=()=>{
 const f=useCurrentFrame();
 const {fps}=useVideoConfig();
 const customer=spring({frame:f-12,fps,config:{damping:14,stiffness:120}});
 const channels=spring({frame:f-68,fps,config:{damping:15,stiffness:105}});
 const shop=spring({frame:f-180,fps,config:{damping:15,stiffness:105}});
 const proof=spring({frame:f-302,fps,config:{damping:13,stiffness:130}});
 // The exclusive-enquiry proof starts with its spoken caption at 69.15s (scene-local frame 450).
 const exclusive=interpolate(f,[450,468,507],[0,1,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const route=interpolate(f,[68,145],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const pulse=1+.035*Math.sin(f/7);
 return <AbsoluteFill style={{background:'#0B0F19',color:'#F9FAFB',fontFamily:'Inter,Arial,sans-serif',justifyContent:'center',alignItems:'center',paddingTop:160,paddingBottom:500,boxSizing:'border-box',overflow:'hidden'}}>
  <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 50% 47%,#10B9811C,transparent 58%)'}}/>
  <div style={{width:900,maxWidth:'92%',display:'flex',flexDirection:'column',alignItems:'center',gap:18,position:'relative'}}>
   <div style={{fontSize:31,fontWeight:950,letterSpacing:3,color:'#FB923C',textAlign:'center',marginBottom:4}}>DIRECT-TO-SHOP ROUTING</div>
   <div style={{width:800,maxWidth:'100%',minHeight:145,boxSizing:'border-box',border:'2px solid #F97316',borderRadius:24,background:'#111827',padding:'24px 30px',display:'flex',alignItems:'center',gap:24,opacity:customer,transform:'translateY('+(1-customer)*32+'px) scale('+(.97+.03*customer)+')',boxShadow:'0 14px 48px #F9731620'}}>
    <div style={{width:74,height:74,flex:'0 0 74px',borderRadius:20,background:'#F9731622',border:'1px solid #F9731688',display:'flex',alignItems:'center',justifyContent:'center',fontSize:27,fontWeight:950,color:'#FDBA74'}}>01</div>
    <div style={{flex:1}}>
     <div style={{fontSize:19,fontWeight:900,letterSpacing:2,color:'#FDBA74'}}>LOCAL CUSTOMER • SURAT</div>
     <div style={{fontSize:36,fontWeight:950,marginTop:8}}>AC / FRIDGE REPAIR NEEDED</div>
    </div>
    <div style={{fontSize:18,color:'#9CA3AF',fontWeight:800}}>NEW<br/>REQUEST</div>
   </div>
   <svg width="800" height="76" viewBox="0 0 800 76" style={{overflow:'visible',opacity:channels}}>
    <path d="M400 0 V18 H200 V70 M400 18 H600 V70" fill="none" stroke="#10B981" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="620" strokeDashoffset={620*(1-route)}/>
    <circle cx="200" cy="70" r="7" fill="#10B981" opacity={route}/>
    <circle cx="600" cy="70" r="7" fill="#F97316" opacity={route}/>
   </svg>
   <div style={{width:800,maxWidth:'100%',display:'flex',gap:28,opacity:channels,transform:'translateY('+(1-channels)*24+'px)'}}>
    <div style={{flex:1,minWidth:0,minHeight:198,boxSizing:'border-box',border:'2px solid #10B981',borderRadius:22,background:'#10231F',padding:24,boxShadow:'0 12px 36px #10B98118'}}>
     <div style={{fontSize:18,fontWeight:950,letterSpacing:2,color:'#6EE7B7'}}>CHANNEL A</div>
     <div style={{fontSize:33,fontWeight:950,marginTop:13}}>WHATSAPP</div>
     <div style={{fontSize:22,color:'#D1FAE5',marginTop:12}}>Direct customer message</div>
     <div style={{display:'inline-block',marginTop:14,borderRadius:9,padding:'7px 12px',background:'#10B981',color:'#052E24',fontSize:17,fontWeight:950}}>INBOX</div>
    </div>
    <div style={{flex:1,minWidth:0,minHeight:198,boxSizing:'border-box',border:'2px solid #F97316',borderRadius:22,background:'#251B16',padding:24,boxShadow:'0 12px 36px #F9731618'}}>
     <div style={{fontSize:18,fontWeight:950,letterSpacing:2,color:'#FDBA74'}}>CHANNEL B</div>
     <div style={{fontSize:33,fontWeight:950,marginTop:13}}>PHONE CALL</div>
     <div style={{fontSize:22,color:'#FFEDD5',marginTop:12}}>Direct incoming call</div>
     <div style={{display:'inline-block',marginTop:14,borderRadius:9,padding:'7px 12px',background:'#F97316',color:'#1C1917',fontSize:17,fontWeight:950}}>RINGING</div>
    </div>
   </div>
   <svg width="800" height="76" viewBox="0 0 800 76" style={{overflow:'visible',opacity:shop}}>
    <path d="M200 0 V20 H400 V70 M600 0 V20 H400 V70" fill="none" stroke="#10B981" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="620" strokeDashoffset={620*(1-route)}/>
    <circle cx="400" cy="70" r="8" fill="#10B981" opacity={route}/>
   </svg>
   <div style={{width:800,maxWidth:'100%',minHeight:184,boxSizing:'border-box',border:'2px solid #10B981',borderRadius:24,background:'#111F1D',padding:'23px 28px',display:'flex',alignItems:'center',gap:22,opacity:shop,transform:'translateY('+(1-shop)*28+'px) scale('+(.97+.03*shop)+')',boxShadow:'0 16px 50px #10B98122'}}>
    <div style={{width:78,height:78,flex:'0 0 78px',borderRadius:18,background:'#10B981',display:'flex',alignItems:'center',justifyContent:'center',fontSize:25,fontWeight:950,color:'#052E24'}}>SHOP</div>
    <div style={{flex:1}}>
     <div style={{fontSize:20,letterSpacing:2,fontWeight:950,color:'#6EE7B7'}}>YOUR REPAIR DESK</div>
     <div style={{fontSize:34,fontWeight:950,marginTop:8}}>ONE DIRECT DESTINATION</div>
     <div style={{fontSize:20,color:'#D1D5DB',marginTop:7}}>No lead marketplace hand-off</div>
    </div>
    <div style={{fontSize:18,fontWeight:950,color:'#6EE7B7',textAlign:'right'}}>YOUR<br/>TEAM</div>
   </div>
   <div style={{minHeight:84,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',opacity:proof,transform:'scale('+(.94+.06*proof)*pulse+')',textAlign:'center'}}>
    <div style={{fontSize:31,fontWeight:950,color:'#FDBA74',letterSpacing:1}}>NO 5-NUMBER PRICE RACE</div>
    <div style={{fontSize:25,fontWeight:950,color:'#10B981',marginTop:7,opacity:exclusive}}>ONE ENQUIRY. YOUR SHOP.</div>
   </div>
  </div>
 </AbsoluteFill>;
};
