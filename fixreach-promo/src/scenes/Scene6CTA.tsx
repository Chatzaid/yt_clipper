import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
export const Scene6CTA: React.FC = () => {
 const f=useCurrentFrame(); const pulse=1+0.035*Math.sin(f/8);
 return <AbsoluteFill style={{background:'#0B0F19',color:'#F9FAFB',fontFamily:'Inter,Arial,sans-serif',alignItems:'center',justifyContent:'center'}}>
  <div style={{width:900,height:900,borderRadius:450,border:'8px solid #F97316',background:'#111827',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',boxShadow:'0 0 70px #F9731666'}}>
   <div style={{fontSize:124,fontWeight:950,letterSpacing:-6}}><span style={{color:'#F9FAFB'}}>Fix</span><span style={{color:'#F97316'}}>Reach</span></div>
   <div style={{fontSize:31,fontWeight:800,letterSpacing:4,color:'#F9FAFB',marginTop:18}}>APPLIANCE REPAIR</div>
   <div style={{fontSize:27,fontWeight:800,letterSpacing:3,color:'#F9FAFB'}}>BUSINESS GROWTH</div>
  </div>
  <div style={{marginTop:55,background:'#10B981',color:'#052E24',fontSize:46,fontWeight:900,borderRadius:28,padding:'30px 72px',transform:`scale(${pulse})`,boxShadow:'0 0 55px #10B98188'}}>CLICK LINK IN BIO 👆</div>
  <div style={{marginTop:38,fontSize:34,fontWeight:900,color:'#FB923C'}}>DAILY NEW JOBS • BINA RATE KAM KIYE</div>
 </AbsoluteFill>;
};
