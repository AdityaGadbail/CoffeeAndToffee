import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { updateMyProfile } from "../services/userService";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    bio: "",
    location: "",
    website: "",
    instagram: "",
    linkedin: "",
    github: "",
    twitter: "",
    dribbble: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    setFormData({
      title: user.title || "",
      bio: user.bio || "",
      location: user.location || "",
      website: user.socialLinks?.website || "",
      instagram: user.socialLinks?.instagram || "",
      linkedin: user.socialLinks?.linkedin || "",
      github: user.socialLinks?.github || "",
      twitter: user.socialLinks?.twitter || "",
      dribbble: user.socialLinks?.dribbble || "",
    });

    setProfilePreview(user.profileImage || "");
    setCoverPreview(user.coverImage || "");
  }, [user]);

  const profileLink = useMemo(() => (user?.username ? `${window.location.origin}/${user.username}` : ""), [user?.username]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleFileChange = (event, setFile, setPreview) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (profileImage) data.append("profileImage", profileImage);
      if (coverImage) data.append("coverImage", coverImage);

      const response = await updateMyProfile(data);

      updateUser(response.user);
      navigate(`/${response.user.username}`);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-6 py-8">
      <div className="mx-auto max-w-4xl rounded-[28px] border border-[#E8E0FF] bg-white p-6 shadow-[0_4px_40px_rgba(124,60,237,0.08)]">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[2.5px] text-[#A78BFA]">Edit profile</p>
            <h1 className="text-3xl font-black text-[#1A1A2E]">Update your creator page</h1>
            <p className="mt-2 text-sm text-[#6B7280]">Change your bio, title, location, images, and social links.</p>
          </div>

          <button onClick={() => navigate("/dashboard")} className="cursor-pointer rounded-xl border border-[#EDE8FF] px-4 py-2 text-sm font-semibold text-[#7C3AED]">Back to dashboard</button>
        </div>

        {error ? <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div> : null}

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title">
              <input name="title" value={formData.title} onChange={handleChange} className={inputClass} placeholder="Creator title" />
            </Field>
            <Field label="Location">
              <input name="location" value={formData.location} onChange={handleChange} className={inputClass} placeholder="City, country" />
            </Field>
          </div>

          <Field label="Bio">
            <textarea name="bio" value={formData.bio} onChange={handleChange} maxLength={250} rows={4} className={`${inputClass} resize-none`} placeholder="Tell people what you make and why they should support you." />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <UploadField label="Profile image" preview={profilePreview} onChange={(event) => handleFileChange(event, setProfileImage, setProfilePreview)} />
            <UploadField label="Cover image" preview={coverPreview} onChange={(event) => handleFileChange(event, setCoverImage, setCoverPreview)} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Website"><input name="website" value={formData.website} onChange={handleChange} className={inputClass} placeholder="https://your-site.com" /></Field>
            <Field label="Instagram"><input name="instagram" value={formData.instagram} onChange={handleChange} className={inputClass} placeholder="https://instagram.com/yourname" /></Field>
            <Field label="LinkedIn"><input name="linkedin" value={formData.linkedin} onChange={handleChange} className={inputClass} placeholder="https://linkedin.com/in/yourname" /></Field>
            <Field label="GitHub"><input name="github" value={formData.github} onChange={handleChange} className={inputClass} placeholder="https://github.com/yourname" /></Field>
            <Field label="Twitter / X"><input name="twitter" value={formData.twitter} onChange={handleChange} className={inputClass} placeholder="https://x.com/yourname" /></Field>
            <Field label="Dribbble"><input name="dribbble" value={formData.dribbble} onChange={handleChange} className={inputClass} placeholder="https://dribbble.com/yourname" /></Field>
          </div>

          <div className="rounded-2xl border border-[#EDE8FF] bg-[#FAFAFE] p-4 text-sm text-[#6B7280]">
            <p className="font-semibold text-[#1A1A2E]">Public profile link</p>
            <p className="mt-1 break-all">{profileLink || "Your profile link will appear here after login."}</p>
          </div>

          <button type="submit" disabled={loading} className="cursor-pointer rounded-2xl bg-[#1A1A2E] px-5 py-4 text-base font-black text-white disabled:cursor-not-allowed disabled:opacity-70">
            {loading ? "Saving..." : "Save profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

const Field = ({ label, children }) => (
  <label className="grid gap-2">
    <span className="text-sm font-semibold text-[#1A1A2E]">{label}</span>
    {children}
  </label>
);

const UploadField = ({ label, preview, onChange }) => (
  <label className="grid gap-2 rounded-2xl border border-dashed border-[#EDE8FF] bg-[#FAFAFE] p-4">
    <span className="text-sm font-semibold text-[#1A1A2E]">{label}</span>
    <input type="file" accept="image/*" onChange={onChange} className="text-sm" />
    {preview ? <img src={preview} alt={label} className="h-28 w-full rounded-xl object-cover" /> : null}
  </label>
);

const inputClass = "w-full rounded-xl border border-[#EDE8FF] bg-white px-4 py-3 text-sm text-[#1A1A2E] outline-none focus:border-[#7C3AED]";

export default EditProfilePage;