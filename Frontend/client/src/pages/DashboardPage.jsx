import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { getCreatorSupports } from "../services/supportService";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [supports, setSupports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadDashboard = async () => {
      if (!user?._id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getCreatorSupports(user._id);

        if (active) {
          setSupports(data.supports || []);
        }
      } catch (err) {
        if (active) {
          setError(err?.response?.data?.message || "Unable to load dashboard data");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      active = false;
    };
  }, [user?._id]);

  const summary = useMemo(() => {
    return supports.reduce(
      (accumulator, support) => {
        accumulator.earnings += Number(support.totalAmount || 0);
        accumulator.supporters += 1;
        accumulator.coffee += Number(support.coffeeAmount || 0);
        accumulator.toffee += Number(support.toffeeAmount || 0);
        return accumulator;
      },
      { earnings: 0, supporters: 0, coffee: 0, toffee: 0 }
    );
  }, [supports]);

  const recentSupporters = supports.slice(0, 5);

  const copyProfileLink = async () => {
    if (!user?.username) return;
    await navigator.clipboard.writeText(`${window.location.origin}/${user.username}`);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 rounded-[28px] border border-[#E8E0FF] bg-white p-6 shadow-[0_4px_40px_rgba(124,60,237,0.08)] md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[2.5px] text-[#A78BFA]">Creator dashboard</p>
            <h1 className="text-3xl font-black text-[#1A1A2E]">Welcome back, {user?.name || "creator"}</h1>
            <p className="mt-2 text-sm text-[#6B7280]">Track your support activity, earnings, and latest supporters.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={() => navigate(`/${user?.username}`)} className="cursor-pointer rounded-xl border border-[#EDE8FF] px-4 py-2 text-sm font-semibold text-[#7C3AED]">View public page</button>
            <button onClick={() => navigate("/profile/edit")} className="cursor-pointer rounded-xl bg-[#1A1A2E] px-4 py-2 text-sm font-semibold text-white">Edit profile</button>
            <button onClick={copyProfileLink} className="cursor-pointer rounded-xl border border-[#EDE8FF] px-4 py-2 text-sm font-semibold text-[#1A1A2E]">Copy profile link</button>
            <button onClick={() => { logout(); navigate("/"); }} className="cursor-pointer rounded-xl border border-[#EDE8FF] px-4 py-2 text-sm font-semibold text-[#7C3AED]">Logout</button>
          </div>
        </div>

        {loading ? (
          <div className="rounded-[24px] border border-[#EDE8FF] bg-white p-8 text-center text-[#9CA3AF]">Loading dashboard...</div>
        ) : error ? (
          <div className="rounded-[24px] border border-red-100 bg-red-50 p-8 text-center text-red-600">{error}</div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <SummaryCard label="Total supporters" value={user?.supporterCount ?? summary.supporters} accent="from-[#FBBF24] to-[#F59E0B]" />
              <SummaryCard label="Coffee received" value={user?.coffeeCount ?? summary.coffee} accent="from-[#7C3AED] to-[#A78BFA]" />
              <SummaryCard label="Toffee received" value={user?.toffeeCount ?? summary.toffee} accent="from-[#F472B6] to-[#EC4899]" />
              <SummaryCard label="Earnings" value={`₹${summary.earnings.toLocaleString()}`} accent="from-[#1A1A2E] to-[#374151]" />
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
              <section className="rounded-[28px] border border-[#E8E0FF] bg-white p-6 shadow-[0_4px_40px_rgba(124,60,237,0.08)]">
                <h2 className="text-xl font-black text-[#1A1A2E]">Recent supporters</h2>
                <div className="mt-4 space-y-4">
                  {recentSupporters.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-[#EDE8FF] p-8 text-center text-[#6B7280]">Support activity will appear here.</div>
                  ) : (
                    recentSupporters.map((support) => (
                      <div key={support._id} className="flex items-center gap-4 rounded-2xl border border-[#EDE8FF] bg-[#FAFAFE] p-4">
                        <img
                          src={support.supporterId?.profileImage || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"}
                          alt={support.supporterId?.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-[#1A1A2E]">{support.supporterId?.name || "Anonymous supporter"}</p>
                          <p className="truncate text-sm text-[#6B7280]">{support.message || "Sent support without a message"}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#7C3AED]">₹{support.totalAmount}</p>
                          <p className="text-xs text-[#9CA3AF]">{new Date(support.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>

              <aside className="rounded-[28px] border border-[#E8E0FF] bg-white p-6 shadow-[0_4px_40px_rgba(124,60,237,0.08)]">
                <h2 className="text-xl font-black text-[#1A1A2E]">Earnings summary</h2>
                <div className="mt-4 rounded-2xl bg-[#FAF7FF] p-4">
                  <p className="text-sm text-[#6B7280]">Total creator earnings</p>
                  <p className="mt-1 text-3xl font-black text-[#1A1A2E]">₹{summary.earnings.toLocaleString()}</p>
                </div>
                <div className="mt-4 space-y-3 text-sm text-[#6B7280]">
                  <p>Public link: <span className="font-semibold text-[#1A1A2E]">/{user?.username}</span></p>
                  <p>Use the dashboard to edit your bio, images, and socials.</p>
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const SummaryCard = ({ label, value, accent }) => (
  <div className="overflow-hidden rounded-[24px] border border-[#E8E0FF] bg-white p-5 shadow-[0_4px_40px_rgba(124,60,237,0.08)]">
    <div className={`mb-4 h-1.5 rounded-full bg-gradient-to-r ${accent}`} />
    <p className="text-sm text-[#6B7280]">{label}</p>
    <p className="mt-2 text-3xl font-black text-[#1A1A2E]">{value}</p>
  </div>
);

export default DashboardPage;