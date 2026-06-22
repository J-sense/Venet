// /home/workdir/artifacts/TalentPortalUnlocked.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function TalentPortalUnlocked() {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 flex items-center gap-5">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-3xl">
          👨‍💼
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">John Doe</h2>
          <p className="text-blue-400">
            Health & Wellness Professional • Career Development Specialist
          </p>
          <div className="flex gap-2 mt-3">
            <Badge>4 Specializations</Badge>
            <Badge variant="secondary">Verified</Badge>
          </div>
        </div>
      </div>

      {/* Recommended Jobs */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Recommended Jobs</h3>
          <Button variant="link" className="text-blue-400">
            View All
          </Button>
        </div>

        <div className="space-y-4">
          {[
            {
              title: "Senior Software Engineer",
              company: "Tech Corp",
              match: "95%",
            },
            {
              title: "Product Designer",
              company: "Innovate Labs",
              match: "87%",
            },
            { title: "UX Researcher", company: "HealthFlow", match: "82%" },
          ].map((job, i) => (
            <div
              key={i}
              className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{job.title}</p>
                <p className="text-zinc-400 text-sm">{job.company}</p>
              </div>
              <div className="text-right">
                <div className="text-emerald-400 font-bold">{job.match}</div>
                <Button size="sm" className="mt-2">
                  Apply Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
