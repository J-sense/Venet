// /home/workdir/artifacts/ProfileForm.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileInput } from "@/components/ui/profileInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Loader2, Plus, Trash2, Upload, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import { toast } from "sonner";

import {
  useExpertProfileQuery,
  useUpdateExpertProfileMutation,
} from "@/redux/features/expertDashboard/expertProfile.api";
import { profileSchema, type ProfileFormData } from "../schemas/profileSchema";

export default function ProfileForm() {
  const { data: expertProfileData, isLoading } =
    useExpertProfileQuery(undefined);
  const [updateExpertProfile, { isLoading: isUpdating }] =
    useUpdateExpertProfileMutation();

  const responseData = expertProfileData?.data;
  const userObj = responseData?.user;

  const [profilePic, setProfilePic] = React.useState<string | null>(null);
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [certFiles, setCertFiles] = useState<Record<number, File>>({});
  const [achievementFiles, setAchievementFiles] = useState<
    Record<number, File>
  >({});
  const [eduFiles, setEduFiles] = useState<Record<number, File>>({});

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
      aboutMe: "",
      specializations: [{ title: "", description: "" }],
      certifications: [],
      achievements: [],
      educations: [],
    },
  });

  const { handleSubmit, control, setValue } = form;

  // Hydrate form fields when expertProfileData is fetched from API
  useEffect(() => {
    if (responseData || userObj) {
      const fName =
        userObj?.first_name ||
        userObj?.firstName ||
        responseData?.first_name ||
        "";
      const lName =
        userObj?.last_name ||
        userObj?.lastName ||
        responseData?.last_name ||
        "";
      const emailVal = userObj?.email || responseData?.email || "";
      const phoneVal =
        userObj?.phone1 ||
        userObj?.phone ||
        responseData?.phone1 ||
        responseData?.phone ||
        "";
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
        responseData?.professional_title || userObj?.specialty || "";
      const bioVal =
        userObj?.bio ||
        responseData?.bio ||
        responseData?.about_me ||
        responseData?.aboutMe ||
        "";

      const parsedCerts = Array.isArray(responseData?.certifications)
        ? responseData.certifications.map((c: any) => ({
          name: c.name || "Certificate",
          fileName: c.name || "Certificate",
          fileUrl: getImageUrl(c.file),
        }))
        : [];

      const parsedAch = Array.isArray(responseData?.achievements)
        ? responseData.achievements.map((a: any) => ({
          name: a.name || "Achievement",
          fileName: a.name || "Achievement",
          fileUrl: getImageUrl(a.file),
        }))
        : [];

      const rawEdu = responseData?.education || responseData?.educations;
      const parsedEdu = Array.isArray(rawEdu)
        ? rawEdu.map((e: any) => ({
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
        aboutMe: bioVal,
        specializations:
          Array.isArray(responseData?.specializations) &&
            responseData.specializations.length > 0
            ? responseData.specializations.map((s: any) => ({
              title: s.title || "",
              description: s.description || "",
            }))
            : titleVal
              ? [{ title: titleVal, description: "" }]
              : [{ title: "", description: "" }],
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

  const {
    fields: specFields,
    append: appendSpec,
    remove: removeSpec,
  } = useFieldArray({ control, name: "specializations" });

  const {
    fields: certFields,
    append: appendCert,
    remove: removeCert,
  } = useFieldArray({ control, name: "certifications" });

  const {
    fields: achieveFields,
    append: appendAchievement,
    remove: removeAchievement,
  } = useFieldArray({ control, name: "achievements" });

  const {
    fields: eduFields,
    append: appendEdu,
    remove: removeEdu,
  } = useFieldArray({ control, name: "educations" });

  const formatApiErrorMessage = (err: any): string => {
    if (!err) return "Failed to update profile. Please check your inputs.";

    const rawDetails =
      err?.data?.details ?? err?.details ?? err?.data?.message ?? err?.message;

    if (!rawDetails) return "Failed to update profile. Please try again.";

    let strVal = "";
    if (typeof rawDetails === "string") {
      strVal = rawDetails;
    } else if (typeof rawDetails === "object") {
      strVal = JSON.stringify(rawDetails);
    }

    if (
      strVal.includes("hourly_rate") &&
      (strVal.includes("valid number") || strVal.includes("invalid"))
    ) {
      return "A valid number is required for Hourly Rate (e.g. 45.00).";
    }
    if (strVal.includes("years_of_experience")) {
      return "A valid number is required for Years of Experience.";
    }

    if (typeof rawDetails === "string") {
      return rawDetails;
    }

    if (typeof rawDetails === "object" && rawDetails !== null) {
      const errorMessages: string[] = [];
      Object.entries(rawDetails).forEach(([k, v]) => {
        const valText = typeof v === "string" ? v : JSON.stringify(v);
        errorMessages.push(`${k}: ${valText}`);
      });
      if (errorMessages.length > 0) return errorMessages.join(" | ");
    }

    return "Failed to update profile. Please try again.";
  };

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    try {
      const formData = new FormData();

      // 1. professional_title
      if (data.professionalTitle) {
        formData.append("professional_title", data.professionalTitle);
      }

      // 2. user[...] keys as specified in Postman
      if (data.firstName) formData.append("user[first_name]", data.firstName);
      if (data.lastName) formData.append("user[last_name]", data.lastName);
      if (profilePicFile) {
        formData.append("user[image]", profilePicFile);
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
          formData.append("user[years_of_experience]", cleanedYears);
        }
      }

      if (data.hourlyRate && String(data.hourlyRate).trim() !== "") {
        const cleanedHourly = String(data.hourlyRate).replace(/[^0-9.]/g, "");
        if (cleanedHourly && !isNaN(Number(cleanedHourly))) {
          formData.append("user[hourly_rate]", cleanedHourly);
        }
      }

      if (data.aboutMe) {
        formData.append("user[bio]", data.aboutMe);
      }
      formData.append("user[all_agreements_accepted]", "true");

      // 3. specializations[i][...] keys
      if (data.specializations && data.specializations.length > 0) {
        data.specializations.forEach((spec, index) => {
          if (spec.title) {
            formData.append(`specializations[${index}][title]`, spec.title);
          }
          if (spec.description) {
            formData.append(
              `specializations[${index}][description]`,
              spec.description,
            );
          }
          formData.append(`specializations[${index}][order]`, String(index));
        });
      }

      // 4. certifications[i][...] keys
      if (data.certifications && data.certifications.length > 0) {
        data.certifications.forEach((cert, index) => {
          const name =
            cert.fileName || (cert as any).name || `Certification ${index + 1}`;
          formData.append(`certifications[${index}][name]`, name);
          const fileObj = certFiles[index] || cert.file;
          if (fileObj && fileObj instanceof File) {
            formData.append(`certifications[${index}][file]`, fileObj);
          }
        });
      }

      // 5. achievements[i][...] keys
      if (data.achievements && data.achievements.length > 0) {
        data.achievements.forEach((ach, index) => {
          const name =
            ach.fileName || (ach as any).name || `Achievement ${index + 1}`;
          formData.append(`achievements[${index}][name]`, name);
          const fileObj = achievementFiles[index] || ach.file;
          if (fileObj && fileObj instanceof File) {
            formData.append(`achievements[${index}][file]`, fileObj);
          }
        });
      }

      // 6. education[i][...] keys
      if (data.educations && data.educations.length > 0) {
        data.educations.forEach((edu, index) => {
          if (edu.degree) {
            formData.append(`education[${index}][degree]`, edu.degree);
          }
          if (edu.institution) {
            formData.append(
              `education[${index}][institution]`,
              edu.institution,
            );
          }
          if (edu.year) {
            formData.append(`education[${index}][year]`, edu.year);
          }
          const fileObj = eduFiles[index] || edu.file;
          if (fileObj && fileObj instanceof File) {
            formData.append(`education[${index}][certificate]`, fileObj);
          }
          formData.append(`education[${index}][order]`, String(index));
        });
      }

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

  const handleCertUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setCertFiles((prev) => ({ ...prev, [index]: file }));
      setValue(`certifications.${index}.fileName`, file.name);
      setValue(`certifications.${index}.file`, file);
    }
  };

  const handleAchievementUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setAchievementFiles((prev) => ({ ...prev, [index]: file }));
      setValue(`achievements.${index}.fileName`, file.name);
      setValue(`achievements.${index}.file`, file);
    }
  };

  const handleEduUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setEduFiles((prev) => ({ ...prev, [index]: file }));
      setValue(`educations.${index}.fileName`, file.name);
      setValue(`educations.${index}.file`, file);
    }
  };

  const handleRemoveCertFile = (index: number) => {
    setCertFiles((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
    setValue(`certifications.${index}.fileUrl`, null);
    setValue(`certifications.${index}.file`, null);
    setValue(`certifications.${index}.fileName`, "");
  };

  const handleRemoveAchievementFile = (index: number) => {
    setAchievementFiles((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
    setValue(`achievements.${index}.fileUrl`, null);
    setValue(`achievements.${index}.file`, null);
    setValue(`achievements.${index}.fileName`, "");
  };

  const handleRemoveEduFile = (index: number) => {
    setEduFiles((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
    setValue(`educations.${index}.fileUrl`, null);
    setValue(`educations.${index}.file`, null);
    setValue(`educations.${index}.certificate`, null);
    setValue(`educations.${index}.fileName`, "");
  };

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
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}

        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Profile Picture */}
            <Card className="bg-[#0D1526] border border-[#FFFFFF0F] rounded-2xl overflow-hidden relative shadow-lg shadow-black/25">
              {/* Futuristic ambient light glows */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

              <CardContent className="relative z-10 p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
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
                          className={`avatar-fallback-text w-full h-full items-center justify-center bg-gradient-to-b from-zinc-700 to-zinc-900 text-[#90A1B9] text-xl font-bold font-sora ${currentAvatar ? "hidden" : "flex"
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
                    <h4 className="text-white font-bold font-sora text-lg tracking-tight">
                      Expert Profile Photo
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
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card className="bg-[#0F172A] border-none">
              <CardHeader>
                <CardTitle className="text-white font-semibold">
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    type="text"
                    placeholder="e.g. 45.00"
                  />
                </div>
              </CardContent>
            </Card>

            {/* About Me */}
            <Card className="bg-[#0F172A] border-none">
              <CardHeader>
                <CardTitle className="text-white font-semibold">
                  About Me
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProfileInput
                  name="aboutMe"
                  label=""
                  as="textarea"
                  rows={6}
                  placeholder="Write a brief professional summary about yourself, your experience, and what you specialize in..."
                />
              </CardContent>
            </Card>

            {/* Specializations */}
            <Card className="bg-[#0F172A] border-none">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white font-semibold uppercase">
                    Specializations
                  </CardTitle>
                  <p className="text-sm text-zinc-400 mt-1">
                    Manage your areas of expertise
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={() => appendSpec({ title: "", description: "" })}
                  className="bg-[rgba(59,130,246,0.2)] hover:bg-blue-200 text-[#0A66C2]"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Specialization
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {specFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 relative"
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-4 right-4 text-red-400"
                      onClick={() => removeSpec(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <div className="space-y-4">
                      <ProfileInput
                        name={`specializations.${index}.title`}
                        label="Title"
                        placeholder="e.g. Leadership Development, Executive Coaching"
                      />
                      <ProfileInput
                        name={`specializations.${index}.description`}
                        label="Description"
                        as="textarea"
                        rows={3}
                        placeholder="Describe this specialization, your approach, and the value you provide..."
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="bg-[#0F172A] border-none">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white font-semibold uppercase">
                    Certifications
                  </CardTitle>
                  <p className="text-sm text-zinc-400 mt-1">
                    Upload your certificates (JPG, PNG, PDF)
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={() => appendCert({})}
                  className="bg-[rgba(59,130,246,0.2)] hover:bg-blue-200 text-[#0A66C2]"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Certificate
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {certFields.map((field, index) => {
                  const currentCert = form.watch(
                    `certifications.${index}`,
                  ) as any;
                  const uploadedFile = certFiles[index];
                  const fileUrl = uploadedFile
                    ? null
                    : getImageUrl(currentCert?.fileUrl || currentCert?.file);
                  const fileName =
                    uploadedFile?.name ||
                    currentCert?.fileName ||
                    currentCert?.name ||
                    "Uploaded Certificate";

                  return (
                    <div
                      key={field.id}
                      className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 relative"
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 text-red-400"
                        onClick={() => removeCert(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <label className="flex flex-col items-center justify-center border border-dashed border-zinc-600 hover:border-blue-500 transition-colors rounded-xl p-10 cursor-pointer bg-zinc-950">
                        <Upload className="w-10 h-10 text-zinc-400 mb-4" />
                        <p className="text-white font-medium">
                          Click to upload certificate
                        </p>
                        <p className="text-zinc-500 text-sm mt-1">
                          JPG, PNG or PDF • Max 10MB
                        </p>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,application/pdf"
                          className="hidden"
                          onChange={(e) => handleCertUpload(index, e)}
                        />
                      </label>
                      {(uploadedFile || fileUrl) && (
                        <div className="mt-4 p-3 bg-zinc-800 rounded-lg flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 truncate min-w-0">
                            <div className="text-green-400 shrink-0">✓</div>
                            <div className="text-sm text-white truncate">
                              {fileName}
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            {fileUrl && (
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-400 hover:underline font-medium"
                              >
                                View File
                              </a>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveCertFile(index)}
                              className="p-1 text-zinc-400 hover:text-red-400 hover:bg-zinc-700/50 rounded-lg transition-colors"
                              title="Remove file"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                {certFields.length === 0 && (
                  <div className="text-center py-16 text-zinc-500">
                    No certificates uploaded yet.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-[#0F172A] border-none">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white font-semibold uppercase">
                    Achievements
                  </CardTitle>
                  <p className="text-sm text-zinc-400 mt-1">
                    Upload your achievements, awards (JPG, PNG, PDF)
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={() => appendAchievement({})}
                  className="bg-[rgba(59,130,246,0.2)] hover:bg-blue-200 text-[#0A66C2]"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Achievement
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {achieveFields.map((field, index) => {
                  const currentAch = form.watch(`achievements.${index}`) as any;
                  const uploadedFile = achievementFiles[index];
                  const fileUrl = uploadedFile
                    ? null
                    : getImageUrl(currentAch?.fileUrl || currentAch?.file);
                  const fileName =
                    uploadedFile?.name ||
                    currentAch?.fileName ||
                    currentAch?.name ||
                    "Uploaded Achievement";

                  return (
                    <div
                      key={field.id}
                      className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 relative"
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 text-red-400"
                        onClick={() => removeAchievement(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <label className="border border-dashed border-zinc-600 hover:border-blue-500 transition-colors rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer bg-zinc-950">
                        <Upload className="w-10 h-10 text-zinc-400 mb-4" />
                        <p className="text-white font-medium">
                          Click to upload achievement
                        </p>
                        <p className="text-zinc-500 text-sm mt-1">
                          JPG, PNG or PDF • Max 10MB
                        </p>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,application/pdf"
                          className="hidden"
                          onChange={(e) => handleAchievementUpload(index, e)}
                        />
                      </label>
                      {(uploadedFile || fileUrl) && (
                        <div className="mt-4 p-3 bg-zinc-800 rounded-lg flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 truncate min-w-0">
                            <div className="text-green-400 shrink-0">✓</div>
                            <div className="text-sm text-white truncate">
                              {fileName}
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            {fileUrl && (
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-400 hover:underline font-medium"
                              >
                                View File
                              </a>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveAchievementFile(index)}
                              className="p-1 text-zinc-400 hover:text-red-400 hover:bg-zinc-700/50 rounded-lg transition-colors"
                              title="Remove file"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                {achieveFields.length === 0 && (
                  <div className="text-center py-16 text-zinc-500">
                    No achievements uploaded yet.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="bg-[#0F172A] border-none">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white font-semibold uppercase">
                    Education
                  </CardTitle>
                  <p className="text-sm text-zinc-400 mt-1">
                    Add your educational qualifications
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={() =>
                    appendEdu({ degree: "", institution: "", year: "" })
                  }
                  className="bg-[rgba(59,130,246,0.2)] hover:bg-blue-200 text-[#0A66C2]"
                >
                  <Plus className="w-4 h-4 mr-2" color="#0A66C2" /> Add
                  Education
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {eduFields.map((field, index) => {
                  const currentEdu = form.watch(`educations.${index}`) as any;
                  const uploadedFile = eduFiles[index];
                  const fileUrl = uploadedFile
                    ? null
                    : getImageUrl(
                      currentEdu?.fileUrl || currentEdu?.certificate,
                    );
                  const fileName =
                    uploadedFile?.name ||
                    currentEdu?.fileName ||
                    (fileUrl ? "Uploaded Certificate" : "");

                  return (
                    <div
                      key={field.id}
                      className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 relative"
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 text-red-400"
                        onClick={() => removeEdu(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <ProfileInput
                          name={`educations.${index}.degree`}
                          label="Degree / Qualification"
                          placeholder="e.g. PhD in Clinical Psychology, MBA, Master of Arts"
                        />
                        <ProfileInput
                          name={`educations.${index}.institution`}
                          label="Institution"
                          placeholder="e.g. Harvard University, Stanford, University of Oxford"
                        />
                        <ProfileInput
                          name={`educations.${index}.year`}
                          label="Year"
                          placeholder="e.g. 2022, 2019-2023"
                          type="text"
                        />
                      </div>

                      <div className="mt-6">
                        <label className="text-[#94A3B8] text-sm font-medium block mb-2">
                          Certificate (Optional)
                        </label>
                        <label className="border border-dashed border-zinc-600 hover:border-blue-500 transition-colors rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer bg-zinc-950">
                          <Upload className="w-8 h-8 text-zinc-400 mb-3" />
                          <p className="text-white text-sm">
                            Upload certificate / transcript
                          </p>
                          <p className="text-zinc-500 text-xs mt-1">
                            JPG, PNG or PDF
                          </p>
                          <input
                            type="file"
                            accept="image/jpeg,image/png,application/pdf"
                            className="hidden"
                            onChange={(e) => handleEduUpload(index, e)}
                          />
                        </label>
                        {(uploadedFile || fileUrl) && (
                          <div className="mt-3 p-3 bg-zinc-800 rounded-lg flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 truncate min-w-0">
                              <div className="text-green-400 shrink-0">✓</div>
                              <div className="text-sm text-white truncate">
                                {fileName}
                              </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              {fileUrl && (
                                <a
                                  href={fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-400 hover:underline font-medium"
                                >
                                  View Certificate
                                </a>
                              )}
                              <button
                                type="button"
                                onClick={() => handleRemoveEduFile(index)}
                                className="p-1 text-zinc-400 hover:text-red-400 hover:bg-zinc-700/50 rounded-lg transition-colors"
                                title="Remove certificate"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                {eduFields.length === 0 && (
                  <div className="text-center py-16 text-zinc-500">
                    No education added yet.
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-end pt-4">
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
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
