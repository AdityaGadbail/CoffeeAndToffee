import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CreatorCard from "../components/layout/CreatorCard";
import TabNav from "../components/layout/TabNav";
import SupportPage from "../components/support/SupportPage";
import UpdatesPage from "../components/updates/UpdatesPage";
import SupportersPage from "../components/supporters/SupportersPage";
import useAuth from "../hooks/useAuth";
import { getCreatorByUsername } from "../services/userService";

const HomePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("support");

  useEffect(() => {
    let active = true;

    const loadCreator = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getCreatorByUsername(username);

        if (active) {
          setCreator(response.user);
        }
      } catch (err) {
        if (active) {
          setError(err?.response?.data?.message || "Creator not found");
          setCreator(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    if (username) {
      loadCreator();
    }

    return () => {
      active = false;
    };
  }, [username]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2] text-[#6B7280]">
        Loading creator profile...
      </div>
    );
  }

  if (error || !creator) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] px-6 py-16">
        <div className="mx-auto max-w-xl rounded-[28px] border border-[#E8E0FF] bg-white p-8 text-center shadow-[0_4px_40px_rgba(124,60,237,0.08)]">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[2.5px] text-[#A78BFA]">Creator profile</p>
          <h1 className="text-3xl font-black text-[#1A1A2E]">{error || "Profile not found"}</h1>
          <p className="mt-3 text-sm text-[#6B7280]">Try searching the creators directory or head back to the login page.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button onClick={() => navigate("/creators")} className="cursor-pointer rounded-xl bg-[#1A1A2E] px-4 py-2 text-sm font-semibold text-white">Browse creators</button>
            <button onClick={() => navigate("/")} className="rounded-xl border cursor-pointer border-[#EDE8FF] px-4 py-2 text-sm font-semibold text-[#7C3AED]">Sign in</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] bg-gradient-to-r from-[#FAF7F2] to-[#f8ebd6] p-6">
      <div className="mx-auto mb-5 flex max-w-7xl justify-end gap-3">
        <button onClick={() => navigate("/creators")} className="cursor-pointer rounded-2xl border border-[#E8E0FF] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#7C3AED] shadow-md">Creators</button>
        {token ? (
          <>
            <button onClick={() => navigate("/dashboard")} className="cursor-pointer rounded-2xl bg-[#1A1A2E] px-5 py-2.5 text-[13px] font-semibold text-white shadow-md">Dashboard</button>
            <button onClick={() => { logout(); navigate("/"); }} className="cursor-pointer rounded-2xl border border-[#E8E0FF] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#1A1A2E] shadow-md">Logout</button>
          </>
        ) : (
          <button onClick={() => navigate("/")} className="cursor-pointer rounded-2xl bg-[#1A1A2E] px-5 py-2.5 text-[13px] font-semibold text-white shadow-md">Sign in</button>
        )}
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[350px_1fr]">
        <div>
          <CreatorCard creator={creator} />
        </div>

  
        <div>
          <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="mt-8">
            {activeTab === "support" && <SupportPage creator={creator} />}

            {activeTab === "updates" && <UpdatesPage creator={creator} />}

            {activeTab === "supporters" && <SupportersPage creator={creator} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
