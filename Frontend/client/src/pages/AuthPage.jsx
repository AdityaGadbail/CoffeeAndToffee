
import { useState } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

const AuthPage = () => {
  const [mode, setMode] = useState("register");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600&display=swap');

        .auth-tabs { display: flex; border-bottom: 1.5px solid #e2daf5; margin-bottom: 2rem; }
        .auth-tab { flex: 1; padding: 10px; background: none; border: none; font-family: 'Geist', sans-serif; font-size: 13px; font-weight: 500; color: #9d8cbe; cursor: pointer; position: relative; transition: color .2s; }
        .auth-tab.active { color: #1a0a2e; }
        .auth-tab.active::after { content: ''; position: absolute; bottom: -1.5px; left: 0; right: 0; height: 2px; background: #7C3AED; border-radius: 2px 2px 0 0; }

        @keyframes float-slow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .float-anim { animation: float-slow 6s ease-in-out infinite; }
      `}</style>

      <div
        className="min-h-screen grid grid-cols-1 lg:grid-cols-2"
        style={{ fontFamily: "'Geist', sans-serif", background: "#FAF7F2" }}
      >
        {/* ── LEFT ── */}
        <div
          className="hidden lg:flex flex-col justify-between px-14 py-16 relative overflow-hidden"
          style={{ background: "#1a0a2e" }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(124,58,237,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.08) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* Glows */}
          <div
            className="absolute bottom-[-100px] right-[-80px] w-[360px] h-[360px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle,rgba(124,58,237,0.3),transparent 70%)" }}
          />
          <div
            className="absolute top-[-60px] left-[-60px] w-[220px] h-[220px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle,rgba(245,158,11,0.12),transparent 70%)" }}
          />

          {/* Wordmark */}
          <div className="flex items-center gap-2.5 relative z-10">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#7C3AED,#a855f7)" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L10 6H14L11 9L12 13L8 11L4 13L5 9L2 6H6L8 2Z" fill="white" opacity="0.9"/>
              </svg>
            </div>
            <span className="text-white text-sm font-semibold">CreatorBase</span>
          </div>

          {/* Hero */}
          <div className="relative z-10">
            <div
              className="inline-block text-[11px] font-medium tracking-[1.5px] uppercase px-3 py-1.5 rounded-full mb-5"
              style={{
                background: "rgba(124,58,237,0.25)",
                border: "1px solid rgba(124,58,237,0.4)",
                color: "#c4b5fd",
              }}
            >
              For Independent Creators
            </div>
            <h1
              className="text-5xl xl:text-[3.2rem] text-white leading-[1.15] mb-4"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Your work.<br />
              <em className="text-[#a78bfa]">Your</em> revenue.
            </h1>
            <p className="text-white/45 text-[13px] leading-[1.7] font-light max-w-[280px]">
              A direct line between you and the people who love what you make.
              No algorithms, no middlemen.
            </p>
          </div>

          {/* Testimonial */}
          <div
            className="relative z-10 pl-5 py-4 pr-4 rounded-r-xl"
            style={{
              borderLeft: "2px solid rgba(124,58,237,0.5)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
          
          
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="flex items-center justify-center p-8 relative">
          {/* Subtle noise texture */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="w-full max-w-sm relative z-10">
            {/* Tabs */}
            <div className="auth-tabs">
              <button
                className={`auth-tab${mode === "register" ? " active" : ""}`}
                onClick={() => setMode("register")}
              >
                Create account
              </button>
              <button
                className={`auth-tab${mode === "login" ? " active" : ""}`}
                onClick={() => setMode("login")}
              >
                Sign in
              </button>
            </div>

            {mode === "login" ? (
              <Login onSwitch={() => setMode("register")} />
            ) : (
              <Register onSwitch={() => setMode("login")} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;