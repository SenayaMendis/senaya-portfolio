"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
 Mail, MapPin, ArrowRight, ArrowDown, ChevronLeft, ChevronRight,
 Code, Server, Database, Wrench, GraduationCap, Briefcase, Award,
 Check, Menu, X, Calendar, BookOpen, Smartphone, Rocket, Laptop, Activity, Shield,
 type LucideIcon,
} from "lucide-react";

/* ====== EDIT THESE ====== */
const EMAIL = "senayamendis2@gmail.com";
const GITHUB = "https://github.com/SenayaMendis";
const LINKEDIN = "https://www.linkedin.com/in/senaya-a-mendis/";
const CV = "/Senaya-Mendis-CV.pdf";
/* ======================= */

const NAV = [
 { id: "home", label: "Home" },
 { id: "about", label: "About" },
 { id: "skills", label: "Skills" },
 { id: "projects", label: "Projects" },
 { id: "education", label: "Education" },
 { id: "contact", label: "Contact" },
];

const SKILLS: { icon: LucideIcon; title: string; tags: string[] }[] = [
 { icon: Code, title: "Frontend", tags: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
 { icon: Server, title: "Backend", tags: ["Node.js", "NestJS", "PHP", "REST APIs", "Prisma"] },
 { icon: Database, title: "Database", tags: ["PostgreSQL", "MySQL", "MongoDB"] },
 { icon: Wrench, title: "Tools", tags: ["Git", "GitHub", "WebStorm", "VS Code", "Android Studio", "Figma"] },
];

const PROCESS = [
 ["01", "Discover", "Understand the problem, users and requirements."],
 ["02", "Design", "Plan the architecture, data model and interface."],
 ["03", "Develop", "Build clean, maintainable features step by step."],
 ["04", "Test", "Check behaviour, edge cases and responsiveness."],
 ["05", "Improve", "Refine performance, UX and code quality."],
];

const PROJECTS: {
 icon: LucideIcon; tone: string; img: string; title: string; cat: string; tags: string[]; desc: string; href: string;
}[] = [
 {
  icon: Calendar, tone: "tone-a", img: "/projects/reservation-system.png",
  title: "Boarding Management System", cat: "FULL STACK",
  tags: ["MongoDB", "Express.js", "React", "Node.js"],
  desc: "Developed a MERN-stack reservation system with an interactive calendar, data filtering, and report generation with downloadable output.", href: GITHUB,
 },
 {
  icon: BookOpen, tone: "tone-d", img: "/projects/mindink-app.png",
  title: "MindInk Blog Application", cat: "FULL STACK",
  tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
  desc: "Built a full-stack blog platform with secure authentication, user-owned posts and full CRUD functionality. Deployed the app and managed the project with Git.", href: GITHUB,
 },
 {
  icon: Shield, tone: "tone-c", img: "/projects/safeguard-insurance.png",
  title: "Safeguard Insurance Website — Feedback Form", cat: "FULL STACK",
  tags: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
  desc: "Built the feedback form for a dynamic PHP/MySQL insurance website, implementing full CRUD functionality and managing backend data.", href: GITHUB,
 },
 {
  icon: Smartphone, tone: "tone-b", img: "/projects/senvibe-cafe-uiux.png",
  title: "SenVibe Cafe", cat: "UI/UX",
  tags: ["Figma"],
  desc: "Designed a user-friendly, clean and modern mobile app interface for a coffee shop, with simple navigation across a 15-screen UI kit.", href: GITHUB,
 },
 {
  icon: Rocket, tone: "tone-b", img: "/projects/octwave-frontend.png",
  title: "Octwave 3.0", cat: "FRONTEND",
  tags: ["React", "Vite", "Tailwind CSS"],
  desc: "Built the frontend for IEEE IAS's undergraduate AI/ML competition site, with animated hero text, a starfield canvas and a live countdown.", href: GITHUB,
 },
 {
  icon: Server, tone: "tone-c", img: "/projects/server-room-monitoring.png",
  title: "Server Room Monitoring Dashboard", cat: "FRONTEND",
  tags: ["HTML", "CSS", "JavaScript"],
  desc: "Designed the frontend for a live sensor dashboard tracking server status, UPS, temperature, humidity, VOC and CO2 levels for the Faculty of IT.", href: GITHUB,
 },
];

const CASE_TABS = [
 {
  id: "contribution",
  label: "My Contribution",
  icon: Briefcase,
  body: {
   lead: "Developed the Inventory Management module of a full-stack POS system and integrated it with the rest of the platform.",
   list: [
    "Product management",
    "Stock management",
    "Inventory logs",
    "Low-stock alerts",
    "Supplier management",
   ],
  },
 },
 {
  id: "architecture",
  label: "Architecture",
  icon: Activity,
  body: {
   lead: "A pnpm/Turborepo monorepo connecting a Next.js frontend to a NestJS backend through Prisma, with Swagger for API documentation.",
   arch: ["Next.js / React", "REST API (Swagger)", "NestJS", "Prisma", "PostgreSQL"],
  },
 },
 {
  id: "learned",
  label: "What I Learned",
  icon: GraduationCap,
  body: {
   lead: "Skills built while shipping a real, multi-branch business application with a team.",
   list: [
    "Full-stack integration",
    "Database operations",
    "REST API development with NestJS and Prisma",
    "Team collaboration",
    "TypeScript monorepo",
    "Role-based access control across branches",
   ],
  },
 },
];

const GithubIcon = () => (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
     <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
);

const LinkedinIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
     <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
);

/* Shows a project image. If the file doesn't exist yet, it renders nothing and the placeholder underneath stays visible. */
function Shot({ src, alt }: { src: string; alt: string }) {
 const [ok, setOk] = useState(true);
 const ref = useRef<HTMLImageElement>(null);

 useEffect(() => {
  const img = ref.current;
  if (img && img.complete && img.naturalWidth === 0) setOk(false);
 }, []);

 if (!ok) return null;
 return <img ref={ref} className="shot" src={src} alt={alt} loading="lazy" onError={() => setOk(false)} />;
}

export default function Home() {
 const [active, setActive] = useState("home");
 const [open, setOpen] = useState(false);
 const [form, setForm] = useState({ name: "", email: "", message: "" });
 const [caseTab, setCaseTab] = useState(CASE_TABS[0].id);
 const carousel = useRef<HTMLDivElement>(null);

 useEffect(() => {
  document.documentElement.classList.add("js");

  const reveal = new IntersectionObserver(
      (entries) =>
          entries.forEach((e) => {
           if (e.isIntersecting) {
            e.target.classList.add("in");
            reveal.unobserve(e.target);
           }
          }),
      { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));

  const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
  );
  NAV.forEach((n) => {
   const el = document.getElementById(n.id);
   if (el) spy.observe(el);
  });

  return () => {
   reveal.disconnect();
   spy.disconnect();
  };
 }, []);

 const move = (dir: number) => {
  const c = carousel.current;
  if (!c || !c.firstElementChild) return;
  const w = (c.firstElementChild as HTMLElement).clientWidth + 20;
  c.scrollBy({ left: dir * w, behavior: "smooth" });
 };

 const send = (e: FormEvent) => {
  e.preventDefault();
  const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
  const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`);
  window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
 };

 const activeCase = CASE_TABS.find((t) => t.id === caseTab) ?? CASE_TABS[0];

 return (
     <main>
      {/* NAVBAR */}
      <nav className="nav">
       <div className="wrap nav-in">
        <button className="burger" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
         {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className={"nav-links" + (open ? " open" : "")}>
         {NAV.map((n) => (
             <a key={n.id} href={"#" + n.id} className={"link" + (active === n.id ? " active" : "")} onClick={() => setOpen(false)}>{n.label}</a>
         ))}
         <a className="btn btn-primary btn-sm" href={CV} download onClick={() => setOpen(false)}>
          Download CV <ArrowDown size={14} />
         </a>
        </div>
       </div>
      </nav>

      {/* HERO */}
      <section id="home" className="wrap hero">
       <div className="hero-copy">
        <p className="eyebrow">HELLO, I&apos;M</p>
        <h1>
         Senaya Amanethmi <span className="grad">Mendis</span>
        </h1>
        <h2 className="role">
         IT &amp; Management Undergraduate
         <br />
         <b>Full-Stack Developer</b>
        </h2>
        <p className="lead">
         A full-stack developer with hands-on experience in React, Next.js, NestJS and
         PostgreSQL, building modern web applications that solve real-world problems.
        </p>
        <div className="actions">
         <a className="btn btn-primary" href="#projects">
          View My Projects <ArrowRight size={16} />
         </a>
         <a className="btn btn-ghost" href={CV} download>
          Download CV <ArrowDown size={16} />
         </a>
        </div>
        <div className="social">
         <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon /></a>
         <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
         <a href={"mailto:" + EMAIL} aria-label="Email"><Mail size={20} /></a>
        </div>
       </div>

       <div className="hero-visual">
        <div className="orb" />
        <div className="frame">
         <img src="/profile.jpeg" alt="Senaya Amanethmi Mendis" />
        </div>
        <div className="code">
         <span className="k">const</span> developer = {"{"}
         <span className="p">name: <span className="s">&quot;Senaya&quot;</span>,</span>
         <span className="p">focus: <span className="s">&quot;Full Stack&quot;</span>,</span>
         <span className="p">status: <span className="s">&quot;Building&quot;</span></span>
         {"};"}
        </div>
       </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section wrap">
       <div className="head reveal">
        <p className="eyebrow">ABOUT ME</p>
        <h2 className="title">Who Am I?</h2>
       </div>
       <div className="about">
        <div className="card about-card reveal">
         <p>
          A third-year Information Technology and Management undergraduate at the University of
          Moratuwa. Enjoys building web applications, working with backend systems and databases,
          and turning ideas into practical software solutions.
         </p>
         <p>
          Building full-stack skills through university projects, hands-on development and
          continuous learning.
         </p>
         <p className="objective">
          To obtain a software engineering internship where full-stack development skills and
          academic knowledge can be applied to real-world projects.
         </p>
        </div>
        <div className="info reveal">
         <div><GraduationCap size={22} /><small>University</small><b>University of Moratuwa</b></div>
         <div><Laptop size={22} /><small>Focus</small><b>Full-Stack Development</b></div>
         <div><MapPin size={22} /><small>Location</small><b>Colombo, Sri Lanka</b></div>
         <div><Rocket size={22} /><small>Goal</small><b>Software Engineering Internship</b></div>
        </div>
       </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section wrap">
       <div className="head reveal">
        <p className="eyebrow">TECHNOLOGIES</p>
        <h2 className="title">What I Build With</h2>
        <p className="sub">Technologies and tools used across my projects.</p>
       </div>
       <div className="skills">
        {SKILLS.map((s, i) => (
            <div key={s.title} className="card skill reveal" style={{ transitionDelay: `${i * 70}ms` }}>
             <div className="ico"><s.icon size={22} /></div>
             <h3>{s.title}</h3>
             <div className="tags">{s.tags.map((t) => <span key={t}>{t}</span>)}</div>
            </div>
        ))}
       </div>
      </section>

      {/* PROCESS */}
      <section className="section wrap">
       <div className="head reveal">
        <p className="eyebrow">MY APPROACH</p>
        <h2 className="title">How I Build</h2>
       </div>
       <div className="process">
        {PROCESS.map(([n, t, d], i) => (
            <div key={n} className="card step reveal" style={{ transitionDelay: `${i * 70}ms` }}>
             <div className="num">{n}</div>
             <h3>{t}</h3>
             <p>{d}</p>
            </div>
        ))}
       </div>
      </section>

      {/* PROJECTS (featured + other + case study) */}
      <div id="projects">
       {/* FEATURED */}
       <section className="section wrap">
        <div className="featured">
         <div className="dash-wrap reveal">
          <div className="dash">
           <div className="dash-top"><i /><i /><i /></div>
           <div className="dash-body">
            <div className="dash-side">
             {[0, 1, 2, 3, 4, 5].map((i) => <span key={i} className={i === 0 ? "on" : ""} />)}
            </div>
            <div className="dash-main">
             <div className="stats">
              {[0, 1, 2].map((i) => <div key={i}><i /><i /></div>)}
             </div>
             <div className="bars">
              {[40, 65, 50, 80, 60, 90, 72, 95].map((h, i) => <i key={i} style={{ height: h + "%" }} />)}
             </div>
            </div>
           </div>
           <Shot src="/projects/ryzera-pos-dashboard.png" alt="Ryzera POS dashboard" />
          </div>
         </div>

         <div className="reveal">
          <p className="eyebrow">FEATURED PROJECT</p>
          <h2 className="title"><span className="grad">Ryzera POS</span></h2>
          <p style={{ fontWeight: 600, marginBottom: 12 }}>Enterprise Point of Sale &amp; Inventory Management</p>
          <p className="muted">
           Developed a full-stack POS system with an inventory management module, building REST
           APIs and database operations with NestJS, Prisma and PostgreSQL, and a responsive
           interface with React and Next.js.
          </p>
          <div className="tags">
           {["Next.js", "React", "NestJS", "TypeScript", "PostgreSQL", "Prisma", "Turborepo", "pnpm", "Swagger"].map((t) => (
               <span key={t}>{t}</span>
           ))}
          </div>
          <ul className="checks">
           {[
            "Product and inventory management",
            "Stock-in / stock-out operations",
            "Inventory logs",
            "Low-stock alerts",
            "REST API and database integration",
           ].map((f) => (
               <li key={f}><Check size={16} />{f}</li>
           ))}
          </ul>
          <a className="btn btn-primary" href="#case-study">
           View Case Study <ArrowRight size={16} />
          </a>
         </div>
        </div>
       </section>

       {/* OTHER PROJECTS */}
       <section className="section wrap">
        <div className="head-row reveal">
         <div>
          <p className="eyebrow">MORE WORK</p>
          <h2 className="title">Other Projects</h2>
          <p className="sub">Explore some of my other academic and personal projects.</p>
         </div>
         <div className="arrows">
          <button aria-label="Previous project" onClick={() => move(-1)}><ChevronLeft size={20} /></button>
          <button aria-label="Next project" onClick={() => move(1)}><ChevronRight size={20} /></button>
         </div>
        </div>

        <div className="carousel" ref={carousel}>
         {PROJECTS.map((p) => (
             <article key={p.title} className="card project">
              <div className="thumb-box">
               <div className={"thumb " + p.tone}>
                <p.icon size={38} />
                <Shot src={p.img} alt={p.title} />
               </div>
              </div>
              <span className="cat">{p.cat}</span>
              <h3>{p.title}</h3>
              <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
              <p>{p.desc}</p>
              <a className="btn btn-ghost btn-sm" href={p.href} target="_blank" rel="noreferrer">
               View Project <ArrowRight size={14} />
              </a>
             </article>
         ))}
        </div>
       </section>

       {/* CASE STUDY — interactive tabs */}
       <section id="case-study" className="section wrap">
        <div className="head reveal">
         <p className="eyebrow">CASE STUDY</p>
         <h2 className="title">Ryzera POS — Behind the Project</h2>
        </div>

        <div className="case-tabs reveal">
         {CASE_TABS.map((t) => (
             <button
                 key={t.id}
                 className={"case-tab" + (caseTab === t.id ? " active" : "")}
                 onClick={() => setCaseTab(t.id)}
             >
              <t.icon size={16} />
              {t.label}
             </button>
         ))}
        </div>

        <div className="card case-panel reveal">
         <p className="case-lead">{activeCase.body.lead}</p>

         {activeCase.id === "architecture" ? (
             <div className="arch">
              {activeCase.body.arch!.map((n, i, a) => (
                  <div key={n} style={{ display: "contents" }}>
                   <div className="arch-step" style={{ transitionDelay: `${i * 60}ms` }}>{n}</div>
                   {i < a.length - 1 && <span />}
                  </div>
              ))}
             </div>
         ) : (
             <ul className="checks case-list">
              {activeCase.body.list!.map((f) => (
                  <li key={f}><Check size={16} />{f}</li>
              ))}
             </ul>
         )}
        </div>
       </section>
      </div>

      {/* EDUCATION */}
      <section id="education" className="section wrap">
       <div className="head reveal">
        <p className="eyebrow">MY JOURNEY</p>
        <h2 className="title">Education</h2>
       </div>
       <div className="edu">
        <div className="card reveal">
         <h3 className="sec"><span className="ico"><GraduationCap size={22} /></span>Education</h3>
         <div className="tl">
          <div className="tl-item">
           <small>2024 – PRESENT</small>
           <h4>University of Moratuwa</h4>
           <p>Pursuing a B.Sc. (Hons) in Information Technology &amp; Management</p>
           <p>GPA: 3.52 / 4.00</p>
          </div>
          <div className="tl-item">
           <small>2023 – 2025</small>
           <h4>SLIIT</h4>
           <p>Completed a Higher Diploma in Information Technology</p>
           <p>GPA: 3.32 / 4.00</p>
          </div>
          <div className="tl-item">
           <small>SCHOOL</small>
           <h4>St. Joseph&apos;s Girls&apos; School, Nugegoda</h4>
           <p>Completed secondary education</p>
          </div>
         </div>

         <div className="divider" />

         <h3 className="sec"><span className="ico"><Briefcase size={22} /></span>Work Experience</h3>
         <div className="tl">
          <div className="tl-item">
           <small>03/2023 – 09/2023</small>
           <h4>EMACE Foundation</h4>
           <p>Account Assistant</p>
          </div>
         </div>
        </div>

        <div className="card reveal">
         <h3 className="sec"><span className="ico"><Award size={22} /></span>Extra-Curricular Activities</h3>
         <ul className="list-dots">
          <li>Served as Senior Prefect at St. Joseph&apos;s Girls&apos; School, Nugegoda</li>
          <li>Member of the school English literary association</li>
          <li>Member of the college swimming squad</li>
         </ul>

         <div className="divider" />

         <h3 className="sec"><span className="ico"><Award size={22} /></span>Certifications</h3>
         <ul className="list-dots">
          <li>Python for Beginners – E-Certificate (University of Moratuwa)</li>
          <li>Web Design for Beginners – E-Certificate (University of Moratuwa)</li>
          <li>Dual certificate in English and IT (SAEGIS Campus (PVT) LTD, Nugegoda)</li>
         </ul>
        </div>
       </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section wrap">
       <div className="contact">
        <div className="reveal">
         <p className="eyebrow">CONTACT</p>
         <h2 className="title">
          Let&apos;s Build <span className="grad">Something Together.</span>
         </h2>
         <p className="lead">
          Seeking opportunities to grow as a Full-Stack Developer and contribute to real-world
          software projects.
         </p>
         <div className="contact-list">
          <a href={"mailto:" + EMAIL}><span className="ico"><Mail size={20} /></span>{EMAIL}</a>
          <p><span className="ico"><MapPin size={20} /></span>Colombo, Sri Lanka</p>
          <a href={LINKEDIN} target="_blank" rel="noreferrer"><span className="ico"><LinkedinIcon /></span>LinkedIn</a>
          <a href={GITHUB} target="_blank" rel="noreferrer"><span className="ico"><GithubIcon /></span>GitHub</a>
         </div>
        </div>

        <form className="card form reveal" onSubmit={send}>
         <label>
          Your name
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
         </label>
         <label>
          Your email
          <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
         </label>
         <label>
          Your message
          <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell me about your project or opportunity" />
         </label>
         <button className="btn btn-primary" type="submit">
          Send Message <ArrowRight size={16} />
         </button>
        </form>
       </div>
      </section>

      {/* FOOTER */}
      <footer>
       <div className="wrap foot">
        <span>© 2026 Senaya Amanethmi Mendis. All rights reserved.</span>
        <div className="social">
         <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon /></a>
         <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
         <a href={"mailto:" + EMAIL} aria-label="Email"><Mail size={20} /></a>
        </div>
       </div>
      </footer>
     </main>
 );
}