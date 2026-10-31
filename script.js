const $=id=>document.getElementById(id);
const viewBtn=$("viewBtn"), phonePanel=$("phonePanel"), progressPanel=$("progressPanel"), revealPanel=$("revealPanel");
let taps=0, waitingForReturn=false, shareWindow=null;
const levels=[0,50,75,85,91,96,98,99,100];

viewBtn.addEventListener("click",()=>{
  phonePanel.classList.remove("hidden");
  phonePanel.scrollIntoView({behavior:"smooth",block:"center"});
});

$("verifyBtn").addEventListener("click",()=>{
  const value=$("mobile").value.replace(/\D/g,"");
  if(value.length!==10){$("error").textContent=" 10 अंक दर्ज करें।";return;}
  $("error").textContent="";
  phonePanel.classList.add("hidden");
  progressPanel.classList.remove("hidden");
  progressPanel.scrollIntoView({behavior:"smooth",block:"center"});
  $("status").textContent="सरप्राइज़ तैयार हो रहा है…";
  let n=0;
  const timer=setInterval(()=>{
    n=Math.min(100,n+10);
    $("barFill").style.width=n+"%";
    $("percent").textContent=n+"%";
    if(n===100){clearInterval(timer);$("status").textContent="अब शेयर स्टेप पूरा करें।";}
  },130);
});

// WhatsApp opens with a transparent demo/awareness message.
// Progress advances only when the visitor returns to this page. It does not
// claim to verify that a message was actually sent.
function completeDemoShareStep(){
  if(!waitingForReturn || document.visibilityState !== "visible") return;
  waitingForReturn=false;
  taps=Math.min(taps+1,8);
  const pct=levels[taps];
  $("barFill").style.width=pct+"%";
  $("percent").textContent=pct+"%";
  $("status").textContent="आप वापस आ गए हो प्रोग्रेस अपडेट हुई।";
  $("shareBtn").disabled=false;
  $("shareBtn").textContent=pct===100 ? "डेमो पूरा हुआ" : "WhatsApp पर शेयर करें ↗";
  if(pct===100){
    $("shareBtn").disabled=true;
    setTimeout(()=>{
      revealPanel.classList.remove("hidden");
      revealPanel.scrollIntoView({behavior:"smooth",block:"center"});
    },500);
  }
}

$("shareBtn").addEventListener("click",()=>{
  if(taps>=8 || waitingForReturn) return;
  const message="🪔DEEWALI OFFER ,free recharge 🎉🎉 ,maine socha tha ye fake he lekin isse sach me jio,airtel,idea ki sim me free recharge hota he 🤑🤑 ,link khole ,         https://xkaran-kamalx.github.io/spam_alert/#home
  ";
  const url="https://wa.me/?text="+encodeURIComponent(message);
  waitingForReturn=true;
  $("status").textContent="WhatsApp khul raha hai. Is page par wapas aane par  bar update hoga.";
  $("shareBtn").disabled=true;
  shareWindow=window.open(url,"_blank");
  // If popup is blocked or the user stays in the same tab, provide a normal
  // same-tab navigation fallback without resetting this page's in-memory state.
  if(!shareWindow){
    waitingForReturn=false;
    $("shareBtn").disabled=false;
    $("status").textContent="WhatsApp open nahi hua. Browser popup permission check karein.";
  }
});

document.addEventListener("visibilitychange",()=>{
  if(document.visibilityState==="visible") setTimeout(completeDemoShareStep,350);
});
window.addEventListener("focus",()=>setTimeout(completeDemoShareStep,350));

$("againBtn").addEventListener("click",()=>{
  taps=0;waitingForReturn=false;
  $("mobile").value="";
  $("barFill").style.width="0%";
  $("percent").textContent="0%";
  $("status").textContent="कृपया प्रतीक्षा करें…";
  $("shareBtn").disabled=false;
  $("shareBtn").textContent="WhatsApp पर शेयर करें ↗";
  revealPanel.classList.add("hidden");
  progressPanel.classList.add("hidden");
  phonePanel.classList.add("hidden");
  window.scrollTo({top:0,behavior:"smooth"});
});