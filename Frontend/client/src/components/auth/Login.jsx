
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authService";
import useAuth from "../../hooks/useAuth";

const Login = ({ onSwitch }) => {

  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await loginUser({
        email,
        password,
      });

      login(res.user, res.token);

      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-7">
        <h2
          className="text-[2rem] text-[#1a0a2e] leading-[1.1] text-center"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          Sign in
        </h2>
      </div>

      <form onSubmit={handleLogin} className="grid gap-3.5">
        {/* Email */}
        <div>
          <label className="block text-[11px] font-semibold text-[#4b3f72] tracking-[0.3px] mb-1.5">
            Email address
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3.25 text-[#9d8cbe]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 8l10 6 10-6" />
              </svg>
            </span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.75 rounded-xl border-[1.5px] border-[#e2daf5] bg-white text-[13px] text-[#1a0a2e] placeholder:text-[#c4b5e8] outline-none transition-all focus:border-[#7C3AED] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)]"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-[11px] font-semibold text-[#4b3f72] tracking-[0.3px]">
              Password
            </label>
            <a
              href="#"
              className="text-[11px] text-[#7C3AED] font-medium no-underline hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative flex items-center">
            <span className="absolute left-3.25 text-[#9d8cbe]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </span>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-14 py-2.75 rounded-xl border-[1.5px] border-[#e2daf5] bg-white text-[13px] text-[#1a0a2e] placeholder:text-[#c4b5e8] outline-none transition-all focus:border-[#7C3AED] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)]"
            />
            <button
              type="button"
              disabled={loading}
              onClick={() => setShowPass((value) => !value)}
              className="absolute right-3 text-[11px] font-semibold text-[#9d8cbe] hover:text-[#7C3AED] bg-transparent border-none cursor-pointer transition-colors"
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-[12px] text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.25 rounded-xl bg-[#7C3AED] hover:bg-[#6d28d9] text-white text-[14px] font-semibold tracking-[0.2px] border-none cursor-pointer transition-colors active:scale-[0.99]"
          style={{ fontFamily: "'Geist', sans-serif" }}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2.5">
          <div className="flex-1 h-px bg-[#e2daf5]" />
          <span className="text-[11px] text-[#c4b5e8] font-medium">or</span>
          <div className="flex-1 h-px bg-[#e2daf5]" />
        </div>

        {/* Google */}
        <button className="w-full py-2.75 rounded-xl border-[1.5px] border-[#e2daf5] bg-white hover:border-[#c4b5e8] hover:bg-[#faf7ff] flex items-center justify-center gap-2 text-[13px] font-medium text-[#1a0a2e] transition-all cursor-pointer">
          <svg width="15" height="15" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>
      </form>

      <p className="text-center mt-5 text-[12px] text-[#9d8cbe]">
        Don't have an account?{" "}
        <button
          onClick={onSwitch}
          className="text-[#7C3AED] font-semibold bg-transparent border-none cursor-pointer text-[12px] p-0 hover:underline"
        >
          Create one →
        </button>
      </p>
    </>
  );
};

export default Login;
