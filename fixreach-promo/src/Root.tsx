import React from 'react';
import {Composition, Sequence, OffthreadVideo, staticFile, AbsoluteFill} from 'remotion';
import {Scene1Hook} from './scenes/Scene1Hook';
import {Scene3Radar} from './scenes/Scene3Radar';
import {Scene4Leads} from './scenes/Scene4Leads';
import {Scene6CTA} from './scenes/Scene6CTA';

const FRAMES = [420, 570, 635, 507, 422, 366];
const STARTS = [0, 420, 990, 1625, 2132, 2554];
const ManimClip: React.FC<{src: string}> = ({src}) => (
  <AbsoluteFill style={{background:'#0B0F19'}}>
    <OffthreadVideo src={staticFile(src)} style={{width:'100%',height:'100%',objectFit:'contain'}} />
  </AbsoluteFill>
);
const Base: React.FC = () => <>
  <Sequence from={STARTS[0]} durationInFrames={FRAMES[0]}><Scene1Hook /></Sequence>
  <Sequence from={STARTS[1]} durationInFrames={FRAMES[1]}><ManimClip src="manim/scene2_flow.mp4" /></Sequence>
  <Sequence from={STARTS[2]} durationInFrames={FRAMES[2]}><Scene3Radar /></Sequence>
  <Sequence from={STARTS[3]} durationInFrames={FRAMES[3]}><Scene4Leads /></Sequence>
  <Sequence from={STARTS[4]} durationInFrames={FRAMES[4]}><ManimClip src="manim/scene5_roi.mp4" /></Sequence>
  <Sequence from={STARTS[5]} durationInFrames={FRAMES[5]}><Scene6CTA /></Sequence>
</>;
export const RemotionRoot: React.FC = () => <Composition id="FixReachPromo" component={Base} durationInFrames={2920} fps={30} width={1080} height={1920} />;
