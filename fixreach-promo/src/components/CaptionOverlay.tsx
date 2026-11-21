import React from 'react';
import {AbsoluteFill,useCurrentFrame,useVideoConfig,spring} from 'remotion';
type Cue={s:number;e:number;t:string};
const cueRows:Array<[number,number,string]>=[
[.52,3.75,'Agar aap Surat mein AC, fridge,'],[3.75,6.8,'ya washing machine repair karte hai,'],[6.8,8.65,'toh yeh scene aapko roz dikhta hoga.'],[8.65,15.65,'Ek shared lead aati hai aur 5 technicians aise race lagate hai jaise ring road par subah ka traffic khul gaya ho.'],[15.65,19.3,'Aur uske baad customer ka favourite dialogue.'],[19.3,22.3,'Bhaiya, doosre wale ne toh 200 kam bola hai.'],[22.3,28.5,'Asal baat yeh hai ki aaj kal log garmi mein bahar nikal kar shop ka board nahi dhoondhte.'],[28.5,31.05,'Woh seedha Instagram aur Facebook scroll karte hai.'],[31.05,34.65,'Aur jiska video ya ad samne dikh gaya, usko call laga dete hai.'],[36.3,39.5,'Isiliye smart technicians ab hyper local targeting use kar rahe hai.'],[39.5,42.6,'Iska matlab pure Surat ko ad dikhana nahi hai.'],[42.6,49.3,'Kyunki Varachha mein baith kar Vesu ki ek chhoti si enquiry ke liye jana petrol aur time dono ka nuksan hai.'],[49.3,55.75,'Yeh system sirf aapke 5 se 10 kilometer ke area mein unhi logo ko pakadta hai jinhe sach mein repair chahiye.'],[56.4,59.8,'Isme sabse bada fayda yeh hai ki beech mein koi middle man nahi hota.'],[59.8,63.85,'Customer seedha aapke WhatsApp par message karta hai ya call lagata hai.'],[64.25,69.15,'Jab unke paas 5 logo ke number nahi hote toh faltu ki bargaining bhi nahi hoti.'],[69.15,72.85,'Aur har enquiry sirf aur sirf aapki hoti hai.'],[73.15,74.45,'Thoda simple maths samajhiye.'],[74.45,78.5,'Ek normal fridge ya washing machine repair mein jo margin bachta hai.'],[78.5,81.65,'Usse aapke kayi dino ka ad kharcha aaram se nikal aata hai.'],[81.65,85.55,'Yaani kaam bhi regular aata hai aur apna rate bhi nahi girana padta.'],[85.55,89.2,'Toh agar aap bhi yeh pura system detail mein samajhna chahte hai.'],[89.2,97.32,'Toh bio mein link hai, uspe click kijiye aur dekhiye kaise kayi technicians daily naye kaam la rahe hai bina koi paisa kam kiye.']
];
const cues:Cue[]=cueRows.map(([s,e,t])=>({s,e,t}));
export const CaptionOverlay:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig(),t=f/fps,c=cues.find(x=>t>=x.s&&t<x.e);
 if(!c)return null;
 const words=c.t.trim().split(/\\s+/).filter(Boolean),idx=Math.min(words.length-1,Math.floor((t-c.s)/(c.e-c.s)*words.length));
 const p=spring({frame:f-c.s*fps,fps,config:{damping:14,stiffness:160}});
 const hot=['surat','ac','fridge','washing','machine','shared','lead','technicians','200','instagram','facebook','call','hyper','local','varachha','vesu','petrol','time','whatsapp','enquiry','repair','margin','daily','kaam','rate'];
 return <AbsoluteFill style={{pointerEvents:'none'}}>
  <div style={{position:'absolute',left:45,right:45,bottom:130,display:'flex',justifyContent:'center'}}>
   <div style={{maxWidth:990,background:'rgba(11,15,25,.94)',border:'2px solid rgba(255,255,255,.18)',borderRadius:28,padding:'22px 30px',boxShadow:'0 14px 38px #0009',transform:'translateY('+(1-p)*18+'px) scale('+(0.96+.04*p)+')',textAlign:'center',fontSize:35,lineHeight:1.35,fontWeight:900}}>
    {words.map((w,i)=><React.Fragment key={i}><span style={{color:i===idx?'#F97316':hot.includes(w.toLowerCase().replace(/[^a-z0-9]/g,''))?(i%2?'#10B981':'#F97316'):'#F9FAFB'}}>{w}</span>{i<words.length-1?' ':''}</React.Fragment>)}
   </div>
  </div>
 </AbsoluteFill>;
};
