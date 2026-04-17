
import { useState, useEffect } from "react";

// ───────────── STYLES ─────────────
const G = {
  brand: "#5B4FE8",
  brandLight: "#EAE8FD",
  brandDark: "#3B31C2",
  accent: "#00C48C",
  accentLight: "#E0FAF2",
  danger: "#E24B4A",
  dangerLight: "#FCEBEB",
  warning: "#BA7517",
  warningLight: "#FAEEDA",
  textPrimary: "#0F0E1A",
  textSecondary: "#5A576B",
  textMuted: "#9896A8",
  bg: "#F7F6FB",
  surface: "#FFFFFF",
  border: "#E8E6F0",
  borderStrong: "#C9C6DC",
};

const s = {
  btn: {
    display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px",
    borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", border: "none",
    transition: "all 0.15s", fontFamily: "inherit",
  },
  input: {
    width: "100%", padding: "9px 12px", border: `1px solid ${G.borderStrong}`,
    borderRadius: 8, fontSize: 13, fontFamily: "inherit", color: G.textPrimary,
    background: G.surface, outline: "none",
  },
  card: {
    background: G.surface, border: `1px solid ${G.border}`, borderRadius: 12, padding: 20,
  },
  badge: (color) => ({
    display: "inline-flex", alignItems: "center", padding: "2px 9px", borderRadius: 20,
    fontSize: 11, fontWeight: 500,
    background: color === "green" ? G.accentLight : color === "red" ? G.dangerLight : color === "amber" ? G.warningLight : color === "blue" ? "#E6F1FB" : color === "purple" ? G.brandLight : "#F1EFE8",
    color: color === "green" ? "#0F6E56" : color === "red" ? G.danger : color === "amber" ? G.warning : color === "blue" ? "#185FA5" : color === "purple" ? G.brand : "#5F5E5A",
  }),
};

// ───────────── SHARED COMPONENTS ─────────────
function Logo({ size = 20, dark = false }) {
  return (
    <span style={{ fontFamily: "'Syne', sans-serif", fontSize: size, fontWeight: 800, color: dark ? G.textPrimary : G.brand }}>
      Interview<span style={{ color: dark ? G.brand : G.textPrimary }}>God</span>.ai
    </span>
  );
}

function Btn({ children, variant = "primary", sm, onClick, style: sx = {} }) {
  const base = { ...s.btn, ...(sm ? { padding: "5px 12px", fontSize: 12 } : {}), ...sx };
  const variants = {
    primary: { background: G.brand, color: "#fff" },
    secondary: { background: G.surface, color: G.textPrimary, border: `1px solid ${G.borderStrong}` },
    accent: { background: G.accent, color: "#fff" },
    danger: { background: G.dangerLight, color: G.danger },
    ghost: { background: "transparent", color: G.brand, border: `1px solid ${G.brand}` },
  };
  return <button style={{ ...base, ...variants[variant] }} onClick={onClick}>{children}</button>;
}

function Badge({ color, children }) {
  return <span style={s.badge(color)}>{children}</span>;
}

function Avatar({ initials, color = G.brand, size = 32 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: size * 0.35, fontWeight: 600, flexShrink: 0 }}>
      {initials}
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <div onClick={() => onChange(!checked)} style={{ width: 36, height: 20, borderRadius: 20, background: checked ? G.brand : G.borderStrong, cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
      <div style={{ position: "absolute", top: 3, left: checked ? 19 : 3, width: 14, height: 14, borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
    </div>
  );
}

function ProgressBar({ pct, color = G.brand, height = 6 }) {
  return (
    <div style={{ background: G.border, borderRadius: 20, height, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", borderRadius: 20, background: color, transition: "width 0.4s" }} />
    </div>
  );
}

function Modal({ id, title, children, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,14,26,0.55)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: G.surface, borderRadius: 14, width: "100%", maxWidth: 540, maxHeight: "88vh", overflowY: "auto" }}>
        <div style={{ padding: "20px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 700 }}>{title}</span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: G.textMuted, fontSize: 22, lineHeight: 1, padding: 4 }}>×</button>
        </div>
        <div style={{ padding: "16px 24px 24px" }}>{children}</div>
      </div>
    </div>
  );
}

function FormGroup({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: G.textSecondary, marginBottom: 5 }}>{label}</label>}
      {children}
    </div>
  );
}

function StatCard({ label, value, sub, color }) {
  return (
    <div style={{ ...s.card, padding: 18 }}>
      <div style={{ fontSize: 12, color: G.textMuted, marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 700, color: color || G.textPrimary }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: G.textMuted, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

// ───────────── LANDING PAGE ─────────────
function Landing({ goSignup, goLogin, goDemo }) {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0F0E1A 0%,#1A1730 100%)", display: "flex", flexDirection: "column", fontFamily: "'DM Sans', sans-serif" }}>
      <nav style={{ padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Logo size={22} />
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={goLogin} style={{ background: "rgba(255,255,255,0.1)", color: "#fff", padding: "10px 22px", borderRadius: 10, fontSize: 13, fontWeight: 500, border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer" }}>Log in</button>
          <button onClick={goSignup} style={{ background: G.brand, color: "#fff", padding: "10px 22px", borderRadius: 10, fontSize: 13, fontWeight: 500, border: "none", cursor: "pointer" }}>Get Started Free</button>
        </div>
      </nav>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 40px", textAlign: "center" }}>
        <div style={{ background: "rgba(91,79,232,0.2)", color: "#A89CFF", fontSize: 12, fontWeight: 500, padding: "5px 16px", borderRadius: 20, border: "1px solid rgba(91,79,232,0.4)", display: "inline-block", marginBottom: 20 }}>
          🚀 AI-Powered Recruitment Platform
        </div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: 16, maxWidth: 700 }}>
          Hire Smarter with <span style={{ color: "#A89CFF" }}>AI-Driven</span> Interview Automation
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", maxWidth: 500, marginBottom: 36, lineHeight: 1.7 }}>
          Create job-specific assessments, AI interviews, and phone screenings in minutes. Let AI evaluate candidates so you can focus on what matters.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={goSignup} style={{ background: G.brand, color: "#fff", padding: "12px 28px", borderRadius: 10, fontSize: 14, fontWeight: 500, border: "none", cursor: "pointer" }}>Start Hiring Free →</button>
          <button onClick={goDemo} style={{ background: "rgba(255,255,255,0.1)", color: "#fff", padding: "12px 28px", borderRadius: 10, fontSize: 14, fontWeight: 500, border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer" }}>Book a Demo</button>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginTop: 40 }}>
          {["AI Interviews", "Online Assessments", "Telephonic Screening", "Auto Proctoring", "KYC Verification", "Psychometric Analysis", "Detailed Reports"].map(f => (
            <span key={f} style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.7)", fontSize: 12, padding: "6px 14px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.12)" }}>{f}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ───────────── AUTH ─────────────
function Auth({ mode, onLogin, goOther, goDemo }) {
  return (
    <div style={{ minHeight: "100vh", background: G.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ ...s.card, borderRadius: 16, padding: 36, width: "100%", maxWidth: 420 }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: G.brand, marginBottom: 24, textAlign: "center" }}>
          InterviewGod.ai
        </div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 6 }}>{mode === "signup" ? "Create your account" : "Welcome back"}</h2>
        <p style={{ fontSize: 13, color: G.textMuted, marginBottom: 24 }}>{mode === "signup" ? "Start hiring with AI in minutes" : "Sign in to your workspace"}</p>
        {mode === "signup" && (
          <>
            <FormGroup label="Full Name"><input style={s.input} placeholder="Priya Sharma" /></FormGroup>
            <FormGroup label="Company Name"><input style={s.input} placeholder="Acme Corp" /></FormGroup>
          </>
        )}
        <FormGroup label="Work Email"><input style={s.input} placeholder="priya@company.com" /></FormGroup>
        <FormGroup label="Password"><input type="password" style={s.input} placeholder="••••••••" /></FormGroup>
        <Btn onClick={onLogin} style={{ width: "100%", justifyContent: "center", padding: "11px" }}>
          {mode === "signup" ? "Create Account & Continue →" : "Sign In →"}
        </Btn>
        <div style={{ textAlign: "center", fontSize: 13, color: G.textMuted, marginTop: 14 }}>
          {mode === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
          <span style={{ color: G.brand, cursor: "pointer" }} onClick={goOther}>{mode === "signup" ? "Log in" : "Sign up free"}</span>
        </div>
        <div style={{ borderTop: `1px solid ${G.border}`, margin: "16px 0" }} />
        <div style={{ textAlign: "center" }}>
          <span style={{ color: G.brand, fontSize: 13, cursor: "pointer" }} onClick={goDemo}>Book a demo instead →</span>
        </div>
      </div>
    </div>
  );
}

// ───────────── MAIN APP SHELL ─────────────
function AppShell({ onLogout, goDemo }) {
  const [page, setPage] = useState("dashboard");
  const [modal, setModal] = useState(null);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "⊞" },
    { id: "groups", label: "Hiring Groups", icon: "📋" },
    { id: "candidates", label: "Candidates", icon: "👤" },
    { id: "reports", label: "Reports", icon: "📊" },
    { id: "store", label: "Store", icon: "🛒" },
  ];

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", fontFamily: "'DM Sans', sans-serif" }}>
      {/* HEADER */}
      <div style={{ height: 58, background: G.surface, borderBottom: `1px solid ${G.border}`, display: "flex", alignItems: "center", padding: "0 20px", gap: 12, flexShrink: 0, zIndex: 100 }}>
        <Logo size={18} />
        <span style={{ background: G.brandLight, color: G.brand, fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 20 }}>Acme Corp</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 12, color: G.textMuted }}>150 mins left</span>
          <Btn sm onClick={() => setPage("store")}>Buy Minutes</Btn>
          <Avatar initials="PS" />
        </div>
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* SIDEBAR */}
        <aside style={{ width: 220, background: G.surface, borderRight: `1px solid ${G.border}`, display: "flex", flexDirection: "column", padding: "12px 10px", gap: 2, flexShrink: 0, overflowY: "auto" }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: G.textMuted, textTransform: "uppercase", letterSpacing: "0.8px", padding: "10px 10px 4px" }}>Main</div>
          {navItems.map(n => (
            <div key={n.id} onClick={() => setPage(n.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, cursor: "pointer", background: page === n.id ? G.brandLight : "transparent", color: page === n.id ? G.brand : G.textSecondary, fontWeight: page === n.id ? 500 : 400, fontSize: 13 }}>
              <span>{n.icon}</span>{n.label}
            </div>
          ))}
          <div style={{ marginTop: 8, fontSize: 10, fontWeight: 600, color: G.textMuted, textTransform: "uppercase", letterSpacing: "0.8px", padding: "10px 10px 4px" }}>Other</div>
          <div onClick={goDemo} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, cursor: "pointer", color: G.textSecondary, fontSize: 13 }}>
            📅 Book a Demo
          </div>
          <div onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, cursor: "pointer", color: G.textSecondary, fontSize: 13 }}>
            🚪 Sign Out
          </div>
        </aside>
        {/* PAGE CONTENT */}
        <main style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          {page === "dashboard" && <Dashboard setPage={setPage} />}
          {page === "groups" && <HiringGroups setPage={setPage} setModal={setModal} />}
          {page === "candidates" && <Candidates setModal={setModal} />}
          {page === "reports" && <Reports setModal={setModal} />}
          {page === "store" && <Store />}
        </main>
      </div>
      {/* MODALS */}
      {modal === "create-group" && <CreateGroupModal onClose={() => setModal(null)} onNext={() => setModal("add-round")} />}
      {modal === "add-round" && <AddRoundModal onClose={() => setModal(null)} />}
      {modal === "add-candidate" && <AddCandidateModal onClose={() => setModal(null)} />}
      {modal === "move-next" && <MoveNextModal onClose={() => setModal(null)} />}
    </div>
  );
}

// ───────────── DASHBOARD ─────────────
function Dashboard({ setPage }) {
  return (
    <div>
      <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Dashboard</h1>
      <p style={{ fontSize: 13, color: G.textMuted, marginBottom: 22 }}>Good morning, Priya 👋 — Here's your hiring overview</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 22 }}>
        <StatCard label="Total Candidates" value="142" sub="+12 this week" />
        <StatCard label="Hiring Groups" value="8" sub="3 active" />
        <StatCard label="Tests Attempted" value="89" sub="63% completion rate" />
        <StatCard label="Minutes Remaining" value="150" sub="Buy more →" color={G.brand} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={s.card}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Recent Hiring Groups</div>
          {[
            { title: "Senior React Developer", count: 12, status: "Active", statusColor: "green" },
            { title: "Product Manager", count: 8, status: "Ongoing", statusColor: "blue" },
            { title: "Data Analyst", count: 21, status: "Reviewing", statusColor: "amber" },
          ].map((g, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 2 ? `1px solid ${G.border}` : "none" }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: 13 }}>{g.title}</div>
                <div style={{ fontSize: 12, color: G.textMuted }}>{g.count} candidates</div>
              </div>
              <Badge color={g.statusColor}>{g.status}</Badge>
            </div>
          ))}
          <Btn variant="secondary" sm onClick={() => setPage("groups")} style={{ marginTop: 12 }}>View All Groups →</Btn>
        </div>
        <div style={s.card}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Recent Notifications</div>
          {[
            { dot: G.danger, msg: "Rahul Verma completed React Developer interview", time: "2 min ago · Score: 78/100" },
            { dot: G.danger, msg: "Sneha Kapoor flagged for cheating", time: "14 min ago · Terminated" },
            { dot: G.accent, msg: "Arjun Singh completed PM Assessment", time: "1 hr ago · Score: 91/100" },
          ].map((n, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: n.dot, marginTop: 5, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 13 }}>{n.msg}</div>
                <div style={{ fontSize: 11, color: G.textMuted }}>{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ───────────── HIRING GROUPS ─────────────
function HiringGroups({ setPage, setModal }) {
  const groups = [
    { title: "Senior React Developer", dept: "Frontend Engineers", total: 12, sent: 10, attempted: 8, status: "Active", statusColor: "green", notif: 3 },
    { title: "Product Manager", dept: "Product Team", total: 8, sent: 6, attempted: 5, status: "Ongoing", statusColor: "blue", notif: 0 },
    { title: "Data Analyst", dept: "Analytics Team", total: 21, sent: 18, attempted: 12, status: "Reviewing", statusColor: "amber", notif: 1 },
    { title: "DevOps Engineer", dept: "Infrastructure", total: 5, sent: 5, attempted: 5, status: "Completed", statusColor: "purple", notif: 0 },
  ];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 }}>
        <div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Hiring Groups</h1>
          <p style={{ fontSize: 13, color: G.textMuted }}>Manage job-specific hiring workflows</p>
        </div>
        <Btn onClick={() => setModal("create-group")}>+ New Hiring Group</Btn>
      </div>
      <div style={{ overflowX: "auto", borderRadius: 10, border: `1px solid ${G.border}` }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Job Title", "Total Candidates", "Total Sent", "Tests Attempted", "Status", "Notifications", "Actions"].map(h => (
                <th key={h} style={{ textAlign: "left", fontSize: 11, fontWeight: 600, color: G.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", padding: "10px 14px", background: G.bg, borderBottom: `1px solid ${G.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map((g, i) => (
              <tr key={i}>
                <td style={{ padding: "12px 14px", borderBottom: i < groups.length - 1 ? `1px solid ${G.border}` : "none" }}>
                  <div style={{ fontWeight: 500, fontSize: 13 }}>{g.title}</div>
                  <div style={{ fontSize: 11, color: G.textMuted }}>{g.dept}</div>
                </td>
                <td style={{ padding: "12px 14px", fontSize: 13, borderBottom: i < groups.length - 1 ? `1px solid ${G.border}` : "none" }}>{g.total}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, borderBottom: i < groups.length - 1 ? `1px solid ${G.border}` : "none" }}>{g.sent}</td>
                <td style={{ padding: "12px 14px", borderBottom: i < groups.length - 1 ? `1px solid ${G.border}` : "none" }}>
                  <div style={{ fontSize: 13 }}>{g.attempted} / {g.sent}</div>
                  <div style={{ marginTop: 5, width: 100 }}><ProgressBar pct={Math.round((g.attempted / g.sent) * 100)} /></div>
                </td>
                <td style={{ padding: "12px 14px", borderBottom: i < groups.length - 1 ? `1px solid ${G.border}` : "none" }}><Badge color={g.statusColor}>{g.status}</Badge></td>
                <td style={{ padding: "12px 14px", fontSize: 12, borderBottom: i < groups.length - 1 ? `1px solid ${G.border}` : "none" }}>
                  {g.notif > 0 ? <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: G.danger, display: "inline-block" }} />{g.notif} new</span> : <span style={{ color: G.textMuted }}>No new</span>}
                </td>
                <td style={{ padding: "12px 14px", borderBottom: i < groups.length - 1 ? `1px solid ${G.border}` : "none" }}>
                  <Btn variant="secondary" sm onClick={() => setPage("candidates")}>View</Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ───────────── CANDIDATES ─────────────
function Candidates({ setModal }) {
  const [activeRound, setActiveRound] = useState(0);
  const [filter, setFilter] = useState("All");
  const rounds = ["Round 1: AI Interview", "Round 2: Assessment", "Round 3: Phone Screen"];
  const candidates = [
    { name: "Rahul Verma", email: "rahul@email.com", initials: "RV", color: G.brand, added: "Apr 08, 2026", status: "Completed", statusColor: "green", score: 78, deadline: "Apr 12, 2026" },
    { name: "Sneha Kapoor", email: "sneha@email.com", initials: "SK", color: G.danger, added: "Apr 07, 2026", status: "Terminated", statusColor: "red", score: 31, deadline: "Apr 12, 2026" },
    { name: "Arjun Singh", email: "arjun@email.com", initials: "AS", color: G.accent, added: "Apr 06, 2026", status: "Sent", statusColor: "blue", score: null, deadline: "Apr 12, 2026" },
    { name: "Pooja Mehta", email: "pooja@email.com", initials: "PM", color: G.warning, added: "Apr 05, 2026", status: "Not Sent", statusColor: "gray", score: null, deadline: "Apr 12, 2026" },
    { name: "Kiran Nair", email: "kiran@email.com", initials: "KN", color: "#534AB7", added: "Apr 04, 2026", status: "Completed", statusColor: "green", score: 91, deadline: "Apr 12, 2026" },
  ];
  const filtered = filter === "All" ? candidates : candidates.filter(c => c.status === filter);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
        <div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Candidates</h1>
          <p style={{ fontSize: 13, color: G.textMuted }}>Senior React Developer — All Rounds</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="secondary" onClick={() => setModal("add-candidate")}>+ Add Candidate</Btn>
          <Btn onClick={() => setModal("add-round")}>+ Add Round</Btn>
        </div>
      </div>
      {/* Rounds tabs */}
      <div style={{ display: "flex", borderBottom: `1px solid ${G.border}`, marginBottom: 20 }}>
        {rounds.map((r, i) => (
          <div key={i} onClick={() => setActiveRound(i)} style={{ padding: "10px 18px", fontSize: 13, fontWeight: activeRound === i ? 500 : 400, color: activeRound === i ? G.brand : G.textMuted, cursor: "pointer", borderBottom: activeRound === i ? `2px solid ${G.brand}` : "2px solid transparent", marginBottom: -1 }}>
            {r}
          </div>
        ))}
      </div>
      {activeRound === 0 ? (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, gap: 10, flexWrap: "wrap" }}>
            <input style={{ ...s.input, maxWidth: 260 }} placeholder="Search candidates..." />
            <div style={{ display: "flex", gap: 8 }}>
              <select style={{ padding: "7px 10px", border: `1px solid ${G.borderStrong}`, borderRadius: 8, fontSize: 12, fontFamily: "inherit", background: G.surface }} onChange={e => setFilter(e.target.value)}>
                <option>All</option><option>Completed</option><option>Sent</option><option>Not Sent</option><option>Terminated</option>
              </select>
            </div>
          </div>
          <div style={{ overflowX: "auto", borderRadius: 10, border: `1px solid ${G.border}` }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["", "Candidate", "Date Added", "Status", "Score", "Deadline", "Actions"].map(h => (
                    <th key={h} style={{ textAlign: "left", fontSize: 11, fontWeight: 600, color: G.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", padding: "10px 14px", background: G.bg, borderBottom: `1px solid ${G.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr key={i}>
                    <td style={{ padding: "11px 14px", borderBottom: i < filtered.length - 1 ? `1px solid ${G.border}` : "none" }}><input type="checkbox" /></td>
                    <td style={{ padding: "11px 14px", borderBottom: i < filtered.length - 1 ? `1px solid ${G.border}` : "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Avatar initials={c.initials} color={c.color} size={28} />
                        <div>
                          <div style={{ fontWeight: 500, fontSize: 13 }}>{c.name}</div>
                          <div style={{ fontSize: 11, color: G.textMuted }}>{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "11px 14px", fontSize: 12, color: G.textMuted, borderBottom: i < filtered.length - 1 ? `1px solid ${G.border}` : "none" }}>{c.added}</td>
                    <td style={{ padding: "11px 14px", borderBottom: i < filtered.length - 1 ? `1px solid ${G.border}` : "none" }}><Badge color={c.statusColor}>{c.status}</Badge></td>
                    <td style={{ padding: "11px 14px", borderBottom: i < filtered.length - 1 ? `1px solid ${G.border}` : "none" }}>
                      {c.score !== null ? <span><strong style={{ color: c.score >= 70 ? G.accent : c.score >= 50 ? G.warning : G.danger }}>{c.score}</strong><span style={{ color: G.textMuted }}>/100</span></span> : <span style={{ color: G.textMuted }}>—</span>}
                    </td>
                    <td style={{ padding: "11px 14px", fontSize: 12, color: G.textMuted, borderBottom: i < filtered.length - 1 ? `1px solid ${G.border}` : "none" }}>{c.deadline}</td>
                    <td style={{ padding: "11px 14px", borderBottom: i < filtered.length - 1 ? `1px solid ${G.border}` : "none" }}>
                      {c.status === "Completed" || c.status === "Terminated"
                        ? <Btn variant="secondary" sm>Report</Btn>
                        : c.status === "Sent"
                          ? <Btn variant="secondary" sm>Resend</Btn>
                          : <Btn sm>Send Link</Btn>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "50px 20px", color: G.textMuted }}>
          <div style={{ fontSize: 36, marginBottom: 12, opacity: 0.5 }}>{activeRound === 1 ? "📋" : "📞"}</div>
          <p style={{ fontSize: 13 }}>No candidates in this round yet.<br />Move qualified candidates from the previous round.</p>
        </div>
      )}
    </div>
  );
}

// ───────────── REPORTS ─────────────
function Reports({ setModal }) {
  const skills = [
    { name: "React.js", pct: 90, color: G.accent },
    { name: "JavaScript ES6+", pct: 78, color: G.brand },
    { name: "Redux / State Mgmt", pct: 65, color: G.brand },
    { name: "REST APIs", pct: 55, color: G.warning },
    { name: "TypeScript", pct: 42, color: G.danger },
  ];
  const psycho = [
    { label: "Confidence", val: "High", good: true },
    { label: "Speak Rate", val: "Normal", good: true },
    { label: "Enthusiasm", val: "High", good: true },
    { label: "Voice Quality", val: "Good", good: true },
    { label: "Emotional Stability", val: "Stable", good: true },
    { label: "Stress Level", val: "Low", good: true },
    { label: "Adaptability", val: "Strong", good: true },
    { label: "Cheating Alerts", val: "None", good: true },
  ];

  return (
    <div>
      <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Candidate Report</h1>
      <p style={{ fontSize: 13, color: G.textMuted, marginBottom: 22 }}>Rahul Verma — Senior React Developer · AI Interview Round</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div style={{ ...s.card, textAlign: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", border: `4px solid ${G.brand}`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", margin: "0 auto 14px" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: G.brand, lineHeight: 1 }}>78</div>
            <div style={{ fontSize: 10, color: G.textMuted }}>/ 100</div>
          </div>
          <div style={{ fontWeight: 500, marginBottom: 6 }}>Overall Score</div>
          <Badge color="green">Strong Performer</Badge>
          <div style={{ borderTop: `1px solid ${G.border}`, margin: "14px 0" }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, textAlign: "left" }}>
            <div style={{ background: G.bg, borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: G.textMuted }}>Correct</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: G.accent }}>14</div>
            </div>
            <div style={{ background: G.bg, borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: G.textMuted }}>Incorrect</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: G.danger }}>4</div>
            </div>
          </div>
        </div>
        <div style={s.card}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Skill-wise Evaluation</div>
          {skills.map((sk, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                <span>{sk.name}</span>
                <span style={{ color: sk.color, fontWeight: 500 }}>{sk.pct}%</span>
              </div>
              <ProgressBar pct={sk.pct} color={sk.color} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={s.card}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Psychometric Analysis</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {psycho.map((p, i) => (
              <div key={i} style={{ background: G.bg, borderRadius: 8, padding: "8px 12px" }}>
                <div style={{ fontSize: 11, color: G.textMuted }}>{p.label}</div>
                <div style={{ fontWeight: 500, fontSize: 13, color: p.good ? G.accent : G.danger }}>{p.val}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={s.card}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 600, marginBottom: 12 }}>AI Summary</div>
          <p style={{ fontSize: 13, color: G.textSecondary, lineHeight: 1.8, marginBottom: 16 }}>
            Rahul demonstrated strong proficiency in React.js with confident, well-articulated answers. His understanding of component lifecycle, hooks, and state management is above average. Improvement needed in TypeScript and complex async patterns. <strong>Recommended for next round.</strong>
          </p>
          <div style={{ background: G.bg, borderRadius: 8, padding: "10px 12px", fontSize: 12, color: G.textSecondary, marginBottom: 16 }}>
            <strong>Transcript excerpt:</strong> "I would use React.memo, useMemo, and useCallback to prevent unnecessary re-renders, combined with lazy loading for code splitting..."
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Btn variant="accent" sm onClick={() => setModal("move-next")}>Move to Next Round</Btn>
            <Btn variant="danger" sm>Reject</Btn>
            <Btn variant="secondary" sm>Download PDF</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────────── STORE ─────────────
function Store() {
  const [mins, setMins] = useState(100);
  return (
    <div>
      <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Store — Buy Minutes</h1>
      <p style={{ fontSize: 13, color: G.textMuted, marginBottom: 22 }}>Minutes are consumed when you create tests and invite candidates</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={s.card}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Current Balance</div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 40, fontWeight: 800, color: G.brand }}>150 <span style={{ fontSize: 18, color: G.textMuted }}>mins</span></div>
          <div style={{ borderTop: `1px solid ${G.border}`, margin: "16px 0" }} />
          <FormGroup label="Enter minutes to purchase">
            <input type="number" style={s.input} value={mins} min={10} step={10} onChange={e => setMins(Number(e.target.value))} />
          </FormGroup>
          <div style={{ background: G.bg, borderRadius: 8, padding: "10px 14px", display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 10 }}>
            <span style={{ color: G.textMuted }}>Price per minute</span><span style={{ fontWeight: 500 }}>₹2.00</span>
          </div>
          <div style={{ background: G.brandLight, borderRadius: 8, padding: "10px 14px", display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ fontWeight: 500, color: G.brand }}>Total Cost</span>
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: G.brand }}>₹{(mins * 2).toLocaleString("en-IN")}</span>
          </div>
          <Btn style={{ width: "100%", justifyContent: "center", padding: 11 }}>Proceed to Payment →</Btn>
        </div>
        <div style={s.card}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 600, marginBottom: 16 }}>How minutes work</div>
          {[
            "When you create a test, minutes are reserved based on the test duration × number of candidates invited.",
            "Minutes are consumed as candidates take their tests. Unused minutes (if a candidate finishes early) are returned to your account.",
            "When your balance reaches 0, you must purchase more minutes to continue sending test invitations.",
          ].map((txt, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: G.brandLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, fontWeight: 600, color: G.brand }}>{i + 1}</div>
              <p style={{ fontSize: 13, color: G.textSecondary, lineHeight: 1.7 }}>{txt}</p>
            </div>
          ))}
          <div style={{ background: G.accentLight, borderRadius: 8, padding: "12px 14px", fontSize: 13, color: "#0F6E56" }}>
            💡 You start with <strong>150 minutes free</strong> when you sign up.
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────────── MODALS ─────────────
function CreateGroupModal({ onClose, onNext }) {
  const [skills, setSkills] = useState(["React.js", "Node.js", "TypeScript", "REST APIs"]);
  const [newSkill, setNewSkill] = useState("");
  const [groupName, setGroupName] = useState("");
  const [jt, setJt] = useState("");

  return (
    <Modal title="Create Hiring Group" onClose={onClose}>
      <FormGroup label="Job Title">
        <input style={s.input} placeholder="e.g. Senior Backend Engineer" value={jt} onChange={e => { setJt(e.target.value); setGroupName(e.target.value ? e.target.value + " Engineers · Group" : ""); }} />
      </FormGroup>
      <FormGroup label="Job Description">
        <textarea style={{ ...s.input, minHeight: 100, resize: "vertical" }} placeholder="Paste your job description here... AI will auto-extract skills." />
      </FormGroup>
      <FormGroup label="Auto-Generated Group Name">
        <input style={s.input} value={groupName} onChange={e => setGroupName(e.target.value)} placeholder="Generated from job title..." />
      </FormGroup>
      <FormGroup label="AI-Extracted Skills">
        <div style={{ background: G.bg, border: `1px solid ${G.border}`, borderRadius: 8, padding: 10, minHeight: 48, marginBottom: 8 }}>
          {skills.map((sk, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: G.brandLight, color: G.brand, fontSize: 11, padding: "3px 9px", borderRadius: 20, margin: 3 }}>
              {sk}
              <button onClick={() => setSkills(skills.filter((_, j) => j !== i))} style={{ background: "none", border: "none", color: G.brand, cursor: "pointer", fontSize: 13, lineHeight: 1, padding: 0 }}>×</button>
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input style={{ ...s.input, flex: 1 }} placeholder="Add skill..." value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && newSkill.trim()) { setSkills([...skills, newSkill.trim()]); setNewSkill(""); } }} />
          <Btn variant="secondary" sm onClick={() => { if (newSkill.trim()) { setSkills([...skills, newSkill.trim()]); setNewSkill(""); } }}>Add</Btn>
        </div>
      </FormGroup>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
        <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
        <Btn onClick={() => { onClose(); onNext(); }}>Create & Add Round →</Btn>
      </div>
    </Modal>
  );
}

function AddRoundModal({ onClose }) {
  const [roundType, setRoundType] = useState(0);
  const [toggles, setToggles] = useState({ custom: false, coding: true, fullscreen: true, tab: true, monitors: false, kyc: true, lipsync: true, multipeople: false });

  const types = [{ icon: "🤖", label: "AI Interview" }, { icon: "📋", label: "AI Assessment" }, { icon: "📞", label: "Phone Screening" }];

  return (
    <Modal title="Add Interview Round" onClose={onClose}>
      <FormGroup label="Select Round Type">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 14 }}>
          {types.map((t, i) => (
            <div key={i} onClick={() => setRoundType(i)} style={{ border: `2px solid ${roundType === i ? G.brand : G.border}`, background: roundType === i ? G.brandLight : G.surface, borderRadius: 10, padding: 14, cursor: "pointer", textAlign: "center" }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{t.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 500 }}>{t.label}</div>
            </div>
          ))}
        </div>
      </FormGroup>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <FormGroup label="Difficulty">
          <select style={{ ...s.input }}><option>Basic</option><option>Intermediate</option><option>Advanced</option></select>
        </FormGroup>
        <FormGroup label="Total Questions">
          <input type="number" style={s.input} defaultValue={18} min={5} max={50} />
        </FormGroup>
      </div>
      {roundType === 2 && (
        <FormGroup label="Language">
          <select style={{ ...s.input }}><option>English</option><option>Hindi</option><option>Kannada</option><option>Marathi</option><option>Malayalam</option></select>
        </FormGroup>
      )}
      {[["custom", "Custom Questions", "Make custom Q&A compulsory"], ["coding", "Coding Questions", "Add coding challenges"]].map(([k, title, sub]) => (
        <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: G.bg, padding: "10px 14px", borderRadius: 8, marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{title}</div>
            <div style={{ fontSize: 11, color: G.textMuted }}>{sub}</div>
          </div>
          <Toggle checked={toggles[k]} onChange={v => setToggles({ ...toggles, [k]: v })} />
        </div>
      ))}
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 600, margin: "14px 0 10px" }}>Proctoring Settings</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[["fullscreen", "Full-screen mode"], ["tab", "Tab switch detection"], ["monitors", "Multiple monitors"], ["kyc", "KYC Verification"], ["lipsync", "Lip Sync"], ["multipeople", "Multiple people detect"]].map(([k, label]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: G.bg, padding: "8px 12px", borderRadius: 8 }}>
            <span style={{ fontSize: 12 }}>{label}</span>
            <Toggle checked={toggles[k]} onChange={v => setToggles({ ...toggles, [k]: v })} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
        <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
        <Btn onClick={onClose}>Save Round</Btn>
      </div>
    </Modal>
  );
}

function AddCandidateModal({ onClose }) {
  const [tab, setTab] = useState("manual");
  return (
    <Modal title="Add Candidate" onClose={onClose}>
      <div style={{ display: "flex", borderBottom: `1px solid ${G.border}`, marginBottom: 16 }}>
        {[["manual", "Manual Entry"], ["excel", "Import Excel"]].map(([id, label]) => (
          <div key={id} onClick={() => setTab(id)} style={{ padding: "8px 16px", fontSize: 13, fontWeight: tab === id ? 500 : 400, color: tab === id ? G.brand : G.textMuted, cursor: "pointer", borderBottom: tab === id ? `2px solid ${G.brand}` : "2px solid transparent", marginBottom: -1 }}>{label}</div>
        ))}
      </div>
      {tab === "manual" ? (
        <>
          <FormGroup label="Full Name *"><input style={s.input} placeholder="Rahul Verma" /></FormGroup>
          <FormGroup label="Email *"><input type="email" style={s.input} placeholder="rahul@email.com" /></FormGroup>
          <FormGroup label="Phone (required for phone screening)"><input type="tel" style={s.input} placeholder="+91 98765 43210" /></FormGroup>
          <FormGroup label="Deadline"><input type="date" style={s.input} /></FormGroup>
        </>
      ) : (
        <div>
          <div style={{ border: `2px dashed ${G.borderStrong}`, borderRadius: 10, padding: 30, textAlign: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>📊</div>
            <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Upload Excel File</div>
            <div style={{ fontSize: 12, color: G.textMuted, marginBottom: 12 }}>Format: Name | Email | Phone</div>
            <Btn variant="secondary" sm>Browse File</Btn>
          </div>
          <a href="#" style={{ fontSize: 12, color: G.brand, display: "block" }}>Download template →</a>
        </div>
      )}
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
        <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
        <Btn onClick={onClose}>Add & Send Invite</Btn>
      </div>
    </Modal>
  );
}

function MoveNextModal({ onClose }) {
  const [sel, setSel] = useState(0);
  const options = [
    { icon: "📋", label: "Round 2: AI Assessment", sub: "MCQ + Coding · Intermediate" },
    { icon: "📞", label: "Round 3: Phone Screening", sub: "Voice Q&A · English" },
  ];
  return (
    <Modal title="Move to Next Round" onClose={onClose}>
      <p style={{ fontSize: 13, color: G.textSecondary, marginBottom: 16 }}>Moving <strong>Rahul Verma</strong> to next round. Select which round:</p>
      {options.map((o, i) => (
        <div key={i} onClick={() => setSel(i)} style={{ border: `2px solid ${sel === i ? G.brand : G.border}`, background: sel === i ? G.brandLight : G.surface, borderRadius: 10, padding: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 20 }}>{o.icon}</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{o.label}</div>
            <div style={{ fontSize: 11, color: G.textMuted }}>{o.sub}</div>
          </div>
        </div>
      ))}
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 14 }}>
        <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
        <Btn variant="accent" onClick={onClose}>Confirm & Send Invite</Btn>
      </div>
    </Modal>
  );
}

// ───────────── DEMO BOOKING ─────────────
function DemoBooking({ goBack }) {
  const [selDate, setSelDate] = useState(10);
  const [selTime, setSelTime] = useState("10:00 AM");
  const [booked, setBooked] = useState(false);

  const days = [null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
  const pastDays = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const weekends = [5, 6, 7, 14, 15, 21];
  const times = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
  const bookedTimes = ["9:00 AM", "1:00 PM"];

  if (booked) {
    return (
      <div style={{ minHeight: "100vh", background: G.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ ...s.card, borderRadius: 16, padding: 40, maxWidth: 420, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Demo Confirmed!</h2>
          <p style={{ fontSize: 14, color: G.textMuted, marginBottom: 20 }}>Apr {selDate} at {selTime} IST</p>
          <div style={{ background: G.brandLight, borderRadius: 10, padding: 14, fontSize: 13, color: G.brand, marginBottom: 24 }}>
            A confirmation email has been sent. Our representative will contact you before the demo.
          </div>
          <Btn style={{ width: "100%", justifyContent: "center", padding: 11 }} onClick={goBack}>Back to Home</Btn>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: G.bg, padding: "40px 20px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <Btn variant="secondary" sm onClick={goBack} style={{ marginBottom: 20 }}>← Back</Btn>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Book a Demo</h1>
        <p style={{ fontSize: 13, color: G.textMuted, marginBottom: 22 }}>See InterviewGod.ai in action. All times in IST (9 AM – 5 PM working hours).</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div style={s.card}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 14 }}>1. Select a date — April 2026</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, marginBottom: 16 }}>
              {["S","M","T","W","T","F","S"].map((d, i) => <div key={i} style={{ textAlign: "center", fontSize: 11, color: G.textMuted, padding: 4 }}>{d}</div>)}
              {days.map((d, i) => (
                <div key={i} onClick={() => d && !pastDays.includes(d) && !weekends.includes(d) && setSelDate(d)}
                  style={{ textAlign: "center", padding: "8px 4px", borderRadius: 6, fontSize: 12, cursor: d && !pastDays.includes(d) && !weekends.includes(d) ? "pointer" : "default",
                    background: selDate === d ? G.brand : "transparent",
                    color: !d ? "transparent" : selDate === d ? "#fff" : pastDays.includes(d) || weekends.includes(d) ? G.textMuted : G.textPrimary,
                    textDecoration: pastDays.includes(d) ? "line-through" : "none" }}>
                  {d || ""}
                </div>
              ))}
            </div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 10 }}>2. Select a time slot</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
              {times.map(t => (
                <div key={t} onClick={() => !bookedTimes.includes(t) && setSelTime(t)}
                  style={{ padding: "8px 10px", borderRadius: 8, textAlign: "center", fontSize: 12, cursor: bookedTimes.includes(t) ? "not-allowed" : "pointer",
                    border: `1px solid ${selTime === t && !bookedTimes.includes(t) ? G.brand : G.borderStrong}`,
                    background: selTime === t && !bookedTimes.includes(t) ? G.brandLight : bookedTimes.includes(t) ? G.bg : G.surface,
                    color: bookedTimes.includes(t) ? G.textMuted : selTime === t ? G.brand : G.textPrimary,
                    textDecoration: bookedTimes.includes(t) ? "line-through" : "none",
                    fontWeight: selTime === t && !bookedTimes.includes(t) ? 500 : 400 }}>
                  {t}
                </div>
              ))}
            </div>
          </div>
          <div style={s.card}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 14 }}>3. Your details</div>
            <FormGroup label="Full Name"><input style={s.input} placeholder="Priya Sharma" /></FormGroup>
            <FormGroup label="Work Email"><input type="email" style={s.input} placeholder="priya@company.com" /></FormGroup>
            <FormGroup label="Company Name"><input style={s.input} placeholder="Acme Corp" /></FormGroup>
            <FormGroup label="Phone Number"><input type="tel" style={s.input} placeholder="+91 98765 43210" /></FormGroup>
            <FormGroup label="Team size">
              <select style={s.input}><option>1–10 employees</option><option>10–50 employees</option><option>50–200 employees</option><option>200+ employees</option></select>
            </FormGroup>
            <div style={{ background: G.brandLight, borderRadius: 8, padding: "10px 14px", fontSize: 12, color: G.brand, marginBottom: 14 }}>
              📅 Selected: <strong>Apr {selDate} at {selTime} IST</strong>
            </div>
            <Btn style={{ width: "100%", justifyContent: "center", padding: 11 }} onClick={() => setBooked(true)}>Confirm Demo Booking →</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────────── CANDIDATE PORTAL ─────────────
function CandidatePortal({ goBack }) {
  const [step, setStep] = useState(0);
  const steps = ["Welcome", "KYC", "Checks", "Interview"];

  const stepContent = [
    // Step 0: Welcome
    <div key={0}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 14 }}>Test Details</div>
      {[["Candidate", "Rahul Verma"], ["Email", "rahul@email.com"], ["Duration", "30 minutes"], ["Questions", "18 questions"], ["Type", "AI Video Interview"], ["Deadline", "Apr 12, 2026"]].map(([k, v]) => (
        <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${G.border}`, fontSize: 13 }}>
          <span style={{ color: G.textMuted }}>{k}</span>
          <span style={{ fontWeight: 500 }}>{k === "Type" ? <Badge color="blue">{v}</Badge> : v}</span>
        </div>
      ))}
      <div style={{ background: G.warningLight, borderRadius: 8, padding: "10px 12px", fontSize: 12, color: G.warning, margin: "14px 0" }}>
        ⚠️ Ensure you have a working camera &amp; microphone. Proctoring is enabled.
      </div>
      <Btn style={{ width: "100%", justifyContent: "center", padding: 11 }} onClick={() => setStep(1)}>Continue to KYC Verification →</Btn>
    </div>,
    // Step 1: KYC
    <div key={1}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 10 }}>KYC Verification</div>
      <p style={{ fontSize: 13, color: G.textMuted, marginBottom: 16 }}>Please upload your Aadhaar card for identity verification.</p>
      <div style={{ border: `2px dashed ${G.borderStrong}`, borderRadius: 10, padding: 30, textAlign: "center", marginBottom: 16, cursor: "pointer" }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>📄</div>
        <div style={{ fontSize: 13, fontWeight: 500 }}>Upload Aadhaar Card</div>
        <div style={{ fontSize: 12, color: G.textMuted }}>Drag &amp; drop or click to browse</div>
      </div>
      <Btn style={{ width: "100%", justifyContent: "center", padding: 11 }} onClick={() => setStep(2)}>Verify &amp; Continue →</Btn>
    </div>,
    // Step 2: Checks
    <div key={2}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 14 }}>Pre-Interview Checks</div>
      {[["🎤", "Microphone Check", "Working"], ["📷", "Camera Check", "Working"], ["💬", "Lip Sync Verify", "Verified"], ["🌐", "Internet Speed", "Good"]].map(([icon, label, status]) => (
        <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: G.bg, padding: "10px 14px", borderRadius: 8, marginBottom: 8 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}><span>{icon}</span>{label}</span>
          <Badge color="green">✓ {status}</Badge>
        </div>
      ))}
      <div style={{ margin: "14px 0" }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: G.textSecondary, marginBottom: 6 }}>Upload Resume *</label>
        <input type="file" style={s.input} accept=".pdf,.doc,.docx" />
      </div>
      <Btn style={{ width: "100%", justifyContent: "center", padding: 11 }} onClick={() => setStep(3)}>Start Interview →</Btn>
    </div>,
    // Step 3: Interview
    <div key={3}>
      <div style={{ background: G.bg, borderRadius: 10, aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, border: `1px solid ${G.border}` }}>
        <div style={{ textAlign: "center", color: G.textMuted }}><div style={{ fontSize: 36, marginBottom: 8 }}>🤖</div><div style={{ fontSize: 13 }}>AI Interviewer Active</div></div>
      </div>
      <div style={{ background: G.brandLight, borderRadius: 8, padding: "12px 14px", marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: G.brand, fontWeight: 500, marginBottom: 4 }}>Question 3 of 18</div>
        <div style={{ fontSize: 14, fontWeight: 500 }}>How would you optimize a React app with hundreds of components experiencing slow renders?</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: G.danger }} />
          <span style={{ fontSize: 12, color: G.danger }}>Recording</span>
        </div>
        <span style={{ fontSize: 13, fontWeight: 500, color: G.textMuted }}>22:41 remaining</span>
      </div>
    </div>,
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0F0E1A 0%,#1A1730 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ background: G.surface, borderRadius: 16, width: "100%", maxWidth: 480, overflow: "hidden" }}>
        <div style={{ background: G.brand, padding: 24, color: "#fff" }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 800, marginBottom: 4 }}>InterviewGod.ai</div>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Senior React Developer</div>
          <div style={{ opacity: 0.8, fontSize: 13 }}>AI Interview — Acme Corp</div>
          <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
            {steps.map((_, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i < step ? G.accent : i === step ? "#fff" : "rgba(255,255,255,0.3)" }} />
            ))}
          </div>
        </div>
        <div style={{ padding: 24 }}>
          {stepContent[step]}
          {step < 3 && <div style={{ textAlign: "center", marginTop: 12 }}><span style={{ fontSize: 12, color: G.textMuted, cursor: "pointer" }} onClick={goBack}>Exit test</span></div>}
        </div>
      </div>
    </div>
  );
}

// ───────────── ROOT ─────────────
export default function App() {
  const [view, setView] = useState("landing");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://fonts.googleapis.com";
    document.head.appendChild(link);
    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap";
    document.head.appendChild(link2);
  }, []);

  return (
    <div>
      {view === "landing" && <Landing goSignup={() => setView("signup")} goLogin={() => setView("login")} goDemo={() => setView("demo")} />}
      {view === "signup" && <Auth mode="signup" onLogin={() => setView("app")} goOther={() => setView("login")} goDemo={() => setView("demo")} />}
      {view === "login" && <Auth mode="login" onLogin={() => setView("app")} goOther={() => setView("signup")} goDemo={() => setView("demo")} />}
      {view === "app" && <AppShell onLogout={() => setView("landing")} goDemo={() => setView("demo")} />}
      {view === "demo" && <DemoBooking goBack={() => setView("landing")} />}
      {view === "candidate" && <CandidatePortal goBack={() => setView("landing")} />}
    </div>
  );
}
