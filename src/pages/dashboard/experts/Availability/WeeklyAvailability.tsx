/* eslint-disable react-hooks/purity */
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Plus, Trash2 } from "lucide-react";

export type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

interface TimeSlot {
  id: number;
  start_time: string;
  end_time: string;
}

interface DayAvailability {
  enabled: boolean;
  slots: TimeSlot[];
}

type WeeklyAvailabilityState = Record<Day, DayAvailability>;

const DAYS: Day[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DEFAULT_TIME_SLOT: Omit<TimeSlot, "id"> = {
  start_time: "09:00",
  end_time: "17:00",
};

const INITIAL_AVAILABILITY: WeeklyAvailabilityState = DAYS.reduce(
  (acc, day) => {
    acc[day] = {
      enabled: day !== "Saturday" && day !== "Sunday",
      slots: [{ ...DEFAULT_TIME_SLOT, id: Date.now() + Math.random() }],
    };
    return acc;
  },
  {} as WeeklyAvailabilityState,
);

const TIME_OPTIONS = Array.from({ length: 288 }, (_, i) => {
  const h = Math.floor(i / 12);
  const m = (i % 12) * 5;
  const value = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  const ampm = h >= 12 ? "PM" : "AM";
  return { value, label: `${hour12}:${m.toString().padStart(2, "0")} ${ampm}` };
});

const WeeklyAvailability: React.FC = () => {
  const [availability, setAvailability] =
    useState<WeeklyAvailabilityState>(INITIAL_AVAILABILITY);
  const [bufferTime, setBufferTime] = useState(15);

  const toggleDay = (day: Day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled },
    }));
  };

  const updateSlot = (
    day: Day,
    index: number,
    field: "start_time" | "end_time",
    value: string,
  ) => {
    setAvailability((prev) => {
      const newSlots = [...prev[day].slots];
      newSlots[index] = { ...newSlots[index], [field]: value };
      return { ...prev, [day]: { ...prev[day], slots: newSlots } };
    });
  };

  const addSlot = (day: Day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [
          ...prev[day].slots,
          { ...DEFAULT_TIME_SLOT, id: Date.now() + Math.random() },
        ],
      },
    }));
  };

  const removeSlot = (day: Day, index: number) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.filter((_, i) => i !== index),
      },
    }));
  };

  const copyToAll = (slots: TimeSlot[], day: Day) => {
    setAvailability((prev) => {
      const updated = { ...prev };
      DAYS.forEach((d) => {
        if (updated[d].enabled && d !== day) {
          updated[d] = {
            ...updated[d],
            slots: slots.map((s) => ({ ...s, id: Date.now() + Math.random() })),
          };
        }
      });
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-[#0A1324] text-white p-4 sm:p-6">
      <div className="max-w-full ">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          {/* Left Navigation */}
          <div className="bg-[#1E2A44] rounded-2xl px-5 py-3 flex items-center gap-4 w-1/2">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-800 rounded-xl transition-colors">
                <ChevronLeft size={24} className="text-gray-400" />
              </button>

              <button className="bg-[#1E2A44] px-6 py-2.5 rounded-2xl text-sm font-medium">
                Today
              </button>

              <div className="flex items-center gap-2 bg-[#1E2A44] px-5 py-2.5 rounded-2xl text-sm">
                <button className="text-gray-400 hover:text-white">
                  <ChevronLeft size={18} />
                </button>
                <span className="font-medium">Jul 13 - 18, 2026</span>
                <button className="text-gray-400 hover:text-white">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Buffer Time - Right Side */}
          <div className="bg-[#1E2A44] rounded-2xl px-5 py-3 flex items-center gap-4 w-1/2">
            <div className="flex items-center justify-between p-3 bg-white/[0.03] border border-white/[0.05] rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400">
                  <Clock size={16} /> {/* Use Lucide Clock icon */}
                </div>
                <div>
                  <div className="font-medium text-sm text-white">
                    Buffer Time
                  </div>
                  <div className="text-[11px] text-white/40">
                    Minutes between appointments
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-end">
              <div className="flex items-center bg-[#0A1324] rounded-xl px-4 py-2">
                <input
                  type="number"
                  value={bufferTime}
                  onChange={(e) => setBufferTime(Number(e.target.value))}
                  className="bg-transparent w-12 text-center text-lg font-semibold focus:outline-none"
                />
                <span className="text-gray-400 text-sm ml-1">minutes</span>
              </div>
            </div>
          </div>
        </div>
        {/* Top Bar */}

        {/* Days Container */}
        <div className="space-y-3  rounded-3xl p-2 sm:p-4">
          {DAYS.map((day) => {
            const dayData = availability[day];
            return (
              <div
                key={day}
                className=" rounded-3xl p-5 sm:p-6 transition-all hover:bg-[#25344A]"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-8">
                  {/* Day Toggle + Label */}
                  <div className="flex items-center gap-4 lg:w-56 shrink-0">
                    <button
                      onClick={() => toggleDay(day)}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all ${
                        dayData.enabled ? "bg-blue-600" : "bg-gray-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ${
                          dayData.enabled ? "translate-x-7" : "translate-x-1"
                        }`}
                      />
                    </button>

                    <div>
                      <div className="font-semibold text-lg">{day}</div>
                      <div className="text-gray-500 text-sm">16 Jun 2025</div>
                    </div>
                  </div>

                  {/* Time Slots Section */}
                  <div className="flex-1 max-w-[400px]">
                    {dayData.enabled ? (
                      <div className="space-y-4">
                        {dayData.slots.map((slot, idx) => (
                          <div
                            key={slot.id}
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 group"
                          >
                            <div className="flex-1 flex items-center gap-3 w-full">
                              <select
                                value={slot.start_time}
                                onChange={(e) =>
                                  updateSlot(
                                    day,
                                    idx,
                                    "start_time",
                                    e.target.value,
                                  )
                                }
                                className="bg-[#334155] border border-gray-600 rounded-2xl px-4 py-3 text-sm focus:border-blue-500 flex-1 min-w-0"
                              >
                                {TIME_OPTIONS.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>

                              <div className="text-gray-400 text-xl hidden sm:block">
                                →
                              </div>

                              <select
                                value={slot.end_time}
                                onChange={(e) =>
                                  updateSlot(
                                    day,
                                    idx,
                                    "end_time",
                                    e.target.value,
                                  )
                                }
                                className="bg-[#334155] border border-gray-600 rounded-2xl px-4 py-3 text-sm focus:border-blue-500 flex-1 min-w-0"
                              >
                                {TIME_OPTIONS.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {dayData.slots.length > 1 && (
                              <button
                                onClick={() => removeSlot(day, idx)}
                                className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/10 rounded-xl text-red-400 mt-1 sm:mt-0"
                              >
                                <Trash2 size={20} />
                              </button>
                            )}
                          </div>
                        ))}

                        <div className="flex flex-wrap gap-3 pt-2">
                          <button
                            onClick={() => addSlot(day)}
                            className="flex sm:flex-none items-center justify-center gap-2 px-6 py-3 bg-[#3B82F633] border-none text-blue-400 hover:text-blue-300 border border-gray-600 hover:border-blue-500 rounded-2xl transition-all text-sm"
                          >
                            <Plus size={18} />
                            Add time
                          </button>

                          <button
                            onClick={() => copyToAll(dayData.slots, day)}
                            className="flex-1 sm:flex-none items-center justify-center bg-[#3B82F633] border-none gap-2 px-6 py-3 text-purple-400 hover:text-purple-300 border border-gray-600 hover:border-purple-500 rounded-2xl transition-all text-sm"
                          >
                            Copy to all
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="h-12 flex items-center text-gray-400 italic">
                        Unavailable
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-10">
          <button className="w-full sm:w-auto px-10 py-4 text-gray-400 hover:bg-gray-800 rounded-2xl font-medium transition-all">
            Cancel
          </button>
          <button className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-semibold transition-all">
            Save Availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeeklyAvailability;
