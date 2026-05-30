const UpdatesPage = ({ creator }) => {
  return (
    <div className="rounded-[28px] border border-[#E8E0FF] bg-white p-10 shadow-[0_4px_40px_rgba(124,60,237,0.08)]">
      <h2 className="text-2xl font-bold text-[#1A1A2E]">
        Updates from {creator?.name || "this creator"}
      </h2>

      <p className="mt-2 text-[#6B7280]">
        Updates feed will appear here once creator posts are enabled.
      </p>
    </div>
  );
};

export default UpdatesPage;