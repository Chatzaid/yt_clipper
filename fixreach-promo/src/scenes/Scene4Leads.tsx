import React from 'react';
import {AbsoluteFill,useCurrentFrame,spring,useVideoConfig, interpolate} from 'remotion';
import {Card,Phone,Stamp} from '../components/Visuals';
export const Scene4Leads:React.FC=()=>{
 const f=useCurrentFrame(); const {fps}=useVideoConfig(); const p=spring({frame:f-18,fps,config:{damping:13,stiffness:120}});
 return <Abnormal/>;
};
