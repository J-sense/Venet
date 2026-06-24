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
      <div className="bg-[#1A2333] rounded-2xl p-6 flex items-center gap-5 border border-white/5">
        <Avatar className="w-20 h-20 border-2 border-[#0A66C2]">
          <AvatarImage src={profilePic} />
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-semibold text-[#D4E4FA]">Alex Mercer</h1>
          <p className="text-[#BDC9C6]">Senior Wellness Architect</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Profile Information */}
          <div className="bg-[#111827B2]/70 p-8 rounded-2xl border border-white/5">
            <h2 className="text-white text-xl font-semibold mb-6 flex gap-2 items-center">
              <User color="#0A66C2" />
              Profile Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <div className="bg-[#111827B2]/70 p-8 rounded-2xl border border-white/5">
            <h2 className="text-white text-xl font-semibold mb-6">Skills</h2>

            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="e.g., React, Figma, UI/UX"
                className="flex-1 bg-[#1F2937] border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:border-blue-500"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addSkill())
                }
              />
              <Button
                type="button"
                onClick={addSkill}
                className="bg-blue-600 hover:bg-blue-700 px-6"
              >
                <Plus className="w-4 h-4 mr-2" /> Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-[#1E2937] text-sm text-white px-4 py-2 rounded-full flex items-center gap-2 border border-zinc-700"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-zinc-400 hover:text-red-400"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Biography */}
          <div className="bg-[#111827B2]/70 p-8 rounded-2xl border border-white/5">
            <h2 className="text-white text-xl font-semibold mb-6">Biography</h2>

            <ProfileInput
              className="!bg-[#101E2D] placeholder:text-[#6a768a]"
              label="Short Bio"
              name="shortBio"
              as="textarea"
              rows={5}
              placeholder="Pioneering AI-driven wellness solutions for the modern workforce..."
            />
            <div className="text-right text-xs text-zinc-500 mt-2">
              {form.watch("shortBio")?.length || 0} / 500 characters
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="border-zinc-700 hover:bg-zinc-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-8"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
