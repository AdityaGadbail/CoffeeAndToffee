const TabNav = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mb-6 flex gap-10 border-b border-[#E8E0FF] pb-4 text-lg font-semibold">

      <button 
        onClick={() => setActiveTab("support")}
        className={`pb-2 transition-all cursor-pointer ${
          activeTab === "support"
            ? "text-[#7C3AED] border-b-2 border-[#7C3AED]"
            : "text-gray-500"
        }`}
      >
        Support
      </button>

      <button
        onClick={() => setActiveTab("updates")}
        className={`pb-2 transition-all cursor-pointer ${
          activeTab === "updates"
            ? "text-[#7C3AED] border-b-2 border-[#7C3AED]"
            : "text-gray-500"
        }`}
      >
        Updates
      </button>

      <button
        onClick={() => setActiveTab("supporters")}
        className={`pb-2 transition-all cursor-pointer ${
          activeTab === "supporters"
            ? "text-[#7C3AED] border-b-2 border-[#7C3AED]"
            : "text-gray-500"
        }`}
      >
        Supporters
      </button>

    </div>
  );
};

export default TabNav;