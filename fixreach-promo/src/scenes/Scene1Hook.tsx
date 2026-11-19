import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {Card, Technician, Pulse} from '../components/Visuals';

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const badgeScale = spring({frame: frame - 5, fps, config: {damping: 12, stiffness: 140}});
  const leadScale = spring({frame: frame - 48, fps, config: {damping: 10, stiffness: 160}});
  const racers = [0, 1, 2, 3, 4];
  return (
    <AbsoluteFill style={{background:'#0B0F19',color:'#F9FAFB',fontFamily:'Inter,Arial,sans-serif',justifyContent:'center',alignItems:'center'}}>
      <div style={{transform:'scale('+badgeScale+')',border:'2px solid #F97316',borderRadius:50,padding:'18px 34px',color:'#FB923C',fontSize:34,fontWeight:900,letterSpacing:2}}>SURAT APPLIANCE REPAIR</div>
      <div style={{marginTop:75,transform:'scale('+leadScale+')'}}>
        <Card width={720} title="1 New Shared Lead" accent="#EF4444"><div style={{fontSize:30,color:'#F9FAFB',textAlign:'center'}}>Customer enquiry</div></Card>
      </div>
      <div style={{display:'flex',gap:34,marginTop:100,position:'relative',height:210,alignItems:'center'}}>
        {racers.map((n)=>{
          const raceX = 13*Math.sin(frame/5+n*1.7)+9*Math.sin(frame/2.8+n);
          const drift = interpolate(frame,[55,110],[180-n*80,-120+n*30],{extrapolateRight:'clamp'});
          return <div key={n} style={{position:'relative',transform:'translateX('+(drift+raceX)+'px) translateY('+(4*Math.sin(frame/4+n))+'px)',opacity:interpolate(frame,[45,60,145],[0,1,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>
            <div style={{position:'absolute',width:34,height:4,background:'#F97316',opacity:.65,left:-38,top:30,transform:'skewX(-25deg)'}}/>
            <div style={{position:'absolute',width:22,height:3,background:'#FB923C',opacity:.45,left:-28,top:48,transform:'skewX(-25deg)'}}/>
            <Technician color={n%2?'#FB923C':'#F9FAFB'} label={'TECH '+(n+1)}/>
          </div>;
        })}
      </div>
      <div style={{position:'absolute',bottom:110,fontSize:26,color:'#9CA3AF'}}>RING ROAD TRAFFIC • EVERYONE CHASING THE SAME LEAD</div>
      <Pulse frame={frame}/>
    </AbsoluteFill>
  );
};
