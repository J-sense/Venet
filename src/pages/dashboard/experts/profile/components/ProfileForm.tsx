/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileInput } from "@/components/ui/profileInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import {
  useExpertProfileQuery,
  useUpdateExpertProfileMutation,
} from "@/redux/features/expertDashboard/expertProfile.api";
import { profileSchema, type ProfileFormData } from "../schemas/profileSchema";
import { formatApiErrorMessage, getImageUrl } from "../utils/profileUtils";
import AchievementsSection from "./achievements/AchievementsSection";
import CertificationsSection from "./certifications/CertificationsSection";
import EducationSection from "./education/EducationSection";
import SpecializationsSection from "./specializations/SpecializationsSection";

export default function ProfileForm() {
  const { data: expertProfileData, isLoading } =
    useExpertProfileQuery(undefined);
  const [updateExpertProfile, { isLoading: isUpdating }] =
    useUpdateExpertProfileMutation();
  const responseData = expertProfileData?.data;
  const userObj = responseData?.user;

  const [profilePic, setProfilePic] = React.useState<string | null>(null);
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      hourlyRate: "",
      yearsOfExperience: "",
      professionalTitle: "",
      specialty: "",
      aboutMe: "",
      specializations: [],
      certifications: [],
      achievements: [],
      educations: [],
    },
  });

  const { handleSubmit } = form;

  // Hydrate form fields when expertProfileData is fetched from API
  useEffect(() => {
    if (responseData || userObj) {
      const fName = userObj?.first_name || "";
      const lName = userObj?.last_name || "";
      const emailVal = userObj?.email || "";
      const phoneVal = userObj?.phone1 || "";
      const hourlyVal =
        userObj?.hourly_rate !== undefined && userObj?.hourly_rate !== null
          ? String(userObj.hourly_rate)
          : responseData?.hourly_rate !== undefined &&
              responseData?.hourly_rate !== null
            ? String(responseData.hourly_rate)
            : "";
      const yearsVal =
        userObj?.years_of_experience !== undefined &&
        userObj?.years_of_experience !== null
          ? String(userObj.years_of_experience)
          : responseData?.years_of_experience !== undefined &&
              responseData?.years_of_experience !== null
            ? String(responseData.years_of_experience)
            : "";
      const titleVal =
        responseData?.professional_title || userObj?.professional_title || "";
      const specialtyVal = userObj?.specialty || responseData?.specialty || "";
      const bioVal = userObj?.bio || responseData?.bio || "";

      const parsedCerts = Array.isArray(responseData?.certifications)
        ? responseData.certifications.map((c: any) => ({
            id: c.id,
            name: c.name || "Certificate",
            fileName: c.name || "Certificate",
            fileUrl: getImageUrl(c.file),
          }))
        : [];

      const parsedAch = Array.isArray(responseData?.achievements)
        ? responseData.achievements.map((a: any) => ({
            id: a.id,
            name: a.name || "Achievement",
            fileName: a.name || "Achievement",
            fileUrl: getImageUrl(a.file),
          }))
        : [];

      const rawEdu = responseData?.education || responseData?.educations;
      const parsedEdu = Array.isArray(rawEdu)
        ? rawEdu.map((e: any) => ({
            id: e.id,
            degree: e.degree || "",
            institution: e.institution || "",
            year: e.year !== undefined && e.year !== null ? String(e.year) : "",
            fileName: e.certificate ? "Uploaded Certificate" : "",
            fileUrl: getImageUrl(e.certificate),
          }))
        : [];

      form.reset({
        firstName: fName,
        lastName: lName,
        email: emailVal,
        phone: phoneVal,
        hourlyRate: hourlyVal,
        yearsOfExperience: yearsVal,
        professionalTitle: titleVal,
        specialty: specialtyVal,
        aboutMe: bioVal,
        specializations: Array.isArray(responseData?.specializations)
          ? responseData.specializations.map((s: any) => ({
              id: s.id,
              title: s.title || "",
              description: s.description || "",
            }))
          : [],
        certifications: parsedCerts,
        achievements: parsedAch,
        educations: parsedEdu,
      });

      const img =
        userObj?.image ||
        userObj?.profilePic ||
        responseData?.image ||
        responseData?.profilePic;
      if (img) {
        setProfilePic(img);
      }
    }
  }, [responseData, userObj, form]);

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    try {
      console.log(data, "get form data");
      const formData = new FormData();

      // 1. flat keys as specified in the Postman screenshot
      if (data.professionalTitle) {
        formData.append("professional_title", data.professionalTitle);
      }
      if (data.firstName) {
        formData.append("first_name", data.firstName);
      }
      if (data.lastName) {
        formData.append("last_name", data.lastName);
      }
      if (data.phone) {
        formData.append("phone1", data.phone);
      }
      if (data.specialty) {
        formData.append("specialty", data.specialty);
      }

      if (profilePicFile) {
        formData.append("image", profilePicFile);
      }

      if (
        data.yearsOfExperience &&
        String(data.yearsOfExperience).trim() !== ""
      ) {
        const cleanedYears = String(data.yearsOfExperience).replace(
          /[^0-9]/g,
          "",
        );
        if (cleanedYears) {
          formData.append("years_of_experience", cleanedYears);
        }
      }

      if (data.hourlyRate && String(data.hourlyRate).trim() !== "") {
        const cleanedHourly = String(data.hourlyRate).replace(/[^0-9.]/g, "");
        if (cleanedHourly && !isNaN(Number(cleanedHourly))) {
          formData.append("hourly_rate", cleanedHourly);
        }
      }

      if (data.aboutMe) {
        formData.append("bio", data.aboutMe);
      }
      formData.append("all_agreements_accepted", "true");

      // 3. (Specializations are sent to their own endpoints below instead of main profile PATCH)

      const res = await updateExpertProfile(formData).unwrap();

      if (res?.success) {
        toast.success(res.details || "Expert profile updated successfully!");
        setProfilePicFile(null);
      } else {
        toast.success("Expert profile saved successfully!");
      }
    } catch (err: any) {
      console.error("Failed to update expert profile:", err);
      toast.error(formatApiErrorMessage(err));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Display derived helper values
  const fName =
    userObj?.first_name || userObj?.firstName || responseData?.first_name || "";
  const lName =
    userObj?.last_name || userObj?.lastName || responseData?.last_name || "";
  const initials = `${fName?.[0] || "E"}${lName?.[0] || ""}`.toUpperCase();
  const currentAvatar =
    profilePic || getImageUrl(userObj?.image || responseData?.image);

  // Skeleton loading component
  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white p-8">
        <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
          <div className="bg-[#0D1526] rounded-2xl p-8 border border-white/5 h-36 flex items-center gap-6">
            <div className="w-24 h-24 rounded-[30px] bg-slate-800" />
            <div className="space-y-3 flex-1">
              <div className="h-6 bg-slate-800 rounded w-1/3" />
              <div className="h-4 bg-slate-800/60 rounded w-1/4" />
            </div>
          </div>
          <div className="bg-[#0F172A] p-8 rounded-2xl border border-white/5 h-96 space-y-6">
            <div className="h-6 bg-slate-800 rounded w-1/4 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 bg-slate-800/70 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white ">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}

        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Profile & Basic Information Card */}
            <Card className="bg-[#0D1526] border border-[#FFFFFF0F] rounded-2xl overflow-hidden relative shadow-lg shadow-black/25">
              {/* Futuristic ambient light glows */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

              <CardHeader className="relative z-10 border-b border-white/5 pb-5">
                <CardTitle className="text-white font-bold font-sora text-lg tracking-tight uppercase">
                  Profile & Basic Information
                </CardTitle>
                <p className="text-xs text-[#90A1B9]/70 leading-relaxed font-inter">
                  Manage your personal details, profile image, and bio
                </p>
              </CardHeader>

              <CardContent className="relative z-10 p-6 md:p-8 space-y-8">
                {/* Profile Photo Upload Row */}
                <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-white/5">
                  {/* Geometric Squircle Avatar Frame with glowing ring */}
                  <div className="relative group cursor-pointer shrink-0 select-none">
                    {/* Glow backdrop ring */}
                    <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#2B7FFF] via-[#9333EA] to-[#3B82F6] rounded-[32px] blur-md opacity-60 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />

                    {/* Profile Picture Container */}
                    <div className="relative w-28 h-28 bg-[#070D19] p-1.5 rounded-[30px] overflow-hidden z-10 border border-white/10">
                      <div className="w-full h-full rounded-[24px] overflow-hidden relative bg-zinc-800">
                        {currentAvatar ? (
                          <img
                            key={currentAvatar}
                            src={currentAvatar}
                            alt="Avatar"
                            className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                            onError={(e) => {
                              (e.currentTarget as HTMLElement).style.display =
                                "none";
                              const fallbackEl =
                                e.currentTarget.parentElement?.querySelector(
                                  ".avatar-fallback-text",
                                );
                              if (fallbackEl)
                                (fallbackEl as HTMLElement).style.display =
                                  "flex";
                            }}
                          />
                        ) : null}
                        <div
                          className={`avatar-fallback-text w-full h-full items-center justify-center bg-gradient-to-b from-zinc-700 to-zinc-900 text-[#90A1B9] text-xl font-bold font-sora ${
                            currentAvatar ? "hidden" : "flex"
                          }`}
                        >
                          {initials}
                        </div>

                        {/* Hover Overlay Trigger */}
                        <div className="absolute inset-0 bg-[#070D19]/80 backdrop-blur-[1px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Camera size={20} className="text-white mb-1" />
                          <span className="text-[9px] font-bold text-white uppercase tracking-wider font-inter">
                            Change
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Hidden input overlaying the whole image container */}
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                      onChange={handleImageUpload}
                    />
                  </div>

                  {/* Metadata and Manual Buttons */}
                  <div className="flex-1 text-center md:text-left space-y-2">
                    <h4 className="text-white font-bold font-sora text-sm tracking-tight">
                      Profile Photo
                    </h4>
                    <p className="text-xs text-[#90A1B9]/70 leading-relaxed font-inter max-w-sm">
                      Upload a high-quality, professional headshot. Supports
                      JPG, PNG or WEBP formats (max 5MB).
                    </p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                      <label className="bg-[#1E293B] hover:bg-zinc-800 border border-white/10 text-white text-xs px-4 py-2.5 rounded-xl cursor-pointer font-semibold transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-1.5 select-none">
                        Choose File
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>

                      {profilePic && (
                        <button
                          type="button"
                          onClick={() => {
                            setProfilePic(null);
                            setProfilePicFile(null);
                          }}
                          className="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3.5 py-2 rounded-xl transition-all duration-200 font-semibold"
                        >
                          Remove Image
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Form Inputs Grid */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProfileInput
                      name="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                    />
                    <ProfileInput
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <ProfileInput
                    name="email"
                    label="Email Address"
                    type="email"
                    showLeftIcon
                    placeholder="you@example.com"
                    disabled={true}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ProfileInput
                      name="phone"
                      label="Phone Number"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                    />
                    <ProfileInput
                      name="professionalTitle"
                      label="Professional Title"
                      placeholder="e.g. Senior Backend Developer"
                    />
                    <ProfileInput
                      name="specialty"
                      label="Specialty"
                      placeholder="e.g. Clinical Psychology"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProfileInput
                      name="yearsOfExperience"
                      label="Years of Experience"
                      type="number"
                      placeholder="e.g. 5"
                    />
                    <ProfileInput
                      name="hourlyRate"
                      label="Hourly Rate ($)"
                      type="number"
                      placeholder="e.g. 50"
                    />
                  </div>
                  <ProfileInput
                    name="aboutMe"
                    label="About Me"
                    as="textarea"
                    rows={6}
                    placeholder="Write a brief professional summary about yourself, your experience, and what you specialize in..."
                  />
                </div>

                {/* Save Changes Button Inside this card */}
                <div className="flex justify-end pt-4 border-t border-white/5">
                  <Button
                    type="submit"
                    disabled={isUpdating}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 h-12 rounded-xl px-8 shadow-lg shadow-blue-900/20 font-bold tracking-wide text-white transition-colors flex items-center justify-center gap-2"
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
              </CardContent>
            </Card>

            {/* Specializations */}
            <SpecializationsSection />

            {/* Certifications */}
            <CertificationsSection />

            {/* Achievements */}
            <AchievementsSection />

            {/* Education */}
            <EducationSection />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
