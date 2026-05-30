// import { useState } from "react";
// import axios from "axios";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     username: "",
//     email: "",
//     password: "",
//     title: "",
//     bio: "",
//     location: "",

//     website: "",
//     instagram: "",
//     linkedin: "",
//     github: "",
//     twitter: "",
//     dribbble: "",
//   });

//   const [profileImage, setProfileImage] = useState(null);
//   const [coverImage, setCoverImage] = useState(null);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const data = new FormData();

//       Object.keys(formData).forEach((key) => {
//         data.append(key, formData[key]);
//       });

//       data.append("profileImage", profileImage);
//       data.append("coverImage", coverImage);

//       const res = await axios.post(
//         "http://localhost:5000/api/auth/register",
//         data,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-8 rounded-3xl shadow-md w-full max-w-2xl"
//     >
//       <h2 className="text-4xl font-bold mb-8">
//         Create Your Creator Page
//       </h2>

//       <div className="grid gap-5">
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           onChange={handleChange}
//           className="border p-4 rounded-2xl"
//         />

//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           onChange={handleChange}
//           className="border p-4 rounded-2xl"
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           className="border p-4 rounded-2xl"
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           className="border p-4 rounded-2xl"
//         />

//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           onChange={handleChange}
//           className="border p-4 rounded-2xl"
//         />

//         <textarea
//           name="bio"
//           placeholder="Bio"
//           maxLength={250}
//           onChange={handleChange}
//           className="border p-4 rounded-2xl h-32"
//         />

//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           onChange={handleChange}
//           className="border p-4 rounded-2xl"
//         />

//         <div className="grid grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="website"
//             placeholder="Website"
//             onChange={handleChange}
//             className="border p-4 rounded-2xl"
//           />

//           <input
//             type="text"
//             name="instagram"
//             placeholder="Instagram"
//             onChange={handleChange}
//             className="border p-4 rounded-2xl"
//           />

//           <input
//             type="text"
//             name="linkedin"
//             placeholder="LinkedIn"
//             onChange={handleChange}
//             className="border p-4 rounded-2xl"
//           />

//           <input
//             type="text"
//             name="github"
//             placeholder="GitHub"
//             onChange={handleChange}
//             className="border p-4 rounded-2xl"
//           />

//           <input
//             type="text"
//             name="twitter"
//             placeholder="Twitter/X"
//             onChange={handleChange}
//             className="border p-4 rounded-2xl"
//           />

//           <input
//             type="text"
//             name="dribbble"
//             placeholder="Dribbble"
//             onChange={handleChange}
//             className="border p-4 rounded-2xl"
//           />
//         </div>

//         <div>
//           <label className="font-semibold block mb-2">
//             Profile Image
//           </label>

//           <input
//             type="file"
//             onChange={(e) =>
//               setProfileImage(e.target.files[0])
//             }
//             className="border p-4 rounded-2xl w-full"
//           />
//         </div>

//         <div>
//           <label className="font-semibold block mb-2">
//             Cover Image
//           </label>

//           <input
//             type="file"
//             onChange={(e) =>
//               setCoverImage(e.target.files[0])
//             }
//             className="border p-4 rounded-2xl w-full"
//           />
//         </div>

//         <button className="bg-[#F59E0B] hover:bg-[#e78f00] transition-all text-white p-4 rounded-2xl text-lg font-bold">
//           Create Account
//         </button>
//       </div>
//     </form>
//   );
// };

// export default Register;







import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../services/authService";
import useAuth from "../../hooks/useAuth";

/* ── tiny reusable field wrapper ── */
const Field = ({ label, hint, children }) => (
  <div className="mb-[14px]">
    <div className="flex justify-between items-center mb-[6px]">
      <label className="text-[11px] font-semibold text-[#4b3f72] tracking-[0.3px]">
        {label}
      </label>
      {hint}
    </div>
    {children}
  </div>
);

const inputCls =
  "w-full rounded-xl border-[1.5px] border-[#e2daf5] bg-white text-[13px] text-[#1a0a2e] placeholder:text-[#c4b5e8] outline-none transition-all focus:border-[#7C3AED] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.09)] font-[Geist,sans-serif]";

const IconWrap = ({ children }) => (
  <span className="absolute left-[12px] text-[#9d8cbe] flex items-center pointer-events-none">
    {children}
  </span>
);

const SectionDivider = ({ label }) => (
  <div className="flex items-center gap-2.5 my-5">
    <div className="flex-1 h-px bg-[#e2daf5]" />
    <span className="text-[10px] font-semibold tracking-[1.5px] uppercase text-[#9d8cbe] whitespace-nowrap">
      {label}
    </span>
    <div className="flex-1 h-px bg-[#e2daf5]" />
  </div>
);

/* ── icons ── */
const IconUser = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);
const IconMail = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 8l10 6 10-6" />
  </svg>
);
const IconLock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);
const IconBriefcase = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
  </svg>
);
const IconPin = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);
const IconGlobe = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
  </svg>
);
const IconImage = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
  </svg>
);

/* ── Upload zone ── */
const UploadZone = ({ label, subLabel, onChange, preview }) => (
  <div
    className="relative flex items-center gap-3 border-[1.5px] border-dashed border-[#c4b5e8] rounded-xl bg-white p-3 cursor-pointer transition-all hover:border-[#7C3AED] hover:bg-[#faf7ff] overflow-hidden"
  >
    <input
      type="file"
      accept="image/*"
      onChange={onChange}
      className="absolute inset-0 opacity-0 cursor-pointer z-10"
    />
    {preview ? (
      <img src={preview} alt="" className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
    ) : (
      <div className="w-9 h-9 rounded-lg bg-[#f3f0fb] flex items-center justify-center flex-shrink-0">
        <IconImage />
      </div>
    )}
    <div>
      <p className="text-[12.5px] font-semibold text-[#1a0a2e]">
        {preview ? "Change photo" : label}
      </p>
      <p className="text-[11px] text-[#9d8cbe] mt-0.5">{subLabel}</p>
    </div>
  </div>
);

/* ── Social field ── */
const SocialField = ({ label, name, prefix, placeholder, onChange }) => (
  <Field label={label}>
    <div className="relative flex items-center">
      <span className="absolute left-[11px] text-[#9d8cbe] text-[11px] font-medium pointer-events-none">
        {prefix}
      </span>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        style={{ paddingLeft: prefix.length > 1 ? "36px" : "26px" }}
        className={`${inputCls} py-[10px] pr-3`}
      />
    </div>
  </Field>
);

/* ══════════════════════════════
   Main Register component
══════════════════════════════ */
const Register = ({ onSwitch }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "", username: "", email: "", password: "",
    title: "", bio: "", location: "",
    website: "", instagram: "", linkedin: "",
    github: "", twitter: "", dribbble: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const slug = formData.username.toLowerCase().replace(/[^a-z0-9_]/g, "");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFile = (e, setFile, setPreview) => {
    const file = e.target.files[0];
    if (!file) return;
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (profileImage) data.append("profileImage", profileImage);
      if (coverImage) data.append("coverImage", coverImage);

      const res = await registerUser(data);

      login(res.user, res.token);

      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Form header */}
      <div className="mb-7">
        <h2
          className="text-center text-[1.85rem] text-[#1a0a2e] leading-[1.1]"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          Create your page
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        {/* ── SECTION 1: Basic info ── */}
        <SectionDivider label="Basic info" />

        {/* Name */}
        <Field label="Full name">
          <div className="relative flex items-center">
            <IconWrap><IconUser /></IconWrap>
            <input
              type="text" name="name" placeholder="Your full name"
              onChange={handleChange}
              className={`${inputCls} py-[10px] pl-10 pr-4`}
            />
          </div>
        </Field>

        {/* Username */}
        <Field label="Username">
          <div className="relative flex items-center">
            <span className="absolute left-[11px] text-[#7C3AED] text-[13px] font-semibold pointer-events-none">
              @
            </span>
            <input
              type="text" name="username" placeholder="yourname"
              value={formData.username}
              onChange={handleChange}
              className={`${inputCls} py-[10px] pl-[26px] pr-4`}
            />
          </div>
          {slug.length > 0 && (
            <p className="text-[10.5px] text-[#9d8cbe] mt-1 ml-0.5">
              creatbase.com/<span className="text-[#7C3AED] font-semibold">{slug}</span>
            </p>
          )}
          {slug.length > 2 && (
            <span className="inline-flex items-center gap-1 bg-[#f0fdf4] border border-[#bbf7d0] rounded-full px-2 py-0.5 text-[10px] font-semibold text-[#16a34a] mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
              Available
            </span>
          )}
        </Field>

        {/* Email */}
        <Field label="Email address">
          <div className="relative flex items-center">
            <IconWrap><IconMail /></IconWrap>
            <input
              type="email" name="email" placeholder="you@example.com"
              onChange={handleChange}
              className={`${inputCls} py-[10px] pl-10 pr-4`}
            />
          </div>
        </Field>

        {/* Password */}
        <Field label="Password">
          <div className="relative flex items-center">
            <IconWrap><IconLock /></IconWrap>
            <input
              type={showPass ? "text" : "password"}
              name="password" placeholder="Min. 8 characters"
              onChange={handleChange}
              className={`${inputCls} py-[10px] pl-10 pr-14`}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 text-[11px] font-semibold text-[#9d8cbe] hover:text-[#7C3AED] bg-transparent border-none cursor-pointer transition-colors"
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </div>
        </Field>

        {/* ── SECTION 2: About ── */}
        <SectionDivider label="About you" />

        {/* Title */}
        <Field label="Title / Role">
          <div className="relative flex items-center">
            <IconWrap><IconBriefcase /></IconWrap>
            <input
              type="text" name="title" placeholder="e.g. Photographer & Writer"
              onChange={handleChange}
              className={`${inputCls} py-[10px] pl-10 pr-4`}
            />
          </div>
        </Field>

        {/* Bio */}
        <Field
          label="Bio"
          hint={
            <span className="text-[10px] text-[#c4b5e8] font-normal">
              {formData.bio.length} / 250
            </span>
          }
        >
          <textarea
            name="bio" maxLength={250} rows={3}
            placeholder="Tell your supporters a little about yourself and what you create..."
            onChange={handleChange}
            className={`${inputCls} py-[10px] px-4 resize-none leading-[1.55]`}
          />
        </Field>

        {/* Location */}
        <Field label="Location">
          <div className="relative flex items-center">
            <IconWrap><IconPin /></IconWrap>
            <input
              type="text" name="location" placeholder="Pune, Maharashtra"
              onChange={handleChange}
              className={`${inputCls} py-[10px] pl-10 pr-4`}
            />
          </div>
        </Field>

        {/* ── SECTION 3: Social ── */}
        <SectionDivider label="Social links" />

        <div className="grid grid-cols-2 gap-x-3">
          <Field label="Website">
            <div className="relative flex items-center">
              <IconWrap><IconGlobe /></IconWrap>
              <input
                type="text" name="website" placeholder="yoursite.com"
                onChange={handleChange}
                className={`${inputCls} py-[10px] pl-10 pr-3`}
              />
            </div>
          </Field>

          <SocialField label="Instagram" name="instagram" prefix="ig/" placeholder="handle" onChange={handleChange} />
          <SocialField label="LinkedIn"  name="linkedin"  prefix="in/" placeholder="handle" onChange={handleChange} />
          <SocialField label="GitHub"    name="github"    prefix="gh/" placeholder="handle" onChange={handleChange} />
          <SocialField label="Twitter / X" name="twitter" prefix="@"   placeholder="handle" onChange={handleChange} />
          <SocialField label="Dribbble"  name="dribbble"  prefix="dr/" placeholder="handle" onChange={handleChange} />
        </div>

        {/* ── SECTION 4: Images ── */}
        <SectionDivider label="Profile photos" />

        <Field label="Profile image">
          <UploadZone
            label="Upload profile photo"
            subLabel="JPG, PNG or WEBP — max 5 MB"
            preview={profilePreview}
            onChange={(e) => handleFile(e, setProfileImage, setProfilePreview)}
          />
        </Field>

        <Field label="Cover image">
          <UploadZone
            label="Upload cover photo"
            subLabel="Recommended 1500 × 500 px"
            preview={coverPreview}
            onChange={(e) => handleFile(e, setCoverImage, setCoverPreview)}
          />
        </Field>

        {/* Error */}
        {error && (
          <p className="text-[12px] text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-3">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-[13px] rounded-xl bg-[#7C3AED] hover:bg-[#6d28d9] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[14px] font-semibold tracking-[0.2px] border-none cursor-pointer transition-colors active:scale-[0.99] mt-1"
          style={{ fontFamily: "'Geist', sans-serif" }}
        >
          {loading ? "Creating your page…" : "Create my page"}
        </button>

        <p className="text-center mt-4 text-[12px] text-[#9d8cbe]">
          Already have a page?{" "}
          <button
            type="button"
            onClick={onSwitch}
            className="text-[#7C3AED] font-semibold bg-transparent border-none cursor-pointer text-[12px] p-0 hover:underline"
          >
            Sign in →
          </button>
        </p>
      </form>
    </>
  );
};

export default Register;