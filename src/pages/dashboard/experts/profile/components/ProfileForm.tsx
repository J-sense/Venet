// /home/workdir/artifacts/ProfileForm.tsx
"use client";

import { ActionButton } from "@/components/ui/ActionButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BlackActionButton } from "@/components/ui/BlackActionButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileInput } from "@/components/ui/profileInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, Upload } from "lucide-react";
import React, { useState } from "react";
import { FormProvider, useFieldArray, useForm, type SubmitHandler } from "react-hook-form";

import { profileSchema, type ProfileFormData } from "../schemas/profileSchema";

export default function ProfileForm() {
  const [profilePic, setProfilePic] = React.useState<string | null>(null);
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
      aboutMe: "",
      specializations: [{ title: "", description: "" }],
      certifications: [],
      achievements: [],
      educations: [],
    },
  });

  const { handleSubmit, control, setValue } = form;

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

  const onSubmit: SubmitHandler<ProfileFormData> = (data) => {
    console.log("Submitted Data:", data);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}

        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Profile Picture */}
            <Card className="bg-[#09090B] border-none">
              <CardContent className="pt-6 flex flex-col items-center">
                <div className="relative mb-4">
                  <Avatar className="w-24 h-24 border-2 border-zinc-700">
                    <AvatarImage src={profilePic || ""} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <label className="absolute -bottom-1 -right-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-full cursor-pointer">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
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
                <div className="grid grid-cols-2 gap-6">
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
                />
                <ProfileInput
                  name="phone"
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                />
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
                  <CardTitle className="text-white font-semibold">
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
                  <Plus className="w-4 h-4 mr-2" /> Add
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {specFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="bg-[#334155] border-none rounded-xl p-5 relative"
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
                {certFields.map((field, index) => (
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
                    {certFiles[index] && (
                      <div className="mt-4 p-3 bg-zinc-800 rounded-lg flex items-center gap-3">
                        <div className="text-green-400">✓</div>
                        <div className="text-sm text-white truncate">
                          {certFiles[index].name}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
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
                {achieveFields.map((field, index) => (
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
                    {achievementFiles[index] && (
                      <div className="mt-4 p-3 bg-zinc-800 rounded-lg flex items-center gap-3">
                        <div className="text-green-400">✓</div>
                        <div className="text-sm text-white truncate">
                          {achievementFiles[index].name}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
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
                {eduFields.map((field, index) => (
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
                      {eduFiles[index] && (
                        <div className="mt-3 p-3 bg-zinc-800 rounded-lg flex items-center gap-3">
                          <div className="text-green-400">✓</div>
                          <div className="text-sm text-white truncate">
                            {eduFiles[index].name}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {eduFields.length === 0 && (
                  <div className="text-center py-16 text-zinc-500">
                    No education added yet.
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4 pt-4">
              <BlackActionButton label="           Cancel" />

              <ActionButton label="   Save Changes" />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
