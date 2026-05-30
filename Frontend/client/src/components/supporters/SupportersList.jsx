import { useEffect, useState } from "react";

import SupporterCard from "./SupporterCard";
import { getCreatorSupports } from "../../services/supportService";

const SupportersList = ({ creatorId }) => {
  const [supports, setSupports] = useState([]);

  useEffect(() => {
    const fetchSupports = async () => {
      if (!creatorId) return;

      try {
        const res = await getCreatorSupports(creatorId);
        setSupports(res.supports || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSupports();
  }, [creatorId]);

  return (
    <div>
      {supports.length === 0 ? (
        <div
          className="
          text-center
          py-10
          text-[#9CA3AF]
        "
        >
          No supporters yet ❤️
        </div>
      ) : (
        supports.map((support) => (
          <SupporterCard
            key={support._id}
            support={support}
          />
        ))
      )}
    </div>
  );
};

export default SupportersList;