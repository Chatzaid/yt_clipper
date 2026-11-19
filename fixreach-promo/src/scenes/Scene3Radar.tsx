import React from 'react';
import {AbsoluteFill, useCurrentFrame, spring, useVideoConfig, interpolate} from 'remotion';
import {Card, MapPin, RadarRings} from '../components/Visuals';
export const Scene3Radar: React.FC = () => {
 const f=useCurrentFrame(); const {fps}=useVideoConfig(); const zoom=spring({frame:f-135,fps,config:{damping:18,stiffness:55}});
 return <Abnormal/>;
};
