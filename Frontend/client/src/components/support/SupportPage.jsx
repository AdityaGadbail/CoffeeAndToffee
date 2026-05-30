import { useState } from "react";
import { FiEdit3, FiShield } from "react-icons/fi";
import coffeeImg from "../../assets/Coffee.png";
import toffeeImg from "../../assets/Toffee.png";
import { createSupport } from "../../services/supportService";
import useAuth from "../../hooks/useAuth";
import Toast from "../ui/Toast";
import { useNavigate } from "react-router-dom";

const coffeeOptions = [19, 49, 99];
const toffeeOptions = [10, 30, 50];

const SupportPage = ({ creator }) => {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [selectedCoffee, setSelectedCoffee] = useState(49);
  const [selectedToffee, setSelectedToffee] = useState(50);
  const [coverGST, setCoverGST] = useState(false);
  const [message, setMessage] = useState("");

  const base = selectedCoffee + selectedToffee;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const total = coverGST ? Math.round(base * 1.024) : base;

  const isOwnProfile = user?._id && creator?._id && user._id === creator._id;

  const handleSupport = async () => {
    try {
      setError("");

      if (!token) {
        setError("Please sign in to support a creator.");
        navigate("/");
        return;
      }

      if (!creator?._id) {
        setError("Creator not loaded.");
        return;
      }

      if (isOwnProfile) {
        setError("You cannot support your own page.");
        return;
      }

      setLoading(true);

      await createSupport({
        creatorId: creator._id,
        coffeeAmount: selectedCoffee,
        toffeeAmount: selectedToffee,
        totalAmount: total,
        message,
        coverGST,
      });

      setMessage("");
      setSelectedCoffee(49);
      setSelectedToffee(50);
      setCoverGST(false);
      setError("");
      setToast(`Thank you for supporting ${creator?.name || "this creator"} ❤️`);
      setTimeout(() => setToast(""), 3500);
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!creator) {
    return <div className="rounded-[28px] border border-[#E8E0FF] bg-white p-8">Loading support form...</div>;
  }

  return (
    <div
      className="
      bg-gradient-to-r from-[#FAF7F2] to-[#fdfdfd]
      w-full flex-1
      bg-white  rounded-[28px]
      border border-[#E8E0FF]
      shadow-[0_4px_40px_rgba(124,60,237,0.08)]
      p-7
    "
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <p className=" text-[10px] uppercase tracking-[2.5px] font-bold text-[#A78BFA] mb-2">
        Support Creator
      </p>
      <h2
        className="text-center font-black text-[1.6rem] leading-tight tracking-[-0.5px] text-[#1A1A2E] mb-1.5"
        style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
      >
        {/* Support <span className="text-[#A78BFA]">{user?.name}'s</span> */}
        Support <span>{creator?.name}'s</span>
        <span> Creative Journey ❤️</span>
      </h2>
      <p className="text-center text-[12.5px] text-[#9CA3AF] leading-[1.7] mb-6">
        Every coffee and toffee fuels better content, late-night builds, and
        creative work you love.
      </p>

      {!token ? (
        <div className="mb-5 rounded-2xl border border-[#EDE8FF] bg-[#FAFAFE] p-4 text-sm text-[#6B7280]">
          Sign in to support {creator.name}. 
          <button onClick={() => navigate("/")} className="ml-2 font-semibold text-[#7C3AED] underline">Go to login</button>
        </div>
      ) : null}

      {isOwnProfile ? (
        <div className="mb-5 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-800">
          You are viewing your own profile. Support actions are disabled.
        </div>
      ) : null}

      {error ? (
        <div className={`mb-5 rounded-2xl border px-4 py-3 text-sm ${error.includes("successfully") ? "border-green-100 bg-green-50 text-green-700" : "border-red-100 bg-red-50 text-red-600"}`}>
          {error}
        </div>
      ) : null}

      {/* ── Tier Selectors ─────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {/* Coffee */}
        <div className="rounded-[20px] border border-[#EDE8FF] bg-[#FAFAFE] p-4">
          <div className="flex items-center gap-2.5 mb-3.5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FDE68A] to-[#FBBF24] shadow-[0_4px_10px_rgba(251,191,36,0.25)]">
              <img
                src={coffeeImg}
                alt="coffee"
                className="w-full h-full object-cover scale-110"
              />
            </div>
            <div>
              <p
                className="font-black text-[13.5px] text-[#1A1A2E]"
                style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
              >
                Coffee
              </p>
              <p className="text-[11px] text-[#9CA3AF]">Fuel the creator</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            {coffeeOptions.map((amt) => (
              <button
                key={amt}
                onClick={() => setSelectedCoffee(amt)}
                className={`flex-1 h-10 rounded-xl text-[12.5px] font-bold border transition-all duration-200
                  ${
                    selectedCoffee === amt
                      ? "bg-[#1A1A2E] text-[#FBBF24] border-[#1A1A2E] shadow-[0_4px_12px_rgba(26,26,46,0.2)]"
                      : "bg-white text-[#6B7280] border-[#EDE8FF] hover:border-[#7C3AED] hover:text-[#7C3AED]"
                  }`}
              >
                ₹{amt}
              </button>
            ))}
          </div>
        </div>

        {/* Toffee */}
        <div className="rounded-[20px] border border-[#EDE8FF] bg-[#FAFAFE] p-4">
          <div className="flex items-center gap-2.5 mb-3.5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0
              bg-gradient-to-br from-[#DDD6FE] to-[#7C3AED]
              shadow-[0_4px_10px_rgba(124,58,237,0.2)]"
            >
              <img src={toffeeImg} alt="helloo" />
            </div>
            <div>
              <p
                className="font-black text-[13.5px] text-[#1A1A2E]"
                style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
              >
                Toffee
              </p>
              <p className="text-[11px] text-[#9CA3AF]">Extra sweet support</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            {toffeeOptions.map((amt) => (
              <button
                key={amt}
                onClick={() => setSelectedToffee(amt)}
                className={`flex-1 h-10 rounded-xl text-[12.5px] font-bold border transition-all duration-200
                  ${
                    selectedToffee === amt
                      ? "bg-[#7C3AED] text-white border-[#7C3AED] shadow-[0_4px_12px_rgba(124,58,237,0.3)]"
                      : "bg-white text-[#6B7280] border-[#EDE8FF] hover:border-[#FBBF24] hover:text-[#F59E0B]"
                  }`}
              >
                ₹{amt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Name + Email ───────────────────────────────────── */}
      {/* ── Message ────────────────────────────────────────── */}
      <div className="relative mb-4">
        <FiEdit3 className="absolute left-3.5 top-3.5 text-[#C4B5FD] text-[15px]" />
        <textarea
          placeholder="Say something nice... (optional)"
          maxLength={250}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-24 resize-none rounded-[14px] border-[1.5px] border-[#EDE8FF]
            bg-[#FAFAFE] pl-10 pr-4 pt-3 pb-7 text-[13px] text-[#1A1A2E] outline-none
            placeholder:text-[#C4B5FD]
            focus:border-[#7C3AED] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)] focus:bg-white
            transition-all duration-200"
        />
        <span className="absolute bottom-2.5 right-3.5 text-[10.5px] text-[#C4B5FD]">
          {message.length} / 250
        </span>
      </div>

      {/* ── GST Checkbox ───────────────────────────────────── */}
      <div
        className="flex items-center gap-2.5 mb-5 bg-[#F5F3FF] border border-[#EDE8FF] rounded-xl px-3.5 py-3 cursor-pointer"
        onClick={() => setCoverGST(!coverGST)}
      >
        <FiShield
          className={`text-[16px] flex-shrink-0 transition-colors ${coverGST ? "text-[#7C3AED]" : "text-[#C4B5FD]"}`}
        />
        <p className="text-[12px] text-[#6B7280] leading-snug select-none">
          I want to cover payment gateway charges and GST{" "}
          <span className="text-[#7C3AED] font-semibold">(+2.4%)</span> — it
          helps more reach the creator
        </p>
        <input
          type="checkbox"
          checked={coverGST}
          onChange={() => {}}
          className="ml-auto accent-[#7C3AED] cursor-pointer"
        />
      </div>

      {/* ── CTA Button ─────────────────────────────────────── */}
      <button
        onClick={handleSupport}
        disabled={loading || !token || isOwnProfile}
        className={`
    w-full h-[54px] rounded-2xl border-none
    bg-gradient-to-r from-[#FBBF24] to-[#F59E0B]
    text-[#1A1A2E] font-black text-[16px] tracking-[-0.2px]
    flex items-center justify-center gap-2
    shadow-[0_6px_20px_rgba(251,191,36,0.35)]
    hover:shadow-[0_10px_28px_rgba(251,191,36,0.4)]
    hover:-translate-y-0.5
    active:scale-[0.99]
    transition-all duration-200 cursor-pointer mb-3.5
    ${(loading || !token || isOwnProfile) && "opacity-70 cursor-not-allowed"}
  `}
        style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
      >
        <span>💛</span>

        <span>{loading ? "Processing..." : `Support with ₹${total}`}</span>
      </button>

      {/* ── Social Proof ───────────────────────────────────── */}
      <div className="flex items-center justify-between rounded-2xl border border-[#EDE8FF] bg-[#FAFAFE] px-4 py-3">
        <p className="text-[12px] text-[#6B7280]">
          Logged in as <span className="font-semibold text-[#1A1A2E]">{user?.name || "supporter"}</span>
        </p>
        <span className="text-[#7C3AED] text-[12px] font-bold flex items-center gap-1">✨ Thank you</span>
      </div>
      <Toast message={toast} type="success" />
    </div>
  );
};

export default SupportPage;
