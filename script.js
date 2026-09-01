const openBtn = document.getElementById("openBtn");
const surprise = document.getElementById("surprise");
const wishBtn = document.getElementById("wishBtn");
const wishText = document.getElementById("wishText");
const flame = document.getElementById("flame");
const musicBtn = document.getElementById("musicBtn");

openBtn.addEventListener("click", () => {
  surprise.scrollIntoView({behavior:"smooth"});
  burst(28);
});

wishBtn.addEventListener("click", () => {
  document.querySelectorAll(".real-flame").forEach(f => f.classList.add("off"));
  wishText.textContent = "May Allah bless you with happiness, peace, good health and many beautiful years ahead. Ameen. 🤲❤️";
  wishBtn.textContent = "Wish made with love 💖";
  burst(45);
});

document.querySelectorAll(".photo-card img").forEach(img => {
  img.addEventListener("click", () => {
    document.getElementById("modalImg").src = img.src;
    document.getElementById("photoModal").classList.add("show");
  });
});
document.getElementById("closeModal").onclick = () =>
  document.getElementById("photoModal").classList.remove("show");
document.getElementById("photoModal").addEventListener("click", e => {
  if(e.target.id === "photoModal") e.currentTarget.classList.remove("show");
});

function petals(){
  const p=document.createElement("div");
  p.className="petal";
  p.textContent=["🌸","🌷","🌹","✨","💗"][Math.floor(Math.random()*5)];
  p.style.left=Math.random()*100+"vw";
  p.style.animationDuration=(5+Math.random()*6)+"s";
  p.style.fontSize=(12+Math.random()*14)+"px";
  document.body.appendChild(p);
  setTimeout(()=>p.remove(),12000);
}
setInterval(petals,650);

function burst(n){
  for(let i=0;i<n;i++){
    const s=document.createElement("div");
    s.className="spark";
    s.textContent=["❤","✦","✨","💖"][Math.floor(Math.random()*4)];
    s.style.left="50vw"; s.style.top="45vh";
    s.style.setProperty("--x",(Math.random()*420-210)+"px");
    s.style.setProperty("--y",(Math.random()*420-210)+"px");
    document.body.appendChild(s);
    setTimeout(()=>s.remove(),1000);
  }
}

// A tiny Web Audio birthday-style tune — no external music file needed.
let audioCtx, playing=false;
musicBtn.addEventListener("click", async ()=>{
  if(playing) return;
  playing=true;
  musicBtn.textContent="♫ Playing for Amma...";
  audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  const notes=[261.63,261.63,293.66,261.63,349.23,329.63,261.63,261.63,293.66,261.63,392.00,349.23];
  notes.forEach((freq,i)=>{
    const o=audioCtx.createOscillator(), g=audioCtx.createGain();
    o.type="sine"; o.frequency.value=freq;
    const t=audioCtx.currentTime+i*.27;
    g.gain.setValueAtTime(0,t);
    g.gain.linearRampToValueAtTime(.055,t+.02);
    g.gain.exponentialRampToValueAtTime(.001,t+.24);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(t); o.stop(t+.25);
  });
  setTimeout(()=>{playing=false;musicBtn.textContent="♫ Play the birthday tune again";},3600);
});
