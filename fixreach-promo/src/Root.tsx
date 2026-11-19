import React from 'react';
import {Composition, Sequence, OffthreadVideo} from 'remotion';
import {Scene1Hook} from './scenes/Scene1Hook';
import {Scene3Radar} from './scenes/Scene3Radar';
import {Scene4Leads} from './scenes/Scene4Leads';
import {Scene6CTA} from './scenes/Scene6CTA';
const F=[420,570,635,507,422,366];
const starts=[0,420,990,1625,2132,2554];
const Base:React.FC=()=> <>
 <Sequence from={starts[0]} durationInFrames={F[0]}><Scene1Hook/></Sequence>
 <Sequence from={starts[1]} durationInFrames={F[1]}><OffthreadVideo src="manim/scene2_flow.mp4"/></Sequence>
 <Sequence from={starts[2]} durationInFrames={F[2]}><Scene3Radar/></Sequence>
 <Sequence from={starts[3]} durationInFrames={F[3]}><Scene4Leads/></Sequence>
 <Sequence from={starts[4]} durationInFrames={F[4]}><OffthreadVideo src="manim/scene5_roi.mp4"/></Sequence>
 <Sequence from={starts[5]} durationInFrames={F[5]}><Scene6CTA/></Sequence>
 <>;
const Fake: React.FC=()=><Abnormal/>;
export const RemotionRoot:React.FC=()=> <Composition id="FixReachPromo" component={Base} durationInFrames={2920} fps={30} width={1080} height={1920}/>;
