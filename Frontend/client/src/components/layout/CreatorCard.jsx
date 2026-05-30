import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaMapMarkerAlt,
  FaCheck,
  FaLink,
} from "react-icons/fa";
import { useMemo, useState } from "react";


const achievements = [
  {
    emoji: "🏆",
    bg: "bg-amber-50",
    border: "border-amber-100",
    label: "Top Creator",
  },
  {
    emoji: "🚀",
    bg: "bg-violet-50",
    border: "border-violet-100",
    label: "Early Adopter",
  },
  {
    emoji: "🔥",
    bg: "bg-orange-50",
    border: "border-orange-100",
    label: "On a Streak",
  },
  {
    emoji: "✨",
    bg: "bg-purple-50",
    border: "border-purple-100",
    label: "Milestone",
  },
];

const CreatorCard = ({ creator }) => {
  const [copied, setCopied] = useState(false);

  const profileLink = useMemo(() => {
    if (!creator?.username || typeof window === "undefined") {
      return "";
    }

    return `${window.location.origin}/${creator.username}`;
  }, [creator?.username]);

  const socialLinks = [
  {
    Icon: FaGlobe,
    href: creator?.socialLinks?.website,
    label: "Website",
  },
  {
    Icon: FaTwitter,
    href: creator?.socialLinks?.twitter,
    label: "Twitter",
  },
  {
    Icon: FaLinkedin,
    href: creator?.socialLinks?.linkedin,
    label: "LinkedIn",
  },
  {
    Icon: FaGithub,
    href: creator?.socialLinks?.github,
    label: "GitHub",
  },
];

  const handleCopyLink = async () => {
    if (!profileLink) return;

    await navigator.clipboard.writeText(profileLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (!creator) {
    return (
      <div className="sticky top-5 w-full rounded-[28px] border border-[#E8E0FF] bg-white p-6 shadow-[0_4px_32px_rgba(124,60,237,0.07)]">
        Loading creator profile...
      </div>
    );
  }

  return (
    <div
      className="
      bg-gradient-to-r from-[#FAF7F2] to-[#fdfdfd]
      w-full bg-white rounded-[28px] overflow-hidden
      border border-[#E8E0FF]
      shadow-[0_4px_32px_rgba(124,60,237,0.07)]
      sticky top-5
    "
    >
      {/* ── Cover banner ── */}
      <div
        className="relative h-40 overflow-hidden bg-[#F5F0FF] bg-cover bg-center"
        style={{
          backgroundImage: creator.coverImage
            ? `linear-gradient(rgba(26,26,46,0.18), rgba(26,26,46,0.18)), url(${creator.coverImage})`
            : undefined,
        }}
      >
        <div className="absolute w-44 h-44 rounded-full bg-[#C4B5FD] opacity-35 -top-14 -left-12" />
        <div className="absolute w-36 h-36 rounded-full bg-[#FDE68A] opacity-30 -bottom-10 right-3" />
        <div className="absolute w-24 h-24 rounded-full bg-[#F9A8D4] opacity-22 top-2 right-14" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #1A1A2E 1.5px, transparent 1.5px)",
            backgroundSize: "18px 18px",
          }}
        />
      </div>

      {/* ── Body — everything centered ── */}
      <div className="px-5 pb-6 flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="relative w-fit -mt-11 mb-4">
          <div
            className="
            w-[88px] h-[88px] rounded-full overflow-hidden
            border-4 border-white
            shadow-[0_4px_20px_rgba(124,60,237,0.15)]
          "
          >
            <img
                src={creator.profileImage || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"}
                alt={creator.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="
            absolute bottom-1 right-1 w-6 h-6 rounded-full
            bg-[#7C3AED] border-[3px] border-white
            flex items-center justify-center
          "
          >
            <FaCheck className="text-white text-[9px]" />
          </div>
        </div>

        {/* Name + role */}
          <h2 className="font-black text-[1.4rem] leading-tight tracking-[-0.5px] text-[#1A1A2E] mb-1">
          {creator.name}
        </h2>
        <p className="text-[#7C3AED] font-semibold text-[12px] mb-3">
          @{creator.username}
        </p>

        <p className="text-[#7C3AED] font-semibold text-[12px] mb-3">
          {creator.title}
        </p>

        {/* Bio */}
        <p className="text-[#6B7280] text-[12.5px] leading-[1.75] mb-3">
          {creator.bio}
        </p>

        {/* Location */}
        <div className="flex items-center justify-center gap-1.5 text-[#9CA3AF] mb-4">
          <FaMapMarkerAlt className="text-[11px] flex-shrink-0" />
          <span className="text-[12px] font-medium">{creator.location}</span>
        </div>

        {/* Socials */}
        <div className="flex justify-center gap-2 mb-0">
          {socialLinks
            .filter((social) => social.href)
            .map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="
                w-9 h-9 rounded-xl
                bg-[#FAF7FF] border border-[#EDE8FF]
                text-[#7C3AED]
                flex items-center justify-center
                hover:bg-[#7C3AED] hover:text-white hover:border-[#7C3AED]
                hover:scale-110 hover:shadow-[0_4px_12px_rgba(124,60,237,0.25)]
                transition-all duration-200
              "
              >
                <Icon className="text-[13px]" />
              </a>
            ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-[#F0EBFF] my-5 w-full" />

        {/* Supporter count */}
        <div className="grid w-full grid-cols-3 gap-2">
          <StatCard label="Supporters" value={creator.supporterCount || 0} />
          <StatCard label="Coffee" value={creator.coffeeCount || 0} />
          <StatCard label="Toffee" value={creator.toffeeCount || 0} />
        </div>

        <button
          onClick={handleCopyLink}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-[#EDE8FF] bg-[#FAF7FF] px-4 py-3 text-sm font-semibold text-[#7C3AED] transition-colors hover:border-[#7C3AED]"
        >
          <FaLink className="text-xs" />
          {copied ? "Link copied" : "Copy profile link"}
        </button>

        {/* Divider */}
        <div className="h-px bg-[#F0EBFF] my-5 w-full" />

        {/* Achievements */}
        <p className="text-[10px] uppercase tracking-[2.5px] font-bold text-[#C4B5FD] mb-3 w-full text-center">
          Achievements
        </p>
        <div className="grid grid-cols-4 gap-2 w-full">
          {achievements.map(({ emoji, bg, border, label }) => (
            <div
              key={label}
              title={label}
              className={`
                aspect-square rounded-2xl
                ${bg} border ${border}
                flex items-center justify-center text-xl
                hover:scale-110 transition-transform duration-200 cursor-default
              `}
            >
              {emoji}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-[#F0EBFF] my-5 w-full" />

        {/* CTA */}
        <p className="text-[12px] text-[#9CA3AF] text-center">
          Supporter count, coffee count, and toffee count update automatically after each successful support.
        </p>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="rounded-2xl border border-[#EDE8FF] bg-[#FAF7FF] px-3 py-3 text-center">
    <p className="text-[10px] font-bold uppercase tracking-[1.8px] text-[#A78BFA]">{label}</p>
    <p className="mt-1 text-lg font-black text-[#1A1A2E]">{value}</p>
  </div>
);

export default CreatorCard;
