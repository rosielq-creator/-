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

const stage=document.querySelector("[data-artist-stage]");
const triggers=[...document.querySelectorAll("[data-artist-trigger]")];
let currentArtist=0,swapTimer;
function showArtist(index){
  if(index===currentArtist&&stage?.dataset.ready)return;
  currentArtist=index;
  const artist=artists[index],portrait=document.querySelector(".artist-portrait"),image=document.querySelector("[data-artist-image]");
  portrait?.classList.add("is-changing");
  clearTimeout(swapTimer);
  swapTimer=setTimeout(()=>{
    image.src=artist.image;image.alt=artist.name;
    document.querySelector("[data-artist-name]").textContent=artist.name;
    document.querySelector("[data-artist-left]").textContent=artist.left;
    document.querySelector("[data-artist-right]").textContent=artist.right;
    document.querySelector("[data-artist-index]").textContent=String(index+1).padStart(2,"0");
    document.querySelector("[data-artist-link]").href=artist.href;
    document.querySelector("[data-artist-link-text]").href=artist.href;
    document.querySelector("[data-artist-progress]").style.transform=`scaleX(${(index+1)/artists.length})`;
    triggers.forEach((trigger,i)=>trigger.classList.toggle("is-active",i===index));
    portrait?.classList.remove("is-changing");
    if(stage)stage.dataset.ready="true";
  },150);
}
triggers.forEach((trigger,index)=>{
  trigger.addEventListener("click",()=>showArtist(index));
  trigger.addEventListener("focus",()=>showArtist(index));
});
if(triggers.length){
  let artistFrame=0;
  const closestArtistToViewportCenter=()=>{
    artistFrame=0;
    const viewportCenter=innerHeight/2;
    const closest=triggers.reduce((best,trigger)=>{
      const bounds=trigger.getBoundingClientRect();
      const distance=Math.abs(bounds.top+bounds.height/2-viewportCenter);
      return !best||distance<best.distance?{trigger,distance}:best;
    },null);
    if(closest&&closest.distance<innerHeight*1.15){
      showArtist(Number(closest.trigger.dataset.artistTrigger));
    }
  };
  const requestArtistSync=()=>{
    if(!artistFrame)artistFrame=requestAnimationFrame(closestArtistToViewportCenter);
  };
  addEventListener("scroll",requestArtistSync,{passive:true});
  addEventListener("resize",requestArtistSync,{passive:true});
  showArtist(0);
  closestArtistToViewportCenter();
}

const manifestoLines=[...document.querySelectorAll(".manifesto-line")];
if(manifestoLines.length){
  const lineObserver=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle("is-lit",entry.isIntersecting)),{rootMargin:"-18% 0px -42%",threshold:.25});
  manifestoLines.forEach(line=>lineObserver.observe(line));
}

const videos=[...document.querySelectorAll("video")];
const videoObserver=new IntersectionObserver(entries=>entries.forEach(entry=>entry.isIntersecting?entry.target.play().catch(()=>{}):entry.target.pause()),{threshold:.4});
videos.forEach(video=>videoObserver.observe(video));

const canvas=document.querySelector("#mineralCanvas"),ctx=canvas?.getContext("2d");
let width=0,height=0,frame=0,visible=true;
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
function resizeCanvas(){const ratio=Math.min(devicePixelRatio,1.5);width=canvas.width=innerWidth*ratio;height=canvas.height=innerHeight*ratio}
function ribbon(time,index){const t=time*.0005,center=height*(.16+index*.145),amp=height*(.06+index*.008),thick=height*(.08+index*.01),gradient=ctx.createLinearGradient(0,center,width,center);gradient.addColorStop(0,"rgba(55,65,53,.12)");gradient.addColorStop(.5,"rgba(190,193,182,.22)");gradient.addColorStop(1,"rgba(42,48,41,.1)");ctx.beginPath();for(let x=-width*.1;x<=width*1.1;x+=width/24){const y=center+Math.sin(x/width*5+t+index)*amp;if(x<0)ctx.moveTo(x,y-thick);else ctx.lineTo(x,y-thick)}for(let x=width*1.1;x>=-width*.1;x-=width/24){const y=center+Math.sin(x/width*5+t+index)*amp;ctx.lineTo(x,y+thick)}ctx.closePath();ctx.fillStyle=gradient;ctx.fill()}
function draw(time){if(!visible){frame=0;return}ctx.clearRect(0,0,width,height);ctx.globalCompositeOperation="screen";for(let i=0;i<6;i++)ribbon(time,i);ctx.globalCompositeOperation="source-over";frame=requestAnimationFrame(draw)}
if(canvas&&ctx&&!reduced){resizeCanvas();addEventListener("resize",resizeCanvas);new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible&&!frame)frame=requestAnimationFrame(draw)}).observe(canvas);frame=requestAnimationFrame(draw)}
