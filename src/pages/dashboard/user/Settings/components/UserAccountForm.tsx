"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  Award,
  Briefcase,
  Camera,
  CheckCircle2,
  Clock,
  DollarSign,
  Loader2,
  Mail,
  MapPin,
  Plus,
  Sparkles,
  Trash2,
  Upload,
  User,
  X
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ProfileInput } from "@/components/ui/profileInput";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/redux/features/userDashboard/userProfile.api";

// Validation Schema matching Postman API profile shape
const profileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone1: z.string().optional().nullable(),
  address1: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  specialty: z.string().optional().nullable(),
  years_of_experience: z.string().optional().nullable(),
  hourly_rate: z.string().optional().nullable(),
  open_to: z.string().optional().nullable(),
  bio: z
    .string()
    .max(500, "Bio must be under 500 characters")
    .optional()
    .nullable(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function UserAccountForm() {
  const { data: profileResponse, isLoading } =
    useGetUserProfileQuery(undefined);
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  const user = profileResponse?.data;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [skills, setSkills] = useState<string[]>([""]);
  const [newSkill, setNewSkill] = useState("");

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone1: "",
      address1: "",
      location: "",
      specialty: "",
      years_of_experience: "",
      hourly_rate: "",
      open_to: "",
      bio: "",
    },
  });

  // Populate form with fetched profile data from API
  useEffect(() => {
    if (user) {
      form.reset({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone1: user.phone1 || "",
        address1: user.address1 || "",
        location: user.location || "",
        specialty: user.specialty || "",
        years_of_experience:
          user.years_of_experience !== null &&
            user.years_of_experience !== undefined
            ? String(user.years_of_experience)
            : "",
        hourly_rate:
          user.hourly_rate !== null && user.hourly_rate !== undefined
            ? String(user.hourly_rate)
            : "",
        open_to: user.open_to || "FULL_TIME",
        bio: user.bio || "",
      });

      if (user.skills && Array.isArray(user.skills)) {
        setSkills(user.skills);
      }
    }
  }, [user, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      toast.success("Profile image selected. Save changes to upload.");
    }
  };

  const removeSelectedImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (values: ProfileFormData) => {
    try {
      // Build multipart FormData as shown in Postman
      const formData = new FormData();
      if (values.first_name) formData.append("first_name", values.first_name);
      if (values.last_name) formData.append("last_name", values.last_name);
      if (values.address1) formData.append("address1", values.address1);
      if (values.phone1) formData.append("phone1", values.phone1);
      if (values.specialty) formData.append("specialty", values.specialty);
      if (values.years_of_experience)
        formData.append("years_of_experience", values.years_of_experience);
      if (values.hourly_rate)
        formData.append("hourly_rate", values.hourly_rate);
      if (values.location) formData.append("location", values.location);
      if (values.open_to) formData.append("open_to", values.open_to);
      if (values.bio) formData.append("bio", values.bio);

      // Append skills array as JSON string (e.g. ["python", "react"])
      if (skills && skills.length > 0) {
        formData.append("skills", JSON.stringify(skills));
      }

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await updateProfile(formData).unwrap();
      if (res?.success) {
        toast.success(res.details || "Profile updated successfully!");
        setImageFile(null);
        setImagePreview(null);
      } else {
        toast.success("Profile saved successfully!");
      }
    } catch (err: any) {
      console.error("Failed to update profile:", err);
      toast.error(
        err?.data?.details ||
        err?.message ||
        "Failed to update profile. Please try again.",
      );
    }
  };

  const handleCancel = () => {
    if (user) {
      form.reset({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone1: user.phone1 || "",
        address1: user.address1 || "",
        location: user.location || "",
        specialty: user.specialty || "",
        years_of_experience:
          user.years_of_experience !== null &&
            user.years_of_experience !== undefined
            ? String(user.years_of_experience)
            : "",
        hourly_rate:
          user.hourly_rate !== null && user.hourly_rate !== undefined
            ? String(user.hourly_rate)
            : "",
        open_to: user.open_to || "FULL_TIME",
        bio: user.bio || "",
      });
      if (user.skills && Array.isArray(user.skills)) {
        setSkills(user.skills);
      }
      removeSelectedImage();
      toast.info("Form reset to saved profile data");
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  // Skeleton loading component
  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="bg-[#0D1526] rounded-2xl p-8 border border-white/5 h-36 flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-slate-800" />
          <div className="space-y-3 flex-1">
            <div className="h-6 bg-slate-800 rounded w-1/3" />
            <div className="h-4 bg-slate-800/60 rounded w-1/4" />
          </div>
        </div>
        <div className="bg-[#0D1526] p-8 rounded-2xl border border-white/5 h-96 space-y-6">
          <div className="h-6 bg-slate-800 rounded w-1/4 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-12 bg-slate-800/70 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Helper to format image URLs and fix mixed-content HTTP/HTTPS issues
  const getImageUrl = (url?: string | null) => {
    if (!url) return undefined;
    if (
      typeof window !== "undefined" &&
      window.location.protocol === "https:" &&
      url.startsWith("http://")
    ) {
      return url.replace("http://", "https://");
    }
    return url;
  };

  // Display derived helper values
  const displayName =
    [user?.first_name, user?.last_name].filter(Boolean).join(" ") ||
    "User Profile";
  const initials =
    `${user?.first_name?.[0] || "U"}${user?.last_name?.[0] || ""}`.toUpperCase();
  const specialtyTitle = user?.specialty || "Member";
  const currentAvatar = imagePreview || getImageUrl(user?.image);

  return (
    <div className="space-y-8">
      {/* Hidden File Input for Avatar */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      {/* Profile Header Card */}
      <div className="bg-[#0D1526] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start justify-between text-center md:text-left gap-6 border border-white/5 shadow-xl shadow-black/40 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/5 opacity-80 pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          {/* Avatar with Hover Upload Overlay */}
          <div
            className="relative group/avatar cursor-pointer shrink-0"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-24 h-24 sm:w-22 sm:h-22 rounded-full border-4 border-blue-500/30 shadow-xl ring-4 ring-blue-500/10 overflow-hidden relative bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center transition-transform duration-300 group-hover/avatar:scale-105">
              {currentAvatar ? (
                <img
                  key={currentAvatar}
                  src={currentAvatar}
                  alt={displayName}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = "none";
                    const fallbackEl =
                      e.currentTarget.parentElement?.querySelector(
                        ".avatar-fallback-text",
                      );
                    if (fallbackEl)
                      (fallbackEl as HTMLElement).style.display = "flex";
                  }}
                />
              ) : null}
              <span
                className={`avatar-fallback-text font-bold text-2xl text-white ${currentAvatar ? "hidden" : "flex"
                  }`}
              >
                {initials}
              </span>
            </div>
            <div className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200 pointer-events-none">
              <Camera className="w-6 h-6 mb-0.5" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">
                Change
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-2.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {displayName}
              </h1>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 tracking-wider uppercase">
                {user?.role || "USER"}
              </span>
            </div>

            <p className="text-slate-400 font-medium text-sm flex items-center justify-center sm:justify-start gap-2">
              <Briefcase className="w-4 h-4 text-blue-400 shrink-0" />
              {specialtyTitle}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5 bg-[#101E2D] px-3 py-1 rounded-lg border border-white/5">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                {user?.email}
              </span>
              {(user?.location || user?.address1) && (
                <span className="flex items-center gap-1.5 bg-[#101E2D] px-3 py-1 rounded-lg border border-white/5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {user?.location || user?.address1}
                </span>
              )}
            </div>

            {/* Avatar Action Buttons */}
            <div className="flex items-center gap-3 pt-1 justify-center sm:justify-start">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1.5 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20 transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload Photo
              </button>
              {imagePreview && (
                <button
                  type="button"
                  onClick={removeSelectedImage}
                  className="text-xs text-red-400 hover:text-red-300 font-medium flex items-center gap-1 bg-red-500/10 px-2.5 py-1.5 rounded-lg border border-red-500/20 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear Preview
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Verification Status Pill */}
        <div className="relative z-10 flex flex-col items-center md:items-end gap-2 shrink-0">
          {user?.all_agreements_accepted ? (
            <div className="hidden flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Agreements Verified
            </div>
          ) : (
            <div className="hidden flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              Agreements Pending
            </div>
          )}

          <div className="flex flex-wrap justify-center md:justify-end gap-2 text-xs text-slate-400 mt-2">
            {user?.years_of_experience !== null &&
              user?.years_of_experience !== undefined && (
                <span className="bg-[#101E2D] px-3 py-1.5 rounded-lg border border-white/5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  {user.years_of_experience} yrs exp
                </span>
              )}
            {user?.hourly_rate !== null && user?.hourly_rate !== undefined && (
              <span className="bg-[#101E2D] px-3 py-1.5 rounded-lg border border-white/5 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />$
                {user.hourly_rate}/hr
              </span>
            )}
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Profile Information Card */}
          <div className="bg-[#0D1526] p-6 md:p-8 rounded-2xl border border-white/5 shadow-xl shadow-black/40 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <h2 className="text-white text-xl font-bold mb-6 flex gap-2.5 items-center tracking-tight">
              <User className="text-blue-400 w-6 h-6" />
              Profile Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <ProfileInput
                className="!bg-[#101E2D] placeholder:text-[#6a768a]"
                label="First Name (first_name)"
                name="first_name"
                placeholder="e.g. Asib"
              />
              <ProfileInput
                className="!bg-[#101E2D] placeholder:text-[#6a768a]"
                label="Last Name (last_name)"
                name="last_name"
                placeholder="e.g. Ahmed"
              />

              <ProfileInput
                className="!bg-[#101E2D] placeholder:text-[#6a768a]"
                label="Email Address (email)"
                name="email"
                type="email"
                placeholder="e.g. jishan1873@gmail.com"
                disabled={true}
              />
              <ProfileInput
                className="!bg-[#101E2D] placeholder:text-[#6a768a]"
                label="Phone Number (phone1)"
                name="phone1"
                placeholder="e.g. 01712345678"
              />

              <ProfileInput
                className="!bg-[#101E2D] placeholder:text-[#6a768a]"
                label="Street Address (address1)"
                name="address1"
                placeholder="e.g. House 12, Road 5, Dhanmondi, Dhaka"
              />
              <ProfileInput
                className="!bg-[#101E2D] placeholder:text-[#6a768a]"
                label="Location (location)"
                name="location"
                placeholder="e.g. Dhaka, Bangladesh"
              />

              <ProfileInput
                className="!bg-[#101E2D] placeholder:text-[#6a768a]"
                label="Specialty (specialty)"
                name="specialty"
                placeholder="e.g. Backend Development"
              />
              <ProfileInput
                className="!bg-[#101E2D] placeholder:text-[#6a768a]"
                label="Years of Experience (years_of_experience)"
                name="years_of_experience"
                type="number"
                placeholder="e.g. 4"
              />

              <ProfileInput
                className="!bg-[#101E2D] placeholder:text-[#6a768a]"
                label="Hourly Rate ($) (hourly_rate)"
                name="hourly_rate"
                type="number"
                placeholder="e.g. 25.50"
              />
              <ProfileInput
                className="!bg-[#101E2D] placeholder:text-[#6a768a]"
                label="Open To / Availability (open_to)"
                name="open_to"
                placeholder="e.g. FULL_TIME"
              />
            </div>
          </div>

          {/* Skills Section Card */}
          <div className="bg-[#0D1526] p-6 md:p-8 rounded-2xl border border-white/5 shadow-xl shadow-black/40 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <h2 className="text-white text-xl font-bold mb-6 flex items-center gap-2.5 tracking-tight relative z-10">
              <Award className="w-5 h-5 text-blue-400" />
              Skills & Expertise
            </h2>

            <div className="flex flex-col sm:flex-row gap-3 mb-6 relative z-10">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="e.g., Python, Django, REST API, React"
                className="flex-1 bg-[#101E2D] border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#6a768a] focus:border-blue-500 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
              />
              <Button
                type="button"
                onClick={addSkill}
                className="bg-blue-600 hover:bg-blue-700 h-[50px] px-8 rounded-xl w-full sm:w-auto shadow-lg shadow-blue-900/20 font-semibold text-white"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Skill
              </Button>
            </div>

            <div className="flex flex-wrap gap-2.5 relative z-10">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-[#101E2D] text-sm text-slate-200 px-4 py-2 rounded-xl flex items-center gap-2.5 border border-white/10 shadow-sm group/chip hover:border-blue-500/40 transition-colors"
                >
                  <span className="font-medium">{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-slate-400 hover:text-red-400 transition-colors p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Biography Card */}
          <div className="bg-[#0D1526] p-6 md:p-8 rounded-2xl border border-white/5 shadow-xl shadow-black/40 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <h2 className="text-white text-xl font-bold mb-6 flex items-center gap-2.5 tracking-tight relative z-10">
              <Sparkles className="w-5 h-5 text-blue-400" />
              Biography (bio)
            </h2>

            <div className="relative z-10">
              <ProfileInput
                className="!bg-[#101E2D] placeholder:text-[#6a768a]"
                label="Short Bio"
                name="bio"
                as="textarea"
                rows={4}
                placeholder="e.g. Backend developer specializing in Django REST APIs."
              />
              <div className="text-right text-xs text-slate-400 mt-2 font-medium">
                {form.watch("bio")?.length || 0} / 500 characters
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="border-white/10 hover:bg-white/5 text-white bg-transparent h-12 rounded-xl w-full sm:w-32 font-semibold transition-colors"
            >
              Reset
            </Button>
            <Button
              type="submit"
              disabled={isUpdating}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 h-12 rounded-xl px-8 w-full sm:w-auto shadow-lg shadow-blue-900/20 font-bold tracking-wide text-white transition-colors flex items-center justify-center gap-2"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
