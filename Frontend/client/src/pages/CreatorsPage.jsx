import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { getCreators } from "../services/userService";

const CreatorsPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [search, setSearch] = useState("");
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getCreators(search);

        if (active) {
          setCreators(data.users || []);
        }
      } catch (err) {
        if (active) {
          setError(err?.response?.data?.message || "Unable to load creators");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }, 250);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [search]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 rounded-[28px] border border-[#E8E0FF] bg-white p-6 shadow-[0_4px_40px_rgba(124,60,237,0.08)] md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[2.5px] text-[#A78BFA]">
              Discover creators
            </p>
            <h1 className="text-3xl font-black text-[#1A1A2E]">Browse the Coffee & Toffee network</h1>
          </div>

          <div className="flex gap-3">
            {token ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="cursor-pointer rounded-xl bg-[#1A1A2E] px-4 py-2 text-sm font-semibold text-white"
              >
                Dashboard
              </button>
            ) : null}
            <button
              onClick={() => navigate("/")}
              className="cursor-pointer rounded-xl border border-[#EDE8FF] px-4 py-2 text-sm font-semibold text-[#7C3AED]"
            >
              Sign in
            </button>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-[#EDE8FF] bg-white p-4 shadow-sm">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, username, or title"
            className="w-full rounded-xl border border-[#EDE8FF] bg-[#FAFAFE] px-4 py-3 text-[14px] outline-none focus:border-[#7C3AED]"
          />
        </div>

        {loading ? (
          <div className="rounded-[24px] border border-[#EDE8FF] bg-white p-8 text-center text-[#9CA3AF]">
            Loading creators...
          </div>
        ) : error ? (
          <div className="rounded-[24px] border border-red-100 bg-red-50 p-8 text-center text-red-600">
            {error}
          </div>
        ) : creators.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-[#EDE8FF] bg-white p-10 text-center text-[#6B7280]">
            No creators found.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {creators.map((creator) => (
              <button
                key={creator._id}
                onClick={() => navigate(`/${creator.username}`)}
                className="overflow-hidden rounded-[28px] border border-[#E8E0FF] bg-white text-left shadow-[0_4px_32px_rgba(124,60,237,0.07)] transition-transform hover:-translate-y-1"
              >
                <div
                  className="h-28 bg-cover bg-center"
                  style={{
                    backgroundImage: creator.coverImage
                      ? `linear-gradient(rgba(26,26,46,0.28), rgba(26,26,46,0.28)), url(${creator.coverImage})`
                      : "linear-gradient(135deg, #1A1A2E, #7C3AED)",
                  }}
                />
                <div className="p-5">
                  <img
                    src={creator.profileImage || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"}
                    alt={creator.name}
                    className="-mt-12 mb-4 h-20 w-20 rounded-2xl border-4 border-white object-cover shadow-lg"
                  />
                  <h2 className="text-xl font-black text-[#1A1A2E]">{creator.name}</h2>
                  <p className="text-sm font-semibold text-[#7C3AED]">@{creator.username}</p>
                  <p className="mt-3 line-clamp-2 text-sm text-[#6B7280]">{creator.title || creator.bio || "Creator profile"}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorsPage;