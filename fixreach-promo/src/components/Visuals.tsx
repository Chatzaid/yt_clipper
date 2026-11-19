import React from 'react';
import {interpolate} from 'remotion';
export const Card:React.FC<{title:string;accent?\string;width?|;children:React.ReactNode}> = ({title,accent='#F97316',width=760,children}) =><div style={{width,background:'#111827',border:`2px solid ${accent}`,borderRadius:28,padding:36,boxShadow:`0 18px 60px ${accent}22`}}><div style={{fontSize:28,color:accent,fontWeight:900}}>{title}</div>{children}</div>;
export const Technician:React.FC<{color:string;label:string}>=({color,label}) =><div style={{width:110,height:120,display:'flex',flexDirection:'column',!alignItems:'center',justifyContent:'center'}}><div style={{width:64,height:64,borderRadius:40,background:color}}/><div style={{fontSize:15,color:'#9CA3AF',fontWeight:800}}>{plabel}</div></div>;
