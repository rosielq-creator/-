const artistData = [
  {name:"Maya",role:"Luxury fashion · Art",image:"assets/profiles/maya/pink-editorial.png",href:"maya.html"},
  {name:"Amber",role:"Music · Fashion · Culture",image:"assets/profiles/amber/night-portrait.png",href:"amber.html"},
  {name:"Ooona",role:"Beauty · Wellness · Spirit",image:"assets/profiles/ooona/hero.png",href:"ooona.html"},
  {name:"Noah",role:"Film · Fashion · Culture",image:"assets/profiles/noah/black-portrait.png",href:"noah.html"},
  {name:"Mario",role:"Lifestyle · Sport · Fashion",image:"assets/mario-portrait.png",href:"mario.html"}
];

const header = document.querySelector("[data-header]");
const syncHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 24);
addEventListener("scroll", syncHeader, {passive: true});
syncHeader();

const tabs=[...document.querySelectorAll("[data-artist]")];
function selectArtist(index){
  const current=artistData[index],previous=artistData[(index+artistData.length-1)%artistData.length],next=artistData[(index+1)%artistData.length];
  const image=document.querySelector("[data-artist-image]");
  image.style.opacity="0";
  setTimeout(()=>{image.src=current.image;image.alt=current.name;image.style.opacity="1"},160);
  document.querySelector("[data-artist-name]").textContent=current.name;
  document.querySelector("[data-artist-role]").textContent=current.role;
  document.querySelector("[data-artist-index]").textContent=String(index+1).padStart(2,"0");
  document.querySelector("[data-ghost-prev]").textContent=previous.name.toUpperCase();
  document.querySelector("[data-ghost-name]").textContent=current.name.toUpperCase();
  document.querySelector("[data-ghost-next]").textContent=next.name.toUpperCase();
  document.querySelector("[data-artist-link]").href=current.href;
  document.querySelector("[data-artist-link-text]").href=current.href;
  tabs.forEach((tab,i)=>tab.classList.toggle("is-active",i===index));
}
tabs.forEach((tab,index)=>tab.addEventListener("click",()=>selectArtist(index)));

const videos=[...document.querySelectorAll(".work-media video")];
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting) entry.target.play().catch(()=>{});
  else entry.target.pause();
}),{threshold:.45});
videos.forEach(video=>observer.observe(video));

const hero=document.querySelector(".hero");
const frontline=document.querySelector(".frontline");
if(frontline){
  const phrases=[...frontline.querySelectorAll(".frontline-manifesto > span")];
  let frontlineFrame=0;
  const syncFrontline=()=>{
    frontlineFrame=0;
    const bounds=frontline.getBoundingClientRect();
    const start=innerHeight*.96;
    const distance=Math.max(360,innerHeight*.68);
    const progress=Math.max(0,Math.min(1,(start-bounds.top)/distance));
    frontline.style.setProperty("--frontline-progress",progress.toFixed(3));
    phrases.forEach((phrase,index)=>{
      const segmentStart=index/phrases.length;
      const segmentLength=.44;
      const phraseProgress=Math.max(0,Math.min(1,(progress-segmentStart)/segmentLength));
      phrase.style.setProperty("--phrase-progress",phraseProgress.toFixed(3));
    });
  };
  const requestFrontline=()=>{
    if(!frontlineFrame) frontlineFrame=requestAnimationFrame(syncFrontline);
  };
  addEventListener("scroll",requestFrontline,{passive:true});
  addEventListener("resize",requestFrontline,{passive:true});
  syncFrontline();
}

const canvas=document.querySelector("#mineralCanvas");
const ctx=canvas?.getContext("2d");
let width=0,height=0,raf=0,isHeroVisible=true;
const motionQuery=matchMedia("(prefers-reduced-motion: reduce)");
function resize(){
  const ratio=Math.min(devicePixelRatio,1.5);
  width=canvas.width=innerWidth*ratio;
  height=canvas.height=innerHeight*ratio;
}
function ribbon(time,index){
  const t=time*.00062;
  const center=height*(.18+index*.13);
  const amplitude=height*(.095+index*.01);
  const thickness=height*(.12+index*.012);
  const gradient=ctx.createLinearGradient(0,center-thickness,width,center+thickness);
  const alpha=.18-index*.015;
  gradient.addColorStop(0,`rgba(91,108,82,${alpha*.45})`);
  gradient.addColorStop(.48,`rgba(182,190,170,${alpha})`);
  gradient.addColorStop(1,`rgba(63,80,58,${alpha*.35})`);
  ctx.beginPath();
  for(let x=-width*.08;x<=width*1.08;x+=width/28){
    const y=center
      +Math.sin(x/width*5.4+t*(.78+index*.08)+index*1.7)*amplitude
      +Math.cos(x/width*2.1-t*.46+index)*amplitude*.42;
    if(x===-width*.08) ctx.moveTo(x,y-thickness);
    else ctx.lineTo(x,y-thickness);
  }
  for(let x=width*1.08;x>=-width*.08;x-=width/28){
    const y=center
      +Math.sin(x/width*5.4+t*(.78+index*.08)+index*1.7)*amplitude
      +Math.cos(x/width*2.1-t*.46+index)*amplitude*.42;
    ctx.lineTo(x,y+thickness);
  }
  ctx.closePath();
  ctx.fillStyle=gradient;
  ctx.fill();
}
function draw(time){
  if(!isHeroVisible){raf=0;return}
  ctx.clearRect(0,0,width,height);
  ctx.globalCompositeOperation="screen";
  for(let i=0;i<6;i++) ribbon(time,i);
  ctx.globalCompositeOperation="source-over";
  raf=requestAnimationFrame(draw);
}
if(canvas&&ctx&&!motionQuery.matches){
  resize();
  addEventListener("resize",resize);
  new IntersectionObserver(([entry])=>{
    isHeroVisible=entry.isIntersecting;
    if(isHeroVisible&&!raf) raf=requestAnimationFrame(draw);
  },{threshold:0}).observe(canvas);
  raf=requestAnimationFrame(draw);
}
