// const SupporterCard = ({ support }) => {
//   return (
//     <div
//       className="
//       border border-[#EDE8FF]
//       bg-[#FAFAFE]
//       rounded-2xl
//       p-4
//       mb-3
//     "
//     >
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">

//           <img
//             src={
//               support.supporterId?.profileImage ||
//               "https://i.pravatar.cc/100"
//             }
//             alt="supporter"
//             className="w-12 h-12 rounded-full object-cover"
//           />

//           <div>
//             <h4 className="font-bold text-[#1A1A2E]">
//               {support.supporterId?.name}
//             </h4>

//             <p className="text-[12px] text-[#9CA3AF]">
//               {new Date(
//                 support.createdAt
//               ).toLocaleDateString()}
//             </p>
//           </div>

//         </div>

//         <div
//           className="
//           bg-[#7C3AED]
//           text-white
//           px-3 py-1
//           rounded-full
//           text-sm
//           font-bold
//         "
//         >
//           ₹{support.totalAmount}
//         </div>
//       </div>

//       {support.message && (
//         <p className="mt-3 text-[#6B7280] text-sm">
//           "{support.message}"
//         </p>
//       )}
//     </div>
//   );
// };

// export default SupporterCard;

const SupporterCard = ({ support }) => {
  const supporter = support.supporterId || {};

  return (
    <div
      className="
      bg-white
      border border-[#EDE8FF]
      rounded-2xl
      p-5
      mb-4
      shadow-sm
    "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={supporter.profileImage || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"}
            alt={supporter.name || "supporter"}
            className="h-12 w-12 rounded-full object-cover"
          />

          <div>
            <h3 className="font-bold text-[#1A1A2E]">{supporter.name || "Anonymous supporter"}</h3>
            <p className="text-sm text-gray-500">₹{support.totalAmount}</p>
          </div>
        </div>

        <span className="text-xs text-gray-400">
          {new Date(support.createdAt).toLocaleDateString()}
        </span>
      </div>

      {support.message && (
        <p className="mt-3 text-gray-600">
          "{support.message}"
        </p>
      )}
    </div>
  );
};

export default SupporterCard;