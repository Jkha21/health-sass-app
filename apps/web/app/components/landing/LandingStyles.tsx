import React from "react";

const styles = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0b0705;--bg2:#111009;--bg3:#181208;--acc:#e07840;--acch:#e98a58;--txt:#f0dcc8;--muted:#7a6858;--bd:rgba(190,140,90,.14);--bd2:rgba(190,140,90,.24)}
html[data-scroll-behavior="smooth"]{scroll-behavior:smooth}
body{font-family:'Nunito',sans-serif;background:var(--bg);color:var(--txt);overflow-x:hidden}
a{text-decoration:none;color:inherit}
nav{position:fixed;top:0;left:0;right:0;z-index:100;height:66px;background:rgba(11,7,5,.9);backdrop-filter:blur(16px);border-bottom:1px solid var(--bd);display:flex;align-items:center;padding:0 72px;gap:36px}
.n-logo{display:flex;align-items:center;gap:9px;margin-right:auto;font-family:'Outfit',sans-serif;font-size:14px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.92)}
.n-logo svg{width:26px;height:26px}
.n-links{display:flex;gap:30px;font-size:13.5px;font-weight:500;color:var(--muted)}
.n-links a{transition:color .2s}.n-links a:hover{color:var(--txt)}
.n-cta{padding:9px 22px;border-radius:9px;background:var(--acc);color:#fff;font-family:'Nunito',sans-serif;font-size:13.5px;font-weight:700;border:none;cursor:pointer;transition:background .2s,transform .15s}
.n-cta:hover{background:var(--acch);transform:translateY(-1px)}
.hero{min-height:100vh;padding:128px 72px 88px;display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;top:-220px;right:-180px;width:680px;height:680px;background:radial-gradient(circle,rgba(224,120,64,.1) 0%,transparent 65%);pointer-events:none}
.hero::after{content:'';position:absolute;bottom:0;left:50%;width:70%;height:1px;transform:translateX(-50%);background:linear-gradient(90deg,transparent,var(--bd2),transparent)}
.eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:11.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--acc);background:rgba(224,120,64,.1);border:1px solid rgba(224,120,64,.28);border-radius:100px;padding:6px 14px;margin-bottom:22px}
.eyebrow .dot{width:6px;height:6px;border-radius:50%;background:var(--acc)}
.hero h1{font-family:'Outfit',sans-serif;font-size:clamp(38px,4.8vw,62px);font-weight:900;line-height:1.06;letter-spacing:-.03em;margin-bottom:20px}
.hero h1 em{font-style:normal;color:var(--acc)}
.hero>div>p{font-size:16px;line-height:1.78;color:var(--muted);margin-bottom:36px;max-width:480px}
.hbtns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:52px}
.btn-p{padding:14px 28px;border-radius:11px;background:var(--acc);color:#fff;font-family:'Nunito',sans-serif;font-size:15px;font-weight:700;border:none;cursor:pointer;transition:background .2s,transform .15s,box-shadow .2s}
.btn-p:hover{background:var(--acch);transform:translateY(-2px);box-shadow:0 8px 24px rgba(224,120,64,.32)}
.btn-s{padding:14px 28px;border-radius:11px;background:transparent;color:var(--txt);font-family:'Nunito',sans-serif;font-size:15px;font-weight:600;border:1px solid var(--bd2);cursor:pointer;display:flex;align-items:center;gap:8px;transition:border-color .2s,background .2s,transform .15s}
.btn-s:hover{border-color:var(--acc);background:rgba(224,120,64,.07);transform:translateY(-2px)}
.btn-s svg{width:15px;height:15px}
.hstats{display:flex;gap:36px}
.stat-n{font-family:'Outfit',sans-serif;font-size:28px;font-weight:900;letter-spacing:-.02em}
.stat-n em{font-style:normal;color:var(--acc)}
.stat-l{font-size:12px;color:var(--muted);margin-top:2px;font-weight:600}
.dash{background:var(--bg2);border:1px solid var(--bd);border-radius:20px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.55),0 0 0 1px rgba(190,140,90,.07)}
.dash-bar{height:44px;background:var(--bg3);border-bottom:1px solid var(--bd);display:flex;align-items:center;padding:0 18px;gap:7px}
.d{width:10px;height:10px;border-radius:50%}
.dr{background:#e05050}.dy{background:#e0b040}.dg{background:#50c050}
.dash-body{padding:20px}
.mgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px}
.mc{background:var(--bg3);border:1px solid var(--bd);border-radius:12px;padding:14px 16px}
.ml{font-size:10.5px;color:var(--muted);font-weight:700;letter-spacing:.07em;text-transform:uppercase;margin-bottom:6px}
.mv{font-family:'Outfit',sans-serif;font-size:24px;font-weight:800;letter-spacing:-.02em}
.mv small{font-size:12px;color:var(--acc);margin-left:3px}
.chart{background:var(--bg3);border:1px solid var(--bd);border-radius:12px;padding:15px;margin-bottom:12px}
.ch{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.ct{font-family:'Outfit',sans-serif;font-size:12.5px;font-weight:700}
.cb{font-size:10.5px;padding:3px 9px;border-radius:100px;background:rgba(224,120,64,.15);color:var(--acc);font-weight:700}
.bars{display:flex;gap:5px;align-items:flex-end;height:54px}
.bar{flex:1;border-radius:3px 3px 0 0;background:var(--bd)}
.ba{background:var(--acc);opacity:.85}.ba2{background:var(--acc);opacity:.5}
.rlist{display:flex;flex-direction:column;gap:7px}
.ri{background:var(--bg3);border:1px solid var(--bd);border-radius:10px;padding:9px 13px;display:flex;align-items:center;gap:10px}
.rav{width:28px;height:28px;border-radius:50%;background:rgba(224,120,64,.18);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:var(--acc);flex-shrink:0}
.rn{font-size:12.5px;font-weight:700}
.rs{font-size:10.5px;color:var(--muted);margin-top:1px}
.rbdg{margin-left:auto;font-size:10px;padding:3px 9px;border-radius:100px;font-weight:700}
.bok{background:rgba(60,180,60,.14);color:#5cd05c}.bdue{background:rgba(224,120,64,.15);color:var(--acc)}.bwn{background:rgba(220,80,60,.14);color:#e05050}
.trust{padding:44px 72px;border-top:1px solid var(--bd);border-bottom:1px solid var(--bd)}
.trust p{text-align:center;font-size:11.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:26px}
.lrow{display:flex;justify-content:center;align-items:center;gap:52px;flex-wrap:wrap}
.flogo{font-family:'Outfit',sans-serif;font-size:15px;font-weight:800;color:rgba(122,104,88,.38);letter-spacing:-.01em;text-transform:uppercase}
.sec{padding:100px 72px}
.sec-inner{max-width:1160px;margin:0 auto}
.sec-lbl{display:inline-block;font-size:11.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--acc);margin-bottom:13px}
.sec-h{font-family:'Outfit',sans-serif;font-size:clamp(28px,3.8vw,48px);font-weight:900;letter-spacing:-.028em;line-height:1.1;margin-bottom:16px}
.sec-sub{font-size:15.5px;line-height:1.78;color:var(--muted);max-width:540px;margin-bottom:52px}
.sec-sub.cx{margin-left:auto;margin-right:auto;text-align:center}
.f-bg{background:var(--bg2)}
.fgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.fc{background:var(--bg);border:1px solid var(--bd);border-radius:18px;padding:28px;transition:border-color .25s,transform .25s}
.fc:hover{border-color:rgba(224,120,64,.38);transform:translateY(-5px)}
.fic{width:46px;height:46px;border-radius:12px;background:rgba(224,120,64,.1);border:1px solid rgba(224,120,64,.22);display:flex;align-items:center;justify-content:center;margin-bottom:18px;color:var(--acc)}
.fic svg{width:21px;height:21px}
.fc h3{font-family:'Outfit',sans-serif;font-size:16px;font-weight:700;margin-bottom:9px;letter-spacing:-.01em}
.fc p{font-size:13.5px;line-height:1.72;color:var(--muted)}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:36px;margin-top:52px}
.step{position:relative}
.step::after{content:'→';position:absolute;top:16px;right:-22px;font-size:20px;color:var(--bd2);font-weight:300}
.step:last-child::after{display:none}
.snum{font-family:'Outfit',sans-serif;font-size:52px;font-weight:900;color:rgba(224,120,64,.13);line-height:1;margin-bottom:12px;letter-spacing:-.04em}
.step h3{font-family:'Outfit',sans-serif;font-size:17px;font-weight:700;margin-bottom:10px;letter-spacing:-.01em}
.step p{font-size:13.5px;line-height:1.72;color:var(--muted)}
.sband{background:var(--bg2);border-top:1px solid var(--bd);border-bottom:1px solid var(--bd);padding:66px 72px;display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.sbstat{text-align:center}
.sbn{font-family:'Outfit',sans-serif;font-size:50px;font-weight:900;letter-spacing:-.03em}
.sbn em{font-style:normal;color:var(--acc)}
.sbl{font-size:13px;color:var(--muted);margin-top:5px;font-weight:500}
.pgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:52px}
.pc{background:var(--bg2);border:1px solid var(--bd);border-radius:20px;padding:32px;position:relative}
.pc.feat{background:linear-gradient(155deg,rgba(224,120,64,.1) 0%,var(--bg2) 55%);border-color:rgba(224,120,64,.42)}
.pbadge{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:var(--acc);color:#fff;font-size:10.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;padding:5px 16px;border-radius:100px;white-space:nowrap}
.ptier{font-size:11.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:10px}
.pamt{font-family:'Outfit',sans-serif;font-size:46px;font-weight:900;letter-spacing:-.03em;margin-bottom:4px;line-height:1}
.pamt sup{font-size:22px;vertical-align:super;opacity:.7}
.pamt sub{font-size:14px;font-weight:500;color:var(--muted)}
.pdesc{font-size:13px;color:var(--muted);margin-bottom:24px;line-height:1.65}
.pdiv{height:1px;background:var(--bd);margin-bottom:22px}
.plist{list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:28px}
.plist li{font-size:13px;color:var(--muted);display:flex;align-items:flex-start;gap:10px}
.plist li::before{content:'';width:16px;height:16px;flex-shrink:0;border-radius:50%;margin-top:1px;background:rgba(224,120,64,.14) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23e07840' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E") no-repeat center/9px;border:1px solid rgba(224,120,64,.3)}
.plist li.off{opacity:.38}
.plist li.off::before{background:transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%237a6858' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='18' y1='6' x2='6' y2='18'/%3E%3Cline x1='6' y1='6' x2='18' y2='18'/%3E%3C/svg%3E") no-repeat center/9px;border-color:var(--bd)}
.pbtn{width:100%;padding:13px;border-radius:11px;cursor:pointer;font-family:'Nunito',sans-serif;font-size:14px;font-weight:700;letter-spacing:.02em;transition:all .2s}
.pbtn-o{background:transparent;border:1px solid var(--bd2);color:var(--txt)}
.pbtn-o:hover{border-color:var(--acc);background:rgba(224,120,64,.07)}
.pbtn-s{background:var(--acc);color:#fff;border:none}
.pbtn-s:hover{background:var(--acch);transform:translateY(-1px);box-shadow:0 6px 20px rgba(224,120,64,.32)}
.t-bg{background:var(--bg2)}
.tgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:52px}
.tc{background:var(--bg);border:1px solid var(--bd);border-radius:18px;padding:28px}
.stars{display:flex;gap:3px;margin-bottom:14px}
.stars svg{width:13px;height:13px;fill:var(--acc)}
.tq{font-size:14px;line-height:1.78;color:var(--txt);margin-bottom:20px;font-style:italic;opacity:.88}
.tau{display:flex;align-items:center;gap:11px}
.tav{width:34px;height:34px;border-radius:50%;background:rgba(224,120,64,.18);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:var(--acc);flex-shrink:0}
.tnm{font-size:13px;font-weight:700}
.trl{font-size:11.5px;color:var(--muted);margin-top:2px}
.fcta{padding:110px 72px;text-align:center;position:relative;overflow:hidden}
.fcta::before{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:900px;height:450px;background:radial-gradient(ellipse,rgba(224,120,64,.09) 0%,transparent 62%);pointer-events:none}
.fcta h2{font-family:'Outfit',sans-serif;font-size:clamp(34px,5vw,60px);font-weight:900;letter-spacing:-.03em;line-height:1.07;margin-bottom:18px;position:relative;z-index:1}
.fcta h2 em{font-style:normal;color:var(--acc)}
.fcta p{font-size:16px;color:var(--muted);line-height:1.72;margin-bottom:36px;position:relative;z-index:1}
.fcta .btns{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;position:relative;z-index:1}
footer{border-top:1px solid var(--bd);padding:52px 72px;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px}
.fbrand{}
.flog{display:flex;align-items:center;gap:9px;font-family:'Outfit',sans-serif;font-size:14px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;margin-bottom:14px}
.flog svg{width:24px;height:24px}
.fbrand p{font-size:13px;color:var(--muted);line-height:1.72;max-width:230px}
.fcol h4{font-family:'Outfit',sans-serif;font-size:13px;font-weight:700;margin-bottom:14px}
.fcol a{display:block;font-size:13px;color:var(--muted);margin-bottom:8px;transition:color .2s}
.fcol a:hover{color:var(--txt)}
.fbot{border-top:1px solid var(--bd);padding:20px 72px;display:flex;justify-content:space-between;align-items:center}
.fbot p{font-size:12px;color:rgba(122,104,88,.5)}
.fbot div{display:flex;gap:20px}
.fbot a{font-size:12px;color:var(--muted);transition:color .2s}
.fbot a:hover{color:var(--txt)}
.rv{opacity:0;transform:translateY(28px);transition:opacity .65s ease,transform .65s ease}
.rv.vis{opacity:1;transform:translateY(0)}
.rv.d1{transition-delay:.1s}.rv.d2{transition-delay:.2s}.rv.d3{transition-delay:.3s}
.hamburger{display:none;flex-direction:column;justify-content:center;gap:5px;background:none;border:none;cursor:pointer;padding:6px;border-radius:8px;transition:background .2s}
.hamburger:hover{background:rgba(255,255,255,.07)}
.hamburger span{display:block;width:22px;height:2px;background:var(--txt);border-radius:2px;transition:transform .3s,opacity .3s}
.hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}
.hamburger.open span:nth-child(2){opacity:0;transform:scaleX(0)}
.hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
.mob-menu{display:none;position:fixed;inset:0;z-index:99;background:rgba(11,7,5,.97);backdrop-filter:blur(20px);flex-direction:column;align-items:center;justify-content:center;gap:0;opacity:0;pointer-events:none;transition:opacity .3s ease}
.mob-menu.open{display:flex;opacity:1;pointer-events:all}
.mob-menu a{font-family:'Outfit',sans-serif;font-size:32px;font-weight:800;color:rgba(240,220,200,.6);letter-spacing:-.02em;padding:14px 0;border-bottom:1px solid var(--bd);width:260px;text-align:center;transition:color .2s}
.mob-menu a:last-of-type{border-bottom:none}
.mob-menu a:hover{color:var(--acc)}
.mob-menu .mob-cta{margin-top:32px;padding:14px 40px;border-radius:12px;background:var(--acc);color:#fff;font-family:'Nunito',sans-serif;font-size:16px;font-weight:700;border:none;cursor:pointer;transition:background .2s}
.mob-menu .mob-cta:hover{background:var(--acch)}
@media(max-width:1024px){nav{padding:0 36px;gap:22px}.hero{padding:112px 44px 72px;gap:44px}.fgrid{grid-template-columns:repeat(2,1fr)}.pgrid{grid-template-columns:repeat(2,1fr)}.tgrid{grid-template-columns:repeat(2,1fr);gap:16px}.sband{padding:56px 44px;gap:16px}.sbn{font-size:40px}.steps{gap:24px}.step::after{right:-16px;font-size:18px}.sec{padding:80px 44px}.trust{padding:40px 44px}.lrow{gap:36px}.footer{padding:48px 44px;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:28px}.fbot{padding:18px 44px}.fcta{padding:88px 44px}}
@media(max-width:768px){nav{padding:0 20px;gap:0;height:60px}.n-links{display:none}.n-cta{display:none}.hamburger{display:flex}.hero{grid-template-columns:1fr;padding:90px 20px 56px;gap:44px;min-height:auto}.hero::before{width:320px;height:320px;top:-80px;right:-80px}.hero h1{font-size:clamp(34px,9vw,50px)}.hero>div>p{font-size:15px;max-width:100%}.hbtns{flex-direction:column;gap:12px;margin-bottom:40px}.btn-p,.btn-s{width:100%;justify-content:center;padding:14px}.hstats{gap:22px;flex-wrap:wrap}.trust{padding:32px 20px}.lrow{gap:20px}.flogo{font-size:13px}.sec{padding:60px 20px}.sec-sub{font-size:14.5px;margin-bottom:36px}.fgrid{grid-template-columns:1fr;gap:14px}.steps{grid-template-columns:1fr;gap:28px;margin-top:36px}.step::after{display:none}.sband{grid-template-columns:repeat(2,1fr);padding:48px 20px;gap:24px 16px}.sbn{font-size:38px}.pgrid{grid-template-columns:1fr;gap:24px;margin-top:36px}.tgrid{grid-template-columns:1fr;margin-top:36px}.fcta{padding:64px 20px}.fcta h2{font-size:clamp(28px,8vw,42px)}.fcta p{font-size:14.5px}.fcta p br{display:none}.fcta .btns{flex-direction:column;align-items:center;gap:12px}.fcta .btns .btn-p,.fcta .btns .btn-s{width:100%;max-width:340px;justify-content:center;font-size:15px;padding:15px}.footer{padding:40px 20px;grid-template-columns:1fr 1fr;gap:28px 20px}.fbrand{grid-column:1/-1}.fbrand p{max-width:100%}.fbot{padding:16px 20px;flex-direction:column;gap:10px;text-align:center}.fbot div{justify-content:center}}
@media(max-width:480px){.hero{padding:80px 16px 48px}.sec{padding:52px 16px}.trust{padding:28px 16px}.sband{padding:40px 16px;grid-template-columns:repeat(2,1fr);gap:20px 12px}.sbn{font-size:34px}.footer{padding:36px 16px;grid-template-columns:1fr}.fbrand{grid-column:auto}.fbot{padding:14px 16px}.hstats{gap:16px}.pgrid{gap:20px}.pc{padding:24px 20px}.fcta{padding:52px 16px}.lrow{gap:14px 20px}.fgrid{gap:12px}.fc{padding:22px}}
`;

export default function LandingStyles() {
  return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
