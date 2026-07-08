// /home/workdir/artifacts/UserAccountForm.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ProfileInput } from "@/components/ui/profileInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, User, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Validation Schema
const profileSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  specialist: z.string().min(1, "Specialist field is required"),
  location: z.string().min(1, "Location is required"),
  openTo: z.string().min(1, "Please select availability"),
  shortBio: z.string().max(500, "Bio must be under 500 characters"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function UserAccountForm() {
  const [skills, setSkills] = useState<string[]>([
    "React",
    "Figma",
    "UI/UX",
    "TypeScript",
    "Adobe XD",
    "Node.js",
  ]);
  const [newSkill, setNewSkill] = useState("");
  const [profilePic] = useState("https://i.pravatar.cc/150?u=alexmercer"); // Replace with real image

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "Alex Mercer",
      email: "alex.mercer@vnet.ai",
      phone: "+1 (555) 019-2834",
      specialist:
        "Health & Wellness Professional, Career Development Specialist",
      location: "New York, NY",
      openTo: "Available",
      shortBio:
        "Pioneering AI-driven wellness solutions for the modern workforce. Focusing on the intersection of cognitive load management and career longevity.",
    },
  });

  const onSubmit = (values: ProfileFormData) => {
    console.log("Submitted Data:", { ...values, skills });
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

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-[#0D1526] rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 border border-white/5 shadow-xl shadow-black/40 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <Avatar className="w-24 h-24 sm:w-20 sm:h-20 border-4 border-[#0A66C2] shadow-lg shrink-0">
          <AvatarImage src={profilePic} />
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center h-full mt-2 sm:mt-0">
          <h1 className="text-2xl font-bold text-white tracking-tight">Alex Mercer</h1>
          <p className="text-blue-400 font-medium">Senior Wellness Architect</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Profile Information */}
          <div className="bg-[#0D1526] p-6 md:p-8 rounded-2xl border border-white/5 shadow-xl shadow-black/40 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <h2 className="text-white text-xl font-bold mb-6 flex gap-2 items-center tracking-tight">
              <User className="text-blue-400 w-6 h-6" />
              Profile Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <ProfileInput
                className="!bg-[#101E2D] placeholder:text-[#6a768a]"
                label="Full Name"
                name="fullName"
                placeholder="Alex Mercer"
              />
              <ProfileInput
                className="!bg-[#101E2D] placeholder:text-[#6a768a]"
                label="Email Address"
                name="email"
                type="email"
                placeholder="alex.mercer@vnet.ai"
              />

              <ProfileInput
                className="!bg-[#101E2D] placeholder:text-[#6a768a]"
                label="Phone Number"
                name="phone"
                placeholder="+1 (555) 019-2834"
              />
              <ProfileInput
                className="!bg-[#101E2D] placeholder:text-[#6a768a]"
                label="Specialist"
                name="specialist"
                placeholder="Health & Wellness Professional"
              />

              <ProfileInput
                className="!bg-[#101E2D] placeholder:text-[#6a768a]"
                label="Location"
                name="location"
                placeholder="New York, NY"
              />
              <ProfileInput
                className="!bg-[#101E2D] placeholder:text-[#6a768a]"
                label="Open to"
                name="openTo"
                placeholder="Available"
              />
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-[#0D1526] p-6 md:p-8 rounded-2xl border border-white/5 shadow-xl shadow-black/40 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <h2 className="text-white text-xl font-bold mb-6 tracking-tight relative z-10">Skills</h2>

            <div className="flex flex-col sm:flex-row gap-3 mb-6 relative z-10">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="e.g., React, Figma, UI/UX"
                className="flex-1 bg-[#101E2D] border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-[#6a768a] focus:border-blue-500 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addSkill())
                }
              />
              <Button
                type="button"
                onClick={addSkill}
                className="bg-blue-600 hover:bg-blue-700 h-[50px] px-8 rounded-xl w-full sm:w-auto shadow-lg shadow-blue-900/20 font-semibold"
              >
                <Plus className="w-4 h-4 mr-2" /> Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 relative z-10">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-[#101E2D] text-sm text-zinc-200 px-4 py-2 rounded-full flex items-center gap-2 border border-white/10 shadow-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Biography */}
          <div className="bg-[#0D1526] p-6 md:p-8 rounded-2xl border border-white/5 shadow-xl shadow-black/40 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <h2 className="text-white text-xl font-bold mb-6 tracking-tight relative z-10">Biography</h2>

            <div className="relative z-10">
              <ProfileInput
                className="!bg-[#101E2D] placeholder:text-[#6a768a]"
                label="Short Bio"
                name="shortBio"
                as="textarea"
                rows={5}
                placeholder="Pioneering AI-driven wellness solutions for the modern workforce..."
              />
              <div className="text-right text-xs text-zinc-500 mt-2 font-medium">
                {form.watch("shortBio")?.length || 0} / 500 characters
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-2">
            <Button
              type="button"
              variant="outline"
              className="border-white/10 hover:bg-white/5 text-white bg-transparent h-12 rounded-xl w-full sm:w-32 font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 h-12 rounded-xl px-8 w-full sm:w-auto shadow-lg shadow-blue-900/20 font-bold tracking-wide"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
