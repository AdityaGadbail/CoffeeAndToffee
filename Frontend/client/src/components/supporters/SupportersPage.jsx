import { useEffect, useState } from "react";

import { getCreatorSupports } from "../../services/supportService";
import SupporterCard from "./SupporterCard";

const SupportersPage = ({ creator }) => {
  const [supports, setSupports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchSupports = async () => {
      try {
        if (!creator?._id) {
          setSupports([]);
          setLoading(false);
          return;
        }

        setLoading(true);
        setError("");

        const data = await getCreatorSupports(creator._id);

        if (active) {
          setSupports(data.supports || []);
        }
      } catch (fetchError) {
        if (active) {
          setError(fetchError?.response?.data?.message || "Unable to load supporters");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchSupports();

    return () => {
      active = false;
    };
  }, [creator?._id]);

  if (loading) {
    return (
      <div className="rounded-[28px] border border-[#E8E0FF] bg-white p-8">
        Loading supporters...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[28px] border border-red-100 bg-red-50 p-8 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-[#E8E0FF] bg-white p-6 shadow-[0_4px_40px_rgba(124,60,237,0.08)]">
      <h2 className="mb-2 text-2xl font-bold text-[#1A1A2E]">Supporters ❤️</h2>
      <p className="mb-6 text-sm text-[#6B7280]">People supporting {creator?.name || "this creator"}.</p>

      {supports.length === 0 ? (
        <div className="py-16 text-center">
          <h3 className="mb-2 text-xl font-semibold">No supporters yet</h3>
          <p className="text-gray-500">Be the first one to support this creator ☕</p>
        </div>
      ) : (
        <div className="space-y-4">
          {supports.map((support) => (
            <SupporterCard key={support._id} support={support} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SupportersPage;