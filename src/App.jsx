import { useState, useEffect, useRef } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700&family=IBM+Plex+Mono:wght@300;400;500&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}

:root{
  --bg:     #080c12;
  --bg2:    #0d1219;
  --bg3:    #121920;
  --card:   #0d1219;
  --b:      #1e2730;
  --b2:     #162030;
  --text:   #e8eef5;
  --soft:   #7a8899;
  --muted:  #3a4756;
  --gold:   #c9a96e;
  --gold2:  #e8c87a;
  --teal:   #4ecdc4;
  --blue:   #4a9eff;
  --green:  #52d98a;
  --r:      6px;
  --r2:     10px;
}

body{background:var(--bg);margin:0}
.p{font-family:'Bricolage Grotesque',sans-serif;background:var(--bg);color:var(--text);min-height:100vh}
.mono{font-family:'IBM Plex Mono',monospace}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--b2);border-radius:3px}

.nav{position:fixed;top:0;left:0;right:0;z-index:100;height:58px;display:flex;align-items:center;justify-content:space-between;padding:0 clamp(1.5rem,6vw,4rem);background:rgba(8,12,18,0.88);backdrop-filter:blur(20px);border-bottom:1px solid rgba(201,169,110,0.08)}
.brand{font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:500;font-style:italic;color:var(--text);text-decoration:none;display:flex;align-items:center;gap:10px;letter-spacing:0.02em}
.bdot{width:6px;height:6px;border-radius:50%;background:var(--gold);animation:glow 3s ease-in-out infinite}
@keyframes glow{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(201,169,110,0.4)}50%{opacity:0.5;box-shadow:0 0 0 5px rgba(201,169,110,0)}}
.nl{display:flex;gap:0;list-style:none}
.nl a{font-family:'IBM Plex Mono',monospace;font-size:0.7rem;font-weight:400;color:var(--soft);text-decoration:none;padding:6px 14px;border-radius:var(--r);transition:color 0.2s;letter-spacing:0.06em;text-transform:capitalize}
.nl a:hover,.nl a.on{color:var(--gold)}
.hbtn{display:none;background:none;border:1px solid var(--b);color:var(--soft);padding:6px 11px;border-radius:var(--r);cursor:pointer;font-size:0.9rem;transition:color 0.2s}
.hbtn:hover{color:var(--text)}
.mm{position:fixed;top:58px;left:0;right:0;z-index:99;background:rgba(8,12,18,0.97);backdrop-filter:blur(20px);border-bottom:1px solid rgba(201,169,110,0.08);padding:12px 1.5rem;display:flex;flex-direction:column;gap:2px}
.mm a{font-family:'IBM Plex Mono',monospace;font-size:0.85rem;color:var(--soft);text-decoration:none;padding:10px 12px;border-radius:var(--r);transition:color 0.2s;letter-spacing:0.05em;text-transform:capitalize}
.mm a:hover{color:var(--gold)}

.fd{opacity:0;transform:translateY(32px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1)}
.fd.in{opacity:1;transform:translateY(0)}

.sec{padding:clamp(4.5rem,9vw,8rem) clamp(1.5rem,6vw,4rem)}
.sec.alt{background:var(--bg2)}
.inner{max-width:1080px;margin:0 auto}
.lbl{font-family:'IBM Plex Mono',monospace;font-size:0.62rem;color:var(--gold);letter-spacing:0.25em;text-transform:uppercase;margin-bottom:8px;display:flex;align-items:center;gap:10px}
.lbl::before{content:'';display:block;width:24px;height:1px;background:var(--gold);opacity:0.5}
.stitle{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,5vw,3.2rem);font-weight:300;letter-spacing:-0.01em;line-height:1.1;margin-bottom:2.5rem;color:var(--text)}
.stitle em{font-style:italic;color:var(--gold)}

.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:clamp(5rem,10vw,9rem) clamp(1.5rem,6vw,4rem) 4rem;border-bottom:1px solid var(--b);position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;top:-200px;right:-200px;width:600px;height:600px;background:radial-gradient(circle,rgba(201,169,110,0.04) 0%,transparent 65%);pointer-events:none}
.hero::after{content:'';position:absolute;bottom:-100px;left:-100px;width:400px;height:400px;background:radial-gradient(circle,rgba(78,205,196,0.03) 0%,transparent 65%);pointer-events:none}
.hi{max-width:1080px;width:100%;position:relative;z-index:1}

.avail{display:inline-flex;align-items:center;gap:8px;font-family:'IBM Plex Mono',monospace;font-size:0.62rem;color:var(--green);letter-spacing:0.12em;text-transform:uppercase;margin-bottom:2.5rem;background:rgba(82,217,138,0.06);border:1px solid rgba(82,217,138,0.15);padding:6px 14px;border-radius:99px;width:fit-content}
.adot{width:5px;height:5px;border-radius:50%;background:var(--green);animation:glow 3s ease-in-out infinite}
.hname{font-family:'Cormorant Garamond',serif;font-size:clamp(3.5rem,11vw,8rem);font-weight:300;letter-spacing:-0.02em;line-height:0.92;margin-bottom:0.3em;color:var(--text)}
.hname strong{font-weight:500;background:linear-gradient(135deg,var(--gold) 0%,var(--gold2) 50%,var(--gold) 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.hrole{font-family:'Bricolage Grotesque',sans-serif;font-size:clamp(0.9rem,2vw,1.05rem);color:var(--soft);max-width:500px;line-height:1.8;margin-bottom:2.5rem;font-weight:300}
.hrole strong{color:var(--text);font-weight:500}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:3rem}
.chip{font-family:'IBM Plex Mono',monospace;font-size:0.6rem;color:var(--soft);background:rgba(201,169,110,0.07);border:1px solid rgba(201,169,110,0.25);padding:5px 12px;border-radius:99px;letter-spacing:0.05em;transition:color 0.2s,border-color 0.2s}.chip:hover{color:var(--gold);border-color:rgba(201,169,110,0.3)}
.hbtns{display:flex;flex-wrap:wrap;gap:12px}
.bp{background:transparent;color:var(--gold);font-family:'Bricolage Grotesque',sans-serif;font-weight:500;font-size:0.85rem;padding:11px 28px;border-radius:var(--r);border:1px solid rgba(201,169,110,0.4);cursor:pointer;text-decoration:none;transition:background 0.2s,border-color 0.2s;display:inline-flex;align-items:center;gap:8px;letter-spacing:0.02em}
.bp:hover{background:rgba(201,169,110,0.08);border-color:rgba(201,169,110,0.7)}
.bs{background:transparent;color:var(--soft);font-family:'Bricolage Grotesque',sans-serif;font-weight:400;font-size:0.85rem;padding:11px 28px;border-radius:var(--r);border:1px solid var(--b);cursor:pointer;text-decoration:none;transition:color 0.2s,border-color 0.2s;display:inline-flex;align-items:center;gap:8px}
.bs:hover{color:var(--text);border-color:var(--soft)}

.ag{display:grid;grid-template-columns:1fr;gap:1.5rem}
.card{background:var(--card);border:1px solid var(--b);border-radius:var(--r2);padding:2rem}
.card p{font-size:0.92rem;color:var(--soft);line-height:1.9;margin-bottom:1rem;font-weight:300}
.card p:last-child{margin-bottom:0}
.card p strong{color:var(--text);font-weight:500}
.elbl{font-family:'IBM Plex Mono',monospace;font-size:0.58rem;color:var(--muted);letter-spacing:0.18em;text-transform:uppercase;margin-bottom:1.2rem}
.erow{display:flex;gap:14px;align-items:flex-start;padding:14px 0;border-bottom:1px solid var(--b)}
.erow:last-child{border-bottom:none;padding-bottom:0}
.eico{width:36px;height:36px;background:rgba(201,169,110,0.06);border:1px solid rgba(201,169,110,0.15);border-radius:var(--r);display:flex;align-items:center;justify-content:center;font-size:0.9rem;flex-shrink:0}
.ed{font-size:0.88rem;font-weight:500;color:var(--text)}
.es{font-size:0.75rem;color:var(--muted);margin-top:3px;font-weight:300}
.ey{font-family:'IBM Plex Mono',monospace;font-size:0.58rem;color:var(--gold);margin-top:6px;display:inline-block;letter-spacing:0.05em}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--b);border:1px solid var(--b);border-radius:var(--r2);overflow:hidden;margin-top:1.5rem}
.stat{background:var(--card);padding:1.5rem 1rem;text-align:center}
.sn{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:500;color:var(--gold);letter-spacing:-0.02em}
.sl{font-family:'IBM Plex Mono',monospace;font-size:0.56rem;color:var(--muted);margin-top:4px;letter-spacing:0.1em;text-transform:uppercase}

.pg{display:grid;grid-template-columns:1fr;gap:1.5rem;background:transparent;border:none;border-radius:var(--r2);overflow:visible}
.pc{background:var(--card);padding:1.75rem;border:1px solid var(--b);border-radius:var(--r2);border-left:2px solid transparent;transition:background 0.2s,border-color 0.2s;display:flex;flex-direction:column;height:100%}
.pc:hover{background:var(--bg3);border-left-color:var(--gold)}
.pt{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:6px}
.pn{font-family:'IBM Plex Mono',monospace;font-size:0.56rem;color:var(--muted);letter-spacing:0.1em}
.badge{font-family:'IBM Plex Mono',monospace;font-size:0.55rem;font-weight:500;padding:2px 9px;border-radius:3px;letter-spacing:0.06em}
.bl{color:#52d98a;background:rgba(82,217,138,0.08);border:1px solid rgba(82,217,138,0.2)}
.bw{color:#e3b341;background:rgba(227,179,65,0.08);border:1px solid rgba(227,179,65,0.2)}
.ba{color:#4a9eff;background:rgba(74,158,255,0.08);border:1px solid rgba(74,158,255,0.2)}
.pti{font-family:'Bricolage Grotesque',sans-serif;font-size:1rem;font-weight:600;margin-bottom:6px;letter-spacing:-0.01em;color:var(--text)}
.pde{font-size:0.82rem;color:var(--soft);line-height:1.75;margin-bottom:14px;font-weight:300}
.ptags{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:14px}
.ptag{font-family:'IBM Plex Mono',monospace;font-size:0.56rem;color:var(--soft);background:rgba(201,169,110,0.07);border:1px solid rgba(201,169,110,0.2);padding:2px 8px;border-radius:3px;letter-spacing:0.03em}
.pls{display:flex;gap:16px;margin-top:auto}
.pl{font-family:'IBM Plex Mono',monospace;font-size:0.68rem;color:var(--soft);text-decoration:none;transition:color 0.2s;letter-spacing:0.04em}
.pl:hover{color:var(--gold)}

.skg{display:grid;grid-template-columns:1fr;gap:12px}
.sg{background:var(--card);border:1px solid var(--b);border-radius:var(--r2);padding:1.5rem}
.sgt{font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-weight:500;font-style:italic;color:var(--gold);margin-bottom:1.2rem;padding-bottom:10px;border-bottom:1px solid var(--b);letter-spacing:0.02em}
.skr{display:flex;align-items:center;gap:10px;margin-bottom:12px}
.skr:last-child{margin-bottom:0}
.ski{font-size:0.88rem;width:18px;flex-shrink:0}
.skn{font-size:0.82rem;font-weight:400;flex:1;color:var(--text)}
.skb{flex:1;max-width:130px;height:2px;background:var(--b);border-radius:99px;overflow:hidden}
.skf{height:100%;background:linear-gradient(90deg,var(--gold),var(--gold2));border-radius:99px;width:0;transition:width 1.1s cubic-bezier(.4,0,.2,1)}
.skp{font-family:'IBM Plex Mono',monospace;font-size:0.56rem;color:var(--muted);width:28px;text-align:right}
.crs{background:var(--card);border:1px solid var(--b);border-radius:var(--r2);padding:1.5rem;margin-top:12px}
.clbl{font-family:'IBM Plex Mono',monospace;font-size:0.62rem;color:var(--gold);letter-spacing:0.2em;text-transform:uppercase;margin-bottom:16px;display:flex;align-items:center;gap:10px}
.clbl::before{content:'';display:block;width:24px;height:1px;background:var(--gold);opacity:0.5}
.ctags{display:flex;flex-wrap:wrap;gap:8px}
.ctag{font-size:0.75rem;font-weight:400;color:var(--text);background:rgba(201,169,110,0.05);border:1px solid rgba(201,169,110,0.15);padding:6px 14px;border-radius:var(--r);transition:color 0.2s,border-color 0.2s,background 0.2s}
.ctag:hover{color:var(--gold);border-color:rgba(201,169,110,0.4);background:rgba(201,169,110,0.08)}
.ctag:hover{color:var(--text);border-color:rgba(201,169,110,0.3)}

.cbox{background:var(--card);border:1px solid var(--b);border-radius:var(--r2);padding:3rem 2.5rem;text-align:center;max-width:560px;margin:0 auto;position:relative;overflow:hidden}
.cbox::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(201,169,110,0.5),transparent)}
.cbox h2{font-family:'Cormorant Garamond',serif;font-size:2.2rem;font-weight:300;letter-spacing:-0.01em;margin-bottom:10px}
.cbox h2 em{font-style:italic;color:var(--gold)}
.cbox p{font-size:0.88rem;color:var(--soft);line-height:1.8;margin-bottom:2.5rem;font-weight:300}
.cemail{display:inline-flex;align-items:center;gap:8px;font-family:'IBM Plex Mono',monospace;font-size:0.78rem;color:var(--gold);background:rgba(201,169,110,0.06);border:1px solid rgba(201,169,110,0.2);padding:10px 22px;border-radius:var(--r);text-decoration:none;margin-bottom:2rem;transition:background 0.2s;letter-spacing:0.04em}
.cemail:hover{background:rgba(201,169,110,0.1)}
.socs{display:flex;justify-content:center;flex-wrap:wrap;gap:8px}
.soc{font-family:'IBM Plex Mono',monospace;font-size:0.7rem;color:var(--soft);background:transparent;border:1px solid var(--b);padding:8px 18px;border-radius:var(--r);text-decoration:none;transition:all 0.2s;letter-spacing:0.05em}
.soc:hover{color:var(--gold);border-color:rgba(201,169,110,0.3)}

.foot{padding:2rem clamp(1.5rem,6vw,4rem);border-top:1px solid var(--b);display:flex;justify-content:center;align-items:center;gap:2rem;flex-wrap:wrap}
.foot p{font-family:'IBM Plex Mono',monospace;font-size:0.58rem;color:var(--muted);letter-spacing:0.08em}
.foot span{color:var(--gold)}

@media(min-width:600px){.ag{grid-template-columns:1fr 1fr}.skg{grid-template-columns:1fr 1fr}.pg{grid-template-columns:1fr 1fr}}
@media(min-width:1024px){.ag{grid-template-columns:3fr 2fr}.skg{grid-template-columns:repeat(3,1fr)}.pg{grid-template-columns:1fr 1fr;max-width:760px;margin:0 auto}.nl{display:flex!important}.hbtn{display:none!important}}
@media(max-width:1023px){.nl{display:none}.hbtn{display:block}}
`;

// ── EDIT YOUR PROJECTS HERE ──────────────────────────────────
const projects = [
  {
    num: "01", s: "w",
    title: "StoreTrack",
    desc: "Full-stack inventory management system with Flask REST API, MySQL database, and a dark-themed responsive frontend to track products, sales, purchases, and profit analytics.",
    tags: ["Flask", "MySQL", "React", "REST API"],
    links: [{ t: "GitHub", h: "https://github.com/itsmanasa-dev/StoreTrack" }]
  },
  {
    num: "02", s: "w",
    title: "Face Emotion Detection",
    desc: "Real-time facial emotion recognition system using computer vision and deep learning to detect and classify human emotions from live camera feed.",
    tags: ["Python", "OpenCV", "TensorFlow", "Deep Learning"],
    links: [{ t: "GitHub", h: "https://github.com/itsmanasa-dev" }]
  },
];
// ── EDIT YOUR SKILLS HERE ────────────────────────────────────
const skillGroups = [
  { g: "Frontend", items: [{ i: "⚛️", n: "React", p: 40 }, { i: "🟨", n: "HTML/JavaScript", p: 80 }, { i: "🎨", n: "CSS / Tailwind", p: 78 }] },
  { g: "Backend", items: [{ i: "🟢", n: "Node.js / Express", p: 82 }, { i: "🐍", n: "Python / FastAPI", p: 75 }, { i: "🗄️", n: "MySQL /SQLlite", p: 72 }] },
  { g: "Tools", items: [{ i: "🐙", n: "Git / GitHub", p: 88 }, { i: "🐍", n: "DSA-Python", p: 50 }] },
];

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => el.classList.add("in"), delay);
      } else {
        el.classList.remove("in");
      }
    }, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <div ref={ref} className="fd">{children}</div>;
}

function Bar({ p }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.width = p + "%"; io.disconnect(); }
    }, { threshold: 0.1 });
    io.observe(el); return () => io.disconnect();
  }, [p]);
  return <div className="skb"><div ref={ref} className="skf" /></div>;
}

export default function Portfolio() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const ids = ["hero", "about", "projects", "skills", "contact"];
    const fn = () => {
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 100) { setActive(ids[i]); break; }
      }
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="p">

        {/* ── NAV ── */}
        <nav className="nav">
          <a href="#hero" className="brand"><span className="bdot" />Manasa T</a>  {/* ← CHANGE NAME */}
          <ul className="nl">
            {["about", "projects", "skills", "contact"].map(s => (
              <li key={s}><a href={`#${s}`} className={active === s ? "on" : ""}>{s}</a></li>
            ))}
          </ul>
          <button className="hbtn" onClick={() => setOpen(o => !o)}>☰</button>
        </nav>

        {open && (
          <div className="mm">
            {["about", "projects", "skills", "contact"].map(s => (
              <a key={s} href={`#${s}`} onClick={() => setOpen(false)}>{s}</a>
            ))}
          </div>
        )}

        {/* ── HERO ── */}
        <section id="hero" className="hero">
          <div className="hi">
            <FadeIn delay={0}><div className="avail"><span className="adot" />Open to Internships · 2026</div></FadeIn>
            <FadeIn delay={100}>
              <h1 className="hname">Hi, I'm<br /><strong>Manasa T</strong></h1>  {/* ← CHANGE NAME */}
            </FadeIn>
            <FadeIn delay={200}>
              <p className="hrole">
                <strong>Bachelor's of Computer Science Student</strong> · Building full-stack software that solves real problems. Passionate about clean code, great products, and continuous learning.
              </p>
            </FadeIn>
            <FadeIn delay={270}>
              <div className="chips">
                {["BCA'26", "Full Stack Dev", "Open Source", "DSA"].map(c => <span key={c} className="chip">{c}</span>)}
              </div>
            </FadeIn>
            <FadeIn delay={340}>
              <div className="hbtns">
                <a href="#projects" className="bp">View Work →</a>
                <a href="#contact" className="bs">Resume ↗</a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="sec alt">
          <div className="inner">
            <FadeIn><div className="lbl">About</div></FadeIn>
            <FadeIn delay={60}><div className="stitle">A bit about <em>me</em></div></FadeIn>
            <div className="ag">
              <FadeIn delay={100}>
                <div className="card">
                  <p>
                    I'm a <strong>2nd year Bachelor's of Computer Science student</strong> focused on building practical, real-world applications instead of just learning theory.
                  </p>
                  <p>
                    Currently working on <strong>Full-Stack Web Development</strong>, combining clean UI with solid backend logic to create usable products.
                  </p>
                  <p>
                    I aim to build things people actually use — and I'm actively looking for <strong>Internships</strong> where I can contribute, learn fast, and work on real systems.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={140}>
                <div className="card">
                  <div className="elbl">Education</div>
                  <div className="erow">
                    <div className="eico">🎓</div>
                    <div>
                      <div className="ed">Bachelor's of Computer Science</div>       {/* ← CHANGE DEGREE */}
                      <div className="es">PES Institute od Advanced Management Studies</div>  {/* ← CHANGE COLLEGE */}
                      <div className="ey">2024 – 2027</div>                    {/* ← CHANGE YEAR */}
                    </div>
                  </div>
                  <div className="erow">
                    <div className="eico">📊</div>
                    <div>
                      <div className="ed">CGPA: 8.7 / 10</div>          {/* ← CHANGE CGPA */}
                      <div className="es">4th Semester</div>
                      <div className="ey">'25 & '26</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={160}>
              <div className="stats">
                {[["2+", "Projects"], ["1", "Hackathons"], ["30+", "LeetCode"]].map(([n, l]) => (  /* ← CHANGE STATS */
                  <div key={l} className="stat"><div className="sn">{n}</div><div className="sl">{l}</div></div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="sec">
          <div className="inner">
            <FadeIn><div className="lbl">Projects</div></FadeIn>
            <FadeIn delay={60}><div className="stitle">Things I've <em>built</em></div></FadeIn>
            <div className="pg">
              {projects.map((p, i) => (
                <FadeIn key={p.num} delay={i * 50}>
                  <div className="pc">
                    <div className="pt">
                      <span className="pn">{p.num}</span>
                      <span className={`badge ${p.s === "l" ? "bl" : p.s === "w" ? "bw" : "ba"}`}>{p.s === "l" ? "Live" : p.s === "w" ? "WIP" : "Academic"}</span>
                    </div>
                    <div className="pti">{p.title}</div>
                    <div className="pde">{p.desc}</div>
                    <div className="ptags">{p.tags.map(t => <span key={t} className="ptag">{t}</span>)}</div>
                    <div className="pls">{p.links.map(l => <a key={l.t} href={l.h} className="pl">{l.t} ↗</a>)}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" className="sec alt">
          <div className="inner">
            <FadeIn><div className="lbl">Skills</div></FadeIn>
            <FadeIn delay={60}><div className="stitle">My <em>tech stack</em></div></FadeIn>
            <div className="skg">
              {skillGroups.map((g, gi) => (
                <FadeIn key={g.g} delay={gi * 70}>
                  <div className="sg">
                    <div className="sgt">{g.g}</div>
                    {g.items.map(s => (
                      <div key={s.n} className="skr">
                        <span className="ski">{s.i}</span>
                        <span className="skn">{s.n}</span>
                        <Bar p={s.p} />
                        <span className="skp">{s.p}%</span>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={140}>
              <div className="crs">
                <div className="clbl">Relevant Coursework</div>
                <div className="ctags">
                  {["Data Structures & Algorithms", "Operating Systems","Computer Networks and Communications", "Software Engineering"].map(c => (
                    <span key={c} className="ctag">{c}</span>  /* ← EDIT COURSES */
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="sec">
          <div className="inner">
            <FadeIn><div className="lbl">Contact</div></FadeIn>
            <FadeIn delay={80}>
              <div className="cbox">
                <h2>Let's <em>connect</em></h2>
                <p>Open to internships, summer 2026 roles, and interesting collaborations!</p>
                <div><a href="mailto:yourname@email.com" className="cemail">manasat433@gmail.com</a></div>  {/* ← CHANGE EMAIL */}
                <div className="socs">
                  {/* ← CHANGE THESE LINKS */}
                  {[
                    { t: "GitHub", h: "https://github.com/itsmanasa-dev" },
                    { t: "LinkedIn", h: "https://linkedin.com/in/manasa-t0203" },
                    { t: "Resume PDF", h: "#" },
                  ].map(s => <a key={s.t} href={s.h} className="soc" target="_blank" rel="noreferrer">{s.t}</a>)}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="foot">
          <p>© <span>2026</span> Manasa T</p>  {/* ← CHANGE NAME */}
          <p>Built with <span>React</span> · Designed with intention</p>
        </footer>

      </div>
    </>
  );
}
