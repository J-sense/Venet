// /home/workdir/artifacts/TalentPortalUnlocked.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, FileText, Edit3, MapPin, Briefcase } from "lucide-react";

export default function TalentPortalUnlocked() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* LEFT SIDE - 70% */}
          <div className="xl:col-span-8 space-y-6">
            {/* Profile Header with Top Blue Gradient */}
            <Card className="bg-[#0D1526] border-[#FFFFFF0F] overflow-hidden p-0">
              {/* Full-width Blue Gradient Header */}
              <div className="h-28 bg-gradient-to-r from-[#1E40AF] via-[#3B82F6] to-[#1E40AF] relative">
                <div className="absolute -bottom-12 left-8 w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-5xl border-[6px] border-[#0D1526] shadow-xl">
                  👨‍💼
                </div>
              </div>

              <CardContent className="pt-16 pb-8 px-8">
                <div className="pl-2">
                  <h1 className="text-3xl font-bold text-white">John Doe</h1>

                  <p className="text-blue-400 text-lg mt-1">
                    Health & Wellness Professional • Career Development
                    Specialist
                  </p>

                  {/* Location & Open to */}
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm">
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <MapPin className="w-4 h-4" />
                      New York, NY
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <Briefcase className="w-4 h-4" />
                      Open to opportunities
                    </div>
                  </div>

                  {/* Skills & Certifications */}
                  <div className="mt-8">
                    <h3 className="text-[11px] text-[#62748E] font-semibold mb-3 uppercase tracking-widest">
                      SKILLS & CERTIFICATIONS
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-[#8E51FF26] hover:bg-[#8E51FF30] text-[#C4B4FF] border border-[#8E51FF40] px-4 py-1.5 text-sm">
                        Mental Health Program
                      </Badge>
                      <Badge className="bg-[#F59E0B26] hover:bg-[#F59E0B30] text-[#FCD34D] border border-[#F59E0B40] px-4 py-1.5 text-sm">
                        Educational Services
                      </Badge>
                      <Badge className="bg-[#EA580C26] hover:bg-[#EA580C30] text-[#FDBA74] border border-[#EA580C40] px-4 py-1.5 text-sm">
                        Career Coaching
                      </Badge>
                    </div>
                  </div>

                  {/* About */}
                  <div className="mt-8">
                    <h3 className="text-[11px] text-[#62748E] font-semibold mb-3 uppercase tracking-widest">
                      ABOUT
                    </h3>
                    <p className="text-[#CAD5E2] leading-relaxed text-[15px]">
                      Passionate health and wellness professional with
                      certifications in mental health programs and fitness
                      coaching. Dedicated to helping individuals achieve their
                      personal and professional goals through evidence-based
                      approaches.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Jobs */}
            <Card className="bg-zinc-900 border-zinc-700">
              <CardContent className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Recommended Jobs</h2>
                  <Button
                    variant="link"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    View All <ArrowRight className="ml-1 w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "Senior Software Engineer",
                      company: "Tech Corp",
                      salary: "$120k - $150k",
                      match: "95%",
                    },
                    {
                      title: "Product Designer",
                      company: "Innovate Labs",
                      salary: "$95k - $115k",
                      match: "87%",
                    },
                    {
                      title: "UX Researcher",
                      company: "HealthFlow",
                      salary: "$85k - $105k",
                      match: "82%",
                    },
                  ].map((job, i) => (
                    <div
                      key={i}
                      className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-blue-500/50 transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-lg">{job.title}</p>
                        <p className="text-zinc-400">{job.company}</p>
                        <p className="text-emerald-400 text-sm mt-1">
                          {job.salary}
                        </p>
                      </div>
                      <div className="flex flex-col md:items-end gap-3">
                        <div className="text-emerald-400 font-bold text-lg">
                          {job.match} Match
                        </div>
                        <Button>Apply Now</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT SIDE - 30% */}
          <div className="xl:col-span-4 space-y-6">
            {/* Resume Builder */}
            <Card className="bg-zinc-900 border-zinc-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Resume Builder</h3>
                    <p className="text-sm text-zinc-400">
                      Create a professional resume showcasing your vNET
                      certifications and achievements.
                    </p>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Build Resume
                </Button>
              </CardContent>
            </Card>

            {/* Cover Letter Generator */}
            <Card className="bg-zinc-900 border-zinc-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-600/10 rounded-xl flex items-center justify-center">
                    <Edit3 className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Cover Letter Generator</h3>
                    <p className="text-sm text-zinc-400">
                      Generate tailored cover letters in minutes for any job
                      application.
                    </p>
                  </div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Generate Cover Letter
                </Button>
              </CardContent>
            </Card>

            {/* Activity This Week */}
            <Card className="bg-zinc-900 border-zinc-700">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-5">Activity This Week</h3>
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm">Profile Views</p>
                      <p className="text-2xl font-bold text-white">24</p>
                    </div>
                    <span className="text-emerald-400 text-sm">↑12%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm">Job Applications</p>
                      <p className="text-2xl font-bold text-white">4</p>
                    </div>
                    <span className="text-emerald-400 text-sm">↑2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm">Messages</p>
                      <p className="text-2xl font-bold text-white">7</p>
                    </div>
                    <span className="text-emerald-400 text-sm">↑3</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
