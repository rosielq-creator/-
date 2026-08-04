const artists=[
  {name:"Maya",left:"LUXURY / FASHION",right:"ART / EDITORIAL",image:"assets/profiles/maya/pink-editorial.png",href:"maya.html"},
  {name:"Amber",left:"MUSIC / FASHION",right:"CULTURE / NIGHT",image:"assets/profiles/amber/night-portrait.png",href:"amber.html"},
  {name:"Ooona",left:"BEAUTY / WELLNESS",right:"SPIRIT / RITUAL",image:"assets/profiles/ooona/hero.png",href:"ooona.html"},
  {name:"Noah",left:"FILM / FASHION",right:"CULTURE / CINEMA",image:"assets/profiles/noah/black-portrait.png",href:"noah.html"},
  {name:"Mario",left:"LIFESTYLE / SPORT",right:"FASHION / TRAVEL",image:"assets/mario-portrait.png",href:"mario.html"}
];

const header=document.querySelector("[data-header]");
const syncHeader=()=>header?.classList.toggle("is-scrolled",scrollY>24);
addEventListener("scroll",syncHeader,{passive:true});syncHeader();

const triggers=[...document.querySelectorAll("[data-artist-trigger]")];
const artistScroll=document.querySelector(".artist-scroll");
const artistCards=[...document.querySelectorAll("[data-artist-card]")];
let currentArtist=-1,artistFrame=0;
function showArtist(index){
  if(index===currentArtist)return;
  currentArtist=index;
  const artist=artists[index];
  document.querySelector("[data-artist-name]").textContent=artist.name;
  document.querySelector("[data-artist-left]").textContent=artist.left;
  document.querySelector("[data-artist-right]").textContent=artist.right;
  document.querySelector("[data-artist-link]").href=artist.href;
  triggers.forEach((trigger,i)=>trigger.classList.toggle("is-active",i===index));
  artistCards.forEach((card,i)=>card.classList.toggle("is-active",i===index));
}
function syncArtistRail(){
  artistFrame=0;
  if(!artistScroll)return;
  const bounds=artistScroll.getBoundingClientRect();
  const travel=Math.max(1,artistScroll.offsetHeight-innerHeight);
  const progress=Math.max(0,Math.min(artists.length-1,-bounds.top/travel*(artists.length-1)));
  artistScroll.style.setProperty("--artist-progress",progress.toFixed(4));
  artistCards.forEach((card,index)=>{
    const distance=index-progress,depth=Math.abs(distance);
    card.style.transform=`translate3d(calc(-50% + ${distance*30}%),0,${depth*-190}px) rotateY(${distance*-12}deg) scale(${Math.max(.68,1-depth*.12)})`;
    card.style.opacity=String(Math.max(.12,1-depth*.32));
    card.style.filter=`brightness(${Math.max(.46,1-depth*.18)}) saturate(.86)`;
    card.style.zIndex=String(Math.round(10-depth*2));
  });
  document.querySelector("[data-artist-progress]").style.transform=`scaleX(${(progress+1)/artists.length})`;
  showArtist(Math.round(progress));
}
function requestArtistSync(){if(!artistFrame)artistFrame=requestAnimationFrame(syncArtistRail)}
triggers.forEach((trigger,index)=>trigger.addEventListener("focus",()=>showArtist(index)));
if(triggers.length){
  addEventListener("scroll",requestArtistSync,{passive:true});
  addEventListener("resize",requestArtistSync,{passive:true});
  syncArtistRail();
}

const workBridge=document.querySelector("[data-work-bridge]");
let bridgeFrame=0;
function syncWorkBridge(){
  bridgeFrame=0;
  if(!workBridge)return;
  const bounds=workBridge.getBoundingClientRect();
  const travel=Math.max(1,workBridge.offsetHeight-innerHeight);
  const progress=Math.max(0,Math.min(1,-bounds.top/travel));
  workBridge.style.setProperty("--bridge-progress",progress.toFixed(4));
}
function requestBridgeSync(){if(!bridgeFrame)bridgeFrame=requestAnimationFrame(syncWorkBridge)}
if(workBridge){
  addEventListener("scroll",requestBridgeSync,{passive:true});
  addEventListener("resize",requestBridgeSync,{passive:true});
  syncWorkBridge();
}

const manifestoLines=[...document.querySelectorAll(".manifesto-line")];
if(manifestoLines.length){
  const lineObserver=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle("is-lit",entry.isIntersecting)),{rootMargin:"-18% 0px -42%",threshold:.25});
  manifestoLines.forEach(line=>lineObserver.observe(line));
}

const workVideos=[...document.querySelectorAll(".work-media video")];
workVideos.forEach(video=>{video.controls=true});
document.querySelectorAll(".work-media").forEach(workMedia=>{
  const video=workMedia.querySelector("video");
  if(!video)return;
  workMedia.addEventListener("click",()=>{
    if(video.paused){
      workVideos.forEach(other=>{if(other!==video)other.pause()});
      video.play().catch(()=>{video.controls=true});
    }else video.pause();
  });
  video.addEventListener("play",()=>workMedia.setAttribute("aria-label",workMedia.getAttribute("aria-label").replace(/^Play /,"Pause ")));
  video.addEventListener("pause",()=>workMedia.setAttribute("aria-label",workMedia.getAttribute("aria-label").replace(/^Pause /,"Play ")));
});
const videoObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.intersectionRatio<.4)entry.target.pause()}),{threshold:[0,.4]});
workVideos.forEach(video=>videoObserver.observe(video));

const contactTrigger=document.querySelector("[data-contact-trigger]");
const contactForm=document.querySelector("[data-contact-form]");
contactTrigger?.addEventListener("click",()=>{
  contactForm.hidden=false;
  contactTrigger.setAttribute("aria-expanded","true");
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  contactForm.scrollIntoView({behavior:reduced?"auto":"smooth",block:"start"});
  contactForm.querySelector("input")?.focus({preventScroll:true});
});
contactForm?.addEventListener("submit",event=>{
  event.preventDefault();
  const status=contactForm.querySelector(".contact-status");
  if(!contactForm.reportValidity()){
    status.textContent="Please complete the required fields.";
    return;
  }
  const data=new FormData(contactForm);
  const subject=`Project inquiry from ${data.get("name")}`;
  const body=[`Name: ${data.get("name")}`,`Email: ${data.get("email")}`,`Company / brand: ${data.get("company")||"—"}`,`Project type: ${data.get("projectType")||"—"}`,"",String(data.get("message"))].join("\n");
  status.textContent="Opening your email app with the completed inquiry.";
  location.href=`mailto:hello@gtomato.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

const canvas=document.querySelector("#mineralCanvas"),ctx=canvas?.getContext("2d");
let width=0,height=0,frame=0,visible=true;
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;

function resizeCanvas(){const ratio=Math.min(devicePixelRatio,1.5);width=canvas.width=innerWidth*ratio;height=canvas.height=innerHeight*ratio}
function ribbon(time,index){const t=time*.0005,center=height*(.16+index*.145),amp=height*(.06+index*.008),thick=height*(.08+index*.01),gradient=ctx.createLinearGradient(0,center,width,center);gradient.addColorStop(0,"rgba(55,65,53,.12)");gradient.addColorStop(.5,"rgba(190,193,182,.22)");gradient.addColorStop(1,"rgba(42,48,41,.1)");ctx.beginPath();for(let x=-width*.1;x<=width*1.1;x+=width/24){const y=center+Math.sin(x/width*5+t+index)*amp;if(x<0)ctx.moveTo(x,y-thick);else ctx.lineTo(x,y-thick)}for(let x=width*1.1;x>=-width*.1;x-=width/24){const y=center+Math.sin(x/width*5+t+index)*amp;ctx.lineTo(x,y+thick)}ctx.closePath();ctx.fillStyle=gradient;ctx.fill()}
function draw(time){if(!visible){frame=0;return}ctx.clearRect(0,0,width,height);ctx.globalCompositeOperation="screen";for(let i=0;i<6;i++)ribbon(time,i);ctx.globalCompositeOperation="source-over";frame=requestAnimationFrame(draw)}
if(canvas&&ctx&&!reduced){resizeCanvas();addEventListener("resize",resizeCanvas);new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible&&!frame)frame=requestAnimationFrame(draw)}).observe(canvas);frame=requestAnimationFrame(draw)}
