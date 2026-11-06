(() => {
const $ = id => document.getElementById(id);
const file=$("videoFile"),video=$("source"),start=$("start"),end=$("end"),hook=$("hook"),captions=$("captions"),status=$("status"),preview=$("previewClip"),exportBtn=$("export"),download=$("download");
let sourceUrl=null,exportUrl=null,busy=false;
const say=m=>status.textContent=m;
const duration=()=>Number(end.value)-Number(start.value);
const valid=()=>Number(start.value)>=0&&duration()>=30&&duration()<=60&&Number(end.value)<=(video.duration||Infinity);
const update=()=>{const ok=!!video.src&&valid()&&!busy;preview.disabled=!ok;exportBtn.disabled=!ok;if(video.src&&!valid())say("Set a valid 30–60 second range within the video duration.");};
file.addEventListener("change",()=>{const chosen=file.files&&file.files[0];if(!chosen)return;if(sourceUrl)URL.revokeObjectURL(sourceUrl);sourceUrl=URL.createObjectURL(chosen);video.src=sourceUrl;video.load();download.classList.add("hidden");say("Video loaded locally. Choose a 30–60 second moment.");});
video.addEventListener("loadedmetadata",()=>{end.value=Math.min(60,video.duration).toFixed(1);start.value="0";update();});
[start,end].forEach(el=>el.addEventListener("input",update));
function getYoutubeId(raw) {
  let url; try { url = new URL(raw); } catch { return null; }
  let id = "";
  if (url.hostname === "youtu.be") id = url.pathname.slice(1);
  else if (url.hostname === "youtube.com" || url.hostname.endsWith(".youtube.com")) id = url.searchParams.get("v") || url.pathname.split("/").filter(Boolean).pop();
  return /^[\w-]{11}$/.test(id || "") ? id : null;
}
$("previewYoutube").addEventListener("click",()=>{
  const raw=$("youtubeUrl").value.trim(),id=getYoutubeId(raw);
  if(!id){say("Enter a valid public YouTube URL.");return;}
  $("youtubeFrame").classList.remove("hidden");
  $("youtubeFrame").innerHTML='<iframe title="YouTube preview" width="100%" height="220" style="border:0;border-radius:12px;margin-top:12px" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen src="https://www.youtube-nocookie.com/embed/'+id+'"></iframe>';
  say("YouTube preview loaded. To edit, select an authorized local copy of this video.");
});
const aiResults=$("aiResults");
$("analyzeYoutube").addEventListener("click",async()=>{
  const raw=$("youtubeUrl").value.trim();
  if(!getYoutubeId(raw)){say("Enter a valid public YouTube URL first.");return;}
  const button=$("analyzeYoutube");button.disabled=true;button.textContent="Gemini is watching…";aiResults.classList.add("hidden");
  say("Sending the public video URL to Gemini for timestamped highlight analysis…");
  try {
    const response=await fetch("/api/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({youtubeUrl:raw})});
    const payload=await response.json();
    if(!response.ok)throw new Error(payload.error||"Gemini analysis failed.");
    const clips=Array.isArray(payload.clips)?payload.clips:[];
    if(!clips.length)throw new Error("Gemini returned no usable clip suggestions. Try another public video.");
    const safe=value=>String(value||"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
    aiResults.innerHTML="<h3 style='margin:0 0 10px'>Gemini's suggested moments</h3>"+clips.map((clip,index)=>{
      const a=Number(clip.startSeconds),b=Number(clip.endSeconds);
      if(!Number.isFinite(a)||!Number.isFinite(b)||b-a<30||b-a>60)return "";
      return '<article style="border:1px solid #303b50;border-radius:12px;padding:12px;margin:9px 0;background:#0b111d"><strong>'+safe(clip.title||("Moment "+(index+1)))+'</strong><p class="hint">'+Math.floor(a)+'s–'+Math.floor(b)+'s · '+safe(clip.reason)+'</p><p style="margin:8px 0">'+safe(clip.hook)+'</p><button class="btn secondary" data-clip="'+index+'">Use this moment</button></article>';
    }).join("");
    aiResults.classList.remove("hidden");
    aiResults.querySelectorAll("[data-clip]").forEach(button=>button.addEventListener("click",()=>{
      const clip=clips[Number(button.dataset.clip)];
      start.value=Number(clip.startSeconds).toFixed(1);end.value=Number(clip.endSeconds).toFixed(1);hook.value=clip.hook||"";
      if(Array.isArray(clip.captions))captions.value=clip.captions.join("\n");
      update();say("Gemini suggestion applied. Load the matching local video file to preview and export.");
      $("source").scrollIntoView({behavior:"smooth",block:"center"});
    }));
    say("Gemini found "+clips.length+" usable moment(s). Review the timestamps and choose one.");
  } catch(error) { say(error.message||"Gemini analysis failed."); }
  finally {button.disabled=false;button.textContent="Find Shorts with Gemini";}
});
function wrapText(ctx,text,x,y,maxWidth,lineHeight,maxLines){const words=text.split(/\s+/);let line="",lines=[];for(const word of words){const test=line?line+" "+word:word;if(ctx.measureText(test).width>maxWidth&&line){lines.push(line);line=word;}else line=test;}if(line)lines.push(line);lines.slice(0,maxLines).forEach((value,i)=>ctx.fillText(value,x,y+i*lineHeight,maxWidth));}
async function renderClip(){
if(!valid()||busy)return;if(!("MediaRecorder"in window)||!HTMLCanvasElement.prototype.captureStream){say("This browser does not support browser-based video export. Try current Chrome.");return;}
busy=true;update();download.classList.add("hidden");const canvas=document.createElement("canvas");canvas.width=720;canvas.height=1280;const ctx=canvas.getContext("2d");const stream=canvas.captureStream(30);const audioTracks=video.captureStream?video.captureStream().getAudioTracks():[];audioTracks.forEach(t=>stream.addTrack(t));const mime=["video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm"].find(t=>MediaRecorder.isTypeSupported(t));if(!mime){busy=false;update();say("No supported WebM encoder was found.");return;}
const recorder=new MediaRecorder(stream,{mimeType:mime}),chunks=[];recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};recorder.onerror=()=>{busy=false;update();say("Export failed. Try a shorter source or another browser.");};recorder.onstop=()=>{const blob=new Blob(chunks,{type:mime});if(exportUrl)URL.revokeObjectURL(exportUrl);exportUrl=URL.createObjectURL(blob);download.href=exportUrl;download.classList.remove("hidden");download.textContent="Download Short ("+(blob.size/1048576).toFixed(1)+" MB)";stream.getTracks().forEach(t=>t.stop());busy=false;update();say("Export complete. Video processed on this device.");};
function draw(){const vw=video.videoWidth,vh=video.videoHeight,scale=Math.max(canvas.width/vw,canvas.height/vh),sw=canvas.width/scale,sh=canvas.height/scale,sx=(vw-sw)/2,sy=(vh-sh)/2;ctx.fillStyle="#000";ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(video,sx,sy,sw,sh,0,0,canvas.width,canvas.height);const title=hook.value.trim();if(title){ctx.fillStyle="rgba(0,0,0,.58)";ctx.fillRect(32,90,656,150);ctx.fillStyle="#fff";ctx.textAlign="center";ctx.font="bold 44px system-ui";wrapText(ctx,title,360,150,600,52,3);}const lines=captions.value.split("\n").map(x=>x.trim()).filter(Boolean);if(lines.length){const index=Math.min(lines.length-1,Math.floor((video.currentTime-Number(start.value))/Math.max(.1,duration())*lines.length));ctx.fillStyle="rgba(0,0,0,.72)";ctx.fillRect(35,1050,650,125);ctx.fillStyle="#fff";ctx.textAlign="center";ctx.font="bold 38px system-ui";wrapText(ctx,lines[index],360,1098,600,48,2);}}
function frame(){if(video.currentTime>=Number(end.value)||video.ended){recorder.stop();video.pause();return;}draw();requestAnimationFrame(frame);}
try{video.pause();video.currentTime=Number(start.value);await new Promise(resolve=>video.addEventListener("seeked",resolve,{once:true}));recorder.start(250);await video.play();say("Rendering in real time… keep this tab open.");frame();}catch(error){if(recorder.state!=="inactive")recorder.stop();busy=false;update();say("Could not start export. Tap play once, then try again.");}
}
preview.addEventListener("click",()=>{if(!valid())return;video.currentTime=Number(start.value);video.play();const stopAt=()=>{if(video.currentTime>=Number(end.value)){video.pause();video.removeEventListener("timeupdate",stopAt);}};video.addEventListener("timeupdate",stopAt);});
exportBtn.addEventListener("click",renderClip);window.addEventListener("beforeunload",()=>{if(sourceUrl)URL.revokeObjectURL(sourceUrl);if(exportUrl)URL.revokeObjectURL(exportUrl);});
})();