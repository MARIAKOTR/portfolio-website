// Background slideshow with adaptive contrast
const images = [
  "images/kaboompics_warm-floral-backgrounds-with-soft-natural-light-40261.jpg",
  "images/kaboompics_colorful-flower-market-backgrounds-with-peonies-alliums-and-gerberas-39435.jpg",
  "images/kaboompics_minimalist-flower-backgrounds-floral-compositions-white-fabric-abstract-30236.jpg",
  "images/kaboompics_warm-floral-backgrounds-with-soft-natural-light-38627.jpg"
];
for (let i=images.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[images[i],images[j]]=[images[j],images[i]];}
const bg=document.querySelector('.bg');
images.forEach((src,i)=>{const d=document.createElement('div');d.className='slide';d.style.setProperty('--i',i);d.style.backgroundImage=`url('${src}')`;bg.appendChild(d);});
bg.style.setProperty('--cycle',`${images.length*6}s`);

(function(){ // Adaptive theme
  function getLum(img){const c=document.createElement('canvas');const w=32,h=32;c.width=w;c.height=h;const ctx=c.getContext('2d');ctx.drawImage(img,0,0,w,h);const d=ctx.getImageData(0,0,w,h).data;let s=0;for(let i=0;i<d.length;i+=4){s+=0.2126*d[i]+0.7152*d[i+1]+0.0722*d[i+2];}return s/(d.length*255/4);}
  const root=document.documentElement;const lumMap=new Map();
  images.forEach(src=>{const im=new Image();im.onload=()=>lumMap.set(src,getLum(im));im.src=src;});
  const start=performance.now();const dur=Math.max(images.length*6000,42000);
  function tick(now){const t=(now-start)%dur;const idx=Math.floor(t/6000);const src=images[idx%images.length];const lum=lumMap.get(src);if(lum!=null){const dark=root.classList.contains('theme-dark');const enter=0.42,exit=0.5;const shouldDark=dark?(lum<exit):(lum<enter);root.classList.toggle('theme-dark',shouldDark);root.classList.toggle('theme-light',!shouldDark);}requestAnimationFrame(tick);}
  requestAnimationFrame(tick);
})();